"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { GithubIcon as Github } from "./ui/BrandIcons";
import { useRef } from "react";
import { site } from "@/data/site";
import { CodePanel } from "./CodePanel";

const words = site.headline.split(" ");

/** Deterministic positions — random values would break hydration. */
const particles = [
  { left: "12%", top: "22%", d: 0.0, s: 9 },
  { left: "27%", top: "68%", d: 1.4, s: 12 },
  { left: "44%", top: "14%", d: 2.6, s: 10 },
  { left: "63%", top: "78%", d: 0.8, s: 14 },
  { left: "78%", top: "32%", d: 3.2, s: 11 },
  { left: "88%", top: "60%", d: 2.0, s: 13 },
  { left: "8%", top: "84%", d: 3.8, s: 10 },
  { left: "55%", top: "44%", d: 1.1, s: 15 },
];

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Gentle parallax: the copy drifts up faster than the panel.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -70]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -28]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0]);

  return (
    <section
      id="home"
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-28"
    >
      {/* Floating particles */}
      {!reduced ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {particles.map((p, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-accent/45"
              style={{ left: p.left, top: p.top }}
              animate={{ y: [0, -26, 0], opacity: [0.15, 0.6, 0.15] }}
              transition={{
                duration: p.s,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.d,
              }}
            />
          ))}
        </div>
      ) : null}

      <div className="mx-auto grid w-full max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12">
        {/* Copy */}
        <motion.div style={{ y: copyY, opacity: fade }} className="relative z-10">
          {/* Badge */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2.5"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/15">
              <Sparkles className="h-3 w-3 text-accent" aria-hidden />
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.2em] text-muted">
              {site.badge}
            </span>
          </motion.div>

          {/* Headline with per-word reveal */}
          <h1 className="mt-7 text-[clamp(2.4rem,7vw,4.4rem)] leading-[1.04] font-semibold tracking-[-0.035em]">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={
                    i >= words.length - 2 ? "text-gradient inline-block" : "inline-block"
                  }
                  initial={reduced ? false : { y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.12 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
                {i < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
          >
            {site.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-linear-to-r from-accent to-accent-deep px-6 py-3.5 text-[14px] font-medium text-black shadow-[0_10px_36px_-12px_rgba(34,211,238,0.75)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-500 group-hover:translate-y-0"
              />
              <span className="relative">View My Projects</span>
              <ArrowRight
                className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </a>

            <a
              href={site.github.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3.5 text-[14px] font-medium text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/[0.07]"
            >
              <Github
                className="h-4 w-4 text-muted transition-colors duration-300 group-hover:text-accent"
                aria-hidden
              />
              Explore GitHub
              <ArrowRight
                className="h-4 w-4 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                aria-hidden
              />
            </a>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-8 flex items-center gap-2.5"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[#28c840]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#28c840]" />
            </span>
            <span className="text-[13px] text-muted">{site.status}</span>
            <span aria-hidden className="h-3 w-px bg-white/12" />
            <span className="text-[13px] text-faint">{site.location}</span>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div style={{ y: panelY, opacity: fade }} className="relative z-10">
          <CodePanel />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-accent lg:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <motion.span
          animate={reduced ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
