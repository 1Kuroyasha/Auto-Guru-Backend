import { Schema, model } from "mongoose";

import MongoController from "../Controllers/mongo-controller";
import ErrorFactory from "../Types/Error";
import { Car } from "../Types/interfaces";
import logger from "../Utils/logging/logger";
import { carSchema } from "../Utils/validation/car-schemas";
import StoreModel from "./Store";

const schema = new Schema(
	{
		make: "string",
		model: "string",
		bodyType: "string",
		transmission: "string",
		engineCapacity: "number",
		productionYear: "number",
		numberOfDoors: "number",
		price: "number",
		sold: "number",
	},
	{
		strict: true,
		strictQuery: true,
	},
);

class CarModel {
	private static collection = model("Car", schema);

	public static async getTrendingCars() {
		await MongoController.connect();

		return await this.collection.find(
			{},
			{
				_id: 1,
				make: 1,
				model: 1,
				price: 1,
			},
			{ sort: { sold: -1 }, limit: 5 },
		);
	}

	public static async updatePrice(id: string) {
		await MongoController.connect();

		const stores = await StoreModel.getStoresByCarID(id);
		const prices = stores.map(store => store.price);

		const sum = prices.reduce((acc, curr) => acc + curr, 0);
		const price = sum / prices.length;

		await this.collection.updateOne({ _id: id }, { $set: { price } });
	}

	public static async createCar(car: Car): Promise<string> {
		try {
			await carSchema.validateAsync(car);
		} catch (e) {
			const err = e as Error;
			throw ErrorFactory.validationError(err.message);
		}

		await MongoController.connect();

		const { _id: id } = (
			await this.collection.create({ sold: 0, ...car })
		).toObject();
		logger.debug("New car added to the database");

		return id;
	}

	public static async deleteCar(id: string) {
		await MongoController.connect();

		await this.collection.deleteOne({ _id: id });
		logger.debug("Car deleted from the database");
	}

	public static async getCarByID(id: string) {
		await MongoController.connect();

		const car = (
			await this.collection.findById(id, { __v: 0, sold: 0 })
		).toObject();

		car.stores = await StoreModel.getStoresByCarID(id);

		return car;
	}

	public static async getAllCars() {
		await MongoController.connect();

		return await this.collection.find(
			{},
			{
				_id: 1,
				make: 1,
				model: 1,
				price: 1,
			},
		);
	}

	public static async getCar(car: Partial<Car>): Promise<string | null> {
		await MongoController.connect();

		const found = await this.collection.findOne(car, { _id: 1 });
		return found?.id;
	}

	public static async getCarsByID(ids: string[]) {
		await MongoController.connect();

		const result = await Promise.all(
			ids.map(async id => {
				const car = await this.collection.findById(id, {
					_id: 1,
					make: 1,
					model: 1,
					price: 1,
				});
				return car;
			}),
		);

		return result;
	}

	public static async sell(id: string) {
		await MongoController.connect();

		await this.collection.updateOne({ _id: id }, { $inc: { sold: 1 } });
	}
}

export default CarModel;
