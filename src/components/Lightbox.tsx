import { useCallback, useEffect } from 'react'
import { categoryLabels, type GalleryItem } from '../data/gallery'
import GalleryImage from './GalleryImage'

interface LightboxProps {
  items: GalleryItem[]
  openIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ items, openIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = openIndex !== null

  const goTo = useCallback(
    (delta: number) => {
      if (openIndex === null || items.length === 0) return
      const next = (openIndex + delta + items.length) % items.length
      onNavigate(next)
    },
    [openIndex, items.length, onNavigate]
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') goTo(1)
      else if (e.key === 'ArrowLeft') goTo(-1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose, goTo])

  if (openIndex === null) return null
  const item = items[openIndex]
  if (!item) return null

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-20 rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Close"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={() => goTo(-1)}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:left-4"
            aria-label="Previous photo"
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goTo(1)}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
            aria-label="Next photo"
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Content */}
      <figure className="animate-fade-in-up relative z-10 flex max-h-full w-full max-w-4xl flex-col items-center">
        <GalleryImage
          item={item}
          fit="contain"
          className="max-h-[75vh] w-auto max-w-full rounded-xl"
        />
        <figcaption className="mt-4 max-w-2xl text-center">
          <span className="mb-2 inline-block rounded-md border border-white/20 bg-white/10 px-2.5 py-1 font-mono text-xs font-medium text-teal-300">
            {categoryLabels[item.category]}
          </span>
          <p className="text-sm text-white/90">{item.caption}</p>
          {items.length > 1 && (
            <p className="mt-2 font-mono text-xs text-white/40">
              {openIndex + 1} / {items.length}
            </p>
          )}
        </figcaption>
      </figure>
    </div>
  )
}
