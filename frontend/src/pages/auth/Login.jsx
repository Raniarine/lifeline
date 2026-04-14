import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import Loader from "../../components/ui/Loader.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { ROUTES } from "../../utils/constants.js";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
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
      await login(form);
      navigate(ROUTES.home, { replace: true });
    } catch (nextError) {
      setError(nextError.message);
    }
  }

  return (
    <main className="screen">
      <section className="auth-shell">
        <Card className="auth-panel auth-panel-featured" eyebrow="Connexion" title="Bienvenue sur LifeLine">
          <p className="section-copy">
            Connectez-vous pour acceder a votre QR medical, vos informations
            vitales et le mode urgence rapide.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="abdel10@gmail.com"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              label="Mot de passe"
              name="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              value={form.password}
              onChange={handleChange}
              error={error}
            />
            <Button type="submit" block disabled={isLoading}>
              Connexion
            </Button>
          </form>

          {isLoading ? <Loader label="Verification du compte..." /> : null}

          <div className="helper-row">
            <span className="helper-text">Vous n'avez pas de compte ?</span>
            <Link to={ROUTES.register} className="text-link">
              Inscription
            </Link>
          </div>
          <Link to={ROUTES.splash} className="text-link text-link-subtle">
            Retour a l'accueil
          </Link>
        </Card>
      </section>
    </main>
  );
}
