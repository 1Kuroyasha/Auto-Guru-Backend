import { StatusCodes } from "http-status-codes";

export class CustomError extends Error {
	private __type: string;
	private __status: number;

	constructor(message: string, status: number, type: string) {
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

class InternalServerError extends CustomError {
	constructor(message: string) {
		super(message, StatusCodes.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR");
	}
}

class ValidationError extends CustomError {
	constructor(message: string, status: number = StatusCodes.BAD_REQUEST) {
		super(message, status, "VALIDATION_ERROR");
	}
}

class BadRequest extends CustomError {
	constructor(message: string) {
		super(message, StatusCodes.BAD_REQUEST, "BAD_REQUEST");
	}
}

class NotAuthorized extends CustomError {
	constructor(message: string) {
		super(message, StatusCodes.UNAUTHORIZED, "NOT_AUTHORIZED");
	}
}

class Forbidden extends CustomError {
	constructor() {
		super("This resource is forbidden", StatusCodes.FORBIDDEN, "FORBIDDEN");
	}
}

class NotFound extends CustomError {
	constructor(message: string) {
		super(message, StatusCodes.NOT_FOUND, "NOT_FOUND");
	}
}

export default {
	InternalServerError,
	ValidationError,
	NotAuthorized,
	NotFound,
	BadRequest,
	Forbidden,
};
