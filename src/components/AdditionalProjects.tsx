import { useInView } from '../hooks/useInView'

interface Project {
  title: string
  description: string
  highlights: string[]
  tags: string[]
  icon: React.ReactNode
}

const TAG_CLASSES = 'rounded-md border border-stone-200 bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'

const PROJECTS: Project[] = [
  {
    title: 'Drone Search & Rescue',
    description:
      'Edge AI prototype for real-time human detection on resource-constrained drone hardware. Optimized inference pipeline for sub-second detection at altitude.',
    highlights: [
      'YOLO object detection with ONNX Runtime optimization',
      'Custom frame-skipping algorithm for Raspberry Pi thermals',
      'Edge inference under 200ms per frame on ARM hardware',
    ],
    tags: ['Python', 'YOLO', 'ONNX', 'Raspberry Pi'],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    title: 'Productivity Chrome Extension',
    description:
      'Privacy-first browser extension for productivity tracking. All data stays client-side with zero network calls — built on Manifest V3 architecture.',
    highlights: [
      'Manifest V3 service worker architecture',
      'chrome.storage.local for privacy-first data persistence',
      'Zero external dependencies or network requests',
    ],
    tags: ['JavaScript', 'Manifest V3', 'Chrome APIs'],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
      </svg>
    ),
  },
  {
    title: 'QR Attendance Tracker',
    description:
      'Serverless event attendance system built on Azure Functions with high-throughput QR code scanning and PostgreSQL-backed analytics.',
    highlights: [
      'Azure Functions with HTTP-triggered serverless endpoints',
      'PostgreSQL relational indexing for fast query performance',
      'High-scale event routing for concurrent scan processing',
    ],
    tags: ['Azure Functions', 'PostgreSQL', 'Serverless'],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
      </svg>
    ),
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className={`group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-500 dark:bg-zinc-800 dark:text-zinc-400">
        {project.icon}
      </div>

      <h3 className="mb-2 text-lg font-bold text-stone-900 dark:text-zinc-100">{project.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-stone-500 dark:text-zinc-400">
        {project.description}
      </p>

      {/* Highlights */}
      <ul className="mb-6 flex-1 space-y-2">
        {project.highlights.map(h => (
          <li key={h} className="flex items-start gap-2 text-sm text-stone-600 dark:text-zinc-400">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-700 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {h}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span key={tag} className={TAG_CLASSES}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function AdditionalProjects() {
  return (
    <section id="projects" className="border-t border-stone-200 px-6 py-24 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-2 font-mono text-sm font-medium text-green-700 dark:text-teal-400">
            Engineering Projects
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-zinc-100">
            Additional Work
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-stone-500 dark:text-zinc-400">
            From edge AI to serverless systems — projects that push into different domains
            of the engineering stack.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
