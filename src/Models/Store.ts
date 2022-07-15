import { Schema, model } from "mongoose";

import MongoController from "../Controllers/mongo-controller";
import { Store } from "../Types/interfaces";
import logger from "../Utils/logging/logger";

const storeSchema = new Schema(
	{
		ownerID: "string",
		name: "string",
		email: "string",
		phone: "string",
		address: "string",
		website: "string",
		cars: [String],
	},
	{
		strict: true,
		strictQuery: true,
	},
);

class StoreModel {
	private static collection = model("Store", storeSchema);

	public static async createStore(ownerID: string, store: Store) {
		await MongoController.connect();

		await this.collection.create({
			ownerID,
			...store,
		});

		logger.debug("New store added to the database");
	}

	// // (blocked by car model implementation)
	// public static async addCar(storeID: string, car: Car) {
	// 	await MongoController.connect();

	// 	// TODO: get car id and if not found create new car

	// 	await this.collection.updateOne(
	// 		{ _id: storeID },
	// 		{ $push: { cars: carID } },
	// 	);
	// }

	public static async getStore(storeID: string) {
		await MongoController.connect();

		return await this.collection.findById(storeID, {
			__v: 0,
		});
	}

	public static async getAllStores() {
		await MongoController.connect();

		return await this.collection.find(
			{},
			{
				_id: 1,
				name: 1,
			},
		);
	}

	public static async updateStoreInfo(
		storeID: string,
		storeInfo: Partial<Store>,
	) {
		await MongoController.connect();

		return await this.collection.findByIdAndUpdate(storeID, storeInfo);
	}

	public static async getOwnerID(id: string) {
		await MongoController.connect();

		const { ownerID: userID } = await this.collection.findById(id, {
			ownerID: 1,
		});

		return userID;
	}
}

export default StoreModel;
