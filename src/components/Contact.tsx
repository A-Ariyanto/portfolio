import { useInView } from '../hooks/useInView'

interface ContactLink {
  label: string
  handle: string
  href: string
  icon: React.ReactNode
}

// To add a channel (e.g. Instagram for photography): append an entry here —
// the card renders automatically.
const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'LinkedIn',
    handle: 'abdullah-ariyanto',
    href: 'https://linkedin.com/in/abdullah-ariyanto-19bb8525b',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    handle: 'A-Ariyanto',
    href: 'https://github.com/A-Ariyanto',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    handle: 'abdullahariyanto24@gmail.com',
    href: 'mailto:abdullahariyanto24@gmail.com',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const { ref, inView } = useInView()

  return (
    <section id="contact" className="border-t border-stone-200 py-24 dark:border-zinc-800">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-6 transition-all duration-700 ${
          inView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="mb-12 text-center">
          <p className="mb-2 font-mono text-sm font-medium text-green-700 dark:text-teal-400">
            Contact
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-zinc-100">
            Get in Touch
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-stone-500 dark:text-zinc-400">
            The fastest ways to reach me — happy to talk about roles, projects, or collaboration.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          {CONTACT_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              {...(link.href.startsWith('mailto:')
                ? {}
                : { target: '_blank', rel: 'noopener noreferrer' })}
              className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-stone-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600 transition-colors group-hover:bg-stone-900 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-teal-500 dark:group-hover:text-zinc-950">
                {link.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-stone-900 dark:text-zinc-100">
                  {link.label}
                </p>
                <p className="truncate text-sm text-stone-500 dark:text-zinc-500">{link.handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
