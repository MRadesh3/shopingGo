import { isAuthenticatedUser } from "@app/validationFiles/auth";
import { sendToken } from "@app/validationFiles/jwtToken";
import User from "@models/userSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const PUT = async (req, res, next) => {
  return await isAuthenticatedUser(req, res, async () => {
    const { oldPassword, newPassword, confirmPassword } = await req.json();
    try {
      await connectToDB();

      const user = await User.findById(req.user._id).select("+password");

      const isPasswordMatched = await user.comparePassword(oldPassword);
      if (!isPasswordMatched) {
        return NextResponse.json(
          { message: "Old password is incorrect" },
          { status: 401 }
        );
      }

      const isPasswordMatchedWithNewPassword = await user.comparePassword(
        newPassword
      );
      if (isPasswordMatchedWithNewPassword) {
        return NextResponse.json(
          { message: "New password cannot be same as old password" },
          { status: 401 }
        );
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { message: "Passwords do not match" },
          { status: 401 }
        );
      }

      user.password = newPassword;

      await user.save();

      return sendToken(user, 200, res);
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  });
};
