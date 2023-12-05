import { isAuthenticatedUser } from "@app/validationFiles/auth";
import Product from "@models/productSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import { authorizeRoles } from "@app/validationFiles/auth";

export const GET = async (req, { params }, next) => {
  try {
    await connectToDB();
    const product = await Product.findById(params.productId);
    const productCount = await Product.countDocuments();

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 200 }
      );
    }

    return NextResponse.json({ product, productCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Product not found" }, { status: 500 });
  }
};

export const PUT = async (req, { params }, next) => {
  return await isAuthenticatedUser(req, { params }, async () => {
    return authorizeRoles("Admin")(req, { params }, async () => {
      try {
        await connectToDB();

        const product = await Product.findById(params.productId);

        if (!product) {
          return NextResponse.json(
            { message: "Product not found" },
            { status: 404 }
          );
        }

        if (product) {
          const {
            name,
            description,
            price,
            category,
            images,
            rating,
            stock,
            numOfReviews,
            reviews,
          } = await req.json();

          product.name = name || product.name;
          product.description = description || product.description;
          product.price = price || product.price;
          product.category = category || product.category;
          product.images = images || product.images;
          product.rating = rating || product.rating;
          product.stock = stock || product.stock;
          product.numOfReviews = numOfReviews || product.numOfReviews;
          product.reviews = reviews || product.reviews;

          const updatedProduct = await product.save();
          return NextResponse.json({ updatedProduct }, { status: 200 });
        }
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    });
  });
};

export const DELETE = async (req, { params }, next) => {
  return await isAuthenticatedUser(req, { params }, async () => {
    return authorizeRoles("Admin")(req, { params }, async () => {
      try {
        await connectToDB();

        const product = await Product.findByIdAndRemove(params.productId);

        if (!product) {
          return NextResponse.json(
            {
              message: `Product not found with the Id : ${params.productId}`,
            },
            { status: 404 }
          );
        }

        return NextResponse.json(
          { message: "Product deleted successfully" },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    });
  });
};
