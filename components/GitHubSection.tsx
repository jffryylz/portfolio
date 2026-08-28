"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { AlertCircle, ArrowUpRight, GitBranch, Star, Users } from "lucide-react";
import { GithubIcon as Github } from "./ui/BrandIcons";
import { Section, SectionHeading } from "./ui/Section";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { languageColor, type GitHubData } from "@/lib/github";
import { site } from "@/data/site";
import { formatMonthYear, timeAgo } from "@/lib/utils";

function Fallback() {
  return (
    <div className="glass mt-14 flex flex-col items-center gap-4 rounded-2xl p-10 text-center">
      <AlertCircle className="h-6 w-6 text-amber-300/80" aria-hidden />
      <p className="max-w-md text-[14px] leading-relaxed text-muted">
        Live GitHub statistics could not be loaded right now — rather than show
        numbers that might be wrong, this panel stays empty. The profile itself is
        always up to date.
      </p>
      <a
        href={site.github.url}
        target="_blank"
        rel="noreferrer noopener"
        className="group inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-2.5 text-[13px] text-fg transition-colors hover:border-accent/40 hover:text-accent"
      >
        <Github className="h-4 w-4" aria-hidden />
        Open @{site.github.username}
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden
        />
      </a>
    </div>
  );
}

export function GitHubSection({ data }: { data: GitHubData }) {
  const reduced = useReducedMotion();
  const { ok, profile, repos, languages, activity, totalStars } = data;

  const topRepos = repos.slice(0, 5);
  const barLanguages = languages.slice(0, 6);

  return (
    <Section id="github">
      <SectionHeading
        id="github"
        eyebrow="04 — GitHub"
        title={
          <>
            Live from the source.{" "}
            <span className="text-muted">Pulled straight from the API.</span>
          </>
        }
        description="Every number on this panel is fetched from the public GitHub API and refreshed hourly — nothing here is hand-written."
      />

      {!ok || !profile ? (
        <Fallback />
      ) : (
        <div className="mt-14 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Profile + counters */}
          <Reveal>
            <div className="glass halo relative h-full overflow-hidden rounded-2xl p-6 sm:p-7">
              <div
                aria-hidden
                className="absolute -top-20 -left-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12),transparent_65%)] blur-2xl"
              />

              <div className="relative flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/12">
                  <Image
                    src={profile.avatar_url}
                    alt={`${profile.login} avatar`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[16px] font-medium tracking-tight text-fg">
                    {profile.name ?? profile.login}
                  </p>
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline font-mono text-[12.5px] text-accent"
                  >
                    @{profile.login}
                  </a>
                </div>
              </div>

              {profile.bio ? (
                <p className="relative mt-4 text-[13.5px] leading-relaxed text-muted">
                  {profile.bio}
                </p>
              ) : null}

              <dl className="relative mt-6 grid grid-cols-3 gap-3">
                {[
                  { label: "Repos", value: profile.public_repos, icon: GitBranch },
                  { label: "Followers", value: profile.followers, icon: Users },
                  { label: "Stars", value: totalStars, icon: Star },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-white/8 bg-white/[0.02] p-3.5 text-center transition-colors duration-300 hover:border-white/16"
                  >
                    <s.icon className="mx-auto mb-2 h-3.5 w-3.5 text-faint" aria-hidden />
                    <dd className="text-xl font-semibold tracking-tight tabular-nums">
                      {s.value}
                    </dd>
                    <dt className="mt-0.5 font-mono text-[10px] tracking-wider text-faint uppercase">
                      {s.label}
                    </dt>
                  </div>
                ))}
              </dl>

              {/* Language distribution */}
              {barLanguages.length > 0 ? (
                <div className="relative mt-6">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                    Language distribution
                  </p>
                  <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-white/[0.05]">
                    {barLanguages.map((lang, i) => (
                      <motion.span
                        key={lang.name}
                        initial={reduced ? false : { width: 0 }}
                        whileInView={{ width: `${lang.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        style={{ backgroundColor: languageColor(lang.name) }}
                        title={`${lang.name} ${lang.percent.toFixed(1)}%`}
                      />
                    ))}
                  </div>
                  <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-2">
                    {barLanguages.map((lang) => (
                      <li key={lang.name} className="flex items-center gap-2 text-[12px] text-muted">
                        <span
                          aria-hidden
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: languageColor(lang.name) }}
                        />
                        {lang.name}
                        <span className="font-mono text-[10.5px] text-faint tabular-nums">
                          {lang.percent.toFixed(1)}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <p className="relative mt-6 font-mono text-[10.5px] text-faint">
                On GitHub since {formatMonthYear(profile.created_at)}
              </p>
            </div>
          </Reveal>

          {/* Repositories + activity */}
          <div className="flex flex-col gap-5">
            <RevealGroup className="flex flex-col gap-2.5" stagger={0.06}>
              {topRepos.map((repo) => (
                <RevealItem key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.015] p-4 transition-all duration-400 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white/[0.035]"
                  >
                    <GitBranch
                      className="mt-0.5 h-4 w-4 shrink-0 text-faint transition-colors duration-300 group-hover:text-accent"
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-mono text-[13.5px] text-fg">
                          {repo.name}
                        </span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 shrink-0 text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                          aria-hidden
                        />
                      </div>
                      {repo.description ? (
                        <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-muted">
                          {repo.description}
                        </p>
                      ) : null}
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10.5px] text-faint">
                        {repo.language ? (
                          <span className="flex items-center gap-1.5">
                            <span
                              aria-hidden
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: languageColor(repo.language) }}
                            />
                            {repo.language}
                          </span>
                        ) : null}
                        {repo.stargazers_count > 0 ? (
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" aria-hidden />
                            {repo.stargazers_count}
                          </span>
                        ) : null}
                        <span>updated {timeAgo(repo.pushed_at)}</span>
                      </div>
                    </div>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>

            {activity.length > 0 ? (
              <Reveal delay={0.15}>
                <div className="rounded-xl border border-white/8 bg-white/[0.015] p-5">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                    Recent public activity
                  </p>
                  <ul className="mt-4 space-y-3">
                    {activity.map((item) => (
                      <li key={item.id} className="flex items-start gap-3 text-[12.5px]">
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                        />
                        <span className="min-w-0 flex-1 text-muted">
                          <span className="text-fg">{item.action}</span>
                          <span aria-hidden className="mx-1.5 text-faint">
                            ·
                          </span>
                          <a
                            href={item.repoUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="link-underline font-mono text-accent/90"
                          >
                            {item.repo.split("/")[1] ?? item.repo}
                          </a>
                        </span>
                        <span className="shrink-0 font-mono text-[10.5px] text-faint">
                          {timeAgo(item.createdAt)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      )}
    </Section>
  );
}
