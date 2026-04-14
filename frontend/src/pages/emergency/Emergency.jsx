import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmergencyCard from "../../components/medical/EmergencyCard.jsx";
import Card from "../../components/ui/Card.jsx";
import Loader from "../../components/ui/Loader.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { getEmergencyPreview } from "../../services/qrService.js";
import { DEFAULT_PROFILE, ROUTES } from "../../utils/constants.js";

export default function Emergency() {
  const { shareId } = useParams();
  const { user } = useAuth();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const sourceProfile = user || DEFAULT_PROFILE;

    getEmergencyPreview({
      ...sourceProfile,
      emergencyId: shareId || sourceProfile.emergencyId,
    }).then((data) => {
      if (!cancelled) {
        setPreview(data);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [shareId, user]);

  if (!preview) {
    return <Loader label="Chargement de la carte d'urgence..." />;
  }

  return (
    <main className="screen emergency-screen">
      <section className="emergency-shell">
        <Card className="emergency-wrapper" eyebrow="Acces secouriste" title="Carte d'urgence LifeLine">
          <EmergencyCard
            profile={{
              ...preview.identity,
              allergies: preview.allergies,
              conditions: preview.conditions,
              medications: preview.medications,
              emergencyContact: preview.emergencyContact,
              doctor: preview.doctor,
            }}
          />

          <div className="emergency-actions">
            <a href={`tel:${preview.identity.phone || "0612345678"}`} className="button button-primary">
              Appeler le patient
            </a>
            <Link to={ROUTES.home} className="button button-secondary">
              Retour a l'app
            </Link>
          </div>
        </Card>
      </section>
    </main>
  );
}
