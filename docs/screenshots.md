# PayGuard Figure and Screenshot Capture Guide

This file tracks the remaining image gaps in `docs/final.md`. It explains what each missing figure should show, whether it should be generated as a technical diagram or captured as a real screenshot, and where the final image should be saved.

## Capture Rules

- Do not fake screenshots of the running application, terminal output, API responses, browser windows, or test results.
- Generated diagrams should be saved as SVG files in `docs/assets/figures`.
- Real screenshots should be saved as PNG files in `docs/assets/screenshots`.
- Use clear filenames that match the figure number, for example `figure-4-7-dashboard-screenshot.png`.
- Keep screenshots clean: hide personal folders, browser bookmarks, private terminal paths, and unrelated windows where possible.
- Prefer a browser width of about `1440px` or `1536px` for dashboard screenshots so tables, cards, and charts look spacious.
- Use the same zoom level across app screenshots, preferably `100%`.
- After adding each image, insert it directly below its caption in `docs/final.md`.

Example markdown:

```md
**Figure 4.7: Dashboard screenshot**

![Figure 4.7: Dashboard screenshot](assets/screenshots/figure-4-7-dashboard-screenshot.png)
```

## Folder Setup

Create this folder if it does not already exist:

```powershell
mkdir docs\assets\screenshots
```

Generated technical diagrams already use:

```text
docs/assets/figures
```

Real screenshots should use:

```text
docs/assets/screenshots
```

## Current Gap Summary

| Figure | Type | Status | Action |
|---|---|---|---|
| Figure 3.3 | Technical diagram | Missing | Generate use case diagram |
| Figure 3.4 | Technical diagram | Missing | Generate activity diagram |
| Figure 4.7 | Real screenshot | Missing | Capture dashboard page |
| Figure 4.8 | Real screenshot | Missing | Capture alerts page |
| Figure 4.9 | Real screenshot | Missing | Capture transactions page |
| Figure 4.10 | Real screenshot | Missing | Capture account lookup page |
| Figure 5.1 | Real screenshot | Missing | Capture project folder structure |
| Figure 5.2 | Real screenshot | Missing | Capture backend scoring/API result |
| Figure 5.3 | Real screenshot | Missing | Capture database seeding terminal output |
| Figure 5.4 | Real screenshot | Missing | Capture synthetic data generation terminal output |
| Figure 5.5 | Real screenshot | Missing | Capture model training terminal output |
| Figure 5.6 | Real screenshot | Missing | Capture dashboard implementation |
| Figure 5.7 | Real screenshot | Missing | Capture alerts implementation |
| Figure 5.8 | Real screenshot | Missing | Capture transactions implementation |
| Figure 5.9 | Real screenshot | Missing | Capture accounts implementation |
| Figure 5.10 | Real screenshot | Missing | Capture frontend-backend integration |
| Figure 5.11 | Real screenshot | Missing | Capture end-to-end demonstration |
| Figure 6.1 | Technical diagram | Missing | Generate implementation overview diagram |
| Figure 6.2 | Real screenshot | Missing | Capture backend setup evidence |
| Figure 6.3 | Real screenshot | Missing | Capture frontend setup evidence |
| Figure 6.4 | Real screenshot | Missing | Capture data preparation evidence |
| Figure 6.5 | Real screenshot | Missing | Capture model training evidence |
| Figure 6.6 | Real screenshot | Missing | Capture backend health check |
| Figure 6.7 | Real screenshot | Missing | Capture dashboard startup |
| Figure 6.8 | Real screenshot | Missing | Capture end-to-end run |
| Figure 6.9 | Real screenshot | Missing | Capture user training/demo evidence |
| Figure 6.10 | Technical diagram | Missing | Generate deployment options diagram |

## Chapter 3 Remaining Diagrams

### Figure 3.3: Use Case Diagram

Type: generated technical SVG.

Purpose: show the main user interactions with PayGuard at a requirements level.

What it should contain:

- Actor: Finance user or fraud analyst.
- Main use cases: view dashboard, submit transaction for scoring, view alerts, update alert status, view transactions, search account profile, view model metrics.
- Optional supporting actor: PayGuard backend or fraud detection model.

Suggested file:

```text
docs/assets/figures/figure-3-3-use-case-diagram.svg
```

Markdown to insert:

```md
![Figure 3.3: Use case diagram](assets/figures/figure-3-3-use-case-diagram.svg)
```

### Figure 3.4: Activity Diagram

Type: generated technical SVG.

Purpose: show the high-level activity flow when a user submits a transaction and reviews the result.

What it should contain:

- Start.
- User enters transaction details.
- System validates input.
- Backend retrieves account history.
- Model scores the transaction.
- System creates alert if risk is high enough.
- User reviews result.
- End.

Suggested file:

```text
docs/assets/figures/figure-3-4-activity-diagram.svg
```

Markdown to insert:

```md
![Figure 3.4: Activity diagram](assets/figures/figure-3-4-activity-diagram.svg)
```

## Chapter 4 Screenshots

### Figure 4.7: Dashboard Screenshot

Type: real app screenshot.

Purpose: prove the implemented dashboard exists and show the main monitoring screen.

What to capture:

- Dashboard page open in the browser.
- Metric cards visible.
- Risk chart or alert summary visible.
- Live scoring form visible if it fits cleanly.
- Sidebar navigation visible.

Suggested file:

```text
docs/assets/screenshots/figure-4-7-dashboard-screenshot.png
```

How to capture:

- Start the Flask backend.
- Start the Vite frontend.
- Open the dashboard page in the browser.
- Use a clean browser window at `100%` zoom.
- Capture only the browser content or browser window, not the whole desktop.

Markdown to insert:

```md
![Figure 4.7: Dashboard screenshot](assets/screenshots/figure-4-7-dashboard-screenshot.png)
```

### Figure 4.8: Alerts Page Screenshot

Type: real app screenshot.

Purpose: show the alert review interface.

What to capture:

- Alerts page with a visible alerts table or alert list.
- Filters/search controls if present.
- At least one alert row.
- Alert status controls or detail area if available.

Suggested file:

```text
docs/assets/screenshots/figure-4-8-alerts-page-screenshot.png
```

Markdown to insert:

```md
![Figure 4.8: Alerts page screenshot](assets/screenshots/figure-4-8-alerts-page-screenshot.png)
```

### Figure 4.9: Transactions Page Screenshot

Type: real app screenshot.

Purpose: show stored transaction records and filtering/search functionality.

What to capture:

- Transactions page with recent transactions visible.
- Columns such as account, type, amount, location, device, risk score, fraud status, or created date.
- Search/filter controls if present.

Suggested file:

```text
docs/assets/screenshots/figure-4-9-transactions-page-screenshot.png
```

Markdown to insert:

```md
![Figure 4.9: Transactions page screenshot](assets/screenshots/figure-4-9-transactions-page-screenshot.png)
```

### Figure 4.10: Account Lookup Screenshot

Type: real app screenshot.

Purpose: show account-level investigation functionality.

What to capture:

- Accounts page after searching a valid account ID.
- Account summary metrics.
- Transaction history for the account.
- Related alerts if the page shows them.

Suggested file:

```text
docs/assets/screenshots/figure-4-10-account-lookup-screenshot.png
```

Markdown to insert:

```md
![Figure 4.10: Account lookup screenshot](assets/screenshots/figure-4-10-account-lookup-screenshot.png)
```

## Chapter 5 Screenshots

### Figure 5.1: Project Structure Screenshot

Type: real screenshot.

Purpose: show the implemented folder structure.

What to capture:

- Project root folder expanded in VS Code Explorer or terminal tree output.
- Important folders visible: `frontend`, `backend`, `data`, `models`, `docs`.
- Avoid exposing unrelated parent folders or private files.

Suggested file:

```text
docs/assets/screenshots/figure-5-1-project-structure-screenshot.png
```

### Figure 5.2: Backend Scoring Screenshot

Type: real screenshot.

Purpose: prove the scoring endpoint works.

What to capture:

- API scoring request and JSON response.
- Good options: Postman, Thunder Client, browser API client, or terminal `curl`.
- Response should show risk score, predicted label, risk level, alert status, reason, and transaction ID if available.

Suggested file:

```text
docs/assets/screenshots/figure-5-2-backend-scoring-screenshot.png
```

### Figure 5.3: Database Seeding Screenshot

Type: real terminal screenshot.

Purpose: show that generated data was loaded into SQLite.

What to capture:

- Terminal command used for seeding.
- Success output showing inserted transactions, alerts, or database path.
- If possible, include a short SQLite count query result.

Suggested file:

```text
docs/assets/screenshots/figure-5-3-database-seeding-screenshot.png
```

### Figure 5.4: Synthetic Data Generation Screenshot

Type: real terminal screenshot.

Purpose: show that the synthetic dataset was generated.

What to capture:

- Command used to run the data generator.
- Output showing number of rows, fraud rows, fraud rate, or CSV path.

Suggested file:

```text
docs/assets/screenshots/figure-5-4-synthetic-data-generation-screenshot.png
```

### Figure 5.5: Model Training Screenshot

Type: real terminal screenshot.

Purpose: show the model training process and evaluation results.

What to capture:

- Training command.
- Selected model name.
- Precision, recall, F1-score, and ROC-AUC.
- Saved model path.

Suggested file:

```text
docs/assets/screenshots/figure-5-5-model-training-screenshot.png
```

### Figure 5.6: Dashboard Screenshot

Type: real app screenshot.

Purpose: show the implemented dashboard during results discussion.

What to capture:

- Same page as Figure 4.7, but it can show a stronger result state.
- Include loaded metrics and charts.
- If possible, show a recent score result or alert summary.

Suggested file:

```text
docs/assets/screenshots/figure-5-6-dashboard-screenshot.png
```

### Figure 5.7: Alerts Screenshot

Type: real app screenshot.

Purpose: show alert management after implementation.

What to capture:

- Alerts table/list with live records from the backend.
- Status values such as open, resolved, or closed.
- Any update action or detail view if available.

Suggested file:

```text
docs/assets/screenshots/figure-5-7-alerts-screenshot.png
```

### Figure 5.8: Transactions Screenshot

Type: real app screenshot.

Purpose: show transaction records stored and displayed by the frontend.

What to capture:

- Transactions table with multiple rows.
- Search/filter controls.
- Visible fraud/risk columns if available.

Suggested file:

```text
docs/assets/screenshots/figure-5-8-transactions-screenshot.png
```

### Figure 5.9: Accounts Screenshot

Type: real app screenshot.

Purpose: show account lookup and account-level fraud review.

What to capture:

- Search field with a valid account ID.
- Account summary metrics.
- Account transaction history.

Suggested file:

```text
docs/assets/screenshots/figure-5-9-accounts-screenshot.png
```

### Figure 5.10: Frontend-Backend Integration Screenshot

Type: real screenshot.

Purpose: prove the frontend and backend communicate correctly.

What to capture:

- Browser dashboard after submitting a transaction, showing returned score.
- Or browser developer tools Network tab showing `/api/score` success.
- Prefer a user-friendly screenshot of the dashboard result over developer tools unless the document needs proof of the API request.

Suggested file:

```text
docs/assets/screenshots/figure-5-10-frontend-backend-integration-screenshot.png
```

### Figure 5.11: End-to-End Demonstration Screenshot

Type: real screenshot.

Purpose: show the full prototype working from transaction scoring to stored alert/result.

What to capture:

- A scored high-risk transaction result on the dashboard.
- The created alert visible in the alerts page, or a combined screenshot if possible.
- If one screenshot cannot show both, use the most convincing final state and mention in the surrounding text that the alert appears on the alerts page.

Suggested file:

```text
docs/assets/screenshots/figure-5-11-end-to-end-demonstration-screenshot.png
```

## Chapter 6 Figures and Screenshots

### Figure 6.1: Implementation Overview Diagram

Type: generated technical SVG.

Purpose: summarise how the implemented project pieces connect.

What it should contain:

- Frontend dashboard.
- Flask API.
- SQLite database.
- ML model.
- Data generation/training scripts.
- Testing and deployment preparation.

Suggested file:

```text
docs/assets/figures/figure-6-1-implementation-overview.svg
```

Markdown to insert:

```md
![Figure 6.1: Implementation overview diagram](assets/figures/figure-6-1-implementation-overview.svg)
```

### Figure 6.2: Backend Setup Screenshot

Type: real terminal screenshot.

Purpose: show backend dependencies and setup completed.

What to capture:

- Backend terminal.
- Flask/backend dependency install or successful backend startup.
- Useful evidence: virtual environment active, packages installed, backend starts successfully.

Suggested file:

```text
docs/assets/screenshots/figure-6-2-backend-setup-screenshot.png
```

### Figure 6.3: Frontend Setup Screenshot

Type: real terminal screenshot.

Purpose: show frontend dependencies and setup completed.

What to capture:

- Frontend terminal.
- `pnpm install` or `pnpm run dev` output.
- Vite local URL visible.

Suggested file:

```text
docs/assets/screenshots/figure-6-3-frontend-setup-screenshot.png
```

### Figure 6.4: Data Preparation Screenshot

Type: real terminal screenshot.

Purpose: show data preparation before training.

What to capture:

- Generator or seeding output.
- Dataset path and row count if available.
- Any command that demonstrates prepared data.

Suggested file:

```text
docs/assets/screenshots/figure-6-4-data-preparation-screenshot.png
```

### Figure 6.5: Model Training Screenshot

Type: real terminal screenshot.

Purpose: show model training evidence in the deployment/testing chapter.

What to capture:

- Training command.
- Final metrics.
- Saved model path.

Suggested file:

```text
docs/assets/screenshots/figure-6-5-model-training-screenshot.png
```

### Figure 6.6: Backend Health Check Screenshot

Type: real API screenshot.

Purpose: show that the backend is running and can report system health.

What to capture:

- `/api/health` response in browser, Postman, Thunder Client, or terminal.
- Response should show service status, database status, and model status.

Suggested file:

```text
docs/assets/screenshots/figure-6-6-backend-health-check-screenshot.png
```

### Figure 6.7: Dashboard Startup Screenshot

Type: real app screenshot.

Purpose: show the frontend running successfully.

What to capture:

- Browser displaying PayGuard dashboard after startup.
- No console error overlay.
- Sidebar and main dashboard content visible.

Suggested file:

```text
docs/assets/screenshots/figure-6-7-dashboard-startup-screenshot.png
```

### Figure 6.8: End-to-End Run Screenshot

Type: real app screenshot.

Purpose: show a complete working run of the prototype.

What to capture:

- A submitted transaction result with risk score.
- Ideally show alert creation or a visible high-risk result.

Suggested file:

```text
docs/assets/screenshots/figure-6-8-end-to-end-run-screenshot.png
```

### Figure 6.9: User Training Screenshot

Type: real screenshot or optional staged demonstration photo/screenshot.

Purpose: show that the intended user was introduced to the system.

What to capture:

- A safe, non-private screenshot of the dashboard being explained.
- Or a simple browser screenshot used during the training/demo.
- Avoid showing private faces, personal chats, private desktop items, or sensitive details unless permission is clear.

Suggested file:

```text
docs/assets/screenshots/figure-6-9-user-training-screenshot.png
```

### Figure 6.10: Deployment Options Diagram

Type: generated technical SVG.

Purpose: compare local prototype deployment with future cloud deployment.

What it should contain:

- Current local option: Vite frontend, Flask backend, SQLite, joblib model.
- Future hosted option: static frontend hosting, backend service/serverless API, managed database, secure environment variables.
- Note that SQLite is acceptable for prototype but a managed database is better for production.

Suggested file:

```text
docs/assets/figures/figure-6-10-deployment-options.svg
```

Markdown to insert:

```md
![Figure 6.10: Deployment options diagram](assets/figures/figure-6-10-deployment-options.svg)
```

## Recommended Capture Order

1. Capture Chapter 4 app screenshots first because they prove the designed UI exists.
2. Capture Chapter 5 implementation screenshots next because they support the implementation and testing chapter.
3. Capture Chapter 6 setup and deployment screenshots last because they are more about evidence and deployment readiness.
4. Generate the remaining technical diagrams whenever convenient because they do not require the app to be running.

## Quick App Screenshot Checklist

- Backend is running.
- Frontend is running.
- Browser zoom is `100%`.
- Data is seeded so tables are not empty.
- At least one high-risk scored transaction exists.
- No private information is visible.
- Screenshot filename matches the figure number.
- Screenshot is saved in `docs/assets/screenshots`.
- Image markdown is inserted directly under the matching caption in `docs/final.md`.

