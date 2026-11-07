// Resume kitna bhara hai, ye % me batata hai
export function getResumeProgress(resume) {
  if (!resume) {
    return 0;
  }

  const personal = resume.personal || {};

  const checks = [
    Boolean(personal.fullName && personal.email),
    Boolean(resume.summary && resume.summary.trim() !== ""),
    Boolean(resume.education && resume.education.length > 0),
    Boolean(resume.skills && resume.skills.length > 0),
    Boolean(resume.projects && resume.projects.length > 0),
    Boolean(resume.experience && resume.experience.length > 0),
  ];

  const filled = checks.filter((item) => item === true).length;
  return Math.round((filled / checks.length) * 100);
}