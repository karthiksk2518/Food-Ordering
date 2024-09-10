const express = require("express");
const cartRouter = express.Router();

const {authMiddleware} = require("../middleware/auth")
const {addItemsToCart, removeItemFromCart, getCart} = require("../controllers/cartController");

cartRouter.post("/add", authMiddleware, addItemsToCart);
cartRouter.post("/remove", authMiddleware, removeItemFromCart);
cartRouter.post("/get", authMiddleware, getCart);

module.exports = cartRouter;