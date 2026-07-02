import { useInView } from '../hooks/useInView'

const JOURNEY_STEPS = [
  {
    phase: '01',
    title: 'Inheriting Legacy Code',
    description:
      'Received monolithic codebases with tangled dependencies, unclear ownership boundaries, and zero test coverage. Identified systemic bottlenecks through dependency mapping and runtime profiling.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    phase: '02',
    title: 'Applying OOD Principles',
    description:
      'Refactored toward strict SOLID principles: extracted single-responsibility classes, introduced dependency injection for testability, and established clear interface contracts between modules.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    phase: '03',
    title: 'Testing & Validation',
    description:
      'Built comprehensive test suites covering unit, integration, and edge-case scenarios. Introduced CI pipelines that enforce coverage thresholds and prevent regressions on every commit.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    phase: '04',
    title: 'Performance & Maintainability',
    description:
      'Delivered measurable performance gains through algorithmic optimization and architectural decoupling. Reduced cognitive complexity to enable faster onboarding and safer future changes.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

export default function Craftsmanship() {
  const { ref, inView } = useInView()

  return (
    <section id="craftsmanship" className="border-t border-stone-200 px-6 py-24 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-700 dark:border-zinc-800 dark:bg-zinc-900 ${
            inView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          {/* Header accent bar */}
          <div className="h-px bg-green-700 dark:bg-teal-500" />

          <div className="p-8 sm:p-12">
            {/* Section header */}
            <div className="mb-10">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 dark:border-zinc-700 dark:bg-zinc-800">
                <svg className="h-3.5 w-3.5 text-green-700 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="text-xs font-semibold text-stone-700 dark:text-zinc-300">Engineering Philosophy</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl dark:text-zinc-100">
                Software Craftsmanship & Architectural Refactoring
              </h2>
              <p className="mt-3 max-w-2xl text-stone-500 dark:text-zinc-400">
                Building great software isn't just about writing new features — it's about transforming
                existing systems into clean, testable, performant architectures through disciplined
                engineering practices.
              </p>
            </div>

            {/* Journey steps */}
            <div className="grid gap-6 sm:grid-cols-2">
              {JOURNEY_STEPS.map((step, i) => (
                <div
                  key={step.phase}
                  className={`group rounded-xl border border-stone-200 bg-stone-50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-zinc-700 ${
                    inView ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${200 + i * 100}ms` }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-200/60 text-stone-600 dark:bg-zinc-700 dark:text-zinc-400">
                      {step.icon}
                    </div>
                    <span className="font-mono text-xs font-bold text-stone-400 dark:text-zinc-600">
                      PHASE {step.phase}
                    </span>
                  </div>
                  <h3 className="mb-2 font-semibold text-stone-900 dark:text-zinc-100">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-500 dark:text-zinc-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
