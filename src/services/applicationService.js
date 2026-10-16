import { getData, setData } from "./storage";
import { KEYS } from "@/utils/constants";
import { generateId } from "@/utils/helpers";
import { seedApplications } from "@/data/seed";

// NOTE: "Saved job" bhi ek application hai jiska status "saved" hota hai.
// Apply karne par wahi record "applied" ban jata hai. Isse seeker aur employer dono side sync rehte hain.

export function getApplications() {
  const list = getData(KEYS.APPLICATIONS, null);
  if (!list) {
    setData(KEYS.APPLICATIONS, seedApplications);
    return seedApplications;
  }
  return list;
}

const save = (list) => setData(KEYS.APPLICATIONS, list);
const now = () => new Date().toISOString();

// Apply ke waqt seeker ki details ka snapshot (employer ko ye dikhega)
function snapshot(user) {
  const profile = user.profile || {};
  return {
    name: user.name,
    email: user.email,
    skills: profile.skills || [],
    experience: profile.experience || "",
    resumeLink: profile.resumeLink || "",
  };
}

function baseRecord(user) {
  return {
    id: generateId("a"),
    seekerId: user.id,
    applicant: snapshot(user),
    coverNote: "",
    resumeLink: "",
    seekerNotes: "",
    employerNotes: "",
    interviewDate: "",
    reminderDate: "",
    createdAt: now(),
  };
}

// Job save / unsave. Return: "saved" | "removed" | "applied" (pehle se apply ho chuka)
export function toggleSaved(user, job) {
  const list = getApplications();
  const existing = list.find((a) => a.jobId === job.id && a.seekerId === user.id);

  if (!existing) {
    const record = { ...baseRecord(user), jobId: job.id, external: null, status: "saved", history: [{ status: "saved", at: now() }] };
    save([record, ...list]);
    return "saved";
  }
  if (existing.status === "saved") {
    save(list.filter((a) => a.id !== existing.id));
    return "removed";
  }
  return "applied";
}

export function applyToJob(user, job, { coverNote = "", resumeLink = "" }) {
  if (job.status !== "open") throw new Error("Ye job ab band ho chuki hai.");

  const list = getApplications();
  const existing = list.find((a) => a.jobId === job.id && a.seekerId === user.id);
  if (existing && existing.status !== "saved") {
    throw new Error("Aap is job par pehle hi apply kar chuke ho.");
  }

  if (existing) {
    // Saved se Applied
    save(
      list.map((a) =>
        a.id === existing.id
          ? { ...a, status: "applied", coverNote, resumeLink, applicant: snapshot(user), createdAt: now(), history: [...a.history, { status: "applied", at: now() }] }
          : a
      )
    );
    return existing.id;
  }

  const record = { ...baseRecord(user), jobId: job.id, external: null, status: "applied", coverNote, resumeLink, history: [{ status: "applied", at: now() }] };
  save([record, ...list]);
  return record.id;
}

// Kisi aur site par apply kiya hua job manually add karna
export function createExternal(user, { title, company, link = "", status = "applied" }) {
  const record = {
    ...baseRecord(user),
    jobId: null,
    external: { title: title.trim(), company: company.trim(), link: link.trim() },
    status,
    history: [{ status, at: now() }],
  };
  save([record, ...getApplications()]);
  return record;
}

// Status badalna (seeker aur employer dono yahi function use karte hain)
export function changeStatus(id, status) {
  save(
    getApplications().map((a) => {
      if (a.id !== id || a.status === status) return a;
      return { ...a, status, history: [...a.history, { status, at: now() }] };
    })
  );
}

// Notes, dates jaise baaki fields badalna
export function patchApplication(id, changes) {
  save(getApplications().map((a) => (a.id === id ? { ...a, ...changes } : a)));
}

export function deleteApplication(id) {
  save(getApplications().filter((a) => a.id !== id));
}

export function deleteByJob(jobId) {
  save(getApplications().filter((a) => a.jobId !== jobId));
}
