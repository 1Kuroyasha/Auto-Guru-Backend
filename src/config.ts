import convict from "convict";
import { resolve } from "path";

const configSchema = convict({
	env: {
		format: ["production", "development", "testing"],
		default: "development",
		env: "NODE_ENV",
		arg: "env",
	},
	config: {
		PORT: {
			format: "port",
			default: 8080,
			env: "PORT",
			arg: "port",
		},
		DATABASE: {
			format: "*",
			default: "mongodb://localhost:27017/",
		},
	},
});

const env = configSchema.get("env");

const filePath = resolve(__dirname, `../config/${env}.json`);
configSchema.loadFile([filePath]);

configSchema.validate({ allowed: "strict" });

const config = configSchema.get("config");
export default config;
