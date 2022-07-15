import Joi from "joi";

export const carSchema = Joi.object({
	make: Joi.string().required(),
	model: Joi.string().required(),
	price: Joi.number().required(),
	productionYear: Joi.number().required(),
	numberOfDoors: Joi.number().required(),
	engineCapacity: Joi.number().required(),
	transmission: Joi.string().required(),
	bodyType: Joi.string().required(),
});
