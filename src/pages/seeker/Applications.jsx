import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import useJobs from "@/hooks/useJobs";
import KanbanBoard from "@/components/seeker/KanbanBoard";
import ApplicationDrawer from "@/components/seeker/ApplicationDrawer";
import ExternalApplicationForm from "@/components/seeker/ExternalApplicationForm";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";
import RouteLine from "@/components/ui/RouteLine";
import { SEEKER_LABELS } from "@/utils/constants";
import { describeApplication } from "@/utils/applicationHelpers";
import { formatDate } from "@/utils/helpers";

const viewButton = (active) =>
  "px-3 py-1.5 text-sm font-medium transition-colors " + (active ? "bg-harbor text-white" : "bg-white text-slate-600 hover:bg-slate-50");

export default function Applications() {
  const { user } = useAuth();
  const { jobs, applications, updateApplicationStatus, updateApplication, removeApplication, addExternalApplication } = useJobs();

  const [view, setView] = useState("board");
  const [selectedId, setSelectedId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  const mine = useMemo(
    () => applications.filter((a) => a.seekerId === user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [applications, user.id]
  );
  const selected = mine.find((a) => a.id === selectedId) || null;

  const handleStatus = (id, status) => {
    updateApplicationStatus(id, status);
    toast.success("Status: " + SEEKER_LABELS[status]);
  };
  const handleSave = (id, changes) => {
    updateApplication(id, changes);
    toast.success("Changes save ho gaye.");
  };
  const handleDelete = (id) => {
    removeApplication(id);
    setSelectedId(null);
    toast.success("Tracker se hata di.");
  };
  const handleAdd = (values) => {
    addExternalApplication(user, values);
    setAddOpen(false);
    toast.success("Application add ho gayi.");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-harbor">My applications</h1>
          <p className="mt-1 text-slate-600">{mine.length} applications track ho rahi hain</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex overflow-hidden rounded-md border border-slate-300" role="group" aria-label="View">
            <button type="button" className={viewButton(view === "board")} aria-pressed={view === "board"} onClick={() => setView("board")}>
              Board
            </button>
            <button type="button" className={viewButton(view === "journey")} aria-pressed={view === "journey"} onClick={() => setView("journey")}>
              Journey
            </button>
          </div>
          <Button onClick={() => setAddOpen(true)}>Add application</Button>
        </div>
      </div>

      <div className="mt-6">
        {mine.length === 0 ? (
          <EmptyState
            title="Abhi koi application nahi"
            description="Jobs save ya apply karo, ya kisi aur site par apply ki hui job yahan add karo."
            action={
              <Link to="/jobs" className="inline-block rounded-lg bg-lagoon px-4 py-2 text-sm font-medium text-white hover:bg-lagoon/90">
                Jobs dekho
              </Link>
            }
          />
        ) : view === "board" ? (
          <KanbanBoard applications={mine} jobs={jobs} onOpen={setSelectedId} onStatusChange={handleStatus} />
        ) : (
          <ul className="space-y-3">
            {mine.map((app) => {
              const info = describeApplication(app, jobs);
              return (
                <li key={app.id} className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-lg font-semibold text-harbor">
                        <button type="button" onClick={() => setSelectedId(app.id)} className="text-left hover:text-lagoon">
                          {info.title}
                        </button>
                      </h2>
                      <p className="text-sm text-slate-600">
                        {info.company}, {formatDate(app.createdAt)}
                      </p>
                    </div>
                    <Badge status={app.status}>{SEEKER_LABELS[app.status]}</Badge>
                  </div>
                  <RouteLine status={app.status} history={app.history} showLabels className="mt-4 max-w-xl" />
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <ApplicationDrawer
        application={selected}
        jobs={jobs}
        onClose={() => setSelectedId(null)}
        onStatusChange={handleStatus}
        onSave={handleSave}
        onDelete={handleDelete}
      />

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add application">
        <ExternalApplicationForm onSubmit={handleAdd} onCancel={() => setAddOpen(false)} />
      </Modal>
    </div>
  );
}
