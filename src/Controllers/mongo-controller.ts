import config from "../config";

import mongoose, { Mongoose } from "mongoose";

import logger from "../Utils/logging/logger";
import ErrorFactory from "../Types/Error";

let connection: Mongoose;

const connect = async (): Promise<Mongoose> => {
	if (connection) return connection;

	try {
		logger.info("Connecting to database server");
		const client = await mongoose.connect(config.DATABASE, {
			autoIndex: false,
		});
		logger.info("Connected to database server");

		connection = client;
		return connection;
	} catch (e) {
		const err = e as Error;
		throw ErrorFactory.internalServerError(err.message);
	}
};

export default connect;
