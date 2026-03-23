import { Home, LayoutGrid, UserCircle2, Library } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { label: "Home", path: "/app/home", icon: Home },
  { label: "Tools", path: "/app/tools", icon: LayoutGrid },
  { label: "Templates", path: "/templates", icon: Library },
  { label: "Profile", path: "/profile", icon: UserCircle2 }
];

export const BottomNav = () => (
  <nav className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-[28px] border border-white/10 bg-zinc-950/85 px-4 py-3 backdrop-blur-xl">
    {items.map(({ label, path, icon: Icon }) => (
      <NavLink
        key={path}
        to={path}
        className={({ isActive }) =>
          `flex min-w-16 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs transition ${isActive ? "bg-white/10 text-white" : "text-zinc-500"}`
        }
      >
        <Icon className="h-4 w-4" />
        {label}
      </NavLink>
    ))}
  </nav>
);

