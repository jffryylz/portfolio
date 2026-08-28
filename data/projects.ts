/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PROJECTS — add a new object to the array and it appears on the site.
 * ─────────────────────────────────────────────────────────────────────────────
 * The filter pills in the Projects section are generated automatically from
 * the `category` values below, so a new category needs no code changes.
 *
 * `image` is optional. Drop a screenshot in public/projects/ and set
 * image: "/projects/my-shot.png". If omitted, a generated cover is used.
 *
 * These entries were seeded from the public repositories on
 * https://github.com/jffryylz — descriptions come from each repo's README.
 */

export type ProjectStatus = "Live" | "Completed" | "In Progress" | "Planned";

export type Project = {
  slug: string;
  title: string;
  /** One or two sentences. Keep it concrete. */
  description: string;
  /** Shown as badges on the card. */
  tech: string[];
  category: string;
  status: ProjectStatus;
  github: string;
  /** Live deployment. Leave "" to hide the button. */
  demo?: string;
  /** e.g. "/projects/billiards.png" */
  image?: string;
  /** Featured projects render first and get a wider card on desktop. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "billiards-scoring",
    title: "Billiards Scoring Web App",
    description:
      "A two-team billiards scoring system with cumulative 1–15 scoring, per-team undo history, automatic winner detection and persistent state. FastAPI backend, Supabase (PostgreSQL) storage and a vanilla JS front end that auto-syncs every five seconds.",
    tech: ["Python", "FastAPI", "Supabase", "PostgreSQL", "JavaScript", "CSS3", "Vercel"],
    category: "Web Development",
    status: "Completed",
    github: "https://github.com/jffryylz/billiards-scoring",
    demo: "",
    featured: true,
  },
  {
    slug: "bsit-system-administration-portfolio",
    title: "System Administration Portfolio",
    description:
      "An ongoing technical portfolio for ITEP 414 — System Administration and Maintenance. Includes a full enterprise infrastructure plan for a 20-employee startup: hardware, software and network inventories, a VLAN-segmented topology diagram, and administration role research.",
    tech: ["Windows Server", "Ubuntu", "VirtualBox", "VLAN Design", "Markdown", "Git"],
    category: "IT & Systems",
    status: "In Progress",
    github: "https://github.com/jffryylz/BSIT-SystemAdministration-Portfolio",
    demo: "",
    featured: true,
  },
  {
    slug: "activity01-auth-ui",
    title: "Login & Register Interface",
    description:
      "A hand-written login and registration interface built from scratch with semantic HTML and form markup — an early coursework exercise in structuring accessible forms without a framework.",
    tech: ["HTML5", "CSS3", "Forms"],
    category: "Coursework",
    status: "Completed",
    github: "https://github.com/jffryylz/Activity01",
    demo: "",
  },
  {
    slug: "kids-ecommerce",
    title: "Kids E-Commerce Store",
    description:
      "A planned e-commerce storefront — repository is reserved and the build has not started yet. Update this entry once the first commits land.",
    tech: ["TBD"],
    category: "Web Development",
    status: "Planned",
    github: "https://github.com/jffryylz/kids-ecommerce",
    demo: "",
  },
];
