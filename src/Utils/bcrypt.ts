import config from "../config";

import { hash } from "bcrypt";

const { SALT } = config;

const hashPassword = async (password: string): Promise<string> =>
	hash(password, SALT);

export default hashPassword;
