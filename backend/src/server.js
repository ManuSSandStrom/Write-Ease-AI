import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/db.js";

const start = async () => {
  try {
    await connectDatabase(env.mongodbUri);
    console.log("MongoDB connected");
  } catch (error) {
    if (!env.startWithoutDb) {
      throw error;
    }

    console.warn("MongoDB connection failed. Starting in degraded mode.");
    console.warn(error.message);
  }

  app.listen(env.port, () => {
    console.log(`WriteEase AI API listening on port ${env.port}`);
  });
};

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
