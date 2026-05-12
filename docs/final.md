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

This chapter reviews literature related to mobile money fraud detection and also studies the feasibility of developing the proposed PayGuard system. The chapter first explains the main terms used in the research, then discusses mobile money, institutional digital finance, common fraud methods, machine learning approaches, synthetic data, evaluation methods and related studies. The chapter also includes the feasibility study, covering technical, economic, operational, legal, schedule and social feasibility.

The purpose of this chapter is to show that the proposed system is based on existing research and that it can be developed using available tools and resources. Fraud detection is an important area because many organisations now depend on digital payments, mobile wallets and online transaction systems. As transactions increase, criminals also develop new ways of committing fraud. This makes it necessary to develop intelligent systems that can detect suspicious transactions quickly and assist finance officers in making decisions (Phua et al., 2010; Abdallah, Maarof and Zainal, 2016).

PayGuard is proposed as a prototype system for detecting suspicious mobile-money-style transactions in an institutional finance environment. The system will not replace human officers, but will assist them by giving risk scores, alerts and transaction summaries. This approach agrees with fraud detection literature, which shows that automated systems are most useful when they support human investigation rather than making final decisions alone (Dal Pozzolo et al., 2015).

## 2.2 Definition of Terms

| Term | Meaning in this study |
|---|---|
| Mobile money | A financial service that allows users to send, receive, store and pay money using a mobile device. |
| Digital finance | The use of digital systems such as mobile wallets, payment portals, online banking and databases to support financial services. |
| Fraud | Any dishonest activity done to gain money, services or access through false information, manipulation or unauthorised use. |
| Fraud detection | The process of identifying transactions or behaviour that may indicate fraudulent activity. |
| Transaction | A record of money movement, for example payment of fees, transfer of funds, cash-in or cash-out. |
| Risk score | A numerical value produced by a model to show how suspicious a transaction is. |
| Alert | A notification created by the system when a transaction is considered risky. |
| Machine learning | A branch of artificial intelligence where computer systems learn patterns from data and use them to make predictions. |
| Supervised learning | A machine learning method where a model is trained using examples that already have known labels such as fraud or legitimate. |
| Synthetic data | Artificially generated data that imitates real data but does not contain real personal information. |
| Class imbalance | A situation where one class is much larger than another, for example legitimate transactions being far more common than fraud cases. |
| Concept drift | A change in data patterns over time, where fraud methods change and older models become less accurate. |

## 2.3 Mobile Money and Institutional Digital Finance

Mobile money has become an important financial technology in many African economies because it allows people to perform transactions without visiting a physical bank. It is especially useful where formal banking access is limited or where people need fast and convenient payment channels. Mobile money supports person-to-person transfers, merchant payments, bill payments, savings and institutional payments (OECD, 2017; Makori, 2019).

In universities and colleges, digital finance is now used for tuition payments, registration fees, accommodation fees and other student payments. This reduces queues and allows payments to be processed faster. However, it also creates new risks because payment systems must handle large numbers of transactions, many users, different channels and possible fraudulent behaviour.

At institutional level, the finance department needs to confirm payments, reconcile records and detect suspicious activities. If this process is done manually, fraud may be discovered late. A fraud detection system can help by continuously checking transactions and showing which ones need further investigation.

## 2.4 Mobile Money Fraud Methods

Mobile money fraud can happen in many ways. Fraudsters may target the customer, the agent, the institution, or the payment infrastructure. The common fraud methods relevant to this research are shown in Table 2.1.

**Table 2.1: Common mobile money fraud methods**

| Fraud method | Description | Possible indicator in the system |
|---|---|---|
| Social engineering | A user is tricked into sending money or revealing account details. | Sudden unusual transfer or payment from a normally quiet account. |
| SIM swap fraud | A fraudster takes control of the victim's mobile number. | New device, new location or sudden change in transaction pattern. |
| Account takeover | Unauthorised person gains access to an account. | Transactions from unfamiliar devices or locations. |
| Smurfing | Large value is split into many smaller transactions to avoid detection. | Many transactions within a short period. |
| Fake payment confirmation | Fraudster presents a false message or receipt as proof of payment. | Payment not matching official transaction records. |
| Agent or insider abuse | A trusted person misuses system access or transaction authority. | Repeated suspicious activity linked to similar accounts or patterns. |

The above methods show that fraud is not always detected using one simple rule. Some fraud cases are only suspicious when several signs are combined, such as transaction amount, time, device, location and account history. This is one reason why machine learning is useful in fraud detection.

## 2.5 Existing Fraud Detection Approaches

Fraud detection systems have developed from simple manual checking to automated and intelligent systems. The main approaches include rule-based detection, supervised machine learning, unsupervised detection and hybrid systems.

### 2.5.1 Manual and Rule-Based Detection

Traditional fraud detection uses manual checking and fixed rules. Examples include blocking transactions above a certain amount, limiting the number of transactions per day, or flagging transactions from blocked accounts. These methods are easy to understand and can enforce policy requirements.

However, rule-based systems have weaknesses. They are not flexible when fraud patterns change. Fraudsters can also study the rules and avoid them. For example, if the system checks only large payments, a fraudster may divide the amount into smaller payments. Rule-based systems may also create many false alerts if the rules are too strict (Phua et al., 2010).

### 2.5.2 Supervised Machine Learning

Supervised learning uses historical labelled data to train a model. In fraud detection, each transaction may be labelled as fraudulent or legitimate. The model then learns patterns that separate the two classes. Common supervised algorithms include logistic regression, decision trees, random forests, support vector machines, neural networks and gradient boosting methods (Abdallah, Maarof and Zainal, 2016).

Supervised learning is suitable for PayGuard because the proposed system uses labelled synthetic data. The labels allow the model to learn how fraudulent transactions differ from normal ones. The trained model can then be used to score new transactions.

### 2.5.3 Unsupervised and Anomaly Detection

Unsupervised methods do not require labelled fraud examples. They try to find unusual behaviour or outliers. This is useful where fraud labels are not available or where new fraud methods appear. Examples include clustering and anomaly detection. However, unsupervised methods can be difficult to evaluate because they do not always explain whether an unusual transaction is truly fraudulent (Phua et al., 2010).

### 2.5.4 Hybrid Fraud Detection

Hybrid systems combine different methods. For example, a system may use rules for known policy violations and machine learning for more complex patterns. A hybrid approach is often practical because financial institutions still need clear rules, but also need adaptive methods that can learn from data (Carcillo et al., 2019).

PayGuard follows a hybrid idea at prototype level. It uses supervised machine learning to produce risk scores, while also using alert thresholds to decide when a transaction should be reviewed.

## 2.6 Synthetic Transaction Data

Access to real financial data is usually restricted because of privacy, security and legal concerns. Real transaction data may contain names, account numbers, phone numbers, locations, payment references and other sensitive information. For an academic project, using real data may create ethical and legal risks.

Synthetic data is therefore useful because it allows the researcher to create realistic transaction records without exposing real users. Lopez-Rojas, Elmir and Axelsson (2016) introduced PaySim, a mobile money simulator for fraud detection research. Their work shows that simulated financial data can be useful when real financial datasets are not available.

PayGuard adopts this idea by generating synthetic mobile-money-style transactions. The generated data includes accounts, amounts, transaction types, timestamps, locations, devices and fraud labels. Fraud patterns are injected into the data so that the model can learn from them.

**Table 2.2: Comparison between real data and synthetic data**

| Area | Real transaction data | Synthetic transaction data |
|---|---|---|
| Privacy | Contains sensitive user information. | Does not contain real personal records. |
| Access | Difficult to obtain due to institutional restrictions. | Can be generated by the researcher. |
| Legal risk | Requires strong approvals and compliance controls. | Lower risk during prototype development. |
| Realism | More accurate representation of actual behaviour. | Depends on quality of simulation rules. |
| Reproducibility | May not be shareable with other researchers. | Can be regenerated using scripts and parameters. |

Although synthetic data is useful, it is not a perfect replacement for real data. A system trained on synthetic data must be tested carefully before being used in production. The final system should therefore be treated as a research prototype.

## 2.7 Feature Engineering for Fraud Detection

Feature engineering is the process of converting raw transaction data into useful model inputs. In fraud detection, useful features often describe how a transaction compares with normal behaviour for that account. Whitrow et al. (2009) showed that aggregating transactions over time can improve fraud detection because it captures behavioural changes.

For PayGuard, the following feature groups are important:

**Table 2.3: Proposed feature groups for PayGuard**

| Feature group | Examples | Reason for use |
|---|---|---|
| Amount features | Transaction amount, log amount, amount difference from average. | Fraud may involve unusual transaction values. |
| Time features | Hour of day, day of week, night transaction flag. | Fraud may happen at unusual times. |
| Velocity features | Number of transactions in last hour or last day. | Many quick transactions may suggest smurfing or account takeover. |
| Account history features | Prior average amount, account age, previous transaction count. | Helps compare current transaction with normal behaviour. |
| Device features | Device change flag, known or unknown device. | New device may suggest account compromise. |
| Location features | Location change flag, transaction city. | New location may suggest suspicious access. |
| Transaction type | Cash-in, cash-out, transfer, merchant payment, bill payment. | Some transaction types may carry different fraud risk. |

Good features help the model detect fraud more accurately. Poor features may lead to weak predictions even when the algorithm is strong. Therefore, feature engineering is a central part of the PayGuard system.

## 2.8 Class Imbalance and Evaluation Metrics

Fraud detection usually faces a class imbalance problem. Legitimate transactions are much more common than fraudulent transactions. If a dataset has 98 percent legitimate transactions and 2 percent fraud, a model can appear accurate by predicting every transaction as legitimate. However, such a model would be useless because it would miss all fraud cases.

For this reason, accuracy alone is not enough. Fraud detection systems should use metrics that focus on the minority fraud class. Important metrics are shown in Table 2.4.

**Table 2.4: Evaluation metrics for fraud detection**

| Metric | Meaning | Importance |
|---|---|---|
| Accuracy | Percentage of all correct predictions. | Can be misleading when fraud cases are rare. |
| Precision | Out of transactions flagged as fraud, how many were actually fraud. | Shows alert quality and helps reduce unnecessary investigations. |
| Recall | Out of all fraud cases, how many were detected. | Shows how much fraud the system captures. |
| F1-score | Balance between precision and recall. | Useful when both missed fraud and false alerts matter. |
| ROC-AUC | Measures ranking ability across thresholds. | Useful for comparing models before choosing an alert threshold. |

Cost-sensitive learning is also important because false negatives and false positives do not have the same cost. Missing fraud may lead to direct financial loss, while false alerts may increase investigator workload. Bahnsen et al. (2013) and Bahnsen, Aouada and Stojanovic (2017) argue that fraud detection should consider the cost of different mistakes.

## 2.9 Concept Drift in Fraud Detection

Concept drift happens when the patterns in data change over time. In fraud detection, this is common because fraudsters adapt their methods once existing controls become known. A model trained on old patterns may become less effective if new fraud methods appear.

Dal Pozzolo et al. (2015) studied credit card fraud detection under concept drift and delayed labels. Their work shows that fraud models must be monitored and updated because financial crime behaviour changes. For PayGuard, this means that the model should not be viewed as permanently complete. A future version should allow periodic retraining, analyst feedback and threshold adjustment.

## 2.10 Machine Learning Algorithms Reviewed

Several algorithms can be used for fraud detection. The algorithms below are considered relevant to PayGuard.

**Table 2.5: Reviewed machine learning algorithms**

| Algorithm | Strengths | Weaknesses | Relevance to PayGuard |
|---|---|---|---|
| Logistic Regression | Simple, fast and easier to interpret. | May fail to capture complex non-linear patterns. | Useful as a baseline model. |
| Decision Tree | Easy to understand and can model non-linear patterns. | Can overfit if not controlled. | Useful for explaining decision logic. |
| Random Forest | Handles non-linear patterns and reduces overfitting by using many trees. | Less interpretable than a single tree. | Main candidate for prototype fraud scoring. |
| Support Vector Machine | Can perform well on complex boundaries. | Can be slower and harder to tune on large datasets. | Useful for comparison but not primary. |
| Neural Network | Can learn complex patterns. | Requires more data and may be less explainable. | Future extension if more data becomes available. |
| XGBoost | Strong performance on tabular datasets and supports regularised boosted trees. | Requires careful tuning and explanation methods. | Future improvement and benchmark method. |

Chen and Guestrin (2016) introduced XGBoost as a scalable tree boosting system. XGBoost is widely used in tabular machine learning problems because it is strong, efficient and flexible. However, for the first PayGuard prototype, simpler scikit-learn models such as logistic regression and random forest are preferred because they are easier to implement, explain and evaluate in a capstone context.

## 2.11 Related Studies

The following studies were reviewed because they relate to fraud detection, mobile money simulation, transaction aggregation, class imbalance and machine learning.

**Table 2.6: Summary of related studies**

| Author(s) | Study focus | Key finding | Relevance to PayGuard |
|---|---|---|---|
| Phua et al. (2010) | Survey of data mining fraud detection. | Fraud detection can use classification, clustering and anomaly detection. | Supports the use of supervised learning and hybrid approaches. |
| Whitrow et al. (2009) | Transaction aggregation for credit card fraud detection. | Aggregated behavioural features improve detection performance. | Supports account history, velocity and amount-ratio features. |
| Bahnsen et al. (2013) | Cost-sensitive credit card fraud detection. | Different mistakes have different financial costs. | Supports use of precision, recall and cost-aware thinking. |
| Dal Pozzolo et al. (2015) | Concept drift and delayed labels in fraud detection. | Fraud models require updating because fraud patterns change. | Supports future retraining and analyst feedback. |
| Lopez-Rojas, Elmir and Axelsson (2016) | PaySim mobile money simulator. | Synthetic mobile money datasets can support research where real data is unavailable. | Supports the use of synthetic data in PayGuard. |
| Abdallah, Maarof and Zainal (2016) | Survey of fraud detection systems. | Fraud detection requires both algorithmic and system-level design. | Supports end-to-end design from data to dashboard. |
| Carcillo et al. (2018) | Streaming credit card fraud detection framework. | Real-time fraud detection requires scalable architecture. | Supports future streaming version of PayGuard. |
| Carcillo et al. (2019) | Combining supervised and unsupervised fraud detection. | Hybrid approaches can improve detection. | Supports possible future anomaly detection extension. |
| Chen and Guestrin (2016) | XGBoost scalable tree boosting. | Boosted trees perform strongly on structured data. | Supports future use of XGBoost for improved performance. |
| Lebichot et al. (2021) | Incremental learning for fraud detection. | Incremental learning can help models adapt over time. | Supports future continuous learning and model refresh. |

## 2.12 Research Gap

From the reviewed literature, several gaps can be identified. Many fraud detection studies focus on credit card fraud, while fewer focus on mobile-money-style transactions in African institutional payment environments. Also, many studies discuss algorithms without showing a full working prototype that includes data generation, model training, API scoring, alert storage and a monitoring dashboard.

**Table 2.7: Research gap and PayGuard contribution**

| Research gap | PayGuard contribution |
|---|---|
| Limited availability of real labelled institutional mobile money data. | Uses synthetic data with controlled fraud patterns. |
| Many studies focus on model accuracy only. | Includes data pipeline, model, API and dashboard workflow. |
| Rule-based systems cannot easily adapt to changing fraud behaviour. | Uses supervised learning and risk scores to detect patterns. |
| Fraud detection systems may not support human review clearly. | Provides alerts and transaction summaries for investigation. |
| Few capstone-level systems show end-to-end fraud monitoring. | Builds a complete prototype from data generation to UI monitoring. |

Therefore, PayGuard addresses the gap by developing a practical prototype for institutional digital finance fraud detection using synthetic data and machine learning.

## 2.13 Feasibility Study

A feasibility study is conducted to determine whether the proposed system can be developed and used successfully. This section discusses technical, economic, operational, legal, schedule and social feasibility.

### 2.13.1 Technical Feasibility

Technical feasibility determines whether the system can be developed using available hardware, software and skills. PayGuard is technically feasible because it uses commonly available open-source technologies such as Python, Flask, SQLite, pandas, scikit-learn, joblib, React and TypeScript.

**Table 2.8: Software requirements**

| Software | Purpose | Availability |
|---|---|---|
| Python 3 | Data generation, feature engineering, model training and backend API. | Open-source and freely available. |
| Flask | REST API development. | Open-source and lightweight. |
| SQLite | Local database storage for transactions and alerts. | Built into many Python environments. |
| pandas and NumPy | Data cleaning and feature engineering. | Open-source and widely used. |
| scikit-learn | Machine learning model training and evaluation. | Open-source and widely used. |
| joblib | Saving and loading trained model artefacts. | Open-source. |
| React and TypeScript | Frontend dashboard development. | Open-source. |
| Git and GitHub | Version control and project storage. | Freely available for student use. |

**Table 2.9: Hardware requirements**

| Hardware | Minimum requirement | Purpose |
|---|---|---|
| Laptop or desktop computer | 8GB RAM, dual-core processor, 256GB storage. | Development and testing. |
| Recommended development machine | 16GB RAM, quad-core processor, SSD storage. | Faster model training and frontend development. |
| Internet access | Stable connection when installing packages and researching. | Downloading tools, references and dependencies. |
| Backup storage | Flash drive, external drive or cloud repository. | Protecting project files and source code. |

The system can be built and tested on a normal development machine. Since PayGuard is a prototype, it does not require expensive servers or high-performance clusters. If the system is later moved to production, PostgreSQL, cloud hosting and stronger security controls may be required.

### 2.13.2 Economic Feasibility

Economic feasibility determines whether the benefits of the proposed system justify the cost of developing it. PayGuard is economically feasible because most of the tools used are open-source. The main cost is development time, internet access and hardware already available to the student or institution.

**Table 2.10: Estimated development cost**

| Item | Estimated cost | Comment |
|---|---:|---|
| Development tools | USD 0 | Python, Flask, SQLite, React and scikit-learn are open-source. |
| Hosting during development | USD 0 | Local development machine can be used. |
| Internet and research access | USD 30 | Needed for downloads, references and testing. |
| Backup storage | USD 10 | Flash drive or cloud storage. |
| Testing and documentation | USD 20 | Printing, review and optional deployment tests. |
| Total estimated cost | USD 60 | Prototype cost only. |

The project is therefore affordable because it does not require paid software licences. The institution may benefit from the system because it can reduce the time needed to identify suspicious transactions and improve monitoring of digital payments.

### 2.13.3 Operational Feasibility

Operational feasibility determines whether the system can work in the intended environment and whether users can operate it. PayGuard is operationally feasible because it is designed to provide a simple dashboard for finance officers and administrators.

The system will allow users to:

- view transaction summaries;
- submit or score transactions;
- view fraud risk levels;
- view open alerts;
- update alert status after investigation;
- observe dashboard metrics.

The system does not require users to understand machine learning details. The technical model runs in the background while the user interacts with normal dashboard pages. This makes the system more acceptable to non-technical users.

### 2.13.4 Legal and Ethical Feasibility

PayGuard handles financial-style data, therefore legal and ethical issues must be considered. Zimbabwe's Cyber and Data Protection Act [Chapter 12:07] provides a legal framework for data protection and establishes responsibilities for the processing of personal information (Zimbabwe, 2021). A production system connected to real institutional payment data would need to follow data minimisation, access control, secure storage and proper authorisation.

For this research, PayGuard uses synthetic data. This reduces privacy risk because real student names, account numbers and phone numbers are not used. However, ethical design is still important because fraud detection systems can affect people if used incorrectly. The system should therefore be treated as a decision-support tool, not as an automatic punishment system.

**Table 2.11: Legal and ethical considerations**

| Issue | Risk | Control measure |
|---|---|---|
| Personal data exposure | Real users may be identified if production data is mishandled. | Use synthetic data for research and apply data minimisation in production. |
| False accusation | A legitimate transaction may be flagged as suspicious. | Use alerts for human review, not automatic punishment. |
| Unauthorised access | Dashboard may expose sensitive financial records. | Add authentication and role-based access in production. |
| Model bias | Model may incorrectly treat some transaction patterns as suspicious. | Monitor false positives and allow investigator feedback. |
| Data retention | Old records may be stored for too long. | Define retention policy before production deployment. |

### 2.13.5 Schedule Feasibility

Schedule feasibility determines whether the project can be completed within the available time. The project is feasible if development is divided into clear stages.

**Table 2.12: Proposed work plan**

| Phase | Activity | Duration | Expected output |
|---|---|---:|---|
| Phase 1 | Research and literature review | 2 weeks | Chapter 2 and reference base. |
| Phase 2 | Requirements and system design | 2 weeks | Functional requirements, architecture and diagrams. |
| Phase 3 | Synthetic data generator | 1 week | Generated transaction dataset. |
| Phase 4 | Feature engineering and model training | 2 weeks | Trained model and evaluation metrics. |
| Phase 5 | Backend API development | 2 weeks | Flask API for transactions, scoring, alerts and metrics. |
| Phase 6 | Frontend dashboard development | 2 weeks | React dashboard for monitoring. |
| Phase 7 | Testing and documentation | 2 weeks | Tested prototype and final write-up. |

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

**Figure 2.1 description:** The Gantt chart will visually show the project activities and their timelines across the project weeks. It will show research and literature review first, followed by requirements and design, synthetic data generation, model training, backend API development, frontend dashboard development, testing, and final documentation.

### 2.13.6 Social Feasibility

Social feasibility determines whether the users and institution are likely to accept the system. PayGuard is socially feasible because it supports financial integrity and helps reduce the burden of manual fraud checking. Finance officers may benefit from faster identification of suspicious transactions, while students and guardians may benefit from safer digital payment processes.

However, users must understand that a fraud alert is not final proof of fraud. The alert only means that a transaction needs review. This helps reduce fear and improves fairness.

## 2.14 Development Methodology

The development of PayGuard follows an iterative prototype approach. This means that the system is developed in small stages, tested, improved and documented. This method is suitable because the project includes both software development and machine learning experimentation. Model training may require adjustments to features, thresholds and evaluation methods.

**Table 2.14: Development stages**

| Stage | Description |
|---|---|
| Planning | Identify the problem, objectives, scope and tools. |
| Data preparation | Generate synthetic data and prepare transaction records. |
| Model development | Train and evaluate machine learning models. |
| Backend development | Build APIs for scoring, alerts, transactions and metrics. |
| Frontend development | Build dashboard pages for users. |
| Testing | Test model outputs, API endpoints and user interface behaviour. |
| Documentation | Write dissertation chapters and user/developer notes. |

## 2.15 Chapter Conclusion

This chapter reviewed literature and feasibility issues related to PayGuard. The literature shows that mobile money fraud is a serious challenge and that machine learning can assist in detecting suspicious transactions. It also shows that synthetic data is useful where real financial data cannot be used due to privacy and legal restrictions. Studies on transaction aggregation, class imbalance, cost-sensitive learning and concept drift provide a foundation for PayGuard's design.

The feasibility study shows that PayGuard is technically, economically, operationally, legally, socially and schedule feasible as a prototype. The next chapter focuses on the requirements analysis and design of the proposed PayGuard system.

---

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

**Figure 3.1 description:** The context diagram will show the current payment monitoring environment. The main process will be labelled **Institutional Payment Verification System**. External entities will include **Student/Guardian**, **Mobile Money Platform**, **Finance Officer**, **Institutional Records System** and **Administrator**. Data flows will include payment details, payment confirmation, verification request, transaction record and payment status.

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

**Figure 3.2 description:** The proposed PayGuard system context diagram will show PayGuard as the main system. External entities will include **Finance Officer**, **Fraud Analyst**, **Administrator**, **Mobile Money Transaction Source**, **Machine Learning Model** and **Database**. The figure will show transaction input, risk scoring, alert output, dashboard viewing and alert status updates.

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

### 3.7.3 Developing PayGuard as an In-House Prototype

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

**Figure 3.3 description:** The use case diagram for PayGuard will show the following actors: **Finance Officer**, **Fraud Analyst**, **Administrator** and **Developer/Researcher**. The main use cases will include **View Dashboard**, **View Transactions**, **Score Transaction**, **View Alerts**, **Update Alert Status**, **View Account Profile**, **Train Model**, and **Generate Synthetic Data**.

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

**Figure 3.4 description:** The activity diagram for scoring a transaction will begin with **Start**, followed by **Receive Transaction**, **Validate Transaction Details**, **Retrieve Account History**, **Build Feature Set**, **Apply Machine Learning Model**, **Generate Risk Score**, **Check Risk Threshold**, **Create Alert if Suspicious**, **Save Transaction**, **Display Result on Dashboard**, and **End**. Decision points will include **Is transaction valid?** and **Is risk score high?**.

The activity flow helps explain how PayGuard processes a transaction from input to output.

## 3.11 Data Flow Diagram

A data flow diagram shows how data moves through the proposed system.

### 3.11.1 Level 0 Data Flow Diagram

**Figure 3.5 description:** The Level 0 data flow diagram for PayGuard will show PayGuard as one main process. External entities will include **Transaction Source**, **Finance Officer**, **Fraud Analyst** and **Administrator**. Data stores will include **Transaction Database**, **Alert Database** and **Model File**. Data flows will include transaction details, risk score, alert data, dashboard metrics and alert updates.

### 3.11.2 Level 1 Data Flow Diagram

**Figure 3.6 description:** The Level 1 data flow diagram for PayGuard will break PayGuard into subprocesses: **Receive Transaction**, **Validate Data**, **Engineer Features**, **Score Transaction**, **Generate Alert**, **Store Records**, and **Display Dashboard Metrics**. The diagram will show how data moves between each process and the database.

## 3.12 Entity Relationship Diagram

The entity relationship diagram shows the database structure and relationships between important records.

**Figure 3.7 description:** The ERD will show the main entities: **Transactions**, **Alerts**, **Accounts** and **ModelRuns**. A transaction belongs to one account. An alert is linked to one transaction. A model run stores information about a trained model and its evaluation metrics. The diagram will show primary keys, foreign keys and relationships.

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

**Figure 3.8 description:** The class diagram for PayGuard will show modules such as **Transaction**, **Alert**, **AccountProfile**, **FraudScorer**, **FeatureBuilder**, **ModelLoader**, **DatabaseService**, **DashboardService** and **APIController**. The diagram will show relationships such as Transaction creating Alert, FraudScorer using FeatureBuilder, and APIController communicating with DatabaseService.

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

**Figure 3.9 description:** The object diagram for a scored transaction will show one example **Transaction object** with values such as account ID, amount and location. It will also show the linked **Alert object** with risk score, status and reason. The diagram will include a **FraudScorer object** and **Model object** to show that the transaction was scored by the model.

## 3.16 Sequence Diagram

A sequence diagram shows how system parts communicate over time.

**Figure 3.10 description:** The sequence diagram for transaction scoring will show the interaction between **User**, **Dashboard**, **APIController**, **DatabaseService**, **FeatureBuilder**, **FraudScorer**, **Model**, and **AlertService**. The order will be: user submits transaction, dashboard sends request, API validates data, database retrieves history, feature builder prepares inputs, model scores transaction, alert service creates alert if needed, and dashboard displays results.

## 3.17 Communication Diagram

A communication diagram shows how system components are linked and how messages pass between them.

**Figure 3.11 description:** The communication diagram for PayGuard will show numbered messages between the dashboard, API, database, model, feature builder and alert service. It will help explain the same transaction scoring process in a network-style layout.

## 3.18 State Chart Diagram

A state chart shows how an alert changes from one state to another.

**Figure 3.12 description:** The state chart diagram for the PayGuard alert lifecycle will show the states **Created**, **Open**, **Under Review**, **Resolved**, **Closed** and **Archived**. The transitions will show how a fraud analyst can update the alert status after investigation.

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

**Figure 3.13 description:** The flowchart for the transaction scoring process will show the process from input to output, including validation, feature engineering, model prediction, threshold decision, alert creation and dashboard response.

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

**Figure 3.14 description:** The PayGuard dashboard wireframe will show the main layout of the system. It will include a sidebar menu, summary cards for total transactions and open alerts, a chart showing risk levels, a table of recent alerts and a form for testing transaction scoring.

**Figure 3.15 description:** The alerts page wireframe will show a table with columns such as alert ID, transaction ID, account, risk score, reason, status and action buttons. It will also show filters for status and risk level.

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

The chapter also defined the functional, non-functional and user requirements of PayGuard. It described the main actors, system workflows, database entities, interface requirements and security controls. Figure description placeholders were included to show where the context diagram, use case diagram, activity diagram, data flow diagrams, ERD, class diagram, object diagram, sequence diagram, communication diagram, state chart and interface wireframes will be placed later.

The next chapter will focus on the coding and implementation of the PayGuard system, including the technologies used, database setup, machine learning implementation, backend APIs and frontend dashboard.

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
