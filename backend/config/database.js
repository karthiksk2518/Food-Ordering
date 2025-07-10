const mongoose = require("mongoose");
require("dotenv").config();
 
exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};

