// Loading ke time grey placeholder:  <Skeleton className="h-4 w-32" />
export default function Skeleton({ className = "" }) {
  return <div aria-hidden="true" className={"animate-pulse rounded bg-slate-200 " + className} />;
}
