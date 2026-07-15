import { useState } from "react";
import { useInView } from "../hooks/useInView";
import type { Project } from "../data/projects";
import {
  OverviewPanel,
  ArchitecturePanel,
  ChallengesPanel,
} from "./ProjectTabPanels";
import VideoModal from "./VideoModal";

type TabId = "overview" | "architecture" | "challenges";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "challenges", label: "Challenges Solved" },
];

const TAG_CLASSES =
  "rounded-md border border-stone-200 bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";

export default function ProjectCard({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const { ref, inView } = useInView();

  return (
    <>
      <div
        ref={ref}
        className={`w-[85vw] max-w-[540px] shrink-0 snap-start overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-700 lg:w-[540px] dark:border-zinc-800 dark:bg-zinc-900 ${
          inView ? "animate-fade-in-up" : "opacity-0"
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
              <h3 className="text-xl font-bold text-stone-900 dark:text-zinc-100">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-stone-500 dark:text-zinc-500">
                {project.subtitle}
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-stone-800 dark:bg-teal-500 dark:text-zinc-950 dark:hover:bg-teal-400"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Watch Demo
            </button>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className={TAG_CLASSES}>
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-4 flex gap-1 rounded-lg border border-stone-200 bg-stone-50 p-1 dark:border-zinc-800 dark:bg-zinc-800/50">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-stone-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
                    : "text-stone-500 hover:text-stone-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="min-h-[200px]">
            {activeTab === "overview" && (
              <OverviewPanel overview={project.overview} />
            )}
            {activeTab === "architecture" && (
              <ArchitecturePanel architecture={project.architecture} />
            )}
            {activeTab === "challenges" && (
              <ChallengesPanel challenges={project.challenges} />
            )}
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${project.title} — Live Demo`}
        videoUrl={project.videoUrl}
      />
    </>
  );
}
