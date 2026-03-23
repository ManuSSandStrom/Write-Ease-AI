import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { GlassCard } from "../../components/common/GlassCard";
import { clerkAppearance } from "../../constants/clerkAppearance";

const SignupPage = () => {
  return (
    <GlassCard className="overflow-hidden p-5 sm:p-7">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Get Started</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Create your WriteEase AI account</h1>
      <p className="mt-3 text-sm leading-7 text-zinc-400">
        Sign up to save your drafts, manage templates, and continue your work across devices.
      </p>
      <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-black/20 p-2 sm:p-3">
        <SignUp
          routing="path"
          path="/signup"
          signInUrl="/login"
          fallbackRedirectUrl="/app/home"
          appearance={clerkAppearance}
        />
      </div>
      <div className="mt-5 rounded-3xl border border-amber-400/15 bg-amber-400/5 px-4 py-4">
        <p className="text-sm font-medium text-amber-200">Having trouble with CAPTCHA or social sign-up?</p>
        <p className="mt-2 text-sm leading-7 text-zinc-400">
          Open the app on <span className="text-zinc-200">https://writeeaseai.netlify.app</span> or{" "}
          <span className="text-zinc-200">http://localhost:5173</span>, disable shields or privacy extensions for this
          site, and try again in a normal Chrome window.
        </p>
      </div>
      <div className="mt-5 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link to="/login" className="text-cyan-300 hover:text-cyan-200">
          Sign in
        </Link>
      </div>
    </GlassCard>
  );
};

export default SignupPage;
