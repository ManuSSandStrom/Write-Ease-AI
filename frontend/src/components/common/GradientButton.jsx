import { cn } from "../../utils/cn";

export const GradientButton = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-accent-purple to-accent-cyan text-white shadow-glow",
    ghost: "bg-white/5 text-white border border-white/10",
    subtle: "bg-white/10 text-zinc-100"
  };

  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition active:scale-[0.98]",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
