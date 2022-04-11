import config from "../config";

import { hash, compare } from "bcrypt";

const { SALT } = config;

export const hashPassword = async (password: string): Promise<string> =>
	hash(password, SALT);

export const comparePasswords = (password: string, encryptedPassword: string) =>
	new Promise((resolve, reject) => {
		compare(password, encryptedPassword, (err, matched) => {
			if (err) reject(err);
			resolve(matched);
		});
	});
