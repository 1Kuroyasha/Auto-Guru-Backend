import mongoose, { Mongoose } from "mongoose";

import config from "../config";
import CustomErrors from "../Structures/Errors";
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
		throw new CustomErrors.InternalServerError(
			"Failed to connect to the database server",
		);
	}
};

export default connect;
