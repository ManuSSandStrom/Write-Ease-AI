import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    planName: {
      type: String,
      enum: ["free", "student", "premium"],
      required: true
    },
    planPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "cancelled", "trialing"],
      default: "active"
    },
    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly"
    },
    startedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date }
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);

