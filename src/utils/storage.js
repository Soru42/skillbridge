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

localStorage.setItem("skillbridgejobs", JSON.stringify([
  { id: 1, jobTitle: "Frontend Developer", company: "Tech Solutions", dateAnalyzed: "2026-11-02", matchPercent: 78, matchedSkills: ["React", "JavaScript", "HTML5", "CSS"], missingSkills: ["Node.js", "MongoDB", "REST APIs"] }
]));