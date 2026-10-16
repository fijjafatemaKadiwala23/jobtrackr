import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import useJobs from "@/hooks/useJobs";
import JobForm from "@/components/jobs/JobForm";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";

// Ye page do kaam karta hai: /employer/jobs/new (nayi job) aur /employer/jobs/:id/edit (edit)
export default function PostJob() {
  const { id } = useParams();
  const { user } = useAuth();
  const { jobs, addJob, editJob } = useJobs();
  const navigate = useNavigate();

  const editing = Boolean(id);
  const job = editing ? jobs.find((j) => j.id === id && j.employerId === user.id) : null;

  if (editing && !job) {
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

  const handleSubmit = (values) => {
    if (editing) {
      editJob(id, values);
      toast.success("Job update ho gayi.");
    } else {
      const company = user.profile?.companyName || user.name;
      addJob({ ...values, employerId: user.id, company });
      toast.success("Job post ho gayi.");
    }
    navigate("/employer/jobs");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-harbor">{editing ? "Edit job" : "Post a job"}</h1>
      <p className="mt-1 text-slate-600">
        {editing ? "Details badlo aur save karo." : "Job post karte hi wo seekers ko Browse jobs me dikhne lagegi."}
      </p>

      <Card className="mt-6">
        <JobForm
          key={job?.id || "new"}
          initial={job}
          submitLabel={editing ? "Save changes" : "Post job"}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/employer/jobs")}
        />
      </Card>
    </div>
  );
}
