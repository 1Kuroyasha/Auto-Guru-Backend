import { Schema, model } from "mongoose";

import MongoController from "../Controllers/mongo-controller";
import ErrorFactory from "../Types/Error";
import { Store } from "../Types/interfaces";
import { CarBodyType, Transmission } from "../Types/types";
import logger from "../Utils/logging/logger";
import CarModel from "./Car";

const storeSchema = new Schema(
	{
		ownerID: "string",
		name: "string",
		email: "string",
		phone: "string",
		address: "string",
		website: "string",
		bookedCars: [String],
		cars: [
			{
				carID: "string",
				numberAvailable: "number",
				price: "number",
			},
		],
		sold: "number",
	},
	{
		strict: true,
		strictQuery: true,
	},
);

interface Car {
	make: string;
	model: string;
	bodyType: CarBodyType;
	engineCapacity: number;
	productionYear: number;
	numberOfDoors: number;
	transmission: Transmission;
	price: number;
}

class StoreModel {
	private static collection = model("Store", storeSchema);

	public static async createStore(ownerID: string, store: Store) {
		await MongoController.connect();

		await this.collection.create({
			ownerID,
			bookedCars: [],
			sold: 0,
			...store,
			cars: [],
		});

		logger.debug("New store added to the database");
	}

	public static async addCar(ownerID: string, body: Car) {
		await MongoController.connect();

		const { price, ...car } = body;

		await CarModel.getCar(car);
		let carID = await CarModel.getCar(car);
		if (!carID) carID = await CarModel.createCar(car);

		const { cars } = await this.collection.findOne({ ownerID }, { cars: 1 });

		let found = false;

		if (cars !== []) {
			for (const car of cars) {
				if (car.carID === carID) {
					found = true;
					car.numberAvailable += 1;
					break;
				}
			}
		}

		if (!found) {
			if (!price) throw ErrorFactory.validationError("Price is required");
			await this.collection.updateOne(
				{ ownerID },
				{
					$push: {
						cars: {
							carID,
							numberAvailable: 1,
							price,
						},
					},
				},
			);
		} else await this.collection.updateOne({ ownerID }, { $set: { cars } });
	}

	public static async getStore(storeID: string) {
		await MongoController.connect();

		const store = await this.collection.findById(storeID, {
			__v: 0,
		});

		store.cars = await CarModel.getCarsByID(
			store.cars.map((car: { carID: string }) => car.carID),
		);

		return store;
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
		ownerID: string,
		storeInfo: Partial<Store>,
	) {
		await MongoController.connect();

		await this.collection.findByIdAndUpdate({ ownerID }, storeInfo);
	}

	public static async getOwnerID(id: string) {
		await MongoController.connect();

		const { ownerID: userID } = await this.collection.findById(id, {
			ownerID: 1,
		});

		return userID;
	}

	public static async removeCar(ownerID: string, carID: string) {
		await MongoController.connect();

		let { cars } = await this.collection.findOne({ ownerID }, { cars: 1 });
		cars = cars.filter((car: { carID: string }) => car.carID !== carID);
		await this.collection.updateOne({ ownerID }, { $set: { cars } });

		const stores = await this.collection.find({}, { cars: 1 });
		cars = stores.map(store => store.cars);

		let remove = true;

		for (const stores of cars) {
			if (!remove) break;

			for (const car of stores) {
				if (car.carID === carID) {
					remove = false;
					break;
				}
			}
		}

		if (remove) await CarModel.deleteCar(carID);
	}

	public static async getBookedCars(userID: string) {
		await MongoController.connect();

		const { bookedCars } = await this.collection.findOne(
			{ ownerID: userID },
			{ bookedCars: 1 },
		);

		return await CarModel.getCarsByID(bookedCars);
	}

	public static async bookCar(storeID: string, carID: string) {
		await MongoController.connect();

		await this.collection.updateOne(
			{ _id: storeID },
			{ $push: { bookedCars: carID } },
		);
	}

	public static async sellCar(ownerID: string, carID: string) {
		await MongoController.connect();

		const { cars } = await this.collection.findOne({ ownerID }, { cars: 1 });

		let remove = false;

		for (const car of cars) {
			if (car.carID === carID) {
				if (--car.numberAvailable === 0) remove = true;
				break;
			}
		}

		if (remove) await StoreModel.removeCar(ownerID, carID);
		else await this.collection.updateOne({ ownerID }, { $set: { cars } });

		await this.collection.updateOne(
			{ ownerID },
			{ $pull: { bookedCars: carID }, $inc: { sold: 1 } },
		);
	}

	public static async getStoresByCarID(carID: string) {
		await MongoController.connect();

		const stores = await this.collection.find({}, { _id: 1, name: 1, cars: 1 });

		const result: Array<{ id: string; name: string }> = [];

		stores.forEach(store => {
			if (store.cars.includes(carID))
				result.push({ id: store._id, name: store.name });
		});

		return result;
	}
}

export default StoreModel;
