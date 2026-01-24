import mongoose, { Schema, models, model } from "mongoose";

const PlayerProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  height: Number,
  weight: Number,
  stamina: Number,
  speed: Number,
  strength: Number,
  passing: Number,
  shooting: Number,
  defending: Number,
  preferredFoot: String,
});

export default models.PlayerProfile ||
  model("PlayerProfile", PlayerProfileSchema);
