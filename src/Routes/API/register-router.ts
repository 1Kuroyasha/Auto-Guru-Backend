import { Router } from "express";

import {
	checkRequiredFields,
	checkEmailAvailability,
	validateRegister,
	register,
} from "../../Handlers/register-handler";

const router = Router();

router
	.route("/register")
	.post(
		checkRequiredFields,
		checkEmailAvailability,
		validateRegister,
		register,
	);

export default router;
