import { useMemo, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { categoryLabels, galleryItems, type GalleryCategory } from '../data/gallery'
import GalleryImage from './GalleryImage'
import Lightbox from './Lightbox'

type Filter = GalleryCategory | 'all'

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'volunteering', label: categoryLabels.volunteering },
  { value: 'leadership', label: categoryLabels.leadership },
  { value: 'photography', label: categoryLabels.photography },
]

const delayClasses = [
  '',
  'animation-delay-100',
  'animation-delay-200',
  'animation-delay-300',
  'animation-delay-400',
  'animation-delay-500',
]

export default function Leadership() {
  const { ref, inView } = useInView()
  const [filter, setFilter] = useState<Filter>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visibleItems = useMemo(
    () => (filter === 'all' ? galleryItems : galleryItems.filter(i => i.category === filter)),
    [filter]
  )

  const selectFilter = (value: Filter) => {
    setOpenIndex(null)
    setFilter(value)
  }

  return (
    <section id="leadership" className="border-t border-stone-200 px-6 py-24 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-2 font-mono text-sm font-medium text-green-700 dark:text-teal-400">
            Beyond Code
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-zinc-100">
            Leadership, Service &amp; Life Through a Lens
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-stone-500 dark:text-zinc-400">
            The things I care about outside of code — leading student communities,
            volunteering, and capturing moments behind the camera.
          </p>
        </div>

        {/* Condensed role summaries */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2">
          {/* Student Leadership */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex items-center gap-3">
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
            <p className="text-sm leading-relaxed text-stone-500 dark:text-zinc-400">
              Led a 50+ member society's migration to Microsoft Teams and built AI
              pipelines for meeting minutes and compliance docs — cutting documentation
              latency by{' '}
              <span className="font-semibold text-green-700 dark:text-teal-400">90%</span>.
            </p>
          </div>

          {/* Hospitality Operations */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex items-center gap-3">
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
            <p className="text-sm leading-relaxed text-stone-500 dark:text-zinc-400">
              Mentored new team members and ran real-time crisis resolution on Oracle
              OPERA PMS during peak service — balancing staffing, inventory, and
              customer flow under pressure.
            </p>
          </div>
        </div>

        {/* Filter pills */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filters.map(f => {
            const active = filter === f.value
            return (
              <button
                key={f.value}
                onClick={() => selectFilter(f.value)}
                aria-pressed={active}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-green-700 text-white dark:bg-teal-500 dark:text-zinc-900'
                    : 'border border-stone-200 bg-white text-stone-600 hover:border-stone-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600'
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Masonry gallery */}
        <div
          ref={ref}
          className={`columns-2 gap-4 sm:columns-3 ${inView ? '' : 'opacity-0'}`}
        >
          {visibleItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setOpenIndex(index)}
              aria-label={`Expand photo: ${item.caption}`}
              className={`group relative mb-4 block w-full cursor-zoom-in overflow-hidden rounded-xl border border-stone-200 dark:border-zinc-800 ${
                inView ? `animate-fade-in-up ${delayClasses[Math.min(index, delayClasses.length - 1)]}` : ''
              }`}
            >
              <GalleryImage item={item} fit="cover" />

              {/* Hover overlay with caption */}
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="p-3 text-left">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-wide text-teal-300">
                    {categoryLabels[item.category]}
                  </span>
                  <p className="mt-0.5 text-xs leading-snug text-white">{item.caption}</p>
                </div>
              </div>

              {/* Expand icon */}
              <div className="absolute right-2 top-2 rounded-md bg-black/40 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        items={visibleItems}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  )
}
