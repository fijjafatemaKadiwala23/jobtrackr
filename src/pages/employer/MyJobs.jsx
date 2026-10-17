import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import useJobs from "@/hooks/useJobs";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import useInitialLoading from "@/hooks/useInitialLoading";
import { TableSkeleton } from "@/components/ui/Skeletons";
import Modal from "@/components/ui/Modal";
import { formatDate } from "@/utils/helpers";

const actionLink = "text-sm text-lagoon hover:underline";

export default function MyJobs() {
  const { user } = useAuth();
  const { jobs, applications, editJob, removeJob } = useJobs();
  const loading = useInitialLoading();
  const [toDelete, setToDelete] = useState(null);

  const myJobs = useMemo(
    () => jobs.filter((j) => j.employerId === user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [jobs, user.id]
  );
  const countFor = (jobId) => applications.filter((a) => a.jobId === jobId && a.status !== "saved").length;

  const handleToggleStatus = (job) => {
    const status = job.status === "open" ? "closed" : "open";
    editJob(job.id, { status });
    toast.success(status === "open" ? "Job dobara open ho gayi." : "Job close ho gayi.");
  };

  const handleConfirmDelete = () => {
    removeJob(toDelete.id);
    toast.success("Job delete ho gayi.");
    setToDelete(null);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-harbor">My jobs</h1>
          <p className="mt-1 text-slate-600">{loading ? "Jobs load ho rahi hain..." : myJobs.length + " jobs"}</p>
        </div>
        <Link to="/employer/jobs/new" className="rounded-lg bg-lagoon px-4 py-2 font-medium text-white transition hover:bg-lagoon/90">
          Post a job
        </Link>
      </div>

      <div className="mt-6">
        {loading ? (
          <TableSkeleton cols={4} />
        ) : myJobs.length === 0 ? (
          <EmptyState title="Abhi koi job post nahi ki" description="Pehli job post karo, candidates yahin se manage honge." />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th scope="col" className="px-4 py-2 font-medium">Job</th>
                  <th scope="col" className="px-4 py-2 font-medium">Applicants</th>
                  <th scope="col" className="px-4 py-2 font-medium">Status</th>
                  <th scope="col" className="px-4 py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myJobs.map((job) => (
                  <tr key={job.id} className="border-t border-slate-200">
                    <td className="px-4 py-3">
                      <p className="font-medium text-harbor">{job.title}</p>
                      <p className="text-xs text-slate-500">
                        {job.location}, posted {formatDate(job.createdAt)}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm tabular-nums text-slate-600">{countFor(job.id)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          "rounded-full px-2.5 py-0.5 text-xs font-medium " +
                          (job.status === "open" ? "bg-pine/10 text-pine" : "bg-slate-100 text-slate-600")
                        }
                      >
                        {job.status === "open" ? "Open" : "Closed"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <Link to={"/employer/jobs/" + job.id + "/applicants"} className={actionLink}>
                          Applicants
                        </Link>
                        <Link to={"/employer/jobs/" + job.id + "/edit"} className={actionLink}>
                          Edit
                        </Link>
                        <button type="button" onClick={() => handleToggleStatus(job)} className={actionLink}>
                          {job.status === "open" ? "Close" : "Reopen"}
                        </button>
                        <button type="button" onClick={() => setToDelete(job)} className="text-sm text-plum hover:underline">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} title="Job delete karein?">
        <p className="text-sm text-slate-600">
          <span className="font-medium text-harbor">{toDelete?.title}</span> aur uske saare applicants hamesha ke liye hat jayenge.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="danger" onClick={handleConfirmDelete}>
            Haan, delete karo
          </Button>
          <Button variant="secondary" onClick={() => setToDelete(null)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
