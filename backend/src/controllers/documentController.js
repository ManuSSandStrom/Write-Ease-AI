import { Document } from "../models/Document.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ userId: req.user._id }).sort({
    updatedAt: -1
  });

  res.json({ documents });
});

export const createDocument = asyncHandler(async (req, res) => {
  const document = await Document.create({
    ...req.body,
    userId: req.user._id
  });

  res.status(201).json({ document });
});

export const updateDocument = asyncHandler(async (req, res) => {
  const document = await Document.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );

  if (!document) {
    return res.status(404).json({ message: "Document not found" });
  }

  res.json({ document });
});

export const deleteDocument = asyncHandler(async (req, res) => {
  const document = await Document.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!document) {
    return res.status(404).json({ message: "Document not found" });
  }

  res.json({ message: "Document deleted" });
});

