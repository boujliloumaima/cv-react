import mongoose from "mongoose";
import ENV from "../config/index.js";
const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};
export default connectDB;
