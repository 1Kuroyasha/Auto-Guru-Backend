import Joi from "joi";

export const storeSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),

	phone: Joi.string().required(),

	address: Joi.string().min(10).required(),
	website: Joi.string().required(),
});
