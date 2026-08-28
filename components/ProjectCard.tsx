"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ArrowUpRight, Terminal } from "lucide-react";
import { GithubIcon as Github } from "./ui/BrandIcons";
import type { Project, ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

const statusStyles: Record<ProjectStatus, string> = {
  Live: "border-[#28c840]/30 bg-[#28c840]/10 text-[#7ee08f]",
  Completed: "border-accent/30 bg-accent/10 text-accent",
  "In Progress": "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Planned: "border-white/12 bg-white/[0.04] text-faint",
};

/** Stable per-project hue so generated covers differ but stay on-brand. */
function hueFor(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 360;
  // Clamp into the cyan → blue → violet arc.
  return 178 + (h % 78);
}

function GeneratedCover({ project }: { project: Project }) {
  const hue = hueFor(project.slug);
  const initials = project.title
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div
      className="relative h-full w-full"
      style={{
        background: `linear-gradient(140deg, hsl(${hue} 70% 12%) 0%, #0a0a0c 55%, hsl(${hue + 20} 60% 9%) 100%)`,
      }}
    >
      <div className="grid-lines absolute inset-0 opacity-60" />
      <div
        className="absolute -top-16 -right-10 h-48 w-48 rounded-full blur-2xl"
        style={{ background: `radial-gradient(circle, hsl(${hue} 90% 55% / 0.22), transparent 65%)` }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <span
          className="font-mono text-6xl font-semibold tracking-tighter opacity-[0.16] select-none"
          style={{ color: `hsl(${hue} 90% 70%)` }}
          aria-hidden
        >
          {initials}
        </span>
      </div>
      <div className="absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase">
        <Terminal className="h-3 w-3" aria-hidden />
        {project.category}
      </div>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(34,211,238,0.10), transparent 62%)`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    // Deliberately small — enough to feel physical, not enough to feel like a toy.
    ry.set((px - 0.5) * 7);
    rx.set((0.5 - py) * 5);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    // Layout animation and the 3D tilt live on separate elements — Motion
    // cannot interpolate a layout change and a rotation on the same node.
    <motion.div
      layout
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <motion.article
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        className="halo group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.015] transition-colors duration-500 hover:border-white/16"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        {/* Cover */}
        <div className="relative aspect-16/9 overflow-hidden border-b border-white/8">
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="object-cover"
              />
            ) : (
              <GeneratedCover project={project} />
            )}
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-base/85 via-transparent to-transparent"
          />

          <span
            className={cn(
              "absolute top-3 right-3 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase backdrop-blur-sm",
              statusStyles[project.status],
            )}
          >
            {project.status}
          </span>
        </div>

        {/* Body */}
        <div className="relative z-20 flex flex-1 flex-col p-6">
          <p className="font-mono text-[10px] tracking-[0.22em] text-accent/80 uppercase">
            Project
          </p>

          <h3 className="mt-2.5 text-[19px] leading-snug font-medium tracking-tight text-fg">
            {project.title}
          </h3>

          <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
            {project.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((tech, i) => (
              <motion.li
                key={tech}
                initial={false}
                whileHover={reduced ? undefined : { y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: i * 0.005 }}
                className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[10.5px] tracking-wide text-muted transition-colors duration-300 group-hover:border-white/14 group-hover:text-fg/80"
              >
                {tech}
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-2 pt-1">
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="group/btn inline-flex items-center gap-2 rounded-full bg-accent/[0.12] px-4 py-2 text-[12.5px] font-medium text-accent ring-1 ring-accent/25 transition-colors duration-300 hover:bg-accent/20"
              >
                View Project
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                  aria-hidden
                />
              </a>
            ) : null}

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="group/btn inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[12.5px] text-muted transition-colors duration-300 hover:border-white/20 hover:text-fg"
              aria-label={`${project.title} on GitHub`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden />
              GitHub
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
