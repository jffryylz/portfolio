"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, FileText, Globe, Mail } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin, type IconComponent } from "./ui/BrandIcons";

import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { site, socials, type SocialLink } from "@/data/site";
import { cn } from "@/lib/utils";

const icons: Record<SocialLink["icon"], IconComponent> = {
  github: Github,
  mail: Mail,
  linkedin: Linkedin,
  globe: Globe,
};

export function Contact() {
  const reduced = useReducedMotion();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden py-28 sm:py-32 lg:py-40"
    >
      {/* Local glow — this is the emotional peak of the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[38rem] -translate-y-1/2 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(34,211,238,0.10),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden className="h-px w-8 bg-linear-to-r from-transparent to-accent/70" />
            <span className="font-mono text-[11px] tracking-[0.24em] text-accent uppercase">
              08 — Contact
            </span>
            <span aria-hidden className="h-px w-8 bg-linear-to-l from-transparent to-accent/70" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="contact-heading"
            className="mt-6 text-[clamp(2.2rem,6vw,3.6rem)] leading-[1.06] font-semibold tracking-[-0.035em]"
          >
            Let&apos;s Build <span className="text-gradient">Something.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
            I&apos;m always interested in learning, building, and collaborating on
            meaningful projects.
          </p>
        </Reveal>

        <RevealGroup
          className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-3"
          stagger={0.09}
        >
          {socials.map((link) => {
            const Icon = icons[link.icon];
            const disabled = !link.href;

            const inner = (
              <>
                <span
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-xl border transition-all duration-400",
                    disabled
                      ? "border-white/8 bg-white/[0.02]"
                      : "border-white/10 bg-white/[0.04] group-hover:-translate-y-0.5 group-hover:border-accent/35 group-hover:bg-accent/10",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4.5 w-4.5 transition-colors duration-400",
                      disabled ? "text-faint" : "text-muted group-hover:text-accent",
                    )}
                    aria-hidden
                  />
                </span>

                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-[14px] font-medium text-fg">{link.label}</span>
                  <span
                    className={cn(
                      "block truncate font-mono text-[11.5px]",
                      disabled ? "text-faint italic" : "text-muted",
                    )}
                  >
                    {link.handle}
                  </span>
                </span>

                {!disabled ? (
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                ) : null}
              </>
            );

            return (
              <RevealItem key={link.label}>
                {disabled ? (
                  <div
                    className="flex h-full items-center gap-3.5 rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-4"
                    title="Add this link in data/site.ts"
                  >
                    {inner}
                  </div>
                ) : (
                  <motion.a
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    whileHover={reduced ? undefined : { y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="halo group relative flex h-full items-center gap-3.5 rounded-2xl border border-white/8 bg-white/[0.02] p-4 transition-colors duration-400 hover:border-white/18"
                  >
                    {inner}
                  </motion.a>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={site.github.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2.5 rounded-full bg-linear-to-r from-accent to-accent-deep px-6 py-3.5 text-[14px] font-medium text-black shadow-[0_10px_36px_-12px_rgba(34,211,238,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Github className="h-4 w-4" aria-hidden />
              View my GitHub
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>

            {site.resumeUrl ? (
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3.5 text-[14px] font-medium text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45"
              >
                <FileText className="h-4 w-4 text-muted transition-colors group-hover:text-accent" aria-hidden />
                Download résumé
              </a>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
