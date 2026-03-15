# Mobile-Money Fraud Detection with Machine Learning

## Project Description

This project is a software-based fraud detection system designed for mobile-money platforms such as EcoCash-style payment systems. The goal is to simulate realistic mobile-money transactions, identify suspicious behaviour using machine learning, and present the results through a simple monitoring dashboard.

Instead of relying only on fixed rules, the system will learn behavioural patterns from transaction data and flag anomalies such as unusual transaction frequency, sudden changes in spending behaviour, abnormal transaction amounts, or activity from unfamiliar devices and locations.

The project focuses on building a complete fraud detection workflow: generating transaction data, preparing features, training machine learning models, scoring new transactions, and visualising fraud alerts in a way that is easy to understand. This makes it both a strong academic research project and a practical software product prototype.

The final system will demonstrate how machine learning can be used to improve fraud detection in mobile-money environments, especially in contexts where digital payments are widely used and fraudulent behaviour can evolve over time.

## Best Simple Tech Stack

This is the best simple stack for the project because it is practical, easy to build within a final-year timeline, and still strong enough to show real software engineering and machine learning skills.

### Core Stack

- **Python** — main programming language for the entire project
- **Pandas** — data cleaning, transformation, and feature engineering
- **NumPy** — numerical operations
- **scikit-learn** — machine learning models such as Logistic Regression, Random Forest, and Isolation Forest
- **FastAPI** — backend API for scoring transactions and serving fraud results
- **PostgreSQL** — database for storing transactions, alerts, and account records
- **Streamlit** — simple dashboard for viewing fraud alerts and analytics
- **Plotly** — charts and visual analytics
- **SHAP** — explainability for showing why a transaction was flagged

## Why This Stack Was Chosen

This stack is the best balance between simplicity and quality.

- It keeps the whole project mostly in **Python**, which reduces complexity.
- It is strong for **machine learning research** and experimentation.
- It allows the project to include a **real backend service**.
- It makes it easy to build a **dashboard** without spending too much time on frontend engineering.
- It is realistic for a final-year dissertation and still looks modern and professional.

## What the System Will Build

The project will include the following main parts:

### 1. Transaction Simulator
A Python-based system for generating realistic mobile-money transactions and injecting fraudulent patterns.

### 2. Feature Engineering Pipeline
A data-processing layer that extracts useful features such as transaction frequency, average transaction amount, account age, and device changes.

### 3. Machine Learning Fraud Engine
A fraud detection module that trains models and assigns a fraud risk score to each transaction.

### 4. Backend API
A FastAPI service that receives transactions, runs fraud checks, and returns fraud predictions.

### 5. Monitoring Dashboard
A Streamlit dashboard that displays transactions, fraud alerts, analytics, and model explanations.

## Deliverables

By the end of the project, the system should include:

- a synthetic mobile-money transaction dataset
- trained fraud detection models
- a backend API for fraud scoring
- a dashboard for monitoring alerts
- charts showing fraud patterns and model performance
- explainability outputs showing why transactions were flagged

## Final Stack Summary

```txt
Python
Pandas
NumPy
scikit-learn
FastAPI
PostgreSQL
Streamlit
Plotly
SHAP
```
