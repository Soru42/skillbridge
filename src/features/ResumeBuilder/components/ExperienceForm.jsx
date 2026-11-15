import FormField from "./FormField.jsx";

function ProjectsForm({ items, onAdd, onUpdate, onRemove }) {
  return (
    <section className="rb-section">
      <h2>Projects</h2>

      {items.length === 0 && <p className="rb-hint">No projects added yet.</p>}

      {items.map((item) => (
        <div className="rb-card" key={item.id}>
          <FormField
            id={`proj-name-${item.id}`}
            label="Project Name"
            value={item.name}
            onChange={(value) => onUpdate(item.id, "name", value)}
          />
          <FormField
            id={`proj-desc-${item.id}`}
            label="Description (one point per line)"
            multiline
            rows={4}
            value={item.description}
            placeholder={"Built a job matcher that compares skills with job descriptions\nSaved data using localStorage"}
            onChange={(value) => onUpdate(item.id, "description", value)}
          />
          <FormField
            id={`proj-tech-${item.id}`}
            label="Technologies Used"
            value={item.tech}
            placeholder="React, Vite, CSS"
            onChange={(value) => onUpdate(item.id, "tech", value)}
          />
          <FormField
            id={`proj-repo-${item.id}`}
            label="GitHub Repository Link"
            value={item.repoLink}
            onChange={(value) => onUpdate(item.id, "repoLink", value)}
          />
          <FormField
            id={`proj-demo-${item.id}`}
            label="Live Demo Link"
            value={item.demoLink}
            onChange={(value) => onUpdate(item.id, "demoLink", value)}
          />
          <button className="rb-btn rb-btn-danger" onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <button className="rb-btn rb-btn-secondary" onClick={onAdd}>
        + Add Project
      </button>
    </section>
  );
}

export default ProjectsForm;