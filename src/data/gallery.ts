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

export const galleryItems: GalleryItem[] = [
  // Volunteering
  {
    id: 'homeless-distribution',
    src: '/gallery/homeless-distribution.webp',
    alt: 'Volunteers distributing supplies to the homeless at Martin Place, Sydney',
    caption: 'Distributing food and supplies to the homeless with MyFundAction volunteers at Martin Place, Sydney.',
    category: 'volunteering',
    aspect: 'landscape',
  },
  {
    id: 'canberra-volunteer-event',
    src: '/gallery/canberra-volunteer-event.webp',
    alt: 'MyFundAction volunteer team at a community event booth in Canberra',
    caption: 'Running the MyFundAction Australia "Community Heroes" booth at a volunteer event in Canberra.',
    category: 'volunteering',
    aspect: 'landscape',
  },
  {
    id: 'prep-for-friday-prayers',
    src: '/gallery/prep-for-friday-prayers.webp',
    alt: 'Volunteers moving equipment in a lift while setting up for Friday prayers',
    caption: 'Hauling speakers and prayer mats up with the team while setting up for Friday prayers on campus.',
    category: 'volunteering',
    aspect: 'landscape',
  },
  {
    id: 'volunteer-coffee-meet-up',
    src: '/gallery/volunteer-coffee-meet-up.webp',
    alt: 'Volunteers catching up over coffee at an outdoor cafe',
    caption: 'Coffee catch-up with fellow volunteers — planning the next round of community projects.',
    category: 'volunteering',
    aspect: 'portrait',
  },
  {
    id: 'volunteer-outing',
    src: '/gallery/volunteer-outing.webp',
    alt: 'Volunteers on a road trip in a van during an outing',
    caption: 'On the road with the volunteer crew for a weekend outing.',
    category: 'volunteering',
    aspect: 'landscape',
  },
  // Leadership
  {
    id: '2025-culture-awards',
    src: '/gallery/2025-culture-awards.webp',
    alt: 'Receiving the Religious Community Club Impact Award on stage at the 2025 Culture Awards',
    caption: 'Islamic Society of UNSW winning the Religious Community Club Impact Award at the 2025 Culture Awards.',
    category: 'leadership',
    aspect: 'portrait',
  },
  {
    id: 'vice-chancellor-meet-up-with-the-team',
    src: '/gallery/vice-chancellor-meet-up-with-the-team.webp',
    alt: 'Islamic Society of UNSW team group photo with the Vice-Chancellor',
    caption: 'The Islamic Society of UNSW team meeting with the UNSW Vice-Chancellor.',
    category: 'leadership',
    aspect: 'landscape',
  },
  {
    id: 'eid-event-2026',
    src: '/gallery/eid-event-2026.webp',
    alt: 'Large crowd gathered for an Eid celebration event at UNSW',
    caption: 'A packed hall for the Islamic Society of UNSW Eid celebration, 2026.',
    category: 'leadership',
    aspect: 'landscape',
  },
  {
    id: 'eid-bbq-2026-1',
    src: '/gallery/eid-bbq-2026-1.webp',
    alt: 'Preparing food at the Eid BBQ 2026',
    caption: 'On the grill at the community Eid BBQ in the park, 2026.',
    category: 'leadership',
    aspect: 'landscape',
  },
  {
    id: 'eid-bbq-2026-2',
    src: '/gallery/eid-bbq-2026-2.webp',
    alt: 'With a friend at the Eid BBQ 2026 in the park',
    caption: 'Celebrating Eid with the community at the 2026 BBQ.',
    category: 'leadership',
    aspect: 'portrait',
  },
  {
    id: 'team-discussion-for-society',
    src: '/gallery/team-discussion-for-society.webp',
    alt: 'Committee members working on laptops during a society planning session',
    caption: 'Late-night planning session with the society committee.',
    category: 'leadership',
    aspect: 'landscape',
  },
  {
    id: 'educational-event',
    src: '/gallery/educational-event.webp',
    alt: 'Attendees with a remote speaker on screen at an educational event',
    caption: 'Hosting an educational session with a guest speaker joining remotely.',
    category: 'leadership',
    aspect: 'square',
  },
  // Photography
  {
    id: 'cool-photo',
    src: '/gallery/cool-photo.webp',
    alt: 'One Way street sign against a pink sunset sky',
    caption: 'One way — golden-hour clouds over Oak St, shot on an evening walk.',
    category: 'photography',
    aspect: 'portrait',
  },
]
