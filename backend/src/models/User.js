import mongoose from "mongoose";

const usageStatsSchema = new mongoose.Schema(
  {
    wordsProcessed: { type: Number, default: 0 },
    documentsImproved: { type: Number, default: 0 },
    plagiarismScans: { type: Number, default: 0 },
    resumeExports: { type: Number, default: 0 },
    aiRequests: { type: Number, default: 0 }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    clerkId: { type: String, unique: true, sparse: true },
    googleId: { type: String, default: null },
    avatar: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    currentPlan: {
      type: String,
      enum: ["free", "student", "premium"],
      default: "free"
    },
    usageStats: { type: usageStatsSchema, default: () => ({}) }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
