import { useState } from "react";
import { ExternalLink } from "lucide-react";
import Drawer from "@/components/ui/Drawer";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { EMPLOYER_COLUMNS, EMPLOYER_LABELS } from "@/utils/constants";
import { formatDate } from "@/utils/helpers";

function DrawerBody({ application, onStatusChange, onSaveNotes }) {
  const person = application.applicant || {};
  const [notes, setNotes] = useState(application.employerNotes || "");
  const resume = application.resumeLink || person.resumeLink;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-xl font-semibold text-harbor">
          {person.name || "Candidate"}
        </h3>
        <p className="text-sm text-slate-600">{person.email}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <Badge status={application.status}>
            {EMPLOYER_LABELS[application.status]}
          </Badge>
          {person.experience && <span>{person.experience}</span>}
          <span className="text-xs text-slate-500">
            Applied {formatDate(application.createdAt)}
          </span>
        </div>
      </div>

      {person.skills?.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-harbor">Skills</h4>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {person.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full bg-mist px-2 py-0.5 text-xs text-harbor"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h4 className="text-sm font-medium text-harbor">Resume</h4>
        {resume ? (
          <a
            href={resume}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-sm text-lagoon hover:underline"
          >
            Resume kholo <ExternalLink size={14} aria-hidden="true" />
          </a>
        ) : (
          <p className="mt-1 text-sm text-slate-500">
            Candidate ne resume link nahi diya.
          </p>
        )}
      </div>

      <div>
        <h4 className="text-sm font-medium text-harbor">Cover note</h4>
        <p className="mt-1 whitespace-pre-line text-sm text-slate-600">
          {application.coverNote || "Cover note nahi diya."}
        </p>
      </div>

      <div>
        <label
          htmlFor="candidate-status"
          className="mb-1 block text-sm font-medium text-harbor"
        >
          Status
        </label>
        <select
          id="candidate-status"
          value={application.status}
          onChange={(e) => onStatusChange(application.id, e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-harbor focus:outline-none focus:ring-2 focus:ring-lagoon"
        >
          {EMPLOYER_COLUMNS.map((status) => (
            <option key={status} value={status}>
              {EMPLOYER_LABELS[status]}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-slate-500">
          Status badalte hi candidate ke tracker me bhi update ho jata hai.
        </p>
      </div>

      <Textarea
        label="Private notes"
        rows={4}
        placeholder="Interview feedback, salary expectation..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <p className="-mt-3 text-xs text-slate-500">
        Ye notes candidate ko nahi dikhte.
      </p>
      <Button onClick={() => onSaveNotes(application.id, notes)}>
        Save notes
      </Button>

      <div>
        <h4 className="text-sm font-medium text-harbor">History</h4>
        <ul className="mt-2 space-y-1.5">
          {[...application.history].reverse().map((entry, i) => (
            <li
              key={i}
              className="flex items-center justify-between text-sm text-slate-600"
            >
              <span>{EMPLOYER_LABELS[entry.status]}</span>
              <span className="tabular-nums text-xs text-slate-500">
                {formatDate(entry.at)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function CandidateDrawer({
  application,
  onClose,
  onStatusChange,
  onSaveNotes,
}) {
  return (
    <Drawer open={!!application} onClose={onClose} title="Candidate details">
      {application && (
        <DrawerBody
          key={application.id}
          application={application}
          onStatusChange={onStatusChange}
          onSaveNotes={onSaveNotes}
        />
      )}
    </Drawer>
  );
}
