const Reward = require('../models/rewardModel');
// const Order = require('../models/Order');

exports.calculateRewardPoints = async (order) => {
    const amount = order.totalAmount;
    let points = 0;

    if (amount >= 200 && amount <= 500) {
        points = Math.floor(amount * 0.05);
    } else if (amount > 500) {
        points = Math.floor(amount * 0.10);
    }

    const reward = new Reward({
        user: order.user,
        orderId: order._id,
        amount,
        points
    });

    await reward.save();
};

exports.getUserRewards = async (req, res) => {
    try {
        const rewards = await Reward.find({ user: req.user._id }).populate('orderId');
        const totalPoints = rewards.reduce((sum, r) => sum + r.points, 0);
        res.json({ totalPoints, rewards });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};
