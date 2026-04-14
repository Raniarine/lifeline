import { buildQrMatrix } from "../../utils/helpers.js";

export default function QRCard({ profile, shareId }) {
  const matrix = buildQrMatrix(shareId || profile?.emergencyId || profile?.fullName);

  return (
    <article className="qr-card">
      <div className="qr-frame">
        <div className="qr-grid" aria-hidden="true">
          {matrix.flat().map((cell, index) => (
            <span key={`${shareId}-${index}`} className={cell ? "qr-cell active" : "qr-cell"} />
          ))}
        </div>
      </div>

      <div className="qr-copy">
        <strong>{profile?.fullName}</strong>
        <span>ID d'urgence: {shareId || profile?.emergencyId}</span>
        <p>Scannez ce QR pour afficher le groupe sanguin, les allergies et le contact d'urgence.</p>
      </div>
    </article>
  );
}
