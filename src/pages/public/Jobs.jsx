import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import useJobs from "@/hooks/useJobs";
import useDebounce from "@/hooks/useDebounce";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import EmptyState from "@/components/ui/EmptyState";

export default function Jobs() {
  const { user } = useAuth();
  const { jobs, applications, toggleSaveJob } = useJobs();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({ search: "", location: "", type: "", minSalary: "" });
  const search = useDebounce(filters.search, 300).trim().toLowerCase();

  const isSeeker = user?.role === "seeker";
  const isEmployer = user?.role === "employer";

  // Is seeker ki apni applications (saved/applied dekhne ke liye)
  const myApps = useMemo(() => (isSeeker ? applications.filter((a) => a.seekerId === user.id) : []), [applications, isSeeker, user]);
  const locations = useMemo(() => [...new Set(jobs.map((j) => j.location))].sort(), [jobs]);

  const filtered = useMemo(() => {
    return jobs
      .filter((j) => j.status === "open")
      .filter((j) => !search || (j.title + " " + j.company + " " + j.skills.join(" ")).toLowerCase().includes(search))
      .filter((j) => !filters.location || j.location === filters.location)
      .filter((j) => !filters.type || j.type === filters.type)
      .filter((j) => !filters.minSalary || j.salaryMax >= Number(filters.minSalary) * 100000)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [jobs, search, filters.location, filters.type, filters.minSalary]);

  const handleToggleSave = (job) => {
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
      <h1 className="font-display text-3xl font-bold text-harbor">Browse jobs</h1>
      <p className="mt-1 text-slate-600">{filtered.length} jobs mili</p>

      <div className="mt-6">
        <JobFilters filters={filters} onChange={setFilters} locations={locations} />
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState title="Koi job nahi mili" description="Search ya filters badal ke dobara try karo." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((job) => {
              const mine = myApps.find((a) => a.jobId === job.id);
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  isSaved={mine?.status === "saved"}
                  hasApplied={!!mine && mine.status !== "saved"}
                  onToggleSave={isEmployer ? undefined : () => handleToggleSave(job)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
