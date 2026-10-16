import {
  EMPLOYER_COLUMNS,
  EMPLOYER_LABELS,
  STATUS_DOT,
} from "@/utils/constants";
import { formatDate } from "@/utils/helpers";

export default function PipelineBoard({
  applications,
  onOpen,
  onStatusChange,
}) {
  return (
    <div className="flex items-start gap-4 overflow-x-auto pb-4">
      {EMPLOYER_COLUMNS.map((column) => {
        const items = applications.filter((a) => a.status === column);

        return (
          <section
            key={column}
            aria-label={EMPLOYER_LABELS[column]}
            className="w-72 shrink-0 rounded-lg bg-slate-100/70 p-3"
          >
            <header className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-harbor">
                <span
                  className={"h-2 w-2 rounded-full " + STATUS_DOT[column]}
                  aria-hidden="true"
                />
                {EMPLOYER_LABELS[column]}
              </h3>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium tabular-nums text-slate-600">
                {items.length}
              </span>
            </header>

            <div className="space-y-3">
              {items.length === 0 ? (
                <p className="rounded-md border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-500">
                  Koi candidate nahi
                </p>
              ) : (
                items.map((application) => {
                  const person = application.applicant || {};
                  const selectId = "pipeline-status-" + application.id;
                  return (
                    <article
                      key={application.id}
                      className="rounded-lg border border-slate-200 bg-white p-3"
                    >
                      <h4 className="font-display text-base font-semibold leading-snug text-harbor">
                        <button
                          type="button"
                          onClick={() => onOpen(application.id)}
                          className="text-left hover:text-lagoon"
                        >
                          {person.name || "Candidate"}
                        </button>
                      </h4>
                      <p className="text-xs text-slate-500">
                        {person.experience || "Experience nahi diya"}, applied{" "}
                        {formatDate(application.createdAt)}
                      </p>

                      {person.skills?.length > 0 && (
                        <ul
                          className="mt-2 flex flex-wrap gap-1"
                          aria-label="Skills"
                        >
                          {person.skills.slice(0, 3).map((skill) => (
                            <li
                              key={skill}
                              className="rounded-full bg-mist px-2 py-0.5 text-[11px] text-harbor"
                            >
                              {skill}
                            </li>
                          ))}
                        </ul>
                      )}

                      <label htmlFor={selectId} className="sr-only">
                        Change status
                      </label>
                      <select
                        id={selectId}
                        value={application.status}
                        onChange={(e) =>
                          onStatusChange(application.id, e.target.value)
                        }
                        className="mt-3 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-harbor focus:outline-none focus:ring-2 focus:ring-lagoon"
                      >
                        {EMPLOYER_COLUMNS.map((status) => (
                          <option key={status} value={status}>
                            {EMPLOYER_LABELS[status]}
                          </option>
                        ))}
                      </select>
                    </article>
                  );
                })
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
