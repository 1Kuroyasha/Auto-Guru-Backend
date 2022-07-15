import config from "../config";

import { hash, compare } from "bcrypt";

export const hashPassword = async (password: string): Promise<string> =>
	hash(password, config.SALT);

export const comparePasswords = async (
	password: string,
	encryptedPassword: string,
) => await compare(password, encryptedPassword);
