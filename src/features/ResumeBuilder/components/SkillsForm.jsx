import FormField from "./FormField.jsx";

function SkillsForm({ skills, onChange }) {
  return (
    <section className="rb-section">
      <h2>Technical Skills</h2>
      <p className="rb-hint">Separate skills with commas.</p>

      <FormField
        id="languages"
        label="Programming Languages"
        value={skills.languages}
        placeholder="Java, JavaScript, Python"
        onChange={(value) => onChange("languages", value)}
      />
      <FormField
        id="frameworks"
        label="Frameworks and Libraries"
        value={skills.frameworks}
        placeholder="React, Bootstrap, Spring Boot"
        onChange={(value) => onChange("frameworks", value)}
      />
      <FormField
        id="databases"
        label="Databases"
        value={skills.databases}
        placeholder="MySQL, MongoDB"
        onChange={(value) => onChange("databases", value)}
      />
      <FormField
        id="tools"
        label="Development Tools"
        value={skills.tools}
        placeholder="Git, GitHub, VS Code, Postman"
        onChange={(value) => onChange("tools", value)}
      />
    </section>
  );
}

export default SkillsForm;