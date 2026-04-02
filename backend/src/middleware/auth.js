import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { verifyJwt } from "../utils/jwt.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getTokenFromHeader = (authorizationHeader = "") => {
  if (!authorizationHeader.startsWith("Bearer ")) {
    return null;
  }

  return authorizationHeader.slice("Bearer ".length).trim() || null;
};

const resolveAuthContext = async (req) => {
  const token = getTokenFromHeader(req.headers.authorization);

  if (!token) {
    return { token: null, payload: null, user: null };
  }

  const payload = verifyJwt(token, env.jwtSecret);

  if (!payload.sub) {
    throw new Error("Token missing subject");
  }

  const user = await User.findById(payload.sub).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return { token, payload, user };
};

export const protect = asyncHandler(async (req, res, next) => {
  try {
    const context = await resolveAuthContext(req);

    if (!context.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    req.auth = {
      token: context.token,
      userId: context.user._id.toString(),
      payload: context.payload
    };
    req.user = context.user;

    return next();
  } catch {
    return res.status(401).json({ message: "Authentication required" });
  }
});

export const optionalAuth = asyncHandler(async (req, _res, next) => {
  try {
    const context = await resolveAuthContext(req);

    if (context.user) {
      req.auth = {
        token: context.token,
        userId: context.user._id.toString(),
        payload: context.payload
      };
      req.user = context.user;
    } else {
      req.user = null;
    }
  } catch {
    req.user = null;
  }

  next();
});
