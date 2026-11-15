// Special characters (jaise + . #) ko safe banata hai, taaki "c++" ya "node.js" regex me na toote
function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Kya text me ye skill poore shabd ki tarah maujood hai?
// "java" ko "javascript" ke andar match nahi hona chahiye, isliye aage-peeche alphabet/number nahi hona chahiye.
function containsSkill(text, skill) {
  const pattern = new RegExp(
    `(^|[^a-z0-9+#])${escapeRegExp(skill)}($|[^a-z0-9+#])`
  );
  return pattern.test(text);
}

// Resume ka saara useful text ek lowercase string me jodta hai
export function getResumeText(resume) {
  const parts = [
    resume.summary,
    ...Object.values(resume.skills || {}),
    ...(resume.projects || []).flatMap((p) => [p.name, p.description, p.tech]),
    ...(resume.experience || []).flatMap((e) => [e.role, e.details]),
    resume.certifications,
  ];
  return parts.filter(Boolean).join(" ").toLowerCase();
}

// Saved jobs ki missing skills gino, aur wahi rakho jo resume me nahi hain
export function getKeywordSuggestions(resume, jobs) {
  const resumeText = getResumeText(resume);
  const counts = {};

  jobs.forEach((job) => {
    (job.missingSkills || []).forEach((skill) => {
      const key = String(skill).trim().toLowerCase();
      if (key === "") return;
      counts[key] = (counts[key] || 0) + 1;
    });
  });

  return Object.entries(counts)
    .filter(([skill]) => !containsSkill(resumeText, skill))
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count);
}