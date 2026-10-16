export const generateId = (prefix = "id") =>
  prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-";

export const formatSalary = (min, max) =>
  "₹" + (min / 100000).toFixed(1) + "L - ₹" + (max / 100000).toFixed(1) + "L";

