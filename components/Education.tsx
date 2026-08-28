"use client";

import { motion, useReducedMotion } from "motion/react";
import { CalendarDays, GraduationCap } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { education } from "@/data/education";
import { cn } from "@/lib/utils";

export function Education() {
  const reduced = useReducedMotion();

  return (
    <Section id="education">
      <SectionHeading
        id="education"
        eyebrow="07 — Education"
        title={
          <>
            Where the foundation{" "}
            <span className="text-muted">is being built.</span>
          </>
        }
      />

      <RevealGroup className="mt-14 space-y-4" stagger={0.1}>
        {education.map((entry) => (
          <RevealItem key={entry.id}>
            <motion.article
              whileHover={reduced ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className={cn(
                "halo relative overflow-hidden rounded-2xl border bg-white/[0.015] p-6 transition-colors duration-500 sm:p-7",
                entry.placeholder
                  ? "border-dashed border-white/12 hover:border-white/22"
                  : "border-white/8 hover:border-white/18",
              )}
            >
              <div
                aria-hidden
                className="absolute -top-24 -right-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.09),transparent_65%)] blur-2xl"
              />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <GraduationCap className="h-5 w-5 text-accent" aria-hidden />
                </span>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-[17px] font-medium tracking-tight text-fg">
                      {entry.school}
                    </h3>
                    {entry.current ? (
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[9.5px] tracking-wider text-accent uppercase">
                        Current
                      </span>
                    ) : null}
                    {entry.placeholder ? (
                      <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-2.5 py-0.5 font-mono text-[9.5px] tracking-wider text-amber-200/90 uppercase">
                        Update me
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-1.5 text-[14px] text-accent/85">{entry.program}</p>

                  <p className="mt-2 flex items-center gap-2 font-mono text-[11.5px] text-faint">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                    {entry.period}
                  </p>

                  <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-muted">
                    {entry.description}
                  </p>

                  {entry.highlights?.length ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {entry.highlights.map((h) => (
                        <li
                          key={h}
                          className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[11.5px] text-muted"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </motion.article>
          </RevealItem>
        ))}
      </RevealGroup>

      <p className="mt-6 font-mono text-[11px] text-faint">
        Edit school details in <span className="text-accent/80">data/education.ts</span>
      </p>
    </Section>
  );
}
