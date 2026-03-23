import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const GlassCard = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
    className={cn("glass-panel rounded-[28px] p-5", className)}
  >
    {children}
  </motion.div>
);

