const orderModel = require("../models/orderModel.js");
const userModel = require("../models/userModel.js");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.placeOrder = async (req, res) => {

    const frontend_url = "https://food-ordering-kp.vercel.app/";
    
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 * 80,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100 * 80,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({
            success: true,
            message: "Order placed successfully",
            session_url: session.url
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to place order"
        });
    }
}

exports.verifyOrder = async (req,res) => {
    const {orderId, success} = req.body;
    try {
        if(success == "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({
                success: true,
                message: "Paid"
            });
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success: false,
                message: "Failed to pay"
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to verify order"
        });
    }
}

exports.userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log(error);
        res.jsn({
            success: false,
            message: "Failed to get orders"
        });
    }
}

exports.listOrders = async(req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to get orders"
        });
    }
}

exports.updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
        res.json({
            success: true,
            message: "Order status updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to update order status"
        });
    }
}