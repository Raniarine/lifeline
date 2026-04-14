import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { ROUTES } from "../../utils/constants.js";
import { getInitials } from "../../utils/helpers.js";

export default function Navbar({ title, subtitle }) {
  const { user } = useAuth();

  return (
    <header className="app-navbar">
      <div className="brand-stack">
        <Link to={ROUTES.home} className="brand-row brand-link">
          <span className="brand-mark">+</span>
          <div className="brand-copy">
            <strong>LifeLine</strong>
            <span>{subtitle || "Vos informations medicales en cas d'urgence"}</span>
          </div>
        </Link>
        {title ? <h1 className="page-title">{title}</h1> : null}
      </div>

      <Link to={ROUTES.profile} className="avatar-link" aria-label="Ouvrir le profil">
        <span className="avatar-badge">{getInitials(user?.fullName || "LL")}</span>
      </Link>
    </header>
  );
}
