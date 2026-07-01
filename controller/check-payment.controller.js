import axios from 'axios';

export const checkPayment = async (req, res) => {
    const { qr_md5 } = req.body;

    try {
        // const userId = await db.User.findByPk(id);
        // if(!userId) return res.status(404).json({success : false, message : 'user not found!'});

        // const order = await db.Order.findOne({where : {userId : id, qr_md5}});

        // if(order.paid && order.status === 'paid') {
        //     return res.status(200).json({
        //         success : true,
        //         message : "Payment already confirmed",
        //         data : {
        //             id : order.id,
        //             bakongHash : order.bakongHash,
        //             paid_at : order.paid_at,
        //         }
        //     })
        // }

        // if(order.qr_expiration && Date.now() > order.qr_expiration) {
        //     return res.status(400).json({
        //         success : false,
        //         message : "QR code has expired."
        //     })
        // }

        // if(order.qr_md5 !== qr_md5) {
        //     return res.status(400).json({
        //         success : false, 
        //         message : "Invalid QR code"
        //     })
        // }

        if (!qr_md5) {
            console.log('qr_md5 is required!❌');
            return res.status(400).json({
                success : false,
                message : "QR code is required"
            });
        }

        if (!process.env.BAKONG_BASE_API_URL || !process.env.BAKONG_ACCESS_TOKEN) {
            console.log("problem might be : BAKONG_BASE_API_URL, and BAKONG_ACCESS_TOKEN");
            const data = {
                success : false,
                message : "Missing required environment variables: BAKONG_BASE_API_URL or BAKONG_ACCESS_TOKEN"
            }
            return res.status(400).json(data);
        }

        if (process.env.BAKONG_BASE_API_URL && process.env.BAKONG_ACCESS_TOKEN) {
            const url = `${process.env.BAKONG_BASE_API_URL}/check_transaction_by_md5`;
            const headers = { Authorization : `Bearer ${process.env.BAKONG_ACCESS_TOKEN}` };
            const body = { md5 : qr_md5 };

            const response = await axios.post(url, body, { headers });

            const data = response.data;
            
            console.log("response : ", data);

            if (data.responseCode !== 0 || !data.data?.hash) {
                console.log('payment not found!❌');
                return res.status(404).json({
                    success : false,
                    message : "payment not found!",
                })
            }
            
            console.log('payment confirmed!✅');
            return res.status(200).json({
                success : true, 
                message : "Payment confirmed",
                data : {
                    bakongHash : data.data.hash,
                }
            });
        }
    } catch(error) {
        console.log("payment error : ", error);
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
}