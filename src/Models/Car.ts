import { Schema, model } from "mongoose";

import MongoController from "../Controllers/mongo-controller";
import ErrorFactory from "../Types/Error";
import { Car } from "../Types/interfaces";
import logger from "../Utils/logging/logger";
import { carSchema } from "../Utils/validation/car-schemas";

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
	},
	{
		strict: true,
		strictQuery: true,
	},
);

class CarModel {
	private static collection = model("Car", schema);

	public static async createCar(car: Car): Promise<string> {
		try {
			await carSchema.validateAsync(car);
		} catch (e) {
			const err = e as Error;
			throw ErrorFactory.validationError(err.message);
		}

		await MongoController.connect();

		const { _id: id } = await this.collection.create(car);
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

		return await this.collection.findById(id, { __v: 0 });
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

	public static async getCar(car: Partial<Car>): Promise<string> {
		await MongoController.connect();

		const found = await this.collection.findOne({ car }, { _id: 1 });
		return found?.id;
	}

	public static async getCarsByID(ids: string[]) {
		await MongoController.connect();

		const result: Partial<Car>[] = [];

		ids.forEach(async id => {
			const car = await this.collection.findById(id, {
				_id: 1,
				make: 1,
				model: 1,
				price: 1,
			});

			result.push(car);
		});

		return result;
	}
}

export default CarModel;
