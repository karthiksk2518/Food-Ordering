const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));
}