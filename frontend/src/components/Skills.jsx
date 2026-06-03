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
  frontend: "from-[#FF9100] to-[#0B2C1F]",
  backend: "from-emerald-500 to-teal-500",
  database: "from-amber-500 to-orange-500",
  tools: "from-purple-500 to-pink-500"
};

export default function Skills({ skillsData: propSkillsData }) {
  const rawSkillsData = propSkillsData || staticSkillsData;
  const skillsData = resolveSkillsIcons(rawSkillsData);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section id="skills" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background visual details */}
      <div className="absolute top-[30%] right-[-5%] w-[350px] h-[350px] rounded-full bg-cyan-50/60 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-manrope text-xs font-extrabold uppercase tracking-[0.2em] text-[#FF9100] mb-2 block">
            MY SKILLS
          </span>
          <h2 className="font-poppins font-extrabold text-[#FF9100]xl sm:text-4xl text-[#0B2C1F] leading-tight mb-4">
            Modern Stack Specialization
          </h2>
          <p className="font-inter text-slate-500 text-sm sm:text-base leading-relaxed">
            I continuously refine my expertise across these platforms to develop fast, secure, and production-ready applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${gradient}`} />
                  <h3 className="font-poppins font-bold text-lg text-[#0B2C1F]">
                    {label}
                  </h3>
                </div>

                {/* Skill List */}
                <div className="flex flex-col gap-6">
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
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className={`p-1.5 rounded-lg bg-slate-50 text-slate-600 group-hover:bg-[#FF9100]/10 group-hover:text-[#FF9100] transition-colors duration-200`}>
                              <Icon size={18} />
                            </span>
                            <span className="font-poppins text-sm font-bold text-slate-700 group-hover:text-[#0B2C1F] transition-colors duration-200">
                              {skill.name}
                            </span>
                          </div>
                          <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-[#FF9100] transition-colors duration-200">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 }}
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

