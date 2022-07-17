import { Router } from "express";

import { getCar, getAllCars, bookCar } from "../../Handlers/car-handler";
import { getBookedCars, sellCar } from "../../Handlers/store-handler";
import { authentication, authorization } from "../../Middlewares/auth";

const router = Router();

router.get("/car", getAllCars);
router.get("/car/:id", getCar);

router.post("/book/:carID", authentication, authorization("CUSTOMER"), bookCar);
router.get("/booked", authentication, authorization("OWNER"), getBookedCars);

router.post("/sold/:carID", authentication, authorization("OWNER"), sellCar);

export default router;
