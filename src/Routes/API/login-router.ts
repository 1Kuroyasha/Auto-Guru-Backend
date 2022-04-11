import { Router } from "express";

import { validateLogin, login } from "../../Handlers/login-handler";

const router = Router();

router.route("/login").post(validateLogin, login);

export default router;
