import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SplashScreen = () => {
  const navigate = useNavigate();
  const { onboardingSeen, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!onboardingSeen) navigate("/onboarding");
      else if (!token) navigate("/login");
      else navigate("/app/home");
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigate, onboardingSeen, token]);

  return (
    <div className="screen-shell flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] bg-gradient-to-br from-accent-purple via-accent-blue to-accent-cyan shadow-glow">
          <span className="text-3xl font-bold">W</span>
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight">WriteEase AI</h1>
        <p className="mt-3 text-sm text-zinc-400">
          Premium AI writing, research, and resume workflows
        </p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
