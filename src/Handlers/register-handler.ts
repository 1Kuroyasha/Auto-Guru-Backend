import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import User from "../Models/User";
import ErrorFactory from "../Types/Error";

import { hashPassword } from "../Utils/bcrypt";
import { signUser } from "../Utils/jwt";

export const checkEmailAvailability = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email } = req.body;
		const found = await User.findUserByEmail(email);
		if (!found) {
			return next();
		}

		throw new ErrorFactory("email is already registered", "VALIDATION_ERROR");
	} catch (e) {
		next(e);
	}
};

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
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
		if (!token)
			throw new ErrorFactory("Invalid jwt secret", "INTERNAL_SERVER_ERROR");

		res.status(StatusCodes.CREATED).json({ token: `Bearer ${token}` });
	} catch (e) {
		next(e);
	}
};
