"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Fixed, page-wide atmosphere: a fine grid, two slow-drifting radial lights,
 * a film-grain overlay and a pointer-tracked glow.
 *
 * The pointer glow is driven by a CSS custom property written from a rAF loop,
 * so it never triggers a React re-render and stays on the compositor.
 */
export function BackgroundFX() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    // Only worth doing for real pointers — skip on touch devices.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = document.documentElement;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let targetX = x;
    let targetY = y;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      root.style.setProperty("--pointer-x", `${x.toFixed(1)}px`);
      root.style.setProperty("--pointer-y", `${y.toFixed(1)}px`);
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-base" />

      {/* Fine grid, faded toward the bottom of the viewport */}
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(120%_90%_at_50%_0%,#000_20%,transparent_75%)]" />

      {/* Slow drifting lights */}
      <div className="animate-drift absolute -top-40 -right-32 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.13),transparent_65%)] blur-3xl" />
      <div className="animate-drift-slow absolute top-1/3 -left-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12),transparent_65%)] blur-3xl" />

      {/* Pointer-tracked glow */}
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-700 max-md:hidden"
        style={{
          background:
            "radial-gradient(420px circle at var(--pointer-x, 50%) var(--pointer-y, 30%), rgba(34,211,238,0.055), transparent 70%)",
        }}
      />

      {/* Grain */}
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />

      {/* Vignette keeps text crisp against the lights */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_40%,rgba(5,5,5,0.85)_100%)]" />
    </div>
  );
}
