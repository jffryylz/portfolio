"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Building2, Calendar, Maximize2 } from "lucide-react";
import type { Certificate } from "@/data/certificates";
import { cn } from "@/lib/utils";

export function CertificateCard({
  certificate,
  onOpen,
}: {
  certificate: Certificate;
  onOpen: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? undefined : { y: -5 }}
      className="h-full"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View certificate: ${certificate.title} from ${certificate.issuer}`}
        className={cn(
          "halo group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white/[0.015] text-left transition-colors duration-500",
          certificate.placeholder
            ? "border-dashed border-white/14 hover:border-white/25"
            : "border-white/8 hover:border-white/18",
        )}
      >
        {/* Thumbnail */}
        <div className="relative aspect-4/3 overflow-hidden border-b border-white/8 bg-black/30">
          <Image
            src={certificate.image}
            alt={`${certificate.title} certificate thumbnail`}
            fill
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
            className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />

          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-base/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <span
            aria-hidden
            className="absolute right-3 bottom-3 grid h-8 w-8 translate-y-2 place-items-center rounded-full border border-white/15 bg-black/60 text-accent opacity-0 backdrop-blur-sm transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </span>

          <span className="absolute top-3 left-3 rounded-full border border-accent/25 bg-black/60 px-2.5 py-1 font-mono text-[9.5px] tracking-wider text-accent uppercase backdrop-blur-sm">
            {certificate.category}
          </span>

          {certificate.placeholder ? (
            <span className="absolute top-3 right-3 rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 font-mono text-[9.5px] tracking-wider text-amber-200 uppercase backdrop-blur-sm">
              Sample
            </span>
          ) : null}
        </div>

        {/* Meta */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-[15px] leading-snug font-medium tracking-tight text-fg transition-colors duration-300 group-hover:text-accent">
            {certificate.title}
          </h3>

          <div className="mt-auto space-y-1.5 pt-4 text-[12px] text-muted">
            <p className="flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5 shrink-0 text-faint" aria-hidden />
              <span className="truncate">{certificate.issuer}</span>
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-faint" aria-hidden />
              {certificate.date}
            </p>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
