import { motion } from "framer-motion";

export default function StatsCard({
  label,
  value,
  hint,
  accent = "bg-lagoon",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{
        y: -4,
        boxShadow: "0px 8px 24px rgba(15, 40, 60, 0.10)",
      }}
      className="rounded-lg border border-slate-200 bg-white p-4"
    >
      <div className="flex items-center gap-2">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className={"h-2 w-2 rounded-full " + accent}
          aria-hidden="true"
        />

        <p className="text-sm text-slate-600">{label}</p>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-2 font-display text-3xl font-bold tabular-nums text-harbor"
      >
        {value}
      </motion.p>

      {hint && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-1 text-xs text-slate-500"
        >
          {hint}
        </motion.p>
      )}
    </motion.div>
  );
}
