import config from "../config";

import jwt from "jsonwebtoken";

import ErrorFactory from "../Types/Error";

export const signUser = (id: string) =>
	new Promise(resolve => {
		jwt.sign({ id }, config.JWT_SECRET, {}, (err, token) => {
			if (err) throw new Error("invalid jwt");
			resolve(token);
		});
	});

export const getIdFromJwt = (token: string): Promise<string> =>
	new Promise(resolve => {
		jwt.verify(token, config.JWT_SECRET, async (err, jwtPayload) => {
			if (err) throw ErrorFactory.badRequest("invalid jwt");

			const { id } = jwtPayload as jwt.JwtPayload;
			if (!id) throw ErrorFactory.badRequest("invalid jwt");

			resolve(id);
		});
	});
