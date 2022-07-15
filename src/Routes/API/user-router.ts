import { Router } from "express";

import { authentication, authorization } from "../../Middlewares/auth";
import { checkRequiredFields, validate } from "../../Middlewares/validation";
import {
	loginSchema,
	registerSchema,
} from "../../Utils/validation/user-schemas";
import {
	getAllOwners,
	getUser,
	updateUser,
	login,
	register,
	checkEmailAvailability,
} from "../../Handlers/user-handler";

const router = Router();

router.route("/login").post(validate(loginSchema), login);

router.post(
	"/register",
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
	validate(registerSchema),
	register,
);

router.get("/user/:id", authentication, authorization(), getUser);

router
	.route("/user")
	.put(authentication, authorization(), updateUser)
	.get(authentication, authorization("OWNER"), getAllOwners);

export default router;
