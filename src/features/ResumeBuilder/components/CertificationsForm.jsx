import FormField from "./FormField.jsx";

function CertificationsForm({ certifications, onChange }) {
  return (
    <section className="rb-section">
      <h2>Certifications and Achievements</h2>
      <FormField
        id="certifications"
        label="One per line"
        multiline
        rows={4}
        value={certifications}
        onChange={onChange}
      />
    </section>
  );
}

export default CertificationsForm;