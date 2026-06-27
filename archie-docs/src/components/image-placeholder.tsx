import { ImageIcon } from 'lucide-react';

/**
 * A labelled placeholder that stands in for a screenshot / diagram that has not
 * been captured yet. The `caption` describes exactly what the final image
 * should show, so it can be swapped for a real asset later.
 */
export function ImagePlaceholder({
  caption,
  ratio = '16 / 9',
  label = 'Screenshot',
}: {
  caption: string;
  /** CSS aspect-ratio for the box, e.g. "16 / 9", "4 / 3", "21 / 9". */
  ratio?: string;
  /** Small badge text, e.g. "Screenshot", "Diagram", "GIF", "UI panel". */
  label?: string;
}) {
  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-dashed border-fd-border bg-fd-secondary/30 not-prose">
      <div
        className="flex flex-col items-center justify-center gap-3 p-8 text-center"
        style={{ aspectRatio: ratio }}
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-fd-muted text-fd-muted-foreground">
          <ImageIcon className="size-6" />
        </div>
        <span className="rounded-full bg-fd-primary/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-fd-primary">
          {label} placeholder
        </span>
        <figcaption className="max-w-prose text-sm text-fd-muted-foreground">
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}
