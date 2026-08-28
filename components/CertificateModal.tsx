"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Award, Building2, Calendar, X } from "lucide-react";
import type { Certificate } from "@/data/certificates";
import { useScrollLock } from "@/lib/hooks";

export function CertificateModal({
  certificate,
  onClose,
}: {
  certificate: Certificate | null;
  onClose: () => void;
}) {
  const open = certificate !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      // Minimal focus trap so keyboard users cannot tab behind the overlay.
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.addEventListener("keydown", onKeyDown);
    const raf = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(raf);
      previouslyFocused?.focus?.();
    };
  }, [open, onKeyDown]);

  return (
    <AnimatePresence>
      {certificate ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-150 flex items-center justify-center p-4 sm:p-6"
        >
          <button
            type="button"
            aria-label="Close certificate viewer"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-md"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong relative flex max-h-[90svh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,1)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/8 p-5 sm:p-6">
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
                  {certificate.category}
                </p>
                <h3
                  id="certificate-modal-title"
                  className="mt-2 text-lg font-medium tracking-tight text-fg sm:text-xl"
                >
                  {certificate.title}
                </h3>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12.5px] text-muted">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-faint" aria-hidden />
                    {certificate.issuer}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-faint" aria-hidden />
                    {certificate.date}
                  </span>
                </div>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/12 text-muted transition-colors hover:border-white/25 hover:text-fg"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-white/8 bg-black/40">
                <Image
                  src={certificate.image}
                  alt={`${certificate.title} certificate issued by ${certificate.issuer}`}
                  fill
                  sizes="(min-width: 768px) 42rem, 100vw"
                  className="object-contain"
                />
              </div>

              {certificate.description ? (
                <p className="mt-5 text-[13.5px] leading-relaxed text-muted">
                  {certificate.description}
                </p>
              ) : null}
            </div>

            {certificate.credentialUrl ? (
              <div className="border-t border-white/8 p-5 sm:px-6">
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent/[0.12] px-5 py-2.5 text-[13px] font-medium text-accent ring-1 ring-accent/25 transition-colors hover:bg-accent/20"
                >
                  <Award className="h-4 w-4" aria-hidden />
                  Verify credential
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
