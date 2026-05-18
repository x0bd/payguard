# Chapter 2: Literature Review and Feasibility Study

## 2.1 Introduction

This chapter reviews literature related to mobile money fraud detection and also studies the feasibility of developing the proposed PayGuard system. The chapter first explains the main terms used in the research, then discusses mobile money, institutional digital finance, common fraud methods, machine learning approaches, synthetic data, evaluation methods and related studies. The chapter also includes the feasibility study, covering technical, economic, operational, legal, schedule and social feasibility.

The purpose of this chapter is to show that the proposed system is based on existing research and that it can be developed using available tools and resources. Fraud detection is an important area because many organisations now depend on digital payments, mobile wallets and online transaction systems. As transactions increase, criminals also develop new ways of committing fraud. This makes it necessary to develop intelligent systems that can detect suspicious transactions quickly and assist finance officers in making decisions (Phua et al., 2010; Abdallah, Maarof and Zainal, 2016).

PayGuard is proposed as a prototype system for detecting suspicious mobile-money-style transactions in an institutional finance environment. The system will not replace human officers, but will assist them by giving risk scores, alerts and transaction summaries. This approach agrees with fraud detection literature, which shows that automated systems are most useful when they support human investigation rather than making final decisions alone (Dal Pozzolo et al., 2015).

## 2.2 Definition of Terms

The following terms are important in understanding the study.

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

### 2.5.1 Manual and rule-based detection

Traditional fraud detection uses manual checking and fixed rules. Examples include blocking transactions above a certain amount, limiting the number of transactions per day, or flagging transactions from blocked accounts. These methods are easy to understand and can enforce policy requirements.

However, rule-based systems have weaknesses. They are not flexible when fraud patterns change. Fraudsters can also study the rules and avoid them. For example, if the system checks only large payments, a fraudster may divide the amount into smaller payments. Rule-based systems may also create many false alerts if the rules are too strict (Phua et al., 2010).

### 2.5.2 Supervised machine learning

Supervised learning uses historical labelled data to train a model. In fraud detection, each transaction may be labelled as fraudulent or legitimate. The model then learns patterns that separate the two classes. Common supervised algorithms include logistic regression, decision trees, random forests, support vector machines, neural networks and gradient boosting methods (Abdallah, Maarof and Zainal, 2016).

Supervised learning is suitable for PayGuard because the proposed system uses labelled synthetic data. The labels allow the model to learn how fraudulent transactions differ from normal ones. The trained model can then be used to score new transactions.

### 2.5.3 Unsupervised and anomaly detection

Unsupervised methods do not require labelled fraud examples. They try to find unusual behaviour or outliers. This is useful where fraud labels are not available or where new fraud methods appear. Examples include clustering and anomaly detection. However, unsupervised methods can be difficult to evaluate because they do not always explain whether an unusual transaction is truly fraudulent (Phua et al., 2010).

### 2.5.4 Hybrid fraud detection

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

The following table summarises the research gap.

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

[Figure 2.1: Gantt chart will be inserted here. The figure will visually show the project phases and their timelines.]

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

The feasibility study shows that PayGuard is technically, economically, operationally, legally, socially and schedule feasible as a prototype. The next chapter will focus on the requirements analysis and design of the proposed PayGuard system.

## References

Abdallah, A., Maarof, M.A. and Zainal, A. (2016) 'Fraud detection system: a survey', *Journal of Network and Computer Applications*, 68, pp. 90-113.

Bahnsen, A.C., Aouada, D., Stojanovic, A. and Ottersten, B. (2013) 'Cost sensitive credit card fraud detection using Bayes minimum risk', in *Proceedings of the 12th IEEE International Conference on Machine Learning and Applications*. IEEE, pp. 333-338.

Bahnsen, A.C., Aouada, D. and Stojanovic, A. (2017) 'Example-dependent cost-sensitive decision trees', *Expert Systems with Applications*, 69, pp. 105-117.

Carcillo, F., Dal Pozzolo, G., Le Borgne, Y.-A., Caelen, O., Mazzer, Y. and Bontempi, G. (2018) 'SCARFF: a scalable framework for streaming credit card fraud detection with Spark', *Information Fusion*, 41, pp. 182-194.

Carcillo, F., Le Borgne, Y.-A., Caelen, O., Kessaci, Y., Oblié, F. and Bontempi, G. (2019) 'Combining unsupervised and supervised learning in credit card fraud detection', *Information Sciences*, 557, pp. 317-331.

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
