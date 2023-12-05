import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import User from "@models/userSchema";
import { sendEmail } from "../../../validationFiles/sendEmail";

export const POST = async (req, res, next) => {
  const urlString = req.nextUrl;
  const url = new URL(urlString);

  const { email } = await req.json();
  await connectToDB();
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 401 });
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${url.protocol}//${url.host}/password/resetpassword/${resetToken}`;

  const message = ` Your reset password token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email, then ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "ShopingGo - Password Recovery",
      message,
    });
    return NextResponse.json({
      message: `Email sent to ${user.email} successfully. Please check your email.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
