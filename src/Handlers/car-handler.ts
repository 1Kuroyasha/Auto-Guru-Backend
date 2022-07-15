import { Request, Response, NextFunction } from "express";
import Car from "../Models/Car";
import ErrorFactory from "../Types/Error";

export const getCar = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const car = await Car.getCarByID(req.params.id);
		if (!car) throw ErrorFactory.notFound("resource not found");

		res.json(car);
	} catch (e) {
		next(e);
	}
};

export const getAllCars = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const cars = await Car.getAllCars();
		res.json(cars);
	} catch (e) {
		next(e);
	}
};
