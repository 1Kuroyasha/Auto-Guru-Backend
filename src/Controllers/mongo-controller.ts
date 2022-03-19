import mongoose, { Mongoose } from "mongoose";

import config from "../config";

let connection: Mongoose;

const connect = async () => {
	if (connection) return connection;

	try {
		const client = await mongoose.connect(config.DATABASE, {
			autoIndex: false,
		});

		connection = client;

		return connection;
	} catch (error) {
		console.log(error);
	}
};

export default connect;
