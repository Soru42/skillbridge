// Khaali resume ka shape
export const emptyResume = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  education: [],
  skills: {
    languages: "",
    frameworks: "",
    databases: "",
    tools: "",
  },
  projects: [],
  experience: [],
  certifications: "",
};

// "Add" button dabane par ek naya khaali item banane wale functions.
// id se hum pehchante hain ki edit/delete kis item par karna hai.
export function createEducation() {
  return { id: Date.now(), degree: "", college: "", year: "", cgpa: "" };
}

export function createProject() {
  return {
    id: Date.now(),
    name: "",
    description: "",
    tech: "",
    repoLink: "",
    demoLink: "",
  };
}

export function createExperience() {
  return { id: Date.now(), organization: "", role: "", duration: "", details: "" };
}