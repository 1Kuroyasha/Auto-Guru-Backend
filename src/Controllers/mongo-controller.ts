import mongoose, { Mongoose } from "mongoose";

import config from "../config";
import CustomError from "../Structures/Errors";
import logger from "../Utils/logging/logger";

let connection: Mongoose;

const connect = async () => {
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
		throw CustomError.InternalServerError("Can't connect to database server");
	}
};

export default connect;
