import express from "express";

import config from "./config";

const PORT = config.PORT;

const app = express();

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
