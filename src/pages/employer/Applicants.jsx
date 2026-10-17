import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import useJobs from "@/hooks/useJobs";
import ApplicantRow from "@/components/employer/ApplicantRow";
import CandidateDrawer from "@/components/employer/CandidateDrawer";
import PipelineBoard from "@/components/employer/PipelineBoard";
import EmptyState from "@/components/ui/EmptyState";
import useInitialLoading from "@/hooks/useInitialLoading";
import Skeleton from "@/components/ui/Skeleton";
import { BoardSkeleton, TableSkeleton } from "@/components/ui/Skeletons";
import { EMPLOYER_COLUMNS, EMPLOYER_LABELS, STATUS_DOT } from "@/utils/constants";

const viewButton = (active) =>
  "px-3 py-1.5 text-sm font-medium transition-colors " + (active ? "bg-harbor text-white" : "bg-white text-slate-600 hover:bg-slate-50");

export default function Applicants() {
  const { id } = useParams();
  const { user } = useAuth();
  const { jobs, applications, updateApplicationStatus, updateApplication } = useJobs();

  const [view, setView] = useState("board");
  const [selectedId, setSelectedId] = useState(null);
  const loading = useInitialLoading();

  const job = jobs.find((j) => j.id === id && j.employerId === user.id);
  const applicants = useMemo(
    () => applications.filter((a) => a.jobId === id && a.status !== "saved").sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [applications, id]
  );

  if (!job) {
    return (
      <EmptyState
        title="Job nahi mili"
        description="Ye job hat gayi hai ya aapki nahi hai."
        action={
          <Link to="/employer/jobs" className="inline-block rounded-lg bg-lagoon px-4 py-2 text-sm font-medium text-white hover:bg-lagoon/90">
            My jobs par jao
          </Link>
        }
      />
    );
  }

  const selected = applicants.find((a) => a.id === selectedId) || null;
  const countOf = (status) => applicants.filter((a) => a.status === status).length;
  const maxCount = Math.max(1, ...EMPLOYER_COLUMNS.map(countOf));

  const handleStatus = (appId, status) => {
    updateApplicationStatus(appId, status);
    toast.success("Status: " + EMPLOYER_LABELS[status]);
  };
  const handleSaveNotes = (appId, notes) => {
    updateApplication(appId, { employerNotes: notes });
    toast.success("Notes save ho gaye.");
  };

  return (
    <div>
      <Link to="/employer/jobs" className="text-sm text-lagoon hover:underline">
        My jobs
      </Link>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-harbor">{job.title}</h1>
          <p className="mt-1 text-slate-600">
            {loading
              ? "Applicants load ho rahe hain..."
              : applicants.length + " applicants, job " + (job.status === "open" ? "open hai" : "closed hai")}
          </p>
        </div>
        <div className="inline-flex overflow-hidden rounded-md border border-slate-300" role="group" aria-label="View">
          <button type="button" className={viewButton(view === "board")} aria-pressed={view === "board"} onClick={() => setView("board")}>
            Pipeline
          </button>
          <button type="button" className={viewButton(view === "list")} aria-pressed={view === "list"} onClick={() => setView("list")}>
            List
          </button>
        </div>
      </div>

      {/* Funnel: kis stage me kitne candidates */}
      {loading ? (
        <Skeleton className="mt-6 h-36 w-full" />
      ) : (
        <div className="mt-6 space-y-2 rounded-lg border border-slate-200 bg-white p-4" aria-label="Hiring funnel">
          {EMPLOYER_COLUMNS.map((status) => (
            <div key={status} className="flex items-center gap-3 text-sm">
              <span className="w-24 shrink-0 text-slate-600">{EMPLOYER_LABELS[status]}</span>
              <div className="h-2 flex-1 rounded-full bg-slate-100">
                <div
                  className={"h-2 rounded-full transition-all " + STATUS_DOT[status]}
                  style={{ width: (countOf(status) / maxCount) * 100 + "%" }}
                />
              </div>
              <span className="w-6 text-right tabular-nums text-harbor">{countOf(status)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        {loading ? (
          view === "board" ? <BoardSkeleton /> : <TableSkeleton cols={3} />
        ) : applicants.length === 0 ? (
          <EmptyState title="Abhi tak kisi ne apply nahi kiya" description="Jab seekers apply karenge, wo yahan Applied column me dikhenge." />
        ) : view === "board" ? (
          <PipelineBoard applications={applicants} onOpen={setSelectedId} onStatusChange={handleStatus} />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th scope="col" className="px-4 py-2 font-medium">Candidate</th>
                  <th scope="col" className="px-4 py-2 font-medium">Applied</th>
                  <th scope="col" className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((application) => (
                  <ApplicantRow
                    key={application.id}
                    application={application}
                    onOpen={(app) => setSelectedId(app.id)}
                    onStatusChange={handleStatus}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CandidateDrawer application={selected} onClose={() => setSelectedId(null)} onStatusChange={handleStatus} onSaveNotes={handleSaveNotes} />
    </div>
  );
}
