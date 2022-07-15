import { Request, Response, NextFunction } from "express";

import User from "../Models/User";
import ErrorFactory from "../Types/Error";
import { UserType } from "../Types/types";
import { getIdFromJwt } from "../Utils/jwt";

export const authentication = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.headers.authorization)
			throw ErrorFactory.badRequest("No access token");

		if (!/^Bearer (.+)/.test(req.headers.authorization))
			throw ErrorFactory.unauthorized("Invalid access token");

		const token = req.headers.authorization.replace("Bearer ", "");
		const id = await getIdFromJwt(token);

		if (!id) throw ErrorFactory.unauthorized("Invalid access token");

		res.locals.userID = id;
		next();
	} catch (e) {
		next(e);
	}
};

export const authorization = (requiredType?: UserType) =>
	!requiredType
		? async (req: Request, res: Response, next: NextFunction) => {
				try {
					if (res.locals.userID !== req.params.id)
						throw ErrorFactory.forbidden("FORBIDDEN");

					next();
				} catch (e) {
					next(e);
				}
		  }
		: async (req: Request, res: Response, next: NextFunction) => {
				try {
					const userType = await User.getUserTypeById(res.locals.userID);

					if (userType !== requiredType)
						throw ErrorFactory.forbidden("FORBIDDEN");

					next();
				} catch (e) {
					next(e);
				}
		  };
