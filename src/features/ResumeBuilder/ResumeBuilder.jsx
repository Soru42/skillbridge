import { useState, useEffect } from "react";
import {
  emptyResume,
  createEducation,
  createProject,
  createExperience,
} from "./utils/emptyResume.js";
import { getResume, saveResume } from "../../utils/storage.js";
import PersonalForm from "./components/PersonalForm.jsx";
import SummaryForm from "./components/SummaryForm.jsx";
import SkillsForm from "./components/SkillsForm.jsx";
import EducationForm from "./components/EducationForm.jsx";
import ProjectsForm from "./components/ProjectsForm.jsx";
import ExperienceForm from "./components/ExperienceForm.jsx";
import CertificationsForm from "./components/CertificationsForm.jsx";
import ResumePreview from "./components/ResumePreview.jsx";
import "./ResumeBuilder.css";
import KeywordSuggestions from "./components/KeywordSuggestions.jsx";


const itemCreators = {
  education: createEducation,
  projects: createProject,
  experience: createExperience,
};

function ResumeBuilder() {

  const [resume, setResume] = useState(() => {
    const saved = getResume() || {};
    return {
      ...emptyResume,
      ...saved,
      personal: { ...emptyResume.personal, ...saved.personal },
      skills: { ...emptyResume.skills, ...saved.skills },
    };
  });


  useEffect(() => {
    saveResume(resume);
  }, [resume]);

  // ---------- Single cheezein ----------
  function updatePersonal(field, value) {
    setResume({ ...resume, personal: { ...resume.personal, [field]: value } });
  }

  function updateSkills(field, value) {
    setResume({ ...resume, skills: { ...resume.skills, [field]: value } });
  }

  function updateField(field, value) {
    setResume({ ...resume, [field]: value });
  }

  // ---------- List wali cheezein (education, projects, experience) ----------
  function addItem(section) {
    const newItem = itemCreators[section]();
    setResume({ ...resume, [section]: [...resume[section], newItem] });
  }

  function updateItem(section, id, field, value) {
    const updatedList = resume[section].map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setResume({ ...resume, [section]: updatedList });
  }

  function removeItem(section, id) {
    const filteredList = resume[section].filter((item) => item.id !== id);
    setResume({ ...resume, [section]: filteredList });
  }

  return (
    <div className="rb-page">
      <div className="rb-header">
        <h1>Resume Builder</h1>
        <button className="rb-btn" onClick={() => window.print()}>
          Download / Print PDF
        </button>
      </div>

      <div className="rb-layout">
        <div className="rb-form-side">
          <PersonalForm personal={resume.personal} onChange={updatePersonal} />

          <SummaryForm
            summary={resume.summary}
            onChange={(value) => updateField("summary", value)}
          />

          <SkillsForm skills={resume.skills} onChange={updateSkills} />
          <KeywordSuggestions resume={resume} />

          <EducationForm
            items={resume.education}
            onAdd={() => addItem("education")}
            onUpdate={(id, field, value) => updateItem("education", id, field, value)}
            onRemove={(id) => removeItem("education", id)}
          />

          <ProjectsForm
            items={resume.projects}
            onAdd={() => addItem("projects")}
            onUpdate={(id, field, value) => updateItem("projects", id, field, value)}
            onRemove={(id) => removeItem("projects", id)}
          />

          <ExperienceForm
            items={resume.experience}
            onAdd={() => addItem("experience")}
            onUpdate={(id, field, value) => updateItem("experience", id, field, value)}
            onRemove={(id) => removeItem("experience", id)}
          />

          <CertificationsForm
            certifications={resume.certifications}
            onChange={(value) => updateField("certifications", value)}
          />
        </div>

        <div className="rb-preview-side">
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;