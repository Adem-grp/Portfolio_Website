# Adem Garip // AG.SYS Portfolio

A futuristic, Cyberpunk 2077-inspired portfolio website for **Adem Garip**, AI Engineer and Computer Vision specialist. The interface uses a dark black/navy foundation, electric-blue accents, animated system visuals, interactive project mission cards, technical stack filters, responsive navigation, and a contact transmission form.

The repository contains:

- `frontend/` — React 19 + Vite single-page portfolio
- `backend/` — FastAPI API with SQLModel database models and CRUD routers

The current portfolio homepage is self-contained and displays the resume content directly in the frontend, so it can be viewed without starting the backend.

## Features

- Responsive Cyberpunk-inspired portfolio interface
- Resume sections for profile, projects, education, experience, skills, and AWS certifications
- Interactive project cards with detailed modal views
- Dedicated project routes at `/project/:id`
- Interactive technology stack categories
- Mobile navigation menu
- Contact form with a local success state and email link
- FastAPI backend retained for profile, project, skill, and social-link data

## Requirements

- Node.js 18 or newer
- npm
- Python 3.12 or newer for the backend
- A database supported by the configured SQLAlchemy `DATABASE_URL` (PostgreSQL is already supported by the backend dependencies)

## Run the frontend

Open a terminal in the repository root:

```powershell
cd frontend
npm install
npm run dev
```

Vite will print the local URL, normally:

```text
http://localhost:5173
```

Useful frontend commands:

```powershell
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

The frontend has an optional `frontend/.env` file. It is ignored by Git. If the legacy API-driven components are used, set local values such as:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Use URL placeholders for local frontend configuration, for example `VITE_API_BASE_URL=URL`.

## Run both services with one command

The repository root includes `main.py`, a small development launcher that starts the FastAPI backend and the Vite frontend together:

```powershell
python main.py
```

Before using it for the first time, install the frontend dependencies and configure `backend/.env` as described below:

```powershell
cd frontend
npm install
cd ..
python main.py
```

This starts the backend on `http://localhost:8000` and the frontend on the Vite URL, normally `http://localhost:5173`. Press `Ctrl+C` once to stop both child processes.

If you only want to run the backend:

```powershell
python main.py --backend-only
```

## Run the backend

Create or activate a Python virtual environment, then install the backend package:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -e .
```

Create `backend/.env` with the required settings:

```env
DATABASE_URL=postgresql+psycopg://<db_user>:<db_password>@localhost:5432/<db_name>
API_PREFIX=/api
DEBUG=true
ALLOWED_ORIGINS=http://localhost:5173
```

Replace the angle-bracket placeholders only on your local machine or in your deployment secret manager. Do not paste real credentials into this README, source files, issue reports, or commit history. For a shared template, use `backend/.env.example` with placeholders only.

Start the API from the repository root:

```powershell
cd ..
python -m backend.main
```

The API is available at:

- `http://localhost:8000/` — health message
- `http://localhost:8000/docs` — Swagger/OpenAPI documentation
- `http://localhost:8000/redoc` — ReDoc documentation

The backend creates registered SQLModel tables when it starts. Make sure the database in `DATABASE_URL` exists and is reachable before launching it.

## API routes

The backend exposes the following route groups:

| Route | Purpose |
| --- | --- |
| `/api/profile` | Profile data |
| `/api/projects` | Portfolio projects |
| `/api/skills` | Skills and technologies |
| `/api/social` | Social links |

## Project structure

```text
Portfolio_Website/
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Portfolio pages and interactions
│   │   ├── App.css          # Cyberpunk visual system
│   │   ├── index.css        # Global styles and fonts
│   │   └── components/      # Existing reusable/API components
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── main.py              # FastAPI application
│   ├── routers/             # API route handlers
│   ├── models/              # SQLModel database models
│   ├── schemas/             # Request/response schemas
│   ├── core/                # Configuration
│   └── db/                  # Database connection
└── README.md
```

## Development notes

- The main portfolio content is currently defined in `frontend/src/App.jsx`.
- Update the `projects` array there to change project details and metrics.
- Update `skillGroups` to change the interactive stack section.
- Keep secrets in local `.env` files and out of source control.
- Before committing configuration changes, verify `git check-ignore -v frontend/.env backend/.env`.
- The portfolio contact email is `ademgarip2001@gmail.com`.
