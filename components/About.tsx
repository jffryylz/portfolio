"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { FolderGit2, GraduationCap, Layers, MapPin, Star } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { quickFacts, site } from "@/data/site";
import { projects } from "@/data/projects";
import { certificates } from "@/data/certificates";
import { skillCount } from "@/data/skills";

export function About({
  repoCount,
  avatarUrl,
}: {
  repoCount: number | null;
  avatarUrl: string | null;
}) {
  const reduced = useReducedMotion();
  const realCertificates = certificates.filter((c) => !c.placeholder).length;

  const stats = [
    {
      label: "Projects",
      value: String(projects.length),
      icon: FolderGit2,
      hint: "curated builds",
    },
    {
      label: "Certificates",
      value: realCertificates > 0 ? String(realCertificates) : "—",
      icon: Star,
      hint: realCertificates > 0 ? "verified" : "coming soon",
    },
    {
      label: "Technologies",
      value: String(skillCount),
      icon: Layers,
      hint: "in the toolkit",
    },
    {
      label: "GitHub Repos",
      value: repoCount !== null ? String(repoCount) : "—",
      icon: GraduationCap,
      hint: "public",
    },
  ];

  const photo = site.profileImage || avatarUrl;

  return (
    <Section id="about">
      <SectionHeading
        id="about"
        eyebrow="01 — About"
        title={
          <>
            An IT student who ships,{" "}
            <span className="text-muted">documents and keeps learning.</span>
          </>
        }
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        {/* Narrative */}
        <div className="space-y-5 text-[15px] leading-[1.75] text-muted">
          <Reveal delay={0.05}>
            <p>
              I&apos;m a{" "}
              <strong className="font-medium text-fg">
                Bachelor of Science in Information Technology
              </strong>{" "}
              student focused on the two halves of the field that keep pulling me
              in: building web applications, and understanding the systems and
              networks they run on.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p>
              On the development side I build things end-to-end — a real-time
              billiards scoring app with a{" "}
              <span className="text-fg">FastAPI</span> backend,{" "}
              <span className="text-fg">Supabase</span> persistence and a vanilla
              JavaScript front end, deployed and running. I&apos;m currently
              deepening that with TypeScript, React and Next.js.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p>
              On the IT side I document everything publicly. My system
              administration coursework includes a complete enterprise
              infrastructure plan — hardware and software inventories, a{" "}
              <span className="text-fg">VLAN-segmented network topology</span>,
              and virtualised Ubuntu and Windows Server environments.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p>
              I&apos;m working toward Cisco networking credentials and looking for
              opportunities where I can contribute real work while I keep getting
              better.
            </p>
          </Reveal>

          {/* Stat cards */}
          <RevealGroup className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4" stagger={0.07}>
            {stats.map((stat) => (
              <RevealItem key={stat.label}>
                <div className="halo group relative h-full overflow-hidden rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-colors duration-400 hover:border-white/16 hover:bg-white/[0.04]">
                  <stat.icon
                    className="mb-3 h-4 w-4 text-faint transition-colors duration-300 group-hover:text-accent"
                    aria-hidden
                  />
                  <div className="text-2xl font-semibold tracking-tight text-fg tabular-nums">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-muted">{stat.label}</div>
                  <div className="mt-1 font-mono text-[10px] tracking-wide text-faint">
                    {stat.hint}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Profile card */}
        <Reveal direction="left" delay={0.1}>
          <motion.div
            whileHover={reduced ? undefined : { y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="glass halo relative overflow-hidden rounded-2xl p-6 sm:p-7"
          >
            <div
              aria-hidden
              className="absolute -top-24 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_65%)] blur-2xl"
            />

            <div className="relative flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/12 bg-elevated">
                {photo ? (
                  <Image
                    src={photo}
                    alt={`Portrait of ${site.name}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <span className="grid h-full w-full place-items-center font-mono text-lg text-accent">
                    {site.initials}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[17px] font-medium tracking-tight text-fg">
                  {site.name}
                </p>
                <p className="truncate text-[13px] text-muted">{site.role}</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-faint">
                  <MapPin className="h-3 w-3" aria-hidden />
                  {site.location}
                </p>
              </div>
            </div>

            <div className="rule my-6" />

            <dl className="space-y-3.5">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
                    {fact.label}
                  </dt>
                  <dd className="text-right text-[13.5px] text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="rule my-6" />

            <div className="flex flex-wrap gap-2">
              {["Web Development", "System Administration", "Networking"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-accent/20 bg-accent/[0.07] px-3 py-1.5 text-[11.5px] text-accent/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
}
