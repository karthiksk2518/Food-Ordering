const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "Food Processing"
    },
    date: {
        type: Date,
        default: Date.now
    },
    payment: {
        type: Boolean,
        default: false
    },
    usedRewardPoints: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("order", orderSchema);