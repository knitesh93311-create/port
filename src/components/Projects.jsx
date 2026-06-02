"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '@/data/portfolioData';
import { FaGithub, FaExternalLinkAlt, FaBrain, FaShoppingBag, FaComments, FaBriefcase, FaGraduationCap, FaProjectDiagram } from 'react-icons/fa';

const visualMockMap = {
  1: {
    icon: FaBrain,
    gradient: "from-[#F43F5E]/20 to-[#FF869A]/20",
    bgPattern: "radial-gradient(circle, rgba(244,63,94,0.1) 0%, transparent 60%)",
    accentColor: "border-[#F43F5E]/30 text-[#F43F5E] bg-[#F43F5E]/5"
  },
  2: {
    icon: FaShoppingBag,
    gradient: "from-[#2563EB]/20 to-[#38BDF8]/20",
    bgPattern: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 60%)",
    accentColor: "border-[#2563EB]/30 text-[#2563EB] bg-[#2563EB]/5"
  },
  3: {
    icon: FaComments,
    gradient: "from-[#06B6D4]/20 to-[#34D399]/20",
    bgPattern: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 60%)",
    accentColor: "border-[#06B6D4]/30 text-[#06B6D4] bg-[#06B6D4]/5"
  },
  4: {
    icon: FaBriefcase,
    gradient: "from-amber-500/20 to-yellow-500/20",
    bgPattern: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 60%)",
    accentColor: "border-amber-500/30 text-amber-600 bg-amber-500/5"
  },
  5: {
    icon: FaGraduationCap,
    gradient: "from-[#8B5CF6]/25 to-[#D946EF]/25",
    bgPattern: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 60%)",
    accentColor: "border-[#8B5CF6]/30 text-[#8B5CF6] bg-[#8B5CF6]/5"
  },
  6: {
    icon: FaProjectDiagram,
    gradient: "from-[#EC4899]/20 to-[#F43F5E]/20",
    bgPattern: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 60%)",
    accentColor: "border-[#EC4899]/30 text-[#EC4899] bg-[#EC4899]/5"
  }
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-2 block">
            FEATURED PORTFOLIO
          </span>
          <h2 className="font-poppins font-extrabold text-3xl sm:text-4xl text-[#0F172A] leading-tight mb-4">
            Enterprise MERN Applications
          </h2>
          <p className="font-inter text-slate-500 text-sm sm:text-base leading-relaxed">
            A showcase of my recent full-stack builds, demonstrating architecture design, state management, complex integrations, and clean code.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => {
            const visual = visualMockMap[project.id] || {
              icon: FaProjectDiagram,
              gradient: "from-blue-500/20 to-cyan-500/20",
              bgPattern: "",
              accentColor: "border-blue-500/30 text-blue-500 bg-blue-500/5"
            };
            const VisualIcon = visual.icon;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col h-full bg-slate-50 border border-slate-200/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-slate-300 hover:bg-white"
              >
                {/* Visual Thumbnail representation */}
                <div 
                  className={`w-full aspect-[1.8/1] relative flex items-center justify-center overflow-hidden border-b border-slate-200/40 bg-gradient-to-tr ${visual.gradient}`}
                  style={{ backgroundImage: visual.bgPattern }}
                >
                  {/* Rotating decorative rings */}
                  <div className="absolute w-36 h-36 border border-slate-300/30 rounded-full animate-[spin_40s_linear_infinite]" />
                  <div className="absolute w-24 h-24 border border-dashed border-slate-300/40 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                  
                  {/* Central Icon */}
                  <motion.div 
                    whileHover={{ scale: 1.15 }}
                    className={`p-5 rounded-2xl border bg-white/95 shadow-md transition-transform duration-300 ${visual.accentColor}`}
                  >
                    <VisualIcon size={32} />
                  </motion.div>

                  {/* Top-Right Badge snippet */}
                  <span className="absolute top-4 right-4 font-mono text-[9px] font-bold text-slate-500 bg-white/80 border border-slate-200/50 rounded-full px-2 py-0.5 backdrop-blur-sm">
                    ID: MERN-0{project.id}
                  </span>
                </div>

                {/* Card details */}
                <div className="p-6 flex-grow flex flex-col justify-between text-left">
                  <div>
                    {/* Project Title */}
                    <h3 className="font-poppins font-bold text-lg text-[#0F172A] group-hover:text-[#2563EB] transition-colors duration-200 mb-3">
                      {project.title}
                    </h3>
                    
                    {/* Project Description */}
                    <p className="font-inter text-slate-500 text-xs sm:text-sm leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="font-manrope text-[10px] font-bold text-slate-500 bg-slate-200/40 border border-slate-200/20 px-2 py-0.5 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Button CTAs */}
                  <div className="flex items-center gap-3 border-t border-slate-100 pt-4 mt-auto">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 font-inter text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-lg py-2.5 transition-all active:scale-97"
                    >
                      <FaGithub size={13} />
                      Source Code
                    </a>
                    
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 font-inter text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg py-2.5 transition-all active:scale-97 shadow-sm shadow-blue-500/5 hover:shadow-blue-500/15"
                    >
                      <FaExternalLinkAlt size={11} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
