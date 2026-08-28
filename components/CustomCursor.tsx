"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useFinePointer } from "@/lib/hooks";

/**
 * A restrained two-part cursor: a small solid dot that tracks exactly, and a
 * ring that lags slightly and expands over interactive elements.
 * Disabled entirely on touch devices and when reduced motion is requested.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduced;
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest("a, button, [role='button'], input, textarea")));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-200">
      <motion.div
        style={{ x, y, opacity: visible ? 1 : 0 }}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent transition-opacity duration-200"
      />
      <motion.div
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-accent/45 transition-[opacity,transform] duration-200"
        animate={{ scale: active ? 1.65 : 1, borderColor: active ? "rgba(34,211,238,0.75)" : "rgba(34,211,238,0.45)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </div>
  );
}
