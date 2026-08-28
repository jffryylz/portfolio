import { About } from "@/components/About";
import { BackgroundFX } from "@/components/BackgroundFX";
import { Certificates } from "@/components/Certificates";
import { Contact } from "@/components/Contact";
import { CoursesTimeline } from "@/components/CoursesTimeline";
import { CustomCursor } from "@/components/CustomCursor";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { GitHubSection } from "@/components/GitHubSection";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Skills } from "@/components/Skills";
import { getGitHubData } from "@/lib/github";

/** Re-fetch the GitHub panel at most once an hour; the page is static otherwise. */
export const revalidate = 3600;

export default async function Home() {
  const github = await getGitHubData();

  return (
    <>
      <BackgroundFX />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main id="main">
        <Hero />
        <About
          repoCount={github.profile?.public_repos ?? null}
          avatarUrl={github.profile?.avatar_url ?? null}
        />
        <Skills />
        <Projects />
        <GitHubSection data={github} />
        <Certificates />
        <CoursesTimeline />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
