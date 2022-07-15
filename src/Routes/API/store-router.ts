import { Router } from "express";

import { authentication, authorization } from "../../Middlewares/auth";
import {
	getAllStores,
	getStore,
	updateStoreInfo,
} from "../../Handlers/store-handler";

const router = Router();

router.get("/store", getAllStores);
router
	.route("/store/:id")
	.get(getStore)
	.put(authentication, authorization("OWNER"), updateStoreInfo);

export default router;
