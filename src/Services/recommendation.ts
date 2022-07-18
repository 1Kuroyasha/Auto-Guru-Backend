import config from "../config";

import fetch from "node-fetch";
import Car from "../Models/Car";

export const fetchRecommendations = async (userID: string) => {
	const response = await fetch(`${config.MICROSERVICE_URI}/api/user/${userID}`);
	const data = await response.json();

	if (data === {}) return await Car.getTrendingCars();
	return data;
};

export const fetchSimilarCars = async (carID: string) =>
	await (await fetch(`${config.MICROSERVICE_URI}/api/car/${carID}`)).json();
