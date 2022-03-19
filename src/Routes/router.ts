import { Router, Request, Response } from "express";

const router = Router();

router.get("*", (_: Request, res: Response): void => {
	res.sendStatus(404);
});

export default router;
