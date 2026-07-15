import type { Project, FlowSegment } from "../data/projects";

const TONE_CLASSES: Record<string, string> = {
  base: "font-semibold text-stone-800 dark:text-zinc-200",
  green: "font-semibold text-green-700 dark:text-teal-400",
  amber: "font-semibold text-amber-700 dark:text-amber-400",
};

export function OverviewPanel({ overview }: { overview: Project["overview"] }) {
  return (
    <div className="space-y-4">
      <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
        {overview.description}
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {overview.stack.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowLine({ segments }: { segments: FlowSegment[] }) {
  return (
    <p>
      {segments.map((seg, i) =>
        seg.tone ? (
          <span key={i} className={TONE_CLASSES[seg.tone]}>
            {seg.text}
          </span>
        ) : (
          seg.text
        ),
      )}
    </p>
  );
}

export function ArchitecturePanel({
  architecture,
}: {
  architecture: Project["architecture"];
}) {
  return (
    <div className="space-y-4">
      <p className="leading-relaxed text-stone-600 dark:text-zinc-400">
        {architecture.description}
      </p>
      <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800/50">
        <div className="space-y-2 text-stone-500 dark:text-zinc-500">
          {architecture.flow.map((line, i) => (
            <FlowLine key={i} segments={line} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ChallengesPanel({
  challenges,
}: {
  challenges: Project["challenges"];
}) {
  return (
    <div className="space-y-3">
      {challenges.map((item) => (
        <div
          key={item.title}
          className="rounded-lg border border-stone-200 p-4 dark:border-zinc-800"
        >
          <h4 className="mb-1 text-sm font-semibold text-stone-900 dark:text-zinc-100">
            {item.title}
          </h4>
          <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
