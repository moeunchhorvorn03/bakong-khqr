import type { Request, Response } from "express";
import axios from "axios";

interface CheckPaymentBody {
    qr_md5?: string;
}

interface BakongCheckResponse {
    responseCode: number;
    data?: {
        hash?: string;
    };
}

export const checkPayment = async (
    req: Request<unknown, unknown, CheckPaymentBody>,
    res: Response
) => {
    const { qr_md5 } = req.body;

    try {
        if (!qr_md5) {
            console.log("qr_md5 is required!❌");
            return res.status(400).json({
                success: false,
                message: "QR code is required",
            });
        }

        if (!process.env.BAKONG_BASE_API_URL || !process.env.BAKONG_ACCESS_TOKEN) {
            console.log("problem might be : BAKONG_BASE_API_URL, and BAKONG_ACCESS_TOKEN");
            const data = {
                success: false,
                message:
                    "Missing required environment variables: BAKONG_BASE_API_URL or BAKONG_ACCESS_TOKEN",
            };
            return res.status(400).json(data);
        }

        const url = `${process.env.BAKONG_BASE_API_URL}/check_transaction_by_md5`;
        const headers = { Authorization: `Bearer ${process.env.BAKONG_ACCESS_TOKEN}` };
        const body = { md5: qr_md5 };

        const response = await axios.post<BakongCheckResponse>(url, body, { headers });
        const data = response.data;

        console.log("response : ", data);

        if (data.responseCode !== 0 || !data.data?.hash) {
            console.log("payment not found!❌");
            return res.status(404).json({
                success: false,
                message: "payment not found!",
            });
        }

        console.log("payment confirmed!✅");
        return res.status(200).json({
            success: true,
            message: "Payment confirmed",
            data: {
                bakongHash: data.data.hash,
            },
        });
    } catch (error) {
        console.log("payment error : ", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        return res.status(500).json({
            success: false,
            message,
        });
    }
};
