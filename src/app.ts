import config from "./config";

import express from "express";

import router from "./Routes/router";

const PORT = config.PORT;

const app = express();
app.use(router);

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
