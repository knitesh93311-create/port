"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { experienceTimeline as staticExperienceTimeline } from '@/data/portfolioData';
import { resolveItemIcon } from '@/data/iconResolver';

export default function Experience({ experienceTimeline: propExperienceTimeline }) {
  const rawExperienceTimeline = propExperienceTimeline || staticExperienceTimeline;
  const experienceTimeline = (rawExperienceTimeline || []).map(resolveItemIcon);
  return (
    <section id="experience" className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Background blur details */}
      <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-cyan-50/50 blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-manrope text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6A75E] mb-2 block">
            WORK HISTORY
          </span>
          <h2 className="font-poppins font-extrabold text-[#C6A75E]xl sm:text-4xl text-[#1F2A44] leading-tight mb-4">
            Professional Timeline
          </h2>
          <p className="font-inter text-slate-500 text-sm sm:text-base leading-relaxed">
            My development journey, ranging from structured corporate internships to freelance delivery and public repositories.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-slate-200/80 ml-4 md:ml-8 pl-8 sm:pl-12 flex flex-col gap-12">
          
          {experienceTimeline.map((item, index) => {
            const TimelineIcon = item.icon;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-left group"
              >
                {/* Visual marker dot */}
                <span className={`absolute top-1 -left-[45px] sm:-left-[61px] w-8 h-8 rounded-full border bg-white flex items-center justify-center shadow-sm z-10 transition-transform group-hover:scale-110 duration-200`}>
                  <TimelineIcon size={12} className="text-slate-500 group-hover:text-[#C6A75E] transition-colors" />
                </span>

                {/* Alternating detail card style */}
                <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300">
                  
                  {/* Tag and date header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span className="font-manrope text-[10px] font-extrabold text-[#1F2A44] uppercase tracking-widest bg-cyan-50 border border-cyan-100 rounded-md px-2 py-0.5 w-max">
                      {item.type}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      {item.period}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="font-poppins font-bold text-lg text-[#1F2A44] mb-1">
                    {item.role}
                  </h3>
                  <h4 className="font-manrope text-sm font-semibold text-[#C6A75E] mb-4">
                    {item.company}
                  </h4>

                  {/* Description */}
                  <p className="font-inter text-[#334155] text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

