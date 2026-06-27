import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DiscordIcon } from './icons';

/**
 * A deliberately eye-catching community CTA (Discord blurple) for the docs
 * landing — styled to stand out from the neutral cards around it.
 */
export function CommunityBanner() {
  return (
    <Link
      href="/discord"
      target="_blank"
      rel="noreferrer"
      className="not-prose group my-6 flex items-center gap-4 overflow-hidden rounded-xl border border-[#5865F2]/40 bg-gradient-to-r from-[#5865F2]/20 via-[#5865F2]/10 to-transparent p-4 shadow-sm ring-1 ring-inset ring-[#5865F2]/10 transition-all hover:border-[#5865F2]/70 hover:from-[#5865F2]/30 hover:shadow-md"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#5865F2] text-white shadow">
        <DiscordIcon className="size-6" />
      </span>
      <span className="flex-1">
        <span className="block font-semibold text-fd-foreground">Join the community</span>
        <span className="block text-sm text-fd-muted-foreground">
          Follow updates, provide feedback and get support.
        </span>
      </span>
      <ArrowRight className="size-5 shrink-0 text-[#5865F2] transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
