"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { BookOpen, Code2, Network, Server, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { courses, type Course, type CourseStatus } from "@/data/courses";
import { cn } from "@/lib/utils";

const icons: Record<Course["icon"], LucideIcon> = {
  server: Server,
  network: Network,
  shield: ShieldCheck,
  code: Code2,
  book: BookOpen,
};

const statusStyles: Record<CourseStatus, string> = {
  Completed: "border-[#28c840]/30 bg-[#28c840]/10 text-[#7ee08f]",
  "In Progress": "border-accent/30 bg-accent/10 text-accent",
  Planned: "border-white/12 bg-white/[0.04] text-faint",
};

export function CoursesTimeline() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <Section id="courses">
      <SectionHeading
        id="courses"
        eyebrow="06 — Courses & Training"
        title={
          <>
            Cisco, networking and{" "}
            <span className="text-muted">IT coursework.</span>
          </>
        }
        description="Technical training tracked over time. Entries marked as placeholders are targets, not claims — they are clearly labelled until they are real."
      />

      <div ref={ref} className="relative mt-14 pl-8 sm:pl-12">
        {/* Track */}
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-[11px] w-px bg-white/8 sm:left-[19px]"
        />
        <motion.div
          aria-hidden
          style={{ scaleY: reduced ? 1 : scaleY }}
          className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-linear-to-b from-accent via-accent-soft to-transparent sm:left-[19px]"
        />

        <ol className="space-y-5">
          {courses.map((course, i) => {
            const Icon = icons[course.icon];
            return (
              <li key={course.id} className="relative">
                {/* Node */}
                <Reveal delay={0.05} direction="none">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-6 -left-8 grid h-6 w-6 place-items-center rounded-full border bg-base transition-colors duration-500 sm:-left-12",
                      course.status === "Planned"
                        ? "border-white/15 text-faint"
                        : "border-accent/45 text-accent",
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {course.status === "In Progress" && !reduced ? (
                      <span className="animate-pulse-ring absolute inset-0 rounded-full border border-accent/50" />
                    ) : null}
                  </span>
                </Reveal>

                <Reveal delay={0.08 + i * 0.05} direction="left">
                  <motion.div
                    whileHover={reduced ? undefined : { x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className={cn(
                      "halo relative rounded-2xl border bg-white/[0.015] p-5 transition-colors duration-500 sm:p-6",
                      course.placeholder
                        ? "border-dashed border-white/12 hover:border-white/22"
                        : "border-white/8 hover:border-white/18",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[11px] tracking-[0.18em] text-accent/85 uppercase">
                        {course.year}
                      </span>
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] tracking-wider uppercase",
                          statusStyles[course.status],
                        )}
                      >
                        {course.status}
                      </span>
                      {course.placeholder ? (
                        <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-2.5 py-0.5 font-mono text-[9.5px] tracking-wider text-amber-200/90 uppercase">
                          Placeholder
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-3 text-[16.5px] leading-snug font-medium tracking-tight text-fg">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-[12.5px] text-muted">{course.provider}</p>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                      {course.description}
                    </p>
                  </motion.div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="mt-6 pl-8 font-mono text-[11px] text-faint sm:pl-12">
        Edit this timeline in <span className="text-accent/80">data/courses.ts</span>
      </p>
    </Section>
  );
}
