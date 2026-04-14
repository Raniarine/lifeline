import { classNames } from "../../utils/helpers.js";

export default function Button({
  children,
  variant = "primary",
  block = false,
  className = "",
  ...props
}) {
  return (
    <button
      type="button"
      className={classNames("button", `button-${variant}`, block && "button-block", className)}
      {...props}
    >
      {children}
    </button>
  );
}
