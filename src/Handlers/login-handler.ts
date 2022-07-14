import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { comparePasswords } from "../Utils/bcrypt";
import User from "../Models/User";
import { signUser } from "../Utils/jwt";
import ErrorFactory from "../Types/Error";

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { email, password } = req.body;

	try {
		const user = await User.findUserByEmail(email);
		if (!user) throw new ErrorFactory("Invalid email", "UNAUTHORIZED");

		const { _id: id, password: encrypted } = user;

		const isMatch = await comparePasswords(password, encrypted);
		if (!isMatch) throw new ErrorFactory("Invalid password", "UNAUTHORIZED");

		const token = await signUser(id);

		res.status(StatusCodes.OK).json({ token: `Bearer ${token}` });
	} catch (e) {
		next(e);
	}
};
