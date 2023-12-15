const express = require("express");
const router = express.Router();
const paymentIntent = require("../controllers/payment/paymentIntent");
const webhookResponse = require("../controllers/payment/webhookResponse");
const updateUserPaymentStatus = require("../controllers/payment/updateUserPaymentStatus");

router
   .post("/create-payment-intent", paymentIntent)
   .post("/webhook", webhookResponse)
   .patch("/update-user-payment-status", updateUserPaymentStatus);

module.exports = router;