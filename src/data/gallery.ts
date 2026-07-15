// Gallery content for the "Beyond Code" section.
//
// This file is the single source of truth for the photo gallery. To add a real
// photo:
//   1. Drop the image file into `public/gallery/` (see public/gallery/README.md).
//   2. Add (or update) an entry below, pointing `src` at `/gallery/<filename>`.
// Until a real image exists at `src`, the grid and lightbox render a styled
// placeholder based on the item's `category` and `aspect`.

export type GalleryCategory = 'volunteering' | 'leadership' | 'photography'

export interface GalleryItem {
  id: string
  /** Public path to the image, e.g. '/gallery/volunteering-ramadan-2025.jpg'. */
  src: string
  alt: string
  /** Shown in the lightbox — describes what is going on in the photo. */
  caption: string
  category: GalleryCategory
  /** Drives placeholder shape and adds variety to the masonry layout. */
  aspect: 'portrait' | 'landscape' | 'square'
  /** Reserved for future video support. Defaults to 'photo'. */
  type?: 'photo' | 'video'
}

export const categoryLabels: Record<GalleryCategory, string> = {
  volunteering: 'Volunteering',
  leadership: 'Leadership',
  photography: 'Photography',
}

// Placeholder set — swap `src` paths for real files as they become available.
export const galleryItems: GalleryItem[] = [
  {
    id: 'vol-community-kitchen',
    src: '/gallery/vol-community-kitchen.jpg',
    alt: 'Volunteering at a community kitchen',
    caption: 'Preparing and serving meals at a community kitchen during Ramadan.',
    category: 'volunteering',
    aspect: 'landscape',
  },
  {
    id: 'vol-charity-drive',
    src: '/gallery/vol-charity-drive.jpg',
    alt: 'Sorting donations at a charity drive',
    caption: 'Sorting and packing donations for a local charity drive.',
    category: 'volunteering',
    aspect: 'portrait',
  },
  {
    id: 'vol-event-setup',
    src: '/gallery/vol-event-setup.jpg',
    alt: 'Setting up a community event',
    caption: 'Setting up the venue ahead of a community outreach event.',
    category: 'volunteering',
    aspect: 'square',
  },
  {
    id: 'lead-society-meeting',
    src: '/gallery/lead-society-meeting.jpg',
    alt: 'Chairing an Islamic Society committee meeting',
    caption: 'Running a committee meeting as Secretary of the Islamic Society of UNSW.',
    category: 'leadership',
    aspect: 'landscape',
  },
  {
    id: 'lead-team-photo',
    src: '/gallery/lead-team-photo.jpg',
    alt: 'Islamic Society committee team photo',
    caption: 'With the Islamic Society of UNSW committee after a successful event.',
    category: 'leadership',
    aspect: 'landscape',
  },
  {
    id: 'lead-workshop',
    src: '/gallery/lead-workshop.jpg',
    alt: 'Facilitating a student workshop',
    caption: 'Facilitating a workshop and onboarding new committee members.',
    category: 'leadership',
    aspect: 'portrait',
  },
  {
    id: 'photo-cityscape',
    src: '/gallery/photo-cityscape.jpg',
    alt: 'Sydney cityscape at dusk',
    caption: 'Sydney skyline at dusk — long exposure from the harbour.',
    category: 'photography',
    aspect: 'landscape',
  },
  {
    id: 'photo-portrait',
    src: '/gallery/photo-portrait.jpg',
    alt: 'Portrait photography',
    caption: 'Natural-light portrait from a personal photography session.',
    category: 'photography',
    aspect: 'portrait',
  },
  {
    id: 'photo-street',
    src: '/gallery/photo-street.jpg',
    alt: 'Street photography',
    caption: 'Candid street scene captured on a walk through the city.',
    category: 'photography',
    aspect: 'square',
  },
]
