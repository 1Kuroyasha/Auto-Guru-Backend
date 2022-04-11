import { Router } from "express";

import { login } from "../../Handlers/login-handler";
import { validate } from "../../Middlewares/validation";
import { loginSchema } from "../../Utils/validation/login-schema";

const router = Router();

router.route("/login").post(validate(loginSchema), login);

export default router;
