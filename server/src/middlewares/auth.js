import ENV from "../config/index.js";
import jwt from "jsonwebtoken";
import { logger } from "../config/logger.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    logger.warn("Access attempt without token");
    return res
      .status(401)
      .json({ message: "Access denied. Token is missing." });
  }

  try {
    const user = jwt.verify(token, ENV.JWT_SECRET);
    logger.info(`✅ Token verified for userId: ${user.id}`);

    req.user = user;
    next();
  } catch (err) {
    logger.error(`Invalid or expired token: ${err.message}`);
    return res
      .status(403)
      .json({ message: "Invalid or expired token.", error: err.message });
  }
};
export const verifyAdminToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    logger.warn("Access attempt without token");
    return res
      .status(401)
      .json({ message: "Access denied. Token is missing." });
  }

  try {
    const user = jwt.verify(token, ENV.JWT_SECRET);
    if (!user.admin) {
      logger.warn("Access attempt to admin ressources");
      return res
        .status(401)
        .json({ message: "Access denied. Please contact your administrator" });
    }
    logger.info(`✅ Token verified for admin: ${user.id}`);

    req.user = user;
    next();
  } catch (err) {
    logger.error(`Invalid or expired token: ${err.message}`);
    return res
      .status(403)
      .json({ message: "Invalid or expired token.", error: err.message });
  }
};
