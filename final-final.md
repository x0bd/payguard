# CHAPTER 1

## 1.0 Introduction

Mobile money transaction monitoring is important to financial and institutional operations because it supports payment verification, fraud control, reporting, and decision-making. In many organisations, mobile money payments are received daily, and each transaction must be checked to confirm whether it is genuine or suspicious.

Despite the growth of digital payments, some fraud monitoring processes still depend on manual checking, simple rules, and scattered transaction records. These methods are slow and can fail to identify suspicious behaviour when transaction volumes increase. Fraud may appear through fake confirmations, unusual transaction amounts, repeated small transactions, account misuse, or transaction patterns that are difficult to notice manually.

This study focuses on the development of PayGuard, a mobile money fraud detection and monitoring system. The proposed system aims to analyse transaction data, assign risk scores, generate alerts, and provide a dashboard that displays summaries and trends. The dashboard enables users to view important indicators such as total transactions, risk levels, suspicious alerts, and account behaviour.

By combining transaction records, machine learning risk scoring, and dashboard visualisation, the study seeks to improve fraud monitoring and support faster decision-making. PayGuard is developed as a prototype system using synthetic mobile money transaction data.

## 1.1 Background of the Study

Mobile money has become a common payment method because it allows users to send and receive money quickly through mobile devices. It is used for school fees, business payments, personal transfers, bills, and other day-to-day financial activities. This has improved convenience, but it has also created new risks for fraud and transaction misuse.

In many payment environments, transaction monitoring is still carried out manually. Finance users may search through transaction records, compare payment details, check suspicious cases, and prepare reports by hand. When there are many records, this process becomes slow and difficult to manage.

The manual system also faces challenges such as incomplete records, delayed review, weak pattern detection, and limited reporting. A suspicious transaction may not be noticed immediately if it does not look unusual on its own. Some fraud patterns only become clear when transaction history, frequency, amount, account behaviour, and time of transaction are analysed together.

PayGuard is proposed to support this process by storing transaction records electronically and analysing them for possible fraud. The system provides risk scores, alerts, and dashboard summaries so that users can quickly identify transactions that need attention. It does not replace human review, but it helps users focus on transactions that are more likely to be suspicious.

## 1.2 Statement of the Problem

The current system failed to overcome the following:

- Suspicious mobile money transactions are checked manually.
- Manual review is slow when many transactions are received.
- Transaction histories are not analysed automatically.
- Fraud patterns may be missed because they are not always obvious.
- Finance users do not have automated risk scoring support.
- Dashboards and reports for fraud monitoring are limited.

These challenges reduce the speed, accuracy, and reliability of fraud monitoring. There is therefore a need for a system that can analyse mobile money transactions, identify suspicious behaviour, and present clear alerts for user review.

## 1.3 Objectives of the Study

1. To design and implement PayGuard, a fraud detection system for mobile money transactions.
2. To provide a dashboard that displays transaction reports, risk levels, alerts, and trends.

## 1.4 Hypotheses

H0: The proposed PayGuard system would solve the problem of monitoring suspicious mobile money transactions by 85%.

H1: The proposed PayGuard system would not solve the problem of monitoring suspicious mobile money transactions.

## 1.5 Justification of the Research

This study is justified because effective fraud monitoring is important in digital finance. Mobile money transactions are now widely used, and organisations require systems that can help identify suspicious payments quickly and accurately.

The study benefits finance users by reducing the amount of manual work required when checking transactions. It also benefits administrators by providing dashboard summaries that support reporting and decision-making. Institutions benefit from improved fraud awareness and better internal control.

The study also contributes academically by showing how machine learning and dashboard visualisation can be applied to mobile money fraud detection. Although the system uses synthetic data, it provides a practical prototype that can guide future development using real transaction data.

## 1.6 Assumptions of the Study

The study assumes that users provide valid transaction data, that basic computer infrastructure is available, that synthetic data can represent common mobile money fraud patterns, and that users are willing to adopt the dashboard for fraud review.

## 1.7 Delimitations of the Study

The study is limited to mobile money fraud monitoring using the PayGuard prototype. It focuses on synthetic transaction data, risk scoring, alert generation, dashboard summaries, transaction viewing, and account review.

The study excludes live integration with mobile money providers, banks, and production payment platforms. It also excludes final legal judgement on whether a transaction is fraudulent, since flagged transactions still require human review.

## 1.8 Limitations of the Study

Limitations include time constraints, use of synthetic data instead of real provider data, lack of live mobile money integration, limited production security features, and varying levels of user computer literacy. These limitations are addressed through a focused prototype design and a simple user dashboard.

## 1.9 Definition of Terms

- PayGuard: A prototype system for detecting and monitoring suspicious mobile money transactions.
- Fraud detection: The process of identifying transactions that may be dishonest, unauthorised, or suspicious.
- Mobile money: A digital financial service that allows users to send, receive, and store money using a mobile device.
- Machine learning: A method that enables a system to learn patterns from data and make predictions.
- Risk score: A value that shows the likelihood that a transaction may be suspicious.
- Alert: A warning generated when a transaction requires review.
- Synthetic data: Artificially generated data used for development and testing.
- Dashboard: A visual screen that displays important system information, summaries, and trends.

---

# CHAPTER 2

# LITERATURE REVIEW

## 2.0 Introduction

The purpose of this chapter is to review literature related to mobile money fraud detection, digital transaction monitoring, dashboard-based reporting, and machine learning. A literature review helps to show what has already been studied and how the present project contributes to the existing body of knowledge.

PayGuard is based on the need to improve fraud monitoring in mobile money transactions. Existing studies show that fraud detection is difficult because fraud patterns change, fraudulent transactions are fewer than normal transactions, and financial data is often sensitive. This chapter therefore reviews theoretical and empirical literature that supports the development of PayGuard as a prototype fraud detection and monitoring system.

## 2.1 Theoretical Literature Review

### 2.1.1 Mobile Money Fraud and Transaction Monitoring Systems

Mobile money services allow users to send, receive, and store money using mobile devices. These services improve convenience and financial access, but they also create opportunities for fraud. Fraud can occur through fake payment confirmations, account takeover, social engineering, repeated suspicious transactions, and abnormal account behaviour.

Fraud detection literature explains that suspicious behaviour is not always visible through a single transaction. Phua et al. (2010) state that fraud detection often requires data mining methods that compare user behaviour and identify abnormal patterns. This is important to PayGuard because the system does not only check transaction amounts; it also considers transaction history, timing, account behaviour, device changes, and location changes.

Traditional monitoring systems often depend on manual review and fixed rules. These methods are easy to understand, but they can become weak when fraudsters change their behaviour. A transaction may appear normal on its own but become suspicious when compared with previous transactions from the same account. This supports the need for automated transaction monitoring in PayGuard.

### 2.1.2 Digital Financial Record and Dashboard Systems

Digital transaction records are important because they improve storage, retrieval, reporting, and analysis. In manual systems, finance users may spend time searching through records, comparing payments, and preparing reports. Digital systems reduce this burden by keeping transaction information in one structured place.

A dashboard is useful because it presents important information in a form that users can understand quickly. In PayGuard, the dashboard shows total transactions, average risk score, alert counts, risk levels, and account summaries. This supports decision-making by helping users focus on transactions that require attention.

Digital dashboards do not remove the need for human judgement. They support users by organising information and making suspicious patterns easier to see. This is important in fraud monitoring because a system should assist investigation rather than make final legal decisions.

### 2.1.3 Machine Learning in Fraud Detection

Machine learning is widely used in fraud detection because it can learn patterns from previous transaction data and apply those patterns to new transactions. Abdallah, Maarof and Zainal (2016) explain that fraud detection systems use different techniques, including supervised learning, unsupervised learning, and hybrid methods.

Supervised learning is relevant to PayGuard because the prototype uses labelled synthetic data. The model is trained to separate normal transactions from suspicious transactions. When a new transaction is submitted, the model produces a prediction and a risk score. The risk score helps users decide whether the transaction requires further review.

Feature engineering is also important in machine learning fraud detection. Whitrow et al. (2009) found that transaction aggregation can improve fraud detection because it captures behaviour over a period of time. This supports PayGuard's use of features such as previous account activity, transaction frequency, amount differences, and time since the last transaction.

Fraud detection also faces the problem of changing fraud behaviour. Dal Pozzolo et al. (2015) note that financial fraud models may need updating because fraud patterns can change over time. This means PayGuard should be treated as a prototype that can be improved through future retraining and evaluation.

## 2.2 Empirical Literature Review

Several studies support the use of data-driven methods for fraud detection. Phua et al. (2010) reviewed data mining approaches and showed that fraud detection can use classification, clustering, anomaly detection, and hybrid methods. This supports the use of machine learning in PayGuard.

Abdallah, Maarof and Zainal (2016) reviewed fraud detection systems and found that fraud detection is not only an algorithm problem, but also a system design problem. This is relevant because PayGuard includes more than a model. It includes synthetic data generation, feature engineering, a backend application, database storage, alert creation, and a dashboard.

Whitrow et al. (2009) studied transaction aggregation for fraud detection and showed that using behavioural transaction features can improve detection. This supports the PayGuard approach of analysing account behaviour instead of relying only on individual transaction amounts.

Lopez-Rojas, Elmir and Axelsson (2016) introduced PaySim, a financial mobile money simulator for fraud detection. Their work is important because real financial data is difficult to access due to privacy and security concerns. PayGuard follows a similar principle by using synthetic mobile money transaction data for safe academic development.

Dal Pozzolo et al. (2015) studied credit card fraud detection and concept drift. Their work shows that fraud detection models should be monitored and improved because fraud behaviour changes. This supports the recommendation that future versions of PayGuard should use real approved data, feedback from users, and regular retraining.

## 2.3 Summary, Research Gap, and Significance

The reviewed literature shows that mobile money and digital finance systems require strong fraud monitoring. Manual checking and fixed rules are useful but limited when transaction volumes increase and fraud patterns become more complex. Machine learning can support fraud detection by learning patterns from transaction data and producing risk scores.

### Research Gap

Although many studies discuss fraud detection algorithms, fewer studies focus on a simple academic prototype that combines synthetic mobile money data, feature engineering, machine learning, backend scoring, database storage, alerts, and a dashboard in one system. Much of the available literature also focuses on credit card fraud rather than mobile money style transactions in institutional payment environments.

PayGuard addresses this gap by presenting a complete prototype for mobile money fraud monitoring. It does not only train a model; it also shows how the model can be connected to a usable dashboard and alert review process.

### Significance of the Study

The study is significant to finance users because it reduces manual checking and helps them identify suspicious transactions faster. It is significant to administrators because it provides dashboard summaries and reports for decision-making. It is significant to institutions because it supports better fraud awareness and internal control.

Academically, the study contributes to research on mobile money fraud detection by showing how machine learning can be implemented in a working prototype using safe synthetic data. It also provides a foundation for future research using real transaction data, stronger models, role-based access control, and provider integration.

---

# CHAPTER 3

# FEASIBILITY STUDY

## 3.0 Introduction

A feasibility study assesses whether the proposed system can be developed and used successfully. It considers cost, technology, operations, time, organizational support, and the benefits expected from the system.

The purpose of this chapter is not to solve the problem, but to determine whether PayGuard is realistic and beneficial. The findings guide the decision to continue with the development of the proposed fraud detection and monitoring system.

## 3.1 Economic Feasibility

The researcher examined the cost-benefit analysis of PayGuard to determine whether the project can be developed within available resources. The system is economically feasible because it uses open-source tools such as Python, Flask, SQLite, React, Vite, Tailwind, and scikit-learn. These tools reduce software licensing costs.

PayGuard also reduces the cost of manual transaction review by helping users identify suspicious transactions faster. Although the prototype requires development time and basic computer equipment, the expected benefits are greater than the development cost.

### 3.1.1 Benefits of the Proposed System

Tangible benefits:

- Reduced manual fraud review work.
- Reduced paperwork and repeated checking.
- Faster transaction scoring and alert review.
- Lower development cost through open-source technologies.
- Improved access to stored transaction records.

Intangible benefits:

- Improved confidence in fraud monitoring.
- Improved decision-making through dashboard summaries.
- Reduced pressure on finance users.
- Improved data organisation and system reliability.
- Better awareness of suspicious transaction behaviour.

## 3.2 Technical Feasibility

Technical feasibility assesses whether the required technology is available to develop and run the proposed system. PayGuard is technically feasible because it uses tools that can run on standard development computers.

The backend is developed using Python and Flask. SQLite is used for database storage. The machine learning model is trained using pandas, NumPy, scikit-learn, and joblib. The frontend is developed using React, TypeScript, Vite, Tailwind CSS, and shadcn/ui components.

The system does not require advanced hardware for prototype use. A normal computer with Python, Node.js, and a web browser is enough to run and test the application locally.

## 3.3 Operational Feasibility

Operational feasibility assesses whether users can operate the system after it has been developed. PayGuard is operationally feasible because it provides a simple dashboard where users can view transactions, alerts, risk scores, and account summaries.

The system supports the work already done by finance users. Instead of replacing their role, it helps them identify which transactions need attention. Users can submit transactions for scoring, view alerts, and update alert status after review.

## 3.4 Organizational Feasibility

Organizational feasibility evaluates whether the proposed system supports the goals of the institution or department. PayGuard supports institutions that want to improve fraud monitoring, reduce manual workload, and make transaction review more organised.

The proposed system aligns with the need for better digital payment control. It helps administrators and finance users access useful reports and dashboard summaries. Therefore, the system is organizationally feasible.

## 3.5 Schedule Feasibility

Schedule feasibility assesses whether the project can be completed within the available time. PayGuard can be developed in phases, beginning with project planning and data generation, followed by machine learning model training, backend development, frontend development, testing, and documentation.

The project scope is controlled by focusing on a prototype. Features such as live mobile money provider integration and full production authentication are left for future work. This makes the schedule realistic.

## 3.6 Project Plan

The project plan provides a roadmap for developing PayGuard. The main activities include planning the system, generating synthetic transaction data, training the fraud detection model, creating the backend API, building the dashboard, testing the system, and preparing documentation.

### 3.6.1 Gantt Chart

![Figure 3.1: Gantt chart](docs/assets/figures/figure-2-1-gantt-chart.svg)

## 3.7 Conclusion

The feasibility analysis confirms that PayGuard is economically viable, technically achievable, operationally practical, organizationally useful, and possible to complete within the available time. The system can therefore proceed to requirements analysis and design.

---

# CHAPTER 4

# REQUIREMENTS ANALYSIS

## 4.0 Introduction

This chapter explains the requirements of the proposed PayGuard system. It gives an overview of the current fraud monitoring process, the methods used to gather information, and the functional and non-functional requirements of the proposed system.

The researcher used information gathering methods to understand the weaknesses of the current system and the expectations of users. The chapter also presents data analysis through diagrams that show how information moves within the current and proposed system.

## 4.1 Information Gathering Methodologies

The researcher used interviews, questionnaires, and observation to collect information about the current mobile money fraud monitoring process. These methods helped to identify user needs and the main challenges faced during manual transaction review.

### 4.1.1 Interviews

Interviews were used to collect detailed information from possible system users such as finance officers, administrators, and fraud review personnel. The researcher asked questions about how transactions are currently checked, how suspicious cases are identified, and what improvements users expect from a digital monitoring system.

Benefits:

- The researcher obtained first-hand information.
- Users explained the challenges they face during manual review.
- Misunderstandings were clarified through follow-up questions.
- The researcher understood the type of dashboard information users need.

Drawbacks:

- Some users may not provide all information because of confidentiality.
- Interviews can take time to arrange and conduct.
- Responses may differ depending on each user's experience.

### 4.1.2 Questionnaires

Questionnaires were used to collect user opinions in a structured way. The questions focused on manual transaction checking, reporting, alert handling, dashboard needs, and willingness to use a digital fraud monitoring system.

Benefits:

- Questionnaires saved time.
- They allowed users to answer similar questions.
- Responses were easier to compare.
- They helped identify common user requirements.

Disadvantages:

- Some users may give short or incomplete answers.
- Questions can be misunderstood if there is no explanation.
- Follow-up questions are limited.

### 4.1.3 Observation

Observation was used to understand how manual or semi-manual transaction review is carried out. The researcher observed how records are checked, how suspicious transactions are identified, and how users prepare reports.

Benefits:

- The researcher observed the real process directly.
- It helped identify delays in the current system.
- It showed how users interact with transaction records.
- It helped confirm information gathered from interviews and questionnaires.

Disadvantages:

- Users may change their behaviour when they know they are being observed.
- Observation depends on what happens during the observation period.
- Some activities may not be visible because of confidentiality.

## 4.1 Analysis of the Current System

In the current system, mobile money transactions are reviewed manually or through simple rule-based checks. Finance users search through transaction records, compare payment details, and identify suspicious cases based on experience. Reports are also prepared manually or through basic spreadsheets.

This process is slow when transaction volumes increase. Suspicious behaviour may be missed because account history, transaction frequency, device changes, location changes, and previous transaction patterns are not analysed automatically. The current process also makes it difficult to prioritise high-risk transactions.

Who reviews the data? Finance users and fraud review personnel.

Who uses the reports? Administrators, finance officers, and management.

Problem: Suspicious transactions may not be detected early because the current process depends heavily on manual checking and limited reporting.

![Figure 4.1: Existing system context diagram](docs/assets/figures/figure-3-1-existing-context.svg)

![Figure 4.2: Proposed PayGuard context diagram](docs/assets/figures/figure-3-2-proposed-context.svg)

## 4.2 Functional Requirements

The system shall:

1. Capture and store mobile money transaction details.
2. Score transactions using the fraud detection model.
3. Generate alerts for suspicious transactions.
4. Display dashboard summaries for transactions, alerts, and risk levels.
5. Allow users to view transaction history.
6. Allow users to search and review account summaries.
7. Allow users to update alert status after review.
8. Provide metrics that support fraud monitoring and reporting.

## 4.3 Non-Functional Requirements

The system must:

- Be user-friendly and easy to understand.
- Operate on available computers.
- Respond quickly during transaction scoring and dashboard loading.
- Store data reliably using the database.
- Protect transaction data from unnecessary exposure.
- Be maintainable for future updates.
- Be cost-effective for prototype development.

## 4.4 DATA ANALYSIS

The developer analysed the activities performed in the current system and the processes required in the proposed PayGuard system. The analysis focused on how transaction data enters the system, how fraud scoring is performed, how alerts are created, and how users view the results.

### 4.4.1 Data Flow Diagram

The data flow diagram shows how transaction information moves between users, the PayGuard system, the database, and the machine learning model. A transaction is submitted to the system, scored by the model, stored in the database, and displayed on the dashboard together with any generated alert.

![Figure 4.3: Level 0 data flow diagram](docs/assets/figures/figure-3-5-level-0-dfd.svg)

![Figure 4.4: Level 1 data flow diagram](docs/assets/figures/figure-3-6-level-1-dfd.svg)

### 4.4.2 Use Case

The use case diagram shows the main actions performed by users in PayGuard. Users can view the dashboard, score transactions, view alerts, update alert status, view transactions, and search account summaries.

![Figure 4.5: Use case diagram](docs/assets/figures/figure-3-3-use-case-diagram.svg)

## 4.5 Conclusion

The current fraud monitoring process is slow, manual, and limited in its ability to analyse transaction patterns. PayGuard addresses these weaknesses by providing transaction storage, risk scoring, alert generation, dashboard summaries, and account review. The requirements identified in this chapter guide the system design in the next chapter.

---

# CHAPTER 5

# SYSTEM DESIGN

## 5.0 Introduction

System design describes how the proposed PayGuard system is structured before implementation. It explains the interface, database tables, diagrams, inputs, processes, outputs, security controls, hardware, and software platform.

The purpose of this chapter is to show how the requirements identified in Chapter 4 are converted into a working system design. PayGuard is designed as a web-based prototype with a React frontend, Flask backend, SQLite database, synthetic data generator, and machine learning fraud scoring model.

## 5.1 Interface Design

The interface design focuses on making fraud monitoring simple for users. The dashboard provides transaction metrics, alert summaries, risk scores, and a scoring form. The alerts page allows users to review suspicious transactions and update their status. The transactions page allows users to filter and search transaction records.

The interface uses a clean layout with cards, tables, filters, badges, and charts. This helps users identify important information quickly without searching through many manual records.

### 5.1.1 Interface Diagram

![Figure 5.1: Dashboard wireframe](docs/assets/figures/figure-3-14-dashboard-wireframe.svg)

![Figure 5.2: Alerts page wireframe](docs/assets/figures/figure-3-15-alerts-wireframe.svg)

Instead of screenshots, the following code excerpts show the actual interface implementation used in the system.

**Code Excerpt 5.1: Dashboard KPI card component**

```tsx
function KpiCard({
  label,
  value,
  delta,
  direction,
  accentColor,
  icon: Icon,
  loading,
}: {
  label: string;
  value: string;
  delta?: string;
  direction?: "up-good" | "up-bad" | "neutral";
  accentColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  loading?: boolean;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-border bg-card p-6"
      style={{ borderLeftWidth: 3, borderLeftColor: accentColor }}
    >
      <p className="text-[11px] font-medium uppercase tracking-widest">
        {label}
      </p>
      {loading ? <Skeleton className="h-9 w-28 rounded-lg" /> : <p>{value}</p>}
    </div>
  );
}
```

**Code Excerpt 5.2: Alert risk style helper**

```tsx
function riskStyle(score: number) {
  if (score >= 0.9) return {
    dot: "bg-red-500",
    badge: "border-red-200 bg-red-50 text-red-700",
    label: "critical",
  };
  if (score >= 0.75) return {
    dot: "bg-orange-500",
    badge: "border-orange-200 bg-orange-50 text-orange-700",
    label: "high",
  };
  if (score >= 0.55) return {
    dot: "bg-amber-500",
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    label: "medium",
  };
  return {
    dot: "bg-green-500",
    badge: "border-green-200 bg-green-50 text-green-700",
    label: "low",
  };
}
```

**Code Excerpt 5.3: Transactions filtering logic**

```tsx
const filtered = transactions.filter(t => {
  if (typeFilter !== "all" && t.transaction_type !== typeFilter) return false;
  if (fraudFilter === "flagged" && !t.is_fraud) return false;
  if (fraudFilter === "clean" && t.is_fraud) return false;
  if (search) {
    const q = search.toLowerCase();
    return (
      t.account_id.toLowerCase().includes(q) ||
      t.transaction_type.toLowerCase().includes(q) ||
      (t.location ?? "").toLowerCase().includes(q) ||
      (t.device_id ?? "").toLowerCase().includes(q)
    );
  }
  return true;
});
```

## 5.1 Database Tables

The PayGuard database is designed using SQLite. It stores transaction records, fraud alerts, and model training records. The database is simple enough for a prototype but structured enough to support dashboard reporting and alert review.

### 5.1.1 Transactions Table

The transactions table stores mobile money transaction details. It includes account ID, transaction type, amount, currency, device ID, location, creation time, fraud label, fraud score, metadata, and insertion time.

**Table 5.1: Transactions table**

| Field name | Data type | Description |
| --- | --- | --- |
| id | INTEGER | Unique transaction identifier. |
| account_id | TEXT | Account linked to the transaction. |
| transaction_type | TEXT | Type of mobile money transaction. |
| amount | REAL | Transaction amount. |
| currency | TEXT | Transaction currency. |
| device_id | TEXT | Device used for the transaction. |
| location | TEXT | Transaction location. |
| created_at | TEXT | Date and time of transaction. |
| is_fraud | INTEGER | Fraud prediction label. |
| fraud_score | REAL | Risk score assigned by the model. |

### 5.1.2 Alerts Table

The alerts table stores warnings generated for suspicious transactions. Each alert is linked to a transaction and includes risk score, alert type, reason, status, creation time, and resolved time.

**Table 5.2: Alerts table**

| Field name | Data type | Description |
| --- | --- | --- |
| id | INTEGER | Unique alert identifier. |
| transaction_id | INTEGER | Transaction linked to the alert. |
| risk_score | REAL | Risk score that caused the alert. |
| alert_type | TEXT | Type of alert generated. |
| reason | TEXT | Reason why the alert was created. |
| status | TEXT | Current alert status. |
| created_at | TEXT | Date and time the alert was created. |
| resolved_at | TEXT | Date and time the alert was resolved. |

### 5.1.3 Model Runs Table

The model runs table stores information about trained fraud detection models. It records the model name, version, metrics, notes, and training date.

**Table 5.3: Model runs table**

| Field name | Data type | Description |
| --- | --- | --- |
| id | INTEGER | Unique model run identifier. |
| model_name | TEXT | Name of the trained model. |
| model_version | TEXT | Version or label of the model. |
| metrics_json | TEXT | Stored model evaluation metrics. |
| notes | TEXT | Notes about the training run. |
| created_at | TEXT | Date and time the model run was recorded. |

### 5.1.4 Account Summary View

The account summary is not stored as a separate table. It is derived from transaction and alert records when a user searches for an account. This allows the system to show account totals, risk behaviour, and previous transactions.

**Code Excerpt 5.4: SQLite database schema**

```python
SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id TEXT NOT NULL,
    transaction_type TEXT NOT NULL,
    amount REAL NOT NULL CHECK(amount >= 0),
    currency TEXT NOT NULL,
    device_id TEXT,
    location TEXT,
    created_at TEXT NOT NULL,
    is_fraud INTEGER NOT NULL DEFAULT 0 CHECK (is_fraud IN (0, 1)),
    fraud_score REAL,
    metadata_json TEXT,
    inserted_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_id INTEGER NOT NULL,
    risk_score REAL NOT NULL,
    alert_type TEXT NOT NULL,
    reason TEXT,
    status TEXT NOT NULL DEFAULT 'open',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    resolved_at TEXT,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE
);
"""
```

## 5.2 Data Flow Diagrams (DFDs)

The data flow diagrams show how PayGuard receives transaction data, sends it for scoring, stores the result, and displays alerts and summaries to the user.

![Figure 5.3: Level 0 data flow diagram](docs/assets/figures/figure-3-5-level-0-dfd.svg)

![Figure 5.4: Level 1 data flow diagram](docs/assets/figures/figure-3-6-level-1-dfd.svg)

## 5.3 UML Diagrams

UML diagrams are used to show the behaviour and structure of the proposed system. They describe how users interact with PayGuard and how the main system components are arranged.

### 5.3.1 Use Case Diagram

The use case diagram shows the main functions available to the user. These include viewing the dashboard, scoring transactions, viewing alerts, updating alert status, viewing transactions, and searching account summaries.

![Figure 5.5: Use case diagram](docs/assets/figures/figure-3-3-use-case-diagram.svg)

### 5.3.2 Class Diagram

The class diagram shows the main system entities and their relationships. It includes transactions, alerts, model runs, account summaries, and the fraud scoring service.

![Figure 5.6: Class diagram](docs/assets/figures/figure-3-8-class-diagram.svg)

### 5.3.3 Sequence Diagram

The sequence diagram shows the order of interaction when a user submits a transaction for scoring. The frontend sends the transaction to the backend, the backend prepares features, the model predicts risk, and the database stores the result.

![Figure 5.7: Sequence diagram](docs/assets/figures/figure-3-10-sequence-diagram.svg)

### 5.3.5 Activity Diagram

The activity diagram shows the workflow followed when a transaction is reviewed. The process begins with transaction input and ends with either a normal transaction record or an alert for user review.

![Figure 5.8: Activity diagram](docs/assets/figures/figure-3-4-activity-diagram.svg)

### 5.3.5 Component Diagram

The component diagram shows the main implementation components of PayGuard. It includes frontend views, API routes, the database layer, feature engineering module, model training module, and saved model artefacts.

![Figure 5.9: Component diagram](docs/assets/figures/figure-6-1-implementation-overview.svg)

### 5.3.5 State Diagram

The state diagram shows the lifecycle of an alert. An alert may start as open, then later become reviewed, resolved, or closed depending on the user's investigation.

![Figure 5.10: Alert lifecycle state chart](docs/assets/figures/figure-4-6-alert-lifecycle.svg)

## 5.5 Database Design (Entity Structure)

The database design is based on three main stored entities: transactions, alerts, and model runs. Transactions represent payment activity. Alerts represent suspicious cases generated from transaction risk scores. Model runs represent training results and model metadata.

The relationship between transactions and alerts is one-to-many in design, although most prototype transactions generate either one alert or none. The model run table is independent and stores machine learning training records.

### 5.5.1 Entity Relationship Diagram

![Figure 5.11: Entity relationship diagram](docs/assets/figures/figure-3-7-erd.svg)

![Figure 5.12: Database relationship diagram](docs/assets/figures/figure-4-5-database-relationship.svg)

## 5.3 System Architecture Design

PayGuard uses a simple client-server architecture. The frontend is a React application that users access through a web browser. The backend is a Flask API that handles validation, scoring, database operations, and alert management. SQLite stores transaction and alert data. The machine learning model is loaded by the backend when scoring is required.

Synthetic transaction data is generated for training and demonstration. The model is trained using engineered features, then saved and used by the backend API.

![Figure 5.13: System architecture diagram](docs/assets/figures/figure-4-1-system-architecture.svg)

### 5.3.1 Deployment Diagram

The deployment diagram shows how the frontend, backend, database, and model artefacts are arranged in the prototype environment.

![Figure 5.14: Deployment diagram](docs/assets/figures/figure-4-12-deployment-diagram.svg)

## 5.2 Input Design

The main inputs of PayGuard are transaction details. These include account ID, transaction type, amount, currency, device ID, location, and date. The dashboard also accepts filter inputs for searching transactions and reviewing alerts.

The input design is kept simple so that users can submit a transaction quickly. Validation is performed to reduce incorrect entries, such as missing account IDs or invalid amounts.

## 5.3 Process Design

The main process in PayGuard is fraud scoring. A user submits a transaction through the frontend. The backend validates the input, retrieves account history, builds model features, predicts the fraud risk score, stores the transaction, and creates an alert if the risk is high.

After scoring, the dashboard updates the displayed metrics. Users can then review alerts and change their status after investigation.

### 5.3.1 User Flow Flowchart

![Figure 5.15: Transaction scoring flowchart](docs/assets/figures/figure-3-13-scoring-flowchart.svg)

## 5.4 Output Design

The main outputs of PayGuard are risk score, risk level, alert reason, transaction list, alert list, dashboard totals, and account summaries. These outputs help users decide which transactions require further review.

The dashboard displays summary cards for total transactions, alerts, average risk score, and recent activity. The alerts page displays suspicious cases with risk labels and status. The transactions page displays transaction records with filters and search.

## 5.6 Security and Control Design

The system includes basic controls to protect data quality and reduce misuse. Input validation is performed before transactions are stored. Database constraints prevent negative transaction amounts and invalid fraud labels. Foreign keys link alerts to their transactions.

The prototype uses synthetic data, which reduces privacy risk during development. Error handling is included in the backend to return controlled API responses. Future versions should include full authentication, role-based access control, audit logs, encryption controls, and secure production deployment.

## 5.8 Hardware and Software Platform

The system was developed using a standard Windows development machine. The backend uses Python, Flask, SQLite, pandas, NumPy, scikit-learn, and joblib. The frontend uses React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Icons, and chart components.

The prototype can be run locally using Python for the backend and Node.js for the frontend. A web browser is required to access the dashboard.

## 5.8.1 Deployment Diagram

The deployment design supports local prototype use and can be extended to a hosted environment in future.

![Figure 5.16: Deployment options diagram](docs/assets/figures/figure-6-10-deployment-options.svg)

## 5.9 Operational Design Considerations

PayGuard is designed as a prototype, so users should treat alerts as decision-support information rather than final proof of fraud. Human review remains important before action is taken on any flagged transaction.

Operational considerations include database backup, model retraining, alert threshold review, dependency updates, and future security improvements. If the system is deployed in a real environment, it should be tested with approved real data and connected to proper authentication and audit controls.

## 5.10 Conclusion

This chapter presented the design of the PayGuard system. It covered interface design, database tables, DFDs, UML diagrams, architecture, input design, process design, output design, security controls, platform requirements, and operational considerations. The design provides the foundation for coding and testing in the next chapter.

---

# CHAPTER 6

# CODING AND TESTING

## 6.0 Introduction

This chapter explains the coding and testing of the PayGuard system. Coding involved developing the backend API, SQLite database layer, synthetic data workflow, machine learning model, and React frontend dashboard.

Testing was carried out to check whether the main functions of the system worked correctly. The tests focused on transaction validation, fraud scoring, alert creation, dashboard loading, transaction storage, and user interaction.

## 6.1 Coding (Programming Phase)

The coding phase was divided into backend development, database development, machine learning development, and frontend development. The backend was developed using Flask and provides API routes for health checks, transactions, scoring, alerts, accounts, and metrics. The database was developed using SQLite. The machine learning model was trained using scikit-learn. The frontend was developed using React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

The following code excerpts show important parts of the PayGuard implementation.

**Code Excerpt 6.1: Backend application setup and health endpoint**

```python
def create_app() -> Flask:
    app = Flask(__name__)
    init_db()
    model_context: dict[str, Any] | None = None
    model_error: str | None = None
    try:
        model_context = load_model_context()
    except Exception as exc:
        model_error = str(exc)

    app.config["MODEL_CONTEXT"] = model_context
    app.config["MODEL_ERROR"] = model_error

    @app.get("/api/health")
    def health_check():
        ping_db()
        model_context = current_app.config.get("MODEL_CONTEXT")
        model_status = "loaded" if model_context else "unavailable"
        return jsonify({
            "status": "ok",
            "service": "payguard-api",
            "database": "connected",
            "model_status": model_status,
        })
```

**Code Excerpt 6.2: Fraud scoring endpoint**

```python
@app.post("/api/score")
def score_transaction():
    model_context = current_app.config.get("MODEL_CONTEXT")
    if not model_context:
        raise APIError("Fraud model is not loaded.", 503)

    payload = request.get_json()
    transaction = validate_transaction_payload(payload)
    account_history = fetch_account_history(
        account_id=transaction["account_id"],
        limit=5000,
    )

    model_input, key_features = build_scoring_features(account_history, transaction)
    pipeline = model_context["pipeline"]
    predicted_label = int(pipeline.predict(model_input)[0])
    risk_score = float(pipeline.predict_proba(model_input)[0][1])
    risk_level = risk_level_from_score(risk_score)
    reason = build_alert_reason(key_features)
```

**Code Excerpt 6.3: Model training pipeline**

```python
def train_models(dataset_path: Path, models_dir: Path, test_size: float, random_seed: int):
    raw = load_transactions(dataset_path)
    bundle = build_feature_frame(raw)

    X_train, X_test, y_train, y_test = train_test_split(
        bundle.X,
        bundle.y,
        test_size=test_size,
        random_state=random_seed,
        stratify=bundle.y,
    )

    random_forest_model = Pipeline(
        steps=[
            ("prep", _build_preprocessor(bundle.numeric_features, bundle.categorical_features)),
            ("model", RandomForestClassifier(
                n_estimators=240,
                max_depth=18,
                class_weight="balanced_subsample",
                random_state=random_seed,
            )),
        ]
    )
```

**Code Excerpt 6.4: Feature engineering**

```python
frame["hour"] = frame["created_at"].dt.hour.astype(int)
frame["day_of_week"] = frame["created_at"].dt.dayofweek.astype(int)
frame["is_weekend"] = frame["day_of_week"].isin([5, 6]).astype(int)
frame["is_night"] = frame["hour"].isin([0, 1, 2, 3, 4, 5]).astype(int)

frame["amount_log"] = np.log1p(frame["amount"])
frame["account_prior_tx_count"] = grouped.cumcount().astype(float)
frame["amount_to_prior_avg_ratio"] = (
    frame["amount"] / (frame["account_prior_avg_amount"] + 1e-6)
)
frame["seconds_since_prev_tx"] = (
    grouped["created_at"].diff().dt.total_seconds().fillna(86400.0)
)
frame["device_change"] = (
    (frame["account_prior_tx_count"] > 0) & (frame["device_id"] != previous_device)
).astype(int)
```

## 6.2 Testing

Testing was done to confirm that PayGuard meets its main requirements. The researcher tested individual programs, the connection between frontend and backend, and the overall workflow from transaction input to alert review.

The testing process checked whether the system could accept valid transaction data, reject invalid data, score transactions, create alerts, store records, load dashboard metrics, and display results to the user.

## 6.3 Program Testing

Program testing focused on individual modules. The backend validation logic, API endpoints, database functions, feature engineering functions, and model loading process were tested separately.

**Table 6.1: Program test cases**

| Test area | Test performed | Expected result | Result |
| --- | --- | --- | --- |
| Transaction validation | Submit transaction with missing account ID. | Error message returned. | Passed |
| Amount validation | Submit negative amount. | Request rejected. | Passed |
| Health endpoint | Open `/api/health`. | Database and model status shown. | Passed |
| Model loading | Start backend after training model. | Model context loads successfully. | Passed |
| Feature engineering | Build features from transaction history. | Numeric and categorical features created. | Passed |
| Alert creation | Score high-risk transaction. | Alert record created. | Passed |

## 6.4 System Testing

System testing checked whether the different parts of PayGuard work together as one system. The frontend was connected to the Flask backend, and the backend was connected to the SQLite database and machine learning model.

**Table 6.2: System test cases**

| Test area | Test performed | Expected result | Result |
| --- | --- | --- | --- |
| Frontend-backend connection | Load dashboard data from API. | Metrics display on dashboard. | Passed |
| Scoring workflow | Submit transaction from dashboard. | Risk score and risk level returned. | Passed |
| Transaction storage | Score a transaction. | Transaction saved in database. | Passed |
| Alert workflow | Submit risky transaction. | Alert appears in alerts page. | Passed |
| Transaction filters | Search and filter transactions. | Matching records displayed. | Passed |
| Account review | Search account profile. | Account summary and history displayed. | Passed |

## 6.5 User Acceptance Testing

User acceptance testing was carried out to check whether the system is understandable and useful to intended users. Users were expected to review the dashboard, transaction scoring form, alerts page, transactions page, and account summary page.

**Table 6.3: User acceptance testing summary**

| User requirement | Acceptance condition | Result |
| --- | --- | --- |
| View dashboard summaries. | User can understand totals and risk indicators. | Accepted |
| Score a transaction. | User can submit transaction details and view score. | Accepted |
| Review alerts. | User can open alerts and understand risk level. | Accepted |
| Filter transactions. | User can search by account, type, device, or location. | Accepted |
| Review account history. | User can view account behaviour summary. | Accepted |

## 6.6 Conclusion

This chapter described the coding and testing of PayGuard. The system was implemented using Flask, SQLite, scikit-learn, and React. Testing confirmed that the main prototype functions worked as expected, including transaction validation, fraud scoring, alert generation, dashboard metrics, transaction filtering, and account review.

---

# CHAPTER 7

# IMPLEMENTATION AND POST-IMPLEMENTATION PLAN

## 7.0 Introduction

This chapter explains how the PayGuard system was implemented and how it can be maintained after implementation. It covers deployment, installation, data conversion, user training, changeover strategy, documentation, and maintenance.

PayGuard was implemented as a local prototype with a Flask backend, SQLite database, machine learning model, and React frontend. The system can later be improved for hosted deployment after additional security and real-data testing.

## 7.1.1 Deployment Diagrams (1 -3)

The deployment design shows the main options for running PayGuard. In the prototype stage, the frontend and backend can run locally on a development machine. In future, the frontend can be hosted separately while the backend and database are deployed in a controlled server environment.

![Figure 7.1: Deployment options diagram](docs/assets/figures/figure-6-10-deployment-options.svg)

## 7.2 System Implementation

System implementation involved preparing the backend, installing dependencies, generating synthetic data, training the model, seeding the database, starting the Flask API, installing frontend dependencies, and running the React dashboard.

The backend provides API endpoints for transactions, scoring, alerts, accounts, metrics, and health checks. The frontend consumes these endpoints and displays the fraud monitoring dashboard to the user.

### 7.2.1 Acquisition and Installation

The required backend libraries were installed from the backend requirements file. These included Flask, pandas, NumPy, scikit-learn, joblib, and python-dotenv. The frontend dependencies were installed using pnpm and included React, Vite, Tailwind CSS, shadcn/ui components, React Icons, and Recharts.

Instead of setup screenshots, the following command excerpts show how the system is installed and started.

**Code Excerpt 7.1: Backend setup commands**

```bash
cd backend
python -m pip install -r requirements.txt
python generate_data.py
python train.py
python init_db.py
python seed_db_from_csv.py
python app.py
```

**Code Excerpt 7.2: Frontend setup commands**

```bash
cd frontend
pnpm install
pnpm dev
pnpm build
```

### 7.2.2 Data Conversion

Data conversion involved generating synthetic mobile money transaction data and loading it into the SQLite database. The generated data was first saved as CSV files. The seeding script then read the CSV records and inserted them into the transactions table.

This approach allowed PayGuard to have enough transaction records for dashboard metrics, account summaries, transaction filtering, and fraud scoring demonstrations without using private customer data.

### 7.2.3 User Training

Users need basic training before using PayGuard. Training should explain how to view the dashboard, submit transactions for scoring, interpret risk scores, review alerts, filter transactions, and search account profiles.

Users must also be trained on responsible use. A PayGuard alert should be treated as a warning that requires review, not as final proof of fraud. Human judgement remains necessary before any serious action is taken.

## 7.3 Changeover Strategy

For future real deployment, a parallel changeover strategy is recommended. This means the existing manual fraud monitoring process should continue while PayGuard is tested alongside it.

Parallel changeover is safer because users can compare PayGuard alerts with the existing review process before fully depending on the system. It also allows errors, missing requirements, and training needs to be identified early.

## 7.4 Documentation

Documentation is important because it helps users and developers understand how to operate and maintain the system.

### 7.4.1 User Documentation

User documentation should explain how to open the dashboard, score a transaction, view alerts, update alert status, filter transactions, and search account summaries. It should also explain the meaning of risk scores and risk levels.

### 7.4.2 System Documentation

System documentation should explain the backend structure, frontend structure, database tables, model training process, setup commands, environment configuration, and maintenance procedures. This helps future developers improve the system.

## 7.5 Maintenance and Post-Implementation Plan

PayGuard requires maintenance to remain useful and reliable. The database should be backed up, dependencies should be updated, bugs should be fixed, and the fraud model should be retrained when better data becomes available.

**Table 7.1: Maintenance activities**

| Maintenance activity | Description | Frequency |
| --- | --- | --- |
| Database backup | Save a copy of the SQLite database. | Weekly or before major changes |
| Model retraining | Retrain the fraud model with improved data. | When new approved data is available |
| Dependency updates | Update Python and frontend packages. | Monthly or when security updates appear |
| Bug fixing | Correct errors reported by users. | As required |
| Threshold review | Review risk score alert thresholds. | After user feedback |
| Security improvement | Add authentication, audit logs, and access control. | Before production deployment |

## 7.6 Conclusion

This chapter described the implementation and post-implementation plan for PayGuard. It explained deployment, installation, data conversion, user training, changeover strategy, documentation, and maintenance. The chapter shows that PayGuard can be implemented as a local prototype and later improved for real deployment.

---

# CHAPTER 8

## 8.0 Introduction

This chapter presents the summary, major findings, significance, conclusions, and recommendations of the PayGuard project. It closes the study by explaining what was achieved and what can be improved in future.

## 8.1 Summary of the Study

The study focused on the development of PayGuard, a mobile money fraud detection and monitoring system. The problem addressed was the slow and unreliable nature of manual fraud monitoring where suspicious mobile money transactions are checked without automated risk scoring or dashboard support.

The system was designed and implemented as a prototype using synthetic transaction data, machine learning, a Flask backend, SQLite database, and React dashboard. PayGuard allows users to score transactions, view risk levels, review alerts, search transaction records, and view account summaries.

## 8.2 Summary of Major Findings

The study found that manual fraud review is slow when transaction volumes increase. It also found that fraud patterns may be missed if account history, transaction frequency, device changes, location changes, and transaction timing are not analysed together.

The project showed that machine learning can support fraud monitoring by producing risk scores for transactions. It also showed that a dashboard improves visibility by presenting transactions, alerts, metrics, and account summaries in one place.

The use of synthetic data made it possible to develop and test the prototype safely without exposing real customer or banking data.

## 8.3 Significance of the Findings

The findings are significant to finance users because PayGuard reduces manual checking and helps them focus on transactions that require attention. The findings are significant to administrators because the dashboard supports reporting and decision-making.

The findings are also significant to institutions because the system demonstrates how digital tools can improve fraud awareness and internal controls. Academically, the project contributes to mobile money fraud detection research by showing a complete prototype that includes data generation, model training, backend scoring, alert storage, and dashboard review.

## 8.4 Conclusions

The study concludes that PayGuard achieved its main prototype goals. The system was able to store transactions, score transaction risk, create alerts, display dashboard metrics, and support account review.

PayGuard does not replace human investigators. It provides decision-support information that helps users identify suspicious transactions faster and more clearly.

## 8.5 Recommendations

### 8.5.1 Recommendations from the Research Findings

The study recommends the use of dashboard-based fraud monitoring systems to support finance users during transaction review. Institutions that handle mobile money payments should consider systems that provide risk scores, alerts, and transaction summaries.

The study also recommends that alerts should always be reviewed by a human user before action is taken.

### 8.5.2 Recommendations for Further Research

Future research should test PayGuard with approved real transaction data. Stronger models such as gradient boosting and anomaly detection can also be compared with the current approach.

Further research should also include role-based authentication, audit logs, mobile money provider integration, explainable AI features, and real-time transaction monitoring.

### 8.5.3 Recommendations for Practice and Policy

Institutions should use fraud detection systems responsibly. Risk scores should be treated as decision-support indicators and not as final proof of fraud. Privacy controls should be followed when handling transaction data.

Policies should also define who can view transaction records, who can resolve alerts, how long records should be stored, and how fraud monitoring models should be reviewed.

## 8.6 Final Statement

PayGuard demonstrates how a simple machine-learning-supported fraud monitoring prototype can improve the review of mobile money transactions. The system provides a foundation for future development into a more secure, integrated, and production-ready fraud detection platform.

---

# References

Abdallah, A., Maarof, M.A. and Zainal, A. (2016) 'Fraud detection system: a survey', *Journal of Network and Computer Applications*, 68, pp. 90-113.

Dal Pozzolo, G., Boracchi, G., Caelen, O., Alippi, C. and Bontempi, G. (2015) 'Credit card fraud detection and concept drift adaptation with delayed supervised information', in *Proceedings of the International Joint Conference on Neural Networks*. IEEE.

Lopez-Rojas, E.A., Elmir, A. and Axelsson, S. (2016) 'PaySim: a financial mobile money simulator for fraud detection', in *Proceedings of the 28th European Modeling and Simulation Symposium*. Larnaca, Cyprus.

Phua, C., Lee, V., Smith, K. and Gayler, R. (2010) 'A comprehensive survey of data mining-based fraud detection research', *arXiv preprint*, arXiv:1009.6119.

Whitrow, C., Hand, D.J., Juszczak, P., Weston, D. and Adams, N.M. (2009) 'Transaction aggregation as a strategy for credit card fraud detection', *Data Mining and Knowledge Discovery*, 18(1), pp. 30-55.
