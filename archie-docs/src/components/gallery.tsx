import { ImageZoom } from 'fumadocs-ui/components/image-zoom';

export interface GalleryItem {
  src: string;
  alt: string;
  /** Optional caption shown under the image. */
  caption?: string;
  width: number;
  height: number;
}

/**
 * A responsive grid of rounded, click-to-zoom images, all cropped to a uniform
 * aspect ratio so the grid stays tidy regardless of source dimensions.
 */
export function Gallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => {
        // Animated GIFs must skip Next.js optimization or they freeze to a still
        // frame. ImageZoom forwards unknown props to next/image at runtime; the
        // `any` spread is only to satisfy its narrower prop type.
        const gifProps: any = item.src.toLowerCase().endsWith('.gif')
          ? { unoptimized: true }
          : {};
        return (
          <figure
            key={item.src}
            className="group overflow-hidden rounded-xl border border-fd-border bg-fd-secondary/30"
          >
            <ImageZoom
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              {...gifProps}
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            {item.caption ? (
              <figcaption className="px-3 py-2 text-xs text-fd-muted-foreground">
                {item.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}
