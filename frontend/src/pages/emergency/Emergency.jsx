import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import EmergencyCard from "../../components/medical/EmergencyCard.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Loader from "../../components/ui/Loader.jsx";
import { buildEmergencyContactLabel, getEmergencyProfile } from "../../services/profileService.js";
import { decodeEmergencyPreview } from "../../services/qrService.js";
import { ROUTES } from "../../utils/constants.js";

export default function Emergency() {
  const { token } = useParams();
  const location = useLocation();
  const previewParam = useMemo(
    () => new URLSearchParams(location.search).get("preview") || "",
    [location.search]
  );
  const localPreview = useMemo(() => decodeEmergencyPreview(previewParam), [previewParam]);
  const [preview, setPreview] = useState(() => localPreview);
  const [error, setError] = useState(() => (localPreview ? "" : token ? "" : "QR token missing."));

  useEffect(() => {
    let cancelled = false;

    if (!token) {
      setPreview(localPreview);
      setError(localPreview ? "" : "QR token missing.");
      return () => {
        cancelled = true;
      };
    }

    setPreview(localPreview);
    setError("");

    getEmergencyProfile(token)
      .then((data) => {
        if (!cancelled) {
          setPreview(data.profile);
        }
      })
      .catch((nextError) => {
        if (!cancelled) {
          if (localPreview) {
            setPreview(localPreview);
            setError("");
          } else {
            setError(nextError.message);
          }
        }
      });

    return () => {
      cancelled = true;
    };
  }, [localPreview, token]);

  if (!preview && !error) {
    return <Loader label="Chargement de la carte d'urgence..." />;
  }

  if (error) {
    return (
      <main className="screen emergency-screen">
        <section className="emergency-shell">
          <Card className="emergency-wrapper">
            <p className="section-copy">{error}</p>
            <Link to={ROUTES.home} className="button button-primary">
              Retour a l'app
            </Link>
          </Card>
        </section>
      </main>
    );
  }

  const emergencyPhone = preview?.emergencyContact?.phone || "";
  const emergencyContactLabel = buildEmergencyContactLabel(preview?.emergencyContact);

  return (
    <main className="screen emergency-screen">
      <section className="emergency-shell">
        <Card className="emergency-wrapper">
          <EmergencyCard profile={preview} />

          <div className="emergency-actions">
            <a
              href={emergencyPhone ? `tel:${emergencyPhone}` : "#"}
              className="button button-emergency"
            >
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

          <p className="scanner-help scanner-help-inline">
            Contact d'urgence: {emergencyContactLabel}
          </p>
        </Card>
      </section>
    </main>
  );
}
