import Product from "@models/productSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, { params }, next) => {
  try {
    await connectToDB();
    const product = await Product.findById(params.productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 200 }
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Product not found" }, { status: 500 });
  }
};
