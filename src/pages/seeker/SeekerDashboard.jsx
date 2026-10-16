import { useMemo } from "react";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import useJobs from "@/hooks/useJobs";
import StatsCard from "@/components/seeker/StatsCard";
import ReminderList from "@/components/seeker/ReminderList";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import RouteLine from "@/components/ui/RouteLine";
import { SEEKER_LABELS } from "@/utils/constants";
import { describeApplication, upcomingEvents } from "@/utils/applicationHelpers";
import { formatDate } from "@/utils/helpers";

export default function SeekerDashboard() {
  const { user } = useAuth();
  const { jobs, applications } = useJobs();

  const mine = useMemo(() => applications.filter((a) => a.seekerId === user.id), [applications, user.id]);
  const events = useMemo(() => upcomingEvents(mine, jobs), [mine, jobs]);
  const recent = useMemo(
    () => mine.filter((a) => a.status !== "saved").sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
    [mine]
  );

  const count = (status) => mine.filter((a) => a.status === status).length;
  const totalApplied = mine.filter((a) => a.status !== "saved").length;
  const next = events[0];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-harbor">Hi, {user.name.split(" ")[0]}</h1>
        <p className="mt-1 text-slate-600">Aapki job search ka haal.</p>
      </div>

      {/* Sabse pehle: agla kaam kya hai */}
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

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Stats">
        <StatsCard label="Applied" value={totalApplied} hint="Saved ko chhodkar" accent="bg-lagoon" />
        <StatsCard label="Interviews" value={count("interview")} accent="bg-marigold" />
        <StatsCard label="Offers" value={count("offer")} accent="bg-pine" />
        <StatsCard label="Rejected" value={count("rejected")} accent="bg-plum" />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-semibold text-harbor">Upcoming</h2>
          <div className="mt-2">
            <ReminderList events={events} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-harbor">Recent applications</h2>
            <Link to="/seeker/applications" className="text-sm text-lagoon hover:underline">
              Sab dekho
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">Abhi tak koi application nahi.</p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100">
              {recent.map((app) => {
                const info = describeApplication(app, jobs);
                return (
                  <li key={app.id} className="py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-harbor">{info.title}</p>
                        <p className="truncate text-xs text-slate-500">{info.company}</p>
                      </div>
                      <Badge status={app.status}>{SEEKER_LABELS[app.status]}</Badge>
                    </div>
                    <RouteLine status={app.status} history={app.history} className="mt-3" />
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
