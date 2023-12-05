import { isAuthenticatedUser } from "@app/validationFiles/auth";
import Order from "@models/orderSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, { params }, next) => {
  return await isAuthenticatedUser(req, { params }, async () => {
    try {
      connectToDB();
      const order = await Order.findById(params.orderId).populate(
        "user",
        "name email"
      );
      if (!order) {
        return NextResponse.json(
          { message: "Order not Found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ order }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  });
};
