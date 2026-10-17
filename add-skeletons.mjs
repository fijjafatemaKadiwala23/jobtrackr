// add-skeletons.mjs — Har list par skeleton loader lagata hai (sirf yahi kaam, aur kuch nahi)
//
// Kaise chalayein (apne Vite project ke ROOT folder me, jahan package.json hai):
//     node add-skeletons.mjs
//
// Ye script:
//   1. 2 nayi files banati hai:  hooks/useInitialLoading.js  aur  components/ui/Skeletons.jsx
//   2. 7 pages me skeleton ka code PATCH karti hai (poori file overwrite nahi karti):
//        Jobs, Applications, Saved jobs, My jobs, Applicants, Seeker dashboard, Employer dashboard
//   3. Jo file badalti hai uska backup  .backup-before-skeletons/  me rakhti hai
//   4. Dobara chalane par kuch nahi bigadti (jo page patch ho chuka, use skip kar deti hai)
//
// Pehle ye hona chahiye:  scaffold.mjs, add-auth.mjs aur add-features.mjs chal chuki ho.
import { mkdirSync, writeFileSync, existsSync, readFileSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";

if (!existsSync("package.json") || !existsSync("src")) {
  console.error("\n❌ Ye script project ke root folder me chalao (jahan package.json aur src/ ho).\n");
  process.exit(1);
}
if (!existsSync("src/components/ui/Skeleton.jsx")) {
  console.error("\n❌ src/components/ui/Skeleton.jsx nahi mili. Pehle  node scaffold.mjs  chalao.\n");
  process.exit(1);
}

const NEW_FILES = [
  { path: "src/hooks/useInitialLoading.js", content: String.raw`import { useEffect, useState } from "react";

// Page pehli baar khulne par kuch der "loading" True rehta hai, taaki skeleton dikhe.
// Abhi data localStorage se turant aa jata hai, isliye ye delay nakli hai (UX ke liye).
// Jab real backend jodoge, to isko apne API call ke loading state se badal dena.
export default function useInitialLoading(ms = 400) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(timer);
  }, [ms]);

  return loading;
}
` },
  { path: "src/components/ui/Skeletons.jsx", content: String.raw`import Skeleton from "./Skeleton";

// Har list ke liye ready-made loading placeholders.
// Sab ek hi shape follow karte hain jo asli content ka hota hai, taaki layout jump na kare.

function Loading({ className = "", children }) {
  return (
    <div role="status" aria-label="Loading" aria-busy="true" className={className}>
      {children}
    </div>
  );
}

const range = (n) => Array.from({ length: n }, (_, i) => i);

// Jobs page ka card grid
export function JobGridSkeleton({ count = 6 }) {
  return (
    <Loading className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {range(count).map((i) => (
        <div key={i} className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 shrink-0 !rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
          <Skeleton className="mt-4 h-4 w-2/3" />
          <div className="mt-3 flex gap-2">
            <Skeleton className="h-5 w-14 !rounded-full" />
            <Skeleton className="h-5 w-16 !rounded-full" />
            <Skeleton className="h-5 w-12 !rounded-full" />
          </div>
          <Skeleton className="mt-4 h-3 w-24" />
        </div>
      ))}
    </Loading>
  );
}

// Kanban board (seeker aur employer dono)
export function BoardSkeleton({ columns = 5 }) {
  return (
    <Loading className="flex items-start gap-4 overflow-x-auto pb-4">
      {range(columns).map((c) => (
        <div key={c} className="w-72 shrink-0 rounded-lg bg-slate-100/70 p-3">
          <div className="mb-3 flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-7 !rounded-full" />
          </div>
          <div className="space-y-3">
            {range(c % 2 === 0 ? 2 : 1).map((i) => (
              <div key={i} className="rounded-lg border border-slate-200 bg-white p-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-2 h-4 w-1/2" />
                <Skeleton className="mt-4 h-2 w-full" />
                <Skeleton className="mt-4 h-8 w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </Loading>
  );
}

// Simple list rows. bare=true ho to card ke andar use karne ke liye (border ke bina)
export function ListSkeleton({ rows = 4, bare = false, className = "" }) {
  return (
    <Loading className={(bare ? "divide-y divide-slate-100 " : "space-y-3 ") + className}>
      {range(rows).map((i) => (
        <div
          key={i}
          className={"flex items-center justify-between gap-4 " + (bare ? "py-3" : "rounded-lg border border-slate-200 bg-white p-4")}
        >
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <Skeleton className="h-6 w-20 !rounded-full" />
        </div>
      ))}
    </Loading>
  );
}

// Table rows. bare=true ho to Card ke andar use karne ke liye
export function TableSkeleton({ rows = 4, cols = 4, bare = false }) {
  return (
    <Loading className={bare ? "" : "overflow-hidden rounded-lg border border-slate-200 bg-white"}>
      {!bare && <Skeleton className="h-9 w-full !rounded-none" />}
      {range(rows).map((i) => (
        <div key={i} className="flex items-center gap-4 border-t border-slate-200 px-4 py-4">
          {range(cols).map((c) => (
            <Skeleton key={c} className={"h-4 " + (c === 0 ? "w-1/3" : "w-1/6")} />
          ))}
        </div>
      ))}
    </Loading>
  );
}

// Dashboard ke stats cards
export function StatsSkeleton({ count = 4 }) {
  return (
    <Loading className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {range(count).map((i) => (
        <div key={i} className="rounded-lg border border-slate-200 bg-white p-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="mt-3 h-8 w-12" />
        </div>
      ))}
    </Loading>
  );
}
` },
];

const PATCHES = [
  {
    path: "src/pages/public/Jobs.jsx",
    edits: [
      {
        find: String.raw`import EmptyState from "@/components/ui/EmptyState";
`,
        replace: String.raw`import EmptyState from "@/components/ui/EmptyState";
import useInitialLoading from "@/hooks/useInitialLoading";
import { JobGridSkeleton } from "@/components/ui/Skeletons";
`,
      },
      {
        find: String.raw`  const navigate = useNavigate();
`,
        replace: String.raw`  const navigate = useNavigate();
  const loading = useInitialLoading();
`,
      },
      {
        find: String.raw`<p className="mt-1 text-slate-600">{filtered.length} jobs mili</p>`,
        replace: String.raw`<p className="mt-1 text-slate-600">{loading ? "Jobs load ho rahi hain..." : filtered.length + " jobs mili"}</p>`,
      },
      {
        find: String.raw`        {filtered.length === 0 ? (
          <EmptyState title="Koi job nahi mili"`,
        replace: String.raw`        {loading ? (
          <JobGridSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyState title="Koi job nahi mili"`,
      },
    ],
  },
  {
    path: "src/pages/seeker/Applications.jsx",
    edits: [
      {
        find: String.raw`import EmptyState from "@/components/ui/EmptyState";
`,
        replace: String.raw`import EmptyState from "@/components/ui/EmptyState";
import useInitialLoading from "@/hooks/useInitialLoading";
import { BoardSkeleton, ListSkeleton } from "@/components/ui/Skeletons";
`,
      },
      {
        find: String.raw`  const [view, setView] = useState("board");
`,
        replace: String.raw`  const loading = useInitialLoading();
  const [view, setView] = useState("board");
`,
      },
      {
        find: String.raw`<p className="mt-1 text-slate-600">{mine.length} applications track ho rahi hain</p>`,
        replace: String.raw`<p className="mt-1 text-slate-600">{loading ? "Applications load ho rahi hain..." : mine.length + " applications track ho rahi hain"}</p>`,
      },
      {
        find: String.raw`        {mine.length === 0 ? (
          <EmptyState
            title="Abhi koi application nahi"`,
        replace: String.raw`        {loading ? (
          view === "board" ? <BoardSkeleton /> : <ListSkeleton />
        ) : mine.length === 0 ? (
          <EmptyState
            title="Abhi koi application nahi"`,
      },
    ],
  },
  {
    path: "src/pages/seeker/SavedJobs.jsx",
    edits: [
      {
        find: String.raw`import EmptyState from "@/components/ui/EmptyState";
`,
        replace: String.raw`import EmptyState from "@/components/ui/EmptyState";
import useInitialLoading from "@/hooks/useInitialLoading";
import { ListSkeleton } from "@/components/ui/Skeletons";
`,
      },
      {
        find: String.raw`  const [applyJob, setApplyJob] = useState(null);
`,
        replace: String.raw`  const loading = useInitialLoading();
  const [applyJob, setApplyJob] = useState(null);
`,
      },
      {
        find: String.raw`<p className="mt-1 text-slate-600">{saved.length} jobs save ki hain</p>`,
        replace: String.raw`<p className="mt-1 text-slate-600">{loading ? "Saved jobs load ho rahi hain..." : saved.length + " jobs save ki hain"}</p>`,
      },
      {
        find: String.raw`        {saved.length === 0 ? (
          <EmptyState
            title="Abhi koi job save nahi ki"`,
        replace: String.raw`        {loading ? (
          <ListSkeleton rows={3} />
        ) : saved.length === 0 ? (
          <EmptyState
            title="Abhi koi job save nahi ki"`,
      },
    ],
  },
  {
    path: "src/pages/employer/MyJobs.jsx",
    edits: [
      {
        find: String.raw`import EmptyState from "@/components/ui/EmptyState";
`,
        replace: String.raw`import EmptyState from "@/components/ui/EmptyState";
import useInitialLoading from "@/hooks/useInitialLoading";
import { TableSkeleton } from "@/components/ui/Skeletons";
`,
      },
      {
        find: String.raw`  const [toDelete, setToDelete] = useState(null);
`,
        replace: String.raw`  const loading = useInitialLoading();
  const [toDelete, setToDelete] = useState(null);
`,
      },
      {
        find: String.raw`<p className="mt-1 text-slate-600">{myJobs.length} jobs</p>`,
        replace: String.raw`<p className="mt-1 text-slate-600">{loading ? "Jobs load ho rahi hain..." : myJobs.length + " jobs"}</p>`,
      },
      {
        find: String.raw`        {myJobs.length === 0 ? (
          <EmptyState title="Abhi koi job post nahi ki"`,
        replace: String.raw`        {loading ? (
          <TableSkeleton cols={4} />
        ) : myJobs.length === 0 ? (
          <EmptyState title="Abhi koi job post nahi ki"`,
      },
    ],
  },
  {
    path: "src/pages/employer/Applicants.jsx",
    edits: [
      {
        find: String.raw`import EmptyState from "@/components/ui/EmptyState";
`,
        replace: String.raw`import EmptyState from "@/components/ui/EmptyState";
import useInitialLoading from "@/hooks/useInitialLoading";
import Skeleton from "@/components/ui/Skeleton";
import { BoardSkeleton, TableSkeleton } from "@/components/ui/Skeletons";
`,
      },
      {
        find: String.raw`  const [selectedId, setSelectedId] = useState(null);
`,
        replace: String.raw`  const [selectedId, setSelectedId] = useState(null);
  const loading = useInitialLoading();
`,
      },
      {
        find: String.raw`            {applicants.length} applicants, job {job.status === "open" ? "open hai" : "closed hai"}
`,
        replace: String.raw`            {loading
              ? "Applicants load ho rahe hain..."
              : applicants.length + " applicants, job " + (job.status === "open" ? "open hai" : "closed hai")}
`,
      },
      {
        find: String.raw`      <div className="mt-6 space-y-2 rounded-lg border border-slate-200 bg-white p-4" aria-label="Hiring funnel">
        {EMPLOYER_COLUMNS.map((status) => (
          <div key={status} className="flex items-center gap-3 text-sm">
            <span className="w-24 shrink-0 text-slate-600">{EMPLOYER_LABELS[status]}</span>
            <div className="h-2 flex-1 rounded-full bg-slate-100">
              <div
                className={"h-2 rounded-full transition-all " + STATUS_DOT[status]}
                style={{ width: (countOf(status) / maxCount) * 100 + "%" }}
              />
            </div>
            <span className="w-6 text-right tabular-nums text-harbor">{countOf(status)}</span>
          </div>
        ))}
      </div>`,
        replace: String.raw`      {loading ? (
        <Skeleton className="mt-6 h-36 w-full" />
      ) : (
        <div className="mt-6 space-y-2 rounded-lg border border-slate-200 bg-white p-4" aria-label="Hiring funnel">
          {EMPLOYER_COLUMNS.map((status) => (
            <div key={status} className="flex items-center gap-3 text-sm">
              <span className="w-24 shrink-0 text-slate-600">{EMPLOYER_LABELS[status]}</span>
              <div className="h-2 flex-1 rounded-full bg-slate-100">
                <div
                  className={"h-2 rounded-full transition-all " + STATUS_DOT[status]}
                  style={{ width: (countOf(status) / maxCount) * 100 + "%" }}
                />
              </div>
              <span className="w-6 text-right tabular-nums text-harbor">{countOf(status)}</span>
            </div>
          ))}
        </div>
      )}`,
      },
      {
        find: String.raw`        {applicants.length === 0 ? (
          <EmptyState title="Abhi tak kisi ne apply nahi kiya"`,
        replace: String.raw`        {loading ? (
          view === "board" ? <BoardSkeleton /> : <TableSkeleton cols={3} />
        ) : applicants.length === 0 ? (
          <EmptyState title="Abhi tak kisi ne apply nahi kiya"`,
      },
    ],
  },
  {
    path: "src/pages/seeker/SeekerDashboard.jsx",
    edits: [
      {
        find: String.raw`import Card from "@/components/ui/Card";
`,
        replace: String.raw`import Card from "@/components/ui/Card";
import useInitialLoading from "@/hooks/useInitialLoading";
import Skeleton from "@/components/ui/Skeleton";
import { ListSkeleton, StatsSkeleton } from "@/components/ui/Skeletons";
`,
      },
      {
        find: String.raw`  const { jobs, applications } = useJobs();
`,
        replace: String.raw`  const { jobs, applications } = useJobs();
  const loading = useInitialLoading();
`,
      },
      {
        find: String.raw`      <section className="rounded-lg bg-harbor p-5 text-white sm:p-6" aria-label="Next up">
        {next ? (
          <>
            <p className="text-sm text-white/70">
              Agla {next.type === "Interview" ? "interview" : "follow-up"}, {formatDate(next.date)}
            </p>
            <p className="mt-1 font-display text-2xl font-semibold">{next.title}</p>
            <p className="text-white/80">{next.company}</p>
            <Link to="/seeker/applications" className="mt-4 inline-block text-sm font-medium text-marigold hover:underline">
              Tracker kholo
            </Link>
          </>
        ) : (
          <>
            <p className="font-display text-2xl font-semibold">Abhi koi interview ya reminder nahi.</p>
            <Link to="/jobs" className="mt-3 inline-block text-sm font-medium text-marigold hover:underline">
              Nayi jobs dekho
            </Link>
          </>
        )}
      </section>`,
        replace: String.raw`      {loading ? (
        <Skeleton className="h-32 w-full" />
      ) : (
        <section className="rounded-lg bg-harbor p-5 text-white sm:p-6" aria-label="Next up">
          {next ? (
            <>
              <p className="text-sm text-white/70">
                Agla {next.type === "Interview" ? "interview" : "follow-up"}, {formatDate(next.date)}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold">{next.title}</p>
              <p className="text-white/80">{next.company}</p>
              <Link to="/seeker/applications" className="mt-4 inline-block text-sm font-medium text-marigold hover:underline">
                Tracker kholo
              </Link>
            </>
          ) : (
            <>
              <p className="font-display text-2xl font-semibold">Abhi koi interview ya reminder nahi.</p>
              <Link to="/jobs" className="mt-3 inline-block text-sm font-medium text-marigold hover:underline">
                Nayi jobs dekho
              </Link>
            </>
          )}
        </section>
      )}`,
      },
      {
        find: String.raw`      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Stats">
        <StatsCard label="Applied" value={totalApplied} hint="Saved ko chhodkar" accent="bg-lagoon" />
        <StatsCard label="Interviews" value={count("interview")} accent="bg-marigold" />
        <StatsCard label="Offers" value={count("offer")} accent="bg-pine" />
        <StatsCard label="Rejected" value={count("rejected")} accent="bg-plum" />
      </section>`,
        replace: String.raw`      {loading ? (
        <StatsSkeleton />
      ) : (
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Stats">
          <StatsCard label="Applied" value={totalApplied} hint="Saved ko chhodkar" accent="bg-lagoon" />
          <StatsCard label="Interviews" value={count("interview")} accent="bg-marigold" />
          <StatsCard label="Offers" value={count("offer")} accent="bg-pine" />
          <StatsCard label="Rejected" value={count("rejected")} accent="bg-plum" />
        </section>
      )}`,
      },
      {
        find: String.raw`<ReminderList events={events} />`,
        replace: String.raw`{loading ? <ListSkeleton rows={3} bare /> : <ReminderList events={events} />}`,
      },
      {
        find: String.raw`          {recent.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">Abhi tak koi application nahi.</p>`,
        replace: String.raw`          {loading ? (
            <ListSkeleton rows={3} bare className="mt-3" />
          ) : recent.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">Abhi tak koi application nahi.</p>`,
      },
    ],
  },
  {
    path: "src/pages/employer/EmployerDashboard.jsx",
    edits: [
      {
        find: String.raw`import Card from "@/components/ui/Card";
`,
        replace: String.raw`import Card from "@/components/ui/Card";
import useInitialLoading from "@/hooks/useInitialLoading";
import { ListSkeleton, StatsSkeleton, TableSkeleton } from "@/components/ui/Skeletons";
`,
      },
      {
        find: String.raw`  const [showAllJobs, setShowAllJobs] = useState(false);
`,
        replace: String.raw`  const [showAllJobs, setShowAllJobs] = useState(false);
  const loading = useInitialLoading();
`,
      },
      {
        find: String.raw`      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Stats">
        <StatsCard label="Open jobs" value={myJobs.filter((j) => j.status === "open").length} accent="bg-lagoon" />
        <StatsCard label="Total applicants" value={applicants.length} accent="bg-slate-400" />
        <StatsCard label="In interview" value={count("interview")} accent="bg-marigold" />
        <StatsCard label="Hired" value={count("offer")} accent="bg-pine" />
      </section>`,
        replace: String.raw`      {loading ? (
        <StatsSkeleton />
      ) : (
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Stats">
          <StatsCard label="Open jobs" value={myJobs.filter((j) => j.status === "open").length} accent="bg-lagoon" />
          <StatsCard label="Total applicants" value={applicants.length} accent="bg-slate-400" />
          <StatsCard label="In interview" value={count("interview")} accent="bg-marigold" />
          <StatsCard label="Hired" value={count("offer")} accent="bg-pine" />
        </section>
      )}`,
      },
      {
        find: String.raw`        {recent.length === 0 ? (
          <p className="px-4 pb-6 text-sm text-slate-500 sm:px-6">Abhi tak kisi ne apply nahi kiya.</p>`,
        replace: String.raw`        {loading ? (
          <div className="px-4 pb-6 sm:px-6">
            <TableSkeleton rows={3} cols={4} bare />
          </div>
        ) : recent.length === 0 ? (
          <p className="px-4 pb-6 text-sm text-slate-500 sm:px-6">Abhi tak kisi ne apply nahi kiya.</p>`,
      },
      {
        find: String.raw`        {myJobs.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">Abhi koi job post nahi ki.</p>`,
        replace: String.raw`        {loading ? (
          <ListSkeleton rows={3} bare className="mt-3" />
        ) : myJobs.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">Abhi koi job post nahi ki.</p>`,
      },
    ],
  },
];

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupDir = join(".backup-before-skeletons", stamp);
const created = [];
const patched = [];
const skipped = [];
const problems = [];

function backup(path) {
  const dest = join(backupDir, path);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(path, dest);
}

// 1. Nayi files
for (const { path, content } of NEW_FILES) {
  if (existsSync(path)) {
    if (readFileSync(path, "utf8") === content) {
      skipped.push(path + " (pehle se same)");
      continue;
    }
    backup(path);
  }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  created.push(path);
}

// 2. Pages me patch
for (const { path, edits } of PATCHES) {
  if (!existsSync(path)) {
    problems.push(path + ": file nahi mili (add-features.mjs chali thi?)");
    continue;
  }

  let text = readFileSync(path, "utf8");
  if (text.includes("useInitialLoading")) {
    skipped.push(path + " (skeleton pehle se laga hai)");
    continue;
  }

  const usesCrlf = text.includes("\r\n"); // Windows line endings
  if (usesCrlf) text = text.replace(/\r\n/g, "\n");

  let failedAt = null;
  for (const edit of edits) {
    const count = text.split(edit.find).length - 1;
    if (count !== 1) {
      failedAt = edit.find.split("\n").find((l) => l.trim()) || edit.find;
      break;
    }
    text = text.replace(edit.find, () => edit.replace);
  }

  if (failedAt) {
    problems.push(path + ": ye code nahi mila, shayad aapne file badal di hai -> " + failedAt.trim());
    continue; // file ko bina chhede chhod do
  }

  backup(path);
  writeFileSync(path, usesCrlf ? text.replace(/\n/g, "\r\n") : text);
  patched.push(path);
}

console.log("\n✅ Skeleton loaders:");
created.forEach((f) => console.log("   + nayi file   " + f));
patched.forEach((f) => console.log("   ~ patch hua   " + f));
if (skipped.length) {
  console.log("\n⏭  Skip:");
  skipped.forEach((f) => console.log("   - " + f));
}
if (problems.length) {
  console.log("\n⚠️  Ye pages patch nahi hue (file jaisi thi waisi hi hai):");
  problems.forEach((p) => console.log("   ! " + p));
}
if (created.length || patched.length) console.log("\n💾 Backup: " + backupDir);
console.log("\nAb chalao:  npm run dev   (har list pehle ~0.4 second skeleton dikhayegi)\n");
