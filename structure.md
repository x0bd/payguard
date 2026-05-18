# PayGuard Dissertation Structure

This structure follows the supplied reference document: `Digitalised Birth Record Management System T INASHE Chandiringa.pdf`.

Keep the writing short, direct, and Word-style. Do not add extra chapters or extra sections unless instructed. Use PayGuard content only, but follow the same layout and order.

## Front Matter

1. Contents
2. List of Tables
3. List of Figures

Use:

- `docs/table.md` for List of Tables.
- `docs/figures.md` for List of Figures.

---

# CHAPTER 1

## 1.0 Introduction

Introduce PayGuard as a mobile money fraud detection and monitoring system.

Mention:

- mobile money transaction monitoring;
- suspicious transaction detection;
- risk scoring;
- dashboard summaries;
- alerts and account review.

## 1.1 Background of the Study

Explain the current fraud monitoring situation.

Mention:

- mobile money payments are common;
- fraud risks include fake confirmations, account misuse, unusual transaction behaviour, and repeated transactions;
- manual review is slow;
- old or scattered transaction records are hard to analyse;
- PayGuard digitises monitoring and supports faster review.

## 1.2 Statement of the Problem

Use short bullet points like the reference document.

The current system fails to overcome the following:

- Suspicious transactions are checked manually.
- Manual review is slow and inefficient.
- Transaction histories are not analysed automatically.
- Fraud patterns may be missed.
- Alerts and dashboards are limited.
- Finance users do not have automatic risk scoring support.

## 1.3 Objectives of the Study

Keep only the main objectives:

1. To design and implement a PayGuard fraud detection system for mobile money transactions.
2. To provide a dashboard that displays transaction reports, risk levels, alerts, and trends.

## 1.4 Hypotheses

Follow the same simple pattern as the reference:

H0: The proposed PayGuard system would solve the problem of monitoring suspicious mobile money transactions by 85%.

H1: The proposed PayGuard system would not solve the problem of monitoring suspicious mobile money transactions.

## 1.5 Justification of the Research

Explain why the study matters.

Mention:

- finance users;
- administrators;
- institutions;
- researchers;
- fraud review efficiency;
- a gap in simple prototype systems for mobile money fraud monitoring.

## 1.6 Assumptions of the Study

Keep short:

- users provide valid transaction data;
- basic infrastructure is available;
- users are willing to adopt the dashboard;
- synthetic data can represent common fraud patterns.

## 1.7 Delimitations of the Study

Limit the study to:

- PayGuard prototype;
- mobile money transaction fraud monitoring;
- synthetic transaction data;
- dashboard review;
- no live mobile money provider integration.

## 1.8 Limitations of the Study

Mention:

- time constraints;
- synthetic data instead of real provider data;
- no live integration;
- limited production security;
- varying user computer literacy.

## 1.9 Definition of Terms

Define:

- PayGuard
- Fraud detection
- Mobile money
- Machine learning
- Risk score
- Alert
- Synthetic data
- Dashboard

---

# CHAPTER 2

# LITERATURE REVIEW

## 2.0 Introduction

Introduce literature relevant to PayGuard.

## 2.1 Theoretical Literature Review

### 2.1.1 Mobile Money Fraud and Transaction Monitoring Systems

Linked to Objective 1.

Discuss mobile money fraud, transaction monitoring, manual checks, and digital monitoring systems.

### 2.1.2 Digital Financial Record and Dashboard Systems

Linked to Objective 2.

Discuss transaction records, dashboards, alerts, reporting, and management summaries.

### 2.1.3 Machine Learning in Fraud Detection

Linked to Objectives 1 and 2.

Discuss machine learning, risk scoring, fraud classification, and pattern detection.

## 2.2 Empirical Literature Review

Review practical studies on fraud detection systems, machine learning fraud models, mobile money monitoring, and dashboard-based financial systems.

## 2.3 Summary, Research Gap, and Significance

### Research Gap

State that existing work often focuses on broad electronic finance systems or real production fraud systems, while this study focuses on a simple academic prototype for mobile money fraud monitoring using synthetic data, Flask, SQLite, machine learning, and a dashboard.

### Significance of the Study

Mention finance users, administrators, institutions, and researchers.

---

# CHAPTER 3

# FEASIBILITY STUDY

## 3.0 Introduction

State that the chapter assesses whether PayGuard is realistic and beneficial.

## 3.1 Economic Feasibility

Discuss cost-benefit analysis.

### 3.1.1 Benefits of the Proposed System

Use tangible and intangible benefits.

Tangible benefits:

- reduced manual review work;
- reduced stationery and paperwork;
- faster transaction review;
- lower development cost through open-source tools.

Intangible benefits:

- improved confidence in fraud monitoring;
- improved decision-making;
- reduced staff stress;
- improved data integrity and system reliability.

## 3.2 Technical Feasibility

Mention:

- Python;
- Flask;
- SQLite;
- React/Vite;
- Tailwind/shadcn;
- pandas, NumPy, scikit-learn, joblib;
- available development hardware.

## 3.3 Operational Feasibility

Explain that users can operate the dashboard, score transactions, view alerts, search records, and review accounts.

## 3.4 Organizational Feasibility

Explain how PayGuard supports finance departments, fraud review, reporting, and decision-making.

## 3.5 Schedule Feasibility

Explain that the project can be completed in phases within the available time.

## 3.6 Project Plan

Briefly describe the roadmap for building PayGuard.

### 3.6.1 Gantt Chart

Use:

![Figure 3.1: Gantt chart](docs/assets/figures/figure-2-1-gantt-chart.svg)

## 3.7 Conclusion

Conclude that the system is economically, technically, operationally, organizationally, and schedule feasible.

---

# CHAPTER 4

# REQUIREMENTS ANALYSIS

## 4.0 Introduction

Introduce user requirements, current system analysis, information gathering, and data analysis.

## 4.1 Information Gathering Methodologies

### 4.1.1 Interviews

Describe interviews with finance users, administrators, and potential fraud reviewers.

Include benefits and drawbacks.

### 4.1.2 Questionnaires

Describe questionnaires used to collect user opinions on the current process and desired system features.

Include benefits and disadvantages.

### 4.1.3 Observation

Describe observing the current manual or semi-manual transaction review process.

Include benefits and disadvantages.

## 4.1 Analysis of the Current System

Describe the current process:

- transactions are reviewed manually;
- suspicious cases are checked through records;
- reporting is slow;
- old transaction history is difficult to analyse;
- fraud patterns may be missed.

Use:

![Figure 4.1: Existing system context diagram](docs/assets/figures/figure-3-1-existing-context.svg)

![Figure 4.2: Proposed PayGuard context diagram](docs/assets/figures/figure-3-2-proposed-context.svg)

## 4.2 Functional Requirements

The system shall:

1. Capture and store transaction details.
2. Score transactions using the fraud model.
3. Generate alerts for suspicious transactions.
4. Allow users to view transactions and account summaries.
5. Provide a dashboard showing risk levels, totals, alerts, and trends.
6. Allow alert status updates.

## 4.3 Non-Functional Requirements

The system must:

- be user-friendly;
- operate on available computers;
- ensure data security and confidentiality;
- function reliably;
- be cost-effective;
- be maintainable.

## 4.4 Data Analysis

Explain the system processes and activities.

### 4.4.1 Data Flow Diagram

Use:

![Figure 4.3: Level 0 data flow diagram](docs/assets/figures/figure-3-5-level-0-dfd.svg)

![Figure 4.4: Level 1 data flow diagram](docs/assets/figures/figure-3-6-level-1-dfd.svg)

### 4.4.2 Use Case

Use:

![Figure 4.5: Use case diagram](docs/assets/figures/figure-3-3-use-case-diagram.svg)

## 4.5 Conclusion

Summarise weaknesses of the current system and how PayGuard addresses them.

---

# CHAPTER 5

# SYSTEM DESIGN

## 5.0 Introduction

Introduce design of the proposed PayGuard system.

## 5.1 Interface Design

Describe the user dashboard and main pages.

### 5.1.1 Interface Diagram

Use:

![Figure 5.1: Dashboard wireframe](docs/assets/figures/figure-3-14-dashboard-wireframe.svg)

![Figure 5.2: Alerts page wireframe](docs/assets/figures/figure-3-15-alerts-wireframe.svg)

Do not use screenshots. Insert short code excerpts instead:

```tsx
// Code Excerpt 5.1: Dashboard interface component from frontend/src/views/DashboardView.tsx
```

```tsx
// Code Excerpt 5.2: Alerts interface component from frontend/src/views/AlertsView.tsx
```

```tsx
// Code Excerpt 5.3: Transactions interface component from frontend/src/views/TransactionsView.tsx
```

## 5.1 Database Tables

Describe PayGuard tables.

### 5.1.1 Transactions Table

### 5.1.2 Alerts Table

### 5.1.3 Model Runs Table

### 5.1.4 Account Summary View

## 5.2 Data Flow Diagrams (DFDs)

Use the DFDs already listed in Chapter 4 if needed.

## 5.3 UML Diagrams

### 5.3.1 Use Case Diagram

Use:

![Figure 5.3: Use case diagram](docs/assets/figures/figure-3-3-use-case-diagram.svg)

### 5.3.2 Class Diagram

Use:

![Figure 5.4: Class diagram](docs/assets/figures/figure-3-8-class-diagram.svg)

### 5.3.3 Sequence Diagram

Use:

![Figure 5.5: Sequence diagram](docs/assets/figures/figure-3-10-sequence-diagram.svg)

### 5.3.5 Activity Diagram

Use:

![Figure 5.6: Activity diagram](docs/assets/figures/figure-3-4-activity-diagram.svg)

### 5.3.5 Component Diagram

Use:

![Figure 5.7: Component diagram](docs/assets/figures/figure-6-1-implementation-overview.svg)

### 5.3.5 State Diagram

Use:

![Figure 5.8: Alert lifecycle state chart](docs/assets/figures/figure-4-6-alert-lifecycle.svg)

## 5.5 Database Design (Entity Structure)

Describe entities and relationships.

### 5.5.1 Entity Relationship Diagram

Use:

![Figure 5.9: Entity relationship diagram](docs/assets/figures/figure-3-7-erd.svg)

![Figure 5.10: Database relationship diagram](docs/assets/figures/figure-4-5-database-relationship.svg)

## 5.3 System Architecture Design

Describe frontend, backend, database, model, and data generation.

Use:

![Figure 5.11: System architecture diagram](docs/assets/figures/figure-4-1-system-architecture.svg)

### 5.3.1 Deployment Diagram

Use:

![Figure 5.12: Deployment diagram](docs/assets/figures/figure-4-12-deployment-diagram.svg)

## 5.2 Input Design

Describe transaction scoring form, filters, search, and generated data inputs.

## 5.3 Process Design

Describe scoring, alert creation, dashboard update, and account review.

### 5.3.1 User Flow Flowchart

Use:

![Figure 5.14: Transaction scoring flowchart](docs/assets/figures/figure-3-13-scoring-flowchart.svg)

## 5.4 Output Design

Describe risk score, risk level, alert reason, dashboard totals, alerts table, and account summaries.

## 5.6 Security and Control Design

Mention validation, database constraints, error handling, synthetic data, and future authentication.

## 5.8 Hardware and Software Platform

List hardware and software used.

## 5.8.1 Deployment Diagram

Use deployment figure if required.

## 5.9 Operational Design Considerations

Mention local prototype use, future deployment, backup, retraining, and responsible human review.

## 5.10 Conclusion

Summarise system design.

---

# CHAPTER 6

# CODING AND TESTING

## 6.0 Introduction

Introduce coding and testing.

## 6.1 Coding (Programming Phase)

Describe backend, database, synthetic data, model training, and frontend coding.

Do not use screenshots. Insert short code excerpts instead:

```python
# Code Excerpt 6.1: Backend application factory and API routing from backend/app.py
```

```python
# Code Excerpt 6.2: Fraud scoring endpoint from backend/app.py
```

```python
# Code Excerpt 6.3: Model training pipeline from backend/train.py
```

```python
# Code Excerpt 6.4: Feature engineering from backend/ml/features.py
```

## 6.2 Testing

Describe testing approach.

## 6.3 Program Testing

Include validation, API, feature engineering, and model loading tests.

## 6.4 System Testing

Include frontend-backend integration, scoring workflow, dashboard metrics, transaction storage, and alert creation.

## 6.5 User Acceptance Testing

State that users check whether dashboard screens are understandable and useful.

## 6.6 Conclusion

Summarise coding and testing.

---

# CHAPTER 7

# IMPLEMENTATION AND POST-IMPLEMENTATION PLAN

## 7.0 Introduction

Introduce deployment, implementation, documentation, changeover, and maintenance.

## 7.1.1 Deployment Diagrams (1 -3)

Use:

![Figure 7.1: Deployment options diagram](docs/assets/figures/figure-6-10-deployment-options.svg)

## 7.2 System Implementation

Describe local implementation of PayGuard.

### 7.2.1 Acquisition and Installation

Mention backend dependencies, frontend dependencies, data generation, model training, database seeding, Flask backend, and React frontend.

Do not use setup screenshots. Insert setup commands instead:

```bash
# Code Excerpt 7.1: Backend setup commands
```

```bash
# Code Excerpt 7.2: Frontend setup commands
```

### 7.2.2 Data Conversion

Explain generated CSV to SQLite records.

### 7.2.3 User Training

Explain dashboard, alerts, transactions, accounts, and responsible use.

## 7.3 Changeover Strategy

Recommend parallel changeover for future real deployment.

## 7.4 Documentation

### 7.4.1 User Documentation

Mention dashboard, scoring, alerts, transactions, and accounts.

### 7.4.2 System Documentation

Mention backend, frontend, database, model, and setup documentation.

## 7.5 Maintenance and Post-Implementation Plan

Include database backup, model retraining, dependency updates, bug fixing, threshold review, and future security improvements.

## 7.6 Conclusion

Summarise implementation and post-implementation plan.

---

# CHAPTER 8

## 8.0 Introduction

Introduce the final chapter.

## 8.1 Summary of the Study

Summarise the problem, system, implementation, and testing.

## 8.2 Summary of Major Findings

Mention manual review weakness, risk scoring value, dashboard visibility, alerts, and synthetic data usefulness.

## 8.3 Significance of the Findings

Mention finance users, administrators, institutions, and researchers.

## 8.4 Conclusions

Conclude that PayGuard achieved the prototype goals.

## 8.5 Recommendations

### 8.5.1 Recommendations from the Research Findings

Recommend PayGuard-style dashboards for fraud review support.

### 8.5.2 Recommendations for Further Research

Recommend real-world data, stronger models, role-based authentication, provider integration, and audit logs.

### 8.5.3 Recommendations for Practice and Policy

Recommend human review, privacy controls, and responsible use of fraud predictions.

## 8.6 Final Statement

Close with one short paragraph.
