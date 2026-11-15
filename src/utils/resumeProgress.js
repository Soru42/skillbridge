// Har section ka naam aur uska "bhara hai ya nahi" check, ek hi jagah
const SECTION_CHECKS = [
  {
    name: "Personal details",
    isDone: (r) => Boolean(r.personal?.fullName && r.personal?.email),
  },
  {
    name: "Summary",
    isDone: (r) => Boolean(r.summary && r.summary.trim() !== ""),
  },
  {
    name: "Education",
    isDone: (r) => Boolean(r.education && r.education.length > 0),
  },
  {
    name: "Skills",
    isDone: (r) =>
      Object.values(r.skills || {}).some((value) => String(value).trim() !== ""),
  },
  {
    name: "Projects",
    isDone: (r) => Boolean(r.projects && r.projects.length > 0),
  },
  {
    name: "Experience",
    isDone: (r) => Boolean(r.experience && r.experience.length > 0),
  },
];

// Wo sections ke naam jo abhi khaali hain
export function getMissingSections(resume) {
  const safeResume = resume || {};
  return SECTION_CHECKS.filter((section) => !section.isDone(safeResume)).map(
    (section) => section.name
  );
}

// Resume kitna bhara hai, % me
export function getResumeProgress(resume) {
  if (!resume) {
    return 0;
  }
  const total = SECTION_CHECKS.length;
  const missingCount = getMissingSections(resume).length;
  return Math.round(((total - missingCount) / total) * 100);
}