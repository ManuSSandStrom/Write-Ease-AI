import { User } from "../models/User.js";
import { Analytics } from "../models/Analytics.js";
import { env } from "../config/env.js";
import { signJwt } from "../utils/jwt.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  role: user.role,
  currentPlan: user.currentPlan,
  usageStats: user.usageStats
});

const createAuthResponse = (user) => ({
  user: sanitizeUser(user),
  token: signJwt(
    {
      sub: user._id.toString(),
      email: user.email,
      role: user.role
    },
    env.jwtSecret,
    env.jwtExpiresIn
  )
});

export const register = asyncHandler(async (req, res) => {
  const name = (req.body.name || "").trim();
  const email = (req.body.email || "").trim().toLowerCase();
  const password = req.body.password || "";

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: "An account with this email already exists" });
  }

  const user = await User.create({
    name,
    email,
    password: hashPassword(password)
  });

  await Analytics.findOneAndUpdate(
    { userId: user._id },
    {},
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(201).json(createAuthResponse(user));
});

export const login = asyncHandler(async (req, res) => {
  const email = (req.body.email || "").trim().toLowerCase();
  const password = req.body.password || "";

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });

  if (!user || !verifyPassword(password, user.password || "")) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json(createAuthResponse(user));
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
});
