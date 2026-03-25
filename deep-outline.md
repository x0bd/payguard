# PayGuard Deep Project Outline

## Project Title
**PayGuard: A Fraud Detection and Monitoring System for Mobile Money Transactions**

## 1. Introduction
PayGuard is a final year project designed to show how technology can help reduce fraud in mobile money systems. In many countries, people use mobile money to send and receive funds, pay bills, buy airtime, and perform other daily financial activities. Because mobile money is fast and convenient, it is also attractive to fraudsters who try to take advantage of weak security, stolen accounts, unusual transaction patterns, or fake activities.

This project was built to demonstrate a simple but meaningful solution to that problem. PayGuard watches transactions, looks for suspicious behavior, calculates a fraud risk score, and shows the results on a dashboard where the activity can be monitored clearly.

The project is not meant to replace a full banking or telecom fraud system. Instead, it is a prototype that helps explain how fraud detection can work in practice using data, rules, and machine learning.

## 2. Background of the Study
Mobile money has become very important because it allows people to manage money quickly without needing a traditional bank branch. It is especially useful for transfers, merchant payments, and day-to-day financial access. However, as the use of mobile money grows, the number of fraudulent activities may also grow.

Fraud in digital payment systems can happen in different ways. A fraudster may suddenly make very large transactions from an account that usually makes small payments. They may use a new device or a different location. They may also perform many transactions within a short period of time. These unusual behaviors can be signs that something is wrong.

In many cases, manual monitoring is slow and difficult because there may be too many transactions to check one by one. This creates a need for a system that can automatically identify suspicious transactions and help people respond more quickly.

## 3. Problem Statement
Mobile money systems can experience fraudulent transactions, but it is not always easy to detect them early. When monitoring is done manually, suspicious behavior may be missed, especially when many transactions are happening at the same time. This can lead to financial loss, poor trust in digital systems, and delayed responses.

The problem this project addresses is how to build a simple system that can:

- collect or simulate transaction data,
- identify suspicious transaction patterns,
- assign a fraud risk score,
- store alerts, and
- display results in an easy-to-understand dashboard.

## 4. Aim of the Project
The main aim of PayGuard is to design and build a fraud detection and monitoring system for mobile money transactions that can identify suspicious activity and present the results in a simple dashboard.

## 5. Objectives of the Project
The project objectives are:

- To create a dataset of mobile money transactions for testing and learning purposes.
- To design a system that can recognize suspicious transaction behavior.
- To build a fraud scoring model that predicts whether a transaction is likely to be risky.
- To store transactions and alerts in a database.
- To develop a dashboard that displays important fraud monitoring information.
- To provide a practical example of how machine learning can support fraud detection.

## 6. Justification of the Project
This project is important because fraud detection is a major issue in digital payments. If suspicious activity is not noticed early, users and service providers may lose money and trust. A system like PayGuard helps show how fraud can be monitored in a smarter and faster way.

This project is also valuable academically because it combines several useful ideas in one solution:

- data generation,
- backend system development,
- database storage,
- machine learning,
- and a visual dashboard for monitoring.

It is therefore a good final year project because it solves a real-world problem while also showing practical technical skills.

## 7. Scope of the Project
PayGuard focuses on a simplified fraud detection system for mobile money transactions. The project includes:

- generating sample transaction data,
- storing transaction records,
- detecting suspicious behavior,
- scoring transactions for fraud risk,
- and showing alerts and summary metrics on a dashboard.

The project does not include:

- connection to a real telecom or bank network,
- real customer personal data,
- real-time production deployment at national scale,
- or full enterprise security operations.

This means the project is a prototype for learning and demonstration, not a complete commercial fraud platform.

## 8. Overview of the Proposed Solution
The solution created in PayGuard works in a simple flow:

1. Transaction data is created or collected.
2. The system studies the transaction details and behavior.
3. A machine learning model checks whether the transaction looks normal or suspicious.
4. The system gives the transaction a fraud risk score.
5. If the transaction looks risky, an alert is stored.
6. The dashboard displays the latest alerts, metrics, and trends.

This approach helps reduce the burden of checking every transaction manually.

## 9. How the System Works in Simple Terms
To make the project easy to understand, PayGuard can be explained as a smart watcher for transactions.

When a transaction enters the system, PayGuard asks simple questions such as:

- Is the amount much higher than usual?
- Did the account suddenly change device or location?
- Are many transactions happening too quickly?
- Does the account behavior look different from its normal pattern?

If the answers suggest unusual behavior, the system increases the fraud risk score. A higher score means the transaction is more suspicious.

The result is then shown on the dashboard so that a person monitoring the system can quickly see what needs attention.

## 10. Fraud Patterns Considered in the Project
PayGuard was designed to detect examples of suspicious behavior such as:

### 10.1 Amount Spike
This is when a transaction amount is much larger than what the account normally sends. For example, if a user normally sends small amounts and suddenly sends a very large amount, that transaction may be suspicious.

### 10.2 Device or Location Change
This happens when an account that normally uses one device or one area suddenly begins transacting from a different device or different location. This could mean the genuine user is not the one using the account.

### 10.3 Rapid Burst of Transactions
This refers to many transactions happening within a short time. Fraudsters may do this to quickly move money before the account is blocked.

These patterns do not always mean fraud, but they are useful warning signs.

## 11. Methodology Used
The project followed a practical system development approach. The main steps were:

### 11.1 Planning
The problem was defined, the project goals were identified, and the tools to be used were selected.

### 11.2 System Design
The system structure was planned so that it would have:

- a frontend dashboard,
- a backend application,
- a database,
- and a fraud scoring model.

### 11.3 Data Preparation
Because real financial data is sensitive and difficult to access, synthetic transaction data was created. This made it possible to test the system safely without using real customer information.

### 11.4 Model Development
Behavioral features were created from the transaction data, and a machine learning model was trained to classify transactions as either normal or suspicious.

### 11.5 System Integration
The fraud model was connected to the backend so that transactions could be scored through an API, stored in the database, and displayed on the dashboard.

### 11.6 Testing
The full system was tested from end to end to make sure data generation, model training, scoring, alerts, and dashboard display all worked together.

## 12. Technologies Used
Although the project uses technical tools, their roles can be explained simply:

- **React with TypeScript** was used to build the user interface that appears in the browser.
- **Vite** was used to run and build the frontend quickly.
- **shadcn/ui** was used to create clean and modern interface components.
- **Flask** was used to build the backend application that handles requests and fraud scoring.
- **SQLite** was used as the database to store transactions and alerts.
- **Pandas** was used to organize and process data.
- **scikit-learn** was used to build and train the fraud detection model.

## 13. What Was Built in the Project
The final system includes the following parts:

### 13.1 Transaction Data Generator
A data generator was created to simulate mobile money transactions. It produces normal behavior as well as suspicious behavior so the system can learn what fraud may look like.

### 13.2 Fraud Detection Model
A machine learning model was trained to identify risky transactions based on patterns in the data.

### 13.3 Backend API
The backend can:

- check system health,
- receive transaction details,
- score a transaction,
- return fraud alerts,
- and provide dashboard metrics.

### 13.4 Database
The system stores information in SQLite so that alerts and transaction records can be saved and reviewed.

### 13.5 Monitoring Dashboard
The dashboard shows:

- total transactions,
- fraud rate,
- alerts,
- trends,
- and a form where sample transactions can be scored live.

This makes the project easier to demonstrate during presentations.

## 14. Results of the Project
The project successfully produced a working prototype of a fraud detection platform. It was able to:

- generate a large sample dataset,
- train a fraud detection model,
- score transactions through the backend,
- save alerts in the database,
- and display monitoring information on the frontend dashboard.

The machine learning model achieved strong performance on the synthetic dataset, which shows that the system can successfully learn suspicious patterns from the prepared data.

Even though the data is not from a real mobile money company, the project still demonstrates the full idea clearly and effectively.

## 15. Strengths of the Project
PayGuard has a number of strengths:

- It solves a real and relevant problem.
- It combines data, software development, and machine learning in one project.
- It is easy to demonstrate because it has both backend logic and a visual dashboard.
- It uses safe synthetic data instead of real customer information.
- It can be extended in the future into a more advanced solution.

## 16. Limitations of the Project
No project is perfect, and this one also has some limitations:

- The data is synthetic, so it may not fully capture all real-world fraud behavior.
- The project uses a simple local database and is not yet designed for large production traffic.
- It is a prototype, not a live fraud monitoring system used by a real mobile money provider.
- Some fraud behaviors in the real world are more complex than the patterns included here.

These limitations are normal for an academic prototype and do not reduce the value of the work.

## 17. Possible Future Improvements
If the project is continued in the future, it could be improved in the following ways:

- Use real anonymized transaction data if permission is available.
- Add more fraud patterns and stronger machine learning models.
- Connect the system to a cloud database for larger-scale storage.
- Add user authentication and role-based access.
- Build real-time notification systems for suspicious activity.
- Deploy the full project online for easier access and testing.

## 18. Ethical Considerations
Fraud detection systems should be used carefully because not every unusual transaction is fraudulent. Some legitimate users may behave differently from their normal patterns for honest reasons. Because of this, a fraud score should be treated as a warning, not automatic proof of wrongdoing.

This project also avoids using real customer data, which helps protect privacy and makes the system safer for academic use.

## 19. Conclusion
PayGuard is a practical and meaningful final year project that demonstrates how a fraud detection system for mobile money can be designed and implemented. The system shows how transactions can be generated, analyzed, scored, stored, and displayed in a dashboard for monitoring.

In simple terms, the project proves that suspicious financial behavior can be identified using data and machine learning, even within a small prototype system. It is a good example of applying technology to solve a real-life problem in the financial sector.

## 20. Short Summary for a Written Report
PayGuard is a fraud detection and monitoring system created for mobile money transactions. The project was developed to address the challenge of detecting suspicious financial activity quickly and efficiently. It uses synthetic transaction data, machine learning, a backend scoring system, a database, and a monitoring dashboard to identify risky transaction behavior and present alerts clearly. The project demonstrates a practical, easy-to-understand prototype for improving fraud awareness in digital financial systems.

## 21. Short Oral Explanation for Presentation
“My project is called PayGuard. It is a mobile money fraud detection and monitoring system. I built it to show how suspicious transactions can be identified using transaction patterns and machine learning. The system generates sample transaction data, checks for unusual behavior such as large amounts, sudden device changes, or many transactions in a short time, and then gives a fraud risk score. If a transaction looks suspicious, the system stores an alert and shows it on a dashboard. The project is a prototype, but it demonstrates how fraud detection can support safer digital payments.”

## 22. Simple Viva Questions and Answers
### What is PayGuard?
PayGuard is a system that helps detect suspicious mobile money transactions and shows them on a dashboard.

### Why did you choose this project?
I chose this project because fraud in digital payments is a real problem, and I wanted to build a practical system that can help identify suspicious activity.

### What problem does the project solve?
It helps reduce the difficulty of manually monitoring many transactions by automatically highlighting risky ones.

### Why did you use synthetic data?
I used synthetic data because real financial data is sensitive and difficult to access. Synthetic data allowed me to test the system safely.

### What does the machine learning model do?
The model looks at transaction behavior and predicts whether a transaction is likely to be normal or suspicious.

### What is the main benefit of this project?
The main benefit is that it provides a simple way to monitor transactions and quickly identify risky activity.

### What is one limitation of the project?
One limitation is that the project uses synthetic data, so it is a prototype and not a full real-world banking system.
