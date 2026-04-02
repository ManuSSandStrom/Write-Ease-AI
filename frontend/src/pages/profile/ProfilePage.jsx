import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "../../components/common/GlassCard";
import { GradientButton } from "../../components/common/GradientButton";
import { stats } from "../../constants/mockData";
import { clearUser } from "../../store/slices/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login", { replace: true });
  };

  return (
    <div className="space-y-6">
      <GlassCard className="bg-gradient-to-br from-white/10 to-white/5">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan text-xl font-bold">
            {(user?.name || "W")[0]}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{user?.name || "WriteEase User"}</h1>
            <p className="text-sm text-zinc-400">{user?.email || "demo@writeease.ai"}</p>
            <span className="chip mt-3 inline-flex border-cyan-400/30 text-cyan-300">
              {user?.currentPlan || "free"} plan
            </span>
          </div>
        </div>
      </GlassCard>
      <section className="grid grid-cols-2 gap-4">
        {stats.map((item) => (
          <GlassCard key={item.label} className="p-4">
            <p className="text-xs text-zinc-500">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold">{item.value}</p>
          </GlassCard>
        ))}
      </section>
      <GlassCard>
        <h2 className="text-lg font-semibold">Saved files & history</h2>
        <p className="mt-2 text-sm text-zinc-400">Track your drafts, exports, plagiarism reports, and resume versions from one place.</p>
      </GlassCard>
      <GradientButton variant="ghost" onClick={handleLogout}>
        Logout
      </GradientButton>
    </div>
  );
};

export default ProfilePage;
