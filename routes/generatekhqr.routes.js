import { Router } from "express";
import { generatekhqr } from "../controller/generatekhqr.controller.js";

const router = Router();

router.post("/generate_qrcode", generatekhqr);

export default router;
