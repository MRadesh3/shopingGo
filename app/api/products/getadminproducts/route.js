import Product from "@models/productSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const products = await Product.find();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
