import mongoose from "mongoose";
import ENV from "../config/index.js";
import { logger } from "./logger.js";
const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("MongoDB connection error:" + error.message);
    process.exit(1); // exit process if DB fails
  }
};
export default connectDB;
