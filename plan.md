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

- [ ] Create Flask app entrypoint and health route (`GET /api/health`).
- [ ] Add SQLite connection layer and initialization script.
- [ ] Create database tables:
  - `transactions`
  - `alerts`
  - `model_runs`
- [ ] Add transaction create/read endpoints.
- [ ] Add basic error handling + request validation.
- [ ] Verify API locally with sample requests.

## Phase 2: Synthetic Data Generator

- [ ] Build transaction generator script for normal behavior.
- [ ] Add fraud pattern injectors (amount spike, rapid bursts, device/location change).
- [ ] Save generated data to `data/transactions.csv`.
- [ ] Add script to seed SQLite from generated CSV.
- [ ] Validate dataset shape and class balance.

## Phase 3: Feature Engineering + Model Training

- [ ] Build feature engineering pipeline (`backend/ml/features.py`).
- [ ] Define baseline feature set (velocity, avg amount, account age, etc.).
- [ ] Train first model (Logistic Regression).
- [ ] Train second model (Random Forest or Isolation Forest).
- [ ] Evaluate with precision, recall, F1, ROC-AUC.
- [ ] Save best model to `models/`.
- [ ] Add training script (`python backend/train.py`).

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
- In progress:
  - None
- Blockers:
  - None
- Next step:
  - Start Phase 1: Flask app entrypoint and `GET /api/health`
