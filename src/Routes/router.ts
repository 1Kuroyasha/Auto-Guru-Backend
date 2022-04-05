import { Router } from "express";

import CustomErrors from "../Structures/Errors";

const router = Router();

router.get("*", () => {
	throw new CustomErrors.NotFound("this route is not available");
});

export default router;
