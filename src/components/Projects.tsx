import { useEffect, useRef, useState } from "react";
import { CATEGORIES, PROJECTS, type CategoryId } from "../data/projects";
import ProjectCard from "./ProjectCard";

function Chevron({
  direction,
  className = "h-5 w-5",
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
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
              <Chevron direction="left" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-lg border border-stone-200 bg-white p-2.5 text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
              aria-label="Scroll right"
            >
              <Chevron direction="right" />
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
            <Chevron direction="left" className="h-6 w-6" />
          </button>
        )}
        {!atEnd && (
          <button
            onClick={() => scroll("right")}
            className="absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 rounded-full border border-stone-200 bg-white/90 p-3 text-stone-600 shadow-lg backdrop-blur transition-colors hover:bg-white hover:text-stone-900 sm:flex dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            aria-label="Next project"
          >
            <Chevron direction="right" className="h-6 w-6" />
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
