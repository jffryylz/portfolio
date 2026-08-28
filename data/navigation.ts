export type NavItem = { label: string; id: string };

/** Links shown in the navbar. `id` must match a <section id="..."> in app/page.tsx. */
export const navItems: NavItem[] = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Certificates", id: "certificates" },
  { label: "Contact", id: "contact" },
];

/** Every section on the page, in order — used by the scroll-spy. */
export const sectionIds = [
  "home",
  "about",
  "skills",
  "projects",
  "github",
  "certificates",
  "courses",
  "education",
  "contact",
] as const;
