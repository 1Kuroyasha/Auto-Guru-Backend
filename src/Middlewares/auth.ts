import { Request, Response, NextFunction } from "express";
import User from "../Models/User";

import CustomErrors from "../Structures/Errors";
import { getIdFromJwt } from "../Utils/jwt";

const auth =
	(requiredType?: string) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!req.headers.authorization)
				throw new CustomErrors.BadRequest("No access token");

			const match = req.headers.authorization.match(/^Bearer (.+)/);
			const token = !match ? null : match[1];
			if (!token) throw new CustomErrors.NotAuthorized("Invalid access token");

			const id = await getIdFromJwt(token);
			if (!id) throw new CustomErrors.NotAuthorized("Invalid access token");

			const userType = await User.getUserTypeById(id);

			if (userType !== requiredType && requiredType)
				throw new CustomErrors.Forbidden();

			next();
		} catch (e) {
			next(e);
		}
	};

export default auth;
