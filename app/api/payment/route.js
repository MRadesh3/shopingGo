import { isAuthenticatedUser } from "@app/validationFiles/auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req, res, next) => {
  return await isAuthenticatedUser(req, res, async () => {
    const { amount } = await req.json();

    const myPayment = await Stripe(
      process.env.STRIPE_SECRET_KEY
    ).paymentIntents.create({
      amount,
      currency: "inr",
      metadata: { Company: "ShopingGo" },
    });

    return NextResponse.json(
      { success: true, client_secret: myPayment.client_secret },
      { status: 200 }
    );
  });
};

export const GET = async (req, res, next) => {
  return NextResponse.json(
    { stripeApiKey: process.env.STRIPE_API_KEY },
    { status: 200 }
  );
};
