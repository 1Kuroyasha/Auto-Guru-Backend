import config from "../config";

import jwt from "jsonwebtoken";

export const signUser = (id: string) =>
	new Promise(resolve => {
		try {
			jwt.sign({ id }, config.JWT_SECRET, {}, (_, token) => resolve(token));
		} catch (e) {
			resolve(null);
		}
	});

export const getIdFromJwt = (token: string): Promise<string | null> =>
	new Promise(resolve => {
		jwt.verify(token, config.JWT_SECRET, async (_, jwtPayload) => {
			try {
				const { id } = jwtPayload as jwt.JwtPayload;
				resolve(id);
			} catch (e) {
				resolve(null);
			}
		});
	});
