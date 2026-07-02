import { useInView } from '../hooks/useInView'

export default function Leadership() {
  const { ref, inView } = useInView()

  return (
    <section id="leadership" className="border-t border-stone-200 px-6 py-24 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-2 font-mono text-sm font-medium text-green-700 dark:text-teal-400">
            Beyond Code
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-zinc-100">
            Leadership & Operational Excellence
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-stone-500 dark:text-zinc-400">
            Cross-functional capabilities developed through high-responsibility roles
            in both technical and operational environments.
          </p>
        </div>

        <div
          ref={ref}
          className={`grid gap-6 lg:grid-cols-2 ${inView ? '' : 'opacity-0'}`}
        >
          {/* Student Leadership */}
          <div
            className={`rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 ${
              inView ? 'animate-fade-in-up' : ''
            }`}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 dark:bg-zinc-800">
                <svg className="h-5 w-5 text-stone-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-stone-900 dark:text-zinc-100">Student Leadership</h3>
                <p className="text-sm text-stone-500 dark:text-zinc-500">
                  Islamic Society of UNSW — Secretary
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <h4 className="mb-1.5 text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  Infrastructure Migration
                </h4>
                <p className="text-sm leading-relaxed text-stone-500 dark:text-zinc-400">
                  Led the operational migration from legacy email chains to Microsoft Teams,
                  establishing structured channels, automated meeting scheduling, and
                  centralized document management for a 50+ member organization.
                </p>
              </div>

              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <h4 className="mb-1.5 text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  AI Automation Pipeline
                </h4>
                <p className="text-sm leading-relaxed text-stone-500 dark:text-zinc-400">
                  Built generative AI automation pipelines for meeting minutes, action item
                  extraction, and compliance documentation — reducing documentation latency
                  by 90% and eliminating manual transcription bottlenecks.
                </p>
              </div>

              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <h4 className="mb-1.5 text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  Operational Compliance
                </h4>
                <p className="text-sm leading-relaxed text-stone-500 dark:text-zinc-400">
                  Maintained compliance with Arc @ UNSW governance requirements, managing
                  financial reporting, event approval workflows, and cross-society coordination.
                </p>
              </div>
            </div>

            {/* Impact metric */}
            <div className="mt-5 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 dark:border-teal-500/20 dark:bg-teal-500/10">
              <span className="text-2xl font-bold text-green-700 dark:text-teal-400">90%</span>
              <span className="text-sm text-green-800 dark:text-teal-400/80">
                reduction in documentation latency via AI automation
              </span>
            </div>
          </div>

          {/* High-Stress Environments */}
          <div
            className={`rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 ${
              inView ? 'animate-fade-in-up animation-delay-200' : ''
            }`}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 dark:bg-zinc-800">
                <svg className="h-5 w-5 text-stone-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-stone-900 dark:text-zinc-100">High-Stress Operations</h3>
                <p className="text-sm text-stone-500 dark:text-zinc-500">
                  Hospitality — Sydney Harbour Hotel &amp; InterContinental
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <h4 className="mb-1.5 text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  Personnel Onboarding & Mentoring
                </h4>
                <p className="text-sm leading-relaxed text-stone-500 dark:text-zinc-400">
                  Trained and mentored new team members in high-volume service environments,
                  developing structured onboarding workflows that reduced time-to-competency
                  and ensured consistent service delivery under pressure.
                </p>
              </div>

              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <h4 className="mb-1.5 text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  Resource Optimization
                </h4>
                <p className="text-sm leading-relaxed text-stone-500 dark:text-zinc-400">
                  Managed real-time resource allocation across multiple service areas during
                  peak operations, balancing staffing levels, inventory constraints, and
                  customer flow to maintain service quality under variable demand.
                </p>
              </div>

              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <h4 className="mb-1.5 text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  Enterprise Systems (OPERA PMS)
                </h4>
                <p className="text-sm leading-relaxed text-stone-500 dark:text-zinc-400">
                  Operated Oracle OPERA Property Management System for real-time crisis
                  resolution — managing room allocations, billing disputes, and cross-department
                  coordination through an enterprise-grade property management platform.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {['Crisis Resolution', 'Team Mentoring', 'OPERA PMS', 'Resource Optimization'].map(skill => (
                <span
                  key={skill}
                  className="rounded-md border border-stone-200 bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
