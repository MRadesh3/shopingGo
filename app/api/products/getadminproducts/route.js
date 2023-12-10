import Product from "@models/productSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  await connectToDB();
  const products = await Product.find({});
  return NextResponse.json(
    { products },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
};
