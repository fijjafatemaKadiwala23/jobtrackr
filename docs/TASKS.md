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

- [ ] `authService.js` (signup, login, logout, getSession)
- [ ] `AuthContext` + `useAuth` hook
- [ ] `ProtectedRoute` (login check + role check)
- [ ] **Login page** (form + validation + demo credentials hint)
- [ ] **Signup page** (role selector cards + validation)
- [ ] Login ke baad role ke hisaab se redirect (`/seeker/dashboard` ya `/employer/dashboard`)
- [ ] Logout button (navbar/sidebar me)
- [ ] Refresh karne par login bana rahe (`jt_session`)
- **Acceptance:** Seeker `/employer/jobs` khole to apne dashboard pe redirect ho

### 2.2 Landing Page 🔴

- [ ] Hero + 2 CTA buttons
- [ ] Features section (3 cards)
- [ ] How it works (3 steps)
- [ ] Stats strip + Footer

### 2.3 Data Layer 🔴

- [ ] `jobService.js` (getJobs, getJobById, createJob, updateJob, deleteJob)
- [ ] `applicationService.js` (apply, getBySeeker, getByJob, updateStatus, updateNotes)
- [ ] `DataContext` + `useJobs`, `useApplications` hooks

### 2.4 Browse Jobs (Public) 🔴

- [ ] `JobCard` component
- [ ] **Jobs page** — grid + loading skeleton
- [ ] Search by title/company (`useDebounce` 300ms)
- [ ] Filters: location, job type, salary range
- [ ] Empty state ("No jobs found")
- [ ] **JobDetails page** — description + sticky apply card

> ✅ **Checkpoint 2:** Signup → Login → Jobs browse/search/filter kaam kare. Refresh pe session bacha rahe.

---

## PHASE 3 — Job Seeker Side ⏱ 5–6 din

### 3.1 Apply Flow 🔴

- [ ] `ApplyModal` (name, resume link, cover note + validation)
- [ ] Apply submit → application create (`status: applied`, history entry)
- [ ] Already applied check → button "Applied ✓" (disabled)
- [ ] Success toast
- [ ] Login na ho to Apply click par login page pe bhejo

### 3.2 Save Job 🟡

- [ ] Save/unsave toggle (JobCard + JobDetails)
- [ ] **Saved Jobs page** (list + remove + "Apply" button)
- [ ] Saved job tracker ke "Saved" column me bhi dikhe

### 3.3 Application Tracker (Kanban) 🔴

- [ ] `KanbanBoard` (5 columns, horizontal scroll, count badge)
- [ ] `ApplicationCard`
- [ ] Status change **dropdown se** (`updateApplicationStatus`)
- [ ] Status change par `history` update
- [ ] Application detail drawer/modal
- [ ] Mobile pe columns → tabs ya stack
- [ ] Empty state har column ke liye

### 3.4 Notes, Dates, Reminders 🟡

- [ ] Seeker notes (HR name, salary, feedback)
- [ ] Interview date picker
- [ ] Reminder date + "Upcoming" list
- [ ] **Manual application add** (external job: title, company, link)

### 3.5 Seeker Dashboard 🔴

- [ ] 4 stats cards (Applied, Interviews, Offers, Rejected)
- [ ] Upcoming interviews / reminders list
- [ ] Recent applications list

### 3.6 Seeker Profile 🟡

- [ ] Name, skills (chips), experience, resume link — edit + save

> ✅ **Checkpoint 3:** Seeker poora flow kar sake: Browse → Save → Apply → Tracker me status badle → Notes likhe → Refresh pe sab bacha rahe.

---

## PHASE 4 — Employer Side ⏱ 5–6 din

### 4.1 Post & Manage Jobs 🔴

- [ ] **PostJob page** (form: title, description, location, type, salary, skills chips, deadline) + validation
- [ ] Job create hote hi seeker ke Browse Jobs me dikhe
- [ ] **MyJobs page** (table: title, applicants count, status, actions)
- [ ] Edit job (same form, prefilled)
- [ ] Close / Reopen job (closed job pe Apply disabled)
- [ ] Delete job (confirm modal)

### 4.2 Applicants & Pipeline 🔴

- [ ] **Applicants page** (job ke saare applicants)
- [ ] `PipelineBoard` (Applied | Shortlisted | Interview | Hired | Rejected)
- [ ] `CandidateDrawer` (details, resume link, cover note)
- [ ] Status change (dropdown) → seeker ke tracker me **sync** ho
- [ ] Employer notes (seeker ko nahi dikhne chahiye)
- [ ] Status labels mapping (offer → "Hired")

### 4.3 Employer Dashboard & Company 🔴

- [ ] Stats: Open Jobs, Total Applicants, Interviews, Hired
- [ ] Recent applicants table
- [ ] **Company Profile** page (name, about, website, location)

> ✅ **Checkpoint 4 (Sabse important test):**
>
> 1. Employer login → job post karo
> 2. Logout → Seeker login → us job pe apply karo
> 3. Logout → Employer login → applicant ko "Shortlisted" → "Interview" karo
> 4. Logout → Seeker login → tracker me status **Interview** dikhe ✅

---

## PHASE 5 — Polish & Upgrades ⏱ 3–4 din

### 5.1 UX Polish 🟡

- [ ] Drag & drop Kanban (`@hello-pangea/dnd`) — seeker + employer dono
- [ ] Skeleton loaders har list pe
- [ ] Page transitions / hover animations (halke)
- [ ] Confirm modals har delete pe
- [ ] Form errors consistent

### 5.2 Extra Features 🟢

- [ ] Dark mode toggle (`jt_theme`)
- [ ] Pagination ya "Load more" Jobs page pe
- [ ] Sort (newest, salary)
- [ ] Export applications as CSV
- [ ] Application timeline (history) UI

### 5.3 Quality 🔴

- [ ] Mobile (360px) pe har page check
- [ ] Tablet + desktop check
- [ ] Accessibility checklist (DESIGN.md §11)
- [ ] `React.lazy` se pages lazy-load
- [ ] Console warnings/errors saaf
- [ ] Lighthouse run (Perf 85+, A11y 90+)
- [ ] Unused code/imports hatao

---

## PHASE 6 — Launch 🚀 ⏱ 1–2 din

- [ ] Professional **README.md** (screenshots, features, tech stack, demo credentials, setup steps)
- [ ] Demo GIF/video record karo
- [ ] Vercel/Netlify pe deploy
- [ ] Live link README + GitHub repo description me daalo
- [ ] LinkedIn post + Resume me project add karo
- [ ] MEMORY.md ka "Interview Talking Points" practice karo

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
| 1 — Setup         | ⬜ Pending | 0/?      |
| 2 — Auth & Public | ⬜ Pending | 0/?      |
| 3 — Seeker        | ⬜ Pending | 0/?      |
| 4 — Employer      | ⬜ Pending | 0/?      |
| 5 — Polish        | ⬜ Pending | 0/?      |
| 6 — Launch        | ⬜ Pending | 0/?      |

---

## 🗒 Daily Log (Roz ka hisaab)

| Date        | Kya kiya               | Aage kya        |
| ----------- | ---------------------- | --------------- |
| 13 Oct 2026 | Planning docs complete | Phase 1.1 setup |
|             |                        |                 |

---

## 💡 Tips

- Phase 1 aur 2 me **jaldi mat karo**, foundation mazboot hoga to baaki aasan hoga.
- Atak jao to 30 min se zyada mat ruko, AI se poocho (RULES.md §11 ka prompt use karo) ya error Google karo.
- Roz thoda hi sahi, **GitHub pe commit zaroor** karo (green squares = achhi profile).
- Perfect banane ke chakkar me deploy mat rokna. **Pehle chalao, phir sudharo.**
