import { Schema, model, models } from "mongoose";

const MatchStatsSchema = new Schema(
  {
    playerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    matchDate: {
      type: Date,
      default: Date.now,
    },
    minutesPlayed: Number,
    goals: Number,
    assists: Number,
    tackles: Number,
    passes: Number,
  },
  { timestamps: true }
);

export default models.MatchStats ||
  model("MatchStats", MatchStatsSchema);
