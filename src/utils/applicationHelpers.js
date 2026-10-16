// Application se jude chhote helper functions

export const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || "?";

// Application ka title/company nikalo (job se ya external data se)
export function describeApplication(app, jobs) {
  const job = app.jobId ? jobs.find((j) => j.id === app.jobId) : null;
  if (job) {
    return {
      title: job.title,
      company: job.company,
      location: job.location,
      job,
      link: "/jobs/" + job.id,
      external: false,
    };
  }
  return {
    title: app.external?.title || "Removed job",
    company: app.external?.company || "",
    location: "",
    job: null,
    link: app.external?.link || "",
    external: true,
  };
}

export const todayString = () => new Date().toISOString().slice(0, 10);

// Aane wale interview aur follow-up reminders (date ke hisaab se sorted)
export function upcomingEvents(applications, jobs) {
  const today = todayString();
  const events = [];
  applications.forEach((app) => {
    if (app.status === "rejected") return;
    const info = describeApplication(app, jobs);
    if (app.interviewDate && app.interviewDate >= today) {
      events.push({
        id: app.id + "-interview",
        appId: app.id,
        type: "Interview",
        date: app.interviewDate,
        title: info.title,
        company: info.company,
      });
    }
    if (app.reminderDate && app.reminderDate >= today) {
      events.push({
        id: app.id + "-reminder",
        appId: app.id,
        type: "Follow-up",
        date: app.reminderDate,
        title: info.title,
        company: info.company,
      });
    }
  });
  return events.sort((a, b) => a.date.localeCompare(b.date));
}

// "Rahul, Aman" jaisi comma wali string ko array me badlo
export const parseSkills = (text = "") => [
  ...new Set(
    text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  ),
];
