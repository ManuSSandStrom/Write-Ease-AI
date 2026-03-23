import { connectDatabase } from "../config/db.js";
import { env } from "../config/env.js";
import { Template } from "../models/Template.js";
import { starterTemplates } from "./templates.js";

const seed = async () => {
  await connectDatabase(env.mongodbUri);
  await Template.deleteMany({});
  await Template.insertMany(starterTemplates);
  console.log("Templates seeded");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
