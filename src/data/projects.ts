export type CategoryId = "fullstack" | "ai";

// To add a category (e.g. Security): extend CategoryId, add an entry here,
// and tag projects with the new id — the tab and filtering come for free.
export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "fullstack", label: "Full-Stack" },
  { id: "ai", label: "AI & Machine Learning" },
];

export interface FlowSegment {
  text: string;
  tone?: "base" | "green" | "amber";
}

export interface Challenge {
  title: string;
  desc: string;
}

export interface Project {
  title: string;
  subtitle: string;
  category: CategoryId;
  tags: string[];
  starred?: boolean;
  videoUrl?: string;
  overview: { description: string; stack: string[] };
  architecture: { description: string; flow: FlowSegment[][] };
  challenges: Challenge[];
}

export const PROJECTS: Project[] = [
  {
    title: "UNSW Handbook RAG",
    subtitle: "Grounded Course-Enrolment Q&A — Ongoing",
    category: "ai",
    tags: ["FastAPI", "pgvector", "RAG", "SSE"],
    starred: true,
    overview: {
      description:
        "A retrieval-augmented generation service that answers real UNSW enrolment questions with short, citation-grounded answers linking to the exact handbook sections. Built end-to-end — scraper → hybrid retrieval → streaming API → measured evaluation. On a 34-question golden set: 93% grounded, 96% cited, hybrid hit@5 93%.",
      stack: [
        "FastAPI",
        "PostgreSQL + pgvector",
        "sentence-transformers",
        "DeepSeek API",
        "SSE Streaming",
        "Docker + CI",
      ],
    },
    architecture: {
      description:
        "A rate-limited, resumable scraper feeds a structure-aware chunker (splitting by section semantics, not fixed token windows) into one Postgres table holding both a vector(384) embedding column and a GIN-indexed tsvector. Queries fuse vector-KNN and full-text search with Reciprocal Rank Fusion in a single SQL round-trip; a tuned refusal threshold gates generation before streaming over SSE.",
      flow: [
        [
          { text: "Scraper", tone: "base" },
          { text: " → structure-aware chunker → " },
          { text: "Postgres", tone: "green" },
          { text: " (vector(384) + tsvector)" },
        ],
        [
          { text: "Vector-KNN + full-text", tone: "green" },
          { text: " → RRF fusion → " },
          { text: "refusal gate", tone: "amber" },
        ],
        [
          { text: "/ask", tone: "amber" },
          { text: " → SSE (meta → token → done) → " },
          { text: "citations [n] + query_logs", tone: "base" },
        ],
      ],
    },
    challenges: [
      {
        title: "Hybrid Retrieval (RRF)",
        desc: "A single SQL round-trip fuses a vector-KNN CTE and a full-text-search CTE with Reciprocal Rank Fusion, with single-method baselines kept for comparison.",
      },
      {
        title: "Refusal Gate vs. Hallucination",
        desc: "A tuned refusal threshold (balanced-accuracy optimum 0.96) gates generation — low-confidence retrievals skip the LLM and return the nearest matches instead of hallucinating.",
      },
      {
        title: "Measured, Honest Evaluation",
        desc: "A 34-question golden set and one-command eval harness report hit-rate@k per method and LLM-as-judge groundedness. The headline finding is reported straight: on this corpus a well-tuned full-text search beats hybrid (hit@3 89% vs 82%).",
      },
    ],
  },
  {
    title: "AuraList",
    subtitle: "AI Task Breakdown & Planning App — In Development",
    category: "fullstack",
    tags: ["React", "Express", "Gemini API", "Google OAuth"],
    overview: {
      description:
        "Describe a big goal in chat and the AI breaks it into an actionable checklist, then track the steps on a to-do list or drag-and-drop kanban board and export them to Google Calendar and Google Tasks. Initial dev version complete; actively developing toward release.",
      stack: [
        "React 19 + Vite",
        "Tailwind CSS 4",
        "Express (Node.js)",
        "Google Gemini API",
        "OAuth 2.0",
        "Calendar & Tasks APIs",
      ],
    },
    architecture: {
      description:
        "Three views — AI chat, to-do list, and kanban board — share one task store persisted client-side in localStorage. Google sign-in happens entirely client-side in a popup, while the Gemini API key stays server-side behind an Express backend.",
      flow: [
        [
          { text: "Chat UI", tone: "base" },
          { text: " → Express backend → " },
          { text: "Gemini API", tone: "green" },
          { text: " (key server-side)" },
        ],
        [
          { text: "OAuth popup", tone: "green" },
          { text: " → token stays in browser → " },
          { text: "Calendar & Tasks APIs", tone: "amber" },
        ],
        [
          { text: "Task store", tone: "amber" },
          { text: " → localStorage → " },
          { text: "To-do / Kanban views", tone: "base" },
        ],
      ],
    },
    challenges: [
      {
        title: "Client-Side OAuth Boundary",
        desc: "Google sign-in runs entirely client-side in a popup via Google Identity Services — the access token never leaves the browser and no Google credentials ever touch the backend.",
      },
      {
        title: "Gemini Key Isolation",
        desc: "All AI calls route through the Express backend so the Gemini API key stays in a gitignored server-side .env, never shipped to the client bundle.",
      },
      {
        title: "One Task Store, Three Views",
        desc: "AI chat, to-do list, and drag-and-drop kanban board all read and write a single shared task store, keeping state consistent across views and Google export actions.",
      },
    ],
  },
  {
    title: "POS & Inventory System",
    subtitle: "Containerized Point-of-Sale Platform",
    category: "fullstack",
    tags: ["Django", "Docker", "PostgreSQL", "React"],
    starred: true,
    overview: {
      description:
        "A containerized POS dashboard for managing sales categories, inventory, real-time checkout, and sales analytics, built on a multi-container Docker Compose architecture with a GitHub Actions pipeline running integration tests on changes. Currently resolving local bugs, with GCP deployment as the next milestone.",
      stack: [
        "Django REST",
        "React Frontend",
        "PostgreSQL",
        "Docker Compose",
        "Nginx Proxy",
        "GitHub Actions",
      ],
    },
    architecture: {
      description:
        "Multi-container orchestration via Docker Compose. A multi-stage build compiles the frontend and serves it via Nginx as a reverse proxy, Django runs over WSGI, and PostgreSQL runs as an isolated data layer with persistent volumes.",
      flow: [
        [
          { text: "Nginx", tone: "base" },
          { text: " :80 → proxy_pass → " },
          { text: "Django (WSGI)", tone: "green" },
          { text: " :8000" },
        ],
        [
          { text: "Django", tone: "green" },
          { text: " ↔ " },
          { text: "PostgreSQL", tone: "amber" },
          { text: " :5432 (persistent volume)" },
        ],
        [
          { text: "React", tone: "base" },
          { text: " → DRF REST API → serialized JSON responses" },
        ],
      ],
    },
    challenges: [
      {
        title: "Concurrency & Race Conditions",
        desc: "Solved inventory race conditions during simultaneous transactions using Django's select_for_update() with row-level locking and atomic transaction blocks to guarantee data consistency.",
      },
      {
        title: "Per-Environment Settings Isolation",
        desc: "Split Django settings into base, development, testing, uat, and production modules, keeping secrets and configuration isolated per environment.",
      },
      {
        title: "Multi-Container Orchestration",
        desc: "Configured Docker Compose networking, volumes, and environment variables so the Nginx-served frontend, Django backend, and PostgreSQL run as isolated, reproducible services.",
      },
    ],
  },
  {
    title: "License Plate Detection & Reading",
    subtitle: "YOLO26 + OCR Pipeline — Ongoing ML Project",
    category: "ai",
    tags: ["Python", "YOLO26", "EasyOCR", "OpenCV"],
    overview: {
      description:
        "A two-stage computer vision pipeline: a fine-tuned YOLO26-nano model detects license plates, crops them, and EasyOCR reads the plate text. Reached 0.953 precision, 0.917 recall, and 0.961 mAP50 on a 2,048-image validation set — after just 10 epochs of fine-tuning, with ~3 ms/image inference on a T4.",
      stack: [
        "Ultralytics YOLO26",
        "EasyOCR",
        "OpenCV",
        "Roboflow",
        "Google Colab (T4)",
        "Python",
      ],
    },
    architecture: {
      description:
        "An end-to-end pipeline: the License Plate Recognition dataset is downloaded programmatically from Roboflow Universe, a pretrained YOLO26-nano is fine-tuned at 640×640 with early stopping, then two-stage inference detects plates, crops them, and reads the text with an alphanumeric OCR allowlist.",
      flow: [
        [
          { text: "Roboflow dataset", tone: "base" },
          { text: " → fine-tune → " },
          { text: "YOLO26-nano", tone: "green" },
          { text: " (640×640, early stopping)" },
        ],
        [
          { text: "Detect plates", tone: "green" },
          { text: " → crop → " },
          { text: "EasyOCR", tone: "amber" },
          { text: " (alphanumeric allowlist)" },
        ],
        [
          { text: "Plate text", tone: "amber" },
          { text: " → annotate → " },
          { text: "Saved outputs", tone: "base" },
        ],
      ],
    },
    challenges: [
      {
        title: "Documented Test Cycles",
        desc: "Each run is recorded in the README with results, failure analysis — e.g. a 2:1-wide image shrinking the plate to ~60px at 640 inference resolution, causing a missed detection — and concrete hypotheses for the next cycle.",
      },
      {
        title: "Secrets Hygiene",
        desc: "Roboflow API key kept in a gitignored .env locally and Colab Secrets on GPU runs, with an .env.example template for reproducibility.",
      },
      {
        title: "OCR on Hard Crops",
        desc: "Detection is solid; remaining errors are character misreads on small or dark crops. Next cycle: inference at 1280px for wide images, plus upscaling and contrast-boosting plate crops before OCR.",
      },
    ],
  },
  {
    title: "Presto — Slide Deck Web App",
    subtitle: "Full-Stack Presentation Editor (COMP6080)",
    category: "fullstack",
    tags: ["React", "TypeScript", "Express", "Vercel KV"],
    overview: {
      description:
        "A lightweight slides.com alternative: a full single-page presentation editor with registration/login, a dashboard, and a slide editor supporting text, images, video, and syntax-highlighted code blocks — with slide re-ordering, theming, and preview mode. Deployed end-to-end on Vercel.",
      stack: [
        "React 19 + Vite",
        "TypeScript",
        "Tailwind CSS",
        "Express (Node.js)",
        "Vercel KV (Redis)",
        "Cypress + Vitest",
      ],
    },
    architecture: {
      description:
        "Both the React frontend and the Express backend deploy to Vercel, with presentation state persisted in Vercel KV (Redis) and stateless JWT-based session handling. Every merge passed a documented quality gate of lint, type-check, and a Cypress E2E regression suite.",
      flow: [
        [
          { text: "React SPA", tone: "base" },
          { text: " → JWT auth → " },
          { text: "Express API", tone: "green" },
          { text: " (Vercel)" },
        ],
        [
          { text: "Express", tone: "green" },
          { text: " → presentation state → " },
          { text: "Vercel KV", tone: "amber" },
          { text: " (Redis)" },
        ],
        [
          { text: "Merge gate", tone: "amber" },
          { text: " → lint + tsc + Cypress E2E → " },
          { text: "Deploy", tone: "base" },
        ],
      ],
    },
    challenges: [
      {
        title: "Documented Quality Gate",
        desc: "Lint, type-check, and a Cypress E2E regression suite (auth happy-path baseline) all passing before merges, with a written testing audit trail mapping specs to requirements.",
      },
      {
        title: "Accessibility & UX Standards",
        desc: "Held the UI to explicit WCAG-style criteria documented per feature — no browser alert()s; all feedback surfaced through proper UI components.",
      },
      {
        title: "Hard Responsive Requirement",
        desc: "Responsive down to a 400×700 viewport as a hard requirement, verified feature by feature.",
      },
    ],
  },
  {
    title: "Productivity Chrome Extension",
    subtitle: "Privacy-First Browser Productivity Tool",
    category: "fullstack",
    tags: ["React", "Tailwind CSS", "Manifest V3"],
    overview: {
      description:
        "A privacy-first workspace extension with modular Pomodoro timers, local-first analytics charts, and real-time site blocking. All data stays client-side with zero network calls. In closed beta with 5+ users; planning a public release.",
      stack: [
        "React",
        "Tailwind CSS",
        "Manifest V3",
        "Service Workers",
        "chrome.storage.local",
        "Chrome APIs",
      ],
    },
    architecture: {
      description:
        "Built on Chrome's Manifest V3 with a service worker background script handling event listeners and state management. All persistence uses chrome.storage.local — no external servers, zero network requests.",
      flow: [
        [
          { text: "Popup UI", tone: "base" },
          { text: " → message passing → " },
          { text: "Service Worker", tone: "green" },
        ],
        [
          { text: "Service Worker", tone: "green" },
          { text: " → event listeners → " },
          { text: "chrome.storage.local", tone: "amber" },
        ],
        [
          { text: "Storage", tone: "amber" },
          { text: " → local only → " },
          { text: "Zero network calls", tone: "base" },
        ],
      ],
    },
    challenges: [
      {
        title: "Manifest V3 Migration",
        desc: "Adopted service worker architecture from scratch, handling the event-driven lifecycle where background scripts can be terminated and restarted by the browser at any time.",
      },
      {
        title: "Privacy-First Data Model",
        desc: "Designed all data persistence around chrome.storage.local with zero external dependencies or network requests, ensuring complete user privacy by default.",
      },
      {
        title: "Minimal Background Footprint",
        desc: "Core scheduled jobs run as event-driven Manifest V3 service workers, keeping background RAM usage minimal and complying with Chrome's modern sandboxing constraints.",
      },
    ],
  },
  {
    title: "Air Pollution Forecasting",
    subtitle: "Urban Air Quality ML System (COMP9417) — High Distinction",
    category: "ai",
    tags: ["Python", "scikit-learn", "XGBoost", "Pandas"],
    overview: {
      description:
        "A group ML system forecasting urban pollutant levels one hour ahead from 9,358 hourly road-level sensor readings (UCI Air Quality dataset) — CO, NOx, NO₂, and benzene. I built the regression pipeline; the project received a High Distinction.",
      stack: [
        "Python",
        "scikit-learn",
        "XGBoost",
        "Pandas",
        "UCI Air Quality",
        "Team of 4",
      ],
    },
    architecture: {
      description:
        "Missing readings arrive encoded as -200; they are treated as nulls and imputed during preprocessing. My regression pipeline predicts t+1 concentrations for all four pollutants; the broader system adds CO band classification (Low/Mid/High) and residual-based anomaly detection.",
      flow: [
        [
          { text: "Sensor data", tone: "base" },
          { text: " → impute -200 nulls → " },
          { text: "Preprocessing", tone: "green" },
        ],
        [
          { text: "Linear / RF / XGBoost", tone: "green" },
          { text: " → RMSE benchmark → " },
          { text: "XGBoost", tone: "amber" },
          { text: " (best on all 4)" },
        ],
        [
          { text: "Residuals", tone: "amber" },
          { text: " → 99th percentile threshold → " },
          { text: "Anomaly flags", tone: "base" },
        ],
      ],
    },
    challenges: [
      {
        title: "Model Benchmarking",
        desc: "Benchmarked Linear Regression against ensemble methods (Random Forest, XGBoost) using RMSE as the primary metric — XGBoost was the best performer across all four pollutants.",
      },
      {
        title: "Messy Sensor Data",
        desc: "Missing readings were encoded as -200 rather than null; treated as nulls and imputed during preprocessing before any modelling.",
      },
      {
        title: "Anomaly Detection",
        desc: "Residual-based method flagging deviations beyond the 99th percentile of absolute residuals — separating sensor faults and pollution spikes from normal variation.",
      },
    ],
  },
  {
    title: "Vehicle Insurance Risk Modelling",
    subtitle: "End-to-End ML Pipeline (COMP9321)",
    category: "ai",
    tags: ["Python", "LightGBM", "XGBoost", "scikit-learn"],
    overview: {
      description:
        'From 40,194 labelled policies (33 raw columns), predicts a continuous vehicle safety rating (regression) and whether a policyholder will lodge a claim (classification with a severe ~94/6 class imbalance). The full pipeline runs in about a minute on a laptop CPU.',
      stack: [
        "pandas",
        "scikit-learn",
        "LightGBM",
        "XGBoost",
        "7-Model Ensemble",
        "Leakage-Safe Prep",
      ],
    },
    architecture: {
      description:
        'Messy string columns are parsed into numeric features ("91Nm@4250rpm" becomes torque + RPM) and a stringified vehicle-features list expands into 17 binary safety flags, plus domain ratios and log transforms. Regression uses a weighted ensemble of four gradient-boosted regressors; classification feeds the predicted safety rating in as an extra feature, with three classifiers voting by averaged probability.',
      flow: [
        [
          { text: "Raw strings", tone: "base" },
          { text: " → parse & engineer → " },
          { text: "Features", tone: "green" },
          { text: " (+17 safety flags)" },
        ],
        [
          { text: "4 GB regressors", tone: "green" },
          { text: " → weighted ensemble → " },
          { text: "Safety rating", tone: "amber" },
        ],
        [
          { text: "Rating as feature", tone: "amber" },
          { text: " → 3 classifiers → " },
          { text: "Averaged-probability vote", tone: "base" },
        ],
      ],
    },
    challenges: [
      {
        title: "Leakage-Safe Preprocessing",
        desc: "A single preprocess() applied independently to train and test: medians imputed from training data only, unseen categories mapped to -1 instead of crashing — no target information ever crosses over.",
      },
      {
        title: "Severe Class Imbalance",
        desc: "The ~94/6 claim imbalance is handled at the algorithm level (class_weight='balanced' / scale_pos_weight), avoiding the leakage risks of oversampling.",
      },
      {
        title: "Tuning vs. Feature Engineering",
        desc: "RandomizedSearchCV hyperparameter tuning bought almost nothing over baselines on an 80/20 validation split — which motivated investing in feature engineering and multi-model ensembling instead.",
      },
    ],
  },
];
