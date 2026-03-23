import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    isPremium: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Template = mongoose.model("Template", templateSchema);

