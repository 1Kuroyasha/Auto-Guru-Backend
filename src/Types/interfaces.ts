export interface Car {
	make: string;
	model: string;
	bodyType: string;
	engineCapacity: number;
	productionYear: number;
	availableColors: Array<string>;
}

export interface Store {
	email: string;
	phone: string;
	address: string;
	website: string;
	cars: Array<Car>;
}

export interface User {
	username: string;
	password: string;
	name: string;
	phone: string;
	email: string;
	age: number;
}

export interface Customer extends User {
	salary: number;
}
