import config, { env } from "./config";

import express from "express";
import cors from "cors";
import morgan from "morgan";

import logger from "./Utils/logging/logger";
import router from "./Routes/router";

const PORT = config.PORT;

const app = express();

const strategy = env === "DEVELOPMENT" ? "dev" : "short";
app.use(morgan(strategy));

app.use(cors());
app.use(router);

app.listen(PORT, () =>
	logger.info(`Server started and listening on port: ${PORT}`),
);
