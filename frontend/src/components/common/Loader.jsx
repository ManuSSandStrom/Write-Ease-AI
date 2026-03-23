export const Loader = ({ label = "Loading..." }) => (
  <div className="flex items-center justify-center gap-3 py-10 text-sm text-zinc-400">
    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-400" />
    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-violet-400 [animation-delay:150ms]" />
    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-fuchsia-400 [animation-delay:300ms]" />
    {label}
  </div>
);

