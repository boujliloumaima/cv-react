import app from "./app.js";
import connectDB from "./src/config/db.js";
import ENV from "./src/config/index.js";
import { logger } from "./src/config/logger.js";
const startServer = async () => {
  try {
    await connectDB();
    logger.info(" Database connected successfully!");

    app.listen(ENV.PORT, () => {
      logger.info(` Server is running on http://localhost:${ENV.PORT}`);
    });
  } catch (err) {
    logger.error("Failed to start the server: " + err.message);
  }
};
startServer();
