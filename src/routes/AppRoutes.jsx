import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicLayout from "@/components/layout/PublicLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

// public
import Landing from "@/pages/public/Landing";
import Login from "@/pages/public/Login";
import Signup from "@/pages/public/Signup";
import Jobs from "@/pages/public/Jobs";
import JobDetails from "@/pages/public/JobDetails";
import NotFound from "@/pages/public/NotFound";
// seeker
import SeekerDashboard from "@/pages/seeker/SeekerDashboard";
import Applications from "@/pages/seeker/Applications";
import SavedJobs from "@/pages/seeker/SavedJobs";
import SeekerProfile from "@/pages/seeker/SeekerProfile";
// employer
import EmployerDashboard from "@/pages/employer/EmployerDashboard";
import MyJobs from "@/pages/employer/MyJobs";
import PostJob from "@/pages/employer/PostJob";
import Applicants from "@/pages/employer/Applicants";
import Company from "@/pages/employer/Company";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Seeker only */}
      <Route element={<ProtectedRoute allow={["seeker"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
          <Route path="/seeker/applications" element={<Applications />} />
          <Route path="/seeker/saved" element={<SavedJobs />} />
          <Route path="/seeker/profile" element={<SeekerProfile />} />
        </Route>
      </Route>

      {/* Employer only */}
      <Route element={<ProtectedRoute allow={["employer"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/jobs" element={<MyJobs />} />
          <Route path="/employer/jobs/new" element={<PostJob />} />
          <Route path="/employer/jobs/:id/edit" element={<PostJob />} />
          <Route path="/employer/jobs/:id/applicants" element={<Applicants />} />
          <Route path="/employer/company" element={<Company />} />
        </Route>
      </Route>
    </Routes>
  );
}
