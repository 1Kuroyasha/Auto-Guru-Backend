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
		const storeID = req.params.id;

		const store = await Store.getStore(storeID);
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

		const storeInfo = req.body;
		await Store.updateStoreInfo(storeID, storeInfo);

		res.sendStatus(StatusCodes.OK);
	} catch (e) {
		next(e);
	}
};

// // blocked by car model implementation
// export const addCarToStore = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// ) => {
// 	try {
// 	} catch (e) {
// 		next(e);
// 	}
// };

// // blocked by car model implementation
// export const removeCarFromStore = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// ) => {
// 	try {
// 	} catch (e) {
// 		next(e);
// 	}
// };
