import { getData, setData } from "./storage";
import { KEYS } from "@/utils/constants";
import { generateId } from "@/utils/helpers";
import { seedJobs } from "@/data/seed";

// Jobs list lao. Pehli baar khali ho to seed jobs bhar do.
export function getJobs() {
  const jobs = getData(KEYS.JOBS, null);
  if (!jobs) {
    setData(KEYS.JOBS, seedJobs);
    return seedJobs;
  }
  return jobs;
}

export function getJobById(id) {
  return getJobs().find((job) => job.id === id) || null;
}

export function createJob(data) {
  const job = {
    ...data,
    id: generateId("j"),
    status: "open",
    createdAt: new Date().toISOString(),
  };
  setData(KEYS.JOBS, [job, ...getJobs()]);
  return job;
}

export function updateJob(id, changes) {
  const jobs = getJobs().map((job) => (job.id === id ? { ...job, ...changes } : job));
  setData(KEYS.JOBS, jobs);
}

export function deleteJob(id) {
  setData(KEYS.JOBS, getJobs().filter((job) => job.id !== id));
}
