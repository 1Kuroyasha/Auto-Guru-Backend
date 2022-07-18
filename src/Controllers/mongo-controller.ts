import config from "../config";

import mongoose, { Mongoose } from "mongoose";

import logger from "../Utils/logging/logger";

class MongoController {
	private static connection: Mongoose;

	public static async connect() {
		if (!this.connection) {
			logger.info("Connecting to database server");

			this.connection = await mongoose.connect(config.DATABASE, {
				autoIndex: false,
			});

			logger.info("Connected to database server");
		}
	}
}

export default MongoController;
