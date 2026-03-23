import { SignIn } from "@clerk/clerk-react";
import { GlassCard } from "../../components/common/GlassCard";
import { clerkAppearance } from "../../constants/clerkAppearance";

const LoginPage = () => {
  return (
    <GlassCard className="p-7">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Welcome Back</p>
      <h1 className="mt-3 text-3xl font-bold">Sign in to continue writing</h1>
      <p className="mt-3 text-sm leading-7 text-zinc-400">
        Access your workspace, saved drafts, and premium writing tools with a secure sign-in flow.
      </p>
      <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-black/20 p-3">
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/signup"
          fallbackRedirectUrl="/app/home"
          appearance={clerkAppearance}
        />
      </div>
    </GlassCard>
  );
};

export default LoginPage;
