import { Request, Response, NextFunction, Router } from "express";

import ErrorFactory from "../Types/Error";
import * as routers from "./API/index";

const mainRouter = Router();

Object.values(routers).forEach(router => {
	mainRouter.use(router);
});

mainRouter.get("*", (req: Request, res: Response, next: NextFunction) =>
	next(ErrorFactory.notFound("route not found")),
);

export default mainRouter;
