import { formatDate } from "@/utils/helpers";

// events = upcomingEvents() ka result
export default function ReminderList({ events }) {
  if (events.length === 0) {
    return <p className="text-sm text-slate-500">Abhi koi upcoming interview ya follow-up reminder nahi hai.</p>;
  }

  return (
    <ul className="divide-y divide-slate-100">
      {events.map((event) => (
        <li key={event.id} className="flex items-center justify-between gap-3 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-harbor">{event.title}</p>
            <p className="truncate text-xs text-slate-500">{event.company}</p>
          </div>
          <div className="shrink-0 text-right">
            <span
              className={
                "rounded-full px-2 py-0.5 text-xs font-medium " +
                (event.type === "Interview" ? "bg-marigold/20 text-amber-800" : "bg-lagoon/10 text-lagoon")
              }
            >
              {event.type}
            </span>
            <p className="mt-1 text-xs tabular-nums text-slate-500">{formatDate(event.date)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
