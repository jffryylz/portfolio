/**
 * ─────────────────────────────────────────────────────────────────────────────
 * COURSES & TECHNICAL TRAINING — the scrolling timeline.
 * ─────────────────────────────────────────────────────────────────────────────
 * Entries render newest-first in the order you write them.
 *
 * `placeholder: true` renders the milestone with a dashed border and a
 * "Placeholder" chip so nothing on the site ever looks like a claim you
 * haven't earned. Remove the flag (and edit the details) once it's real.
 */

export type CourseStatus = "Completed" | "In Progress" | "Planned";

export type Course = {
  id: string;
  year: string;
  title: string;
  provider: string;
  status: CourseStatus;
  description: string;
  /** Lucide icon key resolved in components/CoursesTimeline.tsx */
  icon: "server" | "network" | "shield" | "code" | "book";
  placeholder?: boolean;
};

export const courses: Course[] = [
  {
    id: "itep-414",
    year: "2026",
    title: "System Administration & Maintenance (ITEP 414)",
    provider: "BSIT Program · 1st Semester, AY 2026–2027",
    status: "In Progress",
    icon: "server",
    description:
      "Weekly laboratory work on professional environment setup, virtualization with VirtualBox, Ubuntu and Windows Server images, and enterprise infrastructure planning — including a VLAN-segmented network topology for a 20-employee organisation.",
  },
  {
    id: "cisco-itn",
    year: "TBD",
    title: "CCNA: Introduction to Networks",
    provider: "Cisco Networking Academy",
    status: "Planned",
    icon: "network",
    placeholder: true,
    description:
      "Placeholder — edit or delete this entry in data/courses.ts. Add the real dates and description once you enrol or complete it.",
  },
  {
    id: "cisco-srwe",
    year: "TBD",
    title: "Switching, Routing & Wireless Essentials",
    provider: "Cisco Networking Academy",
    status: "Planned",
    icon: "network",
    placeholder: true,
    description:
      "Placeholder — edit or delete this entry in data/courses.ts.",
  },
];
