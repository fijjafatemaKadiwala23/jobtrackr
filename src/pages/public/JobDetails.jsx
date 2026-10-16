import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import useJobs from "@/hooks/useJobs";
import ApplyModal from "@/components/jobs/ApplyModal";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { formatDate, formatSalary } from "@/utils/helpers";
import { initials } from "@/utils/applicationHelpers";

const backLink = "inline-block rounded-lg bg-lagoon px-4 py-2 text-sm font-medium text-white hover:bg-lagoon/90";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { jobs, applications, applyToJob, toggleSaveJob } = useJobs();
  const navigate = useNavigate();
  const [applyOpen, setApplyOpen] = useState(false);

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <EmptyState
        title="Job nahi mili"
        description="Ye job hat gayi hai ya link galat hai."
        action={
          <Link to="/jobs" className={backLink}>
            Saari jobs dekho
          </Link>
        }
      />
    );
  }

  const isSeeker = user?.role === "seeker";
  const isEmployer = user?.role === "employer";
  const mine = isSeeker ? applications.find((a) => a.jobId === job.id && a.seekerId === user.id) : null;
  const hasApplied = !!mine && mine.status !== "saved";
  const isSaved = mine?.status === "saved";
  const isClosed = job.status !== "open";

  const handleApplyClick = () => {
    if (!user) {
      toast("Apply karne ke liye pehle login karo.");
      navigate("/login");
      return;
    }
    setApplyOpen(true);
  };

  const handleApplySubmit = (values) => {
    try {
      applyToJob(user, job, values);
      toast.success("Application bhej di gayi.");
      setApplyOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSave = () => {
    if (!user) {
      toast("Job save karne ke liye pehle login karo.");
      navigate("/login");
      return;
    }
    const result = toggleSaveJob(user, job);
    toast.success(result === "saved" ? "Job save ho gayi." : "Saved jobs se hata di.");
  };

  return (
    <div>
      <Link to="/jobs" className="text-sm text-lagoon hover:underline">
        Saari jobs
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-4">
            <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-harbor font-display font-semibold text-white">
              {initials(job.company)}
            </span>
            <div>
              <h1 className="font-display text-3xl font-bold text-harbor">{job.title}</h1>
              <p className="text-slate-600">
                {job.company}, {job.location}
              </p>
            </div>
          </div>

          <h2 className="mt-8 font-display text-xl font-semibold text-harbor">Job description</h2>
          <p className="mt-2 max-w-2xl whitespace-pre-line leading-relaxed text-slate-600">{job.description}</p>

          <h2 className="mt-8 font-display text-xl font-semibold text-harbor">Skills</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <li key={skill} className="rounded-full bg-white px-3 py-1 text-sm text-harbor ring-1 ring-slate-200">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Salary</dt>
                <dd className="font-display text-xl font-semibold tabular-nums text-harbor">{formatSalary(job.salaryMin, job.salaryMax)}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Job type</dt>
                <dd className="font-medium text-harbor">{job.type}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Location</dt>
                <dd className="font-medium text-harbor">{job.location}</dd>
              </div>
              {job.deadline && (
                <div>
                  <dt className="text-slate-500">Last date to apply</dt>
                  <dd className="font-medium text-harbor">{formatDate(job.deadline)}</dd>
                </div>
              )}
              <div>
                <dt className="text-slate-500">Posted</dt>
                <dd className="font-medium text-harbor">{formatDate(job.createdAt)}</dd>
              </div>
            </dl>

            <div className="mt-6 space-y-3">
              {isEmployer ? (
                <p className="rounded-md bg-mist px-3 py-2 text-sm text-slate-600">Employer account se apply nahi kar sakte.</p>
              ) : (
                <>
                  <Button className="w-full" onClick={handleApplyClick} disabled={hasApplied || isClosed}>
                    {isClosed ? "Job closed" : hasApplied ? "Applied" : "Apply now"}
                  </Button>
                  {!hasApplied && (
                    <Button className="w-full" variant="secondary" onClick={handleSave}>
                      {isSaved ? "Saved (hatane ke liye click karo)" : "Save job"}
                    </Button>
                  )}
                  {hasApplied && (
                    <Link to="/seeker/applications" className="block text-center text-sm text-lagoon hover:underline">
                      Tracker me dekho
                    </Link>
                  )}
                </>
              )}
            </div>
          </Card>
        </aside>
      </div>

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} job={job} user={user} onSubmit={handleApplySubmit} />
    </div>
  );
}
