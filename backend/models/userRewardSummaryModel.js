const mongoose = require("mongoose");

const userRewardSummarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
    },
    totalRewardPoints: {
        type: Number,
        default: 0
    },
    usedPoints: {
        type: Number,
        default: 0
    },
    remainingPoints: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("userRewardSummary", userRewardSummarySchema);