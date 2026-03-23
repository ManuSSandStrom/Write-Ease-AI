import { Home, LayoutGrid, UserCircle2, Library } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { label: "Home", path: "/app/home", icon: Home },
  { label: "Tools", path: "/app/tools", icon: LayoutGrid },
  { label: "Templates", path: "/templates", icon: Library },
  { label: "Profile", path: "/profile", icon: UserCircle2 }
];

export const BottomNav = () => (
  <nav className="fixed bottom-3 left-1/2 z-40 grid w-[calc(100%-1rem)] max-w-md -translate-x-1/2 grid-cols-4 items-center rounded-[28px] border border-white/10 bg-zinc-950/90 px-2 py-2 backdrop-blur-xl sm:bottom-4 sm:w-[calc(100%-1.5rem)] sm:px-4 sm:py-3">
    {items.map(({ label, path, icon: Icon }) => (
      <NavLink
        key={path}
        to={path}
        className={({ isActive }) =>
          `flex min-w-0 flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[11px] transition sm:px-3 sm:text-xs ${isActive ? "bg-white/10 text-white" : "text-zinc-500"}`
        }
      >
        <Icon className="h-4 w-4" />
        <span className="truncate">{label}</span>
      </NavLink>
    ))}
  </nav>
);
