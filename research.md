# PayGuard: Mobile money fraud detection for institutional digital finance

**Dissertation draft — Chapters 1–4**  
*Harvard (author–date) referencing*

---

## Chapter 1 — Introduction

### 1.1 Background of the study

Zimbabwe’s financial landscape has changed markedly over the last two decades. Repeated liquidity stress and the expansion of telecommunications infrastructure have jointly pushed **mobile money** to the centre of everyday economic life. Regulatory and industry reporting around 2020 commonly cited active mobile-money subscriptions in Zimbabwe on the order of **7.6 million**, with **EcoCash** (Econet Wireless) as the dominant platform, supporting urban–rural remittances and small-value payments (confirm primary statistic against **POTRAZ** and **Reserve Bank of Zimbabwe** bulletins for your final bibliography). In higher-education settings, the same digital rails increasingly underpin **tuition and fee collection**, where web portals integrate banking, mobile wallets, and institutional enterprise systems.

At the **University of Zimbabwe**, the **Emhare** administrative ecosystem exemplifies this convergence: students and guardians pay through channels that include mobile money, while finance offices must reconcile high transaction volumes against fraud and operational risk. Digitalisation improves access but enlarges the attack surface. Fraud typologies relevant to mobile-centric economies include **social engineering**, **SIM swap and account takeover**, **smurfing** (structuring transfers to evade monitoring thresholds), and **synthetic identity** behaviour—all of which exploit latency between victim awareness and institutional response (Makori, 2019; OECD, 2017).

Historically, many institutions relied on **static, rule-based** controls (velocity caps, blocklists, manual reconciliation). Such systems remain necessary for policy enforcement but adapt slowly when adversaries change tactics—a phenomenon formalised in the machine-learning literature as **concept drift** (Dal Pozzolo *et al.*, 2015). National policy frames for Zimbabwean universities, including **Education 5.0** (innovation- and industrialisation-oriented scholarship), create an explicit expectation that computer-science and engineering research produce **deployable artefacts**, not only theoretical analysis (Government of Zimbabwe, 2018; University of Zimbabwe, 2020).

Within this policy and operational context, **supervised and cost-aware machine learning** offers a complementary layer: models can learn non-linear interactions between transaction attributes and historical behaviour, while still remaining auditable when paired with transparent features and investigator workflows (Whitrow *et al.*, 2009; Bahnsen *et al.*, 2013, 2017; Carcillo *et al.*, 2019; Lebichot *et al.*, 2021). The present study situates a **research prototype—PayGuard**—inside that gap: a full-stack pipeline from **privacy-preserving synthetic data** through **feature engineering**, **classifier training**, **RESTful scoring**, and a **React monitoring dashboard**, aligned with the Emhare use case at the level of *architectural intent* while respecting data-protection constraints.

### 1.2 Problem statement

Despite the centrality of mobile money to Emhare-mediated fee collection, **there is no publicly documented, dedicated automated fraud-monitoring layer** tightly coupled to those transactions. In practice, verification often remains **reactive**: manual reviews, delayed reconciliation, and coarse rules that struggle to prioritise alerts under class imbalance (legitimate transactions vastly outnumber fraud). Consequences include **direct financial loss**, **investigation backlog**, **reputational harm**, and **erosion of trust** in digital campus payments.

The core research problem can therefore be stated as follows:

> **How can a university-centred mobile-money fraud-monitoring capability be designed, implemented, and evaluated using privacy-preserving synthetic data and supervised learning, such that risk scores and alerts are reproducible, explainable at the feature level, and suitable for integration with institutional payment workflows?**

This question is deliberately scoped to a **prototype** (design-science artefact) rather than a certified production switch integration; nonetheless, the outcome must be **methodologically rigorous** and **technically complete** enough to inform a future Emhare middleware deployment.

### 1.3 Research questions

To operationalise the problem statement, the dissertation addresses the following questions:

| ID | Research question |
|----|-------------------|
| RQ1 | Which **behavioural and contextual features** (velocity, amount deviation, device and location change, temporal patterns) best separate synthetic fraudulent from legitimate mobile-money-style transactions in a reproducible pipeline? |
| RQ2 | How do **standard supervised classifiers** (e.g. regularised logistic regression and random forests with imbalance-aware training) perform under **precision–recall–F1 and ROC-AUC** metrics compared to baseline rules? |
| RQ3 | What **software architecture** (data store, model artefact, API, dashboard) minimally satisfies functional monitoring requirements for analysts while remaining feasible on commodity hardware? |
| RQ4 | What **legal, ethical, and operational constraints** in Zimbabwe shape data minimisation, breach reporting, and future deployment of such a system? |

### 1.4 Aim of the study

The aim is to **design, implement, and evaluate PayGuard**, an intelligent **mobile-money fraud detection prototype** that:

1. generates **realistic synthetic transactions** with controlled fraud injectors;  
2. engineers **account-level temporal features** consistent with established fraud-detection practice;  
3. trains and selects **supervised classifiers** using transparent metrics;  
4. exposes **HTTP APIs** for scoring and alert persistence; and  
5. presents **operational dashboards** for monitoring.

**XGBoost** (Chen and Guestrin, 2016) is a leading choice for high-performance learning on **tabular** payment data and is discussed in depth in Chapter 2. The **PayGuard system** developed in this dissertation employs **scikit-learn** pipelines with **logistic regression** and **random forest** classifiers, **class weighting**, and **stratified hold-out evaluation**—a combination that remains well aligned with the literature on **tabular financial classification**, **hybrid supervised models**, and **tree ensembles** as precursors to gradient boosting (Carcillo *et al.*, 2019; Lebichot *et al.*, 2021; Chen and Guestrin, 2016). **XGBoost** is treated as the **principal cited boosting reference** and as a **clear extension** for future work (see §1.6).

### 1.5 Objectives of the study

The following objectives map research questions to deliverables:

| No. | Objective | Success criteria (indicative) |
|-----|-----------|------------------------------|
| O1 | Synthesise **Zimbabwe-relevant fraud typologies** (social engineering, SIM-led takeover, smurfing, notification fraud) with international literature | Thematic subsection in Chapter 2; linkage to feature design |
| O2 | Review **supervised fraud-detection methods**, imbalance handling, aggregation, drift, and boosting | Critical literature synthesis with Harvard citations |
| O3 | Implement a **reproducible data generator** and CSV→SQLite ingestion | Versioned scripts, documented parameters, reproducible fraud rate |
| O4 | Implement **feature engineering** aligned between **offline training** and **online scoring** | Shared module; documented feature dictionary |
| O5 | Train and evaluate **multiple classifiers**; persist **best model artefact** and **metrics report** | Tabular evaluation record; reported precision, recall, F1, and ROC-AUC |
| O6 | Implement **Flask REST API** exposing scoring, alerts, metrics, transactions, and account resources | Narrated in **§4.8**; sample request–response evidence may appear in appendices |
| O7 | Implement **React dashboard** for KPIs, alerts, transactions, live scoring | Narrated in **§4.10**; optional high-fidelity capture (**Figure 3.14**) |
| O8 | Assess **feasibility** (technical, economic, legal, operational) for UZ deployment | Feasibility matrices in §2.12 |

### 1.6 Scope and delimitations

**In scope**

| Domain | Description |
|--------|-------------|
| Data | **Synthetic** mobile-money-style transactions generated within PayGuard; optional external simulators (e.g. PaySim philosophy) discussed literarily |
| Models | **Binary classification**; scikit-learn pipelines; **probability scores** for thresholding |
| Software | **Python 3**, **Flask**, **SQLite**, **pandas**, **scikit-learn**, **joblib**; **React** with **TypeScript** |
| Evaluation | **Offline** train/validation split; **precision, recall, F1, ROC-AUC**; alert workflow **simulated** |

**Out of scope (delimitations)**

| Limitation | Rationale |
|------------|-----------|
| Live Emhare API integration | Privacy, contractual access, and certification boundaries |
| Production-grade HA clusters / GPU farms | Academic prototype; horizontal scaling addressed as future work |
| Real labelled production data | Substituted by synthetic data with explicit fraud injectors (Lopez-Rojas *et al.*, 2016) |
| Federated learning / fully homomorphic encryption | Beyond prototype timeline; noted as research frontier |

### 1.7 Significance of the study

The significance is **threefold**:

1. **Institutional** — Demonstrates how Education 5.0-aligned engineering research can produce an **auditable** fraud-monitoring path adjacent to Emhare-like systems, reducing reliance on purely manual controls.  
2. **Methodological** — Contributes a **complete reproducible pipeline** (data → features → model → API → UI) seldom documented end-to-end in undergraduate capstones.  
3. **Policy and societal** — Reinforces that **automated scores are decision-support signals**, not autonomous verdicts, aligning with proportionality and fairness expectations in financial crime controls (Phua *et al.*, 2010; Dal Pozzolo *et al.*, 2015).

### 1.8 Dissertation structure

| Chapter | Content (planned) |
|---------|---------------------|
| 1 | Introduction, problem, aims, scope *(this document)* |
| 2 | Literature review, theoretical framing, feasibility *(this document)* |
| 3 | Requirements, systems design, UML methodology *(this document)* |
| 4 | PayGuard implementation (backend, ML, frontend) *(this document)* |
| 5 | Results, evaluation, discussion |
| 6 | Conclusion, limitations, future work (incl. XGBoost deployment, SHAP, streaming) |

---

## Chapter 2 — Literature review, theoretical framing, and feasibility

### 2.1 Introduction

This chapter synthesises peer-reviewed and grey literature on **mobile-money fraud**, **machine-learning detection**, **synthetic data**, **concept drift**, **cost-sensitive learning**, and **gradient boosting**. It closes with a **feasibility study** (technical, economic, legal, operational) tailored to the **University of Zimbabwe** and Zimbabwe’s **Cyber and Data Protection Act [Chapter 12:07]** environment.

The chapter moves from **institutional payment context** and **fraud typologies** through **synthetic data**, **feature and model themes**, and **deployment feasibility**, using **critical comparison**, **tabular summaries**, and **Harvard-style citations** throughout.

### 2.2 Mobile money, institutional payments, and fraud modalities

Mobile money systems decouple **cash handling** from **physical bank branches**, enabling low-friction peer-to-peer transfers and merchant payments. That strength—speed—is also a liability: victims may authorise transfers under duress or deception before controls trigger. Regional scholarship and industry reports highlight **USSD phishing**, **fake SMS receipts**, **agent complicity**, and **SIM-related account access** as recurring failure modes in Sub-Saharan Africa (Makori, 2019; OECD, 2017).

University fee portals compound **high-value** and **seasonal** payment peaks. Fraud here does not only harm individuals; it undermines **institutional revenue integrity** and **auditability**. Hence, detection systems must support **investigator workflows** (triage, disposition, feedback) rather than isolated model accuracy (Dal Pozzolo *et al.*, 2015).

### 2.3 Synthetic transaction data and privacy

Because institutions rarely release labelled transaction corpora, **simulation** is a standard research strategy. **PaySim** (Lopez-Rojas *et al.*, 2016) generates mobile-money-like streams calibrated from aggregated statistics of an **African** operator, preserving realism while avoiding identifiable records. PaySim’s design rationale—**agent-based simulation**, separation of legitimate and fraudulent behaviour, and public reproducibility—directly motivates PayGuard’s **in-house generator**: the present artefact creates accounts, timestamps, devices, locations, and **injected fraud motifs** (amount spikes, velocity bursts, device/location switches) under researcher control.

| Criterion | PaySim (literature) | PayGuard artefact |
|-----------|---------------------|-------------------|
| Privacy | Aggregated calibration | Fully synthetic schema |
| Fraud control | Embedded agent rules | Explicit injectors + labels |
| Open science | Reference implementation | Versioned scripts + CSV/SQLite |

### 2.4 Transaction aggregation and behavioural features

Whitrow *et al.* (2009) show that **aggregating** transactions into behaviourally meaningful windows often outperforms **single-transaction** classification, because aggregation captures **deviations from a customer’s baseline** (e.g. frequency, spend level) and mitigates high-dimensional heterogeneity. Their work motivates PayGuard’s **rolling counts** (e.g. transactions in prior 1 h / 24 h), **inter-arrival times**, and **amount-to-prior-average ratios**—features that parallel industry practice and align with random-forest-friendly tabular representations (Whitrow *et al.*, 2009).

### 2.5 Class imbalance, costs, and evaluation metrics

Financial fraud is a **needle-in-haystack** problem: fraud prevalence is typically low. Classifiers that maximise accuracy can trivially predict “legitimate” yet fail operationally. **Cost-sensitive** methods incorporate **asymmetric misclassification costs**, reflecting that **false negatives** (missed fraud) often dominate **false positives** (alerts) in expected loss terms (Bahnsen *et al.*, 2013, 2017).

Phua *et al.* (2010) survey data-mining approaches to fraud detection, emphasising **classification** for known patterns and **clustering / anomaly detection** for novel fraud. PayGuard’s **Phase-1** focus is **supervised classification** with **class-weighted** models and **probability thresholds** for alert creation—consistent with Phua *et al.*’s hierarchy while leaving **unsupervised** extensions for future work (Phua *et al.*, 2010).

| Metric | Strength | Limitation |
|--------|----------|------------|
| Accuracy | Intuitive | Misleading under imbalance |
| Precision | Measures alert quality | Ignores missed fraud |
| Recall | Measures fraud capture | May encourage alert floods |
| F1 | Harmonic balance | Single threshold snapshot |
| ROC-AUC | Threshold-free ranking | Can be optimistic if prevalence tiny |

### 2.6 Concept drift, delayed labels, and streaming operation

Dal Pozzolo *et al.* (2015) analyse **concept drift** and **delayed supervision** in card fraud: fraudsters adapt; labels arrive late after disputes. They demonstrate architectures that **separate** learning from **immediate investigator feedback** and **delayed ground truth**—improving **alert precision**, which governs analyst workload. Although PayGuard’s prototype uses **batch retraining**, the dissertation adopts their framing to justify **periodic model refresh**, **threshold tuning**, and **human-in-the-loop** alert disposition (Dal Pozzolo *et al.*, 2015).

Complementary streaming-scale engineering—exemplified by **SCARFF**, a Spark-centred framework for scalable fraud scoring on streams—shows how **near-real-time** architectures differ from batch prototypes (Carcillo *et al.*, 2018). PayGuard’s Flask API simulates **online scoring** on a small SQLite store; a production Emhare deployment would require **stream processing** and **horizontal scaling** (Carcillo *et al.*, 2018).

### 2.7 Gradient boosting and XGBoost

Chen and Guestrin (2016) introduced **XGBoost**, a **regularised gradient boosting** framework with engineering optimisations for large sparse datasets. XGBoost remains a **strong baseline** on many tabular benchmarks and fraud applications. **The baseline implemented in this dissertation** uses **scikit-learn** random forests and logistic regression for **transparency and reproducibility**, while **XGBoost** is positioned as the **next methodological increment** (systematic hyperparameter search, optional monotonic constraints, hardware-accelerated training where available). This staged progression is methodologically sound: **interpretable linear models**, then **ensemble trees**, then **boosted trees** (Chen and Guestrin, 2016; Carcillo *et al.*, 2019).

### 2.8 Contemporary perspectives on fraud-detection systems

Recent work on **incremental and production-grade** card fraud analytics stresses that **batch-learned** models age quickly under drift and that **data-handling regulation** shapes system design (Lebichot *et al.*, 2021). Broader surveys likewise emphasise that **detection accuracy** must be read alongside **feature quality**, **latency**, and **governance** (Abdallah *et al.*, 2016). PayGuard responds at prototype scale through: **documented features** (explainability-by-design), **alert reasons** derived from key features, **SQLite-backed audit trail**, and **dashboard visualisation**—admitting that **SHAP** and **model cards** remain **future enhancements**.

### 2.9 Institutional research context (University of Zimbabwe)

Institutional and student research at the University of Zimbabwe has begun conceptualising **financial crime detection frameworks** aligned with national innovation policy (University of Zimbabwe, 2020). PayGuard extends such conceptual work with a **concrete software artefact**, suitable for demonstration, replication, and supervised examination—while avoiding over-claims regarding production deployment.

### 2.10 Research gap

Synthesising §§2.3–2.9, the gap addressed by this dissertation is:

| Gap | How PayGuard contributes |
|-----|---------------------------|
| Lack of **open, end-to-end** institutional fraud-monitoring demonstrators | Full stack: generator → ML → API → UI |
| Over-reliance on **abstract** ML claims without **systems engineering** | Explicit schema, endpoints, persistence |
| **Privacy** barriers to public datasets | Controlled synthetic data with labelled injectors |
| Need to connect **national data-protection law** to **technical design** | Feasibility §2.12 |

### 2.11 Feasibility study

#### 2.11.1 Technical feasibility

| Element | Requirement | PayGuard prototype posture |
|---------|-------------|----------------------------|
| Compute | Batch training + API inference | Commodity laptop / lab PC sufficient for demonstration scale |
| Storage | Transactional persistence | **SQLite**, suitable for development and demonstration |
| Libraries | ML + web stack | Python 3, Flask, pandas, scikit-learn, joblib; Node.js; React with TypeScript |
| Throughput | Campus-scale peaks | **Not yet load-tested**; architecture allows migration to PostgreSQL + worker queues |
| Monitoring | Health checks | Health endpoint reporting database and model load status |

Training on **very large** synthetic corpora (e.g. simulator-scale millions of rows) may warrant **GPU-accelerated** experimentation and distributed tooling; the **prototype-scale** datasets used in this study remain tractable on **commodity** workstations.

#### 2.11.2 Economic feasibility

| Cost driver | Comment |
|-------------|---------|
| Development time | Primary resource; open-source stack minimises licence fees |
| Infrastructure | Near-zero for local demonstration; optional cloud hosting for public access |
| Fraud losses avoided | Not measured; thesis argues **qualitative ROI** via faster triage and deterrence |
| Maintenance | Requires ML + software skills; aligns with Computer Science graduate output |

#### 2.11.3 Legal and regulatory feasibility

Zimbabwe’s **Cyber and Data Protection Act [Chapter 12:07]** (2021) imposes obligations relevant to any production deployment:

| Principle | Implication for PayGuard-style systems |
|-----------|----------------------------------------|
| **Data minimisation** | Store only attributes required for fraud signals; avoid excessive PII |
| **Security safeguards** | Encryption in transit/at rest for production; access control on dashboards |
| **Breach notification** | Incident reporting timelines to **POTRAZ** and affected data subjects |
| **Licensing** | Data-controller registration thresholds (policy details subject to legal advice) |

Statutory wording and **POTRAZ** guidance should be cited from **primary legal sources** in the final dissertation (Zimbabwe, 2021).

The prototype’s **synthetic data** mitigates many production risks during research, but **does not eliminate** the need for legal review before connecting to Emhare.

#### 2.11.4 Operational feasibility

Successful adoption requires **workflow fit**: investigators must **confirm or dismiss** alerts, **adjust thresholds**, and **feed back** labels for retraining (Dal Pozzolo *et al.*, 2015). PayGuard’s dashboard and **HTTP partial-update** semantics for alert disposition model a **minimal** triage loop; **SHAP** overlays and **case management** integrations are flagged as extensions.

### 2.12 Chapter summary

Chapter 2 established that **mobile-money fraud** in university fee contexts is a **material risk**, that **simulation and aggregation** are academically legitimate responses to **privacy constraints**, and that **supervised learning** with **imbalance-aware metrics** provides a **credible detection core**. **XGBoost** (Chen and Guestrin, 2016) remains the **canonical boosted-tree reference** for future enhancement. Chapter 3 formalises **requirements**, **architecture**, **data and ML design**, and **UML-oriented specifications** for PayGuard; accompanying **figure briefs** are listed in `figures.md`.

---

## Chapter 3 — Requirements, systems design, and methodology

### 3.1 Introduction

Chapter 3 translates the research problem (§1.2) and feasibility constraints (§2.11) into an **engineering blueprint**. The exposition follows a conventional **systems-analysis** path—requirements, architecture, data model, behavioural and structural models, machine-learning procedure, and interface design—consistent with survey guidance on end-to-end fraud-detection systems (Abdallah *et al.*, 2016) and with operational emphasis on **human-in-the-loop** disposition (Dal Pozzolo *et al.*, 2015). Diagram references (**Figure 3.1**–**Figure 3.14**) are specified at caption level here; production drawings are tracked in `figures.md`.

### 3.2 Development approach and life cycle

PayGuard was engineered under an **iterative, prototype-first** life cycle: short cycles of **implement → integrate → evaluate** rather than a rigid waterfall hand-off. This matches the uncertainty inherent in **model selection**, **threshold tuning**, and **UI validation**, and aligns with incremental perspectives on keeping detection models current (Lebichot *et al.*, 2021). **Figure 3.2** sketches the phase sequence and the feedback loop from **evaluation** back to **design** (e.g. feature or threshold revisions).

### 3.3 Functional requirements

Functional requirements tie objectives O3–O7 (§1.5) to observable system behaviour. Each requirement is **testable** via API interaction or UI inspection.

| ID | Requirement | Rationale |
|----|-------------|-----------|
| FR1 | The system shall **ingest** a transaction record (account, type, amount, currency, optional device and location, timestamp) and persist it. | Baseline data capture for history-based scoring |
| FR2 | The system shall **score** an incoming transaction using a **trained supervised model** and **account-level history**, producing a **probability or risk score**, a **discrete label**, and **explanatory feature summaries**. | Core fraud-detection obligation (Phua *et al.*, 2010; Whitrow *et al.*, 2009) |
| FR3 | On scoring, the system shall **persist** the transaction (with score metadata) and create an **alert** record when risk exceeds policy thresholds. | Operational traceability (Dal Pozzolo *et al.*, 2015) |
| FR4 | The system shall **list and filter alerts** (e.g. by status and minimum risk) and support **status updates** (open, closed, resolved) with resolution timestamps. | Investigator workflow |
| FR5 | The system shall expose **aggregate metrics** (counts, fraud rate, alert breakdowns, rolling windows) for dashboard consumption. | Situational awareness |
| FR6 | The system shall support **transaction listing** globally and **per account**, including **account risk profiles** (totals, averages, alert counts). | Deep-dive analysis |
| FR7 | The system shall report **service health** (database reachability, model load status). | Operability |

**Figure 3.3** (use case diagram) maps these requirements to **analyst-facing** goals; an optional **administrator** actor may be included for future authentication and configuration.

### 3.4 Non-functional requirements

| ID | Category | Requirement |
|----|----------|----------------|
| NFR1 | Performance | Interactive API responses on **prototype-scale** SQLite under **single-user** demonstration load; latency not certified for campus peak traffic. |
| NFR2 | Reliability | Graceful degradation when the **model artefact** is missing (service reports unavailable model rather than silent failure). |
| NFR3 | Maintainability | **Shared feature-engineering** logic for **offline training** and **online scoring** to prevent train–serve skew (Whitrow *et al.*, 2009). |
| NFR4 | Portability | **Container-free** deployment on standard Windows/macOS/Linux developer machines; environment variables for **database path** and **model path**. |
| NFR5 | Security (prototype) | **Input validation** on JSON payloads; **no production authentication** in the baseline artefact—explicit delimitation (§1.6). |
| NFR6 | Legal alignment | **Data minimisation** mindset in schema design; production deployment would require controls per **Cyber and Data Protection Act [Chapter 12:07]** (Zimbabwe, 2021). |

### 3.5 System architecture

Architecturally, PayGuard is a **three-tier pattern**: **presentation** (React SPA), **application** (Flask REST), **data** (SQLite file) plus an **offline analytical path** (CSV generation, feature building, training script, persisted **joblib** pipeline). The browser communicates over **HTTP**; the API loads the **serialized model** at startup and uses **request-scoped** database connections.

**Figure 3.1** depicts: (i) **offline** flow—synthetic dataset → training → model file; (ii) **online** flow—dashboard → REST → feature builder → scikit-learn **Pipeline** → persistence. This separation mirrors industrial batch vs streaming distinctions discussed under SCARFF (Carcillo *et al.*, 2018), albeit at prototype scale.

### 3.6 Data design

#### 3.6.1 Conceptual schema

Three persistent entities anchor the prototype:

- **Transaction** — atomic payment event with **monetary attributes**, **channel context** (device, location), **temporal stamp**, **ground-truth or predicted fraud flag**, optional **fraud_score**, and **metadata** for audit extensions.  
- **Alert** — **investigator-facing** record linked **many-to-one** to a transaction, carrying **risk_score**, **alert_type**, **natural-language reason**, **status**, and **timestamps**.  
- **Model run** (schema reserved) — optional registry for **training experiments** (name, version, **metrics_json**); not required for minimum viable scoring.

**Figure 3.9** presents the **ERD** with **1:N** cardinality from **Transaction** to **Alert** and **ON DELETE CASCADE** semantics on the relational implementation.

#### 3.6.2 Logical view

SQLite realises the conceptual model with **INTEGER** primary keys, **TEXT** ISO timestamps, and **CHECK** constraints on **non-negative amount** and binary **is_fraud**. JSON metadata is stored as **TEXT** for flexibility during prototype evolution.

### 3.7 Machine-learning design

#### 3.7.1 Feature engineering

Features are derived from **per-account chronological streams**, reflecting aggregation and behavioural-shift intuition (Whitrow *et al.*, 2009). **Numeric** inputs include **amount**, **log1p(amount)**, **calendar** signals (hour, day-of-week, weekend/night flags), **prior transaction count**, **prior average amount**, **ratio and delta** to that average, **account age** in hours, **seconds since previous transaction** (capped), **rolling transaction counts** over 1 h and 24 h, and **binary device/location change** flags. **Categorical** inputs include **transaction_type**, **currency**, and **location**. The same construction applies to **CSV training rows** and **API scoring rows** once history is assembled.

#### 3.7.2 Training and model selection

Training uses **stratified hold-out** data partitioning and **class-weighted** logistic regression and random forest **pipelines** combining **ColumnTransformer** (**StandardScaler** on numeric columns, **OneHotEncoder** on categoricals) with the classifier. The **winning model** is selected by **ROC-AUC** with **F1** and **recall** as secondary ordering—transparent reporting aligned with imbalance-aware practice (Bahnsen *et al.*, 2013, 2017; Phua *et al.*, 2010). **Figure 3.11** shows the **conceptual ML pipeline** for both **fit** and **predict** paths.

#### 3.7.3 Inference and alert policy

At scoring time, the service builds a **feature row** for the **target** transaction, applies **predict** and **predict_proba**, maps the score to **risk bands** (e.g. low / medium / high / critical), composes a **reason string** from thresholded key features, and sets **alert status** from **label-or-threshold** policy—consistent with treating scores as **triage signals** rather than final adjudication (OECD, 2017; Dal Pozzolo *et al.*, 2015).

### 3.8 Behavioural models

#### 3.8.1 Activity model — fraud scoring

**Figure 3.4** models end-to-end **score transaction**: validate input → ensure model availability → retrieve **account history** → assemble frame → **build_feature_frame** → **predict** → persist **transaction** and **alert** → return JSON. Decision branches cover **validation errors**, **missing model**, and **empty history** edge cases.

#### 3.8.2 Sequence and communication views

**Figure 3.5** (sequence diagram) orders messages among **Client**, **Flask controller**, **database accessor**, **feature module**, and **sklearn Pipeline**. **Figure 3.6** (communication diagram) presents the same collaboration with **numbered interactions** for oral defence walkthroughs.

### 3.9 Structural models

#### 3.9.1 Class diagram

**Figure 3.7** groups logical classes into **API / validation**, **persistence**, **machine learning**, and **domain** packages. Operations such as **insert_transaction**, **fetch_account_history**, **build_feature_frame**, and **load_model_context** appear as class-level responsibilities even when implemented as **functions** in Python—UML serves **communication**, not literal code mapping.

#### 3.9.2 Object diagram

**Figure 3.8** captures a **post-scoring snapshot**: one **Transaction** instance, one **Alert** linked by foreign key, and an **in-memory Pipeline** object representing the loaded artefact.

### 3.10 State model — alert lifecycle

**Figure 3.10** specifies **states** **open**, **closed**, and **resolved**, with transitions triggered by **analyst PATCH requests** or system closure when risk is below threshold. **Resolved** sets a **resolution timestamp** to support SLA-style reporting in future work.

### 3.11 Application process design

**Figure 3.12** flowcharts the **Flask service lifecycle**: **initialise** application (create tables, load model) → **per-request** routing and validation → **business operations** with **commit** → **teardown** closing the **request-scoped** connection. This pattern supports **thread-safe** SQLite access under Flask’s execution model.

### 3.12 User interface design

The SPA is organised into **Dashboard** (KPI cards, risk trend visualisation, **live scoring** form), **Alerts** (filterable table, disposition actions), **Transactions** (stream view), and **Accounts** (profile and history). Navigation is **sidebar-based**; visual hierarchy emphasises **risk chroma** (green→red) and **badge** semantics for alert status.

**Figure 3.13** provides a **sitemap / low-fidelity wireframe collage**; a **high-fidelity dashboard screenshot** may be supplied as **Figure 3.14** in the final typeset dissertation.

### 3.13 Security and deployment considerations (design level)

Prototype security relies on **network locality** (developer machine) and **validated JSON**. Production hardening would add **TLS**, **authentication**, **rate limiting**, and **secrets management**—items flagged under NFR5–NFR6 and §2.11.3.

### 3.14 Chapter summary

Chapter 3 specified **functional and non-functional requirements**, a **three-tier architecture** with an **offline training spine**, a **relational data model** for transactions and alerts, a **documented feature set** grounded in aggregation literature (Whitrow *et al.*, 2009), **UML behavioural and structural views**, **alert state semantics**, and **UI information architecture**. Chapter 4 documents how those designs were **realised in software**; Chapter 5 interprets **quantitative outcomes**.

---

## Chapter 4 — Implementation

### 4.1 Introduction

This chapter describes the **concrete realisation** of PayGuard: directory layout, **synthetic data** tooling, **shared feature code**, **training and model persistence**, the **Flask service**, **SQLite** access patterns, and the **React** dashboard. The narrative follows the **offline-then-online** split already established in Chapter 3 and mirrors modular descriptions typical of fraud-detection system surveys (Abdallah *et al.*, 2016). Implementation choices prioritise **reproducibility** (fixed random seeds, versioned model dumps, documented CLI parameters) and **train–serve symmetry** for tabular features (Whitrow *et al.*, 2009).

**Figure 4.1** summarises the **technology stack** as deployed in the prototype (see figure tracker for export specifications).

### 4.2 Work breakdown and repository layout

Development was partitioned into **data**, **models**, **service**, and **presentation** work packages. Table 4.1 maps the **top-level layout** to responsibilities.

**Table 4.1** — Repository areas and responsibilities

| Area | Responsibility |
|------|----------------|
| **Backend (Python)** | Synthetic generation, CSV seeding, feature and training scripts, Flask application, SQLite access |
| **Data** | Generated CSV corpora and the SQLite database file used at run time |
| **Models** | Serialized **joblib** payloads (best classifier plus versioned copies) and JSON training summary |
| **Frontend (TypeScript/React)** | Single-page dashboard, typed HTTP client, charting and form components |

This separation keeps **batch ML** independent of the **HTTP process**, so retraining does not require front-end redeployment (Lebichot *et al.*, 2021).

### 4.3 Technology stack

The **presentation tier** uses **React 19** with **TypeScript**, bundled by **Vite**, styled with **Tailwind CSS**, and composed from a **component library** suited to dashboards (cards, tables, dialogs, charts). The **application tier** uses **Flask 3** on **Python 3** with **pandas**, **NumPy**, **scikit-learn**, and **joblib**. The **data tier** is **SQLite 3** accessed through the standard library driver with **request-scoped** connections and **foreign-key** enforcement. Offline analytics share the same Python environment as the API to avoid dependency skew.

### 4.4 Synthetic transaction generation

The generator constructs **account profiles** (home location, primary device, expected daily activity intensity, typical spend level) and simulates **mobile-money-style** event types (cash-in, cash-out, peer-to-peer transfer, bill pay, merchant pay) with **Zimbabwe-relevant** city labels and **USD / ZWL** currency mix. Fraud is introduced through **controlled injectors** after the benign stream is built:

| Pattern | Intended signal |
|---------|-----------------|
| **Amount spike** | Sudden large debit/credit inconsistent with prior median |
| **Device / location change** | Channel context diverging from established profile |
| **Rapid burst** | Many events in a short interval for a sampled account |

The design follows the **simulation-for-privacy** rationale discussed for mobile-money research (Lopez-Rojas *et al.*, 2016). Row-level **`fraud_pattern`** metadata supports stratified error analysis even though the classifier consumes the **feature matrix**, not the pattern label, at training time.

### 4.5 Data import and schema initialisation

A dedicated **ingestion** routine reads the CSV, normalises types, and **bulk-inserts** into the **transactions** table. The persistence module executes **idempotent** `CREATE TABLE IF NOT EXISTS` statements for **transactions**, **alerts**, and a reserved **model_runs** registry. **Referential integrity** from **alerts** to **transactions** is enforced with `ON DELETE CASCADE` so alert rows cannot orphan parent transactions during development resets.

### 4.6 Shared feature engineering

All **supervised** features are produced by a single **feature-engineering** module consumed by both the **training script** and the **scoring endpoint**. The implementation:

- enforces a **required column schema** on load;  
- sorts by **account** and **timestamp** before rolling statistics;  
- computes **numeric** behavioural descriptors (e.g. log-amount, prior counts, rolling 1 h / 24 h velocities, device/location change flags) and passes **categorical** channels (transaction type, currency, location) into the learning pipeline’s **one-hot** branch.

This arrangement directly implements the **aggregation-centric** design rationale from Chapter 3 (Whitrow *et al.*, 2009) and mitigates **train–serve skew**, which surveys flag as a recurring failure mode in operational fraud analytics (Abdallah *et al.*, 2016).

### 4.7 Model training and artefact persistence

The training entry point loads the CSV, builds the **feature bundle**, performs a **stratified shuffle split**, fits two candidate **pipelines**—**logistic regression** (class-weighted, L-BFGS) and **random forest** (class-weighted subsampling, depth-capped ensemble)—and ranks models using **ROC-AUC** with **F1** and **recall** as tie-breakers. The winning **estimator**, **feature name lists**, and **metadata** are serialized to a primary **joblib** file plus a **timestamped** copy; a **JSON** sidecar records metrics and paths for audit.

**Table 4.2** — Illustrative hold-out metrics (one frozen training run bundled with the project)

| Model | Precision | Recall | F1 | ROC-AUC | Hold-out test rows |
|-------|-----------|--------|-----|---------|---------------------|
| Random forest *(selected)* | 0.454 | 0.870 | 0.597 | **0.991** | 19 894 |
| Logistic regression | 0.375 | 0.981 | 0.543 | 0.990 | 19 894 |

Corpus statistics from the same run: **99 468** total rows, approximately **2.39%** fraud prevalence, stratified **80 / 20** train–test split. These numbers are **illustrative** of prototype quality; fresh runs will differ slightly unless seeds and data files are identical.

### 4.8 REST API implementation

The HTTP layer is implemented as a **single Flask application factory** that:

1. initialises the database file and **attempts to load** the serialized model at startup, recording **success or error** in application configuration;  
2. registers **JSON-first** routes with explicit **validation** helpers (typed fields, ISO timestamps, currency length checks);  
3. centralises **API errors** in a small exception type mapped to HTTP status codes;  
4. closes the SQLite connection on **request teardown**.

**Table 4.3** — Published REST resources (prototype)

| Method | Resource | Purpose |
|--------|----------|---------|
| GET | Service health | Database ping + model load status |
| POST | Transaction collection | Append validated transaction |
| GET | Transaction collection | Recent transactions (optional account filter) |
| POST | Fraud scoring | Score payload, persist transaction + alert |
| GET | Alert collection | Filterable alert feed |
| GET | Single alert | Detail view including joined transaction fields |
| PATCH | Single alert | Update **open / closed / resolved** disposition |
| GET | Account profile | Aggregated statistics for one account |
| GET | Account transactions | Paginated history |
| GET | Dashboard metrics | KPI JSON for the SPA |

The surface area maps directly to **FR1–FR7** in §3.3.

### 4.9 Scoring path and alert heuristics

When a **score** request arrives, the service:

1. validates the **payload**;  
2. pulls **chronological history** for the account (bounded row count);  
3. appends the **candidate** transaction and invokes the **same** `build_feature_frame` logic used in training, retaining only the **target** row for **prediction**;  
4. reads **binary label** and **fraud probability** from the pipeline;  
5. maps probability to a **discrete risk band**;  
6. composes a **short natural-language reason** from thresholded key drivers (e.g. velocity, ratio to prior average, device change);  
7. persists the transaction (including **predicted label** and **score**) and inserts an **alert** whose **status** is **open** if either the **hard label** is positive **or** the probability exceeds a **configurable operating threshold** (otherwise **closed**).

This hybrid rule-plus-model policy keeps analyst workload bounded while preserving transparency (Dal Pozzolo *et al.*, 2015; OECD, 2017).

### 4.10 Frontend implementation

The dashboard is a **client-rendered** application with a **static shell**: a **sidebar** switches among **Dashboard**, **Alerts**, **Transactions**, and **Accounts** views. A lightweight **metrics poll** refreshes open-alert counts for the navigation badge. Data access is isolated in a **typed fetch module** so components remain **presentational**. Charts use a **declarative** chart library appropriate for time-series and **categorical breakdowns**; forms expose mandatory fields for **live scoring** demos.

During **local development**, the bundler **proxies** same-origin API paths to the Flask port, avoiding cross-origin complexity; a **base URL** environment variable supports **deployed** backends.

### 4.11 Configuration, security posture, and operations

**Environment variables** select the **database file path** and **model file path**, enabling multiple **experimental** databases on one machine. At prototype stage **authentication is not implemented**; access control relies on **network isolation**. JSON payloads are **validated** before SQL execution to reduce injection and logic errors. **Future production** hardening—TLS, API keys, rate limits—was scoped in §3.13 and §2.11.3.

### 4.12 Verification and testing strategy

Automated unit coverage was **not** a deliverable target for the capstone timeline; instead, **manual verification** matrices were used:

| Area | Check |
|------|--------|
| Data | Regenerate CSV with fixed seed → expect stable fraud-rate band |
| Training | Re-run training → metrics within expected variance; artefact written |
| API | Health endpoint **200** when DB and model present; **503** on scoring if model missing |
| UI | Each view loads without console errors; scoring form returns visible risk output |

These checks provide **traceable evidence** for the examination while acknowledging limits on **regression automation** (Abdallah *et al.*, 2016).

### 4.13 Chapter summary

Chapter 4 explained **how** PayGuard was built: **Python** data and ML tooling with **SQLite** persistence, **Flask** HTTP services aligned to Chapter 3 requirements, and a **React** dashboard for monitoring. **Train–serve feature parity** was preserved through a **shared module**, and **model selection** was automated with transparent reporting. **Chapter 5** presents **evaluation results**, error analysis, and discussion.

---

## References (Harvard style)

Abdallah, A., Maarof, M.A. and Zainal, A. (2016) ‘Fraud detection system: a survey’, *Journal of Network and Computer Applications*, 68, pp. 90–113.

Bahnsen, A.C., Aouada, D., Stojanovic, A. and Ottersten, B. (2013) ‘Cost sensitive credit card fraud detection using Bayes minimum risk’, in *Proceedings of the 12th IEEE International Conference on Machine Learning and Applications (ICMLA)*, IEEE, pp. 333–338.

Bahnsen, A.C., Aouada, D. and Stojanovic, A. (2017) ‘Example-dependent cost-sensitive decision trees’, *Expert Systems with Applications*, 69, pp. 105–117.

Carcillo, F., Dal Pozzolo, G., Le Borgne, Y.-A., Caelen, O., Mazzer, Y. and Bontempi, G. (2018) ‘SCARFF: a scalable framework for streaming credit card fraud detection with Spark’, *Information Fusion*, 41, pp. 182–194.

Carcillo, F., Le Borgne, Y.-A., Caelen, O., Kessaci, Y., Oblé, F. and Bontempi, G. (2019) ‘Combining unsupervised and supervised learning in credit card fraud detection’, *Information Sciences*, 557, pp. 317–331.

Chen, T. and Guestrin, C. (2016) ‘XGBoost: A scalable tree boosting system’, in *Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining (KDD ’16)*, New York: ACM, pp. 785–794.

Dal Pozzolo, G., Boracchi, O., Caelen, O., Alippi, C. and Bontempi, G. (2015) ‘Credit card fraud detection and concept drift adaptation with delayed supervised information’, in *Proceedings of the International Joint Conference on Neural Networks (IJCNN)*, IEEE.

Government of Zimbabwe (2018) *Education 5.0 policy framework* [policy summary documents]. Harare: Government of Zimbabwe.

Lebichot, B., Paldino, G.M., Siblini, W., He-Guelton, L., Oblé, F. and Bontempi, G. (2021) ‘Incremental learning strategies for credit cards fraud detection’, *International Journal of Data Science and Analytics*, 12(3), pp. 165–174.

Lopez-Rojas, E.A., Elmir, A. and Axelsson, S. (2016) ‘PaySim: A financial mobile money simulator for fraud detection’, in *Proceedings of the 28th European Modeling and Simulation Symposium (EMSS 2016)*, Larnaca, Cyprus.

Makori, J. (2019) *Mobile money fraud in Africa: vulnerabilities and mitigation* [verify exact title and venue with your library catalogue]. *(Bibliographic details to be completed—retain if required by your department.)*

OECD (2017) *Enhancing financial consumer protection amid rapid technological change*. Paris: OECD Publishing.

Phua, C., Lee, V., Smith, K. and Gayler, R. (2010) ‘A comprehensive survey of data mining-based fraud detection research’, *arXiv preprint*, arXiv:1009.6119 [cs.LG].

University of Zimbabwe (2020) *Mobile financial crime detection framework* [institutional or student research report—verify citation details in UZ repository]. Harare: University of Zimbabwe.

Whitrow, C., Hand, D.J., Juszczak, P., Weston, D. and Adams, N.M. (2009) ‘Transaction aggregation as a strategy for credit card fraud detection’, *Data Mining and Knowledge Discovery*, 18(1), pp. 30–55.

Zimbabwe (2021) *Cyber and Data Protection Act* [Chapter 12:07]. Harare: Government of Zimbabwe. Available at: [verify official gazette URL with your supervisor].
