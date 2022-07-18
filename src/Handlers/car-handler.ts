import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Car from "../Models/Car";
import Store from "../Models/Store";
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

export const bookCar = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const storeID = req.body.storeID;
		if (!storeID) throw ErrorFactory.badRequest("no store ID provided");

		await Store.bookCar(storeID, req.params.carID);
		res.sendStatus(StatusCodes.OK);
	} catch (e) {
		next(e);
	}
};

export const getTrending = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const cars = await Car.getTrendingCars();
		res.json(cars);
	} catch (e) {
		next(e);
	}
};
