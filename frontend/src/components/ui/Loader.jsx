export default function Loader({ label = "Chargement..." }) {
  return (
    <div className="loader-wrap" role="status" aria-live="polite">
      <span className="loader" aria-hidden="true"></span>
      <span>{label}</span>
    </div>
  );
}
