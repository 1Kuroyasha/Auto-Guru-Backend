import { Router } from "express";

import { getCar, getAllCars } from "../../Handlers/car-handler";

const router = Router();

router.get("/car", getAllCars);
router.get("/car/:id", getCar);

export default router;
