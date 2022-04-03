import { Router } from "express";

import CustomError from "../Structures/Errors";

const router = Router();

router.get("*", () => {
	throw CustomError.NotFound("this route is not available");
});

export default router;
