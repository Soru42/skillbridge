
function FormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  multiline = false,
  rows = 3,
}) {
  return (
    <div className="rb-field">
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          value={value || ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value || ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

export default FormField;