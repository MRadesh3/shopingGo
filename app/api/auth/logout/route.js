import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import errorHandler from "../../../validationFiles/errorMiddleware";

export const GET = async (req, res) => {
  try {
    cookies().set("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
};
