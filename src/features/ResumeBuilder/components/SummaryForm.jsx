import FormField from "./FormField.jsx";

function SummaryForm({ summary, onChange }) {
  return (
    <section className="rb-section">
      <h2>Professional Summary</h2>
      <FormField
        id="summary"
        label="Summary (2-3 lines)"
        multiline
        rows={4}
        value={summary}
        placeholder="Final year CSE student skilled in React, JavaScript and Java, looking for ..."
        onChange={onChange}
      />
      <p className="rb-hint">{(summary || "").length} characters. 200-350 is a good length.</p>
    </section>
  );
}

export default SummaryForm;