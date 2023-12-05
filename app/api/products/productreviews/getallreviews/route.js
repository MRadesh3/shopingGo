import Product from "@models/productSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, res, next) => {
  const url = new URL(req.nextUrl);
  const searchParams = new URLSearchParams(url.search);
  const searchParamsObj = {};
  for (const [key, value] of searchParams.entries()) {
    searchParamsObj[key] = value;
  }
  console.log(searchParamsObj);
  try {
    await connectToDB();
    const product = await Product.findById(searchParamsObj.productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ reviews: product.reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
