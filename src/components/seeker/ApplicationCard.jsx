import Badge from "@/components/ui/Badge";
import RouteLine from "@/components/ui/RouteLine";
import { SEEKER_COLUMNS, SEEKER_LABELS } from "@/utils/constants";
import { describeApplication } from "@/utils/applicationHelpers";
import { formatDate } from "@/utils/helpers";

export default function ApplicationCard({
  application,
  jobs,
  onOpen,
  onStatusChange,
}) {
  const info = describeApplication(application, jobs);
  const isShortlisted = application.status === "shortlisted";
  const selectId = "status-" + application.id;

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-3">
      <h4 className="font-display text-base font-semibold leading-snug text-harbor">
        <button
          type="button"
          onClick={() => onOpen(application.id)}
          className="text-left hover:text-lagoon"
        >
          {info.title}
        </button>
      </h4>
      <p className="text-sm text-slate-600">{info.company}</p>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        {isShortlisted && <Badge status="shortlisted">Shortlisted</Badge>}
        <span>{formatDate(application.createdAt)}</span>
        {application.interviewDate && (
          <span className="font-medium text-amber-800">
            Interview {formatDate(application.interviewDate)}
          </span>
        )}
      </div>

      <RouteLine
        status={application.status}
        history={application.history}
        className="mt-3"
      />

      <label htmlFor={selectId} className="sr-only">
        Change status
      </label>
      <select
        id={selectId}
        value={isShortlisted ? "applied" : application.status}
        onChange={(e) => onStatusChange(application.id, e.target.value)}
        className="mt-3 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-harbor focus:outline-none focus:ring-2 focus:ring-lagoon"
      >
        {SEEKER_COLUMNS.map((status) => (
          <option key={status} value={status}>
            {SEEKER_LABELS[status]}
          </option>
        ))}
      </select>
    </article>
  );
}
