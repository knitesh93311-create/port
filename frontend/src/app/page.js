'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import dynamic from 'next/dynamic';
import Footer from "@/components/Footer";

const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });

// Import the static data references to mutate them on client-side sync
import {
  personalInfo,
  aboutStats,
  skillsData,
  projectsData,
  experienceTimeline,
} from '@/data/portfolioData';

// Icon resolver: maps iconName strings from the backend to actual React icon components
import { resolveItemIcon, resolveSkillsIcons } from '@/data/iconResolver';

export default function Home() {
  const [synced, setSynced] = useState(0);

  useEffect(() => {
    async function syncPortfolioData() {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const portRes = await fetch(`${apiBase}/api/portfolio`);
        if (portRes.ok) {
          const data = await portRes.json();
          if (data) {
            // 1. Sync Personal Info
            if (data.personalInfo) {
              Object.keys(personalInfo).forEach(key => delete personalInfo[key]);
              Object.assign(personalInfo, data.personalInfo);
            }
            // 2. Sync About Stats
            if (data.aboutStats && Array.isArray(data.aboutStats)) {
              aboutStats.length = 0;
              aboutStats.push(...data.aboutStats);
            }
            // 3. Sync Skills Data — resolve iconName strings to React components
            if (data.skillsData) {
              const resolvedSkills = resolveSkillsIcons(data.skillsData);
              Object.keys(skillsData).forEach(key => delete skillsData[key]);
              Object.assign(skillsData, resolvedSkills);
            }
            // 4. Sync Experience Timeline — resolve iconName strings to React components
            if (data.experienceTimeline && Array.isArray(data.experienceTimeline)) {
              experienceTimeline.length = 0;
              experienceTimeline.push(...data.experienceTimeline.map(resolveItemIcon));
            }
          }
        }
      } catch (err) {
        console.warn('Backend Portfolio sync failed, using default static data:', err);
      }

      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const projRes = await fetch(`${apiBase}/api/projects`);
        if (projRes.ok) {
          const data = await projRes.json();
          if (data && Array.isArray(data) && data.length > 0) {
            const mapped = data.map((p, idx) => ({
              id: idx + 1,
              title: p.title,
              description: p.description,
              techStack: p.techStack || [],
              githubUrl: p.githubUrl || '',
              liveUrl: p.liveUrl || '',
              thumbnail: p.thumbnail || '',
            }));
            projectsData.length = 0;
            projectsData.push(...mapped);
          }
        }
      } catch (err) {
        console.warn('Backend Projects sync failed, using default static data:', err);
      }

      // Trigger a re-render so all children components consume updated values
      setSynced(prev => prev + 1);
    }

    syncPortfolioData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Marquee />
        <About />
        <Stats />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
