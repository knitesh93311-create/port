"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillsData as staticSkillsData } from '@/data/portfolioData';
import { resolveSkillsIcons } from '@/data/iconResolver';

const categoryLabels = {
  frontend: "Frontend Technologies",
  backend: "Backend & Server",
  database: "Database Systems",
  tools: "Tools & Utilities"
};

const categoryColorGradients = {
  frontend: "from-[#C6A75E] to-[#1F2A44]",
  backend: "from-emerald-500 to-teal-500",
  database: "from-amber-500 to-orange-500",
  tools: "from-purple-500 to-pink-500"
};

export default function Skills({ skillsData: propSkillsData }) {
  const rawSkillsData = propSkillsData || staticSkillsData;
  const skillsData = resolveSkillsIcons(rawSkillsData);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section id="skills" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F7F4EF 0%, #FAF8F5 100%)' }}>
      {/* Background visual details */}
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#C6A75E]/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-[#1F2A44]/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-manrope text-xs font-bold uppercase tracking-[0.22em] text-[#C6A75E] mb-3 block">
            MY SKILLS
          </span>
          <h2 className="font-poppins font-extrabold text-3xl sm:text-4xl text-[#1F2A44] leading-tight mb-4">
            Modern Stack Specialization
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#C6A75E] to-[#B0934E] rounded-full mx-auto mb-4" />
          <p className="font-inter text-slate-500 text-sm sm:text-base leading-relaxed">
            I continuously refine my expertise across these platforms to develop fast, secure, and production-ready applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => {
            const label = categoryLabels[category];
            const gradient = categoryColorGradients[category];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="bg-white rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-lg group/card"
                style={{
                  border: '1.5px solid rgba(31, 42, 68, 0.12)',
                  boxShadow: '0 2px 12px rgba(31, 42, 68, 0.05)',
                }}
                whileHover={{
                  borderColor: 'rgba(198, 167, 94, 0.35)',
                  boxShadow: '0 8px 32px rgba(31, 42, 68, 0.1), 0 0 0 1px rgba(198, 167, 94, 0.12)',
                }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${gradient} opacity-90`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-white/90" />
                  </div>
                  <h3 className="font-poppins font-bold text-base text-[#1F2A44]">
                    {label}
                  </h3>
                </div>

                {/* Skill List */}
                <div className="flex flex-col gap-5">
                  {skills.map((skill, skillIndex) => {
                    const Icon = skill.icon;
                    const isHovered = hoveredSkill === `${category}-${skill.name}`;
                    
                    return (
                      <div 
                        key={skill.name}
                        className="group"
                        onMouseEnter={() => setHoveredSkill(`${category}-${skill.name}`)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        {/* Title and Percentage */}
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2.5">
                            <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 group-hover:bg-[#C6A75E]/8 group-hover:border-[#C6A75E]/20 group-hover:text-[#C6A75E] transition-all duration-200">
                              <Icon size={16} />
                            </span>
                            <span className="font-poppins text-sm font-semibold text-slate-700 group-hover:text-[#1F2A44] transition-colors duration-200">
                              {skill.name}
                            </span>
                          </div>
                          <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-[#C6A75E] transition-colors duration-200">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, delay: skillIndex * 0.08, ease: "easeOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
