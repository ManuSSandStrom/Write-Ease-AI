import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQuickActionsOpen } from "../../store/slices/uiSlice";

const actions = [
  { label: "Quick Humanize", path: "/tools/humanizer" },
  { label: "Quick Rewrite", path: "/tools/paraphraser" },
  { label: "Grammar Check", path: "/tools/grammar" },
  { label: "Create Resume", path: "/resume/builder" }
];

export const QuickActionsSheet = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.quickActionsOpen);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 px-4"
          onClick={() => dispatch(setQuickActionsOpen(false))}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
            className="absolute bottom-0 left-0 right-0 rounded-t-[32px] border border-white/10 bg-zinc-950/95 p-6 backdrop-blur-xl"
          >
            <h3 className="text-lg font-semibold">Quick AI Writing</h3>
            <div className="mt-5 grid gap-3">
              {actions.map((action) => (
                <Link
                  key={action.path}
                  to={action.path}
                  onClick={() => dispatch(setQuickActionsOpen(false))}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-zinc-200"
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

