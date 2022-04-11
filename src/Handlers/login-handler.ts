import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { comparePasswords } from "../Utils/bcrypt";
import CustomErrors from "../Structures/Errors";
import User from "../Models/User";
import { signUser } from "../Utils/jwt";

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { email, password } = req.body;

	try {
		const user = await User.findUserByEmail(email);
		if (!user) return next(new CustomErrors.NotAuthorized("invalid email"));

		const { _id: id, password: encrypted } = user;

		const matched = await comparePasswords(password, encrypted);
		if (!matched)
			return next(new CustomErrors.NotAuthorized("invalid password"));

		const token = await signUser(id);

		res.status(StatusCodes.OK).json({ token: `Bearer ${token}` });
	} catch (e) {
		const { message } = e as Error;
		const err = new CustomErrors.InternalServerError(message);
		next(err);
	}
};
