export type CustomErrors =
	| "INTERNAL_SERVER_ERROR"
	| "VALIDATION_ERROR"
	| "BAD_REQUEST"
	| "UNAUTHORIZED"
	| "FORBIDDEN"
	| "NOT_FOUND"
	| "NOT_IMPLEMENTED";

export type CarBodyType =
	| "Sedan"
	| "Hatchback"
	| "SUV"
	| "Coupe"
	| "Van"
	| "Cabriolet";

export type Transmission = "Automatic" | "Manual" | "Dual Clutch" | "CVT";

export type UserType = "CUSTOMER" | "OWNER";

export type CarID = string;

export type userID = string;
