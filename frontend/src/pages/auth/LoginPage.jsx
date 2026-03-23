import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { GlassCard } from "../../components/common/GlassCard";
import { clerkAppearance } from "../../constants/clerkAppearance";

const LoginPage = () => {
  return (
    <GlassCard className="overflow-hidden p-5 sm:p-7">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Welcome Back</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Sign in to continue writing</h1>
      <p className="mt-3 text-sm leading-7 text-zinc-400">
        Access your workspace, saved drafts, and premium writing tools with a secure sign-in flow.
      </p>
      <div className="mt-6 rounded-3xl border border-cyan-400/10 bg-cyan-400/5 px-4 py-4">
        <p className="text-sm font-medium text-cyan-200">Having trouble with social login?</p>
        <p className="mt-2 text-sm leading-7 text-zinc-400">
          If you see <span className="text-zinc-200">External Account was not found</span>, try email sign-in first or
          use the same provider account you already used with this Clerk app.
        </p>
      </div>
      <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-black/20 p-2 sm:p-3">
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/signup"
          fallbackRedirectUrl="/app/home"
          appearance={clerkAppearance}
        />
      </div>
      <div className="mt-5 text-center text-sm text-zinc-500">
        New here?{" "}
        <Link to="/signup" className="text-cyan-300 hover:text-cyan-200">
          Create an account
        </Link>
      </div>
    </GlassCard>
  );
};

export default LoginPage;
