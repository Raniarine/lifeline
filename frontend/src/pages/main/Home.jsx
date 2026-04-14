import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/layout/BottomNav.jsx";
import Navbar from "../../components/layout/Navbar.jsx";
import EmergencyCard from "../../components/medical/EmergencyCard.jsx";
import InfoCard from "../../components/medical/InfoCard.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { QUICK_ACTIONS, ROUTES } from "../../utils/constants.js";
import { firstName, formatList } from "../../utils/helpers.js";

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <main className="screen">
      <section className="mobile-shell">
        <Navbar title={`Bonjour, ${firstName(user?.fullName)}`} subtitle="Accueil securise" />

        <div className="app-content">
          <Card className="hero-panel" eyebrow="Mode urgence" title="Votre centre de controle medical">
            <p className="section-copy">
              Retrouvez votre profil, le QR LifeLine et les informations vitales
              a afficher en un geste.
            </p>

            <div className="hero-actions">
              <Button onClick={() => navigate(ROUTES.qr)}>Generer QR</Button>
              <Button variant="secondary" onClick={() => navigate(ROUTES.medicalForm)}>
                Completer le dossier
              </Button>
            </div>
          </Card>

          <div className="info-grid">
            <InfoCard label="Groupe sanguin" value={user?.bloodType || "O+"} />
            <InfoCard label="Allergies" value={formatList(user?.allergies)} tone="soft" />
            <InfoCard label="Contact urgent" value={user?.emergencyContact || "Non renseigne"} />
          </div>

          <Card eyebrow="Actions rapides" title="Raccourcis LifeLine">
            <div className="action-list">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.route}
                  type="button"
                  className="action-item"
                  onClick={() => navigate(action.route)}
                >
                  <div>
                    <strong>{action.title}</strong>
                    <p>{action.description}</p>
                  </div>
                  <span className="action-arrow">{">"}</span>
                </button>
              ))}
            </div>
          </Card>

          <EmergencyCard profile={user} />

          <div className="split-actions">
            <Button variant="ghost" onClick={() => navigate(ROUTES.profile)}>
              Mon profil
            </Button>
            <Button variant="ghost" onClick={logout}>
              Se deconnecter
            </Button>
          </div>
        </div>

        <BottomNav />
      </section>
    </main>
  );
}
