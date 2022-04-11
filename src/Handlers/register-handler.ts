import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import User from "../Models/User";
import CustomErrors from "../Structures/Errors";
import { hashPassword } from "../Utils/bcrypt";
import { signUser } from "../Utils/jwt";
import { checkForMissingParams } from "../Utils/utils";
import { userSchema } from "../Utils/validation/register-schemas";

export const checkRequiredFields = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const requiredParams = [
		"username",
		"password",
		"name",
		"phone",
		"email",
		"age",
		"userType",
	];
	const missingParameters = checkForMissingParams(req.body, requiredParams);
	if (missingParameters.length === 0) return next();

	const message = `field(s): [${missingParameters}] are required`;
	const err = new CustomErrors.ValidationError(message);
	next(err);
};

export const checkEmailAvailability = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email } = req.body;
		const found = await User.findUserByEmail(email);
		if (found) {
			const err = new CustomErrors.ValidationError(
				"email is already registered",
			);

			return next(err);
		}

		next();
	} catch (e) {
		const { message } = e as Error;
		const err = new CustomErrors.InternalServerError(message);
		next(err);
	}
};

export const validateRegister = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await userSchema.validateAsync(req.body);
		return next();
	} catch (e) {
		const { message } = e as Error;
		const err = new CustomErrors.ValidationError(message);
		next(err);
	}
};

export const register = async (req: Request, res: Response) => {
	const { username, password, name, phone, email, age, salary, userType } =
		req.body;
	try {
		const hashed = await hashPassword(password);

		const id = await User.create({
			username,
			password: hashed,
			name,
			phone,
			email,
			age,
			salary,
			userType,
		});

		const token = await signUser(id);

		res.status(StatusCodes.CREATED).json({ token: `Bearer ${token}` });
	} catch (e) {
		const { message } = e as Error;
		throw new CustomErrors.InternalServerError(message);
	}
};
