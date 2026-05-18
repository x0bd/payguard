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

# References

Abdallah, A., Maarof, M.A. and Zainal, A. (2016) 'Fraud detection system: a survey', *Journal of Network and Computer Applications*, 68, pp. 90-113.

Dal Pozzolo, G., Boracchi, G., Caelen, O., Alippi, C. and Bontempi, G. (2015) 'Credit card fraud detection and concept drift adaptation with delayed supervised information', in *Proceedings of the International Joint Conference on Neural Networks*. IEEE.

Lopez-Rojas, E.A., Elmir, A. and Axelsson, S. (2016) 'PaySim: a financial mobile money simulator for fraud detection', in *Proceedings of the 28th European Modeling and Simulation Symposium*. Larnaca, Cyprus.

Phua, C., Lee, V., Smith, K. and Gayler, R. (2010) 'A comprehensive survey of data mining-based fraud detection research', *arXiv preprint*, arXiv:1009.6119.

Whitrow, C., Hand, D.J., Juszczak, P., Weston, D. and Adams, N.M. (2009) 'Transaction aggregation as a strategy for credit card fraud detection', *Data Mining and Knowledge Discovery*, 18(1), pp. 30-55.
