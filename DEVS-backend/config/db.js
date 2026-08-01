const mongoose = require("mongoose");

const connectDB = async () => {
    console.log("Connecting to MongoDB...");

    try {
        await mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
});

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Full Error:", error);
    process.exit(1);
}
};

module.exports = connectDB;