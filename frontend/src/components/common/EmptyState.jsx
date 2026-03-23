import { GlassCard } from "./GlassCard";

export const EmptyState = ({ title, description }) => (
  <GlassCard className="text-center">
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="mt-2 text-sm text-zinc-400">{description}</p>
  </GlassCard>
);

