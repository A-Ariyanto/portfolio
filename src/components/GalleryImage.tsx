import { useEffect, useState, type ReactNode } from 'react'
import { categoryLabels, type GalleryItem } from '../data/gallery'

const categoryIcon: Record<GalleryItem['category'], ReactNode> = {
  volunteering: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  ),
  leadership: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  ),
  photography: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </>
  ),
}

interface GalleryImageProps {
  item: GalleryItem
  className?: string
  /** Grid uses object-cover; lightbox uses object-contain. */
  fit?: 'cover' | 'contain'
}

/** Renders the real image, falling back to a styled placeholder when it is
 * missing or fails to load. */
export default function GalleryImage({ item, className = '', fit = 'cover' }: GalleryImageProps) {
  const [failed, setFailed] = useState(false)

  // Reset the error state when the underlying item changes (e.g. lightbox nav).
  useEffect(() => setFailed(false), [item.src])

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-stone-100 text-stone-400 dark:bg-zinc-800 dark:text-zinc-500 ${className}`}
      >
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          {categoryIcon[item.category]}
        </svg>
        <span className="font-mono text-xs">{categoryLabels[item.category]}</span>
      </div>
    )
  }

  return (
    <img
      src={item.src}
      alt={item.alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${fit === 'cover' ? 'object-cover' : 'object-contain'} ${className}`}
    />
  )
}
