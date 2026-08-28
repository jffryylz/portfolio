/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SKILLS — grouped into cards. Add / remove freely.
 * ─────────────────────────────────────────────────────────────────────────────
 * `level` is your own honest self-assessment and is rendered as a small chip.
 * Set it to undefined if you'd rather not label a skill at all.
 *
 * The seeded levels below are based on what the public GitHub repositories
 * actually demonstrate — adjust them to match where you're really at.
 */

export type SkillLevel = "Learning" | "Familiar" | "Comfortable";

export type Skill = { name: string; level?: SkillLevel };

export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  /** Lucide icon key resolved in components/Skills.tsx */
  icon: "code" | "terminal" | "network" | "wrench";
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "web",
    title: "Web Development",
    blurb: "Building interfaces and shipping them to a real URL.",
    icon: "code",
    skills: [
      { name: "HTML5", level: "Comfortable" },
      { name: "CSS3", level: "Comfortable" },
      { name: "JavaScript", level: "Comfortable" },
      { name: "Responsive Design", level: "Comfortable" },
      { name: "TypeScript", level: "Learning" },
      { name: "React", level: "Learning" },
      { name: "Next.js", level: "Learning" },
      { name: "Tailwind CSS", level: "Learning" },
    ],
  },
  {
    id: "programming",
    title: "Programming & Backend",
    blurb: "Server-side logic, APIs and data persistence.",
    icon: "terminal",
    skills: [
      { name: "Python", level: "Comfortable" },
      { name: "FastAPI", level: "Comfortable" },
      { name: "REST APIs", level: "Comfortable" },
      { name: "Supabase", level: "Familiar" },
      { name: "PostgreSQL", level: "Familiar" },
      { name: "SQL", level: "Familiar" },
    ],
  },
  {
    id: "networking",
    title: "IT & Networking",
    blurb: "Designing, documenting and maintaining infrastructure.",
    icon: "network",
    skills: [
      { name: "Networking Fundamentals", level: "Learning" },
      { name: "TCP/IP", level: "Learning" },
      { name: "VLAN Segmentation", level: "Learning" },
      { name: "Network Topology Design", level: "Familiar" },
      { name: "Cisco Packet Tracer", level: "Learning" },
      { name: "Troubleshooting", level: "Learning" },
    ],
  },
  {
    id: "tools",
    title: "Systems & Tooling",
    blurb: "The environment the work actually happens in.",
    icon: "wrench",
    skills: [
      { name: "Git & GitHub", level: "Comfortable" },
      { name: "VS Code", level: "Comfortable" },
      { name: "Vercel", level: "Familiar" },
      { name: "VirtualBox", level: "Familiar" },
      { name: "Ubuntu / Linux", level: "Familiar" },
      { name: "Windows Server", level: "Learning" },
      { name: "Markdown Docs", level: "Comfortable" },
    ],
  },
];

/** Total distinct technologies — used by the About stat cards. */
export const skillCount = skillGroups.reduce((n, g) => n + g.skills.length, 0);
