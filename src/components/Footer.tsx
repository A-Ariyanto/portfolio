export default function Footer() {
  return (
    <footer className="border-t border-slate-200 px-6 py-12 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-100">
            &lt;AA /&gt;
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Abdullah Ariyanto
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/A-Ariyanto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          >
            GitHub
          </a>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <a
            href="https://www.linkedin.com/in/abdullah-ariyanto-19bb8525b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
