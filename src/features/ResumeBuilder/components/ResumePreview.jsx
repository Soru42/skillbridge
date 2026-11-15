// Multi-line text ko alag-alag lines ki list me badalta hai (bullets ke liye)
function toLines(text) {
  return (text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function ResumePreview({ resume }) {
  const { personal, summary, education, skills, projects, experience, certifications } = resume;

  const contactLine = [personal.email, personal.phone, personal.location]
    .filter(Boolean)
    .join(" | ");
  const linksLine = [personal.linkedin, personal.github].filter(Boolean).join(" | ");

  const skillRows = [
    ["Programming Languages", skills.languages],
    ["Frameworks and Libraries", skills.frameworks],
    ["Databases", skills.databases],
    ["Development Tools", skills.tools],
  ].filter(([, value]) => value && value.trim() !== "");

  const certificationLines = toLines(certifications);

  return (
    <div className="rb-paper" id="resume-print-area">
      <h1 className="rb-name">{personal.fullName || "Your Name"}</h1>
      {contactLine && <p className="rb-contact">{contactLine}</p>}
      {linksLine && <p className="rb-contact">{linksLine}</p>}

      {(summary || "").trim() !== "" && (
        <section>
          <h2 className="rb-heading">Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      {skillRows.length > 0 && (
        <section>
          <h2 className="rb-heading">Technical Skills</h2>
          {skillRows.map(([label, value]) => (
            <p key={label}>
              <strong>{label}:</strong> {value}
            </p>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section>
          <h2 className="rb-heading">Education</h2>
          {education.map((item) => (
            <div className="rb-entry" key={item.id}>
              <div className="rb-row">
                <strong>{item.degree}</strong>
                <span>{item.year}</span>
              </div>
              <div>
                {item.college}
                {item.cgpa && ` | CGPA/Percentage: ${item.cgpa}`}
              </div>
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <h2 className="rb-heading">Projects</h2>
          {projects.map((item) => (
            <div className="rb-entry" key={item.id}>
              <strong>{item.name}</strong>
              {item.tech && <div>Technologies: {item.tech}</div>}
              <ul className="rb-bullets">
                {toLines(item.description).map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
              {(item.repoLink || item.demoLink) && (
                <div>
                  {[
                    item.repoLink && `GitHub: ${item.repoLink}`,
                    item.demoLink && `Live Demo: ${item.demoLink}`,
                  ]
                    .filter(Boolean)
                    .join(" | ")}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <h2 className="rb-heading">Experience</h2>
          {experience.map((item) => (
            <div className="rb-entry" key={item.id}>
              <div className="rb-row">
                <strong>{item.role}</strong>
                <span>{item.duration}</span>
              </div>
              <div>{item.organization}</div>
              <ul className="rb-bullets">
                {toLines(item.details).map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {certificationLines.length > 0 && (
        <section>
          <h2 className="rb-heading">Certifications and Achievements</h2>
          <ul className="rb-bullets">
            {certificationLines.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default ResumePreview;