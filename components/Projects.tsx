"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState("All");

  // Filters come straight from the data — adding a category needs no code change.
  const filters = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["All", ...[...set].sort()];
  }, []);

  const visible = useMemo(() => {
    const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    return [...list].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [filter]);

  return (
    <Section id="projects">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="projects"
          eyebrow="03 — Projects"
          title={
            <>
              Things I have actually built{" "}
              <span className="text-muted">and shipped.</span>
            </>
          }
          description="Every project below links to its public repository. No mockups, no concepts — working code."
        />

        <Reveal direction="left" delay={0.1}>
          <a
            href={`${site.github.url}?tab=repositories`}
            target="_blank"
            rel="noreferrer noopener"
            className="group link-underline inline-flex shrink-0 items-center gap-2 text-[13.5px] text-muted transition-colors hover:text-accent"
          >
            All repositories
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </Reveal>
      </div>

      {/* Filters */}
      {filters.length > 2 ? (
        <Reveal delay={0.15}>
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="mt-10 flex flex-wrap gap-2"
          >
            <LayoutGroup id="project-filters">
              {filters.map((f) => {
                const isActive = filter === f;
                return (
                  <button
                    key={f}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[12.5px] transition-colors duration-300",
                      isActive ? "text-black" : "text-muted hover:text-fg",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="project-filter-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-accent"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-white/20"
                      />
                    )}
                    <span className="relative z-10 font-medium">{f}</span>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>
        </Reveal>
      ) : null}

      {/* Grid */}
      <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 ? (
        <p className="mt-10 text-center text-[14px] text-muted">
          No projects in this category yet.
        </p>
      ) : null}
    </Section>
  );
}
