import { formatList, getInitials } from "../../utils/helpers.js";

function EmergencyRow({ tone = "red", title, value, symbol }) {
  return (
    <div className="emergency-info-row">
      <span className={`emergency-info-icon emergency-info-icon-${tone}`} aria-hidden="true">
        {symbol}
      </span>
      <div className="emergency-info-copy">
        <strong>{title}</strong>
        <span>{value}</span>
      </div>
    </div>
  );
}

export default function EmergencyCard({ profile }) {
  const allergies = formatList(profile?.allergies);
  const conditions = formatList(profile?.conditions);
  const medications = formatList(profile?.medications);

  return (
    <article className="emergency-card">
      <header className="emergency-alert-banner">
        <span className="emergency-banner-bag" aria-hidden="true">
          +
        </span>
        <strong>Urgence medicale</strong>
      </header>

      <div className="emergency-card-body">
        <h2 className="emergency-patient-name">{profile?.fullName}</h2>

        <div className="emergency-stack emergency-stack-tight">
          <EmergencyRow
            tone="red"
            symbol="+"
            title={`${profile?.bloodType || "Non renseigne"} - Groupe sanguin`}
            value="Information vitale"
          />
          <EmergencyRow
            tone="red"
            symbol="!"
            title="Allergies"
            value={allergies}
          />
          <EmergencyRow
            tone="blue"
            symbol="i"
            title="Maladies chroniques"
            value={conditions}
          />
          {medications !== "Non renseigne" ? (
            <EmergencyRow
              tone="blue"
              symbol="Rx"
              title="Medicaments"
              value={medications}
            />
          ) : null}
        </div>

        <div className="emergency-doctor-block">
          <span className="emergency-section-label">Medecin.</span>
          <article className="emergency-doctor-card">
            <div className="emergency-doctor-main">
              <span className="emergency-avatar">{getInitials(profile?.doctor || "DR")}</span>
              <div className="emergency-doctor-copy">
                <strong>{profile?.doctor || "Medecin non renseigne"}</strong>
                <span>{profile?.doctorSpeciality || "Medecin generaliste"}</span>
                <span>{profile?.emergencyContact || "Contact d'urgence non renseigne"}</span>
              </div>
            </div>
            <span className="emergency-doctor-arrow">{">"}</span>
          </article>

          <div className="emergency-clinic-line">
            <span>Cabinet : {profile?.doctorPhone || profile?.phone || "Non renseigne"}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
