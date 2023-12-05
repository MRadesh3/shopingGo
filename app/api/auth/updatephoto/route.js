import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "@models/userSchema";
import { connectToDB } from "@utils/database";
import jwt from "jsonwebtoken";

export const PATCH = async (req, res) => {
  try {
    try {
      connectToDB();
      const token = cookies().get("token").value;
      if (!token) {
        return NextResponse.json(
          { message: "Not authorized, Please login" },
          { status: 401 }
        );
      }

      const verified = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(verified.id).select("-password");
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 401 }
        );
      }

      req.user = user;
    } catch (error) {
      return NextResponse.json(
        { message: "Not authorized, Please login" },
        { status: 401 }
      );
    }

    const user = await User.findById(req.user._id);

    if (user) {
      const { image } = await req.json();

      user.image = image || user.image;

      const updatedUser = await user.save();
      return NextResponse.json({ updatedUser }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
};
