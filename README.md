# PayGuard

PayGuard is a mobile-money fraud detection project with a React frontend and a Python backend.

## Stack

- Frontend: React (TypeScript) + Vite + Tailwind
- Backend: Python + Flask
- Database: SQLite
- ML/Data: Pandas, NumPy, scikit-learn

## Project Structure

```txt
payguard/
  frontend/      # React + Vite dashboard
  backend/       # Flask API and ML pipeline
  data/          # Generated datasets
  models/        # Trained model artifacts
  docs/          # Architecture and API notes
  project.md     # Project description
  plan.md        # Implementation checklist
```

## Quick Start

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

### Backend (setup)

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Notes

- `frontend/` is already scaffolded and running.
- Backend implementation begins in Phase 1 of `plan.md`.
