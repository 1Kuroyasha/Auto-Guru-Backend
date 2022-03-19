import config from "./config";

import express from "express";
import cors from "cors";

import router from "./Routes/router";

const PORT = config.PORT;

const app = express();
app.use(cors());
app.use(router);

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
