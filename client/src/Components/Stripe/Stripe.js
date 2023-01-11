import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "bootswatch/dist/united/bootstrap.min.css";
import "bootstrap";
import "./Stripe.css";

const stripePromise = loadStripe(
  "pk_test_51MHby8F7eyBevS9ZTF3WvgrNWzEcmymWJE8d9KquqyAMHBwF1dIqEILuNBoAaa7Sgi3ZiEoZtWSps2gjdl9UNVpP00kXKAwJOc"
);

const CheckoutForm = (props) => {
  const [amount, setAmount] = useState(0);
  const stripeUse = useStripe();
  const elementsUse = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripeUse.createPaymentMethod({
      type: "card",
      card: elementsUse.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;

      const { data } = await axios.post(
        "http://localhost:3000/create-checkout-session",
        {
          id,
          amount: amount * 100,
        },
        { withCredentials: true }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <div className="form-group">
        <CardElement className="form-control" />
      </div>
      <button className="btn btn-success">Pagar</button>
    </form>
  );
};

export default function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}
