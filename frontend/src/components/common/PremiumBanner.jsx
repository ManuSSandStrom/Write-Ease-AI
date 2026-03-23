import { Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { GlassCard } from "./GlassCard";
import { GradientButton } from "./GradientButton";

export const PremiumBanner = () => (
  <GlassCard className="relative overflow-hidden bg-gradient-to-br from-violet-600/25 via-indigo-500/20 to-cyan-400/10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_40%)]" />
    <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-zinc-200">
          <Crown className="h-3.5 w-3.5" />
          Premium upgrade
        </div>
        <h3 className="text-xl font-semibold">Unlock plagiarism reports and premium templates</h3>
        <p className="mt-2 max-w-lg text-sm text-zinc-300">
          Upgrade to remove friction from your writing workflow with faster exports and advanced tools.
        </p>
      </div>
      <Link to="/pricing">
        <GradientButton>View Plans</GradientButton>
      </Link>
    </div>
  </GlassCard>
);

