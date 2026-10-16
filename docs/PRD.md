# PRD.md — Product Requirements Document (JobTrackr)

> **PRD kya hota hai?** Ye batata hai ki hum **kya** bana rahe hain, **kisके liye** bana rahe hain aur **kyun**. Code kaise likhna hai wo ARCHITECTURE.md me hai. Koi bhi feature banane se pehle yahan check karo ki wo scope me hai ya nahi.

---

## 1. Project Overview

**JobTrackr** ek job tracking website hai jahan:

- **Job Seeker** apni job applications ek jagah track kar sakta hai (kahan apply kiya, interview kab hai, offer aaya ya nahi).
- **Employer** job post kar sakta hai aur candidates ko ek pipeline me manage kar sakta hai (Applied → Shortlisted → Interview → Hired).

**Current phase:** Sirf **Frontend** (React JS + Tailwind CSS). Backend/database abhi nahi hai. Data **mock JSON + localStorage** me rahega.

## 2. Problem Statement

| Kaun | Problem |
|------|---------|
| Job Seeker | 20-30 jobs me apply karne ke baad yaad nahi rehta kahan apply kiya, kis stage pe hai, follow-up kab karna hai. Excel/notes me sab bikhra hota hai. |
| Employer | Bahut saare resumes aate hain, kaun shortlisted hai kaun reject, ye track karna mushkil hota hai. |

## 3. Goals

1. Job seeker ke liye **ek dashboard** jahan saari applications ka status dikhe.
2. Employer ke liye **ek dashboard** jahan job posts aur applicants manage ho sakein.
3. Clean, responsive UI jo mobile pe bhi chale.
4. Code itna clean ho ki baad me backend (Node/Firebase/Supabase) easily jod sako.

## 4. Non-Goals (Abhi nahi banana)

- Real backend / database / real login (JWT, OAuth)
- Real email notifications
- Resume parsing, AI matching, payments, chat/messaging
- Admin panel

> Ye sab **Phase 2** me. Abhi inko mat chhedna, warna project kabhi khatam nahi hoga.

## 5. Target Users (Personas)

**Persona 1 — Rahul (Job Seeker, 22, fresher)**
Final year student hai, daily 5-6 jobs me apply karta hai. Chahta hai ki sab applications ek jagah dikhein aur interview dates na bhoole.

**Persona 2 — Priya (Employer / HR, 30)**
Ek startup me HR hai. Roz 3-4 roles ke liye hiring chalti hai. Chahti hai ki candidates ko stage-wise move kar sake aur notes likh sake.

## 6. User Roles

- `seeker` → Job Seeker
- `employer` → Employer

Login/Signup ke time role choose hoga. Role ke hisaab se alag dashboard milega (Role-based routing).

---

## 7. Features (MoSCoW Priority)

### 7.1 Common (Dono ke liye)

| ID | Feature | Priority |
|----|---------|----------|
| C1 | Landing page (hero, features, CTA) | Must |
| C2 | Mock Login / Signup with role selection | Must |
| C3 | Logout | Must |
| C4 | Responsive navbar + sidebar | Must |
| C5 | Dark mode toggle | Could |
| C6 | 404 page | Should |

### 7.2 Job Seeker Features

| ID | Feature | Priority |
|----|---------|----------|
| S1 | **Browse Jobs** — list of all jobs | Must |
| S2 | **Search + Filter** (title, location, job type, salary) | Must |
| S3 | **Job Details page** | Must |
| S4 | **Apply to job** (simple form: name, resume link, cover note) | Must |
| S5 | **Save job** (bookmark) | Should |
| S6 | **My Applications — Kanban board** (Saved, Applied, Interview, Offer, Rejected) | Must |
| S7 | Application status change (drag-drop ya dropdown) | Must |
| S8 | Application notes + interview date + follow-up reminder | Should |
| S9 | **Dashboard stats** (total applied, interviews, offers) | Must |
| S10 | Profile page (skills, experience, resume link) | Should |
| S11 | Manual job add (jo job website pe nahi hai, bahar se apply ki) | Should |

### 7.3 Employer Features

| ID | Feature | Priority |
|----|---------|----------|
| E1 | **Post a Job** form | Must |
| E2 | **My Jobs** list (edit, close, delete) | Must |
| E3 | **Applicants list** per job | Must |
| E4 | **Candidate pipeline** (Applied → Shortlisted → Interview → Hired → Rejected) | Must |
| E5 | Candidate detail drawer/modal (resume link, cover note) | Must |
| E6 | Internal notes on candidate | Should |
| E7 | Employer dashboard stats (open jobs, total applicants, hired) | Must |
| E8 | Company profile page | Should |

---

## 8. User Stories & Acceptance Criteria

### Seeker

**US-S1:** *Ek job seeker ke roop me, mujhe jobs search karni hain taaki mujhe sahi job mile.*
- [ ] Search box me title type karne par list real-time filter ho.
- [ ] Location, job type (Full-time/Part-time/Internship/Remote) filter kaam kare.
- [ ] Koi result na mile to "No jobs found" empty state dikhe.

**US-S2:** *Mujhe jobs apply karni hain.*
- [ ] Apply button click → modal/form khule.
- [ ] Required fields khali ho to error dikhe.
- [ ] Submit ke baad application "Applied" column me aaye aur success toast dikhe.
- [ ] Same job pe dobara apply karne par "Already applied" dikhe.

**US-S3:** *Mujhe apni applications track karni hain.*
- [ ] Kanban board me 5 columns dikhein.
- [ ] Card ka status change karne par wo sahi column me chala jaye.
- [ ] Refresh karne par data gayab na ho (localStorage).

### Employer

**US-E1:** *Employer ke roop me mujhe job post karni hai.*
- [ ] Form: title, description, location, type, salary range, skills, deadline.
- [ ] Validation ke baad job "My Jobs" me dikhe aur seeker ki "Browse Jobs" me bhi.

**US-E2:** *Mujhe candidates ko stage-wise manage karna hai.*
- [ ] Har job ke applicants ek list/board me dikhein.
- [ ] Status change karne par seeker ki application ka status bhi update ho (same shared data).

---

## 9. Pages List

| Route | Page | Access |
|-------|------|--------|
| `/` | Landing | Public |
| `/login` | Login | Public |
| `/signup` | Signup | Public |
| `/jobs` | Browse Jobs | Public / Seeker |
| `/jobs/:id` | Job Details | Public / Seeker |
| `/seeker/dashboard` | Seeker Dashboard | Seeker |
| `/seeker/applications` | Kanban Tracker | Seeker |
| `/seeker/saved` | Saved Jobs | Seeker |
| `/seeker/profile` | Profile | Seeker |
| `/employer/dashboard` | Employer Dashboard | Employer |
| `/employer/jobs` | My Jobs | Employer |
| `/employer/jobs/new` | Post Job | Employer |
| `/employer/jobs/:id/applicants` | Applicants | Employer |
| `/employer/company` | Company Profile | Employer |
| `*` | 404 | Public |

## 10. Success Metrics (Portfolio ke liye)

- Saari **Must** features kaam karein.
- Lighthouse score: Performance 85+, Accessibility 90+.
- Mobile (360px) se desktop (1440px) tak UI toote nahi.
- GitHub README + live demo link (Vercel/Netlify).
- Interview me explain kar sako: "State kaise manage kiya, routing kaise ki, folder structure kyun aisa rakha."

## 11. Assumptions & Risks

| Risk | Solution |
|------|----------|
| Scope bahut bada ho jayega | Sirf **Must** pehle, baaki baad me |
| Real backend nahi hai, data sync mushkil | Ek hi `localStorage` store dono roles ke liye use karo |
| Drag-drop complex lag sakta hai | Pehle dropdown se status change, baad me drag-drop |
