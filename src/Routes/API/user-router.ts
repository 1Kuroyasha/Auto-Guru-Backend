import { Router } from "express";

import { authentication, authorization } from "../../Middlewares/auth";
import { checkRequiredFields, validate } from "../../Middlewares/validation";
import { loginSchema } from "../../Utils/validation/user-schemas";
import {
	addCarToWishlist,
	removeCarFromWishlist,
	getWishlist,
} from "../../Handlers/wishlist-handler";
import {
	getUser,
	updateUser,
	login,
	register,
	checkEmailAvailability,
	validateUser,
	getForecast,
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

router.get("/wishlist", authentication, authorization("CUSTOMER"), getWishlist);
router
	.route("/wishlist/:id")
	.post(authentication, authorization("CUSTOMER"), addCarToWishlist)
	.delete(authentication, authorization("CUSTOMER"), removeCarFromWishlist);

router.get("/forecast", authentication, authorization("OWNER"), getForecast);

export default router;
