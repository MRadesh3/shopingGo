import { authorizeRoles, isAuthenticatedUser } from "@app/validationFiles/auth";
import Product from "@models/productSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = true;
export const fetchCache = "force-no-store";

export const GET = async (req, res) => {
  return await isAuthenticatedUser(req, res, async () => {
    return authorizeRoles("Admin")(req, res, async () => {
      try {
        await connectToDB();

        const products = await Product.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ products }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    });
  });
};
