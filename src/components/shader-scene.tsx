'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { FilmGrain, Glass, Shader, SineWave, Swirl } from 'shaders/react';

/**
 * The glass wordmark is sized off the viewport height, so on narrow/portrait
 * screens it overflows and gets clipped. Scale it down with the aspect ratio so
 * it always fits the width — capped at 1 so the (landscape) desktop look is
 * unchanged. `scale` is a plain GPU uniform, so updates are cheap (no recompile).
 * Lower REF_ASPECT = larger wordmark on mobile (closer to clipping).
 */
const REF_ASPECT = 1.3;
const MIN_SCALE = 0.4;

function useGlassScale() {
  const compute = () => {
    if (typeof window === 'undefined') return 1;
    const aspect = window.innerWidth / window.innerHeight;
    return Math.max(MIN_SCALE, Math.min(1, aspect / REF_ASPECT));
  };

  const [scale, setScale] = useState(compute);

  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScale(compute()));
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return scale;
}

/**
 * The actual WebGL shader stack. Kept in its own module so it can be loaded
 * client-only via `next/dynamic` (see shader-background.tsx) — three.js / WebGL
 * must never run during SSR. Fades in once the renderer reports ready, and
 * notifies the parent via `onReady` (used to dismiss the fallback wordmark).
 */
export default function ShaderScene({
  onReady,
  onError,
}: {
  onReady?: () => void;
  onError?: () => void;
}) {
  const [ready, setReady] = useState(false);
  const glassScale = useGlassScale();
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === 'dark';

  // WebGL shader compile/link failures (e.g. the WebGL2 fallback path on some
  // GPUs / non-secure contexts where WebGPU is unavailable) don't throw —
  // three.js only logs them. Watch console.error for those signatures so we can
  // surface the fallback wordmark instead of a blank canvas.
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  useEffect(() => {
    const original = console.error;
    const shaderFailure =
      /shader error|validate_status|not compiled|failed to (compile|link)|program info log|webglprogram/i;
    console.error = (...args: unknown[]) => {
      try {
        const text = args
          .map((a) => (typeof a === 'string' ? a : ((a as Error)?.message ?? '')))
          .join(' ');
        if (shaderFailure.test(text)) onErrorRef.current?.();
      } catch {
        // ignore detection failures — never let logging break
      }
      original.apply(console, args);
    };
    return () => {
      console.error = original;
    };
  }, []);

  // Dark mode inverts the backdrop: dark swirl + light stripes (colors are GPU
  // uniforms, so they swap live with no recompile).
  const swirlA = dark ? '#212121' : '#ebf6ff';
  const swirlB = dark ? '#212121' : '#d3e4f0';
  const sineColor = dark ? '#d3e4f0' : '#212121';

  return (
    <Shader
      disableTelemetry
      onReady={() => {
        setReady(true);
        onReady?.();
      }}
      className={`h-full w-full transition-opacity duration-[1200ms] ease-out ${
        ready ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Swirl colorA={swirlA} colorB={swirlB} detail={1.5} />
      <SineWave
        amplitude={1}
        angle={107}
        color={sineColor}
        frequency={4.4}
        position={{ x: 1, y: 0 }}
        softness={0.3}
        thickness={1.4}
      />
      <Glass
        aberration={0.64}
        blur={20}
        edgeSoftness={0.05}
        fresnel={0}
        fresnelSoftness={1}
        highlight={0.75}
        highlightSoftness={1}
        innerZoom={2}
        lightAngle={237}
        refraction={2}
        scale={glassScale}
        shapeSdfUrl="https://data.shaders.com/storage/v1/object/public/user-uploaded-images/user_3E9oOrwiqo8UEYMwcaDhF5D7Ors/QtfYDrAwous7_sdf.bin"
        thickness={0.03}
      />
      <FilmGrain strength={0.45} />
    </Shader>
  );
}
