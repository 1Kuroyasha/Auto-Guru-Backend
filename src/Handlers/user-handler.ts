import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import ErrorFactory from "../Types/Error";
import User from "../Models/User";
import { hashPassword, comparePasswords } from "../Utils/bcrypt";
import { signUser } from "../Utils/jwt";

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { email, password } = req.body;

	try {
		const user = await User.findUserByEmail(email);
		if (!user) throw ErrorFactory.unauthorized("Invalid email");

		const { _id: id, password: encrypted } = user;

		const isMatch = await comparePasswords(password, encrypted);
		if (!isMatch) throw ErrorFactory.unauthorized("Invalid password");

		const token = await signUser(id);

		res.status(StatusCodes.OK).json({ token: `Bearer ${token}` });
	} catch (e) {
		next(e);
	}
};

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await User.getUserById(req.params.id);
		if (!user) throw ErrorFactory.notFound("resource not found");

		res.json(user);
	} catch (e) {
		next(e);
	}
};

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		const user = req.body;

		if (user.password) {
			user.password = await hashPassword(user.password);
		}

		await User.updateUser(id, user);
		res.sendStatus(StatusCodes.OK);
	} catch (e) {
		next(e);
	}
};

export const getAllOwners = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const owners = await User.getOwners();
		if (!owners) throw ErrorFactory.notFound("resource not found");

		res.json(owners);
	} catch (e) {
		next(e);
	}
};

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

		throw ErrorFactory.validationError("email is already registered");
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
		if (!token) throw ErrorFactory.internalServerError("Invalid jwt secret");

		res.status(StatusCodes.CREATED).json({ token: `Bearer ${token}` });
	} catch (e) {
		next(e);
	}
};
