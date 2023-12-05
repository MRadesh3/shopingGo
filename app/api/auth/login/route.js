import { NextResponse } from "next/server";
import User from "@models/userSchema";
import { connectToDB } from "@utils/database";
import { sendToken } from "@app/validationFiles/jwtToken";

export const POST = async (req, res) => {
  const { email, password } = await req.json();

  try {
    await connectToDB();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please enter Email & Password" },
        { status: 400 }
      );
    }

    const userExists = await User.findOne({ email }).select("+password");
    if (!userExists) {
      return NextResponse.json({ message: "User does not exists" });
    }

    const passwordMatch = await userExists.comparePassword(password);

    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid email or password" });
    }

    if (userExists && passwordMatch) {
      const user = await User.findOne({ email }).select("-password");

      return sendToken(user, 200, res);
    }
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
};
