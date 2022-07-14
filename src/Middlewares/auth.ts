import { Request, Response, NextFunction } from "express";
import User from "../Models/User";
import ErrorFactory from "../Types/Error";

import { UserType } from "../Types/types";
import { getIdFromJwt } from "../Utils/jwt";

const auth =
	(requiredType?: UserType) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!req.headers.authorization)
				throw new ErrorFactory("No access token", "BAD_REQUEST");

			const match = req.headers.authorization.match(/^Bearer (.+)/);
			const token = !match ? null : match[1];
			if (!token)
				throw new ErrorFactory("Invalid access token", "UNAUTHORIZED");

			const id = await getIdFromJwt(token);
			if (!id) throw new ErrorFactory("Invalid access token", "UNAUTHORIZED");

			const userType = await User.getUserTypeById(id);

			if (userType !== requiredType && requiredType)
				throw new ErrorFactory("FORBIDDEN", "FORBIDDEN");

			next();
		} catch (e) {
			next(e);
		}
	};

export default auth;
