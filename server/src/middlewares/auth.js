import ENV from "../config/index.js";
import jwt from "jsonwebtoken";
import { logger } from "../config/logger.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    logger.warn("Access attempt without token");
    return res
      .status(401)
      .json({ message: "Access denied. Token is missing." });
  }

  jwt.verify(token, ENV.TOKEN, (err, user) => {
    if (err) {
      logger.error(`Invalid or expired token: ${err.message}`);
      return res
        .status(403)
        .json({ message: "Invalid or expired token.", error: err.message });
    }
    git;
    logger.info("Token verified");
    req.user = user;
    next();
  });
};

export default verifyToken;
