import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import useJobs from "@/hooks/useJobs";
import ApplicantRow from "@/components/employer/ApplicantRow";
import StatsCard from "@/components/seeker/StatsCard";
import Card from "@/components/ui/Card";
import { EMPLOYER_LABELS } from "@/utils/constants";

export default function EmployerDashboard() {
  const { user } = useAuth();
  const { jobs, applications, updateApplicationStatus } = useJobs();
  const navigate = useNavigate();
  const [showAllJobs, setShowAllJobs] = useState(false);

  const myJobs = useMemo(() => jobs.filter((j) => j.employerId === user.id), [jobs, user.id]);
  const myJobIds = useMemo(() => new Set(myJobs.map((j) => j.id)), [myJobs]);
  const applicants = useMemo(
    () => applications.filter((a) => myJobIds.has(a.jobId) && a.status !== "saved"),
    [applications, myJobIds]
  );
  const recent = useMemo(() => [...applicants].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5), [applicants]);

  const count = (status) => applicants.filter((a) => a.status === status).length;
  const countFor = (jobId) => applicants.filter((a) => a.jobId === jobId).length;
  const jobTitle = (jobId) => myJobs.find((j) => j.id === jobId)?.title || "";
  const visibleJobs = showAllJobs ? myJobs : myJobs.slice(0, 4);

  const handleStatus = (id, status) => {
    updateApplicationStatus(id, status);
    toast.success("Status: " + EMPLOYER_LABELS[status]);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-harbor">Hi, {user.name.split(" ")[0]}</h1>
        <p className="mt-1 text-slate-600">Aapki hiring ka haal.</p>
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Stats">
        <StatsCard label="Open jobs" value={myJobs.filter((j) => j.status === "open").length} accent="bg-lagoon" />
        <StatsCard label="Total applicants" value={applicants.length} accent="bg-slate-400" />
        <StatsCard label="In interview" value={count("interview")} accent="bg-marigold" />
        <StatsCard label="Hired" value={count("offer")} accent="bg-pine" />
      </section>

      <Card className="!p-0">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6">
          <h2 className="font-display text-lg font-semibold text-harbor">Recent applicants</h2>
        </div>
        {recent.length === 0 ? (
          <p className="px-4 pb-6 text-sm text-slate-500 sm:px-6">Abhi tak kisi ne apply nahi kiya.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th scope="col" className="px-4 py-2 font-medium">Candidate</th>
                  <th scope="col" className="px-4 py-2 font-medium">Job</th>
                  <th scope="col" className="px-4 py-2 font-medium">Applied</th>
                  <th scope="col" className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((application) => (
                  <ApplicantRow
                    key={application.id}
                    application={application}
                    showJob
                    jobTitle={jobTitle(application.jobId)}
                    onOpen={(app) => navigate("/employer/jobs/" + app.jobId + "/applicants")}
                    onStatusChange={handleStatus}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-harbor">Aapki jobs</h2>
          <Link to="/employer/jobs/new" className="text-sm text-lagoon hover:underline">
            Nayi job post karo
          </Link>
        </div>
        {myJobs.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">Abhi koi job post nahi ki.</p>
        ) : (
          <>
            <ul className="mt-3 divide-y divide-slate-100">
              {visibleJobs.map((job) => (
                <li key={job.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-harbor">{job.title}</p>
                    <p className="text-xs text-slate-500">{job.status === "open" ? "Open" : "Closed"}</p>
                  </div>
                  <Link to={"/employer/jobs/" + job.id + "/applicants"} className="shrink-0 text-sm text-lagoon hover:underline">
                    {countFor(job.id)} applicants
                  </Link>
                </li>
              ))}
            </ul>
            {myJobs.length > 4 && (
              <button type="button" onClick={() => setShowAllJobs((prev) => !prev)} className="mt-2 text-sm text-lagoon hover:underline">
                {showAllJobs ? "Kam dikhao" : "Sab dikhao"}
              </button>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
