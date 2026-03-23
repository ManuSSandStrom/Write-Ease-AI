import {
  createDocxBuffer,
  createPdfBuffer,
  createTxtBuffer
} from "../utils/export.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const exportContent = asyncHandler(async (req, res) => {
  const { title = "WriteEase Export", content = "", format = "txt" } = req.body;

  let buffer;
  let type;
  let extension;

  if (format === "pdf") {
    buffer = await createPdfBuffer({ title, content });
    type = "application/pdf";
    extension = "pdf";
  } else if (format === "docx") {
    buffer = await createDocxBuffer({ title, content });
    type =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    extension = "docx";
  } else {
    buffer = createTxtBuffer(content);
    type = "text/plain";
    extension = "txt";
  }

  res.setHeader("Content-Type", type);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${title.replace(/\s+/g, "-").toLowerCase()}.${extension}"`
  );
  res.send(buffer);
});

