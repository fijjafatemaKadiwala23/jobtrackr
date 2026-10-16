import ApplicationCard from "./ApplicationCard";
import { SEEKER_COLUMNS, SEEKER_LABELS, STATUS_DOT } from "@/utils/constants";

// Shortlisted application "Applied" column me dikhti hai (card par Shortlisted badge ke saath)
const columnOf = (application) => (application.status === "shortlisted" ? "applied" : application.status);

export default function KanbanBoard({ applications, jobs, onOpen, onStatusChange }) {
  return (
    <div className="flex items-start gap-4 overflow-x-auto pb-4">
      {SEEKER_COLUMNS.map((column) => {
        const items = applications.filter((a) => columnOf(a) === column);

        return (
          <section key={column} aria-label={SEEKER_LABELS[column]} className="w-72 shrink-0 rounded-lg bg-slate-100/70 p-3">
            <header className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-harbor">
                <span className={"h-2 w-2 rounded-full " + STATUS_DOT[column]} aria-hidden="true" />
                {SEEKER_LABELS[column]}
              </h3>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium tabular-nums text-slate-600">{items.length}</span>
            </header>

            <div className="space-y-3">
              {items.length === 0 ? (
                <p className="rounded-md border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-500">
                  Yahan koi application nahi
                </p>
              ) : (
                items.map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                    jobs={jobs}
                    onOpen={onOpen}
                    onStatusChange={onStatusChange}
                  />
                ))
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
