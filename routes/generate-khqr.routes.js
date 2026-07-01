import { Router } from "express";
import { generateKhqr } from "../controller/generate-khqr.controller.js";

const router = Router();

router.post("/generate_qrcode", generateKhqr);

export default router;
