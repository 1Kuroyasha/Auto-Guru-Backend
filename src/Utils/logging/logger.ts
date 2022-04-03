import winston from "winston";

import config from "../../config";
import consoleTransport from "./consoleTransport";

export default winston.createLogger({
	exitOnError: false,
	level: config.env === "development" ? "debug" : "info",
	transports: [consoleTransport],
});
