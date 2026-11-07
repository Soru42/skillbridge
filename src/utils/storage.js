const USER_KEY = "skillbridgeuse";
const JOBS_KEY = "skillbridgejobs";
const TASKS_KEY = "skillbridgetasks";
const RESUME_KEY = "skillbridgeresume";

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  const data = localStorage.getItem(USER_KEY);
  return data === null ? null : JSON.parse(data);
}

export function getSavedJobs() {
  try {
    const data = localStorage.getItem(JOBS_KEY);
    return data === null ? [] : JSON.parse(data);
  } catch (error) {
    console.error("Could not read saved jobs:", error);
    return [];
  }
}

// NEW: adds one job at the top of the saved jobs list
export function saveJob(job) {
  const jobs = getSavedJobs();
  const newJob = {
    ...job,
    id: Date.now(),
    dateAnalyzed: new Date().toISOString().slice(0, 10), // e.g. "2026-11-06"
  };
  localStorage.setItem(JOBS_KEY, JSON.stringify([newJob, ...jobs]));
}

// NEW: removes one job by its id (used on the Saved Jobs page later)
export function deleteJob(id) {
  const jobs = getSavedJobs().filter((job) => job.id !== id);
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

export function getRoadmapTasks() {
  const data = localStorage.getItem(TASKS_KEY);
  return data === null ? [] : JSON.parse(data);
}

export function getResume() {
  const data = localStorage.getItem(RESUME_KEY);
  return data === null ? null : JSON.parse(data);
}