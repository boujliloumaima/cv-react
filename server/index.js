import app from "./app.js";
import connectDB from "./config/db.js";
import ENV from "./config/index.js";

const PORT = ENV.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Failed to start the server:", err);
  }
};

startServer();
