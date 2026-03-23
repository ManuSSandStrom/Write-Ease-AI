import PDFDocument from "pdfkit";
import { Document, Packer, Paragraph, TextRun } from "docx";

export const createTxtBuffer = (content) => Buffer.from(content, "utf-8");

export const createPdfBuffer = async ({ title, content }) =>
  new Promise((resolve) => {
    const chunks = [];
    const doc = new PDFDocument({ margin: 50 });

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));

    doc.fontSize(22).text(title, { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(content);
    doc.end();
  });

export const createDocxBuffer = async ({ title, content }) => {
  const document = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun({ text: title, bold: true, size: 32 })]
          }),
          new Paragraph({
            children: [new TextRun({ text: content, size: 24 })]
          })
        ]
      }
    ]
  });

  return Packer.toBuffer(document);
};

