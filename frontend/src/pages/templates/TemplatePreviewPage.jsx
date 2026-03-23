import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlassCard } from "../../components/common/GlassCard";
import { GradientButton } from "../../components/common/GradientButton";
import { appService } from "../../services/appService";

const TemplatePreviewPage = () => {
  const { templateId } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    appService
      .template(templateId)
      .then((response) => setTemplate(response.template))
      .catch(() =>
        setTemplate({
          title: "Template Preview",
          category: "Research",
          description: "Preview unavailable in mock mode.",
          content: "This is a local fallback preview."
        })
      );
  }, [templateId]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-cyan-300">{template?.category}</p>
        <h1 className="mt-2 text-3xl font-bold">{template?.title}</h1>
        <p className="mt-3 text-sm text-zinc-400">{template?.description}</p>
      </div>
      <GlassCard>
        <pre className="whitespace-pre-wrap text-sm leading-7 text-zinc-300">{template?.content}</pre>
      </GlassCard>
      <GradientButton>Use Template</GradientButton>
    </div>
  );
};

export default TemplatePreviewPage;
