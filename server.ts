import express from "express";
import cors from "cors";
import generateKhqrRoutes from "./routes/generate-khqr.routes.js";
import dotenv from "dotenv";
import checkPaymentRoutes from "./routes/check-payment.routes.js";

const app = express();
const port = 3000;

const env = process.env.NODE_ENV || "dev";

console.log("env : ", env);

dotenv.config({
    path: [`.env.${env}`, ".env"],
    override: true,
    debug: true,
    quiet: true,
});

app.use(cors());
app.use(express.json());

app.use("/api", generateKhqrRoutes);
app.use("/api", checkPaymentRoutes);

app.get("/api/health", (_, res) => {
    res.json({ status: "ok" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
