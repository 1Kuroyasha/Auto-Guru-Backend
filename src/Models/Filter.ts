import { Schema, model } from "mongoose";

import MongoController from "../Controllers/mongo-controller";
import logger from "../Utils/logging/logger";
import Preference from "./Preference";

const schema = new Schema(
	{
		userID: {
			type: "string",
			required: true,
		},
		filters: [
			{
				filter: "string",
				value: "string",
			},
		],
	},
	{
		strict: true,
		strictQuery: true,
	},
);

class Filter {
	private static collection = model("Filter", schema);

	public static async postFilter(
		userID: string,
		filter: { type: string; value: string },
	) {
		await MongoController.connect();

		const found = await Filter.collection.findOne({ userID });
		if (found) {
			await Filter.collection.updateOne(
				{ userID },
				{ $push: { filters: filter } },
			);
		} else {
			await Filter.collection.create({
				userID,
				filters: [filter],
			});
		}

		logger.debug("New filter added to the database");

		await Preference.postPreference(userID);
	}

	public static async getFilters(userID: string) {
		await MongoController.connect();

		const found = await Filter.collection.findOne({ userID });
		if (found) {
			return found.asObject().filters;
		} else {
			return [];
		}
	}
}

export default Filter;
