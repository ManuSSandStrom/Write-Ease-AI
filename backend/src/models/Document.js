import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["humanizer", "paraphraser", "grammar", "plagiarism", "general"],
      required: true
    },
    inputText: { type: String, required: true },
    outputText: { type: String, default: "" },
    mode: { type: String, default: "standard" },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

export const Document = mongoose.model("Document", documentSchema);

