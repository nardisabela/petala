// AnimatedSwatch.tsx
import { motion } from "framer-motion";

export function AnimatedSwatch({ color }: { color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ backgroundColor: color }}
      className="w-full h-24 rounded-lg mb-2"
    />
  );
}