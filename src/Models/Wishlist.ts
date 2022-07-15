import { Schema, model } from "mongoose";

import MongoController from "../Controllers/mongo-controller";
import ErrorFactory from "../Types/Error";
import logger from "../Utils/logging/logger";

const wishlistSchema = new Schema(
	{
		userID: {
			type: "string",
			required: true,
		},
		cars: [
			{
				type: String,
			},
		],
	},
	{
		strict: true,
		strictQuery: true,
	},
);

class Wishlist {
	private static collection = model("Wishlist", wishlistSchema);

	public static async create(userID: string) {
		await MongoController.connect();

		await Wishlist.collection.create({
			userID,
			cars: [],
		});
		logger.debug("New wishlist added to the database");
	}

	public static async addCar(userID: string, carID: string) {
		await MongoController.connect();

		const wishlist = await Wishlist.collection.findOne({ userID });
		if (wishlist && wishlist.cars.includes(carID)) {
			throw ErrorFactory.badRequest("Car already in the wishlist");
		}

		await Wishlist.collection.updateOne({ userID }, { $push: { cars: carID } });
		logger.debug("Car added to the wishlist");
	}

	public static async removeCar(userID: string, carID: string) {
		await MongoController.connect();

		await Wishlist.collection.updateOne({ userID }, { $pull: { cars: carID } });
		logger.debug("Car removed from the wishlist");
	}

	public static async getCars(userID: string) {
		await MongoController.connect();

		const wishlist = await Wishlist.collection.findOne({ userID });
		return wishlist.cars;
	}
}

export default Wishlist;