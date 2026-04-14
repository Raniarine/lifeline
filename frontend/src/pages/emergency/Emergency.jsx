import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import EmergencyCard from "../../components/medical/EmergencyCard.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Loader from "../../components/ui/Loader.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { decodeEmergencyData, getEmergencyPreview } from "../../services/qrService.js";
import { DEFAULT_PROFILE, ROUTES } from "../../utils/constants.js";

export default function Emergency() {
  const { shareId } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [preview, setPreview] = useState(null);
  const sharedDataParam = searchParams.get("data");
  const sharedProfile = useMemo(() => decodeEmergencyData(sharedDataParam), [sharedDataParam]);

  useEffect(() => {
    let cancelled = false;

    const sourceProfile = sharedProfile || user || DEFAULT_PROFILE;

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
  }, [shareId, sharedProfile, user]);

  if (!preview) {
    return <Loader label="Chargement de la carte d'urgence..." />;
  }

  return (
    <main className="screen emergency-screen">
      <section className="emergency-shell">
        <Card className="emergency-wrapper">
          <EmergencyCard
            profile={{
              ...preview.identity,
              allergies: preview.allergies,
              conditions: preview.conditions,
              medications: preview.medications,
              emergencyContact: preview.emergencyContact,
              doctor: preview.doctor,
              doctorSpeciality: preview.doctorSpeciality,
              doctorPhone: preview.doctorPhone,
              notes: preview.notes,
            }}
          />

          <div className="emergency-actions">
            <a href={`tel:${preview.identity.phone || "0612345678"}`} className="button button-emergency">
              Appeler
            </a>
          </div>

          <div className="emergency-secondary-actions">
            <Button variant="ghost" onClick={() => window.print()}>
              Imprimer
            </Button>
            <Link to={ROUTES.home} className="text-link emergency-back-link">
              Retour a l'app
            </Link>
          </div>
        </Card>
      </section>
    </main>
  );
}
