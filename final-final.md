# CHAPTER 1

## 1.0 Introduction

PayGuard is a fraud detection and monitoring system designed for mobile money transactions. The system assists finance users by analysing transaction records, assigning risk scores, and showing suspicious transactions through a simple dashboard. It is intended to support fraud review work where many digital payments are received and manual checking becomes slow or unreliable.

The project focuses on a prototype that uses synthetic mobile money transaction data, a machine learning model, a Flask backend, a SQLite database, and a React dashboard. PayGuard does not replace human judgement. It provides decision-support information so that suspicious transactions can be reviewed more quickly and in a more organised way.

## 1.1 Background to the Study

Mobile money has become an important method of payment in many institutions because it allows users to send and receive money quickly without visiting a bank. Students, guardians, clients, and general users can make payments remotely, which improves convenience and reduces pressure on physical payment offices.

However, the growth of mobile money has also increased the risk of digital fraud. Suspicious activities may include fake payment confirmations, repeated small transactions, unusual account activity, transactions made from unexpected locations, or transactions that do not match normal user behaviour. When these payments are checked manually, finance staff may struggle to identify fraud patterns in time.

Manual fraud monitoring is also affected by workload. As transaction volumes increase, staff may only check obvious cases or rely on simple rules such as transaction amount limits. This approach can miss hidden fraud patterns because fraud does not always appear as one large transaction. Some suspicious behaviour may only become visible after analysing transaction history, frequency, timing, account behaviour, and other related features.

PayGuard is introduced to address this challenge by using automated transaction analysis and machine learning risk scoring. The system helps users view transactions, detect possible fraud, create alerts, and monitor account summaries from one dashboard. This makes fraud review faster, clearer, and easier to manage.

## 1.2 Statement of the Problem

Many institutions that receive mobile money payments still depend on manual checking, reconciliation, and simple rule-based methods to identify suspicious transactions. This creates delays and makes it difficult to detect fraud patterns early, especially when many transactions are processed within a short period.

The current system has the following problems:

- Suspicious transactions are difficult to identify manually.
- Review is slow when transaction volumes increase.
- Fraud patterns may be missed because they are not always obvious.
- Transaction histories are not analysed automatically.
- Reporting and dashboards are limited.
- There is no automated risk scoring support for finance users.

The main problem addressed by this study is the lack of an automated system that can analyse mobile money transactions, score their risk level, and present suspicious cases for review. PayGuard seeks to solve this problem by providing a prototype fraud monitoring system that supports faster and more informed decision-making.

## 1.3 Objectives of the Study

The objectives of this study are:

1. To design and implement a PayGuard fraud detection system for mobile money transactions.
2. To improve fraud detection accuracy and speed using machine learning risk scoring.
3. To provide a dashboard for viewing transactions, alerts, risk levels, and account summaries.

## 1.5 Justification of the Research

This research is important because mobile money payments are now widely used, while fraud risks continue to increase. Institutions that handle digital payments need better ways to monitor transactions and identify suspicious behaviour before financial loss occurs.

The project is useful to finance users because it reduces the amount of manual checking required during fraud review. Instead of searching through many transaction records one by one, users can focus on transactions that have been given higher risk scores by the system.

The project is also useful to administrators because it provides a central dashboard for viewing transactions, alerts, risk levels, and account summaries. This improves reporting and helps management understand fraud monitoring activity more clearly.

For institutions, PayGuard can support better internal control by providing early warnings of suspicious activity. Although the prototype uses synthetic data, the design demonstrates how a real institution could build a more organised fraud monitoring process in future.

For researchers and students, the project shows how machine learning, database systems, backend services, and dashboards can be combined to solve a practical digital finance problem.

## 1.6 Assumptions of the Study

The study is based on the following assumptions:

- Users will provide valid transaction data.
- Synthetic data can represent common mobile money fraud patterns.
- Basic computer infrastructure is available to run the prototype.
- Users can be trained to use the dashboard.
- Human review will still be used before final action is taken on a flagged transaction.

## 1.4 Hypotheses

H0: A machine-learning-based fraud detection system does not improve fraud monitoring for mobile money transactions.

H1: A machine-learning-based fraud detection system improves fraud monitoring for mobile money transactions.

## 1.7 Delimitations of the Study

The study is limited to the design and development of PayGuard as a prototype fraud detection system for mobile money transactions. It uses synthetic transaction data for development, testing, and demonstration. The system focuses on transaction scoring, alert creation, dashboard monitoring, transaction viewing, and account summary review.

The study does not connect directly to a live mobile money provider, bank, or production payment platform. It also does not make final legal decisions about whether a person has committed fraud. The system only identifies suspicious transactions and presents them for human review.

## 1.8 Limitations of the Study

The main limitation of the study is the use of synthetic data instead of real banking or mobile money provider data. Synthetic data is useful for privacy and safe development, but it may not capture all fraud behaviours found in real financial environments.

The project was also limited by time. Because of this, the system was developed as an academic prototype and not as a full production system. Some advanced features such as real provider integration, production authentication, role-based access control, audit logging, and live deployment were left for future improvement.

Another limitation is that the machine learning model can only learn from the data patterns provided during training. If future fraud patterns are very different from the synthetic training data, the model may need retraining and improvement.

## 1.9 Definition of Terms

**PayGuard:** A prototype fraud detection and monitoring system for mobile money transactions.

**Fraud detection:** The process of identifying transactions or activities that may be dishonest, suspicious, or unauthorised.

**Mobile money:** A digital payment service that allows users to send, receive, and store money using a mobile device.

**Machine learning:** A method of training a computer system to identify patterns from data and use those patterns to make predictions.

**Risk score:** A value produced by the system to show how likely a transaction is to be suspicious.

**Alert:** A warning generated by the system when a transaction appears to require review.

**Synthetic data:** Artificially generated data used for development and testing instead of real customer or banking data.

**Dashboard:** A visual interface that displays important system information such as transactions, alerts, risk levels, and account summaries.
