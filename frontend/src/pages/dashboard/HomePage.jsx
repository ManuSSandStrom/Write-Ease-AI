import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "../../components/common/SearchBar";
import { PremiumBanner } from "../../components/common/PremiumBanner";
import { StatsCard } from "../../components/common/StatsCard";
import { ToolCard } from "../../components/common/ToolCard";
import { GlassCard } from "../../components/common/GlassCard";
import { fetchAnalytics } from "../../store/slices/appSlice";
import { recentActivity, stats, toolCards } from "../../constants/mockData";

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const analytics = useSelector((state) => state.app.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  const mergedStats = analytics
    ? [
        { label: "Words Processed", value: `${analytics.wordsProcessed || 0}` },
        { label: "AI Requests", value: `${(analytics.humanizerUses || 0) + (analytics.paraphrases || 0)}` },
        { label: "Scans", value: `${analytics.plagiarismScans || 0}` },
        { label: "Resume Exports", value: `${analytics.resumeExports || 0}` }
      ]
    : stats;

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-zinc-400">Good evening</p>
        <h1 className="mt-2 text-3xl font-bold">{user?.name || "Writer"}, your workspace is ready</h1>
      </header>
      <SearchBar placeholder="Search tools, templates, recent files" />
      <PremiumBanner />
      <section className="grid grid-cols-2 gap-4">
        {mergedStats.map((item) => (
          <StatsCard key={item.label} {...item} />
        ))}
      </section>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Tools</h2>
          <span className="text-sm text-zinc-500">6 available</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {toolCards.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-xl font-semibold">Recent activity</h2>
        <div className="space-y-3">
          {recentActivity.map((item) => (
            <GlassCard key={item.title} className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{item.type}</p>
                </div>
                <span className="text-xs text-zinc-500">{item.time}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

