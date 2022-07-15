import Joi from "joi";

import { storeSchema } from "./store-schemas";

// TODO: Refactor to use reduce code duplication

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(12).required(),
});

export const customerSchema = Joi.object({
	username: Joi.string().min(4).max(10).required(),
	password: Joi.string().min(6).max(12).required(),
	name: Joi.string().required(),

	phone: Joi.string()
		.pattern(/0[0125]\d{9}/)
		.required(),

	email: Joi.string().email().required(),
	age: Joi.number().min(16).max(116).required(),
	salary: Joi.number(),
	userType: Joi.string().equal("CUSTOMER").required(),
});

export const ownerSchema = Joi.object({
	username: Joi.string().min(4).max(10).required(),
	password: Joi.string().min(6).max(12).required(),
	name: Joi.string().required(),

	phone: Joi.string()
		.pattern(/0[0125]\d{9}/)
		.required(),

	email: Joi.string().email().required(),
	age: Joi.number().min(16).max(116).required(),
	userType: Joi.string().equal("OWNER").required(),
	store: storeSchema.required(),
});
