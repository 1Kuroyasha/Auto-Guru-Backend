import config from "../../config";

import winston from "winston";

import consoleTransport from "./console-transport";

export default winston.createLogger({
	exitOnError: false,
	level: config.env === "development" ? "debug" : "info",
	transports: [consoleTransport],
});
