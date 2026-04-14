import { Link } from "react-router-dom";
import { ROUTES } from "../utils/constants.js";

export default function Splash() {
  return (
    <main className="screen screen-splash">
      <section className="splash-shell">
        <div className="splash-card">
          <div className="brand-row splash-brand">
            <span className="brand-mark">+</span>
            <div className="brand-copy">
              <strong>LifeLine</strong>
              <span>Medical emergency companion</span>
            </div>
          </div>

          <div className="hero-copy">
            <span className="soft-badge">PWA ready</span>
            <h1>Vos informations medicales, pretes au moment critique.</h1>
            <p>
              Un profil d'urgence mobile avec QR, fiche medicale rapide et
              contact immediat pour les premiers secours.
            </p>
          </div>

          <div className="device-preview">
            <article className="mini-phone mini-phone-light">
              <span className="mini-title">Bienvenue</span>
              <strong>Connexion</strong>
              <span>Acces securise au profil medical.</span>
            </article>
            <article className="mini-phone mini-phone-accent">
              <span className="mini-title">Bonjour</span>
              <strong>Tableau LifeLine</strong>
              <span>QR, scanner, urgence rapide.</span>
            </article>
            <article className="mini-phone mini-phone-alert">
              <span className="mini-title">Urgence</span>
              <strong>Carte medicale</strong>
              <span>Lecture instantanee des infos vitales.</span>
            </article>
          </div>

          <div className="button-row">
            <Link to={ROUTES.login} className="button button-primary">
              Se connecter
            </Link>
            <Link to={ROUTES.register} className="button button-secondary">
              Creer un compte
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
