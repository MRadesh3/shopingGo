import { isAuthenticatedUser } from "@app/validationFiles/auth";
import Product from "@models/productSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const DELETE = async (req, res, next) => {
  return await isAuthenticatedUser(req, res, async () => {
    const url = new URL(req.nextUrl);
    const searchParams = new URLSearchParams(url.search);
    const searchParamsObj = {};
    for (const [key, value] of searchParams.entries()) {
      searchParamsObj[key] = value;
    }
    console.log(searchParamsObj.productId);
    console.log(searchParamsObj.id);

    try {
      await connectToDB();
      const product = await Product.findById(searchParamsObj.productId);

      const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== searchParamsObj.id.toString()
      );
      console.log(reviews);

      let average = 0;

      reviews.forEach((rev) => {
        average += rev.rating;
      });

      let ratings = 0;

      if (reviews.length === 0) {
        ratings = 0;
      } else {
        ratings = average / reviews.length;
      }

      const numOfReviews = reviews.length;

      await Product.findByIdAndUpdate(
        searchParamsObj.productId,
        {
          reviews,
          ratings,
          numOfReviews,
        },
        { new: true, runValidators: true }
      );

      return NextResponse.json({ message: "Review deleted" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  });
};
