const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");


const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Database connection
const connectDB = require("./config/database");
connectDB();

// API Routes
const routes = require("./routes/index");
app.use("/api", routes); // base path added

// Root route (optional)
app.get("/", (req, res) => {
    res.send("API is running...");
});

// 404 handler (optional)
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Start server
app.listen(PORT, (err) => {
    if (err) {
        console.error(" Server error:", err);
    } else {
        console.log(` Server is running on http://localhost:${PORT}`);
    }
});
