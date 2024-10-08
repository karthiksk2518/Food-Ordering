const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({ email });

        if(!user) {
            return res.json({ 
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.json({
                success: false,
                message: "Invalid Password",
            });
        }

        const token = createToken(user._id);
        console.log(token);
        res.json({
            success: true,
            message: "Logged in successfully",
            token,
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Something went wrong",
        });
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: "User already exists",
            });
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter valid email",
            });
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({
            success: true,
            message: "User registered successfully",
            token,
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error in registering user"
        });
    }
}