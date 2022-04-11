import { Router } from "express";

import {
	checkRequiredFields,
	checkEmailAvailability,
	register,
} from "../../Handlers/register-handler";
import { validate } from "../../Middlewares/validation";
import { userSchema } from "../../Utils/validation/register-schemas";

const router = Router();

router
	.route("/register")
	.post(
		checkRequiredFields,
		checkEmailAvailability,
		validate(userSchema),
		register,
	);

export default router;
