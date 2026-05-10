# PayGuard — figure tracker

**Scope:** illustrative **figures only** (diagrams, charts, screenshots). Tables, equation lists, and data grids belong in the dissertation body, not here.

**Legend:** `- [ ]` not started · `- [x]` finished · **Tool:** Draw.io, Lucidchart, PlantUML, Visio, Figma, or similar.

---

## Chapter 1 — Project planning (optional)

| Done | ID | Suggested caption | Specification |
|------|-----|-------------------|---------------|
| - [ ] | **Figure 1.1** | Gantt chart of PayGuard development | Horizontal timeline (weeks/months); rows: requirements, synthetic data, feature engineering, model training, API, dashboard, integration, documentation, viva prep. Show overlap where realistic. |

---

## Chapter 3 — Systems design & methodology

| Done | ID | Suggested caption | Specification |
|------|-----|-------------------|---------------|
| - [ ] | **Figure 3.1** | PayGuard high-level system architecture | **Two swimlanes or colours:** (A) *Offline* — synthetic dataset → feature pipeline → train → persisted classifier artefact. (B) *Online* — browser (React) → HTTP → Flask → SQLite + loaded model. Arrows only; no internal code filenames. |
| - [ ] | **Figure 3.2** | Iterative life cycle for PayGuard | Circular or staged diagram: requirements → design → implement → test → demo → evaluate → back to design. Annotate **model retrain** and **threshold review** as feedback loops. |
| - [ ] | **Figure 3.3** | Use case diagram — fraud monitoring prototype | **Actors:** Analyst (primary), optional Administrator. **Use cases:** view metrics, review alerts, update alert status, submit transaction for scoring, browse transactions, view account profile, optional configure thresholds. «include»/«extend» only if you use them consistently. |
| - [ ] | **Figure 3.4** | Activity diagram — end-to-end fraud scoring | Swimlanes optional (Analyst | API | Database | Model). Flow: start → validate payload → model loaded? → fetch account history → build features → predict → persist transaction + alert → return response; merge error paths (validation fail, model missing, insufficient history). |
| - [ ] | **Figure 3.5** | Sequence diagram — fraud scoring interaction | Lifelines: **Client**, **Flask app**, **DB layer**, **Feature builder**, **sklearn Pipeline**. Messages: HTTP body, SQL queries, `build_feature_frame`, `predict` / `predict_proba`, `INSERT`, JSON response. Time flows top → bottom. |
| - [ ] | **Figure 3.6** | Communication diagram — fraud scoring collaboration | Same objects as Figure 3.5; **numbered** message arcs (1…*n*) showing collaboration without strict time ordering. |
| - [ ] | **Figure 3.7** | Class diagram — logical system structure | Packages: *Presentation* (omit or stub), *API & validation*, *Persistence*, *ML* (`FeatureBundle`, pipeline concept), *Domain* (Transaction, Alert). Show key operations and associations; keep legible for A4/PDF. |
| - [ ] | **Figure 3.8** | Object diagram — post-scoring snapshot | Concrete objects: `tx:Transaction` (sample id, amount), `al:Alert` (risk_score, status), link `al` → `tx`; `model:Pipeline` (label: best classifier name). Example attribute values only. |
| - [ ] | **Figure 3.9** | Entity–relationship diagram — persistence layer | Entities **Transaction**, **Alert**; relationship **places / raises** with cardinality **1:N**; PK/FK on alert.transaction_id; note CASCADE delete. Optional: **ModelRun** entity dashed (reserved). |
| - [ ] | **Figure 3.10** | State machine — alert lifecycle | States: **open**, **closed**, **resolved**. Transitions: analyst disposition (HTTP partial update), optional auto-close on low risk. Initial state after scoring: **open** or **closed** per policy branch (show guard labels). |
| - [ ] | **Figure 3.11** | Conceptual supervised learning pipeline | Left to right: **Raw rows** → **ColumnTransformer** (branch: numeric scaler \| categorical one-hot) → **Classifier** → **Score / label**. Second row or note: **Training** (fit on CSV) vs **Inference** (single row + history). |
| - [ ] | **Figure 3.12** | Process diagram — Flask application request lifecycle | Flowchart: startup (init DB, load model artefact) → wait → request received → route → validate → service logic → SQL commit → response → **teardown** (close connection). Emphasise **per-request** DB scope. |
| - [ ] | **Figure 3.13** | UI sitemap / wireframe collage | Four panels: Dashboard, Alerts, Transactions, Accounts. Under Dashboard: KPI strip, chart placeholder, scoring form. Arrows = navigation. Grayscale wireframe aesthetic is acceptable. |
| - [ ] | **Figure 3.14** | PayGuard dashboard (high-fidelity screenshot) | Full-window capture of the running SPA highlighting risk visualisation and alert feed; blur or fake any data if needed. **Optional** if Figure 3.13 is sufficient. |

---

## Later chapters (placeholders)

Add rows when Chapters 4–6 are drafted. Typical additions:

| Done | ID | Suggested caption | Specification |
|------|-----|-------------------|---------------|
| - [ ] | **Figure 4.1** | Technology stack or deployment view | Layer diagram: UI / API / DB / ML artefact / host environment. |
| - [ ] | **Figure 5.1** | Model comparison (e.g. bar chart) | Precision, recall, F1, ROC-AUC for candidate classifiers on hold-out data. |
| - [ ] | **Figure 5.2** | ROC curve or confusion matrix | Single best model; label threshold operating point. |

---

## Export checklist (per figure)

- [ ] **Vector PDF** (or ≥300 DPI PNG) for insertion into Word/LaTeX  
- [ ] **Readable fonts** (≥10 pt when printed)  
- [ ] **Consistent palette** (match thesis template)  
- [ ] **Caption** in dissertation matches ID and numbering in this tracker  
- [ ] **Source file** saved (`.drawio`, `.fig`, etc.) for viva revisions  

---

## Progress log

| Date | Figure | Notes |
|------|--------|-------|
|  |  |  |
