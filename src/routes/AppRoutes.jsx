import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicLayout from "@/components/layout/PublicLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageTransition from "@/components/ui/PageTransition";

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
        <Route
          path="/"
          element={
            <PageTransition>
              <Landing />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          }
        />
        <Route
          path="/jobs"
          element={
            <PageTransition>
              <Jobs />
            </PageTransition>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <PageTransition>
              <JobDetails />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Route>

      {/* Seeker only */}
      <Route element={<ProtectedRoute allow={["seeker"]} />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/seeker/dashboard"
            element={
              <PageTransition>
                <SeekerDashboard />
              </PageTransition>
            }
          />
          <Route
            path="/seeker/applications"
            element={
              <PageTransition>
                <Applications />
              </PageTransition>
            }
          />
          <Route
            path="/seeker/saved"
            element={
              <PageTransition>
                <SavedJobs />
              </PageTransition>
            }
          />
          <Route
            path="/seeker/profile"
            element={
              <PageTransition>
                <SeekerProfile />
              </PageTransition>
            }
          />
        </Route>
      </Route>

      {/* Employer only */}
      <Route element={<ProtectedRoute allow={["employer"]} />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/employer/dashboard"
            element={
              <PageTransition>
                <EmployerDashboard />
              </PageTransition>
            }
          />
          <Route
            path="/employer/jobs"
            element={
              <PageTransition>
                <MyJobs />
              </PageTransition>
            }
          />
          <Route
            path="/employer/jobs/new"
            element={
              <PageTransition>
                <PostJob />
              </PageTransition>
            }
          />
          <Route
            path="/employer/jobs/:id/edit"
            element={
              <PageTransition>
                <PostJob />
              </PageTransition>
            }
          />
          <Route
            path="/employer/jobs/:id/applicants"
            element={
              <PageTransition>
                <Applicants />
              </PageTransition>
            }
          />
          <Route
            path="/employer/company"
            element={
              <PageTransition>
                <Company />
              </PageTransition>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
