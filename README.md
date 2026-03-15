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

### Generate Synthetic Data (Phase 2)

```powershell
cd backend
python generate_data.py --accounts 420 --days 45 --seed 42 --output ..\data\transactions.csv
```

### Seed SQLite from CSV

```powershell
cd backend
python seed_db_from_csv.py --csv ..\data\transactions.csv --truncate
```

### Quick Demo Seed (Phase 6)

Use the lightweight sample dataset for faster demos:

```powershell
cd backend
python seed_db_from_csv.py --csv ..\data\sample_transactions.csv --truncate
```

### Train Fraud Models (Phase 3)

```powershell
cd backend
python train.py --dataset ..\data\transactions.csv --models-dir ..\models --test-size 0.2 --random-seed 42
```

### Run API (Phase 4)

```powershell
cd backend
python app.py
```

### Run Frontend Dashboard (Phase 5)

```powershell
cd frontend
npm run dev
```

By default, the frontend calls relative `/api` routes and uses Vite proxy to `http://127.0.0.1:5000`.
If needed, set `VITE_API_BASE_URL` to a deployed backend URL.

### End-to-End Run Order

```powershell
cd backend
python generate_data.py --accounts 420 --days 45 --seed 42 --output ..\data\transactions.csv
python train.py --dataset ..\data\transactions.csv --models-dir ..\models --test-size 0.2 --random-seed 42
python seed_db_from_csv.py --csv ..\data\transactions.csv --truncate
python app.py
```

In another terminal:

```powershell
cd frontend
npm run dev
```

### Phase 4 Endpoints

- `GET /api/health` - service, database, and model readiness
- `POST /api/score` - score a transaction and persist alert result
- `GET /api/alerts` - latest alerts (`limit`, `status`, `min_risk` supported)
- `GET /api/metrics` - dashboard summary metrics
- `GET /api/transactions` - transaction listing

## Notes

- `frontend/` is already scaffolded and running.
- Backend implementation status is tracked in `plan.md`.
