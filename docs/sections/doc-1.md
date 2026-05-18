# Chapter 1

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

## 1.3 Problem statement

Many institutions that receive mobile money payments still depend on manual checking, reconciliation, and simple rule-based controls to identify fraud. This creates several problems, especially when the number of transactions is high. Manual checking takes time, and suspicious payments may only be discovered after financial loss has already occurred.

The current situation can result in the following challenges:

- Delayed detection of suspicious mobile money transactions.
- Difficulty in identifying unusual transaction behaviour.
- High workload for finance and administration staff.
- Limited ability to prioritise risky transactions for investigation.
- Possible financial loss and reputational damage.
- Lack of an automated alert system for institutional digital payments.

The main problem addressed by this research is that institutions need an automated and reliable way to detect possible mobile money fraud, but many existing payment workflows do not include a dedicated fraud monitoring system. PayGuard seeks to solve this problem by designing and developing a fraud detection prototype that analyses transaction patterns and alerts users when a transaction appears suspicious.

## 1.4 Objectives

The objectives of this project are as follows:

- To design a mobile money fraud detection system for institutional digital finance.
- To generate synthetic mobile money transaction data for system development and testing.
- To identify transaction features that can help separate normal transactions from suspicious transactions.
- To train and evaluate supervised machine learning models for fraud detection.
- To develop a backend system that can score transactions and store alerts.
- To design a dashboard that allows users to view transactions, alerts, and fraud risk levels.
- To support finance staff by reducing the amount of manual work needed when identifying suspicious transactions.

## 1.5 Research Propositions / Hypotheses

The research hypotheses guiding this project are as follows:

1. **H0 Alternative Hypothesis:** The use of automated fraud detection with machine learning can improve the identification of suspicious mobile money transactions in institutional digital finance.

2. **H1 Null Hypothesis:** The use of automated fraud detection with machine learning does not improve the identification of suspicious mobile money transactions in institutional digital finance.

## 1.6 Justification of the Research

The research is justified because digital payments are now widely used by institutions, and fraud risks continue to increase as more transactions move online. Institutions that handle student fees and other payments require systems that can monitor transactions efficiently and reduce reliance on manual checking.

The justification of this study is based on the following points:

- **Efficiency:** Manual fraud checking is slow and can delay the confirmation of payments. An automated system can process and analyse transactions faster.

- **Fraud reduction:** The system can help identify suspicious transactions early, reducing the chances of financial loss.

- **Improved decision-making:** Risk scores and alerts can help finance staff prioritise which transactions need investigation.

- **Scalability:** As the number of digital payments increases, an automated system can handle more transactions than manual methods.

- **Institutional trust:** A stronger fraud monitoring system can improve confidence in digital payment platforms used by students, guardians, and staff.

- **Research contribution:** The project demonstrates how machine learning can be applied in a practical institutional finance environment while using synthetic data to protect privacy.

## 1.7 Delimitation

The PayGuard system will focus on detecting suspicious mobile money transactions in an institutional digital finance environment. The system will use synthetic transaction data for development and testing. It will generate and analyse transaction records, calculate risk scores, and display alerts through a dashboard.

The project will cover the following areas:

- Mobile money style transaction records.
- Synthetic data generation.
- Fraud detection using supervised machine learning.
- Transaction scoring.
- Alert creation and viewing.
- Dashboard-based monitoring.

The project will not directly connect to a live mobile money provider or a live university payment system. It will also not make final legal decisions about whether a transaction is fraudulent. The system will only provide decision-support information for users to review.

## 1.8 Assumptions

The following assumptions have been made for the development of the PayGuard system:

- The institution receives a large number of mobile money transactions that require monitoring.
- Transaction records contain useful details such as amount, time, account, transaction type, location, and device information.
- Synthetic data can be used to represent realistic transaction behaviour for prototype development.
- Machine learning models can identify useful patterns from transaction features.
- Users such as finance administrators will be able to review alerts generated by the system.
- The institution has computers and basic network infrastructure needed to run and access the system.
- Human review will still be required before taking serious action on a flagged transaction.

## 1.9 Limitations of the Study

The study has some limitations. The system is developed as a prototype and does not use live institutional payment data. This means the results may not fully represent all real-world fraud behaviour. The use of synthetic data helps protect privacy, but it may not capture every fraud pattern that happens in actual mobile money systems.

Another limitation is that the system does not include full production security features such as advanced user authentication, encryption management, and live integration with mobile money providers. These features are important for real deployment but are beyond the scope of the current project.

The project is also limited by time and resources. Only selected supervised machine learning models are implemented and evaluated. More advanced models such as XGBoost, streaming analytics, and explainability tools can be considered in future work.

## 1.10 Conclusion

This chapter introduced the PayGuard Mobile Money Fraud Detection System and explained the background of the study, the problem being addressed, the project objectives, hypotheses, justification, delimitation, assumptions, and limitations. The chapter showed that mobile money has become important in institutional payments, but it also creates fraud risks that require better monitoring.

The proposed system aims to support finance departments by detecting suspicious transactions, generating alerts, and helping users make informed decisions. The next chapter will discuss literature related to mobile money fraud, machine learning fraud detection, synthetic data, fraud detection models, and the feasibility of developing the proposed system.

## References

Bahnsen, A.C., Aouada, D., Stojanovic, A. and Ottersten, B. (2013) ‘Cost sensitive credit card fraud detection using Bayes minimum risk’, in *Proceedings of the 12th IEEE International Conference on Machine Learning and Applications (ICMLA)*. IEEE, pp. 333–338.

Dal Pozzolo, G., Boracchi, G., Caelen, O., Alippi, C. and Bontempi, G. (2015) ‘Credit card fraud detection and concept drift adaptation with delayed supervised information’, in *Proceedings of the International Joint Conference on Neural Networks (IJCNN)*. IEEE.

Whitrow, C., Hand, D.J., Juszczak, P., Weston, D. and Adams, N.M. (2009) ‘Transaction aggregation as a strategy for credit card fraud detection’, *Data Mining and Knowledge Discovery*, 18(1), pp. 30–55.
