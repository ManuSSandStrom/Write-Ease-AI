import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { saveAs } from "file-saver";
import { GlassCard } from "../components/common/GlassCard";
import { GradientButton } from "../components/common/GradientButton";
import { toolService } from "../services/toolService";

const ResultPreviewPage = () => {
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const type = query.get("type") || "content";

  const content =
    type === "resume"
      ? "Your resume has been prepared and is ready for export in PDF, DOCX, or TXT format."
      : "Preview your generated content here and export it to your preferred format.";

  const download = async (format) => {
    const response = await toolService.exportFile({
      title: `writeease-${type}`,
      content,
      format
    });
    saveAs(response.data, `writeease-${type}.${format}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Result Preview</h1>
        <p className="mt-2 text-sm text-zinc-400">Review, copy, share, and export your polished content.</p>
      </div>
      <GlassCard>
        <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-300">{content}</p>
      </GlassCard>
      <div className="flex flex-wrap gap-3">
        <GradientButton onClick={() => download("pdf")}>Download PDF</GradientButton>
        <GradientButton variant="ghost" onClick={() => download("docx")}>
          Download DOCX
        </GradientButton>
        <GradientButton variant="subtle" onClick={() => download("txt")}>
          Download TXT
        </GradientButton>
      </div>
    </div>
  );
};

export default ResultPreviewPage;

