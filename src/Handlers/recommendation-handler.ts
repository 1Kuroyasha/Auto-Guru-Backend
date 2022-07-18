import { Request, Response, NextFunction } from "express";
import Car from "../Models/Car";
import {
	fetchRecommendations,
	fetchSimilarCars,
} from "../Services/recommendation";

export const getRecommendation = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userID = res.locals.userID;
		const ids = await fetchRecommendations(userID);

		const cars = await Car.getCarsByID(ids);
		return res.json(cars);
	} catch (e) {
		next(e);
	}
};

export const getSimilarCars = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const carID = req.params.carID;
		const ids = await fetchSimilarCars(carID);

		const cars = await Car.getCarsByID(ids);
		return res.json(cars);
	} catch (e) {
		next(e);
	}
};
