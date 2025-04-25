const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

const db = require("./config/database");
db.connectDB();

const foodRouter = require("./routes/foodRoute");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static('uploads'));

app.get("/", (req,res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});