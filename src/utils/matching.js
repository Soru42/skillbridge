const knownSkills = [
  // Web development
  "html", "css", "javascript", "typescript", "react", "angular", "vue",
  "bootstrap", "tailwind", "redux", "next.js", "node.js", "express",
  "rest api", "graphql", "responsive design", "figma", "wordpress",

  // App development
  "android", "kotlin", "flutter", "dart", "react native", "swift",
  "ios", "firebase", "android studio",

  // Backend and programming
  "java", "spring boot", "python", "django", "flask", "php", "c++",
  "c#", ".net", "microservices", "oop", "data structures", "algorithms",
  "problem solving",

  // Databases
  "sql", "mysql", "postgresql", "mongodb", "oracle", "redis",

  // AI / ML / Data
  "machine learning", "deep learning", "artificial intelligence",
  "nlp", "computer vision", "tensorflow", "pytorch", "scikit-learn",
  "pandas", "numpy", "data analysis", "data science", "power bi",
  "tableau", "excel", "statistics", "opencv",

  // IT, DevOps and cloud
  "git", "github", "docker", "kubernetes", "aws", "azure",
  "google cloud", "linux", "jenkins", "ci/cd", "postman", "jira",
  "networking", "system administration", "troubleshooting",

  // Cybersecurity
  "cyber security", "ethical hacking", "penetration testing",
  "network security", "cryptography", "wireshark", "kali linux",
  "owasp", "siem", "vulnerability assessment", "firewall",

  // Civil engineering
  "autocad", "staad pro", "revit", "etabs", "primavera", "ms project",
  "surveying", "structural analysis", "structural design",
  "estimation and costing", "quantity surveying", "site supervision",
  "construction management", "concrete technology", "geotechnical",
  "bim",

  // Electrical and electronics
  "plc", "scada", "matlab", "simulink", "embedded systems", "arduino",
  "raspberry pi", "circuit design", "pcb design", "power systems",
  "power electronics", "vlsi", "iot", "microcontroller",
  "electrical wiring", "control systems",

  // Mechanical engineering
  "solidworks", "catia", "ansys", "creo", "cad", "cam", "cnc",
  "thermodynamics", "fluid mechanics", "hvac", "3d printing",
  "manufacturing", "quality control", "six sigma", "lean manufacturing",
  "gd&t", "product design",

];

// Soft skills are checked separately and do not change the match percentage
export const softSkills = [
  "communication", "problem solving", "teamwork", "leadership",
  "time management", "project management", "technical writing",
  "critical thinking", "adaptability",
];

// Checks if a skill appears as a whole word in the text
function hasSkill(text, skill) {
  // Escape special characters like + . / so regex treats them as normal text
  const safeSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // The skill must not have a letter or number just before or after it
  const regex = new RegExp("(?<![a-z0-9])" + safeSkill + "(?![a-z0-9])");

  return regex.test(text);
}

export function analyzeJob(userSkills, jobDescription) {
  // Lowercase the text and treat "problem-solving" same as "problem solving"
  const text = jobDescription
    .toLowerCase()
    .replace("problem-solving", "problem solving");

  const cleanUserSkills = userSkills.map((skill) => skill.trim().toLowerCase());

  // Technical skills
  const jobSkills = knownSkills.filter((skill) => hasSkill(text, skill));

  cleanUserSkills.forEach((skill) => {
    const isSoft = softSkills.includes(skill);
    if (!isSoft && hasSkill(text, skill) && !jobSkills.includes(skill)) {
      jobSkills.push(skill);
    }
  });

  const matchedSkills = jobSkills.filter((skill) => cleanUserSkills.includes(skill));
  const missingSkills = jobSkills.filter((skill) => !cleanUserSkills.includes(skill));

  // Soft skills (separate, not part of the percentage)
  const jobSoftSkills = softSkills.filter((skill) => hasSkill(text, skill));
  const softMatched = jobSoftSkills.filter((skill) => cleanUserSkills.includes(skill));
  const softMissing = jobSoftSkills.filter((skill) => !cleanUserSkills.includes(skill));

  let matchPercent = 0;
  if (jobSkills.length > 0) {
    matchPercent = Math.round((matchedSkills.length / jobSkills.length) * 100);
  }

  return { matchPercent, matchedSkills, missingSkills, softMatched, softMissing };
}

