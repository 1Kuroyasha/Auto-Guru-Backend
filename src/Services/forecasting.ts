import { getRange } from "../Utils/general";

const incrementDate = (date: {
	month: number;
	year: number;
}): { month: number; year: number } => {
	if (date.month === 12) {
		date.month = 1;
		date.year++;
	} else date.month++;
	return date;
};

const getRevenuePerMonth = (
	sorted: [{ date: string; revenue: number }],
	range: number,
): number[] => {
	const months: number[] = [];
	months.push(sorted[0].revenue);

	const date = {
		month: new Date(sorted[0].date).getMonth() + 1,
		year: new Date(sorted[0].date).getFullYear(),
	};

	sorted.forEach(item => {
		for (let i = 1; i < range; i++) {
			if (
				date.month === new Date(item.date).getMonth() + 1 &&
				date.year === new Date(item.date).getFullYear()
			) {
				months.push(months[months.length - 1] + item.revenue);
				break;
			} else months.push(months[months.length - 1]);
			incrementDate(date);
		}
	});

	return months;
};

export const getForecasts = (sales: [{ date: string; revenue: number }]) => {
	const numberOfMonths = 10;
	const numberFfForecasts = 3;
	const range = getRange(sales.map(e => new Date(e.date)));
	if (range < numberOfMonths) return null;

	const sorted = sales.sort((a, b) =>
		new Date(a.date) > new Date(b.date) ? 1 : -1,
	);

	const months = getRevenuePerMonth(sorted, range);

	for (let i = 0; i < numberFfForecasts; i++) {
		let sum = 0;

		for (let j = 0; j < numberOfMonths; j++) {
			sum += months[months.length - 1 - j];
		}

		months.push(sum / numberOfMonths);
	}

	return { start: sorted[0].date, months };
};
