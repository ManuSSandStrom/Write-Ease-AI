import { Subscription } from "../models/Subscription.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const planPricing = {
  student: 29,
  premium: 49
};

export const getSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findOne({ userId: req.user._id }).sort({
    createdAt: -1
  });

  res.json({ subscription });
});

export const updateSubscription = asyncHandler(async (req, res) => {
  const { planName } = req.body;
  const subscription = await Subscription.create({
    userId: req.user._id,
    planName,
    planPrice: planPricing[planName] || 0,
    status: "active",
    billingCycle: "monthly",
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  });

  await User.findByIdAndUpdate(req.user._id, { currentPlan: planName });

  res.status(201).json({ subscription });
});

