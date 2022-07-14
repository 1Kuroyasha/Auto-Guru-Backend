import config from "../config";

import { NextFunction, Request, Response } from "express";

import ErrorFactory, { CustomError } from "../Types/Error";
import logger from "../Utils/logging/logger";

export const errorAdapter = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err instanceof CustomError) return next(err);

	next(new ErrorFactory(err.message));
};

export const errorLogger = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err.type === "INTERNAL_SERVER_ERROR" || config.env === "development") {
		logger.error(err.message);
	}

	next(err);
};

export const errorHandler = (
	err: CustomError,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction,
) => {
	const response = {
		message: err.type === "INTERNAL_SERVER_ERROR" ? err.type : err.message,
	};

	res.status(err.status as number).send(response);
};
