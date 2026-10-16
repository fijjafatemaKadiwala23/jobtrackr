// scaffold.mjs — JobTrackr ke saare folders + files ek saath bana deta hai
// Chalane ka tarika (project root me):  node scaffold.mjs
import { mkdirSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";

const created = [];

function w(path, content = "") {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content.trimStart() + "\n");
  created.push(path);
}

// ---------- stub generators ----------
const comp = (name, hint = "") => `
export default function ${name}() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">${name} ${hint}</p>
    </div>
  );
}
`;

const page = (name, title) => `
export default function ${name}() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">${title}</h1>
      <p className="mt-2 text-slate-600">TODO: ${name} screen yahan banao.</p>
    </div>
  );
}
`;

const js = (comment) => `// ${comment}\nexport {};\n`;

// =====================================================
// 1. CONFIG FILES
// =====================================================
w(
  "vite.config.js",
  `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
});
`,
);

w(
  "jsconfig.json",
  `
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
`,
);

w(
  "tailwind.config.js",
  `
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: { fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] } },
  },
  plugins: [],
};
`,
);

w(
  "postcss.config.js",
  `
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
`,
);

w(
  "src/index.css",
  `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-slate-50 font-sans text-slate-600;
}
`,
);

// default Vite ki bekaar files hata do
for (const f of ["src/App.css", "src/assets/react.svg"]) {
  if (existsSync(f)) rmSync(f);
}

// =====================================================
// 2. ENTRY: main.jsx + App.jsx
// =====================================================
w(
  "src/main.jsx",
  `
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
`,
);

w(
  "src/App.jsx",
  `
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import AppRoutes from "@/routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppRoutes />
        <Toaster position="top-right" />
      </DataProvider>
    </AuthProvider>
  );
}
`,
);

// =====================================================
// 3. UTILS
// =====================================================
w(
  "src/utils/constants.js",
  `
export const ROLES = { SEEKER: "seeker", EMPLOYER: "employer" };

export const STATUS = {
  SAVED: "saved",
  APPLIED: "applied",
  SHORTLISTED: "shortlisted",
  INTERVIEW: "interview",
  OFFER: "offer",
  REJECTED: "rejected",
};

export const SEEKER_COLUMNS = ["saved", "applied", "interview", "offer", "rejected"];
export const EMPLOYER_COLUMNS = ["applied", "shortlisted", "interview", "offer", "rejected"];

export const SEEKER_LABELS = {
  saved: "Saved", applied: "Applied", shortlisted: "Shortlisted",
  interview: "Interview", offer: "Offer", rejected: "Rejected",
};
export const EMPLOYER_LABELS = { ...SEEKER_LABELS, offer: "Hired" };

export const STATUS_STYLES = {
  saved: "bg-slate-100 text-slate-700",
  applied: "bg-blue-100 text-blue-700",
  shortlisted: "bg-purple-100 text-purple-700",
  interview: "bg-amber-100 text-amber-700",
  offer: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export const JOB_TYPES = ["Full-time", "Part-time", "Internship", "Remote"];

export const KEYS = {
  USERS: "jt_users",
  JOBS: "jt_jobs",
  APPLICATIONS: "jt_applications",
  SAVED: "jt_saved",
  SESSION: "jt_session",
  THEME: "jt_theme",
};
`,
);

w(
  "src/utils/helpers.js",
  `
export const generateId = (prefix = "id") =>
  prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-";

export const formatSalary = (min, max) =>
  "₹" + (min / 100000).toFixed(1) + "L - ₹" + (max / 100000).toFixed(1) + "L";
`,
);

// =====================================================
// 4. SERVICES (fake backend)
// =====================================================
w(
  "src/services/storage.js",
  `
export const getData = (key, fallback = []) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const setData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage error", e);
  }
};
`,
);
w(
  "src/services/authService.js",
  js("TODO Phase 2: signup, login, logout, getSession"),
);
w(
  "src/services/jobService.js",
  js("TODO Phase 2: getJobs, getJobById, createJob, updateJob, deleteJob"),
);
w(
  "src/services/applicationService.js",
  js("TODO Phase 3: apply, getBySeeker, getByJob, updateStatus, updateNotes"),
);

// =====================================================
// 5. SEED DATA
// =====================================================
w(
  "src/data/seed.js",
  `
// TODO Phase 1.2: 2 demo users + 12-15 jobs + 5-6 applications
// seeker@demo.com / 1234  |  employer@demo.com / 1234
export const seedUsers = [];
export const seedJobs = [];
export const seedApplications = [];
`,
);

// =====================================================
// 6. CONTEXT + HOOKS
// =====================================================
w(
  "src/context/AuthContext.jsx",
  `
import { createContext, useState } from "react";
import { getData, setData } from "@/services/storage";
import { KEYS } from "@/utils/constants";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getData(KEYS.SESSION, null));

  // TODO Phase 2: authService ke saath login/signup jodo
  const login = (userData) => {
    setUser(userData);
    setData(KEYS.SESSION, userData);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem(KEYS.SESSION);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
`,
);

w(
  "src/context/DataContext.jsx",
  `
import { createContext } from "react";

export const DataContext = createContext(null);

export function DataProvider({ children }) {
  // TODO Phase 2: jobs, applications, savedJobs state + actions (useReducer)
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
}
`,
);

w(
  "src/hooks/useAuth.js",
  `
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function useAuth() {
  return useContext(AuthContext);
}
`,
);
w(
  "src/hooks/useJobs.js",
  `
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";

export default function useJobs() {
  return useContext(DataContext);
}
`,
);
w(
  "src/hooks/useApplications.js",
  `
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";

export default function useApplications() {
  return useContext(DataContext);
}
`,
);
w(
  "src/hooks/useDebounce.js",
  `
import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
`,
);

// =====================================================
// 7. COMPONENTS
// =====================================================
// --- ui ---
w(
  "src/components/ui/Button.jsx",
  `
const VARIANTS = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "text-indigo-600 hover:bg-indigo-50",
};
const SIZES = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2", lg: "px-6 py-3" };

export default function Button({ variant = "primary", size = "md", loading = false, className = "", children, ...props }) {
  return (
    <button
      disabled={loading || props.disabled}
      className={"rounded-lg font-medium transition disabled:cursor-not-allowed disabled:opacity-50 " + VARIANTS[variant] + " " + SIZES[size] + " " + className}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
`,
);
w(
  "src/components/ui/Badge.jsx",
  `
import { STATUS_STYLES } from "@/utils/constants";

export default function Badge({ status, children }) {
  return (
    <span className={"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium " + (STATUS_STYLES[status] || "bg-slate-100 text-slate-700")}>
      {children || status}
    </span>
  );
}
`,
);
for (const n of [
  "Input",
  "Textarea",
  "Select",
  "Card",
  "Modal",
  "Spinner",
  "Skeleton",
  "EmptyState",
]) {
  w(`src/components/ui/${n}.jsx`, comp(n, "(ui)"));
}

// --- layout ---
w(
  "src/components/layout/PublicLayout.jsx",
  `
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
`,
);
w(
  "src/components/layout/DashboardLayout.jsx",
  `
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
`,
);
for (const n of ["Navbar", "Footer", "Sidebar", "Topbar"]) {
  w(`src/components/layout/${n}.jsx`, comp(n, "(layout)"));
}

// --- jobs ---
for (const n of ["JobCard", "JobFilters", "JobForm", "ApplyModal"]) {
  w(`src/components/jobs/${n}.jsx`, comp(n, "(jobs)"));
}
// --- seeker ---
for (const n of [
  "KanbanBoard",
  "ApplicationCard",
  "ApplicationDrawer",
  "StatsCard",
  "ReminderList",
]) {
  w(`src/components/seeker/${n}.jsx`, comp(n, "(seeker)"));
}
// --- employer ---
for (const n of ["PipelineBoard", "ApplicantRow", "CandidateDrawer"]) {
  w(`src/components/employer/${n}.jsx`, comp(n, "(employer)"));
}

// =====================================================
// 8. PAGES (screens)
// =====================================================
const publicPages = [
  ["Landing", "Landing Page"],
  ["Login", "Login"],
  ["Signup", "Signup"],
  ["Jobs", "Browse Jobs"],
  ["JobDetails", "Job Details"],
  ["NotFound", "404 - Page not found"],
];
const seekerPages = [
  ["SeekerDashboard", "Seeker Dashboard"],
  ["Applications", "My Applications (Kanban)"],
  ["SavedJobs", "Saved Jobs"],
  ["SeekerProfile", "My Profile"],
];
const employerPages = [
  ["EmployerDashboard", "Employer Dashboard"],
  ["MyJobs", "My Jobs"],
  ["PostJob", "Post a Job"],
  ["Applicants", "Applicants Pipeline"],
  ["Company", "Company Profile"],
];
publicPages.forEach(([n, t]) => w(`src/pages/public/${n}.jsx`, page(n, t)));
seekerPages.forEach(([n, t]) => w(`src/pages/seeker/${n}.jsx`, page(n, t)));
employerPages.forEach(([n, t]) => w(`src/pages/employer/${n}.jsx`, page(n, t)));

// =====================================================
// 9. ROUTES
// =====================================================
w(
  "src/routes/ProtectedRoute.jsx",
  `
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function ProtectedRoute({ allow = [] }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (allow.length && !allow.includes(user.role)) {
    return <Navigate to={"/" + user.role + "/dashboard"} replace />;
  }
  return <Outlet />;
}
`,
);

w(
  "src/routes/AppRoutes.jsx",
  `
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
          <Route path="/employer/jobs/:id/applicants" element={<Applicants />} />
          <Route path="/employer/company" element={<Company />} />
        </Route>
      </Route>
    </Routes>
  );
}
`,
);

// =====================================================
// DONE
// =====================================================
console.log("\n✅ " + created.length + " files ban gayi:\n");
created.forEach((f) => console.log("  + " + f));
console.log("\nAb chalao:  npm run dev\n");
