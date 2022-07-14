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
	constructor(message: string, type: CustomErrors = "INTERNAL_SERVER_ERROR") {
		let status = null;

		switch (type) {
			case "INTERNAL_SERVER_ERROR":
				status = StatusCodes.INTERNAL_SERVER_ERROR;
				break;
			case "VALIDATION_ERROR":
				status = StatusCodes.BAD_REQUEST;
				break;
			case "BAD_REQUEST":
				status = StatusCodes.BAD_REQUEST;
				break;
			case "UNAUTHORIZED":
				status = StatusCodes.UNAUTHORIZED;
				break;
			case "FORBIDDEN":
				status = StatusCodes.FORBIDDEN;
				break;
			case "NOT_FOUND":
				status = StatusCodes.NOT_FOUND;
				break;
			default:
				status = StatusCodes.INTERNAL_SERVER_ERROR;
				break;
		}

		return new CustomError(message, status, type);
	}
}
