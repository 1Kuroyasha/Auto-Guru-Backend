import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import ErrorFactory from "../Types/Error";
import User from "../Models/User";
import { hashPassword, comparePasswords } from "../Utils/bcrypt";
import { signUser } from "../Utils/jwt";
import { customerSchema, ownerSchema } from "../Utils/validation/user-schemas";

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password } = req.body;

		const user = await User.findUserByEmail(email);
		if (!user) throw ErrorFactory.unauthorized("Invalid email");

		const { _id: id, password: encrypted } = user;

		const isMatch = await comparePasswords(password, encrypted);
		if (!isMatch) throw ErrorFactory.unauthorized("Invalid password");

		const token = await signUser(id);
		if (!token) throw ErrorFactory.internalServerError("invalid jwt token");

		res.json({ token: `Bearer ${token}` });
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
		const user = req.body;

		if (user.userType)
			throw ErrorFactory.badRequest("user type cannot be updated");

		if (user.password) user.password = await hashPassword(user.password);

		await User.updateUser(req.params.id, user);
		res.sendStatus(StatusCodes.OK);
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
		const found = await User.findUserByEmail(req.body.email);
		if (!found) return next(); // if user not found, then email is available

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
	try {
		const { password, ...user } = req.body;
		const hashed = await hashPassword(password);

		const id = await User.create({
			password: hashed,
			...user,
		});

		const token = await signUser(id);
		if (!token) throw ErrorFactory.internalServerError("invalid jwt token");

		res.json({ token: `Bearer ${token}` });
	} catch (e) {
		next(e);
	}
};

export const validateUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userType = req.body.userType;

		if (userType === "CUSTOMER") await customerSchema.validateAsync(req.body);
		else if (userType === "OWNER") await ownerSchema.validateAsync(req.body);
		else throw ErrorFactory.validationError("user type is invalid");

		next();
	} catch (e) {
		const err = e as Error;
		if (err.name === "ValidationError")
			return next(ErrorFactory.validationError(err.message));

		next(e);
	}
};
