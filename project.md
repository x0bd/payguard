# Mobile-Money Fraud Detection with Machine Learning

## Project Description

This project is a fraud detection system for mobile-money platforms (EcoCash-style systems) built with a simpler full-stack setup. The platform will simulate realistic transactions, detect suspicious behavior with machine learning, and display fraud alerts in a clean web dashboard.

Instead of relying only on fixed rules, the system will learn transaction behavior patterns and flag anomalies such as:

- unusually high transaction frequency
- sudden spikes in transaction amount
- suspicious device or location changes
- account behavior that deviates from normal usage

The project still covers a complete fraud detection workflow: data simulation, feature engineering, model training, API scoring, and fraud monitoring, but with fewer tools and less deployment overhead.

## Simplified Tech Stack (Vercel-Friendly)

This stack is designed to keep development and hosting simple while still producing a strong academic and practical result.

### Core Stack

- **Frontend:** Vite + React — dashboard UI for transactions, alerts, and analytics
- **Backend:** Python + Flask — API endpoints for fraud scoring and data access
- **Database:** SQLite — lightweight local database for transactions and alerts
- **Machine Learning:** scikit-learn — model training and fraud risk prediction
- **Data Processing:** Pandas + NumPy — cleaning, transformation, and feature engineering
- **Charts:** Plotly (via React) — fraud trends, model metrics, and alert visualizations

## Why This Stack Was Chosen

- It is significantly simpler to implement and maintain than a multi-service architecture.
- It keeps machine learning and backend logic in Python, which is ideal for a final-year project.
- It provides a modern web frontend without heavy frontend complexity.
- It can be deployed on Vercel with a single repository structure.
- SQLite removes database setup friction during development and demos.

## Deployment Approach (Vercel)

- **Vite frontend** is deployed as a static web app on Vercel.
- **Flask backend** is exposed through Vercel Python serverless functions.
- **SQLite** is used for lightweight persistence during development and demonstration.

Note: SQLite on serverless platforms is fine for prototypes and academic demos, but production systems usually use a managed database.

## What the System Will Build

### 1. Transaction Simulator

A Python module that generates synthetic mobile-money transactions and injects realistic fraud patterns.

### 2. Feature Engineering Pipeline

A preprocessing pipeline that builds features such as velocity, average amount, account age, and behavior drift.

### 3. Machine Learning Fraud Engine

A model training and inference module that outputs fraud probabilities or risk scores for transactions.

### 4. Flask API

A backend API that receives transaction data, applies fraud scoring, stores results, and serves dashboard data.

### 5. Vite Dashboard

A React dashboard for viewing transactions, fraud alerts, summary metrics, and model performance charts.

## Deliverables

By the end of the project, the system should include:

- a synthetic mobile-money transaction dataset
- trained fraud detection model artifacts
- a Flask API for fraud scoring and results retrieval
- a Vite/React dashboard for monitoring fraud alerts
- visual analytics for fraud patterns and model performance
- end-to-end deployment on Vercel

## Final Stack Summary

```txt
Vite + React
Python + Flask
SQLite
Pandas
NumPy
scikit-learn
Plotly
Vercel
```
