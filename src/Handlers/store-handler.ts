import { Request, Response, NextFunction } from "express";

import ErrorFactory from "../Types/Error";
import Store from "../Models/Store";
import { StatusCodes } from "http-status-codes";
import Car from "../Models/Car";

export const getAllStores = async (
	_: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const stores = await Store.getAllStores();
		res.json(stores);
	} catch (e) {
		next(e);
	}
};

export const getStore = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const store = await Store.getStore(req.params.storeID);
		if (!store) throw ErrorFactory.notFound("resource not found");
		res.json(store);
	} catch (e) {
		next(e);
	}
};

export const updateStoreInfo = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const ownerID = res.locals.userID;

		await Store.updateStoreInfo(ownerID, req.body);
		res.sendStatus(StatusCodes.OK);
	} catch (e) {
		next(e);
	}
};

export const addCarToStore = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const ownerID = res.locals.userID;

		await Store.addCar(ownerID, req.body);
		res.sendStatus(StatusCodes.CREATED);
	} catch (e) {
		next(e);
	}
};

export const removeCarFromStore = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await Store.removeCar(res.locals.userID, req.params.carID);
		res.sendStatus(StatusCodes.OK);
	} catch (e) {
		next(e);
	}
};

export const getBookedCars = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const cars = await Store.getBookedCars(res.locals.userID);
		if (!cars) return res.json([]);
		res.json(cars);
	} catch (e) {
		next(e);
	}
};

export const sellCar = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await Store.sellCar(res.locals.userID, req.params.carID);
		await Car.sell(req.params.carID);
		res.sendStatus(StatusCodes.OK);
	} catch (e) {
		next(e);
	}
};
