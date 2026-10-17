import Skeleton from "./Skeleton";

// Har list ke liye ready-made loading placeholders.
// Sab ek hi shape follow karte hain jo asli content ka hota hai, taaki layout jump na kare.

function Loading({ className = "", children }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-busy="true"
      className={className}
    >
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
        <div
          key={i}
          className="rounded-lg border border-slate-200 bg-white p-4"
        >
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

// Browse job (public)

export function BrowseJobGridSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          {/* Header: Company logo and job type */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-slate-200" />

              <div className="space-y-2">
                <div className="h-5 w-36 rounded bg-slate-200" />
                <div className="h-4 w-24 rounded bg-slate-100" />
              </div>
            </div>

            <div className="h-6 w-20 rounded-full bg-slate-200" />
          </div>

          {/* Job details */}
          <div className="mt-5 space-y-3">
            <div className="h-4 w-28 rounded bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-slate-200" />
              <div className="h-4 w-32 rounded bg-slate-100" />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-slate-200" />
              <div className="h-4 w-28 rounded bg-slate-100" />
            </div>
          </div>

          {/* Skills */}
          <div className="mt-5 flex flex-wrap gap-2">
            <div className="h-6 w-16 rounded-md bg-slate-200" />
            <div className="h-6 w-20 rounded-md bg-slate-100" />
            <div className="h-6 w-14 rounded-md bg-slate-200" />
          </div>

          {/* Footer: Posted date and actions */}
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="h-4 w-24 rounded bg-slate-100" />
            <div className="flex gap-2">
              <div className="h-9 w-9 rounded-lg bg-slate-200" />
              <div className="h-9 w-20 rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </>
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
              <div
                key={i}
                className="rounded-lg border border-slate-200 bg-white p-3"
              >
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
    <Loading
      className={
        (bare ? "divide-y divide-slate-100 " : "space-y-3 ") + className
      }
    >
      {range(rows).map((i) => (
        <div
          key={i}
          className={
            "flex items-center justify-between gap-4 " +
            (bare ? "py-3" : "rounded-lg border border-slate-200 bg-white p-4")
          }
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
    <Loading
      className={
        bare
          ? ""
          : "overflow-hidden rounded-lg border border-slate-200 bg-white"
      }
    >
      {!bare && <Skeleton className="h-9 w-full !rounded-none" />}
      {range(rows).map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-t border-slate-200 px-4 py-4"
        >
          {range(cols).map((c) => (
            <Skeleton
              key={c}
              className={"h-4 " + (c === 0 ? "w-1/3" : "w-1/6")}
            />
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
        <div
          key={i}
          className="rounded-lg border border-slate-200 bg-white p-4"
        >
          <Skeleton className="h-4 w-20" />
          <Skeleton className="mt-3 h-8 w-12" />
        </div>
      ))}
    </Loading>
  );
}
