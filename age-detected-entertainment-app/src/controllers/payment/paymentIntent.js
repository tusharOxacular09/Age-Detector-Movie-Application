const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentIntent = async (req, res) => {
  const { totalAmount } = req.body;

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: "inr",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = paymentIntent;