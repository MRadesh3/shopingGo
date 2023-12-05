import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const token = cookies().get("token").value;
    console.log(token);
    if (!token) {
      return NextResponse.json(
        { message: "Not authorized, Please Login" },
        { status: 401 }
      );
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
      return NextResponse.json(true);
    }
  } catch (error) {
    return NextResponse.json(false);
  }
};
