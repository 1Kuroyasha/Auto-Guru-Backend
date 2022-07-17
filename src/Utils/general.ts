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

export const includes = (
	arr: Array<{ [key: string]: string }>,
	obj: { [key: string]: string },
): boolean => {
	let found = false;

	for (const item of arr) {
		const objKeys = Object.keys(obj);

		const subset = objKeys.reduce((subset, key) => {
			if (subset === false) return false;
			else {
				if (item[key] === obj[key]) return true;
				else return false;
			}
		}, true);

		if (subset === true) {
			found = true;
			break;
		}
	}

	return found;
};

export const indexOf = (
	arr: Array<{ [key: string]: string }>,
	obj: { carID: string },
): number => {
	let index = -1;

	for (const item of arr) {
		if (item.carID === obj.carID) {
			index = arr.indexOf(item);
			break;
		}
	}

	return index;
};
