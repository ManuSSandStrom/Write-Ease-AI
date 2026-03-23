import { GlassCard } from "../../components/common/GlassCard";

const settings = [
  "Theme",
  "Notifications",
  "Language",
  "Account",
  "Password",
  "Privacy",
  "Subscription management"
];

const SettingsPage = () => (
  <div className="space-y-4">
    <h1 className="text-3xl font-bold">Settings</h1>
    {settings.map((item) => (
      <GlassCard key={item} className="flex items-center justify-between p-4">
        <span>{item}</span>
        <span className="text-sm text-zinc-500">Manage</span>
      </GlassCard>
    ))}
  </div>
);

export default SettingsPage;
