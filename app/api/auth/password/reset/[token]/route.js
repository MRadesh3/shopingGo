import { NextResponse } from "next/server";
import crypto from "crypto";
import User from "@models/userSchema";
import { connectToDB } from "@utils/database";
import { sendToken } from "@app/validationFiles/jwtToken";

export const PUT = async (req, { params }, res, next) => {
  const { newPassword, confirmPassword } = await req.json();
  console.log(params.token);

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(params.token)
    .digest("hex");

  await connectToDB();

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Reset password token is invalid or has been expired" },
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

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return sendToken(user, 200, res);

  // return NextResponse.json({ user, token: user.getJWTToken() });
};
