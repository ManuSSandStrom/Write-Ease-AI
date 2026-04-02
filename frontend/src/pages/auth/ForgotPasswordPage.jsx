import { Link } from "react-router-dom";
import { GlassCard } from "../../components/common/GlassCard";

const ForgotPasswordPage = () => {
  return (
    <GlassCard className="p-7">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Password Reset</p>
      <h1 className="mt-3 text-3xl font-bold">Reset Password Support</h1>
      <p className="mt-4 text-sm leading-7 text-zinc-400">
        Password reset flow is being updated. For now, please contact support to reset your account password.
      </p>
      <Link to="/login" className="mt-6 inline-block text-sm text-cyan-300">
        Back to sign in
      </Link>
    </GlassCard>
  );
};

export default ForgotPasswordPage;
