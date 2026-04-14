import { classNames } from "../../utils/helpers.js";

export default function Input({
  label,
  hint,
  error,
  as = "input",
  options = [],
  className = "",
  ...props
}) {
  const Element = as === "textarea" ? "textarea" : as === "select" ? "select" : "input";

  return (
    <label className="field-group">
      {label ? <span className="field-label">{label}</span> : null}
      <Element
        className={classNames(
          "field-input",
          as === "select" && "field-select",
          as === "textarea" && "field-textarea",
          error && "field-input-error",
          className
        )}
        {...props}
      >
        {as === "select"
          ? options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))
          : null}
      </Element>
      {hint ? <span className="field-hint">{hint}</span> : null}
      {error ? <span className="feedback feedback-error">{error}</span> : null}
    </label>
  );
}
