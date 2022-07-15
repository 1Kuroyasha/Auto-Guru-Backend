import { CarBodyType, Transmission, UserType, CarID, userID } from "./types";

export interface Car {
	make: string;
	model: string;
	bodyType: CarBodyType;
	engineCapacity: number;
	productionYear: number;
	numberOfDoors: number;
	transmission: Transmission;
	price: number;
	availableColors: Array<string>;
}

export interface Store {
	owner: userID;
	email: string;
	phone: string;
	address: string;
	website: string;
	cars: Array<CarID>;
}

export interface UserInterface {
	id?: string;
	username: string;
	password: string;
	name: string;
	phone: string;
	email: string;
	age: number;
	userType: UserType;
}

export interface Customer extends UserInterface {
	salary?: number;
	wishlist: Array<CarID>;
}

export interface Owner extends UserInterface {
	store?: string;
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
