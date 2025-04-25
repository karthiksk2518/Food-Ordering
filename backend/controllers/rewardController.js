const Reward = require('../models/rewardModel');

exports.calculateRewardPoints = async (order) => {
    const amount = order.amount;
    let points = 0;

    if (amount >= 200 && amount <= 500) {
        points = Math.floor(amount * 0.05);
    } else if (amount > 500) {
        points = Math.floor(amount * 0.10);
    }

    const reward = new Reward({
        user: order.userId,
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
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};
