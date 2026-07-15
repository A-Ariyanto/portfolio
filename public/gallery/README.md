# Gallery photos

Drop your "Beyond Code" photos in this folder, then register each one in
`src/data/gallery.ts`.

## Adding a photo

1. Copy the image into this folder, e.g. `public/gallery/vol-community-kitchen.jpg`.
2. Open `src/data/gallery.ts` and add (or update) an entry in `galleryItems`:

   ```ts
   {
     id: 'vol-community-kitchen',          // unique, kebab-case
     src: '/gallery/vol-community-kitchen.jpg',
     alt: 'Volunteering at a community kitchen',
     caption: 'Preparing and serving meals during Ramadan.', // shown in the lightbox
     category: 'volunteering',             // 'volunteering' | 'leadership' | 'photography'
     aspect: 'landscape',                  // 'portrait' | 'landscape' | 'square'
   }
   ```

That's it — the gallery filters, masonry layout, and expand-to-view lightbox pick
it up automatically.

## Notes

- Until a real file exists at `src`, that tile shows a styled placeholder with the
  category label, so the section always looks intentional.
- `aspect` only needs to be roughly right — it sets the placeholder shape and adds
  variety to the masonry columns. Real images display at their true proportions.
- Keep files reasonably sized (long edge ~1600px, compressed) so the page loads fast.
