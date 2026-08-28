import { ArrowUp } from "lucide-react";
import { GithubIcon as Github } from "./ui/BrandIcons";
import { site } from "@/data/site";

/**
 * Server component on purpose: the copyright year is resolved when the page
 * is generated, so it can never disagree with what the client renders.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:px-8 md:flex-row">
        <div className="flex flex-col items-center gap-1.5 md:items-start">
          <p className="text-[13.5px] text-muted">
            © {year} {site.shortName}
          </p>
          <p className="font-mono text-[11.5px] text-faint">
            Built with Next.js &amp; passion for technology.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={site.github.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`GitHub profile of ${site.name}`}
            className="group flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[12.5px] text-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent"
          >
            <Github className="h-3.5 w-3.5" aria-hidden />
            @{site.github.username}
          </a>

          <a
            href="#home"
            aria-label="Back to top"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
