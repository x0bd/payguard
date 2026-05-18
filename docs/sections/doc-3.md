# Chapter 3: Requirement Analysis and System Design

## 3.1 Introduction

Requirement analysis is the stage where the researcher studies the current situation, identifies the needs of users, and defines what the proposed system should do. This chapter focuses on the requirements and design of the proposed PayGuard Mobile Money Fraud Detection System.

The chapter explains how information was gathered, how the current institutional digital payment monitoring process works, the weaknesses of the existing approach, and the requirements for the proposed PayGuard system. It also describes the proposed system using design models such as context diagrams, use case diagrams, activity diagrams, data flow diagrams, class diagrams, sequence diagrams, communication diagrams, state charts, entity relationship diagrams and user interface descriptions.

The purpose of these models is to show how PayGuard will operate before the actual implementation stage. The system is designed to help finance officers and fraud analysts monitor mobile money transactions, receive fraud alerts, view risk scores, and make better decisions when suspicious transactions occur.

## 3.2 Information Gathering Methodologies

The researcher used different data gathering methods to understand the fraud detection problem and to identify the expected functions of the proposed system. Since PayGuard is a research prototype and does not use live institutional payment data, the information gathering process focused on literature review, observation of digital payment workflows, document analysis, and informal user requirement analysis.

The main methods used were:

- interviews;
- questionnaires;
- observation;
- document review;
- literature review;
- prototype analysis.

These methods assisted the researcher in understanding how institutional digital payments are handled, the risks involved, and the features that a fraud detection system should provide.

### 3.2.1 Interviews

The researcher considered interviews as one of the methods for understanding the needs of possible system users. The expected users of PayGuard include finance officers, administrators, fraud analysts, IT support staff and system supervisors.

The interviews were intended to gather information on the following areas:

- how digital payment transactions are currently verified;
- how suspicious payments are identified;
- how long manual reconciliation normally takes;
- what challenges are faced when many transactions are received;
- what type of fraud indicators users would want to see;
- what reports and alerts would be useful in the system.

**Table 3.1: Interview guide summary**

| Interview area | Example question | Expected information gathered |
|---|---|---|
| Current payment checking | How are mobile money payments currently verified? | Existing workflow and responsible users. |
| Fraud identification | How are suspicious payments detected? | Current fraud detection controls. |
| User challenges | What problems are faced during reconciliation? | Weaknesses of the current process. |
| Alert needs | What information should a fraud alert show? | Dashboard and alert requirements. |
| Reporting | What summaries are useful for management? | Metrics and report requirements. |

The benefit of interviews is that they help the researcher to understand the actual challenges faced by users. They also help clarify requirements that may not be obvious from documents alone.

### 3.2.2 Questionnaires

Questionnaires were considered as a way of collecting structured feedback from potential users. The questionnaire method is useful because it allows many users to answer the same questions, making it easier to compare their responses.

The questionnaire would focus on the following issues:

- whether users have experienced payment verification delays;
- whether users believe manual fraud checking is reliable;
- whether users would accept an automated fraud detection system;
- which dashboard features they consider most important;
- whether users prefer alerts, reports or transaction search tools.

**Table 3.2: Questionnaire areas**

| Question area | Purpose |
|---|---|
| User experience | To understand problems in the current process. |
| Fraud awareness | To identify common fraud concerns. |
| System acceptance | To measure willingness to use PayGuard. |
| Feature preference | To determine important dashboard features. |
| Reporting needs | To understand required summaries and outputs. |

The questionnaire results would help the researcher improve the user interface and make sure that the proposed system is useful to the target users.

### 3.2.3 Observation

Observation was used to understand how digital finance workflows are normally carried out. The researcher observed the general process of receiving, checking and confirming institutional payments. The observation focused on how a transaction moves from payment submission to verification and record keeping.

The following activities were observed:

- payment records being received through digital channels;
- users checking transaction details;
- manual comparison of payment records;
- identification of unusual or incomplete payments;
- updating of payment records after verification.

**Table 3.3: Observation guide**

| Observation item | Description |
|---|---|
| Transaction receipt | How payment information reaches the institution. |
| Verification process | How users confirm whether a payment is valid. |
| Manual checks | The amount of human effort involved. |
| Suspicious payments | How unusual payments are noticed. |
| Record update | How verified transactions are stored or marked. |

Observation showed that manual checking can become difficult when transaction volumes increase. It also showed that users need a system that can quickly highlight transactions that require attention.

### 3.2.4 Document Review

The researcher reviewed documents and literature related to fraud detection, mobile money, synthetic data, machine learning and institutional digital finance. This helped the researcher understand accepted methods and system design practices.

The reviewed sources included:

- fraud detection research papers;
- mobile money fraud literature;
- machine learning studies;
- Zimbabwe data protection and digital finance considerations;
- system analysis and design examples from previous dissertations;
- PayGuard project draft documents.

Document review helped the researcher develop functional requirements, non-functional requirements and design models for the proposed system.

### 3.2.5 Prototype Analysis

Since PayGuard is a software artefact, prototype analysis was also used. The researcher analysed the expected parts of the prototype, including synthetic data generation, model training, backend APIs, database storage and the dashboard.

**Table 3.4: Prototype components analysed**

| Component | Purpose |
|---|---|
| Synthetic data generator | Creates transaction data for training and testing. |
| Machine learning model | Learns fraud patterns and produces risk scores. |
| Backend API | Receives transactions, scores them and stores results. |
| Database | Stores transactions, alerts and model information. |
| Dashboard | Allows users to view metrics, alerts and transactions. |

This helped ensure that the requirements were practical and could be implemented within the project scope.

## 3.3 Analysis of the Existing System

The existing system refers to the current way in which institutional digital payments are checked and monitored before PayGuard is introduced. In many institutions, payment checking is done through a mixture of payment platform records, manual reconciliation, spreadsheets, finance office records and basic rules.

The current process normally depends on human users to identify suspicious activity. This means that suspicious payments may not be detected immediately, especially when many transactions are processed at the same time.

### 3.3.1 Description of the Existing System

The current system can be described as a manual or semi-manual digital payment monitoring process. Students, guardians or other payers make payments through mobile money or other digital channels. The finance office then checks payment records, confirms references, compares amounts and updates institutional records.

The process works but it has limitations. It does not automatically analyse account behaviour, transaction history, device changes or unusual patterns. It also does not automatically produce fraud risk scores.

**Table 3.5: Existing system description**

| Area | Current approach |
|---|---|
| Payment receipt | Digital payment records are received from payment channels. |
| Verification | Finance staff manually compare payment information. |
| Fraud checking | Suspicious transactions are identified through experience or simple rules. |
| Record keeping | Records may be stored in spreadsheets, portals or finance systems. |
| Reporting | Reports are generated manually or from existing transaction records. |

### 3.3.2 Weaknesses of the Existing System

The existing system has several weaknesses that justify the development of PayGuard.

**Table 3.6: Weaknesses of the existing system**

| Weakness | Effect on the institution |
|---|---|
| Manual checking is slow | Suspicious transactions may be identified late. |
| No automatic risk scoring | Users may not know which transactions need urgent attention. |
| Limited behaviour analysis | Unusual patterns may be missed. |
| High workload | Finance officers spend more time checking transactions. |
| Rule-based checks are not flexible | Fraudsters may change methods and avoid detection. |
| Poor prioritisation | All transactions may appear equal even when some are riskier. |
| Delayed reporting | Management may receive fraud information late. |

These weaknesses show that a more automated and intelligent monitoring system is required.

## 3.4 Context Diagram of the Existing System

[**Figure 3.1: Context diagram of the existing mobile money payment monitoring process will be inserted here.**]

**Description of Figure 3.1:**  
The context diagram will show the current payment monitoring environment. The main process will be labelled **Institutional Payment Verification System**. External entities will include **Student/Guardian**, **Mobile Money Platform**, **Finance Officer**, **Institutional Records System** and **Administrator**. Data flows will include payment details, payment confirmation, verification request, transaction record and payment status.

The purpose of this figure is to show how transaction information currently moves between users and the institution before the introduction of PayGuard.

## 3.5 Functions of Current System Actors

The main actors in the current system are shown in Table 3.7.

**Table 3.7: Current system actors and functions**

| Actor | Function in current process |
|---|---|
| Student/Guardian | Makes payment through mobile money or digital channel. |
| Mobile Money Platform | Processes the payment and produces transaction details. |
| Finance Officer | Checks payment information and verifies records. |
| Administrator | Supervises payment confirmation and record updates. |
| Institutional Records System | Stores payment status and student account details. |
| IT Support | Assists when there are technical issues with digital systems. |

The above functions show that the current process depends heavily on human checking. PayGuard is proposed to support these actors by providing automated fraud detection assistance.

## 3.6 Analysis of the Proposed System

The proposed system is PayGuard, a mobile money fraud detection system for institutional digital finance. The system will receive or simulate transaction records, analyse them using machine learning, produce risk scores, create alerts and present information through a dashboard.

PayGuard will not make final fraud decisions on its own. It will only assist users by identifying suspicious transactions that need further review. This is important because a transaction may look risky but still be genuine. Human review remains necessary.

### 3.6.1 Proposed System Workflow

The proposed workflow is as follows:

1. Transaction data is generated or received by the system.
2. The transaction is stored in the database.
3. The system prepares the transaction features.
4. The machine learning model calculates a fraud risk score.
5. If the risk is high, an alert is created.
6. The dashboard displays the transaction, score and alert.
7. The finance officer or analyst reviews the alert.
8. The alert status is updated after investigation.

[**Figure 3.2: Proposed PayGuard system context diagram will be inserted here.**]

**Description of Figure 3.2:**  
The diagram will show PayGuard as the main system. External entities will include **Finance Officer**, **Fraud Analyst**, **Administrator**, **Mobile Money Transaction Source**, **Machine Learning Model** and **Database**. The figure will show transaction input, risk scoring, alert output, dashboard viewing and alert status updates.

### 3.6.2 Advantages of the Proposed System

**Table 3.8: Advantages of PayGuard**

| Advantage | Explanation |
|---|---|
| Faster fraud detection | Transactions can be scored automatically. |
| Better prioritisation | High-risk transactions are shown first. |
| Reduced manual workload | Users do not need to inspect every transaction equally. |
| Improved reporting | Dashboard metrics give quick summaries. |
| Audit trail | Alerts and transaction scores can be stored for later review. |
| Privacy during research | Synthetic data allows development without exposing real users. |
| Scalability | The system can be improved for larger datasets in future. |

## 3.7 Evaluation of Alternatives

The researcher considered different alternatives before selecting the proposed PayGuard prototype.

### 3.7.1 Maintaining the Current Manual System

This alternative means continuing with manual checking and spreadsheet-based reconciliation. It is cheaper in the short term but does not solve the major problem of delayed fraud detection.

**Benefits**

- No new system development cost.
- Users already understand the process.
- No training is required.

**Drawbacks**

- Slow when transaction volumes increase.
- Fraud patterns may be missed.
- Difficult to prioritise risky transactions.
- High workload for finance staff.

### 3.7.2 Buying a Commercial Fraud Detection System

This alternative means purchasing an existing fraud detection solution from a vendor. It may provide advanced features, but it may be expensive and difficult to customise for a university prototype.

**Benefits**

- Mature features may already exist.
- Vendor support may be available.
- Deployment time may be reduced.

**Drawbacks**

- High cost.
- Vendor lock-in.
- May require access to sensitive data.
- May not match the project scope.
- Less academic ownership of the artefact.

### 3.7.3 Developing PayGuard as an In-house Prototype

This alternative means developing the system as part of the research project using open-source tools. This was selected because it gives the researcher control over the design, features and implementation.

**Benefits**

- Lower development cost.
- Full control over system design.
- Suitable for academic demonstration.
- Can use synthetic data safely.
- Supports future improvement.

**Drawbacks**

- Requires development time.
- Requires machine learning and software engineering skills.
- Prototype must be improved before production use.

**Table 3.9: Alternative comparison table**

| Alternative | Estimated cost | Flexibility | Suitability for research | Decision |
|---|---:|---|---|---|
| Maintain current manual system | Low | Low | Poor | Rejected |
| Buy commercial system | High | Medium | Medium | Rejected |
| Develop PayGuard prototype | Medium/Low | High | High | Accepted |

The researcher selected the development of PayGuard as the best alternative because it is more suitable for the project objectives, research scope and available resources.

## 3.8 Requirement Analysis for the Proposed System

Requirement analysis for PayGuard is divided into functional requirements, non-functional requirements and user requirements. These requirements define what the system must do and how it should behave.

### 3.8.1 Functional Requirements

Functional requirements describe the services and operations that the system should provide.

**Table 3.10: Functional requirements**

| ID | Requirement | Description |
|---|---|---|
| FR1 | User dashboard | The system shall provide a dashboard showing fraud metrics, alerts and recent transactions. |
| FR2 | Transaction capture | The system shall store transaction details such as account, amount, type, currency, time, device and location. |
| FR3 | Fraud scoring | The system shall analyse transactions and produce a fraud risk score. |
| FR4 | Alert creation | The system shall create an alert when a transaction is considered suspicious. |
| FR5 | Alert management | The system shall allow users to view, filter and update alert status. |
| FR6 | Transaction history | The system shall allow users to view transactions by account or by recent activity. |
| FR7 | Account profile | The system shall show account-level summaries such as transaction count, average amount and alert count. |
| FR8 | Model training | The system shall train a machine learning model using labelled synthetic transaction data. |
| FR9 | Metrics display | The system shall display useful metrics such as total transactions, open alerts and fraud rate. |
| FR10 | Data persistence | The system shall store transactions and alerts in a database. |

### 3.8.2 Non-functional Requirements

Non-functional requirements describe the quality attributes of the system.

**Table 3.11: Non-functional requirements**

| ID | Requirement | Description |
|---|---|---|
| NFR1 | Usability | The system interface should be simple and easy to understand. |
| NFR2 | Performance | The system should score prototype transactions within a reasonable time. |
| NFR3 | Reliability | The system should not lose stored transaction and alert records during normal use. |
| NFR4 | Maintainability | The code should be organised so that features can be updated easily. |
| NFR5 | Security | The system should validate input and restrict unauthorised access in future production deployment. |
| NFR6 | Privacy | The prototype should use synthetic data to avoid exposing real personal information. |
| NFR7 | Portability | The system should run on common development machines using open-source tools. |
| NFR8 | Scalability | The design should allow future migration to stronger databases and production infrastructure. |

### 3.8.3 User Requirements

User requirements describe what the users need to achieve using the system.

**Table 3.12: User requirements**

| User | Requirement |
|---|---|
| Finance officer | View recent transactions and identify suspicious payments. |
| Fraud analyst | Review alerts, risk scores and reasons for suspicion. |
| Administrator | Monitor system usage and supervise alert resolution. |
| IT support | Maintain the backend, database and model files. |
| Researcher/developer | Generate data, train models and test the prototype. |

The user should be able to access the dashboard, inspect suspicious transactions and update alert status after investigation.

## 3.9 Use Case Design

A use case diagram shows the interaction between users and the system. It helps identify the main functions that users expect from PayGuard.

[**Figure 3.3: Use case diagram for PayGuard will be inserted here.**]

**Description of Figure 3.3:**  
The use case diagram will show the following actors: **Finance Officer**, **Fraud Analyst**, **Administrator** and **Developer/Researcher**. The main use cases will include **View Dashboard**, **View Transactions**, **Score Transaction**, **View Alerts**, **Update Alert Status**, **View Account Profile**, **Train Model**, and **Generate Synthetic Data**.

**Table 3.13: Use case descriptions**

| Use case | Actor | Description |
|---|---|---|
| View dashboard | Finance Officer, Administrator | User views key fraud metrics and recent alerts. |
| Score transaction | Finance Officer, Fraud Analyst | User submits or receives a transaction for risk scoring. |
| View alerts | Finance Officer, Fraud Analyst | User views suspicious transactions requiring review. |
| Update alert status | Fraud Analyst | User marks alert as open, closed or resolved. |
| View transactions | Finance Officer | User checks stored transaction records. |
| View account profile | Fraud Analyst | User analyses behaviour of one account. |
| Generate synthetic data | Developer/Researcher | Researcher creates data for testing and training. |
| Train model | Developer/Researcher | Researcher trains and saves the fraud detection model. |

## 3.10 Activity Diagram

An activity diagram shows the step-by-step flow of activities in the system.

[**Figure 3.4: Activity diagram for scoring a transaction will be inserted here.**]

**Description of Figure 3.4:**  
The activity diagram will begin with **Start**, followed by **Receive Transaction**, **Validate Transaction Details**, **Retrieve Account History**, **Build Feature Set**, **Apply Machine Learning Model**, **Generate Risk Score**, **Check Risk Threshold**, **Create Alert if Suspicious**, **Save Transaction**, **Display Result on Dashboard**, and **End**. Decision points will include **Is transaction valid?** and **Is risk score high?**.

The activity flow helps explain how PayGuard processes a transaction from input to output.

## 3.11 Data Flow Diagram

A data flow diagram shows how data moves through the proposed system.

### 3.11.1 Level 0 Data Flow Diagram

[**Figure 3.5: Level 0 data flow diagram for PayGuard will be inserted here.**]

**Description of Figure 3.5:**  
This diagram will show PayGuard as one main process. External entities will include **Transaction Source**, **Finance Officer**, **Fraud Analyst** and **Administrator**. Data stores will include **Transaction Database**, **Alert Database** and **Model File**. Data flows will include transaction details, risk score, alert data, dashboard metrics and alert updates.

### 3.11.2 Level 1 Data Flow Diagram

[**Figure 3.6: Level 1 data flow diagram for PayGuard will be inserted here.**]

**Description of Figure 3.6:**  
This diagram will break PayGuard into subprocesses: **Receive Transaction**, **Validate Data**, **Engineer Features**, **Score Transaction**, **Generate Alert**, **Store Records**, and **Display Dashboard Metrics**. The diagram will show how data moves between each process and the database.

## 3.12 Entity Relationship Diagram

The entity relationship diagram shows the database structure and relationships between important records.

[**Figure 3.7: Entity relationship diagram for PayGuard will be inserted here.**]

**Description of Figure 3.7:**  
The ERD will show the main entities: **Transactions**, **Alerts**, **Accounts** and **ModelRuns**. A transaction belongs to one account. An alert is linked to one transaction. A model run stores information about a trained model and its evaluation metrics. The diagram will show primary keys, foreign keys and relationships.

**Table 3.14: Main database entities**

| Entity | Description | Key fields |
|---|---|---|
| Accounts | Represents an account involved in transactions. | account_id, home_location, created_at |
| Transactions | Stores payment transaction details. | transaction_id, account_id, amount, type, timestamp, risk_score |
| Alerts | Stores suspicious transaction alerts. | alert_id, transaction_id, risk_score, status, reason |
| ModelRuns | Stores model training information. | model_id, model_name, metrics, trained_at |

## 3.13 Data Dictionary

The data dictionary explains the important fields that will be stored in the system.

**Table 3.15: Transactions table**

| Field name | Data type | Description |
|---|---|---|
| transaction_id | Integer/Text | Unique transaction identifier. |
| account_id | Text | Account linked to the transaction. |
| amount | Decimal | Transaction amount. |
| currency | Text | Currency used, for example USD or ZWL. |
| transaction_type | Text | Type of transaction such as payment, transfer or cash-out. |
| timestamp | DateTime | Date and time of transaction. |
| device_id | Text | Device used for the transaction. |
| location | Text | Location linked to the transaction. |
| is_fraud | Integer | Label showing whether transaction is fraud in synthetic data. |
| risk_score | Decimal | Fraud probability or risk score produced by the model. |

**Table 3.16: Alerts table**

| Field name | Data type | Description |
|---|---|---|
| alert_id | Integer/Text | Unique alert identifier. |
| transaction_id | Integer/Text | Transaction that triggered the alert. |
| risk_score | Decimal | Risk score linked to the alert. |
| alert_type | Text | Category of suspicious behaviour. |
| reason | Text | Explanation of why the alert was created. |
| status | Text | Open, closed or resolved. |
| created_at | DateTime | Time when alert was created. |
| resolved_at | DateTime | Time when alert was resolved. |

**Table 3.17: ModelRuns table**

| Field name | Data type | Description |
|---|---|---|
| model_id | Integer/Text | Unique model run identifier. |
| model_name | Text | Name of the trained model. |
| algorithm | Text | Algorithm used, for example logistic regression or random forest. |
| metrics_json | Text | Stored evaluation metrics. |
| model_path | Text | Location of saved model artefact. |
| trained_at | DateTime | Date and time when model was trained. |

## 3.14 Class Diagram

A class diagram shows the major classes or modules that make up the system.

[**Figure 3.8: Class diagram for PayGuard will be inserted here.**]

**Description of Figure 3.8:**  
The class diagram will show modules such as **Transaction**, **Alert**, **AccountProfile**, **FraudScorer**, **FeatureBuilder**, **ModelLoader**, **DatabaseService**, **DashboardService** and **APIController**. The diagram will show relationships such as Transaction creating Alert, FraudScorer using FeatureBuilder, and APIController communicating with DatabaseService.

**Table 3.18: Proposed classes/modules**

| Class/module | Responsibility |
|---|---|
| Transaction | Holds transaction details. |
| Alert | Holds alert information and status. |
| AccountProfile | Holds account behaviour summary. |
| FeatureBuilder | Converts transaction history into model features. |
| FraudScorer | Uses the trained model to score transactions. |
| ModelLoader | Loads the saved machine learning model. |
| DatabaseService | Saves and retrieves database records. |
| APIController | Handles requests from the dashboard. |
| DashboardService | Provides metrics for display. |

## 3.15 Object Diagram

An object diagram shows an example of system objects at one moment during execution.

[**Figure 3.9: Object diagram for a scored transaction will be inserted here.**]

**Description of Figure 3.9:**  
The object diagram will show one example **Transaction object** with values such as account ID, amount and location. It will also show the linked **Alert object** with risk score, status and reason. The diagram will include a **FraudScorer object** and **Model object** to show that the transaction was scored by the model.

## 3.16 Sequence Diagram

A sequence diagram shows how system parts communicate over time.

[**Figure 3.10: Sequence diagram for transaction scoring will be inserted here.**]

**Description of Figure 3.10:**  
The sequence diagram will show the interaction between **User**, **Dashboard**, **APIController**, **DatabaseService**, **FeatureBuilder**, **FraudScorer**, **Model**, and **AlertService**. The order will be: user submits transaction, dashboard sends request, API validates data, database retrieves history, feature builder prepares inputs, model scores transaction, alert service creates alert if needed, and dashboard displays results.

## 3.17 Communication Diagram

A communication diagram shows how system components are linked and how messages pass between them.

[**Figure 3.11: Communication diagram for PayGuard will be inserted here.**]

**Description of Figure 3.11:**  
The communication diagram will show numbered messages between the dashboard, API, database, model, feature builder and alert service. It will help explain the same transaction scoring process in a network-style layout.

## 3.18 State Chart Diagram

A state chart shows how an alert changes from one state to another.

[**Figure 3.12: State chart diagram for PayGuard alert lifecycle will be inserted here.**]

**Description of Figure 3.12:**  
The state chart will show the states **Created**, **Open**, **Under Review**, **Resolved**, **Closed** and **Archived**. The transitions will show how a fraud analyst can update the alert status after investigation.

**Table 3.19: Alert states**

| State | Meaning |
|---|---|
| Created | Alert has been generated by the system. |
| Open | Alert is waiting for review. |
| Under Review | Analyst is investigating the alert. |
| Resolved | Alert has been investigated and resolved. |
| Closed | Alert is closed and no further action is needed. |
| Archived | Old alert is kept for record purposes. |

## 3.19 Process Design

Process design explains how major system processes will operate. The main PayGuard process is transaction scoring.

### 3.19.1 Transaction Scoring Process

**Preconditions**

- The system database is available.
- The machine learning model has been trained and loaded.
- A transaction record is received or entered.
- Required transaction fields are present.

**Steps**

1. The user or transaction source submits transaction details.
2. The backend validates the input fields.
3. The system retrieves account history from the database.
4. The feature builder prepares the model input values.
5. The fraud detection model predicts a risk score.
6. The system checks whether the score is above the alert threshold.
7. The transaction is saved.
8. If suspicious, an alert is created.
9. The result is returned to the dashboard.

**Postconditions**

- The transaction is stored.
- A risk score is attached to the transaction.
- An alert is created if necessary.
- The dashboard shows the scoring result.

[**Figure 3.13: Flowchart for transaction scoring process will be inserted here.**]

**Description of Figure 3.13:**  
The flowchart will show the transaction scoring process from input to output, including validation, feature engineering, model prediction, threshold decision, alert creation and dashboard response.

### 3.19.2 Alert Review Process

**Preconditions**

- An alert exists in the system.
- A finance officer or fraud analyst has access to the dashboard.

**Steps**

1. User opens the alerts page.
2. System displays open alerts.
3. User selects one alert.
4. User reviews transaction details and risk reason.
5. User updates the alert status.
6. System saves the new status and timestamp.

**Postconditions**

- Alert status is updated.
- Alert history is retained for future reporting.

## 3.20 User Interface Design

The PayGuard interface must be simple, clear and useful for finance users. The interface should guide users to important information without requiring advanced technical knowledge.

The main dashboard areas will include:

- dashboard overview;
- alerts page;
- transactions page;
- account profile page;
- live scoring form;
- metrics and charts.

[**Figure 3.14: PayGuard dashboard wireframe will be inserted here.**]

**Description of Figure 3.14:**  
The dashboard wireframe will show the main layout of the system. It will include a sidebar menu, summary cards for total transactions and open alerts, a chart showing risk levels, a table of recent alerts and a form for testing transaction scoring.

[**Figure 3.15: Alerts page wireframe will be inserted here.**]

**Description of Figure 3.15:**  
The alerts page wireframe will show a table with columns such as alert ID, transaction ID, account, risk score, reason, status and action buttons. It will also show filters for status and risk level.

**Table 3.20: User interface features**

| Feature | Description |
|---|---|
| User friendly | Clear labels, simple menus and readable tables. |
| Consistent | Similar layout across dashboard pages. |
| Informative | Shows risk scores, alerts and transaction summaries. |
| Actionable | Allows users to update alert status. |
| Maintainable | Interface can be extended with new pages in future. |
| Responsive | Can be improved to work on different screen sizes. |

## 3.21 System Controls and Security

System controls and security are important because PayGuard handles financial transaction records. Although the prototype uses synthetic data, the design should support future secure deployment.

### 3.21.1 Input Controls

The system should validate transaction details before accepting them. Required fields such as account ID, amount, transaction type, timestamp, device and location should be checked.

### 3.21.2 Processing Controls

The system should ensure that a transaction is scored using the correct model and feature set. If the model is missing, the system should show an error instead of silently accepting wrong results.

### 3.21.3 Storage Controls

Transactions, alerts and model information should be stored in a database. Regular backups should be considered in future deployment.

### 3.21.4 Access Controls

In the prototype, user authentication may be limited. In future, the system should include user accounts, passwords, roles and access permissions. Finance officers should not have the same permissions as administrators or developers.

### 3.21.5 Data Protection Controls

The prototype uses synthetic data. If real institutional data is used in future, the system should follow data minimisation, secure storage and privacy requirements in line with Zimbabwe's Cyber and Data Protection Act [Chapter 12:07] (Zimbabwe, 2021).

**Table 3.21: System controls**

| Control area | Control method |
|---|---|
| Input validation | Check required fields and correct data types. |
| Database control | Store records in structured tables. |
| Error handling | Return clear messages when something fails. |
| Access control | Add user roles in future production version. |
| Backup | Maintain database backup copies. |
| Privacy | Use synthetic data during research and minimise personal data in future. |

## 3.22 Testing Requirements

Testing requirements define how the system will be checked during implementation. The testing details will be expanded in the coding and testing chapter, but the main testing needs are identified here.

**Table 3.22: Testing requirements**

| Test type | Purpose |
|---|---|
| Unit testing | Check individual functions such as feature building and validation. |
| Integration testing | Check that frontend, backend, database and model work together. |
| Model evaluation | Check fraud detection performance using precision, recall, F1 and ROC-AUC. |
| Interface testing | Check whether dashboard pages display correct data. |
| API testing | Check endpoints for transactions, scoring, alerts and metrics. |
| User acceptance testing | Check whether users can understand and operate the system. |

## 3.23 Chapter Conclusion

This chapter analysed the requirements and design of the proposed PayGuard system. It explained the information gathering methods used by the researcher, described the weaknesses of the current manual or semi-manual payment monitoring process, and justified the need for an automated fraud detection system.

The chapter also defined the functional, non-functional and user requirements of PayGuard. It described the main actors, system workflows, database entities, interface requirements and security controls. Placeholders for diagrams and figures were included to show where the context diagram, use case diagram, activity diagram, data flow diagrams, ERD, class diagram, object diagram, sequence diagram, communication diagram, state chart and interface wireframes will be placed.

The next chapter will focus on the coding and implementation of the PayGuard system, including the technologies used, database setup, machine learning implementation, backend APIs and frontend dashboard.

## References

Abdallah, A., Maarof, M.A. and Zainal, A. (2016) 'Fraud detection system: a survey', *Journal of Network and Computer Applications*, 68, pp. 90-113.

Bahnsen, A.C., Aouada, D., Stojanovic, A. and Ottersten, B. (2013) 'Cost sensitive credit card fraud detection using Bayes minimum risk', in *Proceedings of the 12th IEEE International Conference on Machine Learning and Applications*. IEEE, pp. 333-338.

Carcillo, F., Le Borgne, Y.-A., Caelen, O., Kessaci, Y., Oblié, F. and Bontempi, G. (2019) 'Combining unsupervised and supervised learning in credit card fraud detection', *Information Sciences*, 557, pp. 317-331.

Dal Pozzolo, G., Boracchi, G., Caelen, O., Alippi, C. and Bontempi, G. (2015) 'Credit card fraud detection and concept drift adaptation with delayed supervised information', in *Proceedings of the International Joint Conference on Neural Networks*. IEEE.

Lopez-Rojas, E.A., Elmir, A. and Axelsson, S. (2016) 'PaySim: A financial mobile money simulator for fraud detection', in *Proceedings of the 28th European Modeling and Simulation Symposium*. Larnaca, Cyprus.

Phua, C., Lee, V., Smith, K. and Gayler, R. (2010) 'A comprehensive survey of data mining-based fraud detection research', *arXiv preprint*, arXiv:1009.6119.

Whitrow, C., Hand, D.J., Juszczak, P., Weston, D. and Adams, N.M. (2009) 'Transaction aggregation as a strategy for credit card fraud detection', *Data Mining and Knowledge Discovery*, 18(1), pp. 30-55.

Zimbabwe (2021) *Cyber and Data Protection Act [Chapter 12:07]*. Harare: Government of Zimbabwe.
