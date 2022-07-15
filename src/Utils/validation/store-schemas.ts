import Joi from "joi";

export const storeSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),

	phone: Joi.string()
		.pattern(/0[0125]\d{9}/)
		.required(),

	address: Joi.string().min(10).required(),
	website: Joi.string().uri().required(),
});
