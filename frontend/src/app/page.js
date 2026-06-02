import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Import the static data references as fallback/base
import {
  personalInfo,
  aboutStats,
  skillsData,
  projectsData,
  experienceTimeline,
} from '@/data/portfolioData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchWithTimeout(url, options = {}, timeout = 800) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

async function getPortfolioData() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  try {
    const res = await fetchWithTimeout(`${apiBase}/api/portfolio`, {
      cache: 'no-store'
    }, 800);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Failed to fetch portfolio data on server, using static defaults:', err.message);
  }
  return null;
}

async function getProjectsData() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  try {
    const res = await fetchWithTimeout(`${apiBase}/api/projects`, {
      cache: 'no-store'
    }, 800);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Failed to fetch projects data on server, using static defaults:', err.message);
  }
  return null;
}

export default async function Home() {
  const portfolio = await getPortfolioData();
  const rawProjects = await getProjectsData();

  // 1. Merge Personal Info
  const mergedPersonalInfo = portfolio?.personalInfo 
    ? { ...personalInfo, ...portfolio.personalInfo } 
    : personalInfo;

  // 2. Merge About Stats
  const mergedAboutStats = portfolio?.aboutStats && Array.isArray(portfolio.aboutStats)
    ? portfolio.aboutStats
    : aboutStats;

  // 3. Merge Skills Data
  const mergedSkillsData = portfolio?.skillsData 
    ? portfolio.skillsData 
    : skillsData;

  // 4. Merge Experience Timeline
  const mergedExperienceTimeline = portfolio?.experienceTimeline && Array.isArray(portfolio.experienceTimeline)
    ? portfolio.experienceTimeline
    : experienceTimeline;

  // 5. Merge Projects Data
  const mergedProjectsData = rawProjects && Array.isArray(rawProjects) && rawProjects.length > 0
    ? rawProjects.map((p, idx) => ({
        id: idx + 1,
        title: p.title,
        description: p.description,
        techStack: p.techStack || [],
        githubUrl: p.githubUrl || '',
        liveUrl: p.liveUrl || '',
        thumbnail: p.thumbnail || '',
      }))
    : projectsData;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar personalInfo={mergedPersonalInfo} />
      <main className="flex-grow">
        <Hero personalInfo={mergedPersonalInfo} />
        <Marquee />
        <About personalInfo={mergedPersonalInfo} aboutStats={mergedAboutStats} />
        <Stats aboutStats={mergedAboutStats} />
        <Skills skillsData={mergedSkillsData} />
        <Projects projectsData={mergedProjectsData} />
        <Experience experienceTimeline={mergedExperienceTimeline} />
        <Contact personalInfo={mergedPersonalInfo} />
      </main>
      <Footer personalInfo={mergedPersonalInfo} />
    </div>
  );
}
