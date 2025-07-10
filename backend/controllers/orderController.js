const orderModel = require("../models/orderModel.js");
const userModel = require("../models/userModel.js");
const Stripe = require("stripe");
const rewardController = require("./rewardController.js");
const userRewardSummaryModel = require("../models/userRewardSummaryModel.js");
const { v4: uuidv4 } = require("uuid"); // Add uuid for sessionId

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// In-memory store for order data
const orderDataStore = new Map();
const ORDER_EXPIRY_MS = 2 * 60 * 1000;

exports.placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
        const { userId, items, amount, address, usedRewardPoints = 0 } = req.body;

        // Validate request data
        if (!userId || !items || !Number.isInteger(amount) || !address) {
            return res.json({
                success: false,
                message: "Missing or invalid required fields: userId, items, amount, or address"
            });
        }

        // Validate usedRewardPoints
        if (!Number.isInteger(usedRewardPoints) || usedRewardPoints < 0) {
            return res.json({
                success: false,
                message: "Invalid usedRewardPoints: must be a non-negative integer"
            });
        }

        // Validate reward points
        if (usedRewardPoints > 0) {
            const userSummary = await userRewardSummaryModel.findOne({ userId });
            if (!userSummary) {
                return res.json({
                    success: false,
                    message: "No reward summary found for user"
                });
            }
            if (userSummary.remainingPoints < usedRewardPoints) {
                return res.json({
                    success: false,
                    message: `Insufficient reward points. Available: ${userSummary.remainingPoints}, Required: ${usedRewardPoints}`
                });
            }
        }

        // Validate items
        for (const item of items) {
            if (!item.name || !Number.isInteger(item.price) || item.price <= 0 || !Number.isInteger(item.quantity) || item.quantity <= 0) {
                return res.json({
                    success: false,
                    message: "Invalid item data: name, price, or quantity missing or invalid"
                });
            }
        }

        // Validate total amount
        const calculatedTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 20 - usedRewardPoints;
        if (calculatedTotal !== amount) {
            return res.json({
                success: false,
                message: `Amount mismatch. Expected: ${calculatedTotal}, Received: ${amount}`
            });
        }

        // Generate unique sessionId
        const sessionId = uuidv4();
        const orderData = { userId, items, amount, address, usedRewardPoints };

        // Store orderData in memory with expiry
        orderDataStore.set(sessionId, orderData);
        setTimeout(() => orderDataStore.delete(sessionId), ORDER_EXPIRY_MS);

        // Generate line_items for Stripe
        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Stripe expects amount in paise
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 20 * 100,
            },
            quantity: 1,
        });

        // Create a coupon for reward points discount
        let couponId = null;
        if (usedRewardPoints > 0) {
            const coupon = await stripe.coupons.create({
                amount_off: usedRewardPoints * 100,
                currency: "inr",
                duration: "once",
                name: "Reward Points Discount",
            });
            couponId = coupon.id;
        }

        // Log line_items and order details
        console.log("Stripe line_items:", JSON.stringify(line_items, null, 2));
        console.log("Order details:", { userId, amount, usedRewardPoints, couponId, sessionId });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&sessionId=${sessionId}`,
            cancel_url: `${frontend_url}/verify?success=false&sessionId=${sessionId}`,
            currency: "inr",
            discounts: couponId ? [{ coupon: couponId }] : [],
            metadata: {
                userId,
                amount: amount.toString(),
                usedRewardPoints: usedRewardPoints.toString(),
                sessionId
            }
        });

        res.json({
            success: true,
            message: "Order initiated successfully",
            session_url: session.url
        });

    } catch (error) {
        console.error("Error in placeOrder:", error.message, error.stack);
        res.json({
            success: false,
            message: error.message || "Failed to initiate order"
        });
    }
}

exports.verifyOrder = async (req, res) => {
    const { sessionId, success } = req.body;
    try {
        if (success === "true") {
            // Retrieve order data from in-memory store
            const orderData = orderDataStore.get(sessionId);
            if (!orderData) {
                return res.json({
                    success: false,
                    message: "Order data not found or expired"
                });
            }

            const { userId, items, amount, address, usedRewardPoints } = orderData;

            // Re-validate data
            if (!userId || !items || !Number.isInteger(amount) || !address) {
                orderDataStore.delete(sessionId);
                return res.json({
                    success: false,
                    message: "Invalid order data"
                });
            }

            // Validate reward points
            if (usedRewardPoints > 0) {
                const userSummary = await userRewardSummaryModel.findOne({ userId });
                if (!userSummary || userSummary.remainingPoints < usedRewardPoints) {
                    orderDataStore.delete(sessionId);
                    return res.json({
                        success: false,
                        message: "Insufficient reward points"
                    });
                }
            }

            // Create permanent order
            const newOrder = new orderModel({
                userId,
                items,
                amount,
                address,
                usedRewardPoints,
                payment: true
            });

            const updatedOrder = await newOrder.save();

            // Update reward points if used
            if (updatedOrder.usedRewardPoints > 0) {
                let userSummary = await userRewardSummaryModel.findOne({ userId: updatedOrder.userId });
                if (userSummary && userSummary.remainingPoints >= updatedOrder.usedRewardPoints) {
                    userSummary.usedPoints += updatedOrder.usedRewardPoints;
                    userSummary.remainingPoints -= updatedOrder.usedRewardPoints;
                    userSummary.updatedAt = Date.now();
                    await userSummary.save();
                } else {
                    throw new Error("Insufficient reward points");
                }
            }

            // Clear cart
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            // Create reward
            await rewardController.createReward(updatedOrder._id, updatedOrder.userId, updatedOrder.amount);

            // Clean up in-memory store
            orderDataStore.delete(sessionId);

            res.json({
                success: true,
                message: "Order placed successfully"
            });
        } else {
            // Clean up on cancel
            orderDataStore.delete(sessionId);
            res.json({
                success: false,
                message: "Order cancelled"
            });
        }
    } catch (error) {
        console.error("Error in verifyOrder:", error.message, error.stack);
        orderDataStore.delete(sessionId); // Clean up on error
        res.json({
            success: false,
            message: error.message || "Failed to verify order"
        });
    }
}

exports.userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error("Error in userOrders:", error.message, error.stack);
        res.json({
            success: false,
            message: "Failed to get orders"
        });
    }
}

exports.listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error("Error in listOrders:", error.message, error.stack);
        res.json({
            success: false,
            message: "Failed to get orders"
        });
    }
}

exports.updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({
            success: true,
            message: "Order status updated successfully"
        });
    } catch (error) {
        console.error("Error in updateStatus:", error.message, error.stack);
        res.json({
            success: false,
            message: "Failed to update order status"
        });
    }
}