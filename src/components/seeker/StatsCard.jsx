export default function StatsCard({ label, value, hint, accent = "bg-lagoon" }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <span className={"h-2 w-2 rounded-full " + accent} aria-hidden="true" />
        <p className="text-sm text-slate-600">{label}</p>
      </div>
      <p className="mt-2 font-display text-3xl font-bold tabular-nums text-harbor">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
