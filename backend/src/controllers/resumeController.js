import { Resume } from "../models/Resume.js";
import { aiService } from "../services/aiService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ userId: req.user._id }).sort({
    updatedAt: -1
  });

  res.json({ resume });
});

export const saveResume = asyncHandler(async (req, res) => {
  const payload = { ...req.body, userId: req.user._id };
  let resume;

  if (req.params.id) {
    resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      payload,
      { new: true }
    );
  } else {
    resume = await Resume.create(payload);
  }

  res.status(req.params.id ? 200 : 201).json({ resume });
});

export const enhanceResume = asyncHandler(async (req, res) => {
  const result = await aiService.enhanceResume(req.body);
  res.json(result);
});

