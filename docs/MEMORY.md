# MEMORY.md — JobTrackr ki Yaaddasht (Project Memory)

> **MEMORY.md kya hai?** Ye project ka **"dimaag"** hai. Jab bhi aap AI (Claude, Cursor, Copilot) ya kisi teammate ko project me lao, ya khud 1 hafte baad wapas aao, to **sabse pehle ye file padho/dikhao**. Isme likha hai: project kya hai, ab tak kya hua, kaunse faisle kyun liye gaye, aur kya dhyan rakhna hai.
>
> **Rule:** Jab bhi koi bada kaam ho ya faisla ho, is file ko **update** karo. Purani cheez delete mat karo, neeche add karo.

---

## 1. Project Snapshot (30 second me samjho)

| Cheez | Detail |
|-------|--------|
| Project | **JobTrackr** — Job tracking website |
| Users | Job Seeker + Employer (2 roles) |
| Stack | React JS (Vite) + Tailwind CSS |
| Backend | **Nahi hai** (abhi). Data = localStorage + mock seed |
| Goal | Job crack karne ke liye portfolio project |
| Owner | (apna naam likho) |
| Start date | 13 Oct 2026 |
| Docs | PRD.md, ARCHITECTURE.md, DESIGN.md, RULES.md, TASKS.md, MEMORY.md |

**Ek line me:** Seeker apni applications Kanban board pe track karta hai, employer job post karke candidates ko pipeline me move karta hai. Dono ka data ek hi shared `application` record se sync hota hai.

---

## 2. Current Status (Isko hamesha update rakho)

```
Current Phase : Phase 0 — Planning complete
Last Done     : 6 documentation files ban gayi
In Progress   : -
Next Step     : Vite + Tailwind setup, folder structure banana (TASKS.md → Phase 1)
Blockers      : Koi nahi
Last Updated  : 13 Oct 2026
```

---

## 3. Key Decisions Log (Faisle aur unke karan)

| # | Faisla | Karan | Date |
|---|--------|-------|------|
| D1 | Vite use karenge, CRA nahi | CRA outdated hai, Vite fast hai | 13 Oct 2026 |
| D2 | Redux nahi, Context + useReducer | Chhota project, simple rakhna hai | 13 Oct 2026 |
| D3 | localStorage as database | Backend abhi nahi banana | 13 Oct 2026 |
| D4 | Service Layer banayenge (UI → service → storage) | Baad me backend jodna easy ho | 13 Oct 2026 |
| D5 | Ek hi `Application` record dono side use karenge | Seeker/Employer ka status auto-sync | 13 Oct 2026 |
| D6 | Pehle dropdown se status change, drag-drop baad me | Complexity kam, MVP jaldi | 13 Oct 2026 |
| D7 | Tailwind classes hi use karenge, custom CSS nahi | Consistency + speed | 13 Oct 2026 |
| D8 | JavaScript (JSX), TypeScript nahi | Seekhne par focus, setup simple | 13 Oct 2026 |

*(Naya faisla ho to D9, D10... aise add karo)*

---

## 4. Important Concepts (Ye bhoolna nahi)

### 4.1 Status mapping
- Database me ek hi `status`: `saved | applied | shortlisted | interview | offer | rejected`
- Employer UI me `offer` ka label = **"Hired"**
- Seeker UI me `shortlisted` = "Applied" column + purple **"Shortlisted"** badge

### 4.2 Notes alag-alag
- `seekerNotes` → sirf seeker dekhega
- `employerNotes` → sirf employer dekhega
- **Kabhi ek doosre ke notes mat dikhao**

### 4.3 Demo accounts
- Seeker: `seeker@demo.com` / `1234`
- Employer: `employer@demo.com` / `1234`

### 4.4 localStorage keys
`jt_users`, `jt_jobs`, `jt_applications`, `jt_saved`, `jt_session`, `jt_theme`
> Data reset karna ho to browser console: `localStorage.clear()` phir refresh (seed dobara load hoga).

### 4.5 Role-based routes
- `/seeker/*` sirf seeker | `/employer/*` sirf employer | baaki public

---

## 5. Glossary (Shabdkosh)

| Shabd | Matlab |
|-------|--------|
| Seeker | Naukri dhundne wala user |
| Employer | Naukri dene wala / HR |
| Application | Seeker ka kisi job pe apply karna (ya manually add karna) |
| Pipeline | Employer ke candidates ke stages ki line |
| Kanban | Columns wala board jisme cards ko move karte hain |
| Seed data | Starting ka fake data jo app pehli baar khulne par load hota hai |
| Service layer | Data save/fetch karne wale functions ki layer |
| Protected route | Wo page jo sirf login + sahi role walon ko dikhe |

---

## 6. Known Issues / Limitations

- [ ] Real auth nahi hai — password plain text me localStorage me hai (sirf demo)
- [ ] Do alag browsers/devices ke beech data sync nahi hota (localStorage ki limit)
- [ ] Ek hi browser me seeker aur employer dono test karne ho to logout/login karna padega

*(Naye bugs yahan likho: kya hua, kahan, status)*

---

## 7. Lessons Learned (Seekhe hue sabak)

*(Project banate waqt jo seekho wo yahan likho. Ye interview me bahut kaam aayega!)*

- Example: "Context me bahut zyada state daalne se re-render badh gaye, to AuthContext aur DataContext alag kiye."

---

## 8. Interview Talking Points (Ye project interview me kaise batayein)

1. **Problem:** "Job seekers applications track nahi kar paate, employers candidates manage nahi kar paate."
2. **Solution:** "Dono side ka dashboard, shared data model se real-time sync."
3. **Tech decisions:** "Vite + React, Tailwind, Context API. Backend nahi tha to Service Layer banayi taaki baad me API jodna easy ho."
4. **Challenge:** "Seeker aur employer ke status ko sync karna — ek single `status` field aur label mapping se solve kiya."
5. **Features:** Role-based routing, Kanban, search/filter with debounce, localStorage persistence, responsive UI.
6. **Next:** "Node + MongoDB backend, JWT auth, email notifications."

---

## 9. AI Assistant ke liye Instructions (Claude/Cursor ko ye do)

> Copy-paste prompt:
> "Ye mera project JobTrackr hai. Pehle MEMORY.md, PRD.md, ARCHITECTURE.md, DESIGN.md aur RULES.md padho. Phir TASKS.md se agla uncompleted task uthao. Sirf wahi task karo, scope se bahar mat jao. Kaam ke baad MEMORY.md ka Current Status update karo aur TASKS.md me checkbox tick karo."

**AI ko yaad rakhna hai:**
- Sirf React + Tailwind (no backend, no TypeScript, no extra UI library bina puche)
- DESIGN.md ke colors/components follow karo
- RULES.md ke naming aur folder rules follow karo
- Ek baar me ek hi task

---

## 10. Changelog (Kya-kya badla)

| Date | Change |
|------|--------|
| 13 Oct 2026 | Project planning, 6 docs create kiye |
