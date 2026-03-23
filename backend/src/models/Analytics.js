import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    wordsProcessed: { type: Number, default: 0 },
    grammarChecks: { type: Number, default: 0 },
    paraphrases: { type: Number, default: 0 },
    humanizerUses: { type: Number, default: 0 },
    plagiarismScans: { type: Number, default: 0 },
    resumeExports: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Analytics = mongoose.model("Analytics", analyticsSchema);

