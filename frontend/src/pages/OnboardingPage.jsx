import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onboardingSlides } from "../constants/mockData";
import { GlassCard } from "../components/common/GlassCard";
import { GradientButton } from "../components/common/GradientButton";
import { setOnboardingSeen } from "../store/slices/authSlice";

const OnboardingPage = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const slide = onboardingSlides[index];
  const Icon = slide.icon;

  const complete = () => {
    dispatch(setOnboardingSeen(true));
    navigate("/login");
  };

  return (
    <div className="screen-shell flex items-center justify-center">
      <GlassCard className="mx-auto max-w-md p-7">
        <motion.div
          key={slide.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-accent-purple/30 to-accent-cyan/20">
            <Icon className="h-10 w-10 text-cyan-300" />
          </div>
          <div className="mt-10 flex gap-2">
            {onboardingSlides.map((_, dotIndex) => (
              <div
                key={dotIndex}
                className={`h-2 rounded-full transition-all ${
                  dotIndex === index ? "w-10 bg-cyan-300" : "w-2 bg-white/15"
                }`}
              />
            ))}
          </div>
          <h2 className="mt-8 text-3xl font-bold">{slide.title}</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-400">{slide.description}</p>
        </motion.div>
        <div className="mt-10 flex gap-3">
          <GradientButton variant="ghost" className="flex-1" onClick={complete}>
            Skip
          </GradientButton>
          <GradientButton
            className="flex-1"
            onClick={() => (index === onboardingSlides.length - 1 ? complete() : setIndex(index + 1))}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </GradientButton>
        </div>
      </GlassCard>
    </div>
  );
};

export default OnboardingPage;
