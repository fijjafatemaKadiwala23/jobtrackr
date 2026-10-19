# TASKS.md — JobTrackr ka Step-by-Step Kaam ki List

> **Kaise use karein?**
>
> 1. Upar se neeche **order me** tasks karo (order important hai, kyunki aage ka kaam pichhle par depend karta hai).
> 2. Ek time pe **ek hi task**. Khatam hone par `[ ]` ko `[x]` banao.
> 3. Har phase ke end me **Checkpoint** test karo, tabhi agle phase me jao.
> 4. Har kaam ke baad `MEMORY.md` ka _Current Status_ update karo.
>
> **Legend:** 🔴 Must | 🟡 Should | 🟢 Could | ⏱ Andaza time

**Total time andaza:** 3–4 hafte (roz 2–3 ghante)

---

## PHASE 0 — Planning ✅

- [x] PRD.md likhi
- [x] ARCHITECTURE.md likhi
- [x] DESIGN.md likhi
- [x] RULES.md likhi
- [x] MEMORY.md likhi
- [x] TASKS.md likhi

---

## PHASE 1 — Setup & Foundation ⏱ 2–3 din

### 1.1 Project Setup 🔴

- [x] `npm create vite@latest jobtrackr -- --template react`
- [x] `cd jobtrackr && npm install`
- [x] Tailwind CSS install + `tailwind.config.js` + `index.css` me directives (DESIGN.md §5)
- [x] Packages: `npm i react-router-dom lucide-react react-hot-toast`
- [x] Inter font `index.html` me add karo
- [x] `@` alias set karo (`vite.config.js`)
- [x] ARCHITECTURE.md ke hisaab se saare folders banao
- [x] Git init + pehla commit + GitHub pe push
- **Done jab:** `npm run dev` pe Tailwind class (`bg-indigo-600`) kaam kare

### 1.2 Constants, Helpers, Seed Data 🔴

- [x] `utils/constants.js` (STATUS, ROLES, JOB_TYPES, columns, labels)
- [x] `utils/helpers.js` (`generateId`, `formatDate`, `formatSalary`)
- [x] `services/storage.js` (`getData`, `setData` with try/catch)
- [x] `data/seed.js` — 2 demo users + 12–15 realistic jobs + 5–6 sample applications
- [x] App pehli baar khule to seed load ho (jab `jt_jobs` khali ho)

### 1.3 Reusable UI Components 🔴

- [x] `Button` (primary/secondary/danger/ghost, sizes, loading)
- [x] `Input` + `Textarea` + `Select` (label + error)
- [x] `Card`
- [x] `Badge` (status colors DESIGN.md se)
- [x] `Modal`
- [x] `Spinner`, `Skeleton`
- [x] `EmptyState`
- [x] `Toaster` setup (react-hot-toast)

### 1.4 Layouts & Routing 🔴

- [x] `Navbar` (public) responsive + hamburger
- [x] `Footer`
- [x] `PublicLayout`
- [x] `Sidebar` + `Topbar` + `DashboardLayout` (role ke hisaab se menu)
- [x] `AppRoutes.jsx` me saare routes (dummy pages ke saath)
- [x] `NotFound` page

> ✅ **Checkpoint 1:** Saare routes khulte hain, layouts sahi dikhte hain, mobile pe navbar/sidebar chalta hai.

---

## PHASE 2 — Auth & Public Pages ⏱ 3–4 din

### 2.1 Auth System 🔴

- [x] `authService.js` (signup, login, logout, getSession)
- [x] `AuthContext` + `useAuth` hook
- [x] `ProtectedRoute` (login check + role check)
- [x] **Login page** (form + validation + demo credentials hint)
- [x] **Signup page** (role selector cards + validation)
- [x] Login ke baad role ke hisaab se redirect (`/seeker/dashboard` ya `/employer/dashboard`)
- [x] Logout button (navbar/sidebar me)
- [x] Refresh karne par login bana rahe (`jt_session`)
- **Acceptance:** Seeker `/employer/jobs` khole to apne dashboard pe redirect ho

### 2.2 Landing Page 🔴

- [x] Hero + 2 CTA buttons
- [x] Features section (3 cards)
- [x] How it works (3 steps)
- [x] Stats strip + Footer

### 2.3 Data Layer 🔴

- [x] `jobService.js` (getJobs, getJobById, createJob, updateJob, deleteJob)
- [x] `applicationService.js` (apply, getBySeeker, getByJob, updateStatus, updateNotes)
- [x] `DataContext` + `useJobs`, `useApplications` hooks

### 2.4 Browse Jobs (Public) 🔴

- [x] `JobCard` component
- [x] **Jobs page** — grid + loading skeleton
- [x] Search by title/company (`useDebounce` 300ms)
- [x] Filters: location, job type, salary range
- [x] Empty state ("No jobs found")
- [x] **JobDetails page** — description + sticky apply card

> ✅ **Checkpoint 2:** Signup → Login → Jobs browse/search/filter kaam kare. Refresh pe session bacha rahe.

---

## PHASE 3 — Job Seeker Side ⏱ 5–6 din

### 3.1 Apply Flow 🔴

- [x] `ApplyModal` (name, resume link, cover note + validation)
- [x] Apply submit → application create (`status: applied`, history entry)
- [x] Already applied check → button "Applied ✓" (disabled)
- [x] Success toast
- [x] Login na ho to Apply click par login page pe bhejo

### 3.2 Save Job 🟡

- [ ] Save/unsave toggle (JobCard + JobDetails)
- [ ] **Saved Jobs page** (list + remove + "Apply" button)
- [ ] Saved job tracker ke "Saved" column me bhi dikhe

### 3.3 Application Tracker (Kanban) 🔴

- [x] `KanbanBoard` (5 columns, horizontal scroll, count badge)
- [x] `ApplicationCard`
- [x] Status change **dropdown se** (`updateApplicationStatus`)
- [x] Status change par `history` update
- [x] Application detail drawer/modal
- [x] Mobile pe columns → tabs ya stack
- [x] Empty state har column ke liye

### 3.4 Notes, Dates, Reminders 🟡

- [x] Seeker notes (HR name, salary, feedback)
- [x] Interview date picker
- [x] Reminder date + "Upcoming" list
- [x] **Manual application add** (external job: title, company, link)

### 3.5 Seeker Dashboard 🔴

- [x] 4 stats cards (Applied, Interviews, Offers, Rejected)
- [x] Upcoming interviews / reminders list
- [x] Recent applications list

### 3.6 Seeker Profile 🟡

- [x] Name, skills (chips), experience, resume link — edit + save

> ✅ **Checkpoint 3:** Seeker poora flow kar sake: Browse → Save → Apply → Tracker me status badle → Notes likhe → Refresh pe sab bacha rahe.

---

## PHASE 4 — Employer Side ⏱ 5–6 din

### 4.1 Post & Manage Jobs 🔴

- [x] **PostJob page** (form: title, description, location, type, salary, skills chips, deadline) + validation
- [x] Job create hote hi seeker ke Browse Jobs me dikhe
- [x] **MyJobs page** (table: title, applicants count, status, actions)
- [x] Edit job (same form, prefilled)
- [x] Close / Reopen job (closed job pe Apply disabled)
- [x] Delete job (confirm modal)x

### 4.2 Applicants & Pipeline 🔴

- [x] **Applicants page** (job ke saare applicants)
- [x] `PipelineBoard` (Applied | Shortlisted | Interview | Hired | Rejected)
- [x] `CandidateDrawer` (details, resume link, cover note)
- [x] Status change (dropdown) → seeker ke tracker me **sync** ho
- [x] Employer notes (seeker ko nahi dikhne chahiye)
- [x] Status labels mapping (offer → "Hired")

### 4.3 Employer Dashboard & Company 🔴

- [x] Stats: Open Jobs, Total Applicants, Interviews, Hired
- [x] Recent applicants table
- [x] **Company Profile** page (name, about, website, location)

> ✅ **Checkpoint 4 (Sabse important test):**
>
> 1. Employer login → job post karo
> 2. Logout → Seeker login → us job pe apply karo
> 3. Logout → Employer login → applicant ko "Shortlisted" → "Interview" karo
> 4. Logout → Seeker login → tracker me status **Interview** dikhe ✅

---

## PHASE 5 — Polish & Upgrades ⏱ 3–4 din

### 5.1 UX Polish 🟡

- [x] Drag & drop Kanban (`@hello-pangea/dnd`) — seeker + employer dono
- [x] Skeleton loaders har list pe
- [x] Page transitions / hover animations (halke)
- [x] Confirm modals har delete pe
- [ ] Form errors consistent

### 5.2 Extra Features 🟢

- [x] Dark mode toggle (`jt_theme`)
- [ ] Pagination ya "Load more" Jobs page pe
- [ ] Sort (newest, salary)
- [ ] Export applications as CSV
- [ ] Application timeline (history) UI

### 5.3 Quality 🔴

- [x] Mobile (360px) pe har page check
- [x] Tablet + desktop check
- [x] Accessibility checklist (DESIGN.md §11)
- [x] `React.lazy` se pages lazy-load
- [x] Console warnings/errors saaf
- [x] Lighthouse run (Perf 85+, A11y 90+)
- [x] Unused code/imports hatao

---

## PHASE 6 — Launch 🚀 ⏱ 1–2 din

- [x] Professional **README.md** (screenshots, features, tech stack, demo credentials, setup steps)
- [x] Demo GIF/video record karo
- [x] Vercel/Netlify pe deploy
- [x] Live link README + GitHub repo description me daalo
- [x] LinkedIn post + Resume me project add karo
- [x] MEMORY.md ka "Interview Talking Points" practice karo

---

## PHASE 7 — Future (Backend, abhi nahi) 💭

- [ ] Node.js + Express + MongoDB/Supabase backend
- [ ] JWT / Firebase real authentication
- [ ] Services ko API calls (axios) se replace karna
- [ ] Email notifications
- [ ] Resume file upload
- [ ] Employer ke liye analytics charts
- [ ] TypeScript migration

---

## 📊 Progress Tracker

| Phase             | Status     | Progress |
| ----------------- | ---------- | -------- |
| 0 — Planning      | ✅ Done    | 6/6      |
| 1 — Setup         | ✅ Done    | 6/6      |
| 2 — Auth & Public | ✅ Done    | 6/6      |
| 3 — Seeker        | ✅ Done    | 6/6      |
| 4 — Employer      | ✅ Done    | 6/6      |
| 5 — Polish        | ✅ Done    | 6/6      |
| 6 — Launch        | ⬜ Pending | 0/?      |
