import { Router } from "express";
import { checkPayment } from "../controller/check-payment.controller.js";

const router = Router();

router.post("/check_payment", checkPayment);

export default router;
