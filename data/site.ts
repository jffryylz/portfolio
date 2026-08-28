/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE CONFIGURATION — edit everything about "you" here.
 * ─────────────────────────────────────────────────────────────────────────────
 * Anything marked TODO is a placeholder. Fill it in or leave it empty:
 * empty links are automatically hidden / shown as "not set" in the UI.
 */

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  /** Lucide icon key resolved in components/Contact.tsx */
  icon: "github" | "mail" | "linkedin" | "globe";
};

export const site = {
  /** Full legal / professional name — used in SEO + About card. */
  name: "Jeffrey Policarpio",
  /** Short name used in the hero code panel and footer. */
  shortName: "Jeffry",
  initials: "JP",

  role: "IT & Web Development Student",
  /** Small badge above the hero headline. */
  badge: "IT • WEB DEVELOPMENT • CISCO",
  headline: "Building Digital Experiences with Code.",
  description:
    "I'm an IT and Web Development student who builds practical, working applications — from full-stack web apps to documented network and system infrastructure. I care about clean code, real deployments, and getting measurably better with every project.",

  /** Shown next to the pulsing dot in the hero. */
  status: "Currently learning & building",

  location: "Sta. Cruz, Laguna, Philippines",

  /** TODO: add the email you want recruiters to use. Leave "" to hide it. */
  email: "",

  /** TODO: drop your CV at public/resume.pdf, then set this to "/resume.pdf". */
  resumeUrl: "",

  /**
   * Profile photo. Drop an image at public/images/profile.jpg and set the path.
   * Leave "" to fall back to your live GitHub avatar.
   */
  profileImage: "",

  github: {
    username: "jffryylz",
    url: "https://github.com/jffryylz",
  },

  /**
   * ⚠️ PLACEHOLDER — this is NOT a live site yet. It only feeds the Open Graph
   * and canonical <link> tags, so the wrong value breaks link previews, not the
   * site. Replace it with the real domain Vercel gives you after your first
   * deploy (e.g. "https://jeffry-portfolio.vercel.app").
   */
  url: "https://jffryylz.vercel.app",
} as const;

/**
 * Contact + social links. Set `href: ""` for anything you don't have yet —
 * the Contact section renders it as a clearly-marked placeholder instead of
 * a broken link.
 */
export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: site.github.url,
    handle: `@${site.github.username}`,
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/policarpio-jeffrey-6828253a9/",
    handle: "Jeffrey Policarpio",
    icon: "linkedin",
  },
  {
    // TODO: set site.email above to activate this card.
    label: "Email",
    href: site.email ? `mailto:${site.email}` : "",
    handle: site.email || "Not set yet",
    icon: "mail",
  },
];

/** Quick facts rendered in the About card. Free-form — add or remove rows. */
export const quickFacts: { label: string; value: string }[] = [
  { label: "Course", value: "BSc Information Technology" },
  { label: "Focus", value: "Web Dev · Systems · Networking" },
  { label: "Based in", value: "Laguna, Philippines" },
  { label: "Open to", value: "Internships & junior roles" },
];
