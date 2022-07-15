import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import ErrorFactory from "../Types/Error";
import Wishlist from "../Models/Wishlist";

export const getWishlist = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const wishlist = await Wishlist.getCars(res.locals.userID);
		if (!wishlist) throw ErrorFactory.notFound("resource not found");

		// TODO: get cars by id (blocked by car model implementation)

		throw ErrorFactory.notImplemented();
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

		// TODO: check if car exists (blocked by car model implementation)

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
