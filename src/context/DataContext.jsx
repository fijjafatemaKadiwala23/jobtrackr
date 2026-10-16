import { useState } from "react";
import { DataContext } from "./dataContextValue";
import * as jobService from "@/services/jobService";
import * as applicationService from "@/services/applicationService";

// Is file se sirf component export hota hai.
// Har action: service se localStorage me save -> phir state refresh, taaki UI apne aap update ho.
export function DataProvider({ children }) {
  const [jobs, setJobs] = useState(() => jobService.getJobs());
  const [applications, setApplications] = useState(() => applicationService.getApplications());

  const syncJobs = () => setJobs(jobService.getJobs());
  const syncApps = () => setApplications(applicationService.getApplications());

  // ---- Jobs (employer) ----
  const addJob = (data) => {
    const job = jobService.createJob(data);
    syncJobs();
    return job;
  };
  const editJob = (id, changes) => {
    jobService.updateJob(id, changes);
    syncJobs();
  };
  const removeJob = (id) => {
    jobService.deleteJob(id);
    applicationService.deleteByJob(id);
    syncJobs();
    syncApps();
  };

  // ---- Applications (seeker) ----
  const toggleSaveJob = (user, job) => {
    const result = applicationService.toggleSaved(user, job);
    syncApps();
    return result;
  };
  const applyToJob = (user, job, values) => {
    applicationService.applyToJob(user, job, values);
    syncApps();
  };
  const addExternalApplication = (user, data) => {
    const record = applicationService.createExternal(user, data);
    syncApps();
    return record;
  };
  const removeApplication = (id) => {
    applicationService.deleteApplication(id);
    syncApps();
  };

  // ---- Dono side ----
  const updateApplicationStatus = (id, status) => {
    applicationService.changeStatus(id, status);
    syncApps();
  };
  const updateApplication = (id, changes) => {
    applicationService.patchApplication(id, changes);
    syncApps();
  };

  const value = {
    jobs,
    applications,
    addJob,
    editJob,
    removeJob,
    toggleSaveJob,
    applyToJob,
    addExternalApplication,
    removeApplication,
    updateApplicationStatus,
    updateApplication,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
