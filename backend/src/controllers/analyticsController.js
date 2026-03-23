import { Analytics } from "../models/Analytics.js";
import { Document } from "../models/Document.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAnalytics = asyncHandler(async (req, res) => {
  const analytics = await Analytics.findOne({ userId: req.user._id });
  const recentDocuments = await Document.find({ userId: req.user._id })
    .sort({ updatedAt: -1 })
    .limit(5);

  res.json({
    analytics,
    recentDocuments
  });
});

