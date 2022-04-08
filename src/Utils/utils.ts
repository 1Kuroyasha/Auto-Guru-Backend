import { request } from "express";

export const checkForMissingParams = (
	body: typeof request.body,
	params: string[],
): string[] => {
	const missingParams: string[] = [];

	params.forEach(field => {
		if (!body[field]) missingParams.push(field);
	});

	return missingParams;
};
