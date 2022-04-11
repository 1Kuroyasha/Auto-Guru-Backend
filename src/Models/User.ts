import { Schema, model } from "mongoose";

import connect from "../Controllers/mongo-controller";
import { Customer, Owner, UserInfo } from "../Types/interfaces";
import logger from "../Utils/logging/logger";

const userSchema = new Schema(
	{
		username: {
			type: "string",
			required: true,
		},
		password: {
			type: "string",
			required: true,
		},
		name: {
			type: "string",
			required: true,
		},
		phone: {
			type: "string",
			required: true,
		},
		email: {
			type: "string",
			required: true,
		},
		age: {
			type: "number",
			required: true,
		},
		salary: {
			type: "number",
			required: false,
		},
		userType: {
			type: "string",
			required: true,
		},
	},
	{
		strict: true,
		strictQuery: true,
	},
);

class User {
	static collection = model("User", userSchema);

	async create(user: Customer | Owner): Promise<string> {
		await connect();
		const newUser = await User.collection.create(user);
		logger.debug("New customer added to the database");

		return newUser._id;
	}

	async findUserByEmail(email: string): Promise<UserInfo | null> {
		await connect();
		const match = await User.collection.findOne(
			{ email },
			{
				_id: 1,
				email: 1,
				password: 1,
				userType: 1,
			},
		);

		return match ? match : null;
	}
}

const user = new User();

export default user;
