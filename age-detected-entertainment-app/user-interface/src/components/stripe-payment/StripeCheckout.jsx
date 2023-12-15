import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Stripe.css";

const stripePromise = loadStripe(
  "pk_test_51OLpc0SB7ZcnWhZqk3oox7gziMtcagpymBt51yIuxCJRv43J3cXcDlbTMpM8s6Do9cg1Hyg6qiZSq7H4LVOaYbgJ00acKblu09"
);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const paymentObject = { totalAmount: 899 };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/api/payment/create-payment-intent/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: paymentObject.totalAmount }),
      meta: {
        order_id: paymentObject.id,
        // this info will go to stripe and then to our webhook.
        // so we can conclude that payment was successful, even if cliant closes the application.
      },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="max-sm:pl-14 max-2xl:pl-44 max-2xl:pt-10 max-sm:pt-6 2xl:pt-24">
      <p className="text-2xl text-center max-sm:text-xl pb-4 max-sm:pb-1 font-semibold">
        Add Bank Details To Join US
      </p>
      <div className="Stripe flex items-center justify-center">
        <div className="max-sm:overflow-x-scroll">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}
