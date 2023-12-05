import { authorizeRoles, isAuthenticatedUser } from "@app/validationFiles/auth";
import User from "@models/userSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  return await isAuthenticatedUser(req, res, async () => {
    return authorizeRoles("Admin")(req, res, async () => {
      try {
        await connectToDB();

        const users = await User.find({});

        return NextResponse.json({ users }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    });
  });
};
