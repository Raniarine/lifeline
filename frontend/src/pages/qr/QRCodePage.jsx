import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "../../components/layout/BottomNav.jsx";
import Navbar from "../../components/layout/Navbar.jsx";
import QRCard from "../../components/medical/QRCard.jsx";
import Card from "../../components/ui/Card.jsx";
import Loader from "../../components/ui/Loader.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { getQRCodeData } from "../../services/qrService.js";
import { ROUTES } from "../../utils/constants.js";

export default function QRCodePage() {
  const { user } = useAuth();
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getQRCodeData(user).then((data) => {
      if (!cancelled) {
        setQrData(data);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <main className="screen">
      <section className="mobile-shell">
        <Navbar title="Mon QR" subtitle="Identite medicale partageable" />

        <div className="app-content">
          <Card eyebrow="QR LifeLine" title="Code d'urgence">
            {qrData ? <QRCard profile={user} shareId={qrData.shareId} /> : <Loader label="Generation du QR..." />}
          </Card>

          <Card eyebrow="Apercu public" title="Lien d'urgence">
            <p className="section-copy">
              Utilisez cet apercu pour simuler ce qu'un secouriste verra apres
              le scan du code.
            </p>
            <Link to={`${ROUTES.emergency}/${user?.emergencyId}`} className="button button-primary">
              Voir la carte d'urgence
            </Link>
          </Card>
        </div>

        <BottomNav />
      </section>
    </main>
  );
}
