import dotenv from "dotenv";

dotenv.config();

const required = ["MONGODB_URI", "CLIENT_URL", "JWT_SECRET"];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const normalizeOrigin = (origin) => origin.trim().replace(/\/+$/, "");

const parseOrigins = (rawValue = "") =>
  String(rawValue)
    .split(",")
    .map((value) => normalizeOrigin(value))
    .filter(Boolean);

const defaultAllowedOrigins = ["https://writeeaseai.netlify.app"];

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: process.env.MONGODB_URI,
  clientUrl: process.env.CLIENT_URL,
  allowedOrigins: Array.from(
    new Set([
      ...defaultAllowedOrigins,
      ...parseOrigins(process.env.CLIENT_URL),
      ...parseOrigins(process.env.ALLOWED_ORIGINS)
    ])
  ),
  aiProvider: process.env.AI_PROVIDER || "mock",
  aiApiKey: process.env.AI_API_KEY || "",
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
  startWithoutDb: process.env.START_WITHOUT_DB === "true"
};
