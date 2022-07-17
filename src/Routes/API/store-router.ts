import { Router } from "express";

import { authentication, authorization } from "../../Middlewares/auth";
import {
	getAllStores,
	getStore,
	updateStoreInfo,
	addCarToStore,
	removeCarFromStore,
} from "../../Handlers/store-handler";

const router = Router();

router.get("/store/:storeID", getStore);

router
	.route("/store")
	.get(getAllStores)
	.put(authentication, authorization("OWNER"), updateStoreInfo)
	.post(authentication, authorization("OWNER"), addCarToStore);

router.delete(
	"/store/:carID",
	authentication,
	authorization("OWNER"),
	removeCarFromStore,
);

export default router;
