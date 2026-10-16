import { EMPLOYER_COLUMNS, EMPLOYER_LABELS } from "@/utils/constants";
import { formatDate } from "@/utils/helpers";

// <table><tbody> ke andar use hota hai. showJob=true par "Job" column bhi dikhta hai.
export default function ApplicantRow({
  application,
  jobTitle,
  showJob = false,
  onOpen,
  onStatusChange,
}) {
  const person = application.applicant || {};
  const selectId = "row-status-" + application.id;

  return (
    <tr className="border-t border-slate-200">
      <td className="px-4 py-3">
        <button
          type="button"
          onClick={() => onOpen(application)}
          className="text-left font-medium text-harbor hover:text-lagoon"
        >
          {person.name || "Candidate"}
        </button>
        <p className="text-xs text-slate-500">{person.email}</p>
      </td>
      {showJob && (
        <td className="px-4 py-3 text-sm text-slate-600">{jobTitle}</td>
      )}
      <td className="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-slate-600">
        {formatDate(application.createdAt)}
      </td>
      <td className="px-4 py-3">
        <label htmlFor={selectId} className="sr-only">
          Change status
        </label>
        <select
          id={selectId}
          value={application.status}
          onChange={(e) => onStatusChange(application.id, e.target.value)}
          className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-harbor focus:outline-none focus:ring-2 focus:ring-lagoon"
        >
          {EMPLOYER_COLUMNS.map((status) => (
            <option key={status} value={status}>
              {EMPLOYER_LABELS[status]}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}
