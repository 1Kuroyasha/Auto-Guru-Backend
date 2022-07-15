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

		const match = req.headers.authorization.match(/^Bearer (.+)/);
		const token = !match ? null : match[1];
		if (!token) throw ErrorFactory.unauthorized("Invalid access token");

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
					const id = res.locals.userID as string;
					const resourceID = req.params.id;

					if (id !== resourceID) throw ErrorFactory.forbidden("FORBIDDEN");

					next();
				} catch (e) {
					next(e);
				}
		  }
		: async (req: Request, res: Response, next: NextFunction) => {
				try {
					const id = res.locals.userID as string;
					const userType = await User.getUserTypeById(id);

					if (userType !== requiredType)
						throw ErrorFactory.forbidden("FORBIDDEN");

					next();
				} catch (e) {
					next(e);
				}
		  };
