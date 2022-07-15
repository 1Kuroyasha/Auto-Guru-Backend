import { Router } from "express";

import { authentication, authorization } from "../../Middlewares/auth";
import { checkRequiredFields, validate } from "../../Middlewares/validation";
import {
	loginSchema,
	registerSchema,
} from "../../Utils/validation/user-schemas";
import {
	getUser,
	updateUser,
	login,
	register,
	checkEmailAvailability,
	getWishlist,
	addCarToWishlist,
	removeCarFromWishlist,
} from "../../Handlers/user-handler";

const router = Router();

router.post("/login", validate(loginSchema), login);

router.post(
	"/register",
	checkRequiredFields(["email"]),
	checkEmailAvailability,
	validate(registerSchema),
	register,
);

router
	.route("/user/:id")
	.put(authentication, authorization(), updateUser)
	.get(authentication, authorization(), getUser);

router.get("/wishlist", authentication, authorization("CUSTOMER"), getWishlist);
router
	.route("/wishlist/:id")
	.post(authentication, authorization("CUSTOMER"), addCarToWishlist)
	.delete(authentication, authorization("CUSTOMER"), removeCarFromWishlist);

export default router;
