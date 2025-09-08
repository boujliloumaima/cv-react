import dotenv from "dotenv";
dotenv.config();

const ENV = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/resume",
};

export default ENV;
