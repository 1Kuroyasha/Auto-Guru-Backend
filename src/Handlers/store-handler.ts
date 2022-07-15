import { Request, Response, NextFunction } from "express";

import ErrorFactory from "../Types/Error";
import Store from "../Models/Store";
import { StatusCodes } from "http-status-codes";

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
		const store = await Store.getStore(req.params.id);
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
		const storeID = req.params.id;
		const ownerID = await Store.getOwnerID(storeID);
		if (!ownerID) throw ErrorFactory.notFound("resource not found");

		if (ownerID !== res.locals.userID)
			throw ErrorFactory.forbidden("FORBIDDEN");

		await Store.updateStoreInfo(storeID, req.body);
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
		const storeID = req.params.id;
		const ownerID = await Store.getOwnerID(storeID);
		if (!ownerID) throw ErrorFactory.notFound("resource not found");

		if (ownerID !== res.locals.userID)
			throw ErrorFactory.forbidden("FORBIDDEN");

		await Store.addCar(storeID, req.body);
		res.sendStatus(StatusCodes.OK);
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
		const storeID = req.params.id;
		const ownerID = await Store.getOwnerID(storeID);
		if (!ownerID) throw ErrorFactory.notFound("resource not found");

		if (ownerID !== res.locals.userID)
			throw ErrorFactory.forbidden("FORBIDDEN");

		await Store.removeCar(req.body.carID);
		res.sendStatus(StatusCodes.OK);
	} catch (e) {
		next(e);
	}
};
