import { classNames } from "../../utils/helpers.js";

export default function InfoCard({ label, value, tone = "blue" }) {
  return (
    <article className={classNames("info-card", `info-card-${tone}`)}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
