import config from "../config";

import jwt from "jsonwebtoken";

export const signUser = (id: string) =>
	new Promise((resolve, reject) => {
		jwt.sign({ id }, config.JWT_SECRET, {}, (err, token) => {
			if (err) reject();
			resolve(token);
		});
	});
