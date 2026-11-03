const USER_KEY = "skillbridgeuse";
const JOBS_KEY = "skillbridgejobs";
const TASKS_KEY = "skillbridgetasks";

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  const data = localStorage.getItem(USER_KEY);
  return data === null ? null : JSON.parse(data);
}

export function getSavedJobs() {
  const data = localStorage.getItem(JOBS_KEY);
  return data === null ? [] : JSON.parse(data);
}

export function getRoadmapTasks() {
  const data = localStorage.getItem(TASKS_KEY);
  return data === null ? [] : JSON.parse(data);
}

