export const Stepper = ({ steps, currentStep }) => (
  <div className="space-y-3">
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan transition-all"
        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
      />
    </div>
    <div className="flex flex-wrap gap-2">
      {steps.map((step, index) => (
        <span
          key={step}
          className={`chip ${index <= currentStep ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200" : ""}`}
        >
          {index + 1}. {step}
        </span>
      ))}
    </div>
  </div>
);
