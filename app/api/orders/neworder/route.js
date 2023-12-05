import { isAuthenticatedUser } from "@app/validationFiles/auth";
import Order from "@models/orderSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req, res, next) => {
  return await isAuthenticatedUser(req, res, async () => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = await req.json();

    try {
      await connectToDB();

      const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
      });

      return NextResponse.json({ order }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  });
};
