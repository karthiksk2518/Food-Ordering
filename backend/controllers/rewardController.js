const rewardModel = require("../models/rewardModel.js");
const orderModel = require("../models/orderModel.js");
const userRewardSummaryModel = require("../models/userRewardSummaryModel.js");

exports.calculateRewardPoints = async (order) => {
    const amount = order.amount;
    let rewardPoints = 0;
    if (amount >= 200 && amount <= 500) {
        rewardPoints = Math.floor(amount * 0.05);
    } else if (amount > 500) {
        rewardPoints = Math.floor(amount * 0.10);
    }
    return rewardPoints;
};

exports.createReward = async (orderId, userId, amount) => {
    try {
        const order = await orderModel.findById(orderId);
        const rewardPoints = await exports.calculateRewardPoints(order);
        const newReward = new rewardModel({
            userId,
            orderId,
            amount,
            rewardPoints
        });
        await newReward.save();

        // Update user reward summary
        let userSummary = await userRewardSummaryModel.findOne({ userId });
        if (!userSummary) {
            userSummary = new userRewardSummaryModel({
                userId,
                totalRewardPoints: 0,
                usedPoints: 0,
                remainingPoints: 0
            });
        }
        userSummary.totalRewardPoints += rewardPoints;
        userSummary.remainingPoints += rewardPoints;
        userSummary.updatedAt = Date.now();
        await userSummary.save();

        return rewardPoints;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create reward");
    }
};

exports.userRewards = async (req, res) => {
    try {
        const userId = req.body.userId;

        // Fetch all orders for the user where payment is true
        const orders = await orderModel.find({ userId, payment: true });

        // Check and create reward entries for orders that don't have them
        for (const order of orders) {
            const existingReward = await rewardModel.findOne({ orderId: order._id });
            if (!existingReward) {
                await exports.createReward(order._id, userId, order.amount);
            }
        }

        // Fetch all rewards for the user
        const rewards = await rewardModel.find({ userId }).populate("orderId");
        res.json({
            success: true,
            data: rewards
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to get rewards"
        });
    }
};

exports.getRewardSummary = async (req, res) => {
    try {
        const userId = req.body.userId;
        let userSummary = await userRewardSummaryModel.findOne({ userId });
        if (!userSummary) {
            userSummary = new userRewardSummaryModel({
                userId,
                totalRewardPoints: 0,
                usedPoints: 0,
                remainingPoints: 0
            });
            await userSummary.save();
        }
        res.json({
            success: true,
            data: {
                totalRewardPoints: userSummary.totalRewardPoints,
                usedPoints: userSummary.usedPoints,
                remainingPoints: userSummary.remainingPoints
            }
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to get reward summary"
        });
    }
};

exports.useRewardPoints = async (req, res) => {
    try {
        const { userId, points } = req.body;
        let userSummary = await userRewardSummaryModel.findOne({ userId });
        if (!userSummary) {
            return res.json({
                success: false,
                message: "No reward summary found for user"
            });
        }
        if (userSummary.remainingPoints < points) {
            return res.json({
                success: false,
                message: "Insufficient reward points"
            });
        }
        userSummary.usedPoints += points;
        userSummary.remainingPoints -= points;
        userSummary.updatedAt = Date.now();
        await userSummary.save();
        res.json({
            success: true,
            message: "Points used successfully",
            data: {
                totalRewardPoints: userSummary.totalRewardPoints,
                usedPoints: userSummary.usedPoints,
                remainingPoints: userSummary.remainingPoints
            }
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to use reward points"
        });
    }
};