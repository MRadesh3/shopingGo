import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import User from "@models/userSchema";

export const isAuthenticatedUser = async (req, { params }, next) => {
  try {
    const token = cookies(req.headers).get("token").value;
    console.log(token);

    if (!token) {
      return NextResponse.json(
        { message: "Not authorized, Please login" },
        { status: 401 }
      );
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    req.user = user;
    return next();
  } catch (error) {
    return NextResponse.json(
      { message: "Not authorized, Please login again" },
      { status: 401 }
    );
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return NextResponse.json(
        {
          message: `Role (${req.user.role}) is not allowed to access this resource`,
        },
        { status: 403 }
      );
    }
    return next();
  };
};
