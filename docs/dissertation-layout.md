# PayGuard Dissertation Layout

This file sets the structure for the PayGuard final year project documentation. It is based on the layout used in the two reference dissertations in `ref/`, while adapting the chapter names and sections to fit PayGuard as a mobile money fraud detection system.

The goal is to keep the report academic enough for submission, but still simple enough for the student to understand, explain, and defend.

## Reference Dissertation Patterns Observed

Both reference projects follow this general structure:

- Title page
- Approval or declaration page
- Acknowledgement
- Table of contents
- List of tables
- List of figures
- Chapter 1: Introduction or project proposal
- Chapter 2: Literature review, feasibility, or background study
- Chapter 3: Methodology, requirements, and analysis
- Chapter 4: System design
- Chapter 5: Coding, testing, validation, and verification
- Chapter 6: Implementation and post-implementation planning
- Chapter 7: Summary, conclusion, recommendations, and future work
- References
- Appendices

PayGuard will follow this same academic flow, but the chapter content will be adjusted for the fraud detection domain.

## Proposed PayGuard Report Structure

## Cover Page

Suggested content:

- Institution name
- Department name
- Project title: PayGuard: A Fraud Detection and Monitoring System for Mobile Money Transactions
- Student name
- Registration number
- Supervisor name
- Programme name
- Academic year

## Approval Page

Suggested content:

- Statement that the project was submitted in partial fulfilment of the programme requirements
- Student signature and date
- Supervisor approval section
- Examiner approval section

## Declaration

Suggested content:

- Statement that the work is original
- Statement that it has not been submitted elsewhere
- Student name, signature, and date

## Dedication

Suggested content:

- A short dedication to family, guardians, friends, or anyone who supported the student

## Acknowledgement

Suggested content:

- Thanks to God, family, supervisor, lecturers, classmates, and anyone who helped during the project

## Abstract

Suggested content:

- A short summary of the project
- The problem being solved
- The method used
- The technologies used
- The final result

Keep this section around 200-300 words.

## Table of Contents

Suggested content:

- Automatically generated when the final document is moved into Word or PDF format

## List of Tables

Possible tables:

- Cost benefit analysis
- Hardware requirements
- Software requirements
- Functional requirements
- Non-functional requirements
- Data dictionary
- Testing table
- Implementation plan

## List of Figures

Possible figures:

- System architecture diagram
- Use case diagram
- Activity diagram
- Data flow diagram
- Entity relationship diagram
- Dashboard screenshot
- Alert screen screenshot
- Transaction scoring screenshot

## Chapter 1: Introduction

### 1.1 Introduction

Introduce PayGuard as a mobile money fraud detection and monitoring system.

### 1.2 Background of the Study

Explain mobile money, its importance, and why fraud detection is important in digital payments.

### 1.3 Problem Statement

Explain the challenge of detecting suspicious transactions manually and why a system is needed.

### 1.4 Aim of the Project

State the main aim: to design and develop a fraud detection and monitoring system for mobile money transactions.

### 1.5 Project Objectives

Suggested objectives:

- To generate sample mobile money transaction data.
- To identify suspicious transaction patterns.
- To build a machine learning model for fraud detection.
- To develop backend APIs for transaction scoring and alert management.
- To store transactions and alerts in a database.
- To build a dashboard for monitoring fraud activity.

### 1.6 Research Questions

Suggested questions:

- How can suspicious mobile money transaction patterns be identified?
- How can machine learning be used to support fraud detection?
- How can alerts and fraud scores be displayed clearly for monitoring?

### 1.7 Justification of the Study

Explain why this project matters to mobile money users, service providers, and digital financial safety.

### 1.8 Scope of the Study

Explain what the project includes and excludes.

### 1.9 Assumptions

Possible assumptions:

- The sample transactions represent common mobile money behaviour.
- Suspicious behaviour can be detected using transaction patterns.
- The prototype is suitable for academic demonstration.

### 1.10 Limitations

Possible limitations:

- The project uses synthetic data instead of real customer data.
- The system is a prototype and not a production banking system.
- Real fraud patterns may be more complex than the simulated examples.

### 1.11 Chapter Summary

Summarize what Chapter 1 covered.

## Chapter 2: Literature Review and Feasibility Study

### 2.1 Introduction

Introduce the purpose of reviewing existing knowledge related to fraud detection and mobile money systems.

### 2.2 Definition of Key Terms

Possible terms:

- Mobile money
- Fraud detection
- Transaction monitoring
- Machine learning
- Fraud risk score
- Alert
- Synthetic data
- Dashboard

### 2.3 Overview of Mobile Money Systems

Explain how mobile money works and why it is widely used.

### 2.4 Common Types of Mobile Money Fraud

Discuss examples such as account takeover, suspicious transfers, rapid transaction bursts, and unusual device or location changes.

### 2.5 Fraud Detection Techniques

Discuss rule-based detection, anomaly detection, and machine learning approaches.

### 2.6 Machine Learning in Fraud Detection

Explain how machine learning can learn patterns from transaction data and help identify suspicious behaviour.

### 2.7 Existing Systems or Related Studies

Discuss previous systems, academic studies, or general industry approaches to fraud detection.

### 2.8 Research Gap

Explain what gap PayGuard addresses, especially as a simple academic prototype with dashboard monitoring and live scoring.

### 2.9 Feasibility Study

Include:

- Technical feasibility
- Economic feasibility
- Operational feasibility
- Schedule feasibility
- Social feasibility

### 2.10 Cost Benefit Analysis

Include a simple table showing development resources, estimated costs, and expected benefits.

### 2.11 Chapter Summary

Summarize what Chapter 2 covered.

## Chapter 3: Methodology and Requirements Analysis

### 3.1 Introduction

Explain that this chapter describes how the project was planned, designed, and developed.

### 3.2 Research Methodology

Suggested approach:

- Practical system development
- Prototype model
- Iterative development

### 3.3 Data Gathering Methods

Possible methods:

- Literature review
- Observation of common mobile money risks
- Review of fraud detection concepts
- Synthetic data generation

### 3.4 Analysis of the Existing System

Describe manual or basic fraud monitoring and its weaknesses.

### 3.5 Proposed System

Describe PayGuard and how it improves monitoring by using automated scoring and alerts.

### 3.6 Functional Requirements

Possible requirements:

- The system should generate or load transaction data.
- The system should score transactions for fraud risk.
- The system should store alerts.
- The system should display fraud metrics.
- The system should allow live transaction scoring.

### 3.7 Non-Functional Requirements

Possible requirements:

- Usability
- Reliability
- Security
- Performance
- Maintainability

### 3.8 Hardware Requirements

List the minimum computer requirements used to run the project.

### 3.9 Software Requirements

List:

- Python
- Flask
- SQLite
- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- pandas
- scikit-learn

### 3.10 System Users

Possible users:

- Administrator
- Fraud analyst
- Supervisor or examiner during demonstration

### 3.11 Use Case Diagram

Describe the main actions users can perform.

### 3.12 Chapter Summary

Summarize what Chapter 3 covered.

## Chapter 4: System Design

### 4.1 Introduction

Explain that this chapter describes how PayGuard was designed.

### 4.2 System Architecture

Describe the frontend, backend, database, and machine learning model.

### 4.3 Data Flow Diagram

Show how a transaction moves through the system from input to scoring and alert display.

### 4.4 Entity Relationship Diagram

Show how database tables relate to each other.

### 4.5 Database Design

Include the database tables and fields.

Possible tables:

- transactions
- alerts

### 4.6 Data Dictionary

Include field names, data types, descriptions, and constraints.

### 4.7 User Interface Design

Include screenshots or wireframes of:

- Dashboard
- Alert feed
- Metrics section
- Transaction scoring form

### 4.8 Model Design

Explain the machine learning pipeline:

- data preparation
- feature engineering
- model training
- evaluation
- saved model
- live scoring

### 4.9 Security and System Controls

Discuss simple controls such as validation, database storage, and avoiding real customer data.

### 4.10 Chapter Summary

Summarize what Chapter 4 covered.

## Chapter 5: Development, Testing, and Results

### 5.1 Introduction

Explain that this chapter covers how the system was built and tested.

### 5.2 Development Tools

List the tools used and their purpose.

### 5.3 Backend Development

Explain Flask API endpoints:

- `/api/health`
- `/api/transactions`
- `/api/score`
- `/api/alerts`
- `/api/metrics`

### 5.4 Frontend Development

Explain the React dashboard and main screens.

### 5.5 Database Development

Explain SQLite and how transactions and alerts are stored.

### 5.6 Machine Learning Development

Explain the data generator, features, training, and model output.

### 5.7 Testing Strategy

Possible testing types:

- Unit testing
- API testing
- Integration testing
- User interface testing
- Model evaluation

### 5.8 Test Cases

Include a table with:

- Test ID
- Test description
- Expected result
- Actual result
- Status

### 5.9 System Results

Include:

- generated transaction dataset
- fraud detection model results
- dashboard screenshots
- sample alert output

### 5.10 Validation and Verification

Explain how the system was checked against the objectives.

### 5.11 Chapter Summary

Summarize what Chapter 5 covered.

## Chapter 6: Implementation and Maintenance

### 6.1 Introduction

Explain how the completed system can be installed and run.

### 6.2 Implementation Plan

Describe the steps:

- install dependencies
- initialize the database
- generate data
- train the model
- seed the database
- start the backend
- start the frontend

### 6.3 User Training

Explain how users can learn to use the dashboard.

### 6.4 System Deployment

Explain local running and possible cloud hosting.

### 6.5 Maintenance Plan

Discuss updating the model, checking alerts, improving fraud patterns, and backing up data.

### 6.6 Post-Implementation Review

Explain how the system performed after testing.

### 6.7 Chapter Summary

Summarize what Chapter 6 covered.

## Chapter 7: Conclusion and Recommendations

### 7.1 Introduction

Introduce the final chapter.

### 7.2 Project Summary

Summarize what PayGuard achieved.

### 7.3 Objectives Achieved

Match each objective from Chapter 1 with what was implemented.

### 7.4 Challenges Faced

Possible challenges:

- accessing real financial data
- choosing suitable fraud patterns
- connecting frontend and backend
- training a useful model

### 7.5 Recommendations

Recommend future use of real anonymized data, stronger security, and deployment improvements.

### 7.6 Future Enhancements

Possible enhancements:

- real-time alerts
- user authentication
- cloud database
- more advanced fraud models
- SMS or email notifications
- role-based dashboard access

### 7.7 Conclusion

Close the report by restating the value of PayGuard as a fraud detection prototype.

## References

Use Harvard or APA style, depending on school requirements.

Possible reference areas:

- mobile money systems
- digital financial fraud
- fraud detection
- machine learning
- data mining
- Flask documentation
- React documentation
- scikit-learn documentation

## Appendices

Possible appendices:

- Appendix A: Questionnaire or interview guide
- Appendix B: System screenshots
- Appendix C: Code snippets
- Appendix D: Test results
- Appendix E: Dataset sample
- Appendix F: Gantt chart

## Immediate Next Writing Order

Recommended order for writing:

1. Cover page and declaration pages
2. Chapter 1
3. Chapter 3 requirements
4. Chapter 4 system design diagrams
5. Chapter 5 screenshots and testing
6. Chapter 2 literature review
7. Chapter 6 implementation
8. Chapter 7 conclusion
9. Abstract
10. References and appendices

The abstract should be written near the end because it summarizes the whole report.
