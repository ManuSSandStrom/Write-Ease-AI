import { Link } from "react-router-dom";
import { GlassCard } from "../../components/common/GlassCard";

const ForgotPasswordPage = () => {
  return (
    <GlassCard className="p-7">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Password Reset</p>
      <h1 className="mt-3 text-3xl font-bold">Use Clerk's built-in recovery flow</h1>
      <p className="mt-4 text-sm leading-7 text-zinc-400">
        Password reset is handled directly inside the Clerk sign-in screen. Open the sign-in page and tap
        the forgot password option there.
      </p>
      <Link to="/login" className="mt-6 inline-block text-sm text-cyan-300">
        Back to sign in
      </Link>
    </GlassCard>
  );
};

export default ForgotPasswordPage;
