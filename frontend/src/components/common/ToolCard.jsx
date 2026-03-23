import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { GlassCard } from "./GlassCard";

export const ToolCard = ({ title, description, icon: Icon, path, accent }) => (
  <Link to={path}>
    <GlassCard className={`overflow-hidden bg-gradient-to-br ${accent}`}>
      <div className="flex items-start justify-between">
        <span className="rounded-2xl border border-white/10 bg-white/10 p-3">
          <Icon className="h-5 w-5 text-white" />
        </span>
        <ArrowUpRight className="h-4 w-4 text-zinc-400" />
      </div>
      <h3 className="mt-8 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-zinc-300">{description}</p>
    </GlassCard>
  </Link>
);

