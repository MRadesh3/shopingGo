import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "@models/userSchema";
import { connectToDB } from "@utils/database";
import jwt from "jsonwebtoken";
import { isAuthenticatedUser } from "@app/validationFiles/auth";

export const GET = async (req, res) => {
  return await isAuthenticatedUser(req, res, async () => {
    try {
      await connectToDB();

      const user = await User.findById(req.user._id);
      if (user) {
        return NextResponse.json({ user }, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "User not found" },
          { status: 401 }
        );
      }
    } catch (error) {
      return NextResponse.json({ message: error.message });
    }
  });
};
