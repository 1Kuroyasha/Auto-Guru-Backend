import { Router } from "express";

import { authentication, authorization } from "../../Middlewares/auth";
import { checkRequiredFields, validate } from "../../Middlewares/validation";
import { loginSchema } from "../../Utils/validation/user-schemas";
import {
	getUser,
	updateUser,
	login,
	register,
	checkEmailAvailability,
	validateUser,
} from "../../Handlers/user-handler";

const router = Router();

router.post("/login", validate(loginSchema), login);

router.post(
	"/register",
	checkRequiredFields(["email"]),
	checkEmailAvailability,
	validateUser,
	register,
);

router
	.route("/user/:id")
	.put(authentication, authorization(), updateUser)
	.get(authentication, authorization(), getUser);

export default router;
