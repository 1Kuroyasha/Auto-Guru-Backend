import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Filter from "../Models/Filter";

export const postFilter = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userID = res.locals.userID;

		await Filter.postFilter(userID, req.body);
		res.sendStatus(StatusCodes.CREATED);
	} catch (e) {
		next(e);
	}
};
