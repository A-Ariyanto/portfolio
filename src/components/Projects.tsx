import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import VideoModal from "./VideoModal";

type TabId = "overview" | "architecture" | "challenges";

interface ProjectTab {
  id: TabId;
  label: string;
  content: React.ReactNode;
}

type CategoryId = "fullstack" | "ai";

// To add a category (e.g. Security): extend CategoryId, add an entry here,
// and tag projects with the new id — the tab and filtering come for free.
const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "fullstack", label: "Full-Stack" },
  { id: "ai", label: "AI & Machine Learning" },
];

interface Project {
  title: string;
  subtitle: string;
  category: CategoryId;
  tags: string[];
  tabs: ProjectTab[];
  videoUrl?: string;
  starred?: boolean;
}

const TAG_CLASSES =
  "rounded-md border border-stone-200 bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";

const PROJECTS: Project[] = [
  {
    title: "UNSW Handbook RAG",
    subtitle: "Grounded Course-Enrolment Q&A — Ongoing",
    category: "ai",
    tags: ["FastAPI", "pgvector", "RAG", "SSE"],
    starred: true,
    tabs: [
      {
        id: "overview",
        label: "Overview",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              A retrieval-augmented generation service that answers real UNSW
              enrolment questions with short, citation-grounded answers linking
              to the exact handbook sections. Built end-to-end — scraper &rarr;
              hybrid retrieval &rarr; streaming API &rarr; measured evaluation.
              On a 34-question golden set: 93% grounded, 96% cited, hybrid hit@5
              93%.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "FastAPI",
                "PostgreSQL + pgvector",
                "sentence-transformers",
                "DeepSeek API",
                "SSE Streaming",
                "Docker + CI",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: "architecture",
        label: "Architecture",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              A rate-limited, resumable scraper feeds a structure-aware chunker
              (splitting by section semantics, not fixed token windows) into one
              Postgres table holding both a vector(384) embedding column and a
              GIN-indexed tsvector. Queries fuse vector-KNN and full-text search
              with Reciprocal Rank Fusion in a single SQL round-trip; a tuned
              refusal threshold gates generation before streaming over SSE.
            </p>
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="space-y-2 text-stone-500 dark:text-zinc-500">
                <p>
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    Scraper
                  </span>{" "}
                  &rarr; structure-aware chunker &rarr;{" "}
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    Postgres
                  </span>{" "}
                  (vector(384) + tsvector)
                </p>
                <p>
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    Vector-KNN + full-text
                  </span>{" "}
                  &rarr; RRF fusion &rarr;{" "}
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    refusal gate
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    /ask
                  </span>{" "}
                  &rarr; SSE (meta &rarr; token &rarr; done) &rarr;{" "}
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    citations [n] + query_logs
                  </span>
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "challenges",
        label: "Challenges Solved",
        content: (
          <div className="space-y-3">
            {[
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
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-stone-200 p-4 dark:border-zinc-800"
              >
                <h4 className="mb-1 text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    title: "AuraList",
    subtitle: "AI Task Breakdown & Planning App — In Development",
    category: "fullstack",
    tags: ["React", "Express", "Gemini API", "Google OAuth"],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              Describe a big goal in chat and the AI breaks it into an
              actionable checklist, then track the steps on a to-do list or
              drag-and-drop kanban board and export them to Google Calendar and
              Google Tasks. Initial dev version complete; actively developing
              toward release.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "React 19 + Vite",
                "Tailwind CSS 4",
                "Express (Node.js)",
                "Google Gemini API",
                "OAuth 2.0",
                "Calendar & Tasks APIs",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: "architecture",
        label: "Architecture",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              Three views — AI chat, to-do list, and kanban board — share one
              task store persisted client-side in localStorage. Google sign-in
              happens entirely client-side in a popup, while the Gemini API key
              stays server-side behind an Express backend.
            </p>
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="space-y-2 text-stone-500 dark:text-zinc-500">
                <p>
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    Chat UI
                  </span>{" "}
                  &rarr; Express backend &rarr;{" "}
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    Gemini API
                  </span>{" "}
                  (key server-side)
                </p>
                <p>
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    OAuth popup
                  </span>{" "}
                  &rarr; token stays in browser &rarr;{" "}
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    Calendar &amp; Tasks APIs
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    Task store
                  </span>{" "}
                  &rarr; localStorage &rarr;{" "}
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    To-do / Kanban views
                  </span>
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "challenges",
        label: "Challenges Solved",
        content: (
          <div className="space-y-3">
            {[
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
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-stone-200 p-4 dark:border-zinc-800"
              >
                <h4 className="mb-1 text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    title: "POS & Inventory System",
    subtitle: "Containerized Point-of-Sale Platform",
    category: "fullstack",
    tags: ["Django", "Docker", "PostgreSQL", "React"],
    starred: true,
    tabs: [
      {
        id: "overview",
        label: "Overview",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              A containerized POS dashboard for managing sales categories,
              inventory, real-time checkout, and sales analytics, built on a
              multi-container Docker Compose architecture with a GitHub Actions
              pipeline running integration tests on changes. Currently resolving
              local bugs, with GCP deployment as the next milestone.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "Django REST",
                "React Frontend",
                "PostgreSQL",
                "Docker Compose",
                "Nginx Proxy",
                "GitHub Actions",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: "architecture",
        label: "Architecture",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              Multi-container orchestration via Docker Compose. A multi-stage
              build compiles the frontend and serves it via Nginx as a reverse
              proxy, Django runs over WSGI, and PostgreSQL runs as an isolated
              data layer with persistent volumes.
            </p>
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="space-y-2 text-stone-500 dark:text-zinc-500">
                <p>
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    Nginx
                  </span>{" "}
                  :80 &rarr; proxy_pass &rarr;{" "}
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    Django (WSGI)
                  </span>{" "}
                  :8000
                </p>
                <p>
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    Django
                  </span>{" "}
                  &harr;{" "}
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    PostgreSQL
                  </span>{" "}
                  :5432 (persistent volume)
                </p>
                <p>
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    React
                  </span>{" "}
                  &rarr; DRF REST API &rarr; serialized JSON responses
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "challenges",
        label: "Challenges Solved",
        content: (
          <div className="space-y-3">
            {[
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
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-stone-200 p-4 dark:border-zinc-800"
              >
                <h4 className="mb-1 text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    title: "License Plate Detection & Reading",
    subtitle: "YOLO26 + OCR Pipeline — Ongoing ML Project",
    category: "ai",
    tags: ["Python", "YOLO26", "EasyOCR", "OpenCV"],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              A two-stage computer vision pipeline: a fine-tuned YOLO26-nano
              model detects license plates, crops them, and EasyOCR reads the
              plate text. Reached 0.953 precision, 0.917 recall, and 0.961 mAP50
              on a 2,048-image validation set — after just 10 epochs of
              fine-tuning, with ~3 ms/image inference on a T4.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "Ultralytics YOLO26",
                "EasyOCR",
                "OpenCV",
                "Roboflow",
                "Google Colab (T4)",
                "Python",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: "architecture",
        label: "Architecture",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              An end-to-end pipeline: the License Plate Recognition dataset is
              downloaded programmatically from Roboflow Universe, a pretrained
              YOLO26-nano is fine-tuned at 640&times;640 with early stopping,
              then two-stage inference detects plates, crops them, and reads the
              text with an alphanumeric OCR allowlist.
            </p>
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="space-y-2 text-stone-500 dark:text-zinc-500">
                <p>
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    Roboflow dataset
                  </span>{" "}
                  &rarr; fine-tune &rarr;{" "}
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    YOLO26-nano
                  </span>{" "}
                  (640&times;640, early stopping)
                </p>
                <p>
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    Detect plates
                  </span>{" "}
                  &rarr; crop &rarr;{" "}
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    EasyOCR
                  </span>{" "}
                  (alphanumeric allowlist)
                </p>
                <p>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    Plate text
                  </span>{" "}
                  &rarr; annotate &rarr;{" "}
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    Saved outputs
                  </span>
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "challenges",
        label: "Challenges Solved",
        content: (
          <div className="space-y-3">
            {[
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
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-stone-200 p-4 dark:border-zinc-800"
              >
                <h4 className="mb-1 text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    title: "Presto — Slide Deck Web App",
    subtitle: "Full-Stack Presentation Editor (COMP6080)",
    category: "fullstack",
    tags: ["React", "TypeScript", "Express", "Vercel KV"],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              A lightweight slides.com alternative: a full single-page
              presentation editor with registration/login, a dashboard, and a
              slide editor supporting text, images, video, and
              syntax-highlighted code blocks — with slide re-ordering, theming,
              and preview mode. Deployed end-to-end on Vercel.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "React 19 + Vite",
                "TypeScript",
                "Tailwind CSS",
                "Express (Node.js)",
                "Vercel KV (Redis)",
                "Cypress + Vitest",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: "architecture",
        label: "Architecture",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              Both the React frontend and the Express backend deploy to Vercel,
              with presentation state persisted in Vercel KV (Redis) and
              stateless JWT-based session handling. Every merge passed a
              documented quality gate of lint, type-check, and a Cypress E2E
              regression suite.
            </p>
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="space-y-2 text-stone-500 dark:text-zinc-500">
                <p>
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    React SPA
                  </span>{" "}
                  &rarr; JWT auth &rarr;{" "}
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    Express API
                  </span>{" "}
                  (Vercel)
                </p>
                <p>
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    Express
                  </span>{" "}
                  &rarr; presentation state &rarr;{" "}
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    Vercel KV
                  </span>{" "}
                  (Redis)
                </p>
                <p>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    Merge gate
                  </span>{" "}
                  &rarr; lint + tsc + Cypress E2E &rarr;{" "}
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    Deploy
                  </span>
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "challenges",
        label: "Challenges Solved",
        content: (
          <div className="space-y-3">
            {[
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
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-stone-200 p-4 dark:border-zinc-800"
              >
                <h4 className="mb-1 text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    title: "Productivity Chrome Extension",
    subtitle: "Privacy-First Browser Productivity Tool",
    category: "fullstack",
    tags: ["React", "Tailwind CSS", "Manifest V3"],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              A privacy-first workspace extension with modular Pomodoro timers,
              local-first analytics charts, and real-time site blocking. All
              data stays client-side with zero network calls. In closed beta
              with 5+ users; planning a public release.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "React",
                "Tailwind CSS",
                "Manifest V3",
                "Service Workers",
                "chrome.storage.local",
                "Chrome APIs",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: "architecture",
        label: "Architecture",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              Built on Chrome's Manifest V3 with a service worker background
              script handling event listeners and state management. All
              persistence uses chrome.storage.local — no external servers, zero
              network requests.
            </p>
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="space-y-2 text-stone-500 dark:text-zinc-500">
                <p>
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    Popup UI
                  </span>{" "}
                  &rarr; message passing &rarr;{" "}
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    Service Worker
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    Service Worker
                  </span>{" "}
                  &rarr; event listeners &rarr;{" "}
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    chrome.storage.local
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    Storage
                  </span>{" "}
                  &rarr; local only &rarr;{" "}
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    Zero network calls
                  </span>
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "challenges",
        label: "Challenges Solved",
        content: (
          <div className="space-y-3">
            {[
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
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-stone-200 p-4 dark:border-zinc-800"
              >
                <h4 className="mb-1 text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    title: "Air Pollution Forecasting",
    subtitle: "Urban Air Quality ML System (COMP9417) — High Distinction",
    category: "ai",
    tags: ["Python", "scikit-learn", "XGBoost", "Pandas"],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              A group ML system forecasting urban pollutant levels one hour
              ahead from 9,358 hourly road-level sensor readings (UCI Air
              Quality dataset) — CO, NOx, NO₂, and benzene. I built the
              regression pipeline; the project received a High Distinction.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "Python",
                "scikit-learn",
                "XGBoost",
                "Pandas",
                "UCI Air Quality",
                "Team of 4",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: "architecture",
        label: "Architecture",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              Missing readings arrive encoded as −200; they are treated as nulls
              and imputed during preprocessing. My regression pipeline predicts
              t+1 concentrations for all four pollutants; the broader system
              adds CO band classification (Low/Mid/High) and residual-based
              anomaly detection.
            </p>
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="space-y-2 text-stone-500 dark:text-zinc-500">
                <p>
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    Sensor data
                  </span>{" "}
                  &rarr; impute −200 nulls &rarr;{" "}
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    Preprocessing
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    Linear / RF / XGBoost
                  </span>{" "}
                  &rarr; RMSE benchmark &rarr;{" "}
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    XGBoost
                  </span>{" "}
                  (best on all 4)
                </p>
                <p>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    Residuals
                  </span>{" "}
                  &rarr; 99th percentile threshold &rarr;{" "}
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    Anomaly flags
                  </span>
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "challenges",
        label: "Challenges Solved",
        content: (
          <div className="space-y-3">
            {[
              {
                title: "Model Benchmarking",
                desc: "Benchmarked Linear Regression against ensemble methods (Random Forest, XGBoost) using RMSE as the primary metric — XGBoost was the best performer across all four pollutants.",
              },
              {
                title: "Messy Sensor Data",
                desc: "Missing readings were encoded as −200 rather than null; treated as nulls and imputed during preprocessing before any modelling.",
              },
              {
                title: "Anomaly Detection",
                desc: "Residual-based method flagging deviations beyond the 99th percentile of absolute residuals — separating sensor faults and pollution spikes from normal variation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-stone-200 p-4 dark:border-zinc-800"
              >
                <h4 className="mb-1 text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    title: "Vehicle Insurance Risk Modelling",
    subtitle: "End-to-End ML Pipeline (COMP9321)",
    category: "ai",
    tags: ["Python", "LightGBM", "XGBoost", "scikit-learn"],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              From 40,194 labelled policies (33 raw columns), predicts a
              continuous vehicle safety rating (regression) and whether a
              policyholder will lodge a claim (classification with a severe
              ~94/6 class imbalance). The full pipeline runs in about a minute
              on a laptop CPU.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "pandas",
                "scikit-learn",
                "LightGBM",
                "XGBoost",
                "7-Model Ensemble",
                "Leakage-Safe Prep",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: "architecture",
        label: "Architecture",
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              Messy string columns are parsed into numeric features
              ("91Nm@4250rpm" becomes torque + RPM) and a stringified
              vehicle-features list expands into 17 binary safety flags, plus
              domain ratios and log transforms. Regression uses a weighted
              ensemble of four gradient-boosted regressors; classification feeds
              the predicted safety rating in as an extra feature, with three
              classifiers voting by averaged probability.
            </p>
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="space-y-2 text-stone-500 dark:text-zinc-500">
                <p>
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    Raw strings
                  </span>{" "}
                  &rarr; parse &amp; engineer &rarr;{" "}
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    Features
                  </span>{" "}
                  (+17 safety flags)
                </p>
                <p>
                  <span className="font-semibold text-green-700 dark:text-teal-400">
                    4 GB regressors
                  </span>{" "}
                  &rarr; weighted ensemble &rarr;{" "}
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    Safety rating
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    Rating as feature
                  </span>{" "}
                  &rarr; 3 classifiers &rarr;{" "}
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">
                    Averaged-probability vote
                  </span>
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "challenges",
        label: "Challenges Solved",
        content: (
          <div className="space-y-3">
            {[
              {
                title: "Leakage-Safe Preprocessing",
                desc: "A single preprocess() applied independently to train and test: medians imputed from training data only, unseen categories mapped to −1 instead of crashing — no target information ever crosses over.",
              },
              {
                title: "Severe Class Imbalance",
                desc: "The ~94/6 claim imbalance is handled at the algorithm level (class_weight='balanced' / scale_pos_weight), avoiding the leakage risks of oversampling.",
              },
              {
                title: "Tuning vs. Feature Engineering",
                desc: "RandomizedSearchCV hyperparameter tuning bought almost nothing over baselines on an 80/20 validation split — which motivated investing in feature engineering and multi-model ensembling instead.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-stone-200 p-4 dark:border-zinc-800"
              >
                <h4 className="mb-1 text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const { ref, inView } = useInView();

  const currentTab = project.tabs.find((t) => t.id === activeTab);

  return (
    <>
      <div
        ref={ref}
        className={`w-[85vw] max-w-[540px] shrink-0 snap-start overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-700 lg:w-[540px] dark:border-zinc-800 dark:bg-zinc-900 ${
          inView ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <div className="relative h-48 bg-stone-100 sm:h-56 dark:bg-zinc-800">
          {project.starred && (
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:border-amber-700/50 dark:bg-amber-900/30 dark:text-amber-400">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-lg border border-stone-200 bg-white/80 px-8 py-4 dark:border-zinc-700 dark:bg-zinc-800/80">
              <p className="font-mono text-sm font-medium text-stone-500 dark:text-zinc-400">
                Project Screenshot
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-zinc-100">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-stone-500 dark:text-zinc-500">
                {project.subtitle}
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-stone-800 dark:bg-teal-500 dark:text-zinc-950 dark:hover:bg-teal-400"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Watch Demo
            </button>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className={TAG_CLASSES}>
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-4 flex gap-1 rounded-lg border border-stone-200 bg-stone-50 p-1 dark:border-zinc-800 dark:bg-zinc-800/50">
            {project.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-stone-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
                    : "text-stone-500 hover:text-stone-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="min-h-[200px]">{currentTab?.content}</div>
        </div>
      </div>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${project.title} — Live Demo`}
        videoUrl={project.videoUrl}
      />
    </>
  );
}

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryId>(
    CATEGORIES[0].id,
  );
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  };

  // Recompute arrow visibility when the visible set changes (category switch).
  useEffect(updateScrollState, [activeCategory]);

  const visibleProjects = PROJECTS.filter(
    (p) => p.category === activeCategory,
  ).sort((a, b) => {
    if (a.starred && !b.starred) return -1;
    if (!a.starred && b.starred) return 1;
    return 0;
  });

  const selectCategory = (id: CategoryId) => {
    setActiveCategory(id);
    scrollRef.current?.scrollTo({ left: 0 });
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth =
      scrollRef.current.querySelector(":scope > div")?.clientWidth ?? 540;
    const gap = 32;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="projects"
      className="border-t border-stone-200 py-24 dark:border-zinc-800"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="mb-2 font-mono text-sm font-medium text-green-700 dark:text-teal-400">
              Engineering Projects
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-zinc-100">
              Featured Work
            </h2>
            <p className="mt-3 max-w-xl text-stone-500 dark:text-zinc-400">
              Deep technical case studies — architecture decisions, trade-offs,
              and the engineering challenges solved.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => scroll("left")}
              className="rounded-lg border border-stone-200 bg-white p-2.5 text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
              aria-label="Scroll left"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-lg border border-stone-200 bg-white p-2.5 text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
              aria-label="Scroll right"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-10 flex justify-center sm:justify-start">
          <div className="flex gap-1 rounded-lg border border-stone-200 bg-stone-50 p-1 dark:border-zinc-800 dark:bg-zinc-800/50">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat.id)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-white text-stone-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
                    : "text-stone-500 hover:text-stone-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        {!atStart && (
          <button
            onClick={() => scroll("left")}
            className="absolute top-1/2 left-4 z-10 hidden -translate-y-1/2 rounded-full border border-stone-200 bg-white/90 p-3 text-stone-600 shadow-lg backdrop-blur transition-colors hover:bg-white hover:text-stone-900 sm:flex dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            aria-label="Previous project"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        {!atEnd && (
          <button
            onClick={() => scroll("right")}
            className="absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 rounded-full border border-stone-200 bg-white/90 p-3 text-stone-600 shadow-lg backdrop-blur transition-colors hover:bg-white hover:text-stone-900 sm:flex dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            aria-label="Next project"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
        {/* Cards rest with their left edge at 30% of the centering gutter — between hard-left
            and fully centered. Bump the *0.3 / *0.7 pair toward 0.5 to center more, toward 0 for
            harder-left; pl + scroll-pl must match, and the two multipliers must sum to 1. */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="scrollbar-hide flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pl-[max(1.5rem,calc((100vw-540px)*0.2))] pr-[max(1.5rem,calc((100vw-540px)*0.8))] scroll-pl-[max(1.5rem,calc((100vw-540px)*0.3))] sm:[-webkit-mask-image:linear-gradient(to_right,transparent,#000_6rem,#000_calc(100%_-_6rem),transparent)] sm:[mask-image:linear-gradient(to_right,transparent,#000_6rem,#000_calc(100%_-_6rem),transparent)]"
        >
          {visibleProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
