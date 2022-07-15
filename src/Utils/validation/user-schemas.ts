import Joi from "joi";

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(12).required(),
});

export const registerSchema = Joi.object({
	username: Joi.string().min(4).max(10).required(),
	password: Joi.string().min(6).max(12).required(),
	name: Joi.string().required(),

	phone: Joi.string()
		.pattern(/0[0125]\d{9}/)
		.required(),

	email: Joi.string().email().required(),
	age: Joi.number().min(18).max(116).required(),
	salary: Joi.number(),
	userType: Joi.string().equal("CUSTOMER", "OWNER").required(),
});
