import convict from "convict";
import { resolve } from "path";

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
		default: "mongodb://localhost:27017/",
	},
});

const env = config.get("env");

const filePath = resolve(__dirname, `../config/${env}.json`);
config.loadFile([filePath]);

config.validate({ allowed: "strict" });

export default config.getProperties();
