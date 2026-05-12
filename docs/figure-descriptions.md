# Figure Description Reference

This file stores the full descriptions for figures, diagrams, and screenshots that will be inserted into the PayGuard dissertation later. The main report should only contain short figure placeholders, while this file keeps the detail needed when creating the actual diagrams.

## Chapter 1

No figure descriptions have been defined for Chapter 1 yet.

## Chapter 2

### Figure 2.1: Gantt Chart

The Gantt chart will visually show the project activities and their timelines across the project weeks. It will show research and literature review first, followed by requirements and design, synthetic data generation, model training, backend API development, frontend dashboard development, testing, and final documentation.

## Chapter 3

### Figure 3.1: Existing System Context Diagram

The context diagram will show the existing payment monitoring process, including Student/Guardian, Mobile Money Platform, Finance Officer, Institutional Records System and Administrator.

### Figure 3.2: Proposed PayGuard Context Diagram

The proposed system context diagram will show PayGuard receiving transaction data, scoring risk, saving records, and returning alerts and dashboard information to users.

### Figure 3.3: Use Case Diagram

The use case diagram will show Finance Officer, Fraud Analyst, Administrator and Developer/Researcher interacting with dashboard, transaction, alert, account, data generation and model training functions.

### Figure 3.4: Activity Diagram

The activity diagram will show transaction scoring from input validation to feature building, model prediction, alert creation and dashboard response.

### Figure 3.5: Level 0 Data Flow Diagram

The Level 0 data flow diagram will show PayGuard as one process connected to users, transaction source, database, alerts and model file.

### Figure 3.6: Level 1 Data Flow Diagram

The Level 1 data flow diagram will break PayGuard into receiving, validation, feature engineering, scoring, alerting, storage and dashboard metric processes.

### Figure 3.7: Entity Relationship Diagram

The ERD will show Transactions, Alerts, Accounts and ModelRuns, including primary keys, foreign keys and relationships.

### Figure 3.8: Class Diagram

The class diagram will show core modules such as Transaction, Alert, AccountProfile, FraudScorer, FeatureBuilder, ModelLoader, DatabaseService, DashboardService and APIController.

### Figure 3.9: Object Diagram

The object diagram will show an example scored transaction linked to an alert, fraud scorer and model object.

### Figure 3.10: Sequence Diagram

The sequence diagram will show the dashboard submitting a transaction, the API validating it, the model scoring it, the alert service saving an alert, and the dashboard displaying the result.

### Figure 3.11: Communication Diagram

The communication diagram will show numbered messages between the dashboard, API, database, feature builder, model and alert service.

### Figure 3.12: State Chart Diagram

The state chart will show the alert lifecycle from created/open to review, resolved, closed or archived.

### Figure 3.13: Transaction Scoring Flowchart

The flowchart will show transaction scoring from input validation to model prediction, alert creation and dashboard response.

### Figure 3.14: Dashboard Wireframe

The dashboard wireframe will show sidebar navigation, summary cards, risk chart, recent alerts and transaction scoring form.

### Figure 3.15: Alerts Page Wireframe

The alerts page wireframe will show alert records with risk score, reason, status, action buttons and filters.

## Chapter 4

### Figure 4.1: System Architecture Diagram

The system architecture diagram will show the React dashboard on the left, the Flask API in the middle, and SQLite plus the saved machine learning model on the right. The diagram will show that the dashboard sends requests to Flask endpoints, Flask reads and writes data in SQLite, and Flask loads the saved fraud model from the models folder to score transactions.

### Figure 4.2: Data Generation Flow Diagram

The data generation flow diagram will show account profile creation, normal transaction generation, amount spike injection, device/location change injection, rapid burst injection, metadata creation, and final CSV export to the data folder.

### Figure 4.3: Machine Learning Pipeline Diagram

The machine learning pipeline diagram will show dataset loading, data cleaning, feature engineering, train-test split, model training, model evaluation, best model selection, model saving, and backend model loading.

### Figure 4.4: Backend Scoring Sequence Diagram

The backend scoring sequence diagram will show the dashboard submitting a transaction to `/api/score`, the Flask API validating the input, the database returning account history, the feature builder preparing features, the model returning a risk score, the database saving the transaction and alert, and the dashboard displaying the result.

### Figure 4.5: Database Relationship Diagram

The database relationship diagram will show that one transaction can have one or more alerts linked through `alerts.transaction_id`. It will also show that account profiles are derived from transaction records by grouping transactions using `account_id`. The `model_runs` table will appear as a supporting table for model metadata.

### Figure 4.6: Alert Lifecycle Diagram

The alert lifecycle diagram will show an alert being created after scoring. The alert can remain open, be marked as resolved after investigation, be closed when dismissed, or be reopened if further review is needed.

### Figure 4.7: Dashboard Screenshot

The dashboard screenshot will show the PayGuard sidebar, key metric cards, risk trend chart, alert distribution panel, and transaction scoring form with a result panel.

### Figure 4.8: Alerts Page Screenshot

The alerts page screenshot will show the alert table, search box, filter controls, risk labels, status labels, action menu, and the alert detail drawer.

### Figure 4.9: Transactions Page Screenshot

The transactions page screenshot will show a transaction table with filters for transaction type and fraud status, including risk scores and fraud labels.

### Figure 4.10: Account Lookup Screenshot

The account lookup screenshot will show the account search box, account summary cards, open alert badge, fraud rate, average amount, average risk score, and the account transaction history table.

### Figure 4.11: Transaction Scoring Flowchart

The transaction scoring flowchart will show the process from transaction entry to validation, account history retrieval, feature engineering, model scoring, risk level calculation, alert creation, database storage, and result display.

### Figure 4.12: Deployment Diagram

The deployment diagram will show the user opening the React dashboard in a browser, the Vite frontend sending API requests to Flask, Flask reading the SQLite database, and Flask loading the saved joblib fraud model.

## Chapter 5

### Figure 5.1: Project Structure Screenshot

The project structure screenshot will show the root PayGuard folder with the main folders: frontend, backend, data, models, and docs. It will also show important files such as README.md, plan.md, project.md, and docs/final.md.

### Figure 5.2: Backend Scoring Screenshot

The backend scoring screenshot will show an example API response from `/api/score`. The response should include fields such as transaction_id, alert_id, predicted_label, risk_score, risk_level, alert_status, key_features, reason, and model_name.

### Figure 5.3: Database Seeding Screenshot

The database seeding screenshot will show terminal output from running the seeding command. The output should show the source CSV file, inserted rows, total rows in the database, fraud rows in the database, fraud rate, and database path.

### Figure 5.4: Synthetic Data Generation Screenshot

The synthetic data generation screenshot will show terminal output from the generator, including dataset path, number of rows, fraud rows, fraud rate, account count, amount range, and fraud pattern breakdown.

### Figure 5.5: Model Training Screenshot

The model training screenshot will show the training summary printed by the training script. It should include dataset rows, fraud rate, selected model, precision, recall, F1-score, ROC-AUC, best model path, versioned model path, and report path.

### Figure 5.6: Dashboard Screenshot

The dashboard screenshot will show the implemented PayGuard frontend with sidebar navigation, metric cards, charts, and scoring form.

### Figure 5.7: Alerts Screenshot

The alerts screenshot will show the implemented alert table, filters, action menu, and alert detail drawer.

### Figure 5.8: Transactions Screenshot

The transactions screenshot will show transaction records with account IDs, transaction types, amounts, locations, risk scores, fraud labels, and dates.

### Figure 5.9: Accounts Screenshot

The accounts screenshot will show the account search field, account profile cards, risk badges, and transaction history table.

### Figure 5.10: Frontend-Backend Integration Screenshot

The frontend-backend integration screenshot will show the dashboard running in the browser and API requests being handled through the Flask backend. The screenshot may include the dashboard and a terminal showing backend activity.

### Figure 5.11: End-to-End Demonstration Screenshot

The end-to-end demonstration screenshot will show the dashboard after a transaction has been scored. It should show the scoring result, updated alert count, and alert entry created from the submitted transaction.
