"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";

export const ElementStripe = ({ component }) => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/payment");
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    stripeApiKey && (
      <Elements stripe={loadStripe(stripeApiKey)}>{component}</Elements>
    )
  );
};
