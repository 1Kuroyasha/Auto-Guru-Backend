import { NextFunction, Request, Response } from "express";
import CustomError from "../Structures/Errors";
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
	_: NextFunction,
) => {
	res.status(err.status).send(err.message);
};
