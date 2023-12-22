import ApiFeatures from "../../../validationFiles/apiFeatures";
import Product from "@models/productSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, res, next) => {
  try {
    const url = new URL(req.nextUrl);
    const searchParams = new URLSearchParams(url.search);
    const searchParamsObj = {};
    for (const [key, value] of searchParams.entries()) {
      searchParamsObj[key] = value;
    }

    await connectToDB();

    const countQuery = new ApiFeatures(
      Product.find().sort({ createdAt: -1 }),
      searchParamsObj
    )
      .search()
      .filter();

    const totalProductCount = await countQuery.query.countDocuments();

    const resultPerPage = 12;
    const apiFeature = new ApiFeatures(
      Product.find().sort({ createdAt: -1 }),
      searchParamsObj
    )
      .search()
      .filter()
      .pagination(resultPerPage);

    const filteredProducts = await apiFeature.query;

    return NextResponse.json(
      {
        products: filteredProducts,
        productCount: totalProductCount,
        resultPerPage,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
