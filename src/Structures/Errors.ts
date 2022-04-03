import { StatusCodes } from "http-status-codes";

class CustomError extends Error {
	private __type;
	private __status;

	constructor(message: string, status: number, type: string) {
		super(message);
		this.__type = type;
		this.__status = status;
	}

	public static InternalServerError(message: string) {
		return new CustomError(
			message,
			StatusCodes.INTERNAL_SERVER_ERROR,
			"INTERNAL_SERVER_ERROR",
		);
	}

	public static ValidationError(message: string) {
		return new CustomError(message, StatusCodes.BAD_REQUEST, "BAD_REQUEST");
	}

	public static NotAuthorized(message: string) {
		return new CustomError(message, StatusCodes.UNAUTHORIZED, "NOT_AUTHORIZED");
	}

	public static NotFound(message: string) {
		return new CustomError(message, StatusCodes.NOT_FOUND, "NOT_FOUND");
	}

	public get status() {
		return this.__status;
	}

	public get type() {
		return this.__type;
	}
}

export default CustomError;
