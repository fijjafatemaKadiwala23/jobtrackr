import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import Drawer from "@/components/ui/Drawer";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import RouteLine from "@/components/ui/RouteLine";
import { SEEKER_COLUMNS, SEEKER_LABELS } from "@/utils/constants";
import { describeApplication } from "@/utils/applicationHelpers";
import { formatDate } from "@/utils/helpers";

// key={application.id} ke saath use hota hai, isliye application badalne par state reset ho jati hai
function DrawerBody({ application, jobs, onStatusChange, onSave, onDelete }) {
  const info = describeApplication(application, jobs);
  const [interviewDate, setInterviewDate] = useState(
    application.interviewDate || "",
  );
  const [reminderDate, setReminderDate] = useState(
    application.reminderDate || "",
  );
  const [notes, setNotes] = useState(application.seekerNotes || "");
  const [confirming, setConfirming] = useState(false);

  const isShortlisted = application.status === "shortlisted";

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-xl font-semibold text-harbor">
          {info.title}
        </h3>
        <p className="text-sm text-slate-600">{info.company}</p>
        {info.external && info.link && (
          <a
            href={info.link}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-sm text-lagoon hover:underline"
          >
            Job link kholo <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
        {!info.external && (
          <Link
            to={info.link}
            className="mt-1 inline-block text-sm text-lagoon hover:underline"
          >
            Job details dekho
          </Link>
        )}
      </div>

      <RouteLine
        status={application.status}
        history={application.history}
        showLabels
      />

      <div>
        <label
          htmlFor="drawer-status"
          className="mb-1 block text-sm font-medium text-harbor"
        >
          Status
        </label>
        <select
          id="drawer-status"
          value={isShortlisted ? "applied" : application.status}
          onChange={(e) => onStatusChange(application.id, e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-harbor focus:outline-none focus:ring-2 focus:ring-lagoon"
        >
          {SEEKER_COLUMNS.map((status) => (
            <option key={status} value={status}>
              {SEEKER_LABELS[status]}
            </option>
          ))}
        </select>
        {isShortlisted && (
          <p className="mt-1 text-xs text-slate-500">
            Employer ne aapko shortlist kiya hai.
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Interview date"
          type="date"
          value={interviewDate}
          onChange={(e) => setInterviewDate(e.target.value)}
        />
        <Input
          label="Follow-up reminder"
          type="date"
          value={reminderDate}
          onChange={(e) => setReminderDate(e.target.value)}
        />
      </div>

      <Textarea
        label="Private notes"
        rows={4}
        placeholder="HR ka naam, salary, interview feedback..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <p className="-mt-3 text-xs text-slate-500">
        Ye notes sirf aapko dikhte hain, employer ko nahi.
      </p>

      <Button
        onClick={() =>
          onSave(application.id, {
            interviewDate,
            reminderDate,
            seekerNotes: notes,
          })
        }
      >
        Save changes
      </Button>

      {application.coverNote && (
        <div>
          <h4 className="text-sm font-medium text-harbor">Aapka cover note</h4>
          <p className="mt-1 whitespace-pre-line text-sm text-slate-600">
            {application.coverNote}
          </p>
        </div>
      )}

      <div>
        <h4 className="text-sm font-medium text-harbor">History</h4>
        <ul className="mt-2 space-y-1.5">
          {[...application.history].reverse().map((entry, i) => (
            <li
              key={i}
              className="flex items-center justify-between text-sm text-slate-600"
            >
              <span>{SEEKER_LABELS[entry.status]}</span>
              <span className="tabular-nums text-xs text-slate-500">
                {formatDate(entry.at)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-slate-200 pt-4">
        {confirming ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-slate-600">
              Tracker se hata dein?
            </span>
            <Button
              size="sm"
              variant="danger"
              onClick={() => onDelete(application.id)}
            >
              Haan, hatao
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setConfirming(false)}
            >
              Nahi
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setConfirming(true)}
          >
            Remove from tracker
          </Button>
        )}
      </div>
    </div>
  );
}

export default function ApplicationDrawer({
  application,
  jobs,
  onClose,
  onStatusChange,
  onSave,
  onDelete,
}) {
  return (
    <Drawer open={!!application} onClose={onClose} title="Application details">
      {application && (
        <DrawerBody
          key={application.id}
          application={application}
          jobs={jobs}
          onStatusChange={onStatusChange}
          onSave={onSave}
          onDelete={onDelete}
        />
      )}
    </Drawer>
  );
}
