import config from "../config";

import { hash, compare } from "bcrypt";

const { SALT } = config;

export const hashPassword = async (password: string): Promise<string> =>
	hash(password, SALT);

export const comparePasswords = async (
	password: string,
	encryptedPassword: string,
) => await compare(password, encryptedPassword);
