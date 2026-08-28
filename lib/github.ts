/**
 * ─────────────────────────────────────────────────────────────────────────────
 * GitHub API utility (server-side only).
 * ─────────────────────────────────────────────────────────────────────────────
 * Every request is cached by Next.js for an hour and every failure degrades
 * gracefully — the GitHub section renders a static fallback rather than
 * breaking the page or inventing numbers.
 *
 * Optional: set GITHUB_TOKEN in .env.local (and in your Vercel project) to lift
 * the 60-requests-per-hour unauthenticated rate limit. A token with **no**
 * scopes is enough for public data.
 */
import { site } from "@/data/site";

const API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;

export type GitHubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
  fork: boolean;
  topics: string[];
  pushed_at: string;
  created_at: string;
};

export type LanguageStat = { name: string; bytes: number; percent: number };

export type ActivityItem = {
  id: string;
  action: string;
  repo: string;
  repoUrl: string;
  createdAt: string;
};

export type GitHubData = {
  ok: boolean;
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  languages: LanguageStat[];
  activity: ActivityItem[];
  totalStars: number;
};

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

type RawEvent = {
  id: string;
  type: string | null;
  repo?: { name: string };
  payload?: { commits?: unknown[]; size?: number; ref_type?: string; action?: string };
  created_at: string;
};

function describeEvent(e: RawEvent): string | null {
  switch (e.type) {
    case "PushEvent": {
      // `size` is present on the events feed; `commits` only on some payloads.
      const n = e.payload?.size ?? e.payload?.commits?.length;
      if (!n) return "Pushed commits";
      return `Pushed ${n} commit${n === 1 ? "" : "s"}`;
    }
    case "CreateEvent":
      return `Created ${e.payload?.ref_type ?? "a reference"}`;
    case "PublicEvent":
      return "Made public";
    case "WatchEvent":
      return "Starred";
    case "ForkEvent":
      return "Forked";
    case "IssuesEvent":
      return `${e.payload?.action ?? "Updated"} an issue`;
    case "PullRequestEvent":
      return `${e.payload?.action ?? "Updated"} a pull request`;
    case "ReleaseEvent":
      return "Published a release";
    default:
      return null;
  }
}

/** Fetches everything the GitHub section needs in as few requests as possible. */
export async function getGitHubData(): Promise<GitHubData> {
  const user = site.github.username;

  const [profile, allRepos, rawEvents] = await Promise.all([
    gh<GitHubProfile>(`/users/${user}`),
    gh<GitHubRepo[]>(`/users/${user}/repos?per_page=100&sort=updated`),
    gh<RawEvent[]>(`/users/${user}/events/public?per_page=30`),
  ]);

  if (!profile || !allRepos) {
    return { ok: false, profile, repos: [], languages: [], activity: [], totalStars: 0 };
  }

  const repos = allRepos.filter((r) => !r.fork);

  // Language byte counts, but only for repos that actually contain code —
  // keeps us well inside the unauthenticated rate limit.
  const codeRepos = repos.filter((r) => r.size > 0).slice(0, 8);
  const languageMaps = await Promise.all(
    codeRepos.map((r) => gh<Record<string, number>>(`/repos/${user}/${r.name}/languages`)),
  );

  const totals = new Map<string, number>();
  for (const map of languageMaps) {
    if (!map) continue;
    for (const [name, bytes] of Object.entries(map)) {
      totals.set(name, (totals.get(name) ?? 0) + bytes);
    }
  }
  const totalBytes = [...totals.values()].reduce((a, b) => a + b, 0);
  const languages: LanguageStat[] = [...totals.entries()]
    .map(([name, bytes]) => ({
      name,
      bytes,
      percent: totalBytes ? (bytes / totalBytes) * 100 : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes);

  const activity: ActivityItem[] = (rawEvents ?? [])
    .map((e) => {
      const action = describeEvent(e);
      if (!action || !e.repo?.name) return null;
      return {
        id: e.id,
        action,
        repo: e.repo.name,
        repoUrl: `https://github.com/${e.repo.name}`,
        createdAt: e.created_at,
      } satisfies ActivityItem;
    })
    .filter((x): x is ActivityItem => x !== null)
    .slice(0, 5);

  return {
    ok: true,
    profile,
    repos,
    languages,
    activity,
    totalStars: repos.reduce((n, r) => n + r.stargazers_count, 0),
  };
}

/** Brand colours for the language distribution bar. */
export const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Java: "#b07219",
  PHP: "#4F5D95",
  "C#": "#178600",
  C: "#555555",
  "C++": "#f34b7d",
  Dockerfile: "#384d54",
  PowerShell: "#012456",
};

export function languageColor(name: string) {
  return languageColors[name] ?? "#22d3ee";
}
