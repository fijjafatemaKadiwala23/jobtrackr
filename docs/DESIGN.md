# DESIGN.md — JobTrackr ka UI/UX Design Guide

> **Design file kyun?** Taaki har page ek jaisa dikhe. Agar ek page me button blue ho aur doosre me green, to project unprofessional lagta hai. Is file me rang, font, spacing, components aur har page ka layout fix hai. **Koi bhi UI banane se pehle isse dekho.**

---

## 1. Design Philosophy

1. **Clean & Simple** — kam cheezein, zyada clarity
2. **Mobile-first** — pehle chhoti screen banao, phir badi
3. **Consistent** — same component = same look, har jagah
4. **Fast to scan** — job seeker ko ek nazar me status dikhna chahiye (colors se)
5. **Friendly** — empty states me bhi helpful message

---

## 2. Color Palette

### Brand Colors

| Naam          | Tailwind Class | Hex     | Use kahan                          |
| ------------- | -------------- | ------- | ---------------------------------- |
| Primary       | `indigo-600`   | #4F46E5 | Main buttons, links, active menu   |
| Primary Hover | `indigo-700`   | #4338CA | Button hover                       |
| Primary Light | `indigo-50`    | #EEF2FF | Active sidebar bg, soft highlights |
| Secondary     | `slate-900`    | #0F172A | Heading, dark sections             |

### Neutral Colors

| Use             | Light Mode         | Dark Mode               |
| --------------- | ------------------ | ----------------------- |
| Page background | `bg-slate-50`      | `dark:bg-slate-950`     |
| Card background | `bg-white`         | `dark:bg-slate-900`     |
| Border          | `border-slate-200` | `dark:border-slate-800` |
| Heading text    | `text-slate-900`   | `dark:text-slate-50`    |
| Body text       | `text-slate-600`   | `dark:text-slate-400`   |
| Muted text      | `text-slate-400`   | `dark:text-slate-500`   |

### Status Colors (BAHUT IMPORTANT — poore project me yahi use hoga)

| Status        | Badge Classes                   | Matlab                              |
| ------------- | ------------------------------- | ----------------------------------- |
| Saved         | `bg-slate-100 text-slate-700`   | Grey — abhi apply nahi kiya         |
| Applied       | `bg-blue-100 text-blue-700`     | Blue — apply ho gaya                |
| Shortlisted   | `bg-purple-100 text-purple-700` | Purple — employer ne shortlist kiya |
| Interview     | `bg-amber-100 text-amber-700`   | Yellow — interview stage            |
| Offer / Hired | `bg-green-100 text-green-700`   | Green — selected!                   |
| Rejected      | `bg-red-100 text-red-700`       | Red — reject                        |

### Feedback Colors

- Success: `green-600` | Error: `red-600` | Warning: `amber-500` | Info: `blue-600`

---

## 3. Typography

**Font:** `Inter` (Google Fonts) — fallback `system-ui, sans-serif`

| Element            | Tailwind Classes                                |
| ------------------ | ----------------------------------------------- |
| Page Title (H1)    | `text-3xl md:text-4xl font-bold text-slate-900` |
| Section Title (H2) | `text-2xl font-semibold text-slate-900`         |
| Card Title (H3)    | `text-lg font-semibold text-slate-900`          |
| Body               | `text-base text-slate-600`                      |
| Small / Meta       | `text-sm text-slate-500`                        |
| Tiny / Badge       | `text-xs font-medium`                           |

---

## 4. Spacing, Radius, Shadow

- **Spacing scale:** sirf 2, 3, 4, 6, 8, 12, 16 use karo (`p-4`, `gap-6`, `mb-8`)
- **Page padding:** `px-4 sm:px-6 lg:px-8`
- **Max content width:** `max-w-7xl mx-auto`
- **Border radius:** Card `rounded-xl`, Button/Input `rounded-lg`, Badge `rounded-full`
- **Shadow:** Card `shadow-sm`, hover/modal `shadow-md` / `shadow-xl`. Zyada shadow mat lagao.

---

## 5. Tailwind Config

```js
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
```

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 6. Reusable Components (Spec)

### Button

| Variant   | Classes                                                                                    |
| --------- | ------------------------------------------------------------------------------------------ |
| Primary   | `bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition` |
| Secondary | `bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg`   |
| Danger    | `bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg`                              |
| Ghost     | `text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg`                                  |

- Sizes: `sm` (`px-3 py-1.5 text-sm`), `md` (default), `lg` (`px-6 py-3`)
- Disabled: `opacity-50 cursor-not-allowed`
- Loading: spinner + disabled

### Input

```
w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
```

- Error: `border-red-500` + neeche `text-xs text-red-600` message
- Label hamesha upar: `text-sm font-medium text-slate-700 mb-1`

### Card

`bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6`

### Badge

`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium` + status color

### Modal

- Overlay: `fixed inset-0 bg-black/50 flex items-center justify-center z-50`
- Box: `bg-white rounded-xl max-w-lg w-full p-6 shadow-xl`
- Escape press ya bahar click = close

### Other

- **Toast:** top-right, 3 sec
- **Spinner:** `animate-spin` indigo circle
- **EmptyState:** icon + title + 1 line description + CTA button
- **Skeleton:** `animate-pulse bg-slate-200 rounded` (loading ke time)

---

## 7. Layouts

### Public Layout (Landing, Jobs, Login)

```
┌────────────────────────────────────┐
│ Navbar: Logo | Jobs | Login | Signup│
├────────────────────────────────────┤
│                                    │
│            Page content            │
│                                    │
├────────────────────────────────────┤
│               Footer               │
└────────────────────────────────────┘
```

### Dashboard Layout (Seeker + Employer)

```
┌──────────┬─────────────────────────┐
│ Sidebar  │ Topbar (search, avatar) │
│ - Home   ├─────────────────────────┤
│ - Jobs   │                         │
│ - Tracker│     Page content        │
│ - Saved  │                         │
│ - Profile│                         │
└──────────┴─────────────────────────┘
```

- Desktop: sidebar fixed `w-64`
- Mobile: sidebar hide, hamburger se slide-in drawer

**Seeker sidebar:** Dashboard, Browse Jobs, My Applications, Saved Jobs, Profile
**Employer sidebar:** Dashboard, My Jobs, Post a Job, Company Profile

---

## 8. Page-by-Page Design

### 8.1 Landing Page

1. **Hero:** Bada headline ("Apni job journey ko track karo"), subtext, 2 buttons — _"I'm a Job Seeker"_ (primary) aur _"I'm an Employer"_ (secondary)
2. **Features:** 3 cards (Track Applications, Post Jobs, Manage Pipeline) icons ke saath
3. **How it works:** 3 steps
4. **Stats strip:** (fake numbers) 1000+ Jobs, 500+ Companies
5. **Footer**

### 8.2 Login / Signup

- Center card `max-w-md`
- Signup me **role selector** (2 bade radio cards: Job Seeker / Employer)
- Demo credentials ka chhota hint box

### 8.3 Browse Jobs

- Upar search bar + filter row (Location, Type, Salary)
- Desktop: left filters sidebar + right job grid. Mobile: filters collapsible
- Grid: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4`
- **JobCard:** company logo (initials circle), title, company, location, type badge, salary, skills chips, "Save" ♡ icon, "View" button

### 8.4 Job Details

- Left (2/3): title, company, description, requirements
- Right (1/3, sticky): Apply card — salary, location, type, deadline, **Apply** + **Save** buttons

### 8.5 Seeker Dashboard

- Top: 4 stats cards (Total Applied, Interviews, Offers, Rejected)
- Neeche: "Upcoming Interviews / Reminders" list + "Recent Applications" list

### 8.6 Seeker Kanban (My Applications)

- 5 columns horizontally scrollable: Saved | Applied | Interview | Offer | Rejected
- Har column header me count badge
- **ApplicationCard:** job title, company, date, status badge, small ⋯ menu
- Card click → drawer: notes, interview date, reminder, status dropdown
- Mobile: columns ki jagah tabs ya vertical stack

### 8.7 Employer Dashboard

- Stats: Open Jobs, Total Applicants, Interviews, Hired
- Recent applicants table + active jobs list

### 8.8 My Jobs / Post Job

- My Jobs: table (Title, Applicants count, Status toggle, Actions: Edit/Close/Delete)
- Post Job: 2-column form (desktop), 1-column (mobile). Skills chips input.

### 8.9 Applicants (Pipeline)

- Same Kanban style: Applied | Shortlisted | Interview | Hired | Rejected
- Candidate card click → right-side drawer: details, resume link, cover note, employer notes, status change

---

## 9. Responsive Breakpoints

| Device  | Tailwind | Width   |
| ------- | -------- | ------- |
| Mobile  | default  | 360px+  |
| Tablet  | `md:`    | 768px+  |
| Laptop  | `lg:`    | 1024px+ |
| Desktop | `xl:`    | 1280px+ |

**Rule:** Pehle bina prefix ke mobile style likho, phir `md:`, `lg:` se bada karo.

---

## 10. Animations (halke rakho)

- Buttons/cards: `transition duration-200`
- Card hover: `hover:shadow-md hover:-translate-y-0.5`
- Modal: fade-in
- Zyada animation mat karo, performance aur focus kharab hota hai

---

## 11. Accessibility Checklist

- [ ] Har button/icon ka `aria-label` ya visible text
- [ ] Input ke saath `<label>`
- [ ] Keyboard se Tab karke sab kuch use ho sake
- [ ] Focus ring dikhe (`focus:ring-2`)
- [ ] Text contrast achha ho (light grey text white pe avoid karo)
- [ ] Images pe `alt`
- [ ] Sirf color pe depend mat karo — status badge me **text bhi** likho

---

## 12. Do's & Don'ts

| ✅ Do                                       | ❌ Don't                       |
| ------------------------------------------- | ------------------------------ |
| Same badge colors har jagah                 | Har page pe naye random colors |
| Design tokens (is file ke classes) use karo | Inline style / custom CSS      |
| Empty/loading states banao                  | Blank white screen chhodo      |
| Mobile pe check karo                        | Sirf laptop pe test karo       |
