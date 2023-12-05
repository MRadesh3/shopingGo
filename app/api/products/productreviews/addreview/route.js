import { isAuthenticatedUser } from "@app/validationFiles/auth";
import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import Product from "@models/productSchema";
import User from "@models/userSchema";

export const PUT = async (req, { params }, next) => {
  return await isAuthenticatedUser(req, { params }, async () => {
    const { rating, comment, productId } = await req.json();
    try {
      await connectToDB();
      const user = await User.findById(req.user._id);

      const review = {
        user: user._id,
        name: user.name,
        rating: Number(rating),
        comment,
      };

      const product = await Product.findById(productId);

      const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === user._id.toString()
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user.toString() === user._id.toString()) {
            rev.comment = comment;
            rev.rating = rating;
          }
        });
      } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
      }

      let average = 0;

      product.reviews.forEach((rev) => {
        average += rev.rating;
      });

      product.ratings = average / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      return NextResponse.json(
        { product, message: "Review added" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  });
};
