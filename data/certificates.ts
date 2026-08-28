/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CERTIFICATES — this is the only file you edit to add a certificate.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * HOW TO ADD ONE
 * 1. Save the certificate image (JPG / PNG / WEBP) into  public/certificates/
 *    e.g.  public/certificates/ccna-intro-networks.jpg
 * 2. Copy the block below, paste it into the `certificates` array and fill it in.
 * 3. `image` is the public path — it always starts with "/certificates/".
 * 4. `credentialUrl` is optional. Leave "" and the verify button is hidden.
 *
 *   {
 *     id: "ccna-itn",
 *     title: "CCNA: Introduction to Networks",
 *     issuer: "Cisco Networking Academy",
 *     date: "March 2026",
 *     category: "Cisco",
 *     image: "/certificates/ccna-intro-networks.jpg",
 *     credentialUrl: "https://www.credly.com/badges/...",
 *     description: "Optional one-liner shown inside the lightbox.",
 *   },
 *
 * The category filter pills are generated automatically from the `category`
 * values you use — "Cisco", "IT", "Web Development", "Networking", "Courses", …
 */

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  /** Path under /public, e.g. "/certificates/foo.jpg" */
  image: string;
  credentialUrl?: string;
  description?: string;
  /** Sample rows are visibly tagged in the UI. Delete this flag on real ones. */
  placeholder?: boolean;
};

export const certificates: Certificate[] = [
  // ⚠️ SAMPLE ROW — it exists only so you can see how a card and the lightbox
  // look. Delete this object once you add your first real certificate.
  {
    id: "sample",
    title: "Your Certificate Title",
    issuer: "Issuing Organization",
    date: "2026",
    category: "Courses",
    image: "/certificates/sample-certificate.svg",
    credentialUrl: "",
    description:
      "Replace this sample in data/certificates.ts and drop your image into public/certificates/.",
    placeholder: true,
  },
];
