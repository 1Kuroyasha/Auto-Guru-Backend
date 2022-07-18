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

export const getToday = (): string => {
	const date = new Date();
	const dd = String(date.getDate());
	const mm = String(date.getMonth() + 1);
	const yyyy = date.getFullYear();

	return `${mm}/${dd}/${yyyy}`;
};

export const getRange = (arr: Date[]) => {
	const sorted = arr.sort((a, b) => (a > b ? 1 : -1));

	const maximum = sorted[sorted.length - 1];

	const minimum = sorted[0];

	return getDifferenceInMonths(maximum.getTime() - minimum.getTime());
};

const getDifferenceInMonths = (diff: number): number => {
	const temp = diff / (1000 * 3600 * 24);
	const months = Math.floor(temp / 30);

	return months;
};
