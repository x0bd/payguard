# PayGuard Implementation Plan

This file is our execution checklist. We will tick each box only after the step is fully implemented and verified.

## Progress Rules

- [ ] Mark tasks complete only after code is written, tested, and committed locally.
- [ ] If a task is started but not done, leave it unchecked and add notes under that section.
- [ ] After each work session, update this file first before moving to the next task.

## Phase 0: Project Setup

- [x] Initialize repository structure:
  - `frontend/` (Vite + React)
  - `backend/` (Flask API + ML code)
  - `data/` (generated datasets)
  - `models/` (trained model artifacts)
  - `docs/` (architecture notes, API notes)
- [x] Create root `README.md` with setup instructions.
- [x] Create `.gitignore` for Node, Python, SQLite, and model artifacts.
- [x] Add `requirements.txt` in `backend/`.
- [x] Add `package.json` in `frontend/` via Vite scaffolding.

## Phase 1: Backend Foundation (Flask + SQLite)

- [x] Create Flask app entrypoint and health route (`GET /api/health`).
- [x] Add SQLite connection layer and initialization script.
- [x] Create database tables:
  - `transactions`
  - `alerts`
  - `model_runs`
- [x] Add transaction create/read endpoints.
- [x] Add basic error handling + request validation.
- [x] Verify API locally with sample requests.

## Phase 2: Synthetic Data Generator

- [x] Build transaction generator script for normal behavior.
- [x] Add fraud pattern injectors (amount spike, rapid bursts, device/location change).
- [x] Save generated data to `data/transactions.csv`.
- [x] Add script to seed SQLite from generated CSV.
- [x] Validate dataset shape and class balance.

## Phase 3: Feature Engineering + Model Training

- [x] Build feature engineering pipeline (`backend/ml/features.py`).
- [x] Define baseline feature set (velocity, avg amount, account age, etc.).
- [x] Train first model (Logistic Regression).
- [x] Train second model (Random Forest or Isolation Forest).
- [x] Evaluate with precision, recall, F1, ROC-AUC.
- [x] Save best model to `models/`.
- [x] Add training script (`python backend/train.py`).

## Phase 4: Fraud Scoring API

- [ ] Load trained model at API startup.
- [ ] Add scoring endpoint (`POST /api/score`).
- [ ] Return:
  - fraud risk score
  - predicted label
  - key features used for scoring
- [ ] Persist scoring results into `alerts` table.
- [ ] Add endpoint to fetch latest alerts (`GET /api/alerts`).
- [ ] Add endpoint for dashboard summary metrics (`GET /api/metrics`).

## Phase 5: Frontend Dashboard (Vite + React)

- [ ] Scaffold dashboard layout and routing.
- [ ] Build summary cards (total tx, fraud count, fraud rate).
- [ ] Build alerts table with pagination/filtering.
- [ ] Build charts for fraud trends and model performance (Plotly).
- [ ] Add transaction scoring form to test live API predictions.
- [ ] Add loading/error/empty states.
- [ ] Validate responsive behavior (desktop + mobile).

## Phase 6: End-to-End Integration

- [ ] Connect frontend to Flask endpoints.
- [ ] Run end-to-end flow:
  - generate data
  - train model
  - start API
  - view dashboard
  - score a new transaction
- [ ] Fix API/UX issues found during integration tests.
- [ ] Add sample seed dataset for quick demo startup.

## Phase 7: Deployment on Vercel

- [ ] Add Vercel config (`vercel.json`) for:
  - Vite static frontend
  - Flask serverless API routes
- [ ] Add production environment variable handling.
- [ ] Confirm backend endpoints work on deployed URL.
- [ ] Confirm frontend API calls work against deployed backend.
- [ ] Document deployment limitations of SQLite on serverless.

## Phase 8: Final Quality + Submission Readiness

- [ ] Add basic automated tests:
  - backend endpoint tests
  - feature pipeline sanity tests
- [ ] Add data/model reproducibility notes.
- [ ] Add architecture diagram and API documentation.
- [ ] Prepare dissertation/demo screenshots.
- [ ] Run final smoke test checklist.
- [ ] Finalize presentation narrative (problem, method, results, limitations).

## Session Notes

Use this section to log what was done each day.

### 2026-03-15

- Completed:
  - Phase 0 repo structure initialized (`backend/`, `data/`, `models/`, `docs/`)
  - Root `README.md` created
  - Root `.gitignore` created
  - `backend/requirements.txt` added
  - Frontend scaffold verified as present and working
  - Phase 1 Flask API foundation implemented (`/api/health`, create/list transactions)
  - SQLite layer and schema created (`transactions`, `alerts`, `model_runs`)
  - Local API verification run using Flask test client (health, create, list, validation error)
  - Phase 2 synthetic data generator added (`backend/generate_data.py`)
  - Fraud injectors implemented: amount spike, rapid burst, device/location change
  - Generated dataset written to `data/transactions.csv` (99,468 rows)
  - CSV-to-SQLite seeding script added (`backend/seed_db_from_csv.py`)
  - Dataset and DB class balance validated (2.39% fraud rate)
  - Phase 3 feature engineering pipeline added (`backend/ml/features.py`)
  - Training script added (`backend/train.py`) with Logistic Regression and Random Forest
  - Model evaluation completed with precision/recall/F1/ROC-AUC metrics
  - Best model selected and saved to `models/fraud_model.joblib`
  - Versioned model and training report generated in `models/`
- In progress:
  - None
- Blockers:
  - None (dependency compatibility issue resolved by installing newer Python 3.14-compatible versions)
- Next step:
  - Start Phase 4: load trained model in API and add fraud scoring endpoints
