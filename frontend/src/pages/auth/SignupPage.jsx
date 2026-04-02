import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { GlassCard } from "../../components/common/GlassCard";
import { GradientButton } from "../../components/common/GradientButton";
import { registerUser } from "../../store/slices/authSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await dispatch(
        registerUser({
          name: form.name,
          email: form.email,
          password: form.password
        })
      ).unwrap();

      navigate("/app/home", { replace: true });
    } catch (requestError) {
      setError(
        typeof requestError === "string"
          ? requestError
          : requestError?.message || "Unable to create account right now"
      );
    }
  };

  return (
    <GlassCard className="overflow-hidden p-5 sm:p-7">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Get Started</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Create your WriteEase AI account</h1>
      <p className="mt-3 text-sm leading-7 text-zinc-400">
        Sign up to save drafts, manage templates, and continue your work across devices.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Full name</span>
          <input
            className="input-base"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

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
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            Confirm password
          </span>
          <input
            className="input-base"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
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
          {loading ? "Creating account..." : "Create account"}
        </GradientButton>
      </form>

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
