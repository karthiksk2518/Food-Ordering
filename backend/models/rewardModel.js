const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    rewardPoints: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("reward", rewardSchema);