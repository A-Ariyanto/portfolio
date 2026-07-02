import { useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import VideoModal from './VideoModal'

type TabId = 'overview' | 'architecture' | 'challenges'

interface ProjectTab {
  id: TabId
  label: string
  content: React.ReactNode
}

interface Project {
  title: string
  subtitle: string
  tags: string[]
  tabs: ProjectTab[]
  videoUrl?: string
  starred?: boolean
}

const TAG_CLASSES = 'rounded-md border border-stone-200 bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'

const PROJECTS: Project[] = [
  {
    title: 'Task Breakdown App',
    subtitle: 'AI-Powered Task Orchestration Platform',
    tags: ['React', 'Firebase', 'Azure', 'GPT API'],
    starred: true,
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              A full-stack AI-powered application that intelligently decomposes complex tasks into
              actionable subtasks. Built with a split-infrastructure approach separating the client
              hosting layer from the secure AI orchestration backend.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {['React + TypeScript', 'Firebase Hosting', 'Azure App Service', 'OpenAI GPT API', 'JWT Auth', 'REST API'].map(item => (
                <div key={item} className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: 'architecture',
        label: 'Architecture',
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              Deliberately split across two cloud providers: Firebase handles static hosting and
              client-side auth, while Azure App Service runs the secured Python backend that
              interfaces with the GPT API. This isolation ensures API keys never touch the client.
            </p>
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="space-y-2 text-stone-500 dark:text-zinc-500">
                <p><span className="font-semibold text-stone-800 dark:text-zinc-200">Client</span> (Firebase) &rarr; JWT Token &rarr; <span className="font-semibold text-green-700 dark:text-teal-400">Backend</span> (Azure)</p>
                <p><span className="font-semibold text-green-700 dark:text-teal-400">Backend</span> verifies JWT &rarr; calls GPT API &rarr; returns structured response</p>
                <p><span className="font-semibold text-amber-700 dark:text-amber-400">Firebase Auth</span> issues tokens &rarr; Backend validates with Firebase Admin SDK</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'challenges',
        label: 'Challenges Solved',
        content: (
          <div className="space-y-3">
            {[
              {
                title: 'JWT Handshake Verification',
                desc: 'Implemented a cross-provider authentication flow where Firebase-issued JWTs are verified server-side by the Azure backend using the Firebase Admin SDK, establishing a zero-trust boundary between client and API.',
              },
              {
                title: 'API Key Security',
                desc: 'Ensured OpenAI API credentials never reach the client by routing all AI calls through the Azure backend, with environment-variable injection and request-rate limiting.',
              },
              {
                title: 'Split Infrastructure Coordination',
                desc: 'Managed CI/CD across two separate cloud platforms — Firebase deploy for frontend, Azure App Service deploy for backend — while maintaining version compatibility.',
              },
            ].map(item => (
              <div key={item.title} className="rounded-lg border border-stone-200 p-4 dark:border-zinc-800">
                <h4 className="mb-1 text-sm font-semibold text-stone-900 dark:text-zinc-100">{item.title}</h4>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    title: 'POS & Inventory System',
    subtitle: 'Containerized Point-of-Sale Platform',
    tags: ['Django', 'Docker', 'PostgreSQL', 'React'],
    starred: true,
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              An enterprise-grade point-of-sale and inventory management system built with a
              multi-container Docker Compose architecture. Features real-time inventory tracking,
              transaction processing, and a clean API contract between frontend and backend services.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {['Django REST', 'React Frontend', 'PostgreSQL', 'Docker Compose', 'Nginx Proxy', 'Gunicorn'].map(item => (
                <div key={item} className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: 'architecture',
        label: 'Architecture',
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              Multi-container orchestration via Docker Compose. Nginx handles reverse proxying and
              static asset serving, Gunicorn manages Django worker processes, and PostgreSQL runs as
              an isolated data layer with persistent volumes.
            </p>
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="space-y-2 text-stone-500 dark:text-zinc-500">
                <p><span className="font-semibold text-stone-800 dark:text-zinc-200">Nginx</span> :80 &rarr; proxy_pass &rarr; <span className="font-semibold text-green-700 dark:text-teal-400">Gunicorn</span> :8000</p>
                <p><span className="font-semibold text-green-700 dark:text-teal-400">Django</span> &harr; <span className="font-semibold text-amber-700 dark:text-amber-400">PostgreSQL</span> :5432 (persistent volume)</p>
                <p><span className="font-semibold text-stone-800 dark:text-zinc-200">React</span> &rarr; DRF REST API &rarr; serialized JSON responses</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'challenges',
        label: 'Challenges Solved',
        content: (
          <div className="space-y-3">
            {[
              {
                title: 'Concurrency & Race Conditions',
                desc: 'Solved inventory race conditions during simultaneous transactions using Django\'s select_for_update() with row-level locking and atomic transaction blocks to guarantee data consistency.',
              },
              {
                title: 'DRF API Contract Design',
                desc: 'Designed a strict, versioned REST API contract using Django REST Framework serializers, ensuring frontend-backend decoupling and enabling independent deployment cycles.',
              },
              {
                title: 'Multi-Container Orchestration',
                desc: 'Configured Docker Compose networking, health checks, and startup ordering to ensure PostgreSQL is ready before Django attempts migrations, preventing cold-start failures.',
              },
            ].map(item => (
              <div key={item.title} className="rounded-lg border border-stone-200 p-4 dark:border-zinc-800">
                <h4 className="mb-1 text-sm font-semibold text-stone-900 dark:text-zinc-100">{item.title}</h4>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    title: 'Drone Search & Rescue',
    subtitle: 'Edge AI Real-Time Detection System',
    tags: ['Python', 'YOLO', 'ONNX', 'Raspberry Pi'],
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              Edge AI prototype for real-time human detection on resource-constrained drone hardware.
              Optimized inference pipeline for sub-second detection at altitude with minimal power
              draw on ARM processors.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {['Python', 'YOLOv8', 'ONNX Runtime', 'Raspberry Pi', 'OpenCV', 'Edge AI'].map(item => (
                <div key={item} className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: 'architecture',
        label: 'Architecture',
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              A lightweight inference pipeline running entirely on-device. Camera frames are
              preprocessed, fed through an ONNX-optimized YOLO model, and results are filtered
              with confidence thresholding — all within a thermal budget safe for sustained flight.
            </p>
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="space-y-2 text-stone-500 dark:text-zinc-500">
                <p><span className="font-semibold text-stone-800 dark:text-zinc-200">Camera</span> &rarr; frame capture &rarr; <span className="font-semibold text-green-700 dark:text-teal-400">Preprocessing</span> (resize, normalize)</p>
                <p><span className="font-semibold text-green-700 dark:text-teal-400">ONNX Runtime</span> &rarr; YOLOv8 inference &rarr; <span className="font-semibold text-amber-700 dark:text-amber-400">NMS filtering</span></p>
                <p><span className="font-semibold text-amber-700 dark:text-amber-400">Detections</span> &rarr; confidence threshold &rarr; <span className="font-semibold text-stone-800 dark:text-zinc-200">Alert output</span></p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'challenges',
        label: 'Challenges Solved',
        content: (
          <div className="space-y-3">
            {[
              {
                title: 'ONNX Runtime Optimization',
                desc: 'Converted YOLO model to ONNX format with quantization to achieve sub-200ms inference on ARM hardware without GPU acceleration.',
              },
              {
                title: 'Thermal Management',
                desc: 'Custom frame-skipping algorithm that dynamically adjusts inference frequency based on Raspberry Pi CPU temperature to prevent thermal throttling during sustained flight.',
              },
              {
                title: 'Edge Inference Pipeline',
                desc: 'Built an end-to-end detection pipeline that runs entirely on-device with no cloud dependency, achieving real-time performance under severe resource constraints.',
              },
            ].map(item => (
              <div key={item.title} className="rounded-lg border border-stone-200 p-4 dark:border-zinc-800">
                <h4 className="mb-1 text-sm font-semibold text-stone-900 dark:text-zinc-100">{item.title}</h4>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    title: 'Productivity Chrome Extension',
    subtitle: 'Privacy-First Browser Productivity Tool',
    tags: ['JavaScript', 'Manifest V3', 'Chrome APIs'],
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              Privacy-first browser extension for productivity tracking. All data stays client-side
              with zero network calls — built on Manifest V3 architecture with modern service worker
              patterns.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {['JavaScript', 'Manifest V3', 'Service Workers', 'Chrome Storage', 'Chrome APIs', 'CSS3'].map(item => (
                <div key={item} className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: 'architecture',
        label: 'Architecture',
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              Built on Chrome's Manifest V3 with a service worker background script handling event
              listeners and state management. All persistence uses chrome.storage.local — zero
              external dependencies, zero network requests.
            </p>
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="space-y-2 text-stone-500 dark:text-zinc-500">
                <p><span className="font-semibold text-stone-800 dark:text-zinc-200">Popup UI</span> &rarr; message passing &rarr; <span className="font-semibold text-green-700 dark:text-teal-400">Service Worker</span></p>
                <p><span className="font-semibold text-green-700 dark:text-teal-400">Service Worker</span> &rarr; event listeners &rarr; <span className="font-semibold text-amber-700 dark:text-amber-400">chrome.storage.local</span></p>
                <p><span className="font-semibold text-amber-700 dark:text-amber-400">Storage</span> &rarr; local only &rarr; <span className="font-semibold text-stone-800 dark:text-zinc-200">Zero network calls</span></p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'challenges',
        label: 'Challenges Solved',
        content: (
          <div className="space-y-3">
            {[
              {
                title: 'Manifest V3 Migration',
                desc: 'Adopted service worker architecture from scratch, handling the event-driven lifecycle where background scripts can be terminated and restarted by the browser at any time.',
              },
              {
                title: 'Privacy-First Data Model',
                desc: 'Designed all data persistence around chrome.storage.local with zero external dependencies or network requests, ensuring complete user privacy by default.',
              },
              {
                title: 'Zero-Dependency Architecture',
                desc: 'Built the entire extension without external libraries — pure JavaScript, CSS, and Chrome APIs — keeping the extension lightweight and audit-friendly.',
              },
            ].map(item => (
              <div key={item.title} className="rounded-lg border border-stone-200 p-4 dark:border-zinc-800">
                <h4 className="mb-1 text-sm font-semibold text-stone-900 dark:text-zinc-100">{item.title}</h4>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    title: 'QR Attendance Tracker',
    subtitle: 'Serverless Event Management System',
    tags: ['Azure Functions', 'PostgreSQL', 'Serverless'],
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              Serverless event attendance system built on Azure Functions with high-throughput QR
              code scanning and PostgreSQL-backed analytics. Scales to zero when idle and handles
              burst traffic during event check-ins.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {['Azure Functions', 'PostgreSQL', 'QR Generation', 'Serverless', 'REST API', 'Analytics'].map(item => (
                <div key={item} className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: 'architecture',
        label: 'Architecture',
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
              HTTP-triggered Azure Functions handle QR code generation and scan validation.
              PostgreSQL stores attendee records with relational indexing for fast aggregate queries
              and real-time attendance dashboards.
            </p>
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="space-y-2 text-stone-500 dark:text-zinc-500">
                <p><span className="font-semibold text-stone-800 dark:text-zinc-200">QR Scan</span> &rarr; HTTP trigger &rarr; <span className="font-semibold text-green-700 dark:text-teal-400">Azure Function</span></p>
                <p><span className="font-semibold text-green-700 dark:text-teal-400">Function</span> &rarr; validate &amp; record &rarr; <span className="font-semibold text-amber-700 dark:text-amber-400">PostgreSQL</span></p>
                <p><span className="font-semibold text-amber-700 dark:text-amber-400">Database</span> &rarr; indexed queries &rarr; <span className="font-semibold text-stone-800 dark:text-zinc-200">Analytics dashboard</span></p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'challenges',
        label: 'Challenges Solved',
        content: (
          <div className="space-y-3">
            {[
              {
                title: 'Cold Start Optimization',
                desc: 'Minimized Azure Functions cold start latency through lightweight function design and connection pooling to PostgreSQL, ensuring responsive QR scan validation even after idle periods.',
              },
              {
                title: 'Concurrent Scan Processing',
                desc: 'Handled burst traffic during event check-ins where hundreds of attendees scan simultaneously, using connection pooling and optimistic concurrency control.',
              },
              {
                title: 'Relational Query Performance',
                desc: 'Designed PostgreSQL schema with composite indexes and materialized views for real-time attendance analytics without impacting scan-processing throughput.',
              },
            ].map(item => (
              <div key={item.title} className="rounded-lg border border-stone-200 p-4 dark:border-zinc-800">
                <h4 className="mb-1 text-sm font-semibold text-stone-900 dark:text-zinc-100">{item.title}</h4>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
]

const sortedProjects = [...PROJECTS].sort((a, b) => {
  if (a.starred && !b.starred) return -1
  if (!a.starred && b.starred) return 1
  return 0
})

function ProjectCard({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [modalOpen, setModalOpen] = useState(false)
  const { ref, inView } = useInView()

  const currentTab = project.tabs.find(t => t.id === activeTab)

  return (
    <>
      <div
        ref={ref}
        className={`w-[85vw] max-w-[540px] shrink-0 snap-start overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-700 lg:w-[540px] dark:border-zinc-800 dark:bg-zinc-900 ${
          inView ? 'animate-fade-in-up' : 'opacity-0'
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
              <h3 className="text-xl font-bold text-stone-900 dark:text-zinc-100">{project.title}</h3>
              <p className="mt-1 text-sm text-stone-500 dark:text-zinc-500">{project.subtitle}</p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-stone-800 dark:bg-teal-500 dark:text-zinc-950 dark:hover:bg-teal-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </button>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className={TAG_CLASSES}>
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-4 flex gap-1 rounded-lg border border-stone-200 bg-stone-50 p-1 dark:border-zinc-800 dark:bg-zinc-800/50">
            {project.tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-stone-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100'
                    : 'text-stone-500 hover:text-stone-700 dark:text-zinc-400 dark:hover:text-zinc-300'
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
  )
}

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.querySelector(':scope > div')?.clientWidth ?? 540
    const gap = 32
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -(cardWidth + gap) : cardWidth + gap,
      behavior: 'smooth',
    })
  }

  return (
    <section id="projects" className="border-t border-stone-200 py-24 dark:border-zinc-800">
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
              Deep technical case studies — architecture decisions, trade-offs, and the engineering
              challenges solved.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => scroll('left')}
              className="rounded-lg border border-stone-200 bg-white p-2.5 text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
              aria-label="Scroll left"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="rounded-lg border border-stone-200 bg-white p-2.5 text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
              aria-label="Scroll right"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
      >
        {sortedProjects.map(project => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
