const mongoose = require("mongoose");
require("dotenv").config();

// exports.connectDB = async () => {
//     await mongoose.connect(process.env.MONGODB_URL)
//     .then(() => console.log("MongoDB Connected..."))
//     .catch(err => console.log(err));
// }

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});
