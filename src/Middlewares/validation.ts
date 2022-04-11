import { Request, Response, NextFunction, RequestHandler } from "express";
import { ObjectSchema } from "joi";

import CustomErrors from "../Structures/Errors";

export const validate =
	(schema: ObjectSchema): RequestHandler =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.body);
			return next();
		} catch (e) {
			const { message } = e as Error;
			const err = new CustomErrors.ValidationError(message);
			next(err);
		}
	};
