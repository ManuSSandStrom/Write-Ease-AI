import { Check } from "lucide-react";
import { pricingPlans } from "../constants/mockData";
import { GlassCard } from "../components/common/GlassCard";
import { GradientButton } from "../components/common/GradientButton";

const PricingPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold">Pricing</h1>
      <p className="mt-2 text-sm text-zinc-400">Simple plans designed for students, researchers, and serious writers.</p>
    </div>
    <div className="grid gap-4 lg:grid-cols-2">
      {pricingPlans.map((plan) => (
        <GlassCard
          key={plan.name}
          className={`relative overflow-hidden ${plan.recommended ? "bg-gradient-to-br from-violet-600/20 to-cyan-400/10" : ""}`}
        >
          {plan.recommended ? (
            <span className="chip mb-5 inline-flex border-cyan-400/30 text-cyan-300">Recommended</span>
          ) : null}
          <h2 className="text-2xl font-semibold">{plan.name}</h2>
          <p className="mt-4 text-4xl font-bold">{plan.price}<span className="text-lg text-zinc-400">{plan.cycle}</span></p>
          <div className="mt-6 space-y-3">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                <Check className="h-4 w-4 text-cyan-300" />
                {feature}
              </div>
            ))}
          </div>
          <GradientButton className="mt-8 w-full">{plan.recommended ? "Upgrade Now" : "Choose Plan"}</GradientButton>
        </GlassCard>
      ))}
    </div>
  </div>
);

export default PricingPage;

