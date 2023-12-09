import User from "@models/userSchema";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import { sendToken } from "@app/validationFiles/jwtToken";
import { sendEmail } from "../../../validationFiles/sendEmail";

export const POST = async (req, res) => {
  const { name, email, password, avatar } = await req.json();

  try {
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "Password must be atleast 6 characters long",
        },
        { status: 400 }
      );
    }

    await connectToDB();

    const userExists = await User.findOne({ email }).select("_id");
    if (userExists) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar,
    });

    const message = `Dear ${user.name} \n\n Welcome to ShopingGo, your one-stop destination for all things fabulous! We're thrilled to have you on board and want to extend our warmest greetings to you as our newest registered member. Get ready for an exciting shopping journey filled with amazing deals, trendy products, and a seamless shopping experience. \n\n To start your shopping spree, simply log in to your account on ShopingGo Website. If you have any questions or need assistance, our customer support team is here to help. Feel free to reach out to shopinggocustomers@gmail.com or call us at 8080120538. \n\n Thank you for choosing ShopingGo! We're excited to have you as part of our growing community. Happy shopping !`;

    await sendEmail({
      email: user.email,
      subject: "Welcome to ShopingGo ! 🛍",
      message,
    });

    return sendToken(user, 200, res);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
