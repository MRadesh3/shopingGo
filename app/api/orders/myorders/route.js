import Order from "@models/orderSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
const { isAuthenticatedUser } = require("@app/validationFiles/auth");

export const GET = async (req, res, next) => {
  return await isAuthenticatedUser(req, res, async () => {
    try {
      await connectToDB();

      const orders = await Order.find({ user: req.user._id });

      if (!orders) {
        return NextResponse.json(
          { message: "No orders placed yet" },
          { status: 404 }
        );
      }

      return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  });
};
