import { Template } from "../models/Template.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listTemplates = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const query = {};

  if (category && category !== "All") {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }

  const templates = await Template.find(query).sort({ createdAt: -1 });
  res.json({ templates });
});

export const getTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  if (!template) {
    return res.status(404).json({ message: "Template not found" });
  }
  res.json({ template });
});
