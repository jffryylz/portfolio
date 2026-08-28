"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { FileBadge } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { CertificateCard } from "./CertificateCard";
import { CertificateModal } from "./CertificateModal";
import { certificates, type Certificate } from "@/data/certificates";
import { cn } from "@/lib/utils";

export function Certificates() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Certificate | null>(null);

  const filters = useMemo(() => {
    const set = new Set(certificates.map((c) => c.category));
    return ["All", ...[...set].sort()];
  }, []);

  const visible = useMemo(
    () => (filter === "All" ? certificates : certificates.filter((c) => c.category === filter)),
    [filter],
  );

  return (
    <Section id="certificates">
      <SectionHeading
        id="certificates"
        eyebrow="05 — Certifications"
        title={
          <>
            Credentials and completed training,{" "}
            <span className="text-muted">verifiable.</span>
          </>
        }
        description="Click any certificate to open the full-size version. Categories are generated from the data, so new issuers appear automatically."
      />

      {certificates.length === 0 ? (
        <Reveal>
          <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/12 bg-white/[0.015] p-12 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
              <FileBadge className="h-5 w-5 text-accent" aria-hidden />
            </span>
            <p className="text-[15px] text-fg">No certificates published yet</p>
            <p className="max-w-sm text-[13px] leading-relaxed text-muted">
              Add an image to <code className="font-mono text-accent/85">public/certificates/</code>{" "}
              and a matching entry in{" "}
              <code className="font-mono text-accent/85">data/certificates.ts</code> — it will show
              up here instantly.
            </p>
          </div>
        </Reveal>
      ) : (
        <>
          {filters.length > 2 ? (
            <Reveal delay={0.1}>
              <div
                role="tablist"
                aria-label="Filter certificates by category"
                className="mt-10 flex flex-wrap gap-2"
              >
                <LayoutGroup id="certificate-filters">
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
                            layoutId="certificate-filter-pill"
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

          <motion.div
            layout
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  onOpen={() => setSelected(certificate)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <p className="mt-6 font-mono text-[11px] text-faint">
            Add new certificates in{" "}
            <span className="text-accent/80">data/certificates.ts</span>
          </p>
        </>
      )}

      <CertificateModal certificate={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
