import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import RouteLine from "@/components/ui/RouteLine";
import useAuth from "@/hooks/useAuth";

const STAGE_TEXT = {
  saved: "Saved. Apply karne se pehle notes likh lo.",
  applied: "Applied. Follow-up reminder set ho gaya.",
  interview: "Interview scheduled. Round 1 technical.",
};

// Page ka ek hi animation: route line apne aap Saved se Interview tak chalti hai
function HeroRoute() {
  const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [stage, setStage] = useState(reduceMotion ? "interview" : "saved");

  useEffect(() => {
    if (reduceMotion) return;
    const t1 = setTimeout(() => setStage("applied"), 900);
    const t2 = setTimeout(() => setStage("interview"), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduceMotion]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-label="Example application">
      <p className="font-display text-xl font-semibold text-harbor">Frontend Developer</p>
      <p className="text-sm text-slate-600">Pixel Labs, Ahmedabad</p>
      <RouteLine status={stage} showLabels className="mt-6" />
      <p className="mt-5 min-h-[1.25rem] text-sm text-slate-600" aria-live="polite">
        {STAGE_TEXT[stage]}
      </p>
    </div>
  );
}

const primaryLink = "inline-block rounded-lg bg-lagoon px-5 py-3 font-medium text-white transition hover:bg-lagoon/90";
const secondaryLink = "inline-block rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50";

const SEEKER_POINTS = [
  "Kanban board ya Journey list me har application ek jagah",
  "Interview date aur follow-up reminder",
  "Private notes: HR ka naam, salary, feedback",
];
const EMPLOYER_POINTS = [
  "Job post karo, edit karo ya close karo",
  "Candidates ko Applied se Hired tak move karo",
  "Status badalte hi seeker ke tracker me update",
];
const STEPS = [
  { title: "Account banao", text: "Job seeker ya employer, jo aap ho wo chuno." },
  { title: "Jobs save ya post karo", text: "Seeker jobs save karke apply karta hai, employer job post karta hai." },
  { title: "Status track karo", text: "Dono side ek hi application record dekhte hain, isliye sab sync rehta hai." },
];

export default function Landing() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section className="grid items-center gap-10 py-6 lg:grid-cols-2 lg:py-14">
        <div>
          <h1 className="font-display text-4xl font-bold leading-tight text-harbor sm:text-5xl">Har application ka rasta, ek nazar me.</h1>
          <p className="mt-4 max-w-lg text-lg text-slate-600">
            Job save karo, apply karo, interview track karo. Employers ke liye bhi ek simple hiring pipeline.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {user ? (
              <Link to={"/" + user.role + "/dashboard"} className={primaryLink}>
                Dashboard par jao
              </Link>
            ) : (
              <>
                <Link to="/signup?role=seeker" className={primaryLink}>
                  Job seeker ke liye
                </Link>
                <Link to="/signup?role=employer" className={secondaryLink}>
                  Employer ke liye
                </Link>
              </>
            )}
          </div>
        </div>
        <HeroRoute />
      </section>

      {/* Dono side */}
      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="font-display text-2xl font-semibold text-harbor">Job seeker ke liye</h2>
          <ul className="mt-4 space-y-3 text-slate-600">
            {SEEKER_POINTS.map((point) => (
              <li key={point} className="flex gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-lagoon" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-harbor p-6 text-white">
          <h2 className="font-display text-2xl font-semibold">Employer ke liye</h2>
          <ul className="mt-4 space-y-3 text-white/80">
            {EMPLOYER_POINTS.map((point) => (
              <li key={point} className="flex gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-marigold" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Steps: ye sach me ek sequence hai, isliye numbers */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-harbor">Kaise kaam karta hai</h2>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lagoon text-sm font-semibold text-white">{i + 1}</span>
              <div>
                <h3 className="font-semibold text-harbor">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      {!user && (
        <section className="mt-16 rounded-lg bg-lagoon px-6 py-10 text-white sm:px-10">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Apni pehli application track karo.</h2>
          <p className="mt-2 max-w-md text-white/85">Demo account se abhi try kar sakte ho, signup ki zarurat nahi.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/login" className="inline-block rounded-lg bg-white px-5 py-3 font-medium text-harbor transition hover:bg-mist">
              Demo login
            </Link>
            <Link to="/signup" className="inline-block rounded-lg border border-white/50 px-5 py-3 font-medium text-white transition hover:bg-white/10">
              Account banao
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
