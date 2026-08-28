# Jeffry — IT & Web Development Portfolio

A dark, premium, single-page portfolio built with **Next.js 16**, **TypeScript**,
**Tailwind CSS v4**, **Motion** and **Lucide**. Content lives in plain data files,
so you can update the whole site without touching a single component.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
npm run lint
```

---

## Where to edit everything

| I want to change…                          | Edit this file                    |
| ------------------------------------------ | --------------------------------- |
| Name, headline, bio, status, location      | `data/site.ts`                    |
| Email, LinkedIn, GitHub, résumé link       | `data/site.ts`                    |
| Profile photo                              | `data/site.ts` + `public/images/` |
| Projects                                   | `data/projects.ts`                |
| Skills and skill levels                    | `data/skills.ts`                  |
| Certificates                               | `data/certificates.ts`            |
| Cisco / IT courses timeline                | `data/courses.ts`                 |
| Education                                  | `data/education.ts`               |
| Navbar links                               | `data/navigation.ts`              |
| Colours, glass, grid, animations           | `app/globals.css`                 |
| Page title, description, Open Graph        | `app/layout.tsx`                  |

Every data file has comments at the top explaining each field.

---

## The five things to do first

### 1. Add your email

`data/site.ts` → `email: ""`. Until it is set, the Email card in the Contact
section renders as a clearly-marked placeholder instead of a broken link.

### 2. Add your school

`data/education.ts` → replace `"Your University / College"` and remove
`placeholder: true`. The amber "Update me" chip disappears once you do.

### 3. Add your certificates

1. Drop the image into `public/certificates/` — e.g. `ccna-itn.jpg`
2. Add an entry to `data/certificates.ts`:

```ts
{
  id: "ccna-itn",
  title: "CCNA: Introduction to Networks",
  issuer: "Cisco Networking Academy",
  date: "March 2026",
  category: "Cisco",
  image: "/certificates/ccna-itn.jpg",
  credentialUrl: "https://www.credly.com/badges/...", // optional
  description: "Optional line shown inside the lightbox.",
}
```

3. Delete the `id: "sample"` entry that ships with the repo.

Category filter pills are generated from your `category` values — a new category
appears on its own. Cards open a full-screen lightbox with ESC, click-outside and
focus-trap support.

### 4. Add your résumé

Put the PDF at `public/resume.pdf`, then set `resumeUrl: "/resume.pdf"` in
`data/site.ts`. A "Download résumé" button appears in the Contact section.

### 5. Add a profile photo

Put the image at `public/images/profile.jpg`, then set
`profileImage: "/images/profile.jpg"` in `data/site.ts`. If you leave it empty,
your live GitHub avatar is used instead.

---

## Adding a project

Append to the array in `data/projects.ts`:

```ts
{
  slug: "my-app",                    // unique
  title: "My App",
  description: "What it does, concretely.",
  tech: ["Next.js", "TypeScript", "Supabase"],
  category: "Web Development",       // becomes a filter pill automatically
  status: "Live",                    // Live | Completed | In Progress | Planned
  github: "https://github.com/jffryylz/my-app",
  demo: "https://my-app.vercel.app", // "" hides the button
  image: "/projects/my-app.png",     // optional — omit for a generated cover
  featured: true,                    // featured projects sort first
}
```

Screenshots go in `public/projects/`. If you omit `image`, the card renders a
generated cover derived from the project slug — no broken images, ever.

---

## GitHub integration

`lib/github.ts` fetches your public profile, repositories, language byte counts
and recent public events from the GitHub REST API. Results are cached for one
hour (`revalidate = 3600` in `app/page.tsx`).

Nothing about the GitHub panel is hard-coded. If the API is unreachable or rate
limited, the section renders an honest fallback rather than stale or invented
numbers.

**Optional — raise the rate limit.** Unauthenticated requests are capped at 60
per hour per IP, which is shared on Vercel. Create a GitHub personal access token
with **no scopes** (public data only) and add it:

```bash
# .env.local
GITHUB_TOKEN=ghp_your_token_here
```

On Vercel: Project → Settings → Environment Variables → `GITHUB_TOKEN`.

To point the site at a different account, change `site.github.username` in
`data/site.ts`.

---

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework is
   detected automatically, no build settings needed.
3. Add `GITHUB_TOKEN` if you created one.
4. After the first deploy, set `site.url` in `data/site.ts` to your real domain
   so Open Graph and canonical URLs resolve correctly.

---

## Design system

Tokens live in the `@theme` block at the top of `app/globals.css`:

| Token           | Value     | Used for                        |
| --------------- | --------- | ------------------------------- |
| `--color-base`  | `#050505` | page background                 |
| `--color-surface` / `--color-elevated` | `#0a0a0a` / `#111113` | cards, panels |
| `--color-fg`    | `#ededf0` | primary text                    |
| `--color-muted` | `#8b8f9a` | body copy                       |
| `--color-faint` | `#5c6069` | captions, metadata              |
| `--color-accent`| `#22d3ee` | the single accent (electric cyan)|

To re-skin the entire site, change `--color-accent` — every gradient, glow,
border highlight and focus ring follows it.

Reusable classes: `.glass`, `.glass-strong`, `.text-gradient`, `.rule`, `.halo`
(animated conic hover border), `.link-underline`, plus the `grid-lines` and
`noise` utilities.

---

## Performance & accessibility

- Fully static page with hourly ISR — no client-side data fetching on load.
- All animations use `transform`/`opacity` only, so they stay on the compositor.
- The pointer-tracked background glow is driven by a rAF loop writing a CSS
  custom property, never React state.
- `prefers-reduced-motion` is respected twice over: globally in CSS, and per
  component via Motion's `useReducedMotion` (parallax, tilt, particles, the
  custom cursor and the scanline all switch off).
- The custom cursor is disabled on touch devices.
- Semantic landmarks, one `<h1>`, ordered headings, a skip link, visible focus
  rings, `aria-current` on the active nav item, alt text on every image, and a
  focus-trapped modal with ESC and click-outside close.

---

## Project structure

```text
app/
  layout.tsx           metadata, fonts, JSON-LD
  page.tsx             section composition + GitHub fetch
  globals.css          design tokens, base styles, utilities
  icon.svg             favicon
  opengraph-image.tsx  generated social preview
components/
  Navbar · Hero · CodePanel · About · Skills · Projects · ProjectCard
  GitHubSection · Certificates · CertificateCard · CertificateModal
  CoursesTimeline · Education · Contact · Footer
  BackgroundFX · ScrollProgress · CustomCursor
  ui/  Section · Reveal · BrandIcons
data/                  all editable content
lib/                   github.ts · hooks.ts · utils.ts
public/
  certificates/        your certificate images
  projects/            project screenshots
  images/              profile photo
```
