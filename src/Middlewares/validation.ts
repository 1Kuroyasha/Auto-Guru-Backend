import { Request, Response, NextFunction, RequestHandler } from "express";
import { ObjectSchema } from "joi";

import ErrorFactory from "../Types/Error";

import { checkForMissingParams } from "../Utils/utils";

export const validate =
	(schema: ObjectSchema): RequestHandler =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.body);
			next();
		} catch (e) {
			const err = e as Error;
			next(new ErrorFactory(err.message, "BAD_REQUEST"));
		}
	};

export const checkRequiredFields =
	(requiredParams: string[]) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const missingParameters = checkForMissingParams(req.body, requiredParams);
			if (missingParameters.length !== 0) {
				const message = `field(s): [ ${missingParameters} ] are required`;
				throw new ErrorFactory(message, "VALIDATION_ERROR");
			}
			next();
		} catch (e) {
			next(e);
		}
	};
