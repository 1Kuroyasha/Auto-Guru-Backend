import { Router } from "express";

import {
	checkEmailAvailability,
	register,
} from "../../Handlers/register-handler";
import { checkRequiredFields, validate } from "../../Middlewares/validation";
import { userSchema } from "../../Utils/validation/register-schemas";

const router = Router();

router
	.route("/register")
	.post(
		checkRequiredFields([
			"username",
			"password",
			"name",
			"phone",
			"email",
			"age",
			"userType",
		]),
		checkEmailAvailability,
		validate(userSchema),
		register,
	);

export default router;
