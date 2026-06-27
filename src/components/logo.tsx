import Image from 'next/image';
import { cn } from '@/lib/cn';

/**
 * The Glowstone squircle logo. `className` controls the rendered size (e.g.
 * `size-4` to match sidebar icons); `res` is the intrinsic pixel hint for
 * next/image optimization.
 */
export function Logo({ className, res = 64 }: { className?: string; res?: number }) {
  return (
    <Image
      src="/assets/logo.png"
      alt="Glowstone"
      width={res}
      height={res}
      className={cn('rounded-[30%] object-cover', className)}
      priority
    />
  );
}
