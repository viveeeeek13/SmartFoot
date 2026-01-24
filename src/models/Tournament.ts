import mongoose, { Schema, model, models } from "mongoose";

const TournamentSchema = new Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        date: { type: String, required: true }, // Keeping as string for "YYYY-MM-DD to YYYY-MM-DD" format simplicity
        type: { type: String, required: true }, // e.g., '5v5', '11v11'
        teams: { type: Number, required: true },
        fee: { type: String, required: true },
        prize: { type: String, required: true },
        status: {
            type: String,
            enum: ['upcoming', 'registration', 'completed'],
            default: 'upcoming'
        },
        deadline: { type: String, required: true },
        organizerId: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

export default models.Tournament || model("Tournament", TournamentSchema);
