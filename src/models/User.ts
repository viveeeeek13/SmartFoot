import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    role: {
      type: String,
      enum: ["player", "coach", "organizer"],
      default: "player",
    },

    age: Number,
    preferredPosition: String,
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
