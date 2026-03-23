import { Link } from "react-router-dom";
import { GlassCard } from "./GlassCard";

export const TemplateCard = ({ template }) => (
  <Link to={`/templates/${template._id || template.title.toLowerCase().replace(/\s+/g, "-")}`}>
    <GlassCard className="h-full">
      <div className="flex items-center justify-between">
        <span className="chip">{template.category}</span>
        {template.isPremium ? <span className="chip border-cyan-400/30 text-cyan-300">Premium</span> : null}
      </div>
      <h3 className="mt-5 text-lg font-semibold">{template.title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{template.description}</p>
    </GlassCard>
  </Link>
);

