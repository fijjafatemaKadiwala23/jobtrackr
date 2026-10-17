import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import useJobs from "@/hooks/useJobs";
import ApplyModal from "@/components/jobs/ApplyModal";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { describeApplication } from "@/utils/applicationHelpers";
import { formatDate, formatSalary } from "@/utils/helpers";

export default function SavedJobs() {
  const { user } = useAuth();
  const { jobs, applications, applyToJob, updateApplicationStatus, removeApplication } = useJobs();
  const [applyJob, setApplyJob] = useState(null);

  const saved = useMemo(
    () => applications.filter((a) => a.seekerId === user.id && a.status === "saved").sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [applications, user.id]
  );

  const handleApplySubmit = (values) => {
    try {
      applyToJob(user, applyJob, values);
      toast.success("Application bhej di gayi.");
      setApplyJob(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleMarkApplied = (id) => {
    updateApplicationStatus(id, "applied");
    toast.success("Applied mark kar diya.");
  };

  const handleRemove = (id) => {
    removeApplication(id);
    toast.success("Saved jobs se hata di.");
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-harbor">Saved jobs</h1>
      <p className="mt-1 text-slate-600">{saved.length} jobs save ki hain</p>

      <div className="mt-6">
        {saved.length === 0 ? (
          <EmptyState
            title="Abhi koi job save nahi ki"
            description="Jobs browse karte waqt bookmark icon dabao, wo yahan aa jayengi."
            action={
              <Link to="/jobs" className="inline-block rounded-lg bg-lagoon px-4 py-2 text-sm font-medium text-white hover:bg-lagoon/90">
                Jobs dekho
              </Link>
            }
          />
        ) : (
          <ul className="space-y-3">
            {saved.map((app) => {
              const info = describeApplication(app, jobs);
              const job = info.job;
              return (
                <li key={app.id} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4">
                  <div className="min-w-0">
                    <h2 className="font-display text-lg font-semibold text-harbor">
                      {job ? (
                        <Link to={"/jobs/" + job.id} className="hover:text-lagoon">
                          {info.title}
                        </Link>
                      ) : (
                        info.title
                      )}
                    </h2>
                    <p className="text-sm text-slate-600">
                      {info.company}
                      {job && ", " + job.location}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {job ? formatSalary(job.salaryMin, job.salaryMax) + ", " : ""}saved {formatDate(app.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job ? (
                      <Button size="sm" onClick={() => setApplyJob(job)} disabled={job.status !== "open"}>
                        {job.status === "open" ? "Apply now" : "Job closed"}
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => handleMarkApplied(app.id)}>
                        Mark as applied
                      </Button>
                    )}
                    <Button size="sm" variant="secondary" onClick={() => handleRemove(app.id)}>
                      Remove
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <ApplyModal open={!!applyJob} onClose={() => setApplyJob(null)} job={applyJob} user={user} onSubmit={handleApplySubmit} />
    </div>
  );
}
