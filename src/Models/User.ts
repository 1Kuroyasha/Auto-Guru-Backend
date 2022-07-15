import { Schema, model } from "mongoose";

import connect from "../Controllers/mongo-controller";
import { Customer, Owner, UserInfo, UserInterface } from "../Types/interfaces";
import logger from "../Utils/logging/logger";
import ErrorFactory from "../Types/Error";

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
	private static collection = model("User", userSchema);

	public static async create(user: Customer | Owner): Promise<string> {
		await connect();
		const newUser = await User.collection.create(user);
		logger.debug("New customer added to the database");

		return newUser._id;
	}

	public static async findUserByEmail(email: string): Promise<UserInfo | null> {
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

		return match;
	}

	public static async getUserTypeById(id: string): Promise<string> {
		await connect();
		const match = await User.collection.findById(id, { userType: 1 });

		if (!match) {
			throw ErrorFactory.badRequest("invalid access token");
		}

		return match.userType;
	}

	public static async getUserById(id: string): Promise<UserInfo | null> {
		await connect();
		const match = await User.collection.findById(id, {
			_id: 0,
			password: 0,
			__v: 0,
		});

		return match;
	}

	public static async updateUser(id: string, user: Partial<UserInterface>) {
		await User.collection.findByIdAndUpdate(id, user);
	}

	public static async getOwners(): Promise<Array<UserInterface>> {
		return await User.collection.find(
			{ userType: "OWNER" },
			{ _id: 0, password: 0, __v: 0 },
		);
	}
}

export default User;
