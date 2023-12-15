const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const webhookResponse = (request, response) => {
  console.log("Payment Sucess!");
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.WEB_HOOK_SECRETE_KEY
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded);
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};

module.exports = webhookResponse;
