import { Schema, model } from "mongoose";

import connect from "../Controllers/mongo-controller";
import logger from "../Utils/logging/logger";

const wishlistSchema = new Schema({
	userID: {
		type: "string",
		required: true,
	},
	cars: [
		{
			type: String,
		},
	],
});

class Wishlist {
	private static collection = model("Wishlist", wishlistSchema);

	public static async create(userID: string) {
		await connect();
		await Wishlist.collection.create({
			userID,
			cars: [],
		});
		logger.debug("New wishlist added to the database");
	}

	public static async addCar(userID: string, carID: string) {
		await connect();

		// TODO: check if car is already in wishlist

		await Wishlist.collection.updateOne({ userID }, { $push: { cars: carID } });
		logger.debug("Car added to the wishlist");
	}

	public static async removeCar(userID: string, carID: string) {
		await connect();
		await Wishlist.collection.updateOne({ userID }, { $pull: { cars: carID } });
		logger.debug("Car removed from the wishlist");
	}

	public static async getCars(userID: string) {
		await connect();
		const wishlist = await Wishlist.collection.findOne({ userID });
		return wishlist.cars;
	}
}

export default Wishlist;
