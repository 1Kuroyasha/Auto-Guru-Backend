import { Schema, model } from "mongoose";

import MongoController from "../Controllers/mongo-controller";
import logger from "../Utils/logging/logger";
import Filter from "./Filter";

const schema = new Schema(
	{
		userID: "string",
		filters: {
			make: "string",
			model: "string",
			bodyType: "string",
			transmission: "string",
			engineCapacity: "number",
			productionYear: "number",
			numberOfDoors: "number",
			price: "number",
		},
	},
	{
		strict: true,
		strictQuery: true,
	},
);

class Preference {
	private static collection = model("Preference", schema);

	public static async postPreference(userID: string) {
		await MongoController.connect();

		const filters = await Filter.getFilters(userID);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const userPreference: any = filters.reduce((acc: any, filter: any) => {
			Object.keys(filter).forEach((key: string) => {
				if (!acc[key]) {
					if (typeof filter[key] === "string") acc[key] = [filter[key]];
					else acc[key] = filter[key];
				} else {
					if (typeof filter[key] === "string") acc[key].push(filter[key]);
					else acc[key] = (acc[key] + filter[key]) / 2;
				}
				return acc;
			});
		}, {});

		const found = await this.collection.findOne({ userID });

		if (found) {
			await this.collection.updateOne(
				{ userID },
				{ $set: { filters: userPreference } },
			);
		} else {
			await this.collection.create({
				userID,
				filters: userPreference,
			});
		}

		logger.debug("preference updated");
	}
}
export default Preference;
