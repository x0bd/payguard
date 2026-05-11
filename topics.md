# PayGuard — document build tracker

Use this file as a **checklist** while writing your capstone/report. Structure follows the **Glyph** proposal document (proposal → literature → methodology → diagrams → references). Tick boxes as you finish each section or figure.

**Convention:** `- [ ]` not started · `- [x]` done. Add notes under any item if you defer or rename a figure.

---

## Front matter

- [ ] Title page (project title, your name, reg number, department, degree, supervisor, year)
- [ ] Declaration / originality statement
- [ ] Acknowledgements
- [ ] Abstract or executive summary (1 page max: problem, approach, stack, key results)
- [ ] Table of contents (auto-generated in Word/LaTeX/Google Docs)
- [ ] Table of figures (list every figure with page number)
- [ ] Table of tables (optional but recommended)
- [ ] List of abbreviations (e.g. API, ML, ROC-AUC, SPA, REST)

---

## Chapter 1 — Project proposal

### 1.1 Introduction

- [ ] Motivate **mobile-money fraud** and why automated risk scoring matters
- [ ] Briefly introduce PayGuard: synthetic data → features → model → API → dashboard
- [ ] State what the reader will find in each chapter

### 1.2 Problem statement

- [ ] Describe limitations of **manual rules-only** or reactive fraud handling
- [ ] Pain points: velocity, amount anomalies, device/location change, operational load on analysts
- [ ] Tie problems to what PayGuard actually implements (no over-claiming production deployment)

### 1.3 Proposed solution

- [ ] Summarise the **end-to-end system**: data generation, SQLite storage, scikit-learn pipeline, Flask REST API, React dashboard
- [ ] Clarify scope: **demo / research prototype** vs live payment switch integration

### 1.4 Aim

- [ ] One clear sentence: e.g. design and implement an ML-assisted fraud monitoring prototype for mobile-money-style transactions with a web dashboard

### 1.5 Objectives

- [ ] **O1:** Generate or obtain a realistic transaction dataset with labelled fraud patterns
- [ ] **O2:** Engineer time- and behaviour-based features aligned with training and scoring
- [ ] **O3:** Train and evaluate classifiers; persist the best model artifact
- [ ] **O4:** Expose scoring and read APIs; persist transactions and alerts
- [ ] **O5:** Build a dashboard for metrics, alerts, transactions, and live scoring
- [ ] **O6:** Document limitations, ethics, and future work

### 1.6 Project scope

- [ ] **Boundaries:** single SQLite DB, single Flask app, no bank-grade auth or HSM, etc.
- [ ] **Inclusions:** listed modules (backend scripts, `ml/features.py`, `train.py`, `app.py`, frontend views)
- [ ] **Exclusions:** real PSP integration, streaming inference, federated learning, etc.

### 1.7 Ethical considerations

- [ ] Synthetic vs real data; privacy if any real-like fields appear
- [ ] Risk scores as **signals**, not automatic guilt; false positives and fairness caveats
- [ ] Responsible use of alerts in a demo context

### 1.8 Cost / budget

- [ ] Hardware/software used (laptop, OS, free tiers if any)
- [ ] Optional: time cost or notional cloud cost if you deploy (Vercel, etc.)

### 1.9 Project plan & timeline

- [ ] Phases aligned with `plan.md` (setup → API → data → ML → scoring → UI → integration → deployment/tests)
- [ ] Milestones and dependencies (e.g. train before `/api/score`)

### 1.10 Figure — Gantt chart

- [ ] **Figure 1 — Gantt chart of PayGuard development**  
  **What to show:** horizontal timeline (weeks or months); rows for phases such as requirements, data generation, feature engineering, model training, API implementation, frontend, integration, documentation, optional deployment. Shade overlapping tasks where realistic.

---

## Chapter 2 — Literature review & system definition

### 2.1 Introduction

- [ ] Frame the chapter: fraud in digital payments, ML for detection, dashboard monitoring

### 2.2 Definition of terms

- [ ] Define: fraud, anomaly, feature engineering, precision/recall/F1, ROC-AUC, REST API, alert, risk score, mobile money (EcoCash-style context if relevant)

### 2.3 Theoretical framework

- [ ] **Supervised learning** for fraud classification (labels from synthetic injectors)
- [ ] **Behavioural features:** velocity, amount vs history, session/device/location change
- [ ] **Imbalanced classification** (class weights, metrics beyond accuracy)
- [ ] **System layers:** data → model → service → presentation (cite textbooks or papers as appropriate)

### 2.4 Historical / industry context

- [ ] Short narrative: rule engines → ML → real-time scoring; relevance to mobile money in your region if applicable

### 2.5 Key studies and findings

- [ ] 4–8 reputable sources (journals, conference papers, industry reports) with **one paragraph each** on what they found and how it relates to PayGuard
- [ ] Prefer citations that match your actual design (tabular ML, alert workflows)

### 2.6 Research gap

- [ ] What existing work often assumes (big data teams, proprietary stacks) vs what PayGuard demonstrates (lightweight SQLite + Flask + small-team prototype)

### 2.7 Research methodology

- [ ] **Approach:** design science / engineering project / case study on synthetic data — pick one and justify
- [ ] **Evaluation:** hold-out split, metrics from `training_report.json`, qualitative dashboard walkthrough

### 2.8 Development methods

- [ ] **Backend:** Python, Flask, SQLite, joblib; rationale
- [ ] **Frontend:** Vite, React, TypeScript, Tailwind, component library; rationale
- [ ] **ML:** scikit-learn pipelines, reproducibility (`random_state`, versioned model file)

### 2.9 Data gathering methods

- [ ] **Synthetic generation:** `generate_data.py` — parameters (accounts, days, seed), fraud injectors (spike, burst, device/location change)
- [ ] **Seeding:** `seed_db_from_csv.py` — how CSV becomes SQLite
- [ ] Optional: mention `sample_transactions.csv` for demos

### 2.10 System architecture

- [ ] Narrative of components and data flow (browser → API → DB → model artifact)

- [ ] **Figure 2 — PayGuard high-level architecture**  
  **What to show:** boxes for **React dashboard**, **Flask API**, **SQLite**, **model file (`fraud_model.joblib`)**, **CSV / offline training**. Arrows: training path (CSV → train script → model file); runtime path (dashboard → HTTP → Flask → SQLite + model). Label environment (dev vs prod) if needed.

### 2.11 Software development life cycle

- [ ] Choose and justify: iterative, agile sprints, or V-model lite — map to your actual workflow

- [ ] **Figure 3 — Life cycle model for PayGuard**  
  **What to show:** phases in a cycle or staged diagram (requirements → design → implement → test → demo → maintain). Annotate where ML retraining could loop back.

### 2.12 Resource requirements

- [ ] **Hardware:** minimum RAM/CPU for training and running API + frontend
- [ ] **Software:** Python version, Node version, key libraries (from `requirements.txt` / `package.json`)

### 2.13 Functional requirements

- [ ] Numbered FRs, e.g. FR1 ingest transaction, FR2 score and persist alert, FR3 list/filter alerts, FR4 dashboard metrics, FR5 account profile/history
- [ ] Map each FR to an endpoint or UI screen (traceability)

### 2.14 Use case diagram

- [ ] Identify actors: **Analyst / Demo user**, **System admin (optional)**, **External system (optional stub)**

- [ ] **Figure 4 — Use case diagram**  
  **What to show:** actor stick figures; use cases such as *View dashboard metrics*, *Review alerts*, *Update alert status*, *Submit transaction for scoring*, *Browse transactions*, *View account profile*; optional «include»/«extend» if you use authentication later.

### 2.15 Activity diagram

- [ ] Pick **one critical flow**: e.g. **score transaction end-to-end**

- [ ] **Figure 5 — Activity diagram for fraud scoring**  
  **What to show:** swimlanes optional (User | API | DB | Model); start → validate payload → load history → build features → predict → threshold → write transaction + alert → return JSON; decision nodes for model unavailable or validation errors.

### 2.16 Non-functional requirements (recommended add-on)

- [ ] Performance expectations (latency for score on local machine), maintainability, portability

---

## Chapter 3 — Methodology & detailed design

### 3.1 Overview

- [ ] Bridge from Chapter 2: this chapter details **classes/modules**, **interactions**, and **state** of the running system

### 3.2 Class diagram (software structure)

- [ ] Map major Python modules and React layers to UML-style classes (can be logical, not every function)

- [ ] **Figure 6 — Class diagram (backend & domain)**  
  **What to show:** classes or modules such as `Flask app`, `db` (connection, queries), `features` (`FeatureBundle`, `build_feature_frame`), `train` (training pipeline), `Transaction`, `Alert` as conceptual entities with key attributes and operations (`insert_transaction`, `fetch_alerts`, `score`). Keep readable: group in packages `api`, `ml`, `persistence`.

### 3.3 Object diagram

- [ ] One **snapshot scenario**: e.g. after scoring one transaction

- [ ] **Figure 7 — Object diagram (sample snapshot)**  
  **What to show:** concrete objects: one `Transaction` instance (ids, amounts), one `Alert`, linked; `Pipeline` object “loaded model”; optional `DataFrame` row as annotation. Illustrates relationships at runtime.

### 3.4 Sequence diagram

- [ ] Same flow as activity diagram but **message-oriented**

- [ ] **Figure 8 — Sequence diagram for `POST /api/score`**  
  **What to show:** lifelines: `Client`, `Flask`, `db`, `feature builder`, `sklearn Pipeline`, back to `Flask` → `Client`. Messages: `get_json`, `fetch_account_history`, `build_feature_frame`, `predict` / `predict_proba`, `insert_transaction`, `insert_alert`, `jsonify`.

### 3.5 Communication diagram (collaboration)

- [ ] Alternative view of scoring or training flow

- [ ] **Figure 9 — Communication diagram**  
  **What to show:** objects as nodes, numbered message arcs (1: validate, 2: load history, 3: engineer features, …). Emphasises **which component talks to which** without strict time order.

### 3.6 State chart

- [ ] Model **alert lifecycle** or **transaction review** state machine

- [ ] **Figure 10 — State chart for alert status**  
  **What to show:** states `open`, `closed`, `resolved`; transitions triggered by analyst action (PATCH) or system rules; note initial state after scoring (open vs closed based on threshold).

### 3.7 Data design

- [ ] Describe tables: `transactions`, `alerts`, `model_runs` (if used)

- [ ] **Figure 11 — Entity–relationship diagram (ERD)**  
  **What to show:** entities **Transaction**, **Alert**; relationship 1-to-many (one transaction may have one alert in your current design — show cardinality); attributes listed (PK/FK). Include **Model_run** only if you document training logging.

### 3.8 ML methodology

- [ ] **Feature list** aligned with `features.py` (numeric + categorical)
- [ ] **Train/test split**, stratification, metrics
- [ ] **Model candidates** (logistic regression vs random forest) and selection rule (ROC-AUC, etc.)

- [ ] **Figure 12 — ML pipeline (conceptual)**  
  **What to show:** blocks: raw rows → preprocessing → `ColumnTransformer` (scaler + one-hot) → classifier → probability output; note training vs inference path.

### 3.9 Process design (system runtime processes)

Glyph uses “initialize framework / handle events / …”. For PayGuard, map to **API server lifecycle**:

- [ ] **Step 1 — Initialise service:** load config, `init_db()`, attempt `load_model_context()`, register routes
- [ ] **Step 2 — Handle request:** routing, validation, error handlers
- [ ] **Step 3 — Update state:** commits to SQLite, in-memory model cache unchanged
- [ ] **Step 4 — Shutdown / teardown:** close DB connections per request (`teardown_appcontext`)

- [ ] **Figure 13 — Process design for Flask service lifecycle**  
  **What to show:** flowchart or numbered process blocks matching the four steps above; mention request-scoped DB connection.

### 3.10 User interface design

- [ ] Dashboard views: Dashboard, Alerts, Transactions, Accounts
- [ ] Principles: clarity of risk, accessibility of actions (resolve alert), loading/error states

- [ ] **Figure 14 — UI sitemap or wireframe collage**  
  **What to show:** simple boxes for each view and key widgets (KPI cards, charts, tables, scoring form); arrows for navigation. Optional: one annotated screenshot as **Figure 15**.

### 3.11 Security & controls (prototype-appropriate)

- [ ] Input validation on API; no auth in current stack — state this honestly
- [ ] Future: API keys, HTTPS, rate limiting

### 3.12 Testing & validation

- [ ] Manual test cases for endpoints; optional screenshots of Postman or browser
- [ ] If you add automated tests later, reference them here

---

## Chapter 4 — Implementation highlights (optional but typical for ND/Hons)

- [ ] **Repo map:** `backend/`, `frontend/`, `data/`, `models/`
- [ ] Key files: `app.py`, `db.py`, `ml/features.py`, `train.py`, `generate_data.py`, `seed_db_from_csv.py`
- [ ] Frontend: `api.ts`, main views, Vite proxy
- [ ] Dev vs production configuration (`VITE_API_BASE_URL`, `PAYGUARD_DB_PATH`, `PAYGUARD_MODEL_PATH`)

### Figure — Implementation stack (optional)

- [ ] **Figure 4.1 — Technology stack (implementation)**  
  **What to show:** layered diagram: UI → HTTP → Flask → SQLite / joblib; offline: CSV + Python ML. *(Same content as `figures.md` Figure 4.1.)*

---

## Chapter 5 — Results & discussion

- [ ] **Dataset stats:** rows, fraud rate, train/test sizes (from `training_report.json` or CSV summary)
- [ ] **Model metrics table:** precision, recall, F1, ROC-AUC per model; which was selected
- [ ] **Interpretation:** strengths, failure modes (false positives, cold-start accounts)
- [ ] **Dashboard:** what an analyst sees in a demo scenario

- [ ] **Figure 5.1 — Metrics comparison (bar chart)**  
  **What to show:** grouped bars for LR vs RF on F1 and ROC-AUC (from training report).

- [ ] **Figure 5.2 — ROC curve or confusion matrix (optional)**  
  **What to show:** one ROC curve for best model on test set, or confusion matrix heatmap — export from notebook or sklearn.

---

## Chapter 6 — Conclusion, limitations, future work

- [ ] Restate aim and whether objectives were met (explicit mapping)
- [ ] **Limitations:** synthetic data, SQLite on serverless, no A/B test on real fraud
- [ ] **Future work:** real data partnerships, XGBoost, explainability (SHAP), auth, streaming, deployment (Phase 7 style)

---

## References

- [ ] Collect all in-text citations; use one consistent style (IEEE, APA, or Harvard per faculty rules)
- [ ] Include URLs and access dates for web sources

---

## Appendices

- [ ] **Appendix A:** Sample API request/response JSON (`/api/score`, `/api/health`)
- [ ] **Appendix B:** Feature list table (name + description + formula in words)
- [ ] **Appendix C:** Environment setup commands (from `README.md`)
- [ ] **Appendix D:** Ethics checklist or questionnaire (if required)
- [ ] **Appendix E:** Supervisor meeting log / revision history (if required)

---

## Figure index (quick reference)

| ID | Figure name | Chapter |
|----|-------------|---------|
| 1 | Gantt chart | 1 |
| 2 | System architecture | 2 |
| 3 | Life cycle model | 2 |
| 4 | Use case diagram | 2 |
| 5 | Activity diagram (scoring) | 2 |
| 6 | Class diagram | 3 |
| 7 | Object diagram | 3 |
| 8 | Sequence diagram (`/api/score`) | 3 |
| 9 | Communication diagram | 3 |
| 10 | State chart (alerts) | 3 |
| 11 | ERD | 3 |
| 12 | ML pipeline | 3 |
| 13 | Flask service process design | 3 |
| 14 | UI sitemap / wireframes | 3 |
| 15 | Dashboard screenshot (optional) | 3–4 |
| 4.1 | Technology stack (implementation) | 4 |
| 5.1 | Model metrics chart | 5 |
| 5.2 | ROC / confusion matrix (optional) | 5 |

---

## Session log (optional)

Use this space to date-stamp progress:

- [ ] …
