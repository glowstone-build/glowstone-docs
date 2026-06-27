import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * One bibliography entry: a title that links out (with a trailing external-link
 * icon), an author · venue meta line, an optional "cited in code" badge, and a
 * labelled "Used for" note (passed as children so inline markdown renders).
 */
export function Reference({
  title,
  href,
  authors,
  venue,
  cited = false,
  children,
}: {
  title: string;
  href?: string;
  authors?: string;
  venue?: string;
  cited?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="my-4 border-s-2 border-fd-border ps-4 [&_p]:m-0">
      <div className="font-medium text-fd-foreground">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-baseline gap-0.5 no-underline hover:text-fd-primary"
          >
            <span className="underline decoration-fd-border underline-offset-2 group-hover:decoration-fd-primary">
              {title}
            </span>
            <ArrowUpRight className="size-3.5 shrink-0 translate-y-0.5 text-fd-muted-foreground transition-colors group-hover:text-fd-primary" />
          </a>
        ) : (
          title
        )}
        {cited ? (
          <span className="ms-2 inline-block whitespace-nowrap rounded-full border border-fd-primary/30 bg-fd-primary/10 px-2 py-0.5 align-middle text-[10px] font-medium uppercase tracking-wide text-fd-primary">
            cited in code
          </span>
        ) : null}
      </div>

      {authors || venue ? (
        <div className="mt-0.5 text-sm text-fd-muted-foreground">
          {authors}
          {authors && venue ? ' · ' : ''}
          {venue}
        </div>
      ) : null}

      {children ? (
        <div className="mt-1.5 text-sm text-fd-muted-foreground">
          <span className="me-1.5 select-none rounded bg-fd-secondary px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fd-secondary-foreground">
            Used for
          </span>
          {children}
        </div>
      ) : null}
    </div>
  );
}
