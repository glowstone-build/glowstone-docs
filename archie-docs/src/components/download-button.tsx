'use client';

import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';

type Platform = 'macOS' | 'Windows' | 'Linux';

function detectPlatform(): Platform {
  const uaData = (navigator as { userAgentData?: { platform?: string } }).userAgentData;
  const raw =
    `${uaData?.platform ?? ''} ${navigator.userAgent} ${navigator.platform}`.toLowerCase();

  if (raw.includes('win')) return 'Windows';
  if (/mac|iphone|ipad|ios/.test(raw)) return 'macOS';
  if (/linux|x11|android/.test(raw)) return 'Linux';
  return 'macOS';
}

/**
 * Black-glass download CTA. Detects the visitor's OS client-side (so SSR and the
 * first client render agree on a plain "Download", then it fills in the platform).
 */
export function DownloadButton({ href }: { href: string }) {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-black/40 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-black/25 ring-1 ring-white/10 backdrop-blur-md transition-colors duration-200 hover:bg-black/55"
    >
      <Download className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
      <span>
        Download
        {platform && (
          <>
            {' for '}
            <strong className="font-bold">{platform}</strong>
          </>
        )}
      </span>
    </a>
  );
}
