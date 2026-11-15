import FormField from "./FormField.jsx";

function EducationForm({ items, onAdd, onUpdate, onRemove }) {
  return (
    <section className="rb-section">
      <h2>Education</h2>

      {items.length === 0 && <p className="rb-hint">No education added yet.</p>}

      {items.map((item) => (
        <div className="rb-card" key={item.id}>
          <FormField
            id={`edu-degree-${item.id}`}
            label="Degree and Branch"
            value={item.degree}
            placeholder="B.Tech in Computer Science"
            onChange={(value) => onUpdate(item.id, "degree", value)}
          />
          <FormField
            id={`edu-college-${item.id}`}
            label="College / University"
            value={item.college}
            onChange={(value) => onUpdate(item.id, "college", value)}
          />
          <FormField
            id={`edu-year-${item.id}`}
            label="Graduation Year"
            value={item.year}
            placeholder="2027"
            onChange={(value) => onUpdate(item.id, "year", value)}
          />
          <FormField
            id={`edu-cgpa-${item.id}`}
            label="CGPA / Percentage"
            value={item.cgpa}
            onChange={(value) => onUpdate(item.id, "cgpa", value)}
          />
          <button className="rb-btn rb-btn-danger" onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <button className="rb-btn rb-btn-secondary" onClick={onAdd}>
        + Add Education
      </button>
    </section>
  );
}

export default EducationForm;