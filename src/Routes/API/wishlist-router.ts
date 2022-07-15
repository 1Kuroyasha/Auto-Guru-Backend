import { Router } from "express";

import { authentication, authorization } from "../../Middlewares/auth";
import {
	getWishlist,
	addCarToWishlist,
	removeCarFromWishlist,
} from "../../Handlers/wishlist-handler";

const router = Router();

router.get("/wishlist", authentication, authorization("CUSTOMER"), getWishlist);
router
	.route("/wishlist/:id")
	.post(authentication, authorization("CUSTOMER"), addCarToWishlist)
	.delete(authentication, authorization("CUSTOMER"), removeCarFromWishlist);

export default router;
