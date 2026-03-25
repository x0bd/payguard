# PayGuard Project Outline

This outline explains the project in simple language so it can be used for a final year project description, presentation, or report.

## Project Title

**PayGuard: A Mobile Money Fraud Detection System**

## 1. Simple Project Description

PayGuard is a system designed to help detect suspicious or fraudulent activity in mobile money platforms such as EcoCash-style systems.

The main idea is simple:

- people use mobile money every day to send, receive, and withdraw money
- sometimes fraudsters also use these platforms in harmful ways
- this project tries to identify suspicious transactions early

Instead of depending only on fixed rules, PayGuard uses machine learning to study transaction patterns and decide whether a transaction looks normal or suspicious.

The system also shows the results on a dashboard so that alerts can be seen clearly and quickly.

## 2. Problem Statement

Mobile money systems are very useful, but they can also be abused by fraudsters.

Some suspicious behaviors include:

- sending money too many times in a short period
- suddenly making unusually large transactions
- using a new device unexpectedly
- sending money from an unusual location

Traditional rule-based systems can miss some of these changing behaviors.

This project solves that problem by building a smarter system that can learn patterns from data and help identify risky activity.

## 3. Aim of the Project

The aim of this project is to build a fraud detection system that can:

- simulate realistic mobile money transactions
- identify suspicious transaction behavior
- calculate a fraud risk score
- display alerts in a simple web dashboard

## 4. Main Objectives

- Create synthetic mobile money transaction data for testing the system
- Prepare the data so it can be used for machine learning
- Train models that can predict whether a transaction may be fraudulent
- Build a backend API that scores transactions
- Build a frontend dashboard that shows alerts, risk levels, and system statistics

## 5. How the System Works

The project works in a simple flow:

### Step 1: Transaction Data Is Created

Because real financial data is private, the project generates **synthetic data**.

Synthetic data means:

- fake data
- but designed to look realistic
- and useful for testing and training the system

This data includes both:

- normal transactions
- suspicious transactions

### Step 2: The System Learns Patterns

The transaction data is used to train machine learning models.

These models learn the difference between:

- normal user behavior
- unusual or risky behavior

### Step 3: New Transactions Are Scored

When a new transaction is given to the system, PayGuard checks it and produces:

- a fraud risk score
- a prediction of whether it looks suspicious
- helpful details showing why it may have been flagged

### Step 4: Results Are Shown on the Dashboard

The dashboard displays:

- total transactions
- fraud alerts
- recent suspicious activity
- simple charts and trends

This makes the system easier to understand, not just for developers, but also for project supervisors and non-technical users.

## 6. Main Features of PayGuard

### Transaction Simulation

The project can generate realistic mobile money transactions for many users over time.

### Fraud Pattern Injection

The system can intentionally add suspicious behaviors such as:

- amount spikes
- rapid transaction bursts
- device changes
- location changes

This helps create a useful dataset for training and testing.

### Machine Learning Fraud Detection

The project trains models that look for behavior patterns and decide whether a transaction is risky.

### Risk Scoring API

The backend receives transaction details and returns:

- a fraud score
- a risk level
- an alert when necessary

### Monitoring Dashboard

The frontend dashboard helps users see what is happening in the system in real time.

## 7. Technologies Used

The project uses a simplified stack:

- **React + Vite** for the frontend dashboard
- **Flask (Python)** for the backend API
- **SQLite** for storing transactions and alerts
- **Pandas and NumPy** for data processing
- **scikit-learn** for machine learning
- **shadcn/ui** for the frontend interface components

## 8. What Makes the Project Strong

This project is strong because it is not just theory.

It combines multiple important parts into one full system:

- data generation
- data processing
- machine learning
- backend development
- frontend dashboard design

So it shows both:

- academic understanding
- practical software development skills

## 9. Why This Project Matters

Fraud detection is important because mobile money platforms are widely used by many people every day.

A system like PayGuard can help:

- reduce financial losses
- detect suspicious activity earlier
- improve trust in digital payment systems

Even though this project is a student prototype, it shows how machine learning can support safer financial systems.

## 10. Limitations

Like any student project, this system has some limits:

- it uses synthetic data instead of real banking data
- it is a prototype, not a full commercial product
- fraud patterns in real life may be more complex
- SQLite is good for development, but bigger real systems would need stronger databases

These limits are normal for a final year project and do not reduce the value of the work.

## 11. Possible Future Improvements

- use real-world anonymized data if available
- improve model explainability
- add user authentication for the dashboard
- deploy the full system online
- support more fraud scenarios and stronger analytics

## 12. Short Conclusion

PayGuard is a fraud detection project for mobile money systems.

It was built to show how machine learning can be used to detect suspicious transactions, score risk, and present fraud alerts in a simple dashboard.

In summary, the project demonstrates a complete flow from data creation to prediction to visual monitoring.

## 13. Very Short Oral Summary

If a short spoken explanation is needed, this can be used:

> PayGuard is a mobile money fraud detection system. It generates realistic transaction data, trains a machine learning model to detect suspicious behavior, and shows the results on a dashboard. The goal of the project is to demonstrate how technology can help identify fraudulent transactions early and improve the safety of digital payment systems.
