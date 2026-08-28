"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { Circle, Terminal } from "lucide-react";
import { site } from "@/data/site";

type Token = { text: string; tone?: keyof typeof tones };

const tones = {
  keyword: "text-[#c792ea]",
  name: "text-[#82d2ff]",
  punct: "text-faint",
  key: "text-[#7ee7f5]",
  string: "text-[#a9e88a]",
  comment: "text-faint italic",
} as const;

/** The panel content, written as tokens so it highlights without a parser. */
const lines: Token[][] = [
  [{ text: "// portfolio.config", tone: "comment" }],
  [],
  [
    { text: "const", tone: "keyword" },
    { text: " developer", tone: "name" },
    { text: " = {", tone: "punct" },
  ],
  [
    { text: "  name", tone: "key" },
    { text: ": ", tone: "punct" },
    { text: `"${site.shortName}"`, tone: "string" },
    { text: ",", tone: "punct" },
  ],
  [
    { text: "  focus", tone: "key" },
    { text: ": ", tone: "punct" },
    { text: '"IT & Web Development"', tone: "string" },
    { text: ",", tone: "punct" },
  ],
  [
    { text: "  interests", tone: "key" },
    { text: ": [", tone: "punct" },
  ],
  [
    { text: '    "Web Development"', tone: "string" },
    { text: ",", tone: "punct" },
  ],
  [
    { text: '    "Cisco Networking"', tone: "string" },
    { text: ",", tone: "punct" },
  ],
  [{ text: '    "IT Infrastructure"', tone: "string" }],
  [{ text: "  ],", tone: "punct" }],
  [
    { text: "  status", tone: "key" },
    { text: ": ", tone: "punct" },
    { text: '"building"', tone: "string" },
    { text: ",", tone: "punct" },
  ],
  [{ text: "}", tone: "punct" }],
];

const orbits = [
  { label: "Python", top: "6%", left: "-9%", delay: 0 },
  { label: "FastAPI", top: "44%", left: "-13%", delay: 1.1 },
  { label: "Networking", top: "80%", left: "6%", delay: 2.2 },
  { label: "Next.js", top: "22%", right: "-8%", delay: 0.6 },
  { label: "Supabase", top: "68%", right: "-11%", delay: 1.7 },
];

export function CodePanel() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rx = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(30);
  const glow = useMotionTemplate`radial-gradient(340px circle at ${glowX}% ${glowY}%, rgba(34,211,238,0.10), transparent 70%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 11);
    rx.set((0.5 - py) * 9);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    glowX.set(50);
    glowY.set(30);
  };

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none" style={{ perspective: 1400 }}>
      {/* Ambient bloom behind the panel */}
      <div
        aria-hidden
        className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(circle_at_60%_35%,rgba(34,211,238,0.16),transparent_62%)] blur-2xl"
      />

      {/* Floating technology chips */}
      {orbits.map((o) => (
        <motion.span
          key={o.label}
          aria-hidden
          style={{ top: o.top, left: o.left, right: o.right }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={
            reduced
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: 1, y: [0, -9, 0] }
          }
          transition={
            reduced
              ? { duration: 0.4 }
              : {
                  opacity: { duration: 0.6, delay: 0.8 + o.delay * 0.12 },
                  scale: { duration: 0.6, delay: 0.8 + o.delay * 0.12 },
                  y: { duration: 6 + o.delay, repeat: Infinity, ease: "easeInOut", delay: o.delay },
                }
          }
          className="glass absolute z-20 hidden rounded-full px-3 py-1.5 font-mono text-[10.5px] tracking-wide text-muted shadow-[0_8px_24px_-10px_rgba(0,0,0,0.9)] xl:block"
        >
          {o.label}
        </motion.span>
      ))}

      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 28, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="glass relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(0,0,0,1)]"
      >
        {/* Cursor-follow sheen */}
        <motion.div aria-hidden className="absolute inset-0" style={{ background: glow }} />

        {/* Window chrome */}
        <div className="relative flex items-center gap-3 border-b border-white/8 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <Circle className="h-2.5 w-2.5 fill-[#ff5f57] text-[#ff5f57]" />
            <Circle className="h-2.5 w-2.5 fill-[#febc2e] text-[#febc2e]" />
            <Circle className="h-2.5 w-2.5 fill-[#28c840] text-[#28c840]" />
          </div>
          <div className="flex items-center gap-2 rounded-md bg-white/[0.05] px-2.5 py-1">
            <Terminal className="h-3 w-3 text-accent" aria-hidden />
            <span className="font-mono text-[11px] text-muted">developer.ts</span>
          </div>
          <span className="ml-auto font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
            {site.github.username}
          </span>
        </div>

        {/* Code body */}
        <div className="relative px-4 py-5 sm:px-6 sm:py-6">
          {/* Scanline */}
          {!reduced ? (
            <div
              aria-hidden
              className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-transparent via-accent/[0.045] to-transparent"
            />
          ) : null}

          <pre className="relative overflow-x-auto font-mono text-[12px] leading-[1.85] sm:text-[13px]">
            <code>
              {lines.map((tokens, i) => (
                <motion.div
                  key={i}
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.075 }}
                  className="flex gap-4 whitespace-pre"
                >
                  <span aria-hidden className="w-4 shrink-0 text-right text-faint/50 select-none">
                    {i + 1}
                  </span>
                  <span>
                    {tokens.map((t, j) => (
                      <span key={j} className={t.tone ? tones[t.tone] : undefined}>
                        {t.text}
                      </span>
                    ))}
                    {i === lines.length - 1 ? (
                      <motion.span
                        aria-hidden
                        className="ml-1 inline-block h-3.5 w-[7px] translate-y-[2px] bg-accent"
                        animate={reduced ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
                        transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                      />
                    ) : null}
                  </span>
                </motion.div>
              ))}
            </code>
          </pre>
        </div>

        {/* Status bar */}
        <div className="relative flex items-center justify-between border-t border-white/8 px-4 py-2.5 font-mono text-[10.5px] text-faint">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" aria-hidden />
            main
          </span>
          <span>UTF-8 · TypeScript</span>
        </div>
      </motion.div>
    </div>
  );
}
