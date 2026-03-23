import { Search } from "lucide-react";

export const SearchBar = ({ placeholder = "Search", value, onChange }) => (
  <label className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3">
    <Search className="h-4 w-4 text-zinc-500" />
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
    />
  </label>
);

