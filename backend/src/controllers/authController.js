import { User } from "../models/User.js";
import { Analytics } from "../models/Analytics.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sanitizeUser = (user) => ({
  id: user._id,
  clerkId: user.clerkId,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  role: user.role,
  currentPlan: user.currentPlan,
  usageStats: user.usageStats
});

export const syncUser = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const {
    name = "WriteEase User",
    email = `${userId}@clerk.local`,
    avatar = ""
  } = req.body;

  let user = await User.findOne({ clerkId: userId });
  const isNewUser = !user;

  if (!user) {
    user = await User.findOne({ email });

    if (user) {
      user.clerkId = userId;
      user.name = name || user.name;
      user.avatar = avatar || user.avatar;
      await user.save();
    } else {
      user = await User.create({
        clerkId: userId,
        name,
        email,
        avatar
      });
    }
  } else {
    user.name = name || user.name;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;
    await user.save();
  }

  await Analytics.findOneAndUpdate(
    { userId: user._id },
    {},
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(isNewUser ? 201 : 200).json({ user: sanitizeUser(user) });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
});
