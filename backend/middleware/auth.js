// const jwt = require("jsonwebtoken");

// exports.authMiddleware = async (req,res,next) => {
//     const {token} = req.headers;
//     if(!token) {
//         return res.json({
//             success: false,
//             message: "Not Authorized, Login Again"
//         });
//     }
//     try {
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({
//             success: false,
//             message: "Error Occured"
//         });
//     }
// }

const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({
            success: false,
            message: "Not Authorized, Login Again"
        });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: token_decode.id }; // Save user info in req.user
        next();
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error Occurred"
        });
    }
};
