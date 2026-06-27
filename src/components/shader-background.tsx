'use client';

import dynamic from 'next/dynamic';
import { Component, type ReactNode, useEffect, useRef, useState } from 'react';

// Load the WebGL scene only in the browser — avoids SSR touching three.js/WebGL.
const ShaderScene = dynamic(() => import('./shader-scene'), { ssr: false });

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return (
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

/** Catches renderer-init errors thrown by the shader subtree so we can fall back. */
class SceneErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Full-viewport shader backdrop for the landing page. Sits behind all content
 * (and behind the navbar). If WebGL / the shader renderer isn't supported or
 * fails to initialize, it falls back to a centered "glowstone" wordmark.
 *
 * Fallback is triggered three ways for robustness: an upfront WebGL capability
 * check, a React error boundary, and a ready-timeout (silent failures/hangs).
 */
export function ShaderBackground() {
  const [attempt, setAttempt] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  // A real GL/shader error (vs. just "didn't come up"): forces the fallback ON
  // and the broken scene OFF, even if onReady already (falsely) fired.
  const [errored, setErrored] = useState(false);
  const readyRef = useRef(false);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setFailed(true);
      return;
    }
    setAttempt(true);

    // If the renderer never signals ready, reveal the fallback.
    const timer = setTimeout(() => {
      if (!readyRef.current) setFailed(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleReady = () => {
    readyRef.current = true;
    setReady(true);
  };

  const handleError = () => setErrored(true);

  const showFallback = errored || (failed && !ready);
  const mountScene = attempt && !errored;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#e3eef9] dark:bg-[#212121]"
    >
      {/* Fallback wordmark — shown when WebGL/the shader renderer isn't available. */}
      <div
        className={`absolute inset-0 flex items-center justify-center px-4 transition-opacity duration-700 ${
          showFallback ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="select-none break-words bg-gradient-to-b from-[#1c2630] via-[#5d6e7d] to-[#aebfce] bg-clip-text text-center text-[clamp(3.25rem,15vw,15rem)] font-bold lowercase leading-[0.9] tracking-tighter text-transparent drop-shadow-sm dark:from-[#eef4fa] dark:via-[#aebfce] dark:to-[#5d6e7d]">
          glow<wbr />stone
        </span>
      </div>

      {mountScene && (
        <div className="absolute inset-0">
          <SceneErrorBoundary onError={handleError}>
            <ShaderScene onReady={handleReady} onError={handleError} />
          </SceneErrorBoundary>
        </div>
      )}
    </div>
  );
}
