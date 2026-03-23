import { GlassCard } from "./GlassCard";

export const StatsCard = ({ label, value }) => (
  <GlassCard className="p-4">
    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</p>
    <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
  </GlassCard>
);

