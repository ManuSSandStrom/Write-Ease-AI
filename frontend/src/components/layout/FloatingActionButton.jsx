import { PenSquare } from "lucide-react";
import { useDispatch } from "react-redux";
import { setQuickActionsOpen } from "../../store/slices/uiSlice";

export const FloatingActionButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(setQuickActionsOpen(true))}
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan text-white shadow-glow transition active:scale-95 sm:right-5"
      aria-label="Quick AI Writing"
    >
      <PenSquare className="h-5 w-5" />
    </button>
  );
};
