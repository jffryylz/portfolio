/**
 * ─────────────────────────────────────────────────────────────────────────────
 * EDUCATION — update the placeholders below with your real details.
 * ─────────────────────────────────────────────────────────────────────────────
 * Only the BSIT programme details were confirmed from your public GitHub
 * repositories. The school name and years are TODO — please fill them in.
 */

export type EducationEntry = {
  id: string;
  school: string;
  program: string;
  period: string;
  description: string;
  /** Extra detail chips, e.g. section or academic year. */
  highlights?: string[];
  current?: boolean;
  placeholder?: boolean;
};

export const education: EducationEntry[] = [
  {
    id: "bsit",
    // TODO: replace with your university's name.
    school: "Your University / College",
    program: "Bachelor of Science in Information Technology (BSIT)",
    period: "1st Semester, AY 2026–2027",
    current: true,
    placeholder: true,
    description:
      "Coursework across web development, programming, networking and system administration, with hands-on laboratory work documented publicly on GitHub.",
    highlights: ["Section BSIT B", "ITEP 414 — System Administration"],
  },
  // Add senior high school or other programmes here:
  // {
  //   id: "shs",
  //   school: "Your Senior High School",
  //   program: "STEM / ICT Strand",
  //   period: "2022 – 2024",
  //   description: "Short description of what you focused on.",
  // },
];
