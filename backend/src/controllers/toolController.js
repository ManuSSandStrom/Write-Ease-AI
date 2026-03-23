import { aiService } from "../services/aiService.js";
import { Analytics } from "../models/Analytics.js";
import { Document } from "../models/Document.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const incrementAnalytics = async (userId, field, words = 0) => {
  if (!userId) return;

  await Analytics.findOneAndUpdate(
    { userId },
    { $inc: { [field]: 1, wordsProcessed: words } },
    { upsert: true, new: true }
  );
};

export const runHumanizer = asyncHandler(async (req, res) => {
  const { text, mode = "natural", saveResult = false } = req.body;
  const result = await aiService.humanize({ text, mode });

  if (req.user) {
    await incrementAnalytics(req.user._id, "humanizerUses", text.split(/\s+/).length);
  }

  if (saveResult && req.user) {
    await Document.create({
      userId: req.user._id,
      title: "Humanized Draft",
      type: "humanizer",
      inputText: text,
      outputText: result.output,
      mode,
      metadata: { insights: result.insights }
    });
  }

  res.json(result);
});

export const runParaphraser = asyncHandler(async (req, res) => {
  const { text, mode = "standard", saveResult = false } = req.body;
  const result = await aiService.paraphrase({ text, mode });

  if (req.user) {
    await incrementAnalytics(req.user._id, "paraphrases", text.split(/\s+/).length);
  }

  if (saveResult && req.user) {
    await Document.create({
      userId: req.user._id,
      title: "Paraphrased Draft",
      type: "paraphraser",
      inputText: text,
      outputText: result.output,
      mode,
      metadata: { insights: result.insights }
    });
  }

  res.json(result);
});

export const runGrammarCheck = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const result = await aiService.grammarCheck({ text });

  if (req.user) {
    await incrementAnalytics(req.user._id, "grammarChecks", text.split(/\s+/).length);
  }

  res.json(result);
});

export const runPlagiarismScan = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const result = await aiService.plagiarismScan({ text });

  if (req.user) {
    await incrementAnalytics(req.user._id, "plagiarismScans", text.split(/\s+/).length);
  }

  res.json(result);
});

