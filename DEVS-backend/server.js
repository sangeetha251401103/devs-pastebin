require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const pasteRoutes = require("./routes/pasteRoutes");
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/pastes", pasteRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 DEVS Backend API is Running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});