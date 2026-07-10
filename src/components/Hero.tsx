export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="flex min-h-screen items-center px-6">
      {/* Hero content */}
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:justify-between">
        <div className="max-w-xl pt-12 sm:pt-0 lg:max-w-2xl mt-12">
          <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-zinc-50">
            Abdullah Ariyanto
          </h1>

          <p className="animate-fade-in-up animation-delay-100 mt-3 font-mono text-lg font-medium text-green-700 sm:text-xl dark:text-teal-400">
            Full-Stack Software Engineer
          </p>

          <p className="animate-fade-in-up animation-delay-200 mt-6 text-lg leading-relaxed text-stone-500 dark:text-zinc-400">
            Building containerized full-stack applications and practical
            machine learning systems. Focused on writing clean,
            production-grade software that scales.
          </p>

          {/* CTA buttons */}
          <div className="animate-fade-in-up animation-delay-300 mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-lg bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-800 dark:bg-teal-500 dark:text-zinc-950 dark:hover:bg-teal-400"
            >
              View Work
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 rounded-lg border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
            >
              Contact Me
            </button>
          </div>

          {/* Social links */}
          <div className="animate-fade-in-up animation-delay-400 mt-8 flex items-center gap-4">
            <a
              href="https://github.com/A-Ariyanto"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2.5 text-stone-400 transition-colors hover:text-stone-700 dark:text-zinc-500 dark:hover:text-zinc-300"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/abdullah-ariyanto/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2.5 text-stone-400 transition-colors hover:text-stone-700 dark:text-zinc-500 dark:hover:text-zinc-300"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Profile asset */}
        <div className="animate-fade-in animation-delay-300 relative flex shrink-0 items-center justify-center">
          <div
            className="absolute -right-6 -top-8 h-28 w-28 text-stone-300 dark:text-zinc-600"
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)",
              backgroundSize: "14px 14px",
            }}
            aria-hidden="true"
          />

          <div
            className="relative z-10 h-64 w-64 overflow-hidden sm:h-72 sm:w-72 lg:h-80 lg:w-80"
            style={{
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}profile-picture.png`}
              alt="Abdullah Ariyanto"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-fade-in animation-delay-600 absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block">
        <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-stone-300 p-1 dark:border-zinc-700">
          <div className="h-1.5 w-1 animate-bounce rounded-full bg-stone-400 dark:bg-zinc-500" />
        </div>
      </div>
    </section>
  );
}
