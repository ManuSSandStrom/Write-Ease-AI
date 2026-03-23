import { SignUp } from "@clerk/clerk-react";
import { GlassCard } from "../../components/common/GlassCard";
import { clerkAppearance } from "../../constants/clerkAppearance";

const SignupPage = () => {
  return (
    <GlassCard className="p-7">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Get Started</p>
      <h1 className="mt-3 text-3xl font-bold">Create your WriteEase AI account</h1>
      <p className="mt-3 text-sm leading-7 text-zinc-400">
        Sign up to save your drafts, manage templates, and continue your work across devices.
      </p>
      <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-black/20 p-3">
        <SignUp
          routing="path"
          path="/signup"
          signInUrl="/login"
          fallbackRedirectUrl="/app/home"
          appearance={clerkAppearance}
        />
      </div>
      <div className="mt-5 rounded-2xl border border-amber-400/15 bg-amber-400/5 px-4 py-4">
        <p className="text-sm font-medium text-amber-200">Having trouble with CAPTCHA?</p>
        <p className="mt-2 text-sm leading-7 text-zinc-400">
          If signup does not continue, open the app on <span className="text-zinc-200">http://localhost:5173</span>,
          disable browser shields or privacy extensions for this site, and try again in a standard Chrome window.
        </p>
      </div>
    </GlassCard>
  );
};

export default SignupPage;
