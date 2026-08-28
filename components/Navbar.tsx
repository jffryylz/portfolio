"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { GithubIcon as Github } from "./ui/BrandIcons";
import { navItems, sectionIds } from "@/data/navigation";
import { site } from "@/data/site";
import { useActiveSection } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Close the mobile panel on Escape and lock scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const go = useCallback((id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-black"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-90 transition-[padding] duration-500",
          scrolled ? "pt-2 sm:pt-3" : "pt-4 sm:pt-6",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex w-[min(100%-1.5rem,72rem)] items-center justify-between rounded-full px-4 transition-all duration-500 sm:px-5",
            scrolled
              ? "glass-strong h-14 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.9)]"
              : "h-16 border border-transparent bg-transparent",
          )}
        >
          {/* Wordmark */}
          <button
            type="button"
            onClick={() => go("home")}
            className="group flex items-center gap-2.5 rounded-full py-1 pr-3 text-left"
            aria-label="Back to top"
          >
            <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-[13px] font-semibold text-accent transition-colors duration-300 group-hover:border-accent/60">
              {site.initials}
            </span>
            <span className="hidden text-[15px] font-medium tracking-tight sm:block">
              {site.shortName}
              <span className="text-accent">.</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative rounded-full px-3.5 py-2 text-[13.5px] transition-colors duration-300",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="absolute inset-x-3.5 bottom-1 h-px origin-center scale-x-0 bg-linear-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={site.github.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group hidden items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[13px] text-fg transition-all duration-300 hover:border-accent/45 hover:bg-accent/[0.08] sm:flex"
            >
              <Github
                className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-accent"
                aria-hidden
              />
              GitHub
              <ArrowUpRight
                className="h-3.5 w-3.5 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden
              />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.03] text-fg transition-colors hover:border-accent/45 md:hidden"
            >
              {open ? (
                <X className="h-4.5 w-4.5" aria-hidden />
              ) : (
                <Menu className="h-4.5 w-4.5" aria-hidden />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-80 md:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong absolute inset-x-3 top-20 rounded-3xl p-3"
            >
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.045, duration: 0.35 }}
                  >
                    <button
                      type="button"
                      onClick={() => go(item.id)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[15px] transition-colors",
                        active === item.id
                          ? "bg-white/[0.06] text-fg"
                          : "text-muted hover:bg-white/[0.04] hover:text-fg",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-accent/70">
                          0{i + 1}
                        </span>
                        {item.label}
                      </span>
                      {active === item.id ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                      ) : null}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <a
                href={site.github.url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl border border-accent/25 bg-accent/10 px-4 py-3.5 text-[15px] font-medium text-accent"
              >
                <Github className="h-4 w-4" aria-hidden />
                @{site.github.username}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
