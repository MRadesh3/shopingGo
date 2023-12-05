import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import Product from "@models/productSchema";
import { authorizeRoles, isAuthenticatedUser } from "@app/validationFiles/auth";
import User from "@models/userSchema";

export const POST = async (req, res, next) => {
  return await isAuthenticatedUser(req, res, async () => {
    return authorizeRoles("Admin")(req, res, async () => {
      try {
        await connectToDB();
        const user = await User.findById(req.user._id);

        const {
          name,
          description,
          price,
          stock,
          category,
          images,
          // rating,
          // numOfReviews,
          // reviews,
        } = await req.json();

        await connectToDB();

        const productExists = await Product.findOne({ name }).select("_id");

        if (productExists) {
          return NextResponse.json(
            { message: "Product already exists" },
            { status: 400 }
          );
        }

        const product = await Product.create({
          name,
          description,
          price,
          stock,
          category,
          images,
          // rating,
          // numOfReviews,
          // reviews,
          user: user._id,
        });

        return NextResponse.json({ product }, { status: 201 });
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    });
  });
};
