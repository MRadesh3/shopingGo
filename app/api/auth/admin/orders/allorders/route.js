import { authorizeRoles, isAuthenticatedUser } from "@app/validationFiles/auth";
import Order from "@models/orderSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, res, next) => {
  return isAuthenticatedUser(req, res, async () => {
    return authorizeRoles("Admin")(req, res, async () => {
      try {
        await connectToDB();

        const orders = await Order.find();

        let totalAmount = 0;

        orders.map((order) => {
          totalAmount += order.totalPrice;
        });

        return NextResponse.json({ orders, totalAmount }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    });
  });
};
