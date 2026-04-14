import { classNames } from "../../utils/helpers.js";

export default function Card({
  children,
  className = "",
  eyebrow,
  title,
  as = "article",
}) {
  const Element = as;

  return (
    <Element className={classNames("surface-card", className)}>
      {eyebrow ? <span className="soft-badge">{eyebrow}</span> : null}
      {title ? <h2 className="section-title">{title}</h2> : null}
      {children}
    </Element>
  );
}
