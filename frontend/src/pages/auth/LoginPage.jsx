import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { GlassCard } from "../../components/common/GlassCard";
import { GradientButton } from "../../components/common/GradientButton";
import { loginUser } from "../../store/slices/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await dispatch(loginUser(form)).unwrap();
      navigate("/app/home", { replace: true });
    } catch (requestError) {
      setError(typeof requestError === "string" ? requestError : requestError?.message || "Unable to sign in right now");
    }
  };

  return (
    <GlassCard className="overflow-hidden p-5 sm:p-7">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Welcome Back</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Sign in to continue writing</h1>
      <p className="mt-3 text-sm leading-7 text-zinc-400">
        Access your workspace, saved drafts, and premium writing tools with your WriteEase account.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Email</span>
          <input
            className="input-base"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Password</span>
          <input
            className="input-base"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        {error ? (
          <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </p>
        ) : null}

        <GradientButton className="w-full" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </GradientButton>
      </form>

      <div className="mt-4 text-sm text-zinc-500">
        Forgot your password?{" "}
        <Link to="/forgot-password" className="text-cyan-300 hover:text-cyan-200">
          Reset here
        </Link>
      </div>
      <div className="mt-3 text-center text-sm text-zinc-500">
        New here?{" "}
        <Link to="/signup" className="text-cyan-300 hover:text-cyan-200">
          Create an account
        </Link>
      </div>
    </GlassCard>
  );
};

export default LoginPage;
