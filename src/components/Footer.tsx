export default function Footer() {
  return (
    <footer className="border-t border-stone-200 px-6 py-12 dark:border-zinc-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm font-semibold text-stone-900 dark:text-zinc-100">
            &lt;AA /&gt;
          </span>
          <span className="text-sm text-stone-500 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} Abdullah Ariyanto
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/A-Ariyanto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-500 transition-colors hover:text-stone-900 dark:text-zinc-500 dark:hover:text-zinc-200"
          >
            GitHub
          </a>
          <span className="text-stone-300 dark:text-zinc-700">|</span>
          <a
            href="https://www.linkedin.com/in/abdullah-ariyanto/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-500 transition-colors hover:text-stone-900 dark:text-zinc-500 dark:hover:text-zinc-200"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
