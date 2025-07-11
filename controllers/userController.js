const User = require("../models/user");
const JWT = require("jsonwebtoken");
require("dotenv").config();

// module.exports.registerUser = async (req, res) => {
//     try {
//         const { email, password, confirmPassword } = req.body;

//         // Check all parameters
//         if (!email || !password || !confirmPassword) {
//             return res.status(400).json({success: false, message: "All fields are required" });
//         }

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             return res.status(400).json({success: false, message: "Passwords do not match" });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({success: false, message: "Email already registered" });
//         }

//         // Create new user
//         const user = new User({ email, password, confirmPassword });
//         const token = user.createVerificationToken(); 
//         await user.save();
//         res.status(201).json({ success: true,message: "User registered successfully. Verify your email.",token });
//     } catch (err) {
//         console.error("Register Error:", err);
//         res.status(500).json({success: false, message: "Server error during registration" });
//     }
// };

module.exports.registerUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Validate input
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already registered" });
        }

        // Create user and save
        const user = new User({ email, password, confirmPassword });
        await user.save();

        // Generate JWT token for new user
        const token = JWT.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d", // adjust as needed
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
        });
    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ success: false, message: "Server error during registration" });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await require("bcrypt").compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const token = JWT.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        res.status(200).json({success: true, message: "Login successful", token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({success: false, message: "Server error during login" });
    }
};
