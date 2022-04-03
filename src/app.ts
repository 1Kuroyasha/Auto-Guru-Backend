import config from "./config";

import express from "express";
import cors from "cors";
import morgan from "morgan";

import logger from "./Utils/logging/logger";
import router from "./Routes/router";
import { errorLogger, errorHandler } from "./Middlewares/error-handler";

const PORT = config.PORT;

const app = express();

const loggingStrategy = config.env === "development" ? "dev" : "short";
app.use(morgan(loggingStrategy));

app.use(cors());

app.use(router);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () =>
	logger.info(`Server started and listening on port: ${PORT}`),
);
