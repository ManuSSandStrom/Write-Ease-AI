import crypto from "crypto";

const SALT_BYTES = 16;
const KEY_LENGTH = 64;

export const hashPassword = (password) => {
  const salt = crypto.randomBytes(SALT_BYTES).toString("hex");
  const hash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
};

export const verifyPassword = (password, storedHash) => {
  if (!storedHash || !storedHash.includes(":")) {
    return false;
  }

  const [salt, hash] = storedHash.split(":");

  if (!salt || !hash) {
    return false;
  }

  const derivedHash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");

  if (hash.length !== derivedHash.length) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(
      Buffer.from(hash, "hex"),
      Buffer.from(derivedHash, "hex")
    );
  } catch {
    return false;
  }
};
