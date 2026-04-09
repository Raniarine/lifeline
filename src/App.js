import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  const [blood, setBlood] = useState("");
  const [allergy, setAllergy] = useState("");
  const [contact, setContact] = useState("");

  // 🆕 NEW STATES
  const [disease, setDisease] = useState("");
  const [medicaments, setMedicaments] = useState("");
  const [doctor, setDoctor] = useState("");

  const [showQR, setShowQR] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // 🆕 UPDATED DATA
  const data = JSON.stringify({
    bg: blood,
    al: allergy,
    ds: disease,
    md: medicaments,
    ec: contact,
    dr: doctor,
  });

  // ✅ Scanner
  useEffect(() => {
    if (scanActive) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        false
      );

      scanner.render(
        (result) => {
          setScanResult(result);
          scanner.clear();
          setScanActive(false);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [scanActive]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>LifeLine 🩺</h1>

      <input
        placeholder="Groupe sanguin"
        onChange={(e) => setBlood(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Allergies"
        onChange={(e) => setAllergy(e.target.value)}
      />
      <br /><br />

      {/* 🆕 NEW INPUTS */}
      <input
        placeholder="Maladies chroniques"
        onChange={(e) => setDisease(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Médicaments"
        onChange={(e) => setMedicaments(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Médecin / consignes"
        onChange={(e) => setDoctor(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Contact d'urgence"
        onChange={(e) => setContact(e.target.value)}
      />
      <br /><br />

      <button onClick={() => setShowQR(true)}>
        Générer QR Code
      </button>

      <button onClick={() => setScanActive(true)}>
        Scan QR Code
      </button>

      <br /><br />

      {showQR && <QRCodeCanvas value={data} />}

      <br /><br />

      {/* 📷 Scanner */}
      <div id="reader" style={{ width: "300px", margin: "auto" }}></div>

      {/* 📊 Result */}
      {scanResult && (
        <div style={{ border: "1px solid black", padding: "10px", marginTop: "20px" }}>
          <h3>Informations médicales :</h3>

          {(() => {
            try {
              const data = JSON.parse(scanResult);
              return (
                <div>
                  <p><strong>Groupe sanguin:</strong> {data.bg}</p>
                  <p><strong>Allergies:</strong> {data.al}</p>
                  <p><strong>Maladies:</strong> {data.ds}</p>
                  <p><strong>Médicaments:</strong> {data.md}</p>
                  <p><strong>Contact:</strong> {data.ec}</p>
                  <p><strong>Médecin:</strong> {data.dr}</p>
                </div>
              );
            } catch {
              return <p>Erreur de lecture</p>;
            }
          })()}
        </div>
      )}
    </div>
  );
}

export default App;