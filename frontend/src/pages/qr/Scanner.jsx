import { useContext } from "react";
import { Link } from "react-router-dom";
import BottomNav from "../../components/layout/BottomNav.jsx";
import Navbar from "../../components/layout/Navbar.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { ROUTES } from "../../utils/constants.js";

export default function Scanner() {
  const { user } = useAuth();
  const { appState, saveLastScan, setScannerPermission } = useContext(AppContext);

  function simulateScan() {
    saveLastScan(user?.emergencyId || "lifeline-scan-preview");
  }

  return (
    <main className="screen">
      <section className="mobile-shell scanner-shell">
        <Navbar title="Scanner QR" subtitle="Simulation de lecture mobile" />

        <div className="app-content">
          <Card className="scanner-card" eyebrow="Camera" title="Activez le scanner">
            <div className="scanner-viewport">
              <div className="scanner-target"></div>
            </div>

            <div className="scanner-actions">
              <Button onClick={() => setScannerPermission(true)}>Autoriser la camera</Button>
              <Button variant="secondary" onClick={simulateScan} disabled={!appState.scannerPermission}>
                Scanner maintenant
              </Button>
            </div>

            <p className="section-copy">
              {appState.scannerPermission
                ? "Acces camera autorise. Vous pouvez lancer une simulation de scan."
                : "L'autorisation camera est requise pour acceder a la lecture QR."}
            </p>
          </Card>

          {appState.lastScan ? (
            <Card eyebrow="Derniere lecture" title="Resultat du scan">
              <p className="section-copy">QR detecte: {appState.lastScan}</p>
              <Link to={`${ROUTES.emergency}/${appState.lastScan}`} className="button button-primary">
                Voir les informations medicales
              </Link>
            </Card>
          ) : null}
        </div>

        <BottomNav />
      </section>
    </main>
  );
}
