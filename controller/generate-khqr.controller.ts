import type { Request, Response } from "express";
import { BakongKHQR, khqrData, IndividualInfo } from "bakong-khqr";

export const generateKhqr = async (_req: Request, res: Response) => {
    const expirationTimestamp = Date.now() + 5 * 60 * 1000;

    const order = {
        userId: "3345433",
        amount: 0,
        status: "pending",
        currency: "USD",
        payment_method: "khqr",
        paid: false,
    };

    const optionalData = {
        currency: khqrData.currency.usd,
        amount: order.amount,
        expirationTimestamp,
    };

    const individualInfo = new IndividualInfo(
        process.env.BAKONG_ACCOUNT_ID,
        process.env.BAKONG_ACCOUNT_NAME,
        "PHNOM PENH",
        optionalData
    );

    const KHQR = new BakongKHQR();
    const response = KHQR.generateIndividual(individualInfo);

    console.log("response", response);

    res.status(200).json(response);
};
