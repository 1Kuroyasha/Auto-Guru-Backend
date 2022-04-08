import { Request, Response, NextFunction, Router } from "express";

import CustomErrors from "../Structures/Errors";
import * as routers from "./API/index";

const mainRouter = Router();

Object.values(routers).forEach(router => {
	mainRouter.use(router);
});

mainRouter.get("*", (req: Request, res: Response, next: NextFunction) => {
	const err = new CustomErrors.NotFound("this route is not available");
	next(err);
});

export default mainRouter;
