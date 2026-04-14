# LifeLine

LifeLine is a mobile-first emergency medical web app with a React frontend and an Express backend. The current scaffold now follows a cleaner feature-based structure so the project can grow into authentication, medical profile, QR generation, scanner flow, and emergency access.

## Structure

```text
LifeLine/
|-- frontend/
|   |-- public/
|   |   |-- manifest.json
|   |   |-- icons/
|   |   |-- robots.txt
|   |   `-- index.html
|   |-- src/
|   |   |-- assets/
|   |   |   |-- images/
|   |   |   |-- icons/
|   |   |   `-- logo.png
|   |   |-- components/
|   |   |   |-- ui/
|   |   |   |-- layout/
|   |   |   `-- medical/
|   |   |-- pages/
|   |   |   |-- auth/
|   |   |   |-- main/
|   |   |   |-- profile/
|   |   |   |-- qr/
|   |   |   |-- emergency/
|   |   |   `-- Splash.jsx
|   |   |-- routes/
|   |   |-- context/
|   |   |-- services/
|   |   |-- hooks/
|   |   |-- utils/
|   |   |-- styles/
|   |   |-- pwa/
|   |   |-- App.jsx
|   |   `-- main.jsx
|   |-- index.html
|   `-- package.json
|-- backend/
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- models/
|   |   |-- routes/
|   |   |-- middlewares/
|   |   |-- services/
|   |   |-- utils/
|   |   `-- app.js
|   |-- server.js
|   |-- .env
|   `-- package.json
|-- docs/
|   |-- presentation.pdf
|   |-- cahier_de_charge.pdf
|   |-- uml/
|   `-- screenshots/
`-- README.md
```

## Frontend status

- Splash, login, register, home, dashboard, profile, medical form, QR, scanner, and emergency preview pages are wired.
- Auth and profile data are currently persisted in local storage so the UI can be used before full backend integration.
- PWA support files and manifest placeholders are included.

## Backend status

- Express routes are scaffolded for auth, user profile, QR, and emergency access.
- `MedicalProfile` and `EmergencyLog` models were added to match the requested architecture.
- Controllers currently return structured starter responses and are ready for real database logic.

## Run locally

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
npm install
npm run dev
```

## Notes

- `frontend/index.html` remains the active Vite entry point. `frontend/public/index.html` is included only to mirror your requested tree.
- Some docs and icon assets are placeholder files so the structure is complete and ready for real project material.
