import { NavLink } from "react-router-dom";
import { ROUTES } from "../../utils/constants.js";
import { classNames } from "../../utils/helpers.js";

const navItems = [
  { label: "Accueil", symbol: "H", to: ROUTES.home },
  { label: "Tableau", symbol: "D", to: ROUTES.dashboard },
  { label: "QR", symbol: "Q", to: ROUTES.qr },
  { label: "Scanner", symbol: "S", to: ROUTES.scanner },
  { label: "Profil", symbol: "P", to: ROUTES.profile },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navigation principale">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => classNames("bottom-nav-link", isActive && "is-active")}
        >
          <span className="bottom-nav-icon" aria-hidden="true">
            {item.symbol}
          </span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
