import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import ErrorFactory from "../Types/Error";
import Wishlist from "../Models/Wishlist";
import CarModel from "../Models/Car";

export const getWishlist = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const wishlist = await Wishlist.getCars(res.locals.userID);
		if (!wishlist) throw ErrorFactory.notFound("resource not found");

		const cars = await CarModel.getCarsByID(wishlist.cars);
		res.json(cars);
	} catch (e) {
		next(e);
	}
};

export const addCarToWishlist = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id: carID } = req.params;

		if (!(await CarModel.getCarByID(carID)))
			throw ErrorFactory.notFound("resource not found");

		await Wishlist.addCar(res.locals.userID, carID);
		res.sendStatus(StatusCodes.OK);
	} catch (e) {
		next(e);
	}
};

export const removeCarFromWishlist = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await Wishlist.removeCar(res.locals.userID, req.params.id);
		res.sendStatus(StatusCodes.OK);
	} catch (e) {
		next(e);
	}
};
