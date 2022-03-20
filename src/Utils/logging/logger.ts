import winston from "winston";

import { env } from "../../config";
import consoleTransport from "./consoleTransport";

export default winston.createLogger({
	exitOnError: false,
	level: env === "DEVELOPMENT" ? "debug" : "info",
	transports: [consoleTransport],
});
