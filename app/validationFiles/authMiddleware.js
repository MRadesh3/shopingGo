import User from "@models/userSchema";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const protect = async (req, res, next) => {
  try {
    const token = cookies().get("token");
    if (!token) {
      return NextResponse.json(
        { message: "Not authorized, Please login again" },
        { status: 401 }
      );
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    req.user = user;

    next();
  } catch (error) {
    return NextResponse.json(
      { message: "Not authorized, Please login" },
      { status: 401 }
    );
  }
};

export default protect;

// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/profile", "/myorders"] };
