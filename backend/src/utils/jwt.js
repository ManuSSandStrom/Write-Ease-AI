import crypto from "crypto";

const base64UrlEncode = (value) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const base64UrlDecode = (value) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(normalized + padding, "base64").toString("utf8");
};

const parseDurationToSeconds = (duration) => {
  if (typeof duration === "number") {
    return duration;
  }

  const match = /^(\d+)([smhd])$/.exec(String(duration).trim());

  if (!match) {
    return 7 * 24 * 60 * 60;
  }

  const amount = Number(match[1]);
  const unit = match[2];

  const multipliers = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 24 * 60 * 60
  };

  return amount * multipliers[unit];
};

const createSignature = (value, secret) =>
  base64UrlEncode(crypto.createHmac("sha256", secret).update(value).digest());

export const signJwt = (payload, secret, expiresIn = "7d") => {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const exp = now + parseDurationToSeconds(expiresIn);
  const body = { ...payload, iat: now, exp };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(body));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = createSignature(unsignedToken, secret);

  return `${unsignedToken}.${signature}`;
};

export const verifyJwt = (token, secret) => {
  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) {
    throw new Error("Invalid token format");
  }

  const unsignedToken = `${header}.${payload}`;
  const expectedSignature = createSignature(unsignedToken, secret);

  if (signature.length !== expectedSignature.length) {
    throw new Error("Invalid token signature");
  }

  if (
    !crypto.timingSafeEqual(
      Buffer.from(signature, "utf8"),
      Buffer.from(expectedSignature, "utf8")
    )
  ) {
    throw new Error("Invalid token signature");
  }

  const data = JSON.parse(base64UrlDecode(payload));
  const now = Math.floor(Date.now() / 1000);

  if (typeof data.exp !== "number" || data.exp <= now) {
    throw new Error("Token expired");
  }

  return data;
};
