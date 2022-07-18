import { Router } from "express";
import { authentication, authorization } from "../../Middlewares/auth";
import { postFilter } from "../../Handlers/filter-handler";

const router = Router();

router.post("/filter", authentication, authorization("CUSTOMER"), postFilter);

export default router;
