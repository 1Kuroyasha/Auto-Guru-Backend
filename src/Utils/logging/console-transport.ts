import config from "../../config";

import winston, { format } from "winston";

const { env } = config;

const logFormat = format.printf(
	({ level, message, timestamp }) =>
		`${env === "development" ? `[${timestamp}]` : ""} [${level}] ${message}`,
);

export default new winston.transports.Console({
	level: env === "development" ? "debug" : "info",
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
