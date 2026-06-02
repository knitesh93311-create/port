"use client";

import React from 'react';
import { trustedTechnologies } from '@/data/portfolioData';

export default function Marquee() {
  // Duplicate technologies array to ensure seamless looping transition
  const loopTechs = [...trustedTechnologies, ...trustedTechnologies, ...trustedTechnologies];

  return (
    <section className="bg-slate-50 border-y border-slate-100 py-10 overflow-hidden relative select-none">
      {/* Visual Fade Gradients at the edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-4">
        <h3 className="font-manrope text-xs font-bold uppercase tracking-[0.25em] text-slate-400 text-center">
          TRUSTED & MASTERED TECHNOLOGIES
        </h3>
      </div>

      {/* Marquee viewport */}
      <div className="flex overflow-hidden w-full py-4 mt-2">
        <div className="animate-marquee gap-8">
          {loopTechs.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div 
                key={`${tech.name}-${index}`} 
                className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-slate-200/60 shadow-sm hover:border-slate-300 hover:shadow transition-all duration-200"
              >
                <Icon className={`text-xl ${tech.color}`} />
                <span className="font-poppins text-sm font-semibold text-[#1F2A44]">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
