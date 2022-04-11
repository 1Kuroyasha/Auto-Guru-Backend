export type UserType = "CUSTOMER" | "OWNER";

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
	id?: string;
	username: string;
	password: string;
	name: string;
	phone: string;
	email: string;
	age: number;
	userType: UserType;
}

export interface Customer extends User {
	salary?: number;
}

export interface Owner extends User {
	store?: Store;
}

export interface Credentials {
	email: string;
	password: string;
}

export interface UserInfo {
	_id: string;
	email: string;
	password: string;
	userType: string;
}

export interface CustomError extends Error {
	type: string;
	status: number;
}
