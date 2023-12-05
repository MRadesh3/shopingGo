import { Schema, models, model } from "mongoose";

const subscribersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email."],
      unique: [true, "Email already exists."],
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Subscriber = models.Subscriber || model("Subscriber", subscribersSchema);

export default Subscriber;
