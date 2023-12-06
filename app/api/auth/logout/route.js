import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import errorHandler from "../../../validationFiles/errorMiddleware";

export const GET = async (req, res) => {
  cookies().set("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
};
