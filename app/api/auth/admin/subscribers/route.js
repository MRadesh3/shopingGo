import Subscriber from "@models/subscribersSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import { authorizeRoles, isAuthenticatedUser } from "@app/validationFiles/auth";

export const POST = async (req, res) => {
  const { email } = await req.json();

  try {
    await connectToDB();

    const isSubscriberExists = await Subscriber.findOne({ email }).select(
      "_id"
    );

    if (isSubscriberExists) {
      return NextResponse.json(
        {
          message:
            "You are already subscribed Or User with this email is already exists",
        },
        { status: 400 }
      );
    }
    const subscriber = await Subscriber.create({ email });

    return NextResponse.json({ subscriber }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const GET = async (req, res) => {
  return await isAuthenticatedUser(req, res, async () => {
    return authorizeRoles("Admin")(req, res, async () => {
      try {
        await connectToDB();

        const subscribers = await Subscriber.find();

        return NextResponse.json({ subscribers }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    });
  });
};

export const DELETE = async (req, res) => {
  return await isAuthenticatedUser(req, res, async () => {
    return authorizeRoles("Admin")(req, res, async () => {
      const { subscriberId } = await req.json();

      try {
        await connectToDB();

        const subscriber = await Subscriber.findByIdAndRemove(subscriberId);
        if (!subscriber) {
          return NextResponse.json(
            {
              message: `Subscriber not found with the Id : ${subscriberId}`,
            },
            { status: 404 }
          );
        }

        return NextResponse.json(
          { message: "Subscriber deleted successfully" },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    });
  });
};
