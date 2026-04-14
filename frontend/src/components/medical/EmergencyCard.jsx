import { formatList } from "../../utils/helpers.js";

export default function EmergencyCard({ profile }) {
  return (
    <article className="emergency-card">
      <header className="emergency-card-header">
        <span className="emergency-dot"></span>
        <strong>Urgence medicale</strong>
      </header>

      <div className="emergency-card-body">
        <div className="emergency-identity">
          <h2>{profile?.fullName}</h2>
          <span>{profile?.bloodType}</span>
        </div>

        <div className="emergency-stack">
          <div className="emergency-line">
            <span>Allergies</span>
            <strong>{formatList(profile?.allergies)}</strong>
          </div>
          <div className="emergency-line">
            <span>Pathologies</span>
            <strong>{formatList(profile?.conditions)}</strong>
          </div>
          <div className="emergency-line">
            <span>Medicaments</span>
            <strong>{formatList(profile?.medications)}</strong>
          </div>
          <div className="emergency-line">
            <span>Contact</span>
            <strong>{profile?.emergencyContact || "Non renseigne"}</strong>
          </div>
          <div className="emergency-line">
            <span>Medecin</span>
            <strong>{profile?.doctor || "Non renseigne"}</strong>
          </div>
        </div>
      </div>
    </article>
  );
}
