import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProfile = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const updates = (({ name, avatar, currentPlan }) => ({
    name,
    avatar,
    currentPlan
  }))(req.body);

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true
  }).select("-password");

  res.json({ user });
});

