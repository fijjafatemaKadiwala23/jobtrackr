export const ROLES = { SEEKER: "seeker", EMPLOYER: "employer" };

export const STATUS = {
  SAVED: "saved",
  APPLIED: "applied",
  SHORTLISTED: "shortlisted",
  INTERVIEW: "interview",
  OFFER: "offer",
  REJECTED: "rejected",
};

export const SEEKER_COLUMNS = ["saved", "applied", "interview", "offer", "rejected"];
export const EMPLOYER_COLUMNS = ["applied", "shortlisted", "interview", "offer", "rejected"];

export const SEEKER_LABELS = {
  saved: "Saved",
  applied: "Applied",
  shortlisted: "Shortlisted",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};
// Employer ko "offer" ki jagah "Hired" dikhta hai
export const EMPLOYER_LABELS = { ...SEEKER_LABELS, offer: "Hired" };

// Badge colors (Journey Line palette)
export const STATUS_STYLES = {
  saved: "bg-slate-100 text-slate-700",
  applied: "bg-lagoon/10 text-lagoon",
  shortlisted: "bg-lagoon-light/20 text-lagoon",
  interview: "bg-marigold/20 text-amber-800",
  offer: "bg-pine/10 text-pine",
  rejected: "bg-plum/10 text-plum",
};

// Route line / column header ke dots
export const STATUS_DOT = {
  saved: "bg-slate-400",
  applied: "bg-lagoon",
  shortlisted: "bg-lagoon-light",
  interview: "bg-marigold",
  offer: "bg-pine",
  rejected: "bg-plum",
};

export const JOB_TYPES = ["Full-time", "Part-time", "Internship", "Remote"];
export const EXPERIENCE_LEVELS = ["Fresher", "0-1 years", "1-3 years", "3-5 years", "5+ years"];

export const KEYS = {
  USERS: "jt_users",
  JOBS: "jt_jobs",
  APPLICATIONS: "jt_applications",
  SAVED: "jt_saved",
  SESSION: "jt_session",
  THEME: "jt_theme",
};
