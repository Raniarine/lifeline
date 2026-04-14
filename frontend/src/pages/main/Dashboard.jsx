import BottomNav from "../../components/layout/BottomNav.jsx";
import Navbar from "../../components/layout/Navbar.jsx";
import InfoCard from "../../components/medical/InfoCard.jsx";
import Card from "../../components/ui/Card.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { EMERGENCY_STEPS } from "../../utils/constants.js";
import { formatList } from "../../utils/helpers.js";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <main className="screen">
      <section className="mobile-shell">
        <Navbar title="Dashboard" subtitle="Lecture rapide de votre profil" />

        <div className="app-content">
          <Card eyebrow="Synthese" title="Informations prioritaires">
            <div className="info-grid">
              <InfoCard label="Nom" value={user?.fullName} />
              <InfoCard label="Telephone" value={user?.phone} tone="soft" />
              <InfoCard label="Ville" value={user?.city || "Non renseignee"} />
              <InfoCard label="Medecin" value={user?.doctor || "Non renseigne"} tone="soft" />
            </div>
          </Card>

          <Card eyebrow="Dossier medical" title="Lecture secondaire">
            <div className="detail-stack">
              <div className="detail-panel">
                <span>Allergies</span>
                <strong>{formatList(user?.allergies)}</strong>
              </div>
              <div className="detail-panel">
                <span>Pathologies</span>
                <strong>{formatList(user?.conditions)}</strong>
              </div>
              <div className="detail-panel">
                <span>Medicaments</span>
                <strong>{formatList(user?.medications)}</strong>
              </div>
            </div>
          </Card>

          <Card eyebrow="Checklist" title="Rappel secouriste">
            <div className="timeline-list">
              {EMERGENCY_STEPS.map((step, index) => (
                <div key={step} className="timeline-item">
                  <span className="timeline-index">0{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <BottomNav />
      </section>
    </main>
  );
}
