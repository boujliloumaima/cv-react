import { createLogger, format, transports } from "winston";
import fs from "fs";
const { combine, timestamp, printf, colorize } = format;
if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
});
const errorFilter = format((info) => {
  return info.level === "error" ? info : false;
});
const infoFilter = format((info) => {
  return info.level !== "error" ? info : false;
});
const logger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
  transports: [
    new transports.Console({
      format: combine(colorize(), customFormat),
    }),
    new transports.File({
      filename: "logs/combined.log",
      format: combine(
        infoFilter(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        customFormat
      ),
    }),

    new transports.File({
      filename: "logs/error.log",
      format: combine(
        errorFilter(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        customFormat
      ),
    }),
  ],
});
if (process.env.NODE_ENV === "production") {
  logger.add(
    new transports.File({
      filename: "logs/production-info.log",
      level: "info",
    })
  );

  logger.add(
    new transports.File({
      filename: "logs/production-error.log",
      level: "error",
    })
  );
}
const requestLogger = (req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url}`);
  next();
};

module.exports = { logger, requestLogger };
