import { Link } from "react-router-dom";
import BottomNav from "../../components/layout/BottomNav.jsx";
import Navbar from "../../components/layout/Navbar.jsx";
import InfoCard from "../../components/medical/InfoCard.jsx";
import Card from "../../components/ui/Card.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { ROUTES } from "../../utils/constants.js";
import { getInitials } from "../../utils/helpers.js";

export default function Profile() {
  const { user } = useAuth();

  return (
    <main className="screen">
      <section className="mobile-shell">
        <Navbar title="Profil" subtitle="Vos informations de base" />

        <div className="app-content">
          <Card className="profile-hero-card">
            <div className="profile-hero">
              <span className="profile-avatar">{getInitials(user?.fullName || "LL")}</span>
              <div>
                <h2>{user?.fullName}</h2>
                <p>{user?.email}</p>
              </div>
            </div>

            <div className="info-grid">
              <InfoCard label="Telephone" value={user?.phone || "Non renseigne"} />
              <InfoCard label="Groupe sanguin" value={user?.bloodType || "O+"} tone="soft" />
              <InfoCard label="Ville" value={user?.city || "Non renseignee"} />
              <InfoCard label="Contact d'urgence" value={user?.emergencyContact || "Non renseigne"} tone="soft" />
            </div>

            <div className="split-actions">
              <Link to={ROUTES.editProfile} className="button button-primary">
                Modifier
              </Link>
              <Link to={ROUTES.medicalForm} className="button button-secondary">
                Medical
              </Link>
            </div>
          </Card>
        </div>

        <BottomNav />
      </section>
    </main>
  );
}
