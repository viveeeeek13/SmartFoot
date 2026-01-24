import { Schema, model, models } from "mongoose";

const InjuryRecordSchema = new Schema(
  {
    playerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    injuryType: String,
    recoveryDays: Number,
  },
  { timestamps: true }
);

export default models.InjuryRecord ||
  model("InjuryRecord", InjuryRecordSchema);
