import { Copy } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { GradientButton } from "./GradientButton";

export const OutputPreview = ({ title = "Result", content = "", onCopy, actions }) => (
  <GlassCard className="h-full">
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-base font-semibold">{title}</h3>
      <GradientButton variant="ghost" className="min-h-10 px-3" onClick={onCopy}>
        <Copy className="mr-2 h-4 w-4" />
        Copy
      </GradientButton>
    </div>
    <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-zinc-300">
      {content || "Your generated result will appear here."}
    </p>
    {actions ? <div className="mt-5 flex flex-wrap gap-3">{actions}</div> : null}
  </GlassCard>
);

