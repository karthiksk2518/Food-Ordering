const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true 
    },
    createdAt: { 
        type: Date,
        default: Date.now
    }
});

const rewardModel = mongoose.model.reward || mongoose.model('reward', rewardSchema)
module.exports = rewardModel;
