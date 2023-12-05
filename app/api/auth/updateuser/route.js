import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "@models/userSchema";
import { connectToDB } from "@utils/database";
import jwt from "jsonwebtoken";
import { isAuthenticatedUser } from "@app/validationFiles/auth";

export const PATCH = async (req, res) => {
  return await isAuthenticatedUser(req, res, async () => {
    try {
      await connectToDB();

      const user = await User.findById(req.user._id);
      if (user) {
        const { name, email, phone, address, avatar } = await req.json();

        const exisitingUserWithSameEmail = await User.findOne({ email: email });
        if (
          exisitingUserWithSameEmail &&
          exisitingUserWithSameEmail._id.toString() !== user._id.toString()
        ) {
          return NextResponse.json(
            { message: "User with same email is already exists !" },
            { status: 400 }
          );
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.avatar = avatar || user.avatar;

        await user.save();
        return NextResponse.json({ user }, { status: 200 });
      }
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
  });
};
