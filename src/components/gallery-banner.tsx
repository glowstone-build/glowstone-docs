import Link from 'next/link';
import { ArrowRight, Images } from 'lucide-react';

/**
 * A colourful teaser banner (brand magenta/purple) that links to the Gallery.
 * Used at the top of the docs landing.
 */
export function GalleryBanner() {
  return (
    <Link
      href="/docs/resources/gallery"
      className="not-prose group my-6 flex items-center gap-4 overflow-hidden rounded-xl border border-fuchsia-500/30 bg-gradient-to-r from-fuchsia-500/15 via-purple-500/10 to-transparent p-4 shadow-sm ring-1 ring-inset ring-fuchsia-500/10 transition-all hover:border-fuchsia-500/60 hover:from-fuchsia-500/25 hover:shadow-md"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow">
        <Images className="size-6" />
      </span>
      <span className="flex-1">
        <span className="block font-semibold text-fd-foreground">Explore the Gallery</span>
        <span className="block text-sm text-fd-muted-foreground">
          Renders and stage shots made with Glowstone.
        </span>
      </span>
      <ArrowRight className="size-5 shrink-0 text-fuchsia-500 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
