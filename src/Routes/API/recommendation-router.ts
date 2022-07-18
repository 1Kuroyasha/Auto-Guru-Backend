import { Router } from "express";
import { authentication, authorization } from "../../Middlewares/auth";
import {
	getRecommendation,
	getSimilarCars,
} from "../../Handlers/recommendation-handler";

const router = Router();

router.get(
	"/recommended",
	authentication,
	authorization("CUSTOMER"),
	getRecommendation,
);

router.get("/recommended/:carID", getSimilarCars);

export default router;
