# RULES.md — JobTrackr ke Coding Rules & Guidelines

> **Rules kyun?** Agar har baar alag style me code likhoge to project 2 hafte me hi uljha hua ho jayega. Ye file ek "traffic rule book" hai. **Aap khud, aapka teammate, aur AI tools — sabko inhe follow karna hai.**

---

## 1. Golden Rules (Sabse zaruri 10)

1. **Ek baar me ek hi task.** TASKS.md se ek task uthao, poora karo, tick karo.
2. **Scope se bahar mat jao.** PRD me jo nahi hai wo mat banao.
3. **Pehle mobile, phir desktop.** Tailwind me bina prefix = mobile.
4. **DESIGN.md ke colors/classes hi use karo.** Naye random colors nahi.
5. **UI directly localStorage ko nahi chhuyegi.** Hamesha service layer se.
6. **Component chhota rakho.** 150 lines se zyada ho to todo.
7. **Har list/page ke 3 states:** loading, empty, error.
8. **Console me error/warning ho to commit mat karo.**
9. **Copy-paste karke samjhe bina code mat dalo.** Interview me poochhenge.
10. **Kaam ke baad MEMORY.md + TASKS.md update karo.**

---

## 2. Naming Conventions

| Cheez | Style | Example |
|-------|-------|---------|
| Component file | PascalCase `.jsx` | `JobCard.jsx`, `KanbanBoard.jsx` |
| Page file | PascalCase `.jsx` | `Applications.jsx` |
| Hook | camelCase, `use` se shuru | `useAuth.js`, `useDebounce.js` |
| Service file | camelCase + `Service` | `jobService.js` |
| Util / constants | camelCase | `helpers.js`, `constants.js` |
| Variable / function | camelCase | `handleApply`, `filteredJobs` |
| Constant | UPPER_SNAKE_CASE | `STATUS`, `JOB_TYPES` |
| Boolean | `is / has / should` se shuru | `isLoading`, `hasApplied` |
| Event handler | `handle` se shuru | `handleSubmit`, `handleStatusChange` |
| Prop callback | `on` se shuru | `onClose`, `onStatusChange` |
| localStorage key | `jt_` prefix | `jt_jobs` |

**Naam kaise rakhein:** Naam se hi samajh aaye ki kya karta hai. `data1`, `temp`, `x`, `abc` ❌ → `applicationList`, `selectedJob` ✅

---

## 3. React Rules

### Do ✅
- Sirf **functional components** + hooks
- Props ko destructure karo: `function JobCard({ job, onSave })`
- List me `key={item.id}` (index nahi)
- State **jitna chhota ho sake utna** rakho. Jo calculate ho sakta hai use state me mat rakho.
- Side effects (`fetch`, `localStorage`, timers) sirf `useEffect` me ya event handler me
- `useEffect` me cleanup likho (timer/listener ke liye)
- Form inputs **controlled** rakho (`value` + `onChange`)
- Repeated logic ko custom hook me nikalo
- Default export pages ke liye, named export chhote components/utils ke liye

### Don't ❌
- State ko directly modify mat karo (`arr.push()` ❌ → `setArr([...arr, x])` ✅)
- Class components mat likho
- `useEffect` me infinite loop (dependency array check karo)
- Props ko 4-5 level neeche mat bhejo (prop drilling) → context/hook use karo
- Index ko key mat banao
- Ek component me data fetch + UI + logic sab mat bharo

### Component template
```jsx
import { useState } from "react";

function JobCard({ job, onSave }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved((prev) => !prev);
    onSave?.(job.id);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
      <button onClick={handleSave} aria-label="Save job">
        {isSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
}

export default JobCard;
```

---

## 4. Tailwind Rules

- **Sirf Tailwind classes.** Custom CSS tabhi jab bilkul zaruri ho.
- **Inline `style={{}}` avoid karo.**
- Class ka order (padhne me aasan): `layout → size → spacing → typography → color → border → effect → state`
  ```
  flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700
  ```
- Ek hi class-string 3+ jagah repeat ho raha ho → **component banao** (`<Button>`), `@apply` nahi.
- Responsive: `sm: md: lg: xl:` — mobile-first
- Dark mode: `dark:` variants (agar Phase 4 me banaya)
- Dynamic classes aise mat likho: `` `bg-${color}-500` `` ❌ (Tailwind purge kar dega). Mapping object use karo:
  ```js
  const STATUS_STYLES = {
    applied: "bg-blue-100 text-blue-700",
    offer: "bg-green-100 text-green-700",
  };
  ```

---

## 5. Folder & File Rules

- Har cheez apne folder me: UI → `components/ui`, page → `pages/`, data → `services/`
- **Ek file = ek component** (chhote helper ko chhod ke)
- Page me sirf **layout + data jodna**. Bada UI `components/` me.
- Import order: React → third-party → context/hooks → components → utils → CSS
- Absolute imports ke liye `@` alias (`@/components/ui/Button`) vite.config me set karo
- Unused imports/files delete karo

---

## 6. State & Data Rules

- Global state sirf 2 context me: `AuthContext`, `DataContext`
- Local state (modal open/close, input value) → component ke andar `useState`
- **Status change ka ek hi function** hona chahiye: `updateApplicationStatus(id, newStatus)` — seeker aur employer dono wahi use karein
- Status change par `history` array me entry **zaroor** daalo
- IDs: `generateId("j")` helper se (`j_`, `a_`, `u_` prefix)
- Dates: ISO string me save karo, dikhate waqt `formatDate()` se
- localStorage read/write me **try/catch** zaroor

---

## 7. Forms & Validation Rules

- Required fields pe `*` lagao
- Submit pe validate karo, error field ke neeche dikhao (red text)
- Email format check, URL (resume link) format check
- Submit ke time button disable + loading
- Success pe toast, fail pe error toast
- User input kabhi `dangerouslySetInnerHTML` se mat dikhao (XSS)

---

## 8. Security (Frontend-level)

- Password plain text hai sirf **demo** ke liye. README me clearly likho: *"Demo only. Real project me backend + hashing."*
- Sensitive cheez (real password, API key) kabhi GitHub pe mat daalo
- `.env` file `.gitignore` me ho
- Seeker `/employer/*` kholne ki koshish kare to ProtectedRoute rok de

---

## 9. Git Rules

### Branches
- `main` → hamesha chalta hua code
- `feature/seeker-kanban`, `feature/post-job`, `fix/login-redirect`

### Commit message format
```
type: chhota description

feat: add job search filter
fix: login redirect for employer
style: improve job card spacing
refactor: extract useDebounce hook
docs: update MEMORY.md
chore: install react-router
```

### Rules
- Chhote, baar-baar commits (din me 3-5)
- "update", "changes", "final" jaise bekaar message ❌
- Kaam adhura ho to bhi working state me commit karo
- `node_modules` aur `.env` commit nahi hote

---

## 10. Testing Checklist (Har feature ke baad khud check)

- [ ] Desktop pe sahi chal raha hai?
- [ ] Mobile (360px) pe sahi dikh raha hai? (Chrome DevTools)
- [ ] Refresh karne par data bacha hai?
- [ ] Empty state dikh raha hai?
- [ ] Galat input daalne par error aata hai?
- [ ] Console me koi error/warning nahi?
- [ ] Seeker + Employer dono role se test kiya?
- [ ] Keyboard (Tab) se use ho raha hai?

---

## 11. AI Assistant Rules (Claude / Cursor / Copilot ke liye)

1. Code likhne se pehle **MEMORY.md, PRD.md, ARCHITECTURE.md, DESIGN.md, RULES.md** padho.
2. **TASKS.md** se sirf agla uncompleted task karo.
3. Naya package install karne se pehle **puchho**.
4. TypeScript, Redux, backend, CSS-in-JS **mat** use karo.
5. Existing file badalne se pehle batao kya badal rahe ho.
6. Code ke saath **Hinglish me chhota explanation** do (kya kiya, kyun kiya).
7. Task ke baad **TASKS.md tick** aur **MEMORY.md Current Status update** karo.
8. Agar kuch unclear ho to anuman lagane ki jagah **ek sawaal pucho**.
9. Poora project ek saath generate mat karo — step by step.

---

## 12. Definition of Done (Task kab "complete" mana jayega)

Ek task tabhi done hai jab:
- ✅ Acceptance criteria (PRD / TASKS) poore hon
- ✅ DESIGN.md ke hisaab se UI ho
- ✅ Mobile + desktop dono me chale
- ✅ Loading/empty/error states hon
- ✅ Console clean ho
- ✅ Code RULES.md follow kare
- ✅ Git commit ho gaya
- ✅ TASKS.md tick + MEMORY.md update
