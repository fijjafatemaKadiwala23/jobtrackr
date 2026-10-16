const STOPS = ["Saved", "Applied", "Interview", "Offer"];
const CURRENT = 2; // demo ke liye "Interview" tak pahunchi hui application

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="mx-auto grid max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white lg:grid-cols-2">
      {/* Left: brand panel (sirf bade screen pe) */}
      <aside className="hidden flex-col justify-between bg-harbor p-10 text-white lg:flex">
        <p className="font-display text-lg font-semibold">JobTrackr</p>

        <div>
          <h2 className="font-display text-3xl font-bold leading-tight">
            Har application ka rasta, ek nazar me.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-white/70">
            Job save karo, apply karo, interview track karo. Sab ek jagah.
          </p>
        </div>

        <ol
          className="flex items-start"
          aria-label="Application journey example"
        >
          {STOPS.map((stop, i) => (
            <li key={stop} className="flex flex-1 flex-col last:flex-none">
              <div className="flex items-center">
                <span
                  className={
                    "h-3 w-3 shrink-0 rounded-full " +
                    (i <= CURRENT ? "bg-marigold" : "border border-white/40")
                  }
                />
                {i < STOPS.length - 1 && (
                  <span
                    className={
                      "h-px flex-1 " +
                      (i < CURRENT ? "bg-marigold" : "bg-white/25")
                    }
                  />
                )}
              </div>
              <span className="mt-2 text-xs text-white/70">{stop}</span>
            </li>
          ))}
        </ol>
      </aside>

      {/* Right: form */}
      <section className="p-6 sm:p-10">
        <h1 className="font-display text-2xl font-bold text-harbor">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
        <div className="mt-6">{children}</div>
        {footer && <p className="mt-6 text-sm text-slate-600">{footer}</p>}
      </section>
    </div>
  );
}
