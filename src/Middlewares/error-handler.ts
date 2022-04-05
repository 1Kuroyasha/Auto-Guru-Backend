import { NextFunction, Request, Response } from "express";
import { CustomError } from "../Types/interfaces";
import logger from "../Utils/logging/logger";

export const errorLogger = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err.type === "INTERNAL_SERVER_ERROR") {
		logger.error(err.message);
	}

	next(err);
};

export const errorHandler = (
	err: CustomError,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_: NextFunction,
) => {
	res.status(err.status).send(err.message);
};
