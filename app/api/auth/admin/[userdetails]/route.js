import { authorizeRoles, isAuthenticatedUser } from "@app/validationFiles/auth";
import User from "@models/userSchema";
import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }, next) => {
  return await isAuthenticatedUser(req, { params }, async () => {
    return authorizeRoles("Admin")(req, { params }, async () => {
      try {
        await connectToDB();

        const user = await User.findById(params.userdetails);
        if (!user) {
          return NextResponse.json(
            { message: `User not found with the Id : ${params.userdetails}` },
            { status: 404 }
          );
        }

        return NextResponse.json({ user }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    });
  });
};

export const PATCH = async (req, { params }, next) => {
  return await isAuthenticatedUser(req, { params }, async () => {
    return authorizeRoles("Admin")(req, { params }, async () => {
      const { name, email, phone, role } = await req.json();
      try {
        await connectToDB();

        const user = await User.findById(params.userdetails);
        if (!user) {
          return NextResponse.json(
            { message: `User not found with the Id : ${params.userdetails}` },
            { status: 404 }
          );
        }
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.role = role;

        await user.save();

        return NextResponse.json({ user }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    });
  });
};

export const DELETE = async (req, { params }, next) => {
  return await isAuthenticatedUser(req, { params }, async () => {
    return authorizeRoles("Admin")(req, { params }, async () => {
      try {
        await connectToDB();
        const user = await User.findByIdAndRemove(params.userdetails);
        if (!user) {
          return NextResponse.json(
            { message: `User not found with the Id : ${params.userdetails}` },
            { status: 404 }
          );
        }

        // await user.remove();
        return NextResponse.json(
          { message: "User deleted successfully" },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    });
  });
};
