import { StatusCodes } from "http-status-codes";

import { CustomErrors } from "./types";

export class CustomError extends Error {
	private __type;
	private __status;

	constructor(message: string, status: number | string, type: CustomErrors) {
		super(message);
		this.__type = type;
		this.__status = status;
	}

	public get status() {
		return this.__status;
	}

	public get type() {
		return this.__type;
	}
}

export default class ErrorFactory {
	public static internalServerError(message = "Internal server error") {
		return new CustomError(
			message,
			StatusCodes.INTERNAL_SERVER_ERROR,
			"INTERNAL_SERVER_ERROR",
		);
	}

	public static validationError(message = "Validation error") {
		return new CustomError(
			message,
			StatusCodes.BAD_REQUEST,
			"VALIDATION_ERROR",
		);
	}

	public static badRequest(message = "Bad request") {
		return new CustomError(message, StatusCodes.BAD_REQUEST, "BAD_REQUEST");
	}

	public static unauthorized(message = "Unauthorized") {
		return new CustomError(message, StatusCodes.UNAUTHORIZED, "UNAUTHORIZED");
	}

	public static forbidden(message = "Forbidden") {
		return new CustomError(message, StatusCodes.FORBIDDEN, "FORBIDDEN");
	}

	public static notFound(message = "Not found") {
		return new CustomError(message, StatusCodes.NOT_FOUND, "NOT_FOUND");
	}
}
