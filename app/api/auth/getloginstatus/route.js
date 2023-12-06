import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const GET = async (req, res) => {
  await connectToDB();
  const token = await cookies().get("token")?.value;
  console.log(token);
  if (!token) {
    return NextResponse.json(
      { message: "Not authorized, Please Login" },
      { status: 401 }
    );
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return NextResponse.json({ login: true }, { status: 200 });
  }
};
