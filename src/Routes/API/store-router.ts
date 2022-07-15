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

router.get("/store", getAllStores);
router
	.route("/store/:id")
	.get(getStore)
	.put(authentication, authorization("OWNER"), updateStoreInfo)
	.post(authentication, authorization("OWNER"), addCarToStore)
	.delete(authentication, authorization("OWNER"), removeCarFromStore);

export default router;
