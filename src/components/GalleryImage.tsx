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

const aspectRatio: Record<GalleryItem['aspect'], string> = {
  portrait: '3 / 4',
  landscape: '4 / 3',
  square: '1 / 1',
}

function Placeholder({ item, style }: { item: GalleryItem; style?: React.CSSProperties }) {
  return (
    <div
      style={style}
      className="flex w-full flex-col items-center justify-center gap-2 bg-stone-100 text-stone-400 dark:bg-zinc-800 dark:text-zinc-500"
    >
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        {categoryIcon[item.category]}
      </svg>
      <span className="font-mono text-xs">{categoryLabels[item.category]}</span>
    </div>
  )
}

interface GalleryImageProps {
  item: GalleryItem
  /** 'cover' fills a fixed aspect box (grid); 'contain' shows natural size (lightbox). */
  fit?: 'cover' | 'contain'
  className?: string
}

/** Renders the real image, falling back to a styled placeholder when it is
 * missing or fails to load. */
export default function GalleryImage({ item, fit = 'cover', className = '' }: GalleryImageProps) {
  const [failed, setFailed] = useState(false)

  // Reset the error state when the underlying item changes (e.g. lightbox nav).
  useEffect(() => setFailed(false), [item.src])

  if (fit === 'contain') {
    // Lightbox: natural image size; placeholder gets a viewport-relative box.
    return failed ? (
      <Placeholder
        item={item}
        style={{ aspectRatio: aspectRatio[item.aspect], height: '55vh', maxWidth: '100%' }}
      />
    ) : (
      <img
        src={item.src}
        alt={item.alt}
        onError={() => setFailed(true)}
        className={`object-contain ${className}`}
      />
    )
  }

  // Grid: fixed aspect box, image (or placeholder) fills it.
  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ aspectRatio: aspectRatio[item.aspect] }}>
      {failed ? (
        <Placeholder item={item} style={{ height: '100%' }} />
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  )
}
