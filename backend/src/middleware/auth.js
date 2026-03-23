import { getAuth } from "@clerk/express";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const requireClerkAuth = asyncHandler(async (req, res, next) => {
  const auth = getAuth(req);

  if (!auth.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  req.auth = auth;
  next();
});

export const protect = asyncHandler(async (req, res, next) => {
  const auth = getAuth(req);

  if (!auth.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const user = await User.findOne({ clerkId: auth.userId }).select("-password");

  if (!user) {
    return res.status(401).json({ message: "User profile not synced" });
  }

  req.auth = auth;
  req.user = user;
  next();
});

export const optionalAuth = asyncHandler(async (req, _res, next) => {
  const auth = getAuth(req);

  if (!auth.userId) {
    return next();
  }

  try {
    const user = await User.findOne({ clerkId: auth.userId }).select("-password");
    req.user = user || null;
    req.auth = auth;
  } catch {
    req.user = null;
  }

  next();
});
