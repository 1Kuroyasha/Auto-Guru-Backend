import config from "../config";

import jwt from "jsonwebtoken";

export const signUser = (id: string) =>
	new Promise((resolve, reject) => {
		jwt.sign({ id }, config.JWT_SECRET, {}, (err, token) => {
			if (err) reject();
			resolve(token);
		});
	});

export const getIdFromJwt = (token: string): Promise<string | null> =>
	new Promise(resolve => {
		jwt.verify(token, config.JWT_SECRET, async (err, jwtPayload) => {
			if (!err) {
				const { id } = jwtPayload as jwt.JwtPayload;
				if (!id) resolve(null);

				resolve(id);
			} else resolve(null);
		});
	});
