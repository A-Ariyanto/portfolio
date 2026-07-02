import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import VideoModal from './VideoModal'

type TabId = 'overview' | 'architecture' | 'challenges'

interface ProjectTab {
  id: TabId
  label: string
  content: React.ReactNode
}

interface FlagshipProject {
  title: string
  subtitle: string
  tags: { label: string; color: string }[]
  tabs: ProjectTab[]
  videoUrl?: string
  gradient: string
}

const PROJECTS: FlagshipProject[] = [
  {
    title: 'Task Breakdown App',
    subtitle: 'AI-Powered Task Orchestration Platform',
    gradient: 'from-indigo-500/20 via-indigo-600/10 to-transparent dark:from-indigo-500/10 dark:via-indigo-600/5',
    tags: [
      { label: 'React', color: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20' },
      { label: 'Firebase', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
      { label: 'Azure', color: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20' },
      { label: 'GPT API', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' },
    ],
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              A full-stack AI-powered application that intelligently decomposes complex tasks into
              actionable subtasks. Built with a split-infrastructure approach separating the client
              hosting layer from the secure AI orchestration backend.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {['React + TypeScript', 'Firebase Hosting', 'Azure App Service', 'OpenAI GPT API', 'JWT Auth', 'REST API'].map(item => (
                <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
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
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              Deliberately split across two cloud providers: Firebase handles static hosting and
              client-side auth, while Azure App Service runs the secured Python backend that
              interfaces with the GPT API. This isolation ensures API keys never touch the client.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-700 dark:bg-slate-800/50">
              <div className="space-y-2 text-slate-600 dark:text-slate-400">
                <p><span className="text-indigo-600 dark:text-indigo-400">Client</span> (Firebase) &rarr; JWT Token &rarr; <span className="text-emerald-600 dark:text-emerald-400">Backend</span> (Azure)</p>
                <p><span className="text-emerald-600 dark:text-emerald-400">Backend</span> verifies JWT &rarr; calls GPT API &rarr; returns structured response</p>
                <p><span className="text-amber-600 dark:text-amber-400">Firebase Auth</span> issues tokens &rarr; Backend validates with Firebase Admin SDK</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'challenges',
        label: 'Challenges Solved',
        content: (
          <div className="space-y-4">
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
                <div key={item.title} className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
                  <h4 className="mb-1 text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ],
  },
  {
    title: 'POS & Inventory System',
    subtitle: 'Containerized Point-of-Sale Platform',
    gradient: 'from-emerald-500/20 via-emerald-600/10 to-transparent dark:from-emerald-500/10 dark:via-emerald-600/5',
    tags: [
      { label: 'Django', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' },
      { label: 'Docker', color: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20' },
      { label: 'PostgreSQL', color: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20' },
      { label: 'React', color: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20' },
    ],
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: (
          <div className="space-y-4">
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              An enterprise-grade point-of-sale and inventory management system built with a
              multi-container Docker Compose architecture. Features real-time inventory tracking,
              transaction processing, and a clean API contract between frontend and backend services.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {['Django REST', 'React Frontend', 'PostgreSQL', 'Docker Compose', 'Nginx Proxy', 'Gunicorn'].map(item => (
                <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
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
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              Multi-container orchestration via Docker Compose. Nginx handles reverse proxying and
              static asset serving, Gunicorn manages Django worker processes, and PostgreSQL runs as
              an isolated data layer with persistent volumes.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-700 dark:bg-slate-800/50">
              <div className="space-y-2 text-slate-600 dark:text-slate-400">
                <p><span className="text-cyan-600 dark:text-cyan-400">Nginx</span> :80 &rarr; proxy_pass &rarr; <span className="text-emerald-600 dark:text-emerald-400">Gunicorn</span> :8000</p>
                <p><span className="text-emerald-600 dark:text-emerald-400">Django</span> &harr; <span className="text-indigo-600 dark:text-indigo-400">PostgreSQL</span> :5432 (persistent volume)</p>
                <p><span className="text-cyan-600 dark:text-cyan-400">React</span> &rarr; DRF REST API &rarr; serialized JSON responses</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'challenges',
        label: 'Challenges Solved',
        content: (
          <div className="space-y-4">
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
                <div key={item.title} className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
                  <h4 className="mb-1 text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ],
  },
]

function ProjectCard({ project }: { project: FlagshipProject }) {
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [modalOpen, setModalOpen] = useState(false)
  const { ref, inView } = useInView()

  const currentTab = project.tabs.find(t => t.id === activeTab)

  return (
    <>
      <div
        ref={ref}
        className={`overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-700 dark:border-slate-800 dark:bg-slate-900/50 ${
          inView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        {/* Project image placeholder */}
        <div className={`relative h-48 bg-gradient-to-br ${project.gradient} sm:h-56`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 backdrop-blur-sm">
              <p className="font-mono text-sm font-medium text-slate-700 dark:text-slate-300">
                Project Screenshot
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{project.subtitle}</p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </button>
          </div>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                key={tag.label}
                className={`rounded-md border px-2.5 py-1 text-xs font-medium ${tag.color}`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          {/* Tabs */}
          <div className="mb-4 flex gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800/50">
            {project.tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
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

export default function FlagshipProjects() {
  return (
    <section id="flagship" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-2 font-mono text-sm font-medium text-indigo-600 dark:text-indigo-400">
            Featured Work
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            The Heavy Hitters
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-400">
            Flagship projects with deep technical case studies — architecture decisions,
            trade-offs, and the engineering challenges solved.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {PROJECTS.map(project => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
