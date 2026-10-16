import { STATUS_DOT } from "@/utils/constants";

// JobTrackr ki signature cheez: application ka safar (route line)
const STOPS = ["saved", "applied", "interview", "offer"];
const LABELS = { saved: "Saved", applied: "Applied", interview: "Interview", offer: "Offer" };
const INDEX = { saved: 0, applied: 1, shortlisted: 1, interview: 2, offer: 3 };

// Rejected hone par route wahin ruk jata hai jahan tak application pahunchi thi
function reachedIndex(status, history = []) {
  if (status !== "rejected") return INDEX[status] ?? 0;
  const past = history.map((h) => INDEX[h.status]).filter((i) => i !== undefined);
  return past.length ? Math.max(...past) : 1;
}

export default function RouteLine({ status, history, showLabels = false, className = "" }) {
  const reached = reachedIndex(status, history);

  return (
    <ol className={"flex items-start " + className} aria-label={"Application progress: " + status}>
      {STOPS.map((stop, i) => {
        const isDone = i < reached;
        const isCurrent = i === reached;
        const dotClass = isDone
          ? "bg-lagoon"
          : isCurrent
          ? STATUS_DOT[status] + " ring-4 ring-harbor/10"
          : "border border-slate-300 bg-white";

        return (
          <li key={stop} className="flex flex-1 flex-col last:flex-none">
            <div className="flex items-center">
              <span className={"h-3 w-3 shrink-0 rounded-full transition-colors duration-500 motion-reduce:transition-none " + dotClass} />
              {i < STOPS.length - 1 && (
                <span className={"h-0.5 flex-1 transition-colors duration-500 motion-reduce:transition-none " + (isDone ? "bg-lagoon" : "bg-slate-200")} />
              )}
            </div>
            {showLabels && (
              <span className={"mt-1.5 text-[11px] " + (isCurrent ? "font-semibold text-harbor" : "text-slate-500")}>{LABELS[stop]}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
