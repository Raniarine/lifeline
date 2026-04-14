import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/layout/BottomNav.jsx";
import Navbar from "../../components/layout/Navbar.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { ROUTES } from "../../utils/constants.js";

export default function MedicalForm() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    allergies: user?.allergies || "",
    conditions: user?.conditions || "",
    medications: user?.medications || "",
    doctor: user?.doctor || "",
    notes: user?.notes || "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await updateProfile(form);
    navigate(ROUTES.dashboard, { replace: true });
  }

  return (
    <main className="screen">
      <section className="mobile-shell">
        <Navbar title="Fiche medicale" subtitle="Informations cliniques" />

        <div className="app-content">
          <Card eyebrow="Medical" title="Completer le profil d'urgence">
            <form className="auth-form" onSubmit={handleSubmit}>
              <Input
                label="Allergies"
                name="allergies"
                as="textarea"
                rows="3"
                value={form.allergies}
                onChange={handleChange}
                hint="Separez plusieurs valeurs par des virgules."
              />
              <Input
                label="Pathologies"
                name="conditions"
                as="textarea"
                rows="3"
                value={form.conditions}
                onChange={handleChange}
              />
              <Input
                label="Medicaments"
                name="medications"
                as="textarea"
                rows="3"
                value={form.medications}
                onChange={handleChange}
              />
              <Input label="Medecin traitant" name="doctor" value={form.doctor} onChange={handleChange} />
              <Input
                label="Notes d'urgence"
                name="notes"
                as="textarea"
                rows="4"
                value={form.notes}
                onChange={handleChange}
              />
              <Button type="submit" block>
                Enregistrer
              </Button>
            </form>
          </Card>
        </div>

        <BottomNav />
      </section>
    </main>
  );
}
