export const InputEditor = ({ value, onChange, placeholder }) => (
  <textarea
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder={placeholder}
    className="min-h-[220px] w-full resize-none rounded-[28px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white placeholder:text-zinc-500 outline-none"
  />
);

