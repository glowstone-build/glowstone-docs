import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { DownloadButton } from '@/components/download-button';
import { ShaderBackground } from '@/components/shader-background';
import { gitConfig } from '@/lib/shared';

const downloadUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}/releases/latest`;

export default function HomePage() {
  return (
    <>
      <ShaderBackground />
      {/* Glass CTAs, sitting below the centered glowstone shader wordmark. */}
      <div className="relative z-10 flex-1">
        <div className="absolute inset-x-0 top-[60%] flex flex-col items-center justify-center gap-3 px-6 sm:flex-row">
          <Link
            href="/docs"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/40 px-6 py-3 text-sm font-semibold text-[#15212e] shadow-lg shadow-[#9bbdd8]/30 ring-1 ring-white/20 backdrop-blur-md transition-colors duration-200 hover:bg-white/60"
          >
            Read the docs
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          <DownloadButton href={downloadUrl} />
        </div>
      </div>
    </>
  );
}
