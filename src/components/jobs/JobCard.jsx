import { Link } from "react-router-dom";
import { Bookmark, MapPin } from "lucide-react";
import { formatDate, formatSalary } from "@/utils/helpers";
import { initials } from "@/utils/applicationHelpers";

// onToggleSave na do to save button nahi dikhega (jaise employer ke liye)
export default function JobCard({
  job,
  isSaved = false,
  hasApplied = false,
  onToggleSave,
}) {
  return (
    <article className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-lagoon/50">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-harbor font-display text-sm font-semibold text-white"
        >
          {initials(job.company)}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold leading-snug text-harbor">
            <Link to={"/jobs/" + job.id} className="hover:text-lagoon">
              {job.title}
            </Link>
          </h3>
          <p className="text-sm text-slate-600">{job.company}</p>
        </div>

        {hasApplied ? (
          <span className="rounded-full bg-lagoon/10 px-2.5 py-0.5 text-xs font-medium text-lagoon">
            Applied
          </span>
        ) : (
          onToggleSave && (
            <button
              type="button"
              onClick={onToggleSave}
              aria-pressed={isSaved}
              aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
              className={
                "rounded-md p-1.5 transition-colors hover:bg-slate-100 " +
                (isSaved ? "text-lagoon" : "text-slate-400")
              }
            >
              <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
            </button>
          )
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
        <span className="inline-flex items-center gap-1">
          <MapPin size={14} aria-hidden="true" />
          {job.location}
        </span>
        <span>{job.type}</span>
        <span className="font-medium tabular-nums text-harbor">
          {formatSalary(job.salaryMin, job.salaryMax)}
        </span>
      </div>

      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Skills">
        {job.skills.slice(0, 4).map((skill) => (
          <li
            key={skill}
            className="rounded-full bg-mist px-2 py-0.5 text-xs text-harbor"
          >
            {skill}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-slate-500">
        Posted {formatDate(job.createdAt)}
      </p>
    </article>
  );
}
