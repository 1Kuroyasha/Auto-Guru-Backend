import { resolve } from "path";
import convict from "convict";

const config = convict({
	env: {
		format: ["production", "development", "testing"],
		default: "development",
		env: "NODE_ENV",
		arg: "env",
	},
	PORT: {
		format: "port",
		default: 8080,
		env: "PORT",
	},
	DATABASE: {
		format: "*",
		default: "mongodb://localhost:27017/test",
	},
	SALT: {
		format: "int",
		default: 6,
	},
	JWT_SECRET: {
		format: "*",
		default: "SecretText",
	},
	MICROSERVICE_URI: {
		format: "*",
		default: "http://127.0.0.1:5000/",
	},
});

const env = config.get("env");
const filePath = resolve(__dirname, `../config/${env}.json`);
config.loadFile([filePath]);

config.validate({ allowed: "strict" });

export default config.getProperties();
