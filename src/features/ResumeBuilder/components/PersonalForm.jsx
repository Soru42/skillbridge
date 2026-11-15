import FormField from "./FormField.jsx";

function PersonalForm({ personal, onChange }) {
  return (
    <section className="rb-section">
      <h2>Personal Information</h2>

      <FormField
        id="fullName"
        label="Full Name"
        value={personal.fullName}
        onChange={(value) => onChange("fullName", value)}
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        value={personal.email}
        onChange={(value) => onChange("email", value)}
      />
      <FormField
        id="phone"
        label="Phone"
        type="tel"
        value={personal.phone}
        onChange={(value) => onChange("phone", value)}
      />
      <FormField
        id="location"
        label="City / Location"
        value={personal.location}
        onChange={(value) => onChange("location", value)}
      />
      <FormField
        id="linkedin"
        label="LinkedIn URL"
        value={personal.linkedin}
        onChange={(value) => onChange("linkedin", value)}
      />
      <FormField
        id="github"
        label="GitHub URL"
        value={personal.github}
        onChange={(value) => onChange("github", value)}
      />
    </section>
  );
}

export default PersonalForm;