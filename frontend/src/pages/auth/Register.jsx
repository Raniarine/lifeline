import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import Loader from "../../components/ui/Loader.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { BLOOD_GROUPS, ROUTES } from "../../utils/constants.js";

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    bloodType: "O+",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await register(form);
      navigate(ROUTES.home, { replace: true });
    } catch (nextError) {
      setError(nextError.message);
    }
  }

  return (
    <main className="screen">
      <section className="auth-shell">
        <Card className="auth-panel" eyebrow="Inscription" title="Creez votre compte LifeLine">
          <p className="section-copy">
            Renseignez les informations de base pour activer votre carte
            medicale d'urgence.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <Input
              label="Nom complet"
              name="fullName"
              placeholder="Abdelmounaim Ouballa"
              value={form.fullName}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="abdel10@gmail.com"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              label="Telephone"
              name="phone"
              type="tel"
              placeholder="06 12 34 56 78"
              value={form.phone}
              onChange={handleChange}
            />
            <Input
              label="Groupe sanguin"
              name="bloodType"
              as="select"
              options={BLOOD_GROUPS}
              value={form.bloodType}
              onChange={handleChange}
            />
            <Input
              label="Mot de passe"
              name="password"
              type="password"
              placeholder="Creez un mot de passe"
              value={form.password}
              onChange={handleChange}
            />
            <Input
              label="Confirmer le mot de passe"
              name="confirmPassword"
              type="password"
              placeholder="Repetez le mot de passe"
              value={form.confirmPassword}
              onChange={handleChange}
              error={error}
            />
            <Button type="submit" block disabled={isLoading}>
              Creer un compte
            </Button>
          </form>

          {isLoading ? <Loader label="Creation du compte..." /> : null}

          <div className="helper-row">
            <span className="helper-text">Vous avez deja un compte ?</span>
            <Link to={ROUTES.login} className="text-link">
              Connexion
            </Link>
          </div>
        </Card>
      </section>
    </main>
  );
}
