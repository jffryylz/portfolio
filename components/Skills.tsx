"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import { Code2, Network, Terminal, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { skillGroups, type SkillGroup, type SkillLevel } from "@/data/skills";
import { cn } from "@/lib/utils";

const icons: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2,
  terminal: Terminal,
  network: Network,
  wrench: Wrench,
};

const levelStyles: Record<SkillLevel, string> = {
  Comfortable: "border-accent/30 bg-accent/[0.09] text-accent",
  Familiar: "border-white/14 bg-white/[0.05] text-fg/85",
  Learning: "border-white/8 bg-white/[0.02] text-muted",
};

function GroupCard({ group }: { group: SkillGroup }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, rgba(34,211,238,0.08), transparent 65%)`;
  const Icon = icons[group.icon];

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      whileHover={reduced ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className="halo group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.015] p-6 transition-colors duration-500 hover:border-white/14 sm:p-7"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <div className="relative flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-400 group-hover:-translate-y-0.5 group-hover:border-accent/35 group-hover:bg-accent/10">
          <Icon
            className="h-5 w-5 text-muted transition-colors duration-400 group-hover:text-accent"
            aria-hidden
          />
        </span>
        <div>
          <h3 className="text-[17px] font-medium tracking-tight text-fg">{group.title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">{group.blurb}</p>
        </div>
      </div>

      <ul className="relative mt-6 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li key={skill.name}>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[12.5px] transition-all duration-300 hover:-translate-y-0.5",
                skill.level ? levelStyles[skill.level] : "border-white/8 bg-white/[0.02] text-muted",
              )}
            >
              {skill.name}
              {skill.level ? (
                <span className="font-mono text-[9.5px] tracking-wider opacity-60 uppercase">
                  {skill.level.slice(0, 4)}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        eyebrow="02 — Skills"
        title={
          <>
            The stack I build with,{" "}
            <span className="text-muted">and the one I&apos;m growing into.</span>
          </>
        }
        description="Grouped by what I actually use. Labels are honest: Comfortable means I have shipped with it, Learning means it is in progress right now."
      />

      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.09}>
        {skillGroups.map((group) => (
          <RevealItem key={group.id} className="h-full">
            <GroupCard group={group} />
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10.5px] tracking-wide text-faint uppercase">
        {(["Comfortable", "Familiar", "Learning"] as SkillLevel[]).map((level) => (
          <span key={level} className="flex items-center gap-2">
            <span
              aria-hidden
              className={cn(
                "h-2 w-2 rounded-full",
                level === "Comfortable" && "bg-accent",
                level === "Familiar" && "bg-white/45",
                level === "Learning" && "bg-white/15",
              )}
            />
            {level}
          </span>
        ))}
      </div>
    </Section>
  );
}
