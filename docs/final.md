# PayGuard Final Documentation Draft

This draft contains Chapters 1 to 3 of the PayGuard project report. It follows the documentation rule that actual figures and screenshots should not be inserted yet. Where a figure is required, the draft only describes what the figure should show so that the correct diagrams and screenshots can be added later.

---

# Chapter 1: Introduction

## 1.1 Introduction

The PayGuard Mobile Money Fraud Detection System is designed to assist institutions in detecting suspicious mobile money transactions before they cause financial loss. The system focuses on digital finance environments where many payments are received through mobile money platforms and where finance departments need to verify, monitor, and analyse transactions quickly.

Mobile money has become one of the most common ways of making payments in Zimbabwe. Students, guardians, and other clients now use mobile money services to pay fees, settle balances, and perform day-to-day transactions. This has made payments easier and faster, but it has also created new risks. Fraudsters can take advantage of mobile money systems through fake confirmations, account takeovers, SIM swap attacks, social engineering, unusual transaction patterns, and repeated small payments designed to avoid detection.

The PayGuard system is therefore proposed as a software solution that can monitor mobile money transactions, analyse transaction behaviour, and identify possible fraud using machine learning techniques. The system will help users such as finance administrators and fraud analysts to view suspicious transactions, receive alerts, and make better decisions based on transaction risk levels.

The project follows the need for institutions to move away from purely manual fraud checking methods. Manual checking is slow, inconsistent, and may fail when many transactions are received at the same time. PayGuard aims to support institutional finance departments by providing an automated and organised way of detecting suspicious digital payments.

## 1.2 Background

Digital finance has changed how institutions receive and manage payments. In Zimbabwe, mobile money platforms have become important because they allow users to send and receive money without needing to visit a bank branch. This has helped many people participate in financial activities, especially where cash access and banking access are limited.

At university level, digital payment systems are now used for tuition fees, registration payments, accommodation fees, and other institutional charges. These systems are useful because they reduce queues, improve convenience, and allow payments to be made from different locations. However, when many transactions are processed digitally, it becomes difficult for staff to manually identify which transactions are genuine and which ones may be fraudulent.

Fraud in mobile money can happen in different ways. A fraudster may trick a student or guardian into sending money to the wrong account. A fake payment notification may be presented as proof of payment. An account may be accessed through stolen credentials or SIM swap. Some fraudsters may also divide large suspicious amounts into smaller transactions in order to avoid being noticed. These types of fraud require systems that can study transaction behaviour and detect unusual patterns.

Traditional fraud detection methods normally depend on fixed rules, such as blocking transactions above a certain amount or flagging repeated payments. Although rules are useful, they may not be enough because fraud methods change over time. Machine learning can improve fraud monitoring because it can learn from patterns in transaction data and assign risk scores to new transactions. Studies in fraud detection show that supervised learning, transaction aggregation, and cost-sensitive methods can help improve detection where fraud cases are fewer than normal transactions (Whitrow et al., 2009; Bahnsen et al., 2013; Dal Pozzolo et al., 2015).

PayGuard is therefore introduced as a prototype system that uses synthetic mobile money transaction data, feature engineering, supervised machine learning, a backend application programming interface, and a dashboard for monitoring. The system is not meant to replace human investigators, but to support them by presenting alerts and risk scores that can be reviewed.

## 1.3 Problem Statement

Many institutions that receive mobile money payments still depend on manual checking, reconciliation, and simple rule-based controls to identify fraud. This creates several problems, especially when the number of transactions is high. Manual checking takes time, and suspicious payments may only be discovered after financial loss has already occurred.

The current situation can result in the following challenges:

- Delayed detection of suspicious mobile money transactions.
- Difficulty in identifying unusual transaction behaviour.
- High workload for finance and administration staff.
- Limited ability to prioritise risky transactions for investigation.
- Possible financial loss and reputational damage.
- Lack of an automated alert system for institutional digital payments.

The main problem addressed by this research is that institutions need an automated and reliable way to detect possible mobile money fraud, but many existing payment workflows do not include a dedicated fraud monitoring system. PayGuard seeks to solve this problem by designing and developing a fraud detection prototype that analyses transaction patterns and alerts users when a transaction appears suspicious.

## 1.4 Aim of the Project

The aim of this project is to design and develop PayGuard, a mobile money fraud detection and monitoring system that uses transaction data, machine learning, database storage, backend APIs, and a dashboard to identify suspicious mobile money transactions and support finance staff during fraud investigation.

## 1.5 Objectives

The objectives of this project are as follows:

- To design a mobile money fraud detection system for institutional digital finance.
- To generate synthetic mobile money transaction data for system development and testing.
- To identify transaction features that can help separate normal transactions from suspicious transactions.
- To train and evaluate supervised machine learning models for fraud detection.
- To develop a backend system that can score transactions and store alerts.
- To design a dashboard that allows users to view transactions, alerts, and fraud risk levels.
- To support finance staff by reducing the amount of manual work needed when identifying suspicious transactions.

## 1.6 Research Questions

The study is guided by the following research questions:

- How can suspicious mobile money transaction patterns be identified in an institutional digital finance environment?
- How can synthetic transaction data be used to support the development of a fraud detection prototype?
- How can machine learning be used to assign fraud risk scores to mobile money transactions?
- How can fraud alerts and transaction risk levels be displayed clearly for finance staff and fraud analysts?
- How can a prototype system support faster and more organised fraud monitoring?

## 1.7 Research Propositions / Hypotheses

The research hypotheses guiding this project are as follows:

1. **H0 Null Hypothesis:** The use of automated fraud detection with machine learning does not improve the identification of suspicious mobile money transactions in institutional digital finance.

2. **H1 Alternative Hypothesis:** The use of automated fraud detection with machine learning can improve the identification of suspicious mobile money transactions in institutional digital finance.

## 1.8 Justification of the Research

The research is justified because digital payments are now widely used by institutions, and fraud risks continue to increase as more transactions move online. Institutions that handle student fees and other payments require systems that can monitor transactions efficiently and reduce reliance on manual checking.

The justification of this study is based on the following points:

- **Efficiency:** Manual fraud checking is slow and can delay the confirmation of payments. An automated system can process and analyse transactions faster.
- **Fraud reduction:** The system can help identify suspicious transactions early, reducing the chances of financial loss.
- **Improved decision-making:** Risk scores and alerts can help finance staff prioritise which transactions need investigation.
- **Scalability:** As the number of digital payments increases, an automated system can handle more transactions than manual methods.
- **Institutional trust:** A stronger fraud monitoring system can improve confidence in digital payment platforms used by students, guardians, and staff.
- **Research contribution:** The project demonstrates how machine learning can be applied in a practical institutional finance environment while using synthetic data to protect privacy.

## 1.9 Delimitation

The PayGuard system will focus on detecting suspicious mobile money transactions in an institutional digital finance environment. The system will use synthetic transaction data for development and testing. It will generate and analyse transaction records, calculate risk scores, and display alerts through a dashboard.

The project will cover the following areas:

- Mobile money style transaction records.
- Synthetic data generation.
- Fraud detection using supervised machine learning.
- Transaction scoring.
- Alert creation and viewing.
- Dashboard-based monitoring.

The project will not directly connect to a live mobile money provider or a live university payment system. It will also not make final legal decisions about whether a transaction is fraudulent. The system will only provide decision-support information for users to review.

## 1.10 Assumptions

The following assumptions have been made for the development of the PayGuard system:

- The institution receives a large number of mobile money transactions that require monitoring.
- Transaction records contain useful details such as amount, time, account, transaction type, location, and device information.
- Synthetic data can be used to represent realistic transaction behaviour for prototype development.
- Machine learning models can identify useful patterns from transaction features.
- Users such as finance administrators will be able to review alerts generated by the system.
- The institution has computers and basic network infrastructure needed to run and access the system.
- Human review will still be required before taking serious action on a flagged transaction.

## 1.11 Limitations of the Study

The study has some limitations. The system is developed as a prototype and does not use live institutional payment data. This means the results may not fully represent all real-world fraud behaviour. The use of synthetic data helps protect privacy, but it may not capture every fraud pattern that happens in actual mobile money systems.

Another limitation is that the system does not include full production security features such as advanced user authentication, encryption management, and live integration with mobile money providers. These features are important for real deployment but are beyond the scope of the current project.

The project is also limited by time and resources. Only selected supervised machine learning models are implemented and evaluated. More advanced models such as XGBoost, streaming analytics, and explainability tools can be considered in future work.

## 1.12 Conclusion

This chapter introduced the PayGuard Mobile Money Fraud Detection System and explained the background of the study, the problem being addressed, the project aim, objectives, research questions, hypotheses, justification, delimitation, assumptions, and limitations. The chapter showed that mobile money has become important in institutional payments, but it also creates fraud risks that require better monitoring.

The proposed system aims to support finance departments by detecting suspicious transactions, generating alerts, and helping users make informed decisions. The next chapter discusses literature related to mobile money fraud, machine learning fraud detection, synthetic data, fraud detection models, and the feasibility of developing the proposed system.

---

# Chapter 2: Literature Review and Feasibility Study

## 2.1 Introduction

This chapter reviews literature related to mobile money fraud detection and studies the feasibility of developing PayGuard. It defines key terms, discusses mobile money, fraud methods, machine learning approaches, synthetic data, evaluation metrics and related studies, then assesses technical, economic, operational, legal, schedule and social feasibility.

The purpose is to show that PayGuard is based on existing research and can be developed using available resources. Fraud detection is important because organisations increasingly depend on digital payments, while criminals continue to develop new fraud methods. Intelligent systems can help finance officers detect suspicious transactions quickly and make better decisions (Phua et al., 2010; Abdallah, Maarof and Zainal, 2016). PayGuard follows this approach by supporting human review through risk scores, alerts and summaries rather than replacing investigators (Dal Pozzolo et al., 2015).

## 2.2 Definition of Terms

| Term | Meaning in this study |
|---|---|
| Mobile money | Sending, receiving, storing or paying money using a mobile device. |
| Digital finance | Use of mobile wallets, portals, online banking and databases for financial services. |
| Fraud | Dishonest activity used to gain money, services or access. |
| Fraud detection | Identifying transactions or behaviour that may indicate fraud. |
| Transaction | A record of money movement, such as a fee payment or transfer. |
| Risk score | A model value showing how suspicious a transaction is. |
| Alert | A system notification created when a transaction is risky. |
| Machine learning | Computer systems learning patterns from data to make predictions. |
| Supervised learning | Training a model using examples with known labels. |
| Synthetic data | Artificial data that imitates real data without real personal records. |
| Class imbalance | When one class is much larger than another, such as normal transactions versus fraud. |
| Concept drift | When fraud patterns change and older models become less accurate. |

## 2.3 Mobile Money and Institutional Digital Finance

Mobile money is important in many African economies because it enables fast transactions without visiting a physical bank. It supports transfers, merchant payments, bill payments, savings and institutional payments, especially where formal banking access is limited (OECD, 2017; Makori, 2019).

Universities and colleges also use digital finance for tuition, registration, accommodation and other payments. This improves speed and reduces queues, but it also creates risks because finance departments must monitor many transactions, users and payment channels. A fraud detection system can support this work by continuously checking transactions and highlighting cases that need further investigation.

## 2.4 Mobile Money Fraud Methods

Mobile money fraud can target customers, agents, institutions or payment infrastructure. Common methods relevant to this research are shown in Table 2.1.

**Table 2.1: Common mobile money fraud methods**

| Fraud method | Description | Possible indicator in the system |
|---|---|---|
| Social engineering | User is tricked into sending money or revealing details. | Unusual transfer from a quiet account. |
| SIM swap fraud | Fraudster controls the victim's mobile number. | New device, location or transaction pattern. |
| Account takeover | Unauthorised person accesses an account. | Unfamiliar device or location. |
| Smurfing | Large value is split into smaller transactions. | Many transactions in a short period. |
| Fake payment confirmation | False message or receipt is used as proof. | Payment missing from official records. |
| Agent or insider abuse | Trusted person misuses access. | Repeated suspicious linked patterns. |

These methods show why one simple rule is not enough. Fraud may only become visible when amount, time, device, location and account history are considered together.

## 2.5 Existing Fraud Detection Approaches

Fraud detection has developed from manual checking to automated systems. The main approaches are rule-based detection, supervised learning, unsupervised detection and hybrid systems.

### 2.5.1 Manual and Rule-Based Detection

Traditional fraud detection uses manual checking and fixed rules, such as blocking large transactions, limiting daily transaction counts or flagging blocked accounts. These rules are easy to understand and enforce policy requirements.

However, rules are weak when fraud patterns change. Fraudsters may avoid known limits by splitting payments, and strict rules may create many false alerts (Phua et al., 2010).

### 2.5.2 Supervised Machine Learning

Supervised learning uses labelled data to train a model. In fraud detection, transactions are labelled as fraudulent or legitimate, and the model learns patterns that separate the classes. Common algorithms include logistic regression, decision trees, random forests, support vector machines, neural networks and gradient boosting (Abdallah, Maarof and Zainal, 2016).

This approach suits PayGuard because the prototype uses labelled synthetic data. The trained model can then score new transactions.

### 2.5.3 Unsupervised and Anomaly Detection

Unsupervised methods do not require fraud labels. They look for unusual behaviour using approaches such as clustering or anomaly detection. They are useful when labels are unavailable, but they can be difficult to evaluate because unusual does not always mean fraudulent (Phua et al., 2010).

### 2.5.4 Hybrid Fraud Detection

Hybrid systems combine methods, for example rules for known policy violations and machine learning for complex patterns. PayGuard follows this idea at prototype level by using supervised learning for risk scores and thresholds for alert review (Carcillo et al., 2019).

## 2.6 Synthetic Transaction Data

Real financial data is usually restricted because it may contain names, account numbers, phone numbers, locations and payment references. For an academic project, this creates privacy, security and legal risks.

Synthetic data is useful because it allows realistic transaction records to be created without exposing real users. Lopez-Rojas, Elmir and Axelsson (2016) introduced PaySim, showing that simulated mobile money data can support fraud detection research. PayGuard adopts this idea by generating accounts, amounts, transaction types, timestamps, locations, devices and fraud labels.

**Table 2.2: Comparison between real data and synthetic data**

| Area | Real transaction data | Synthetic transaction data |
|---|---|---|
| Privacy | Contains sensitive user information. | No real personal records. |
| Access | Difficult to obtain. | Generated by the researcher. |
| Legal risk | Requires approvals and controls. | Lower prototype risk. |
| Realism | More accurate real behaviour. | Depends on simulation quality. |
| Reproducibility | May not be shareable. | Can be regenerated. |

Synthetic data is not a perfect replacement for real data, so PayGuard should be treated as a research prototype until tested with approved real-world data.

## 2.7 Feature Engineering for Fraud Detection

Feature engineering converts raw transaction data into model inputs. In fraud detection, strong features often compare a transaction with normal account behaviour. Whitrow et al. (2009) showed that time-based transaction aggregation can improve detection because it captures behavioural change.

For PayGuard, the following feature groups are important:

**Table 2.3: Proposed feature groups for PayGuard**

| Feature group | Examples | Reason for use |
|---|---|---|
| Amount features | Amount, log amount, difference from average. | Detects unusual values. |
| Time features | Hour, day, night flag. | Detects unusual timing. |
| Velocity features | Transactions in last hour or day. | Detects rapid activity. |
| Account history features | Prior average, account age, previous count. | Compares with normal behaviour. |
| Device features | Device change, known or unknown device. | Detects possible compromise. |
| Location features | Location change and city. | Detects suspicious access. |
| Transaction type | Cash-in, cash-out, transfer and payments. | Captures different risk levels. |

Good features are central to PayGuard because weak features can produce poor predictions even when the algorithm is strong.

## 2.8 Class Imbalance and Evaluation Metrics

Fraud detection usually faces class imbalance because legitimate transactions are far more common than fraudulent ones. A model may appear accurate by predicting all transactions as legitimate, but such a model would miss fraud. Therefore, accuracy alone is not enough; metrics must focus on the minority fraud class.

**Table 2.4: Evaluation metrics for fraud detection**

| Metric | Meaning | Importance |
|---|---|---|
| Accuracy | Percentage of correct predictions. | Misleading when fraud is rare. |
| Precision | How many flagged transactions were fraud. | Shows alert quality. |
| Recall | How many fraud cases were detected. | Shows fraud capture. |
| F1-score | Balance of precision and recall. | Useful when both errors matter. |
| ROC-AUC | Ranking ability across thresholds. | Helps compare models. |

Cost-sensitive learning is also important because missed fraud may cause financial loss, while false alerts increase investigation workload (Bahnsen et al., 2013; Bahnsen, Aouada and Stojanovic, 2017).

## 2.9 Concept Drift in Fraud Detection

Concept drift happens when data patterns change over time. In fraud detection, this is common because fraudsters adapt once existing controls become known. Dal Pozzolo et al. (2015) showed that fraud models must be monitored and updated because financial crime behaviour changes. For PayGuard, future versions should support retraining, analyst feedback and threshold adjustment.

## 2.10 Machine Learning Algorithms Reviewed

Several algorithms can be used for fraud detection. Table 2.5 summarises those most relevant to PayGuard.

**Table 2.5: Reviewed machine learning algorithms**

| Algorithm | Strengths | Weaknesses | Relevance to PayGuard |
|---|---|---|---|
| Logistic Regression | Simple, fast and interpretable. | Weak on complex patterns. | Baseline model. |
| Decision Tree | Understandable and non-linear. | Can overfit. | Explains decision logic. |
| Random Forest | Handles non-linear patterns and reduces overfitting. | Less interpretable. | Main prototype candidate. |
| Support Vector Machine | Works on complex boundaries. | Slower and harder to tune. | Comparison method. |
| Neural Network | Learns complex patterns. | Needs more data and explanation. | Future extension. |
| XGBoost | Strong on tabular data. | Needs tuning and explanation. | Future benchmark. |

Chen and Guestrin (2016) introduced XGBoost as a scalable tree boosting system. It is strong for tabular data, but the first PayGuard prototype uses simpler scikit-learn models because they are easier to implement, explain and evaluate in a capstone context.

## 2.11 Related Studies

The following studies relate to fraud detection, mobile money simulation, transaction aggregation, class imbalance and machine learning.

**Table 2.6: Summary of related studies**

| Author(s) | Study focus | Key finding | Relevance to PayGuard |
|---|---|---|---|
| Phua et al. (2010) | Data mining fraud detection. | Uses classification, clustering and anomaly detection. | Supports supervised and hybrid approaches. |
| Whitrow et al. (2009) | Transaction aggregation. | Behavioural features improve detection. | Supports history and velocity features. |
| Bahnsen et al. (2013) | Cost-sensitive fraud detection. | Mistakes have different costs. | Supports cost-aware metrics. |
| Dal Pozzolo et al. (2015) | Concept drift and delayed labels. | Models need updating. | Supports retraining and feedback. |
| Lopez-Rojas, Elmir and Axelsson (2016) | PaySim simulator. | Synthetic mobile money data supports research. | Supports PayGuard synthetic data. |
| Abdallah, Maarof and Zainal (2016) | Fraud detection survey. | Needs algorithmic and system design. | Supports end-to-end design. |
| Carcillo et al. (2018) | Streaming fraud framework. | Real-time detection needs scalable design. | Supports future streaming. |
| Carcillo et al. (2019) | Hybrid fraud detection. | Combined methods can improve detection. | Supports anomaly detection extension. |
| Chen and Guestrin (2016) | XGBoost. | Boosted trees work well on structured data. | Supports future benchmarking. |
| Lebichot et al. (2021) | Incremental learning. | Models can adapt over time. | Supports future model refresh. |

## 2.12 Research Gap

The literature shows that many studies focus on credit card fraud, while fewer focus on mobile-money-style transactions in African institutional payment environments. Many studies also discuss algorithms without showing a complete prototype that includes data generation, model training, API scoring, alert storage and a dashboard.

**Table 2.7: Research gap and PayGuard contribution**

| Research gap | PayGuard contribution |
|---|---|
| Limited availability of real labelled institutional mobile money data. | Uses synthetic data with controlled fraud patterns. |
| Many studies focus on model accuracy only. | Includes data pipeline, model, API and dashboard workflow. |
| Rule-based systems cannot easily adapt to changing fraud behaviour. | Uses supervised learning and risk scores to detect patterns. |
| Fraud detection systems may not support human review clearly. | Provides alerts and transaction summaries for investigation. |
| Few capstone-level systems show end-to-end fraud monitoring. | Builds a complete prototype from data generation to UI monitoring. |

PayGuard addresses this gap by building a practical institutional digital finance fraud detection prototype using synthetic data and machine learning.

## 2.13 Feasibility Study

A feasibility study determines whether the proposed system can be developed and used successfully. This section covers technical, economic, operational, legal, schedule and social feasibility.

### 2.13.1 Technical Feasibility

PayGuard is technically feasible because it uses available open-source technologies such as Python, Flask, SQLite, pandas, scikit-learn, joblib, React and TypeScript.

**Table 2.8: Software requirements**

| Software | Purpose | Availability |
|---|---|---|
| Python 3 | Data, model training and backend API. | Open-source. |
| Flask | REST API development. | Open-source. |
| SQLite | Local transaction and alert storage. | Built into many Python environments. |
| pandas and NumPy | Data cleaning and feature engineering. | Open-source. |
| scikit-learn | Model training and evaluation. | Open-source. |
| joblib | Saving and loading model artefacts. | Open-source. |
| React and TypeScript | Frontend dashboard. | Open-source. |
| Git and GitHub | Version control and storage. | Freely available. |

**Table 2.9: Hardware requirements**

| Hardware | Minimum requirement | Purpose |
|---|---|---|
| Laptop or desktop computer | 8GB RAM, dual-core processor, 256GB storage. | Development and testing. |
| Recommended machine | 16GB RAM, quad-core processor, SSD. | Faster training and development. |
| Internet access | Stable connection. | Downloads and research. |
| Backup storage | External drive or cloud repository. | Protecting project files. |

PayGuard can be built on a normal development machine and does not require expensive servers. Production use would require stronger hosting, database and security controls.

### 2.13.2 Economic Feasibility

PayGuard is economically feasible because most tools are open-source. The main costs are development time, internet access and already available hardware.

**Table 2.10: Estimated development cost**

| Item | Estimated cost | Comment |
|---|---:|---|
| Development tools | USD 0 | Open-source tools. |
| Hosting during development | USD 0 | Local machine. |
| Internet and research access | USD 30 | Downloads and references. |
| Backup storage | USD 10 | External or cloud backup. |
| Testing and documentation | USD 20 | Review and optional tests. |
| Total estimated cost | USD 60 | Prototype cost only. |

The project is affordable because it does not require paid software licences and may reduce the time needed to identify suspicious transactions.

### 2.13.3 Operational Feasibility

PayGuard is operationally feasible because it provides a simple dashboard for finance officers and administrators.

The system will allow users to:

- view transaction summaries;
- submit or score transactions;
- view fraud risk levels;
- view open alerts;
- update alert status after investigation;
- observe dashboard metrics.

Users do not need to understand machine learning details because the model runs in the background while they interact with normal dashboard pages.

### 2.13.4 Legal and Ethical Feasibility

PayGuard handles financial-style data, so legal and ethical issues must be considered. Zimbabwe's Cyber and Data Protection Act [Chapter 12:07] provides a framework for protecting personal information (Zimbabwe, 2021). A production system would require data minimisation, access control, secure storage and authorisation.

For this research, PayGuard uses synthetic data, reducing privacy risk because real student names, account numbers and phone numbers are not used. The system is also treated as decision support, not automatic punishment.

**Table 2.11: Legal and ethical considerations**

| Issue | Risk | Control measure |
|---|---|---|
| Personal data exposure | Real users may be identified. | Use synthetic data and data minimisation. |
| False accusation | Legitimate transaction may be flagged. | Use human review. |
| Unauthorised access | Dashboard may expose records. | Add login and roles. |
| Model bias | Some patterns may be unfairly flagged. | Monitor false positives. |
| Data retention | Old records may be stored too long. | Define retention policy. |

### 2.13.5 Schedule Feasibility

Schedule feasibility considers whether the project can be completed within the available time. PayGuard is feasible when development is divided into clear stages.

**Table 2.12: Proposed work plan**

| Phase | Activity | Duration | Expected output |
|---|---|---:|---|
| Phase 1 | Research and literature review | 2 weeks | Chapter 2 and references. |
| Phase 2 | Requirements and design | 2 weeks | Requirements and diagrams. |
| Phase 3 | Synthetic data generator | 1 week | Transaction dataset. |
| Phase 4 | Feature engineering and model training | 2 weeks | Trained model and metrics. |
| Phase 5 | Backend API development | 2 weeks | Flask API. |
| Phase 6 | Frontend dashboard development | 2 weeks | React dashboard. |
| Phase 7 | Testing and documentation | 2 weeks | Tested prototype and write-up. |

**Table 2.13: Gantt chart table placeholder**

| Activity | Week 1 | Week 2 | Week 3 | Week 4 | Week 5 | Week 6 | Week 7 | Week 8 | Week 9 | Week 10 | Week 11 | Week 12 | Week 13 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Research and literature review | X | X |  |  |  |  |  |  |  |  |  |  |  |
| Requirements and design |  |  | X | X |  |  |  |  |  |  |  |  |  |
| Synthetic data generation |  |  |  |  | X |  |  |  |  |  |  |  |  |
| Model training |  |  |  |  |  | X | X |  |  |  |  |  |  |
| Backend API |  |  |  |  |  |  | X | X |  |  |  |  |  |
| Frontend dashboard |  |  |  |  |  |  |  | X | X |  |  |  |  |
| Testing |  |  |  |  |  |  |  |  |  | X | X |  |  |
| Final documentation |  |  |  |  |  |  |  |  |  |  | X | X | X |

**Figure 2.1: Gantt chart**

### 2.13.6 Social Feasibility

PayGuard is socially feasible because it supports financial integrity and reduces manual fraud checking. Finance officers may identify suspicious transactions faster, while students and guardians benefit from safer digital payment processes. Users must still understand that an alert is not final proof of fraud; it only means a transaction needs review.

## 2.14 Development Methodology

PayGuard follows an iterative prototype approach, where the system is built in small stages, tested, improved and documented. This suits the project because software development and machine learning experimentation both require adjustment.

**Table 2.14: Development stages**

| Stage | Description |
|---|---|
| Planning | Identify problem, objectives, scope and tools. |
| Data preparation | Generate synthetic transaction records. |
| Model development | Train and evaluate models. |
| Backend development | Build APIs for scoring, alerts and metrics. |
| Frontend development | Build dashboard pages. |
| Testing | Test model, API and interface behaviour. |
| Documentation | Write dissertation and project notes. |

## 2.15 Chapter Conclusion

This chapter reviewed literature and feasibility issues related to PayGuard. The literature shows that mobile money fraud is a serious challenge, machine learning can assist detection, and synthetic data is useful where real financial data cannot be used. Transaction aggregation, class imbalance, cost-sensitive learning and concept drift also guide the system design.

The feasibility study shows that PayGuard is technically, economically, operationally, legally, socially and schedule feasible as a prototype. The next chapter focuses on requirements analysis and design.

---

# Chapter 3: Requirement Analysis and System Design

## 3.1 Introduction

Requirement analysis is the stage where the researcher studies the current situation, identifies the needs of users, and defines what the proposed system should do. This chapter focuses on the requirements and design of the proposed PayGuard Mobile Money Fraud Detection System.

The chapter explains how information was gathered, how the current institutional digital payment monitoring process works, the weaknesses of the existing approach, and the requirements for the proposed PayGuard system. It also describes the proposed system using design models such as context diagrams, use case diagrams, activity diagrams, data flow diagrams, class diagrams, sequence diagrams, communication diagrams, state charts, entity relationship diagrams and user interface descriptions.

The purpose of these models is to show how PayGuard will operate before the actual implementation stage. The system is designed to help finance officers and fraud analysts monitor mobile money transactions, receive fraud alerts, view risk scores, and make better decisions when suspicious transactions occur.

## 3.2 Information Gathering Methodologies

The researcher used several methods to understand the fraud detection problem and identify the expected functions of PayGuard. Since the project is a prototype and does not use live institutional payment data, the information gathering process focused on literature review, observation of digital finance workflows, document review, and prototype analysis.

The methods used are summarised in Table 3.1.

**Table 3.1: Information gathering methods**

| Method | Purpose |
|---|---|
| Interviews | To understand how finance users verify payments, detect suspicious transactions, and respond to fraud concerns. |
| Questionnaires | To collect structured feedback on payment verification delays, manual checking, fraud awareness, and preferred dashboard features. |
| Observation | To study how digital payment records are received, checked, confirmed, and stored. |
| Document review | To review fraud detection literature, mobile money risks, machine learning studies, and previous dissertation structures. |
| Prototype analysis | To identify the practical components required, including data generation, model training, backend APIs, database storage, and dashboard views. |

These methods showed that manual payment verification can become slow when transaction volumes increase. They also showed that users need a system that can highlight suspicious transactions, provide clear risk information, and support human review.

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

**Figure 3.1: Existing system context diagram**

The figure will show how transaction information currently moves between users and the institution before PayGuard is introduced.

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

These actors show that the current process depends heavily on human checking. PayGuard is proposed to support them with automated fraud detection assistance.

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

**Figure 3.2: Proposed PayGuard context diagram**

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

The researcher considered three alternatives before selecting the proposed PayGuard prototype. The first option was to maintain the current manual checking process. This option was cheaper in the short term, but it did not solve the problem of delayed fraud detection and poor prioritisation.

The second option was to buy a commercial fraud detection system. This could provide advanced features, but it would be expensive, less suitable for academic ownership, and would likely require access to sensitive institutional data.

The third option was to develop PayGuard as an in-house prototype using open-source tools. This option was selected because it matched the project objectives, allowed the use of synthetic data, and gave the researcher full control over the system design.

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

### 3.8.2 Non-Functional Requirements

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

**Figure 3.3: Use case diagram**

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

**Figure 3.4: Activity diagram**

The activity flow helps explain how PayGuard processes a transaction from input to output.

## 3.11 Data Flow Diagram

A data flow diagram shows how data moves through the proposed system.

### 3.11.1 Level 0 Data Flow Diagram

**Figure 3.5: Level 0 data flow diagram**

### 3.11.2 Level 1 Data Flow Diagram

**Figure 3.6: Level 1 data flow diagram**

## 3.12 Entity Relationship Diagram

The entity relationship diagram shows the database structure and relationships between important records.

**Figure 3.7: Entity relationship diagram**

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

## 3.14 UML and Interaction Diagrams

Several UML-style diagrams will be used to explain how PayGuard is structured and how its components interact. These diagrams will not be inserted yet; they are described here as placeholders for later completion.

**Figure 3.8: Class diagram**

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

**Figure 3.9: Object diagram**

**Figure 3.10: Sequence diagram**

**Figure 3.11: Communication diagram**

**Figure 3.12: State chart diagram**

**Table 3.19: Alert states**

| State | Meaning |
|---|---|
| Created | Alert has been generated by the system. |
| Open | Alert is waiting for review. |
| Under Review | Analyst is investigating the alert. |
| Resolved | Alert has been investigated and resolved. |
| Closed | Alert is closed and no further action is needed. |
| Archived | Old alert is kept for record purposes. |

## 3.15 Process Design

Process design explains how major system processes will operate. The main PayGuard process is transaction scoring.

### 3.15.1 Transaction Scoring Process

The transaction scoring process requires a valid transaction, an available database, and a trained model. The user submits transaction details, the backend validates the input, account history is retrieved, features are prepared, and the model predicts a fraud risk score. The transaction is then stored, an alert is created when needed, and the result is returned to the dashboard.

**Figure 3.13: Transaction scoring flowchart**

### 3.15.2 Alert Review Process

The alert review process begins when a finance officer or fraud analyst opens the alerts page. The user selects an alert, reviews the transaction details and risk reason, then updates the alert status. The system stores the updated status so that the alert history can be reviewed later.

## 3.16 User Interface Design

The PayGuard interface must be simple, clear and useful for finance users. The interface should guide users to important information without requiring advanced technical knowledge.

The main dashboard areas will include:

- dashboard overview;
- alerts page;
- transactions page;
- account profile page;
- live scoring form;
- metrics and charts.

**Figure 3.14: Dashboard wireframe**

**Figure 3.15: Alerts page wireframe**

**Table 3.20: User interface features**

| Feature | Description |
|---|---|
| User friendly | Clear labels, simple menus and readable tables. |
| Consistent | Similar layout across dashboard pages. |
| Informative | Shows risk scores, alerts and transaction summaries. |
| Actionable | Allows users to update alert status. |
| Maintainable | Interface can be extended with new pages in future. |
| Responsive | Can be improved to work on different screen sizes. |

## 3.17 System Controls and Security

System controls and security are important because PayGuard handles financial transaction records. Although the prototype uses synthetic data, the design should support future secure deployment.

**Table 3.21: System controls**

| Control area | Control method |
|---|---|
| Input validation | Check required fields, data types, timestamps, and transaction amounts. |
| Processing control | Score transactions using the correct feature set and loaded model. |
| Database control | Store transactions, alerts, and model information in structured tables. |
| Error handling | Return clear messages when model loading, validation, or database operations fail. |
| Access control | Add user accounts and role-based permissions in a future production version. |
| Backup | Maintain database and model backup copies. |
| Privacy | Use synthetic data during research and apply data minimisation if real data is used later. |

## 3.18 Testing Requirements

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

## 3.19 Chapter Conclusion

This chapter analysed the requirements and design of the proposed PayGuard system. It explained the information gathering methods used by the researcher, described the weaknesses of the current manual or semi-manual payment monitoring process, and justified the need for an automated fraud detection system.

The chapter also defined the functional, non-functional and user requirements of PayGuard. It described the main actors, system workflows, database entities, interface requirements and security controls. Figure description placeholders were included to show where the context diagram, use case diagram, activity diagram, data flow diagrams, ERD, class diagram, object diagram, sequence diagram, communication diagram, state chart and interface wireframes will be placed later.

The next chapter will focus on the coding and implementation of the PayGuard system, including the technologies used, database setup, machine learning implementation, backend APIs and frontend dashboard.

---

# Chapter 4: System Design

## 4.1 Introduction

System design explains how the proposed solution is organised, how its parts communicate, how data is stored, and how users interact with it. This chapter presents the design of PayGuard as a prototype mobile money fraud monitoring system.

PayGuard combines synthetic data generation, machine learning, a Flask backend, SQLite storage, and a React dashboard. The design supports the project aim of helping finance users identify suspicious transactions through risk scores, alerts, and summary views.

The system follows a layered approach. The frontend presents the dashboard, the backend handles validation and scoring, the database stores transactions and alerts, and the machine learning layer prepares features and predicts risk. Figure placeholders are kept brief in the main report, while full descriptions are stored separately in the figure description reference.

## 4.2 Design Objectives

The design of PayGuard was guided by the following objectives:

- To separate the frontend dashboard, backend API, database, and machine learning model.
- To support transaction submission, storage, scoring, and review.
- To provide fraud risk scores, alerts, and dashboard metrics for monitoring suspicious activity.
- To keep the system simple enough for academic demonstration and future improvement.
- To use synthetic data so that real customer financial information is not exposed.

The system is therefore designed as a decision-support prototype. It helps users identify transactions that require attention, but it does not automatically prove that a transaction is fraudulent.

## 4.3 Overall System Architecture

PayGuard uses a client-server architecture. The client side is a React, TypeScript, Vite, Tailwind CSS, shadcn/ui dashboard. The server side is a Python Flask backend that uses SQLite for storage and scikit-learn for fraud detection.

The main architectural layers are shown in Table 4.1.

**Table 4.1: PayGuard system architecture layers**

| Layer | Main technology | Purpose |
|---|---|---|
| Presentation layer | React, TypeScript, Vite, Tailwind CSS, shadcn/ui | Displays the dashboard, forms, tables, charts, alerts, and account lookup screens. |
| API layer | Flask | Receives frontend requests, validates input, returns JSON responses, and connects the frontend to the database and model. |
| Data layer | SQLite | Stores transactions, alerts, and model run records. |
| Machine learning layer | pandas, NumPy, scikit-learn, joblib | Builds features, trains models, saves the selected model, and scores new transactions. |
| Data generation layer | Python, pandas, NumPy | Generates synthetic mobile money transactions and fraud patterns for development and testing. |

**Figure 4.1: System architecture diagram**

## 4.4 System Component Design

PayGuard is divided into major components with clear responsibilities, making the prototype easier to understand, test, and improve.

**Table 4.2: Main PayGuard components**

| Component | Description | Main responsibility |
|---|---|---|
| Synthetic transaction generator | Python script that creates sample mobile money transactions. | Generates normal transactions and injects fraud patterns for testing. |
| Feature engineering module | Python module in the machine learning package. | Converts raw transaction records into model-ready features. |
| Training pipeline | Python training script. | Trains candidate models and saves the best fraud detection model. |
| Flask API | Backend application. | Handles health checks, transactions, scoring, alerts, account profiles, and metrics. |
| SQLite database | Local relational database. | Stores transactions, alerts, and model run metadata. |
| React dashboard | Web frontend. | Allows users to monitor metrics, score transactions, view alerts, view transactions, and search account profiles. |

The components communicate through structured data. The frontend sends HTTP requests to the backend, the backend queries SQLite, and the model receives prepared features before returning a prediction and risk score.

## 4.5 Data Generation Design

PayGuard uses synthetic data because real financial data is sensitive and difficult to access for an academic project. The generator creates account profiles with IDs, locations, devices, daily transaction rates, and average amounts. It then produces normal transactions and injects selected fraud patterns.

The synthetic dataset includes the fields shown in Table 4.3.

**Table 4.3: Synthetic transaction fields**

| Field | Description |
|---|---|
| account_id | Unique prototype account identifier. |
| transaction_type | Type such as cash_in, cash_out, bill_payment, p2p_transfer, or merchant_payment. |
| amount | Transaction amount. |
| currency | Transaction currency, mainly USD or ZWL. |
| device_id | Device used for the transaction. |
| location | Transaction location. |
| created_at | Transaction date and time. |
| is_fraud | Synthetic normal or fraud label. |
| fraud_score | Synthetic risk score later supported by model scoring. |
| metadata_json | Extra JSON details such as source and pattern. |
| fraud_pattern | Fraud pattern name. |

The generator includes three main fraud patterns, shown in Table 4.4.

**Table 4.4: Fraud patterns used in PayGuard data generation**

| Fraud pattern | Description | Design reason |
|---|---|---|
| amount_spike | Amount is much larger than normal. | Detects unusual values. |
| device_location_change | New device and different location. | Simulates suspicious access. |
| rapid_burst | Many transactions happen close together. | Simulates fast fund movement. |

**Figure 4.2: Data generation flow diagram**

## 4.6 Machine Learning Design

The machine learning part of PayGuard learns fraud patterns from the synthetic dataset and provides a risk score for new transactions. Supervised learning is used because each generated transaction has a fraud label.

The machine learning design has four main stages:

1. Load and clean transaction data.
2. Build fraud detection features.
3. Train and compare candidate models.
4. Save the selected model for backend scoring.

The feature engineering module validates required columns, cleans transaction fields, removes invalid records, and prepares numeric and categorical features for model training.

**Table 4.5: Numeric machine learning features**

| Feature | Description |
|---|---|
| amount | Original transaction amount. |
| amount_log | Log-transformed amount. |
| hour | Transaction hour. |
| day_of_week | Transaction day of week. |
| is_weekend | Weekend indicator. |
| is_night | Late-night indicator. |
| account_prior_tx_count | Previous account transaction count. |
| account_prior_avg_amount | Previous account average amount. |
| amount_to_prior_avg_ratio | Current amount compared with prior average. |
| amount_delta_from_prior_avg | Difference from prior average. |
| account_age_hours | Time since the account's first transaction. |
| seconds_since_prev_tx | Time since previous account transaction. |
| tx_count_last_1h | Transactions in the last hour. |
| tx_count_last_24h | Transactions in the last 24 hours. |
| device_change | Device change indicator. |
| location_change | Location change indicator. |

**Table 4.6: Categorical machine learning features**

| Feature | Description |
|---|---|
| transaction_type | Type of mobile money transaction. |
| currency | Currency used in the transaction. |
| location | Transaction location. |

Two candidate models are trained: logistic regression as a baseline and random forest as the stronger model for learning more complex fraud patterns.

**Table 4.7: Candidate machine learning models**

| Model | Purpose in PayGuard |
|---|---|
| Logistic regression | Provides a simple baseline model for comparison. |
| Random forest | Provides the main selected model for scoring because it handles non-linear fraud patterns better. |

The training pipeline uses a train-test split and evaluates models using precision, recall, F1-score, and ROC-AUC. The selected model is saved as `fraud_model.joblib` so that Flask can load it during API startup. The current report selected random forest on a synthetic dataset of 99,468 rows.

**Table 4.8: Current model training summary**

| Item | Value |
|---|---|
| Selected model | random_forest |
| Dataset rows | 99,468 |
| Fraud rows | 2,380 |
| Fraud rate | 2.39 percent |
| Precision | 0.4539 |
| Recall | 0.8697 |
| F1-score | 0.5965 |
| ROC-AUC | 0.9912 |

The result shows that the prototype can learn the generated fraud patterns. However, because the data is synthetic, the results are treated as academic prototype results, not production banking evidence.

**Figure 4.3: Machine learning pipeline diagram**

## 4.7 Backend API Design

The backend is designed as a Flask API and acts as the central controller of the system. It validates requests, communicates with SQLite, loads the saved model, builds scoring features, creates alerts, and returns JSON responses to the frontend. During startup, it initialises the database and reports whether the model is available.

**Table 4.9: PayGuard API endpoint design**

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Checks API status, database connection, and model loading status. |
| `/api/transactions` | POST | Creates and stores a transaction record. |
| `/api/transactions` | GET | Returns recent transactions, optionally filtered by account ID. |
| `/api/score` | POST | Scores a transaction using the fraud model, stores the transaction, and creates an alert. |
| `/api/alerts` | GET | Returns alert records, with optional filters for status and minimum risk. |
| `/api/alerts/<alert_id>` | GET | Returns details for one alert. |
| `/api/alerts/<alert_id>` | PATCH | Updates the status of an alert. |
| `/api/accounts/<account_id>` | GET | Returns an account profile summary calculated from stored transactions and alerts. |
| `/api/accounts/<account_id>/transactions` | GET | Returns transaction history for a selected account. |
| `/api/metrics` | GET | Returns dashboard metrics such as total transactions, fraud rate, open alerts, and alert breakdown. |

The scoring endpoint is the most important backend process. It validates a submitted transaction, retrieves account history, builds features, runs the model, stores the transaction, creates an alert, and returns the result to the dashboard.

**Table 4.10: Required transaction input fields for scoring**

| Field | Purpose |
|---|---|
| account_id | Identifies the account being scored. |
| transaction_type | Describes the type of transaction. |
| amount | Provides the amount to be analysed. |
| currency | Identifies the currency. |
| device_id | Helps detect device changes. |
| location | Helps detect location changes. |
| created_at | Optional timestamp; if absent, the backend uses the current time. |

The backend also converts the fraud score into a risk level. The current alert threshold is 0.65. If the predicted label is fraud or the risk score reaches the threshold, the alert is opened for review.

**Table 4.11: Risk level design**

| Risk score range | Risk level |
|---|---|
| 0.90 and above | critical |
| 0.75 to 0.89 | high |
| 0.55 to 0.74 | medium |
| Below 0.55 | low |

The backend also generates an alert reason from important feature signals such as unusual amount, transaction velocity, device change, location change, or rapid repeat activity.

**Figure 4.4: Backend scoring sequence diagram**

## 4.8 Database Design

PayGuard uses SQLite because it is lightweight and suitable for a local academic prototype. The database has three physical tables: `transactions`, `alerts`, and `model_runs`. Account profiles are calculated from stored transactions and alerts when the account lookup endpoint is called.

**Table 4.12: Database tables**

| Table | Purpose |
|---|---|
| transactions | Stores all transaction records, including amount, account, type, location, fraud label, and fraud score. |
| alerts | Stores fraud alert records linked to scored transactions. |
| model_runs | Stores model training metadata for future tracking of model versions and metrics. |

### 4.8.1 Transactions Table

The `transactions` table stores records from the synthetic dataset, manual transaction creation, and live scoring through the API.

**Table 4.13: Transactions table design**

| Field | Data type | Description |
|---|---|---|
| id | INTEGER | Primary key for each transaction. |
| account_id | TEXT | Account linked to the transaction. |
| transaction_type | TEXT | Type of transaction. |
| amount | REAL | Transaction amount. |
| currency | TEXT | Transaction currency. |
| device_id | TEXT | Device used for the transaction. |
| location | TEXT | Transaction location. |
| created_at | TEXT | Transaction date and time. |
| is_fraud | INTEGER | Fraud label or predicted fraud flag, stored as 0 or 1. |
| fraud_score | REAL | Fraud risk score between 0 and 1. |
| metadata_json | TEXT | Extra metadata stored as JSON text. |
| inserted_at | TEXT | Time when the record was inserted into the database. |

### 4.8.2 Alerts Table

The `alerts` table stores suspicious transaction alerts, with each alert linked to one transaction through `transaction_id`.

**Table 4.14: Alerts table design**

| Field | Data type | Description |
|---|---|---|
| id | INTEGER | Primary key for each alert. |
| transaction_id | INTEGER | Foreign key linked to the transactions table. |
| risk_score | REAL | Risk score that triggered or described the alert. |
| alert_type | TEXT | Alert category such as low_risk, medium_risk, high_risk, or critical_risk. |
| reason | TEXT | Human-readable reason explaining why the alert was created. |
| status | TEXT | Alert status, such as open, closed, or resolved. |
| created_at | TEXT | Date and time when the alert was created. |
| resolved_at | TEXT | Date and time when the alert was resolved, if applicable. |

### 4.8.3 Model Runs Table

The `model_runs` table supports future model history tracking. The current prototype stores the main training report as JSON, but the table allows later versions to save metadata in the database.

**Table 4.15: Model runs table design**

| Field | Data type | Description |
|---|---|---|
| id | INTEGER | Primary key for each model run. |
| model_name | TEXT | Name of the trained model. |
| model_version | TEXT | Version or identifier for the model. |
| metrics_json | TEXT | Evaluation results stored as JSON text. |
| notes | TEXT | Extra notes about the model run. |
| created_at | TEXT | Date and time when the model run was recorded. |

**Figure 4.5: Database relationship diagram**

## 4.9 Alert Lifecycle Design

Alerts help users focus on transactions that need review. An alert is created when a transaction is scored, and its status depends on the predicted risk and later user action.

The implemented backend uses three alert status values.

**Table 4.16: Alert lifecycle states**

| State | Meaning |
|---|---|
| open | The alert is active and requires review. |
| closed | The alert has been dismissed or closed without further action. |
| resolved | The alert has been reviewed and marked as resolved. |

**Figure 4.6: Alert lifecycle diagram**

## 4.10 Frontend User Interface Design

The frontend is designed as a fraud operations dashboard. It uses React, TypeScript, shadcn/ui components, charts, and a clean black, white, and green-accent visual style so users can focus on monitoring work.

The application has a sidebar navigation menu with four main views:

- Dashboard;
- Alerts;
- Transactions;
- Accounts.

**Table 4.17: Frontend views**

| View | Purpose |
|---|---|
| Dashboard | Shows key metrics, risk trend, alert distribution, and live transaction scoring form. |
| Alerts | Shows alert records, filters, alert details, and alert status actions. |
| Transactions | Shows recent transactions with filtering by account, type, location, device, and fraud status. |
| Accounts | Allows users to search for an account and view profile metrics and transaction history. |

### 4.10.1 Dashboard View

The dashboard view is the main monitoring screen. It displays key indicators such as total transactions, fraud rate, open alerts, and average risk score, together with charts and alert summaries.

The dashboard also includes a live scoring form. When a user submits transaction details, the frontend calls `/api/score` and displays the risk score, risk level, alert status, reason, and key feature signals.

**Figure 4.7: Dashboard screenshot**

### 4.10.2 Alerts View

The alerts view allows users to review suspicious transactions using search and filters for account ID, alert type, reason, status, and risk level. Alerts are shown in a table, and selecting one opens a detail drawer with transaction information and status actions.

**Figure 4.8: Alerts page screenshot**

### 4.10.3 Transactions View

The transactions view shows recent database records. Users can search by account, location, or device, and filter by transaction type or fraud status. This helps users inspect whether flagged records appear in the stored transaction history.

**Figure 4.9: Transactions page screenshot**

### 4.10.4 Accounts View

The accounts view allows users to search for an account ID and view account-level statistics, alerts, risk values, and transaction history. The backend calculates the profile from SQLite records, avoiding duplicated account data while still supporting behaviour analysis.

**Figure 4.10: Account lookup screenshot**

## 4.11 Input and Output Design

Input design covers information entered into the system, while output design covers the results returned to users.

**Table 4.18: Main system inputs**

| Input | Source | Purpose |
|---|---|---|
| Synthetic dataset parameters | Developer or researcher | Controls number of accounts, number of days, random seed, and output path. |
| Transaction scoring form | Dashboard user | Sends a transaction to the backend for fraud scoring. |
| Alert filters | Alerts page user | Filters alert records by status, risk, type, or search term. |
| Transaction filters | Transactions page user | Filters recent transaction records. |
| Account ID search | Accounts page user | Retrieves account profile and transaction history. |

**Table 4.19: Main system outputs**

| Output | Description |
|---|---|
| Fraud risk score | Numerical score showing how risky the transaction appears. |
| Predicted label | Indicates whether the model classified the transaction as fraud or normal. |
| Risk level | Human-readable level such as low, medium, high, or critical. |
| Alert record | Stored review item created after scoring. |
| Dashboard metrics | Summary values such as total transactions, fraud rate, and open alerts. |
| Account profile | Summary of account behaviour and transaction history. |

## 4.12 Processing Design

The main PayGuard process is transaction scoring, which combines validation, history retrieval, feature engineering, prediction, alert creation, and dashboard response.

The processing steps are:

1. The user submits transaction details through the dashboard.
2. The frontend sends a JSON request to the Flask API.
3. The Flask API checks required fields and validates data types.
4. The backend retrieves account transaction history from SQLite.
5. The feature engineering module combines history with the new transaction.
6. The selected machine learning pipeline prepares numeric and categorical features.
7. The model predicts the fraud label and risk probability.
8. The backend calculates the risk level.
9. The backend builds a readable alert reason from key feature signals.
10. The transaction is saved in the transactions table.
11. An alert is saved in the alerts table.
12. The result is returned to the dashboard.

**Figure 4.11: Transaction scoring flowchart**

## 4.13 Security and Control Design

Although PayGuard is a prototype, the design includes basic controls for safer use and future improvement.

**Table 4.20: Security and control design**

| Control | Description |
|---|---|
| Input validation | Required fields such as account ID, transaction type, and amount are checked before processing. |
| Amount validation | Negative amounts are rejected. |
| Currency validation | Currency must be a three-letter code. |
| Timestamp validation | Transaction time must be valid ISO-8601 format if provided. |
| Database constraints | SQLite checks are used for non-negative amount and valid fraud labels. |
| Foreign key constraint | Alerts are linked to transactions using a foreign key. |
| Error handling | API errors return clear JSON responses instead of silent failures. |
| Synthetic data | Real personal financial records are not used during prototype development. |
| Human review | Fraud alerts support human investigation and do not automatically punish users. |

For production use, stronger controls would be required, including login, role-based access, encrypted storage, audit logs, secure hosting, and integration controls for real mobile money providers.

## 4.14 Deployment Design

The current project is designed to run locally during development. The Flask backend runs on port 5000, while the frontend runs through Vite and can proxy `/api` requests to Flask.

The simplified stack was selected to make future hosting easier. The frontend is suitable for static deployment, while Flask can be adapted for lightweight cloud hosting. SQLite is suitable for the prototype, although a production system may require PostgreSQL or another managed database.

**Table 4.21: Development deployment design**

| Part | Local design |
|---|---|
| Frontend | Vite development server serving the React dashboard. |
| Backend | Flask application serving `/api` endpoints. |
| Database | SQLite database stored in the data folder. |
| Model | Saved joblib model stored in the models folder. |
| Dataset | Synthetic CSV data stored in the data folder. |

**Figure 4.12: Deployment diagram**

## 4.15 Chapter Summary

This chapter presented the system design of PayGuard, covering the architecture, components, data generation, machine learning, backend API, database, alerts, interface, inputs and outputs, processing flow, security controls, and deployment design.

The design shows PayGuard as a layered prototype system. The frontend provides the user interface, Flask controls application logic, SQLite stores records, and the machine learning model produces fraud risk scores. The main report keeps only figure placeholders, with full descriptions stored separately for later diagram creation.

The next chapter will focus on implementation, coding, testing, and the results produced by the completed PayGuard prototype.

---

# Chapter 5: Implementation, Testing and Results

## 5.1 Introduction

This chapter explains how PayGuard was implemented and tested. It focuses on the development tools, main modules, testing performed, and results obtained from the completed prototype.

PayGuard was implemented as a full-stack prototype. The frontend uses React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Icons, and chart components. The backend uses Python and Flask, with SQLite for storage and pandas, NumPy, scikit-learn, and joblib for data processing and machine learning.

Implementation was completed in stages: backend and database setup, synthetic data generation, model training, scoring API development, and frontend integration. As required, the main report keeps short figure captions while full screenshot descriptions are stored separately.

## 5.2 Development Environment

PayGuard was developed using open-source tools suitable for a final year software project. The environment was kept simple, affordable, and easy to reproduce.

**Table 5.1: Development environment**

| Item | Description |
|---|---|
| Operating system | Windows development environment. |
| Backend language | Python. |
| Backend framework | Flask. |
| Database | SQLite. |
| Frontend framework | React with TypeScript. |
| Build tool | Vite. |
| Styling | Tailwind CSS and shadcn/ui components. |
| Machine learning libraries | pandas, NumPy, scikit-learn, joblib. |
| Version control | Git. |
| Dataset storage | CSV files in the data folder. |
| Model storage | joblib model files in the models folder. |

The backend dependencies include Flask, pandas, NumPy, scikit-learn, joblib, and python-dotenv. The frontend dependencies include React, Vite, Tailwind CSS, shadcn/ui, React Icons, and Recharts.

## 5.3 Implementation Approach

The implementation followed an iterative prototype approach. Each stage was built and tested before moving to the next, which suited a system with connected data generation, database, machine learning, API, and dashboard parts.

The main implementation phases were:

1. Project structure setup.
2. Flask backend and SQLite database setup.
3. Synthetic transaction data generation.
4. Database seeding from generated CSV data.
5. Feature engineering and model training.
6. Fraud scoring API development.
7. Frontend dashboard development.
8. End-to-end integration and testing.

This approach made it easier to confirm each part before full integration.

## 5.4 Project Structure Implementation

The project was organised into separate folders so each part could be maintained clearly.

**Table 5.2: Project folder structure**

| Folder or file | Purpose |
|---|---|
| frontend | React dashboard application. |
| backend | Flask API, database code, generator, training script, and ML modules. |
| backend/ml | Feature engineering module. |
| data | Generated CSV files and SQLite database. |
| models | Trained model and training report. |
| docs | Dissertation and project notes. |
| README.md | Setup and run instructions. |
| plan.md | Implementation progress tracker. |

This structure separates frontend code, backend code, generated data, models, and documentation, making the project easier to understand and demonstrate.

**Figure 5.1: Project structure screenshot**

## 5.5 Backend Implementation

The backend was implemented using Flask as the main application server. It receives frontend requests, validates transaction data, reads and writes SQLite records, loads the trained model, and returns JSON responses.

The main backend file is `backend/app.py`, which defines routes, validation, error handling, model loading, scoring logic, and alert creation.

### 5.5.1 Backend Startup

When the backend starts, it initialises SQLite tables and attempts to load the saved fraud model. If the model is missing, the API still starts, but scoring requests return a clear message telling the user to train a model first.

### 5.5.2 Request Validation

The backend validates transaction input before saving or scoring it to prevent invalid data from entering the system.

The validation checks include:

- request body must be valid JSON;
- account ID must not be empty;
- transaction type must not be empty;
- amount must be a valid number;
- amount must not be negative;
- currency must be a three-letter code;
- timestamp must be valid if it is supplied;
- fraud label must be true/false or 0/1 when supplied.

Validation is important because model predictions depend on clean and consistent input.

### 5.5.3 API Endpoints Implemented

The backend exposes API endpoints for the frontend dashboard.

**Table 5.3: Implemented backend endpoints**

| Endpoint | Method | Implementation result |
|---|---|---|
| `/api/health` | GET | Returns service, database, and model status. |
| `/api/transactions` | POST | Validates and saves a transaction. |
| `/api/transactions` | GET | Returns recent transactions. |
| `/api/score` | POST | Scores a transaction and creates an alert. |
| `/api/alerts` | GET | Returns alerts with filters. |
| `/api/alerts/<alert_id>` | GET | Returns one alert. |
| `/api/alerts/<alert_id>` | PATCH | Updates alert status. |
| `/api/accounts/<account_id>` | GET | Returns account metrics. |
| `/api/accounts/<account_id>/transactions` | GET | Returns account history. |
| `/api/metrics` | GET | Returns dashboard metrics. |

### 5.5.4 Fraud Scoring Implementation

The fraud scoring endpoint allows the frontend to submit a transaction and receive a fraud risk result.

The scoring process is:

1. The frontend sends transaction details to `/api/score`.
2. The backend validates the request body.
3. The backend retrieves previous transaction history for the same account.
4. The feature engineering module combines the account history with the new transaction.
5. The trained model predicts whether the transaction is suspicious.
6. The model also produces a risk score.
7. The backend converts the score into a risk level.
8. The backend creates a readable reason for the alert.
9. The transaction is saved in the database.
10. An alert is saved in the alerts table.
11. The result is returned to the frontend.

The response includes the transaction ID, alert ID, predicted label, risk score, risk level, alert status, key features, reason, and model name.

**Figure 5.2: Backend scoring screenshot**

## 5.6 Database Implementation

SQLite was used because it is lightweight and suitable for a local prototype. The database is created in the data folder and stores records needed by the backend and dashboard.

The schema is defined in `backend/db.py` and initialised automatically when the backend or seeding script runs.

### 5.6.1 Database Tables

The implemented database contains three tables: `transactions`, `alerts`, and `model_runs`. Transactions store payment records, alerts store fraud review items, and model runs support future model metadata.

**Table 5.4: Implemented database tables**

| Table | Implementation purpose |
|---|---|
| transactions | Stores seeded, manual, and scored transactions. |
| alerts | Stores alert records from scoring. |
| model_runs | Supports future model metadata. |

### 5.6.2 Database Seeding

A seeding script was implemented in `backend/seed_db_from_csv.py`. It loads transaction records from CSV, validates required columns, cleans data types, and inserts records into SQLite. It also supports truncation so the prototype can be reset during testing and demonstrations.

**Figure 5.3: Database seeding screenshot**

## 5.7 Synthetic Data Implementation

The synthetic data generator was implemented in `backend/generate_data.py`. It creates mobile-money-style transactions across accounts and days, using account profiles to vary amounts, locations, devices, transaction types, and frequency. It first creates normal transactions, then injects amount spike, device/location change, and rapid burst fraud patterns.

**Table 5.5: Implemented fraud pattern injectors**

| Fraud injector | Implementation description |
|---|---|
| Amount spike | Increases selected transaction amounts above account baseline. |
| Device/location change | Changes device and location to simulate suspicious access. |
| Rapid burst | Creates several transactions close together. |

The generated dataset is saved as `data/transactions.csv`, with a smaller `data/sample_transactions.csv` for demonstrations. The full dataset contained 99,468 transactions, including 2,380 fraud transactions, giving a 2.39 percent fraud rate suitable for demonstrating class imbalance.

**Table 5.6: Generated dataset summary**

| Item | Result |
|---|---|
| Full dataset rows | 99,468 |
| Fraud rows | 2,380 |
| Fraud rate | 2.39 percent |
| Fraud patterns | amount_spike, device_location_change, rapid_burst |
| Quick demo dataset | 600 rows |
| Quick demo fraud rows | 12 rows |

**Figure 5.4: Synthetic data generation screenshot**

## 5.8 Machine Learning Implementation

The machine learning implementation has two parts: feature engineering and model training.

### 5.8.1 Feature Engineering Implementation

Feature engineering was implemented in `backend/ml/features.py`. It loads transaction data, validates columns, cleans records, and creates time, amount, account history, velocity, device change, and location change features.

**Table 5.7: Implemented feature groups**

| Feature group | Example implementation |
|---|---|
| Time features | hour, day_of_week, is_weekend, is_night. |
| Amount features | amount, amount_log, amount ratio and delta. |
| Account history features | prior count, prior average, account age. |
| Velocity features | previous interval, last 1h count, last 24h count. |
| Device and location features | device_change, location_change. |
| Categorical features | transaction_type, currency, location. |

These features help the model compare a transaction with previous account behaviour.

### 5.8.2 Model Training Implementation

Model training was implemented in `backend/train.py`. The script loads the dataset, builds features, splits the data, trains candidate models, evaluates them, selects the best model, and saves it.

Two models were trained:

- logistic regression;
- random forest.

The pipeline scales numeric features and encodes categorical features before training. The selected model is saved as `models/fraud_model.joblib`, with a versioned copy and `models/training_report.json`.

**Table 5.8: Model training results**

| Model | Precision | Recall | F1-score | ROC-AUC |
|---|---:|---:|---:|---:|
| Random forest | 0.4539 | 0.8697 | 0.5965 | 0.9912 |
| Logistic regression | 0.3751 | 0.9811 | 0.5427 | 0.9898 |

Random forest was selected because it gave the best overall balance of ROC-AUC, F1-score, and recall on the synthetic dataset.

**Figure 5.5: Model training screenshot**

## 5.9 Frontend Implementation

The frontend was implemented using React and TypeScript. It provides views for monitoring fraud activity, scoring transactions, reviewing alerts, viewing transactions, and searching account profiles. The application uses reusable components and sidebar navigation.

### 5.9.1 Sidebar Navigation

The sidebar provides navigation to Dashboard, Alerts, Transactions, and Accounts, and displays the open alert count.

### 5.9.2 Dashboard View

The dashboard view shows the main fraud operations summary, including:

- total transactions;
- fraud rate;
- open alerts;
- average risk score;
- risk trend chart;
- alert distribution panel;
- live transaction scoring form;
- scoring result panel.

The scoring form demonstrates the full flow from frontend input to backend scoring and alert creation.

### 5.9.3 Alerts View

The alerts view displays searchable and filterable alert records. Users can open a detail drawer for more information about a suspicious transaction.

The alert detail drawer allows users to:

- view alert details;
- view transaction details;
- view metadata;
- mark an alert as resolved;
- dismiss an alert;
- reopen an alert.

### 5.9.4 Transactions View

The transactions view displays recent records and supports search by account, location, or device, plus filters for type and fraud status.

### 5.9.5 Accounts View

The accounts view retrieves an account profile with transaction totals, fraud count, fraud rate, average and maximum amount, average risk score, alerts, and history.

**Table 5.9: Implemented frontend views**

| View | Main implementation result |
|---|---|
| Dashboard | Metrics, charts, and live scoring. |
| Alerts | Alert table, filters, drawer, and actions. |
| Transactions | Recent transactions, filters, and risk labels. |
| Accounts | Account lookup, risk profile, and history. |

**Figure 5.6: Dashboard screenshot**

**Figure 5.7: Alerts screenshot**

**Figure 5.8: Transactions screenshot**

**Figure 5.9: Accounts screenshot**

## 5.10 Frontend and Backend Integration

The frontend communicates with the backend through API helper functions that call `/api/metrics`, `/api/alerts`, `/api/transactions`, `/api/score`, and account profile endpoints.

During local development, Vite sends relative `/api` requests to the Flask backend at `http://127.0.0.1:5000` through a proxy. This lets both parts work together without changing API URLs.

The integration flow is:

1. User opens the React dashboard.
2. Dashboard requests metrics from `/api/metrics`.
3. Backend reads transaction and alert data from SQLite.
4. Dashboard displays metrics and charts.
5. User submits a transaction through the scoring form.
6. Frontend sends the transaction to `/api/score`.
7. Backend scores the transaction and creates an alert.
8. Frontend refreshes metrics and alerts.

**Figure 5.10: Frontend-backend integration screenshot**

## 5.11 Testing Strategy

Testing checked that the main parts of PayGuard worked correctly. Because this is a prototype, testing focused on functional correctness, API behaviour, model evaluation, frontend build verification, and end-to-end integration.

The following testing categories were used:

- Dataset validation testing.
- Database seeding testing.
- Machine learning evaluation.
- API endpoint testing.
- Frontend build testing.
- End-to-end integration testing.
- User interface behaviour testing.

**Table 5.10: Testing strategy**

| Test area | Purpose |
|---|---|
| Dataset validation | Confirm required columns, labels, and class balance. |
| Database seeding | Confirm CSV records load into SQLite. |
| Model training | Confirm models train and produce metrics. |
| API testing | Confirm endpoints return expected responses. |
| Frontend testing | Confirm dashboard builds and displays screens. |
| Integration testing | Confirm frontend, backend, database, and model work together. |

## 5.12 Test Cases

The main system test cases are shown in Table 5.11.

**Table 5.11: PayGuard test cases**

| Test ID | Test description | Expected result | Actual result | Status |
|---|---|---|---|---|
| TC01 | Generate synthetic dataset. | Valid CSV is created. | Dataset generated. | Passed |
| TC02 | Validate fraud balance. | Normal and fraud records exist. | 99,468 rows and 2,380 fraud rows. | Passed |
| TC03 | Seed SQLite from CSV. | Transactions are inserted. | Database seeded. | Passed |
| TC04 | Train models. | Models train successfully. | Both models evaluated. | Passed |
| TC05 | Save best model. | Model artifact is saved. | `fraud_model.joblib` created. | Passed |
| TC06 | Check health endpoint. | API returns service status. | `/api/health` passed. | Passed |
| TC07 | Create transaction. | Valid transaction is stored. | Record inserted. | Passed |
| TC08 | Reject invalid payload. | API returns validation error. | Error returned. | Passed |
| TC09 | Score transaction. | API returns risk result and alert. | Score and alert returned. | Passed |
| TC10 | Fetch alerts. | API returns latest alerts. | Alerts returned. | Passed |
| TC11 | Fetch metrics. | API returns dashboard metrics. | Summaries returned. | Passed |
| TC12 | Update alert status. | Status can be changed. | Endpoint worked. | Passed |
| TC13 | Account profile lookup. | API returns profile and history. | Profile returned. | Passed |
| TC14 | Frontend build. | React dashboard builds. | Build completed. | Passed |
| TC15 | Dashboard scoring. | User submits and sees result. | Live score returned. | Passed |

The test results show that the prototype satisfies the main functional requirements.

## 5.13 API Testing Results

API testing confirmed that backend routes return JSON responses for health checks, transactions, scoring, alerts, metrics, and account profiles.

**Table 5.12: API testing summary**

| Endpoint | Test purpose | Result |
|---|---|---|
| `GET /api/health` | Check service readiness. | Passed. |
| `POST /api/transactions` | Store a transaction. | Passed. |
| `GET /api/transactions` | Retrieve transaction records. | Passed. |
| `POST /api/score` | Score a transaction and create alert. | Passed. |
| `GET /api/alerts` | Retrieve alerts. | Passed. |
| `GET /api/metrics` | Retrieve dashboard metrics. | Passed. |
| `PATCH /api/alerts/<alert_id>` | Update alert status. | Passed. |
| `GET /api/accounts/<account_id>` | Retrieve account profile. | Passed. |

The API responses support the dashboard and confirm that the backend controls the main fraud monitoring workflow.

## 5.14 Model Testing Results

The model was tested using a train-test split so it could be evaluated on data it had not directly trained on.

Random forest was selected as the final model and achieved the following synthetic test results:

**Table 5.13: Selected model evaluation**

| Metric | Value |
|---|---:|
| Precision | 0.4539 |
| Recall | 0.8697 |
| F1-score | 0.5965 |
| ROC-AUC | 0.9912 |

The recall value shows that the model detected many synthetic fraud cases, while the precision value shows that some alerts may be false positives. This is acceptable for a decision-support prototype. The ROC-AUC value shows strong ranking ability on synthetic data, but not proof of production performance.

## 5.15 Frontend Testing Results

Frontend testing checked whether the dashboard built successfully and connected correctly to backend endpoints. The production build command and local development server were both used.

**Table 5.14: Frontend testing summary**

| Test area | Expected result | Actual result | Status |
|---|---|---|---|
| Dashboard view | Metrics, charts, and scoring form display. | Dashboard displayed correctly. | Passed |
| Alerts view | Table, filters, drawer, and actions work. | Alerts could be reviewed. | Passed |
| Transactions view | Records and filters are shown. | Table displayed records. | Passed |
| Accounts view | Lookup returns profile and history. | Metrics and records returned. | Passed |
| Frontend build | Application builds. | Build completed. | Passed |

The frontend was designed to be simple and operational, without requiring users to understand the internal model.

## 5.16 End-to-End Integration Results

End-to-end testing confirmed that all major components worked together, from data generation and model training to database seeding, backend startup, frontend loading, and transaction scoring.

The end-to-end flow followed these steps:

1. Generate synthetic transactions.
2. Train the fraud detection model.
3. Seed SQLite from the generated CSV file.
4. Start the Flask API.
5. Start the React frontend.
6. Open the dashboard in the browser.
7. Fetch dashboard metrics through the API.
8. Score a transaction from the frontend.
9. Save the transaction and alert.
10. Display updated alerts and metrics.

**Table 5.15: End-to-end verification**

| Integration point | Expected result | Result |
|---|---|---|
| Frontend to backend health check | Proxy reaches Flask API. | Passed. |
| Metrics loading | Dashboard receives `/api/metrics`. | Passed. |
| Alert loading | Dashboard receives `/api/alerts`. | Passed. |
| Live scoring | Form sends to `/api/score`. | Passed. |
| Database persistence | Transaction and alert are stored. | Passed. |
| Dashboard refresh | Metrics and alerts update. | Passed. |

The integration test confirmed that PayGuard works as a complete prototype rather than disconnected modules.

**Figure 5.11: End-to-end demonstration screenshot**

## 5.17 Validation Against Objectives

The Chapter 1 objectives were compared with the implemented system to confirm whether the project achieved its purpose.

**Table 5.16: Validation against project objectives**

| Objective | Implementation evidence | Status |
|---|---|---|
| Design a mobile money fraud detection system. | System architecture, backend, database, model, and dashboard were implemented. | Achieved |
| Generate synthetic mobile money transaction data. | Data generator created full and sample transaction datasets. | Achieved |
| Identify transaction features for fraud detection. | Feature engineering module created amount, time, velocity, account history, device, and location features. | Achieved |
| Train and evaluate supervised machine learning models. | Logistic regression and random forest models were trained and evaluated. | Achieved |
| Develop backend scoring and alert storage. | Flask API implemented `/api/score` and alert persistence. | Achieved |
| Design a dashboard for transactions, alerts, and risk levels. | React dashboard implemented Dashboard, Alerts, Transactions, and Accounts views. | Achieved |
| Reduce manual work needed to identify suspicious transactions. | Dashboard highlights risk scores and alerts for review. | Achieved at prototype level |

The validation shows that the main objectives were achieved within prototype scope.

## 5.18 Challenges Encountered

Several implementation challenges were encountered.

**Table 5.17: Implementation challenges and solutions**

| Challenge | Effect | Solution |
|---|---|---|
| Lack of real financial data | Real mobile money records could not be used for privacy reasons. | Synthetic transaction data was generated. |
| Fraud class imbalance | Fraud records are fewer than normal records. | Metrics such as recall, F1-score, and ROC-AUC were used instead of accuracy alone. |
| Connecting model scoring to API | The model needed account history to build features. | Backend retrieves account history before scoring new transactions. |
| Explaining risk results to users | Users need understandable reasons, not only numbers. | Backend returns key features and human-readable alert reasons. |
| Frontend and backend integration | The dashboard needed to call the Flask API smoothly. | Vite proxy and API helper functions were implemented. |
| Prototype security limits | Full authentication and role controls were outside current scope. | Security limitations were documented for future improvement. |

These challenges helped improve the final system design.

## 5.19 Chapter Summary

This chapter described PayGuard's implementation, testing, and results. It covered the development environment, project structure, backend, database, data generation, machine learning, frontend, integration, test cases, API results, model results, and end-to-end verification.

The completed prototype generated synthetic data, trained fraud detection models, selected random forest, stored transactions in SQLite, exposed Flask API endpoints, created alerts, and displayed monitoring information through a React dashboard. The system achieved the main objectives at prototype level.

The next chapter will discuss system deployment, implementation planning, maintenance, user training, and post-implementation considerations.

---

# Chapter 6: System Implementation and Maintenance

## 6.1 Introduction

This chapter explains how the completed PayGuard prototype can be installed, run, maintained, and reviewed after implementation. Chapter 5 focused on development and testing, while this chapter focuses on introducing the system into use and keeping it operational.

PayGuard is currently a local prototype that runs on a development computer using Flask, SQLite, a saved machine learning model, and a React frontend. It is suitable for demonstration, academic assessment, and future improvement, but it is not yet connected to a real mobile money provider or institutional payment platform.

Implementation includes installing dependencies, generating synthetic data, training the model, seeding the database, and starting the backend and frontend. Maintenance includes backups, retraining, alert monitoring, fraud pattern improvement, and future deployment planning.

## 6.2 Implementation Overview

The PayGuard implementation is divided into backend, database, machine learning, frontend, and integration parts. These must work together for the system to function properly.

**Table 6.1: PayGuard implementation overview**

| System part | Implementation status | Purpose |
|---|---|---|
| Backend API | Implemented | Handles transactions, scoring, alerts, metrics, and accounts. |
| SQLite database | Implemented | Stores transactions, alerts, and model run information. |
| Synthetic data generator | Implemented | Creates mobile-money-style datasets. |
| Machine learning model | Implemented | Produces fraud risk predictions. |
| React dashboard | Implemented | Displays metrics, alerts, transactions, accounts, and scoring form. |
| End-to-end integration | Implemented | Connects frontend, backend, database, and model. |
| Cloud deployment | Future improvement | Can be added later after production requirements are confirmed. |

**Figure 6.1: Implementation overview diagram**

## 6.3 System Installation Requirements

Before PayGuard can run, the required software must be installed. The project uses separate backend and frontend setup steps.

**Table 6.2: Installation requirements**

| Requirement | Purpose |
|---|---|
| Python | Runs the API, generator, seeding script, and training script. |
| Node.js | Runs the React frontend environment. |
| npm or pnpm | Installs frontend dependencies. |
| Git | Supports project version control. |
| Web browser | Opens and uses the PayGuard dashboard. |
| Internet access | Required when installing packages and dependencies. |

Backend dependencies include Flask, pandas, NumPy, scikit-learn, joblib, and python-dotenv. Frontend dependencies include React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Icons, and Recharts.

## 6.4 Backend Installation Procedure

The backend setup prepares the Python environment and installs required packages. The backend folder contains the Flask application, machine learning scripts, database layer, data generator, and training script.

The backend setup process is:

1. Open the project folder.
2. Move into the backend folder.
3. Create a Python virtual environment.
4. Activate the virtual environment.
5. Install backend dependencies from `requirements.txt`.

**Table 6.3: Backend setup commands**

| Step | Command |
|---|---|
| Open backend folder | `cd backend` |
| Create virtual environment | `python -m venv .venv` |
| Activate virtual environment | `.venv\Scripts\Activate.ps1` |
| Install dependencies | `pip install -r requirements.txt` |

After installation, the system can generate data, train models, seed the database, and run the API.

**Figure 6.2: Backend setup screenshot**

## 6.5 Frontend Installation Procedure

The frontend setup prepares the React dashboard, including views, UI components, API client, and styling files.

The frontend setup process is:

1. Move into the frontend folder.
2. Install frontend dependencies.
3. Start the development server.

**Table 6.4: Frontend setup commands**

| Step | Command |
|---|---|
| Open frontend folder | `cd frontend` |
| Install dependencies | `npm install` |
| Start development server | `npm run dev` |
| Build production version | `npm run build` |

During development, Vite proxies relative `/api` requests to Flask at `http://127.0.0.1:5000`.

**Figure 6.3: Frontend setup screenshot**

## 6.6 Data Preparation Procedure

PayGuard uses synthetic transaction data for training and testing, protecting privacy because no real student, customer, or mobile money account records are used.

The data preparation process is:

1. Generate synthetic mobile money transactions.
2. Save the generated data to the `data` folder.
3. Validate the number of rows, fraud rows, and fraud rate.
4. Seed the SQLite database from the generated CSV file.

**Table 6.5: Data preparation commands**

| Step | Command |
|---|---|
| Generate full dataset | `python generate_data.py --accounts 420 --days 45 --seed 42 --output ..\data\transactions.csv` |
| Seed full dataset | `python seed_db_from_csv.py --csv ..\data\transactions.csv --truncate` |
| Seed quick demo dataset | `python seed_db_from_csv.py --csv ..\data\sample_transactions.csv --truncate` |

The full dataset is used for training and full demonstration, while the sample dataset supports quick demos.

**Figure 6.4: Data preparation screenshot**

## 6.7 Model Training Procedure

The fraud detection model must be trained before the scoring API can produce model-based risk scores. The training script loads the dataset, builds features, trains candidate models, evaluates them, selects the best model, and saves it.

The model training command is:

`python train.py --dataset ..\data\transactions.csv --models-dir ..\models --test-size 0.2 --random-seed 42`

After training, the selected model is saved as `fraud_model.joblib`, with a report saved as `training_report.json`.

**Table 6.6: Model training outputs**

| Output | Description |
|---|---|
| `fraud_model.joblib` | Main trained model loaded by the backend API. |
| Versioned model file | Timestamped model copy for tracking model versions. |
| `training_report.json` | Stores model metrics, dataset summary, selected model, and feature lists. |

The current selected model is random forest because it performed better overall than logistic regression on the synthetic test dataset.

**Figure 6.5: Model training screenshot**

## 6.8 Database Initialisation and Seeding

The SQLite database is initialised automatically by the backend database layer. If the file does not exist, the system creates it and adds the required tables. The seeding script inserts CSV records into `transactions` and can clear existing records with `--truncate`.

**Table 6.7: Database implementation files**

| File | Purpose |
|---|---|
| `backend/db.py` | Defines database schema and database helper functions. |
| `backend/seed_db_from_csv.py` | Loads CSV transactions into SQLite. |
| `data/payguard.db` | SQLite database file created during local use. |

The database should be seeded before using the dashboard for transaction browsing or account lookup.

## 6.9 Running the Backend API

After the database and trained model are ready, the Flask backend can be started.

The backend run command is:

`python app.py`

By default, the backend runs at:

`http://127.0.0.1:5000`

Once running, the health endpoint confirms that the service, database, and model are ready.

**Table 6.8: Backend readiness checks**

| Check | Expected result |
|---|---|
| API service | Returns status ok. |
| Database | Reports database connected. |
| Model | Reports model loaded. |
| Timestamp | Returns API response time. |

**Figure 6.6: Backend health check screenshot**

## 6.10 Running the Frontend Dashboard

The frontend dashboard is started from the frontend folder using:

`npm run dev`

The browser opens the local dashboard URL shown by Vite. The dashboard should be used after the backend is running because it depends on API endpoints for live data.

**Table 6.9: Dashboard screens available after startup**

| Screen | Purpose |
|---|---|
| Dashboard | Metrics, charts, and live scoring. |
| Alerts | Suspicious alerts and review actions. |
| Transactions | Recent records and filters. |
| Accounts | Account profiles and history. |

**Figure 6.7: Dashboard startup screenshot**

## 6.11 End-to-End Run Order

The full PayGuard prototype should be run in the correct order so all components are ready.

**Table 6.10: Full run order**

| Step | Action | Reason |
|---|---|---|
| 1 | Install backend dependencies. | Prepares Python environment. |
| 2 | Install frontend dependencies. | Prepares React dashboard. |
| 3 | Generate synthetic dataset. | Creates training and seed data. |
| 4 | Train fraud model. | Creates saved scoring model. |
| 5 | Seed SQLite database. | Loads dashboard records. |
| 6 | Start Flask backend. | Makes API endpoints available. |
| 7 | Start React frontend. | Opens dashboard interface. |
| 8 | Score a transaction. | Confirms end-to-end workflow. |

The recommended backend run sequence is:

1. `python generate_data.py --accounts 420 --days 45 --seed 42 --output ..\data\transactions.csv`
2. `python train.py --dataset ..\data\transactions.csv --models-dir ..\models --test-size 0.2 --random-seed 42`
3. `python seed_db_from_csv.py --csv ..\data\transactions.csv --truncate`
4. `python app.py`

In another terminal, the frontend run sequence is:

1. `cd frontend`
2. `npm run dev`

**Figure 6.8: End-to-end run screenshot**

## 6.12 User Training Plan

User training is important because finance staff and administrators may not be technical users. Training should focus on dashboard use and alert interpretation, not internal machine learning code.

The training should cover:

- how to open the dashboard;
- how to read the summary metrics;
- how to submit a transaction for scoring;
- how to interpret risk scores and risk levels;
- how to view alerts;
- how to open alert details;
- how to mark alerts as resolved, closed, or reopened;
- how to search transactions;
- how to look up an account profile.

**Table 6.11: User training plan**

| Training area | User should learn |
|---|---|
| Dashboard overview | Understand metrics and risk summaries. |
| Transaction scoring | Enter details and read results. |
| Alert review | Open alerts, read reasons, and update status. |
| Transaction search | Filter records by account, type, device, location, or fraud status. |
| Account lookup | Review account-level risk information. |
| Responsible use | Treat alerts as review warnings, not proof of fraud. |

**Figure 6.9: User training screenshot**

## 6.13 System Deployment Plan

The current version of PayGuard is deployed locally for development and demonstration. This is suitable for the final year project because the examiner can see the full system without connecting to real financial infrastructure.

Future cloud deployment can be considered after the prototype is complete. The frontend can be deployed as a static Vite application, and Flask can be adapted for cloud hosting. However, SQLite is limited in serverless environments, so production deployment would require a managed database such as PostgreSQL.

**Table 6.12: Deployment options**

| Deployment option | Suitability | Notes |
|---|---|---|
| Local development machine | Current prototype. | Easy for demonstration. |
| Local network deployment | Small internal demos. | Requires reachable backend host. |
| Static frontend hosting | Frontend only. | Requires backend API URL. |
| Cloud/serverless backend | Future option. | Requires database and model planning. |
| Production deployment | Future improvement. | Requires security and governance. |

**Figure 6.10: Deployment options diagram**

## 6.14 Maintenance Plan

Maintenance is required to keep PayGuard useful and reliable. Since it includes a machine learning model, maintenance covers both software and model work.

**Table 6.13: Maintenance activities**

| Activity | Frequency | Purpose |
|---|---|---|
| Backup database | Weekly during active use | Protect records. |
| Review alerts | Daily during active monitoring | Confirm investigation. |
| Retrain model | When new data or patterns exist | Keep detection relevant. |
| Review model metrics | After each training run | Check performance. |
| Update dependencies | Periodically | Keep software compatible. |
| Review API errors | During testing and demos | Detect issues early. |
| Improve usability | As users give feedback | Improve dashboard use. |
| Document changes | After major updates | Keep docs accurate. |

## 6.15 Model Maintenance

The fraud detection model should not be treated as permanently complete. Fraud behaviour changes over time, and older models may become less useful because of concept drift.

For PayGuard, model maintenance should include:

- collecting new approved data or improving synthetic data patterns;
- retraining the candidate models;
- comparing new metrics with previous metrics;
- saving versioned model files;
- updating the main `fraud_model.joblib` only when the new model performs acceptably;
- checking whether the model creates too many false alerts;
- using human review feedback to improve future training.

In real deployment, retraining with anonymised records should only happen after proper permission and privacy controls are in place.

## 6.16 Data Backup and Recovery

Because PayGuard stores transaction and alert information in SQLite, `data/payguard.db` should be backed up during active use.

**Table 6.14: Backup and recovery plan**

| Item | Backup method | Recovery method |
|---|---|---|
| SQLite database | Copy `data/payguard.db`. | Restore it into the data folder. |
| Generated CSV data | Keep CSV copies. | Reseed database if needed. |
| Model artifacts | Backup model files. | Restore into models folder. |
| Training report | Backup report JSON. | Restore for comparison. |
| Source code | Commit changes using Git. | Restore from repository history. |

If the database is lost, it can be recreated by rerunning the seeding script with the generated CSV dataset.

## 6.17 Post-Implementation Review

After implementation, the system was reviewed against the project goals. The prototype generated transaction data, trained a model, started the backend API, stored transactions and alerts, and displayed monitoring information in the dashboard.

The post-implementation review showed the following:

- The system can run locally as a complete prototype.
- The backend API can connect to SQLite.
- The fraud model can be loaded by the backend.
- The scoring endpoint can return risk scores and alert reasons.
- The dashboard can display metrics, alerts, transactions, and account profiles.
- The frontend and backend can communicate through API requests.
- The system supports a clear demonstration of fraud detection workflow.

The review also showed areas for production improvement, including authentication, role-based access, real data integration, stronger deployment, cloud database support, and continuous model monitoring.

**Table 6.15: Post-implementation review**

| Review area | Result |
|---|---|
| Data generation | Worked using synthetic data. |
| Model training | Worked and selected random forest. |
| Backend API | Worked for health, transactions, scoring, alerts, metrics, and accounts. |
| Database | Worked using SQLite. |
| Frontend dashboard | Worked with all main views. |
| Integration | Worked from scoring to alert creation. |
| Production readiness | Not production ready because it is a prototype. |

## 6.18 Implementation Limitations

The system implementation has limitations that should be acknowledged.

**Table 6.16: Implementation limitations**

| Limitation | Explanation |
|---|---|
| Synthetic data only | No real institutional mobile money data. |
| Local SQLite database | Suitable for prototype, not large production. |
| Limited authentication | No full login or role management. |
| No real mobile money integration | No EcoCash, bank API, or live payment connection. |
| Prototype model performance | Results are based on simulated data. |
| Manual screenshot insertion | Figures are planned but not inserted yet. |

These limitations are acceptable for the academic prototype and guide future improvements.

## 6.19 Chapter Summary

This chapter discussed PayGuard implementation and maintenance, including installation, setup, data preparation, model training, database seeding, startup, run order, user training, deployment, maintenance, backup, review, and limitations.

The chapter showed that PayGuard can be demonstrated locally as a complete prototype. Future deployment would require stronger security, a production database, real data governance, and advanced maintenance procedures.

The next chapter will present the project summary, conclusion, recommendations, and future enhancements.

---

# Chapter 7: Summary, Conclusion and Recommendations

## 7.1 Introduction

This chapter presents the final summary, conclusion, recommendations, and future enhancements for the PayGuard Mobile Money Fraud Detection System. The chapter reflects on the work completed in the project and explains how the system addressed the problem identified in Chapter 1.

The main purpose of PayGuard was to design and develop a prototype system that can assist institutions in detecting suspicious mobile money transactions. The system was created to support finance officers and fraud analysts by providing transaction monitoring, fraud risk scoring, alert generation, dashboard metrics, and account-level review.

This final chapter also discusses the extent to which the project objectives were achieved, the main challenges faced, recommendations for use, and possible improvements for future work.

## 7.2 Project Summary

PayGuard was developed as a mobile money fraud detection and monitoring prototype. The system uses synthetic mobile-money-style transaction data because real financial data is sensitive and difficult to access for academic research. The synthetic dataset contains normal transactions as well as fraud patterns such as amount spikes, device and location changes, and rapid transaction bursts.

The project includes a complete software workflow. A Python data generator creates transaction data. A feature engineering module prepares the data for machine learning. A training script trains and evaluates candidate fraud detection models. The best model is saved and loaded by the Flask backend. The backend provides API endpoints for health checks, transactions, scoring, alerts, metrics, and account profiles. The React dashboard allows users to view fraud monitoring information and score transactions through a user-friendly interface.

The system was tested end-to-end. The testing confirmed that the prototype can generate data, train a model, seed the SQLite database, run the backend API, load the frontend dashboard, score a transaction, create an alert, and display updated metrics.

## 7.3 Objectives Achieved

The objectives stated in Chapter 1 were reviewed to determine whether the project achieved its purpose.

**Table 7.1: Objectives achieved**

| Objective | Achievement |
|---|---|
| To design a mobile money fraud detection system for institutional digital finance. | Achieved. The system architecture, backend, database, model, and dashboard were designed and implemented. |
| To generate synthetic mobile money transaction data for system development and testing. | Achieved. Synthetic transaction data was generated with normal and fraudulent patterns. |
| To identify transaction features that can help separate normal transactions from suspicious transactions. | Achieved. Features such as amount ratio, velocity, account history, device change, and location change were implemented. |
| To train and evaluate supervised machine learning models for fraud detection. | Achieved. Logistic regression and random forest models were trained and evaluated. |
| To develop a backend system that can score transactions and store alerts. | Achieved. Flask endpoints were implemented for transaction scoring and alert storage. |
| To design a dashboard that allows users to view transactions, alerts, and fraud risk levels. | Achieved. The React dashboard includes Dashboard, Alerts, Transactions, and Accounts views. |
| To support finance staff by reducing the amount of manual work needed when identifying suspicious transactions. | Achieved at prototype level. The system highlights risky transactions and provides alerts for review. |

The project therefore achieved its main objectives within the limits of a prototype system.

## 7.4 Main Findings

The project produced several findings during development and testing.

First, synthetic data can support the development of a fraud detection prototype when real financial data is unavailable. Although synthetic data cannot fully replace real transaction data, it allows safe experimentation without exposing personal or financial records.

Second, feature engineering is important in fraud detection. The model needs more than the raw transaction amount. Features such as transaction velocity, account prior average amount, time since previous transaction, device change, and location change help the system understand whether a transaction is unusual.

Third, machine learning can support fraud monitoring by producing risk scores. In the PayGuard prototype, the random forest model performed strongly on the synthetic dataset and was selected as the final model. However, the model should still be reviewed by humans because a suspicious transaction is not always fraudulent.

Fourth, a dashboard improves the usefulness of the fraud detection model. Instead of only producing technical model results, PayGuard displays risk scores, alerts, trends, account profiles, and transaction records in a way that users can inspect.

## 7.5 Conclusion

The PayGuard Mobile Money Fraud Detection System successfully demonstrates how a software prototype can be used to support fraud monitoring in mobile-money-style institutional payments. The system was able to generate synthetic transaction data, train a fraud detection model, score transactions, create alerts, store records in SQLite, and display useful monitoring information through a React dashboard.

The project addressed the problem of manual and slow fraud checking by introducing automated transaction scoring and alert creation. Instead of requiring finance staff to inspect every transaction equally, PayGuard helps prioritise suspicious transactions based on risk level and key fraud signals.

The system also supports ethical and privacy-aware development by using synthetic data instead of real customer or student payment data. This makes the project suitable for academic demonstration while reducing privacy risk.

Although PayGuard is not a production banking system, it successfully proves the concept of using machine learning and dashboard monitoring to support mobile money fraud detection. The project can therefore be considered successful within its academic scope.

## 7.6 Recommendations

The following recommendations are made based on the completed project:

- Institutions that process many digital payments should consider automated fraud monitoring tools to support manual checking.
- Fraud alerts should be used as decision-support information, not as automatic proof that a user committed fraud.
- Human review should remain part of the fraud investigation process.
- Synthetic data is useful for academic development, but real anonymised data should be used for serious production evaluation where permission is granted.
- Future systems should include strong authentication, user roles, audit logs, and secure database storage.
- The fraud detection model should be retrained periodically so that it can adapt to changing fraud patterns.
- Dashboard design should remain simple so that non-technical finance users can understand risk scores and alerts easily.

## 7.7 Future Enhancements

PayGuard can be improved in several ways in future versions.

**Table 7.2: Future enhancements**

| Enhancement | Description |
|---|---|
| Real anonymised data | Use approved real transaction data after removing personal information. |
| User authentication | Add login functionality for finance officers, fraud analysts, and administrators. |
| Role-based access control | Give different users different permissions based on their responsibilities. |
| Cloud database | Replace SQLite with PostgreSQL or another managed database for larger deployment. |
| Real-time notifications | Add email, SMS, or dashboard notifications for high-risk alerts. |
| Advanced machine learning models | Test models such as XGBoost, anomaly detection, or neural networks. |
| Explainability tools | Add clearer explanations showing why a model marked a transaction as risky. |
| Audit trail | Record user actions such as alert review, resolution, and dismissal. |
| Live payment integration | Connect to real payment systems only after security and legal requirements are met. |
| Model monitoring | Track model performance over time and detect concept drift. |

These enhancements would make the system stronger, safer, and closer to a real-world fraud monitoring platform.

## 7.8 Contribution of the Project

The project contributes a practical demonstration of how fraud detection can be applied to mobile-money-style transactions. It combines software engineering, data generation, database design, machine learning, API development, and dashboard design into one working prototype.

The project also contributes academically by showing how a student can use synthetic data to study a sensitive problem without exposing real personal records. This is important because financial fraud research often faces data access and privacy challenges.

For non-technical users, the project shows that machine learning can be presented through simple dashboard tools instead of only technical reports. This makes the system easier to explain and defend during presentation.

## 7.9 Limitations Revisited

The project had several limitations. The most important limitation is that the system used synthetic data rather than real mobile money records. This means that the model results may not fully represent real-world fraud behaviour. Real fraud patterns may be more complex and may change faster than the patterns simulated in the dataset.

Another limitation is that the system is currently a local prototype. It does not include full production security, live integration with mobile money providers, or enterprise-level deployment. SQLite was suitable for the project, but a production version would require a stronger database and secure hosting environment.

The system also does not make final fraud decisions. It only highlights suspicious transactions for review. This limitation is important because legitimate transactions can sometimes appear unusual.

## 7.10 Final Conclusion

PayGuard achieved its goal of demonstrating a mobile money fraud detection and monitoring system. The project produced a working prototype that can generate transaction data, train a model, score transactions, create alerts, store results, and display fraud monitoring information through a dashboard.

The project shows that automated fraud detection can support finance departments by improving speed, organisation, and prioritisation during transaction review. It also shows that machine learning can be useful when combined with clear user interfaces and human review.

In conclusion, PayGuard is a successful final year project prototype that addresses a real digital finance problem. It provides a strong foundation for future research and development in mobile money fraud detection.

---

# References

Abdallah, A., Maarof, M.A. and Zainal, A. (2016) 'Fraud detection system: a survey', *Journal of Network and Computer Applications*, 68, pp. 90-113.

Bahnsen, A.C., Aouada, D., Stojanovic, A. and Ottersten, B. (2013) 'Cost sensitive credit card fraud detection using Bayes minimum risk', in *Proceedings of the 12th IEEE International Conference on Machine Learning and Applications*. IEEE, pp. 333-338.

Bahnsen, A.C., Aouada, D. and Stojanovic, A. (2017) 'Example-dependent cost-sensitive decision trees', *Expert Systems with Applications*, 69, pp. 105-117.

Carcillo, F., Dal Pozzolo, G., Le Borgne, Y.-A., Caelen, O., Mazzer, Y. and Bontempi, G. (2018) 'SCARFF: a scalable framework for streaming credit card fraud detection with Spark', *Information Fusion*, 41, pp. 182-194.

Carcillo, F., Le Borgne, Y.-A., Caelen, O., Kessaci, Y., Oblé, F. and Bontempi, G. (2019) 'Combining unsupervised and supervised learning in credit card fraud detection', *Information Sciences*, 557, pp. 317-331.

Chen, T. and Guestrin, C. (2016) 'XGBoost: A scalable tree boosting system', in *Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining*. New York: ACM, pp. 785-794.

Dal Pozzolo, G., Boracchi, G., Caelen, O., Alippi, C. and Bontempi, G. (2015) 'Credit card fraud detection and concept drift adaptation with delayed supervised information', in *Proceedings of the International Joint Conference on Neural Networks*. IEEE.

Government of Zimbabwe (2018) *Education 5.0 policy framework*. Harare: Government of Zimbabwe.

Lebichot, B., Paldino, G.M., Siblini, W., He-Guelton, L., Oblé, F. and Bontempi, G. (2021) 'Incremental learning strategies for credit cards fraud detection', *International Journal of Data Science and Analytics*, 12(3), pp. 165-174.

Lopez-Rojas, E.A., Elmir, A. and Axelsson, S. (2016) 'PaySim: A financial mobile money simulator for fraud detection', in *Proceedings of the 28th European Modeling and Simulation Symposium*. Larnaca, Cyprus.

Makori, J. (2019) *Mobile money fraud in Africa: vulnerabilities and mitigation*. Bibliographic details to be verified.

OECD (2017) *Enhancing financial consumer protection amid rapid technological change*. Paris: OECD Publishing.

Phua, C., Lee, V., Smith, K. and Gayler, R. (2010) 'A comprehensive survey of data mining-based fraud detection research', *arXiv preprint*, arXiv:1009.6119.

University of Zimbabwe (2020) *Mobile financial crime detection framework*. Harare: University of Zimbabwe. Bibliographic details to be verified.

Whitrow, C., Hand, D.J., Juszczak, P., Weston, D. and Adams, N.M. (2009) 'Transaction aggregation as a strategy for credit card fraud detection', *Data Mining and Knowledge Discovery*, 18(1), pp. 30-55.

Zimbabwe (2021) *Cyber and Data Protection Act [Chapter 12:07]*. Harare: Government of Zimbabwe.
