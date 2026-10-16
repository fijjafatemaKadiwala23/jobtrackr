# ARCHITECTURE.md — JobTrackr ka Technical Blueprint

> **Architecture kya hota hai?** Ghar banane se pehle naksha (blueprint) chahiye na? Wahi ye file hai. Isme likha hai ki **kaunsi technology use hogi, folders kaise honge, data kaise flow karega, aur code kahan likhna hai.**
> PRD = *kya banana hai* | ARCHITECTURE = *kaise banana hai*

---

## 1. Tech Stack (Kya-kya use karenge)

| Cheez | Tool | Kyun? |
|-------|------|-------|
| UI Library | **React JS (v18+)** | Component-based, job me sabse zyada demand |
| Build Tool | **Vite** | CRA se bahut fast, setup easy |
| Styling | **Tailwind CSS** | Class likho, CSS file ka jhanjhat nahi |
| Routing | **React Router v6** | Multiple pages + protected routes |
| State | **Context API + useReducer** | Chhota project, Redux ki zarurat nahi |
| Data Storage | **localStorage** | Backend nahi hai, refresh pe data na jaye |
| Icons | **lucide-react** | Clean, lightweight icons |
| Toast | **react-hot-toast** | Success/error messages |
| Drag & Drop | **@hello-pangea/dnd** (Phase 2) | Kanban ke liye. Pehle dropdown se chalao |
| Form | Normal controlled inputs | Simple rakho, extra library nahi |
| Deploy | **Vercel / Netlify** | Free hosting |

> **Rule:** Jo library zaruri nahi, wo mat jodo. Project halka rakho.

---

## 2. Big Picture (Poora system ek nazar me)

```
┌─────────────────────────────────────────────────┐
│                  BROWSER (React)                │
│                                                 │
│  Pages ──► Components ──► Hooks ──► Context     │
│                                       │         │
│                                       ▼         │
│                              Service Layer      │
│                          (mock API functions)   │
│                                       │         │
│                                       ▼         │
│                               localStorage      │
└─────────────────────────────────────────────────┘
        (Future me: Service Layer ──► Real Backend)
```

**Sabse important idea:** UI kabhi directly localStorage ko nahi chhuyegi. Beech me **Service Layer** hogi. Isse baad me backend jodna ho to sirf service files badlenge, UI wahi rahegi.

---

## 3. Folder Structure

```
jobtrackr/
├── public/
├── src/
│   ├── assets/              # images, logo
│   ├── components/
│   │   ├── ui/              # Button, Input, Modal, Badge, Card, Spinner, EmptyState
│   │   ├── layout/          # Navbar, Sidebar, Footer, DashboardLayout, PublicLayout
│   │   ├── jobs/            # JobCard, JobFilters, JobForm, ApplyModal
│   │   ├── seeker/          # KanbanBoard, ApplicationCard, StatsCard, ReminderList
│   │   └── employer/        # ApplicantRow, PipelineBoard, CandidateDrawer
│   ├── pages/
│   │   ├── public/          # Landing, Login, Signup, Jobs, JobDetails, NotFound
│   │   ├── seeker/          # Dashboard, Applications, Saved, Profile
│   │   └── employer/        # Dashboard, MyJobs, PostJob, Applicants, Company
│   ├── context/
│   │   ├── AuthContext.jsx  # logged-in user + role
│   │   └── DataContext.jsx  # jobs, applications, saved jobs
│   ├── services/
│   │   ├── storage.js       # localStorage get/set helper
│   │   ├── authService.js   # login, signup, logout
│   │   ├── jobService.js    # getJobs, createJob, updateJob, deleteJob
│   │   └── applicationService.js  # apply, updateStatus, addNote
│   ├── hooks/               # useAuth, useJobs, useApplications, useDebounce
│   ├── routes/
│   │   ├── AppRoutes.jsx    # saare routes ek jagah
│   │   └── ProtectedRoute.jsx
│   ├── data/
│   │   └── seed.js          # starting mock jobs & users
│   ├── utils/
│   │   ├── constants.js     # STATUS, ROLES, JOB_TYPES
│   │   └── helpers.js       # formatDate, generateId, etc.
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            # sirf Tailwind directives
├── tailwind.config.js
├── vite.config.js
└── package.json
```

**Folder ka matlab simple me:**
- `components/` = chhote reusable tukde (Lego blocks)
- `pages/` = poori screen (blocks jod ke bani)
- `services/` = data ka kaam (save, fetch)
- `context/` = global data jo har page ko chahiye
- `hooks/` = reusable logic

---

## 4. Routing & Role Protection

```jsx
// AppRoutes.jsx (idea)
<Routes>
  {/* Public */}
  <Route path="/" element={<Landing />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/jobs" element={<Jobs />} />
  <Route path="/jobs/:id" element={<JobDetails />} />

  {/* Seeker only */}
  <Route element={<ProtectedRoute allow={['seeker']} />}>
    <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
    <Route path="/seeker/applications" element={<Applications />} />
    <Route path="/seeker/saved" element={<Saved />} />
    <Route path="/seeker/profile" element={<SeekerProfile />} />
  </Route>

  {/* Employer only */}
  <Route element={<ProtectedRoute allow={['employer']} />}>
    <Route path="/employer/dashboard" element={<EmployerDashboard />} />
    <Route path="/employer/jobs" element={<MyJobs />} />
    <Route path="/employer/jobs/new" element={<PostJob />} />
    <Route path="/employer/jobs/:id/applicants" element={<Applicants />} />
    <Route path="/employer/company" element={<Company />} />
  </Route>

  <Route path="*" element={<NotFound />} />
</Routes>
```

**ProtectedRoute ka logic:**
1. User login nahi hai → `/login` pe bhejo
2. User login hai par role galat hai (seeker `/employer/...` kholne ki koshish kare) → apne dashboard pe bhejo
3. Sab theek → page dikhao (`<Outlet />`)

---

## 5. Data Models (Data kaisa dikhega)

### User
```js
{
  id: "u_101",
  name: "Rahul Sharma",
  email: "rahul@mail.com",
  password: "1234",            // sirf mock, real me kabhi plain nahi
  role: "seeker",              // "seeker" | "employer"
  profile: {
    skills: ["React", "Tailwind"],
    experience: "Fresher",
    resumeLink: "https://...",
    // employer ke liye: companyName, website, about, logo
  }
}
```

### Job
```js
{
  id: "j_201",
  employerId: "u_102",
  title: "React Developer",
  company: "TechNova",
  location: "Ahmedabad",
  type: "Full-time",           // Full-time | Part-time | Internship | Remote
  salaryMin: 300000,
  salaryMax: 600000,
  skills: ["React", "JS"],
  description: "...",
  deadline: "2026-12-31",
  status: "open",              // open | closed
  createdAt: "2026-10-13"
}
```

### Application (SABSE IMPORTANT — dono side yahi use karte hain)
```js
{
  id: "a_301",
  jobId: "j_201",              // null agar manual external application ho
  seekerId: "u_101",
  // manual jobs ke liye:
  external: { title: "", company: "", link: "" },
  status: "applied",           // seeker/employer dono isi ko dekhte hain
  coverNote: "...",
  resumeLink: "...",
  seekerNotes: "HR ka naam: Neha",       // sirf seeker ko dikhega
  employerNotes: "Good communication",   // sirf employer ko dikhega
  interviewDate: "2026-10-20",
  reminderDate: "2026-10-18",
  history: [
    { status: "applied", at: "2026-10-13" }
  ],
  createdAt: "2026-10-13"
}
```

### SavedJob
```js
{ id: "s_1", seekerId: "u_101", jobId: "j_201" }
```

---

## 6. Status System (Dono side ka sync)

**Ek hi `status` field, alag-alag labels.**

```js
// utils/constants.js
export const STATUS = {
  SAVED: "saved",
  APPLIED: "applied",
  SHORTLISTED: "shortlisted",
  INTERVIEW: "interview",
  OFFER: "offer",       // employer ke liye "Hired"
  REJECTED: "rejected",
};

// Seeker Kanban columns
export const SEEKER_COLUMNS = ["saved", "applied", "interview", "offer", "rejected"];

// Employer pipeline columns
export const EMPLOYER_COLUMNS = ["applied", "shortlisted", "interview", "offer", "rejected"];

// Label mapping
export const EMPLOYER_LABELS = { offer: "Hired" };
export const SEEKER_LABELS   = { offer: "Offer" };
```

**Matlab:** Employer "Hired" karega → database me `offer` save hoga → seeker ko "Offer 🎉" dikhega. Shortlisted candidate seeker ke "Applied" column me rahega par uspe **"Shortlisted" badge** dikhega.

---

## 7. State Management

### AuthContext
```
state: { user, isAuthenticated }
actions: login(email, pass), signup(data), logout()
```

### DataContext
```
state: { jobs[], applications[], savedJobs[] }
actions:
  addJob / updateJob / deleteJob
  applyToJob / addExternalApplication
  updateApplicationStatus / updateNotes
  toggleSaveJob
```

**Flow (example: Apply button click):**
```
ApplyModal submit
  → useApplications().apply(data)
    → DataContext dispatch
      → applicationService.apply()  (localStorage me save)
        → state update
          → Kanban board auto re-render ✅
```

---

## 8. Service Layer (Fake Backend)

```js
// services/storage.js
export const getData = (key, fallback = []) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
export const setData = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

// services/jobService.js
import { getData, setData } from "./storage";
const KEY = "jt_jobs";

export const getJobs = () => getData(KEY);
export const createJob = (job) => {
  const jobs = getJobs();
  const newJob = { ...job, id: `j_${Date.now()}`, createdAt: new Date().toISOString() };
  setData(KEY, [newJob, ...jobs]);
  return newJob;
};
```

**localStorage keys:** `jt_users`, `jt_jobs`, `jt_applications`, `jt_saved`, `jt_session`, `jt_theme`

**Pehli baar app khule:** agar `jt_jobs` khali hai to `seed.js` se 10-15 mock jobs + 2 demo users bhar do.

**Demo accounts (README me likhna):**
- Seeker: `seeker@demo.com` / `1234`
- Employer: `employer@demo.com` / `1234`

---

## 9. Component Architecture

```
App
└── AuthProvider
    └── DataProvider
        └── AppRoutes
            ├── PublicLayout (Navbar + Footer)
            │   └── Landing / Login / Signup / Jobs / JobDetails
            └── DashboardLayout (Sidebar + Topbar)
                ├── Seeker pages
                └── Employer pages
```

**Component rules:**
- **Dumb (UI) components:** sirf props lete hain, dikhate hain (Button, Badge, JobCard)
- **Smart (page) components:** hooks se data lete hain, dumb components ko pass karte hain

---

## 10. Performance & Quality

- `React.lazy` + `Suspense` se pages ko lazy-load karo
- Search input pe `useDebounce` (300ms)
- Lists me hamesha stable `key={id}` do (index mat do)
- Images ko `loading="lazy"`
- Har list ke liye **loading state, empty state, error state** banao

---

## 11. Future Backend Plan (Abhi nahi, sirf soch)

| Abhi | Baad me |
|------|---------|
| localStorage | MongoDB / PostgreSQL / Supabase |
| Fake auth | JWT / Firebase Auth |
| services/*.js (localStorage) | services/*.js (axios → REST API) |
| Mock seed data | Real database |

> Kyunki hum Service Layer use kar rahe hain, UI code **zero ya bahut kam** badlega.
