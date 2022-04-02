import winston, { format } from "winston";

import { env } from "../../config";

const logFormat = format.printf(
	({ level, message, timestamp }) =>
		`${env === "DEVELOPMENT" ? `[${timestamp}]` : ""} [${level}] ${message}`,
);

export default new winston.transports.Console({
	level: env === "DEVELOPMENT" ? "debug" : "info",
	stderrLevels: ["errors"],
	consoleWarnLevels: ["warn"],
	format: format.combine(
		format.errors({ stack: true }),
		format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		format.colorize(),
		format.prettyPrint(),
		logFormat,
	),
});
