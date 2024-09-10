const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

//login user
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
                message: "Invalid password",
            });
        }

        const token = createToken(user._id);
        console.log(token);
        res.json({
            success: true,
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

//register user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        //checking is user Already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: "User already exists",
            });
        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter valid email",
            });
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "please enter a strong password",
            });
        }

        //hashing user password
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
            token,
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error registering user"
        });
    }
}