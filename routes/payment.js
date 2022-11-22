import express from 'express';
import { checkAndUpdate, createPaymentMomo, createPaymentVNPay } from '../controllers/payment.js';

const router = express.Router();

router.post("/momopayment", createPaymentMomo )

router.post("/vnpaypayment", createPaymentVNPay)

router.get("/vnpaypayment/vnpay_return", checkAndUpdate)


export default router
