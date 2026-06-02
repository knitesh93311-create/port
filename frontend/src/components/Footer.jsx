"use client";

import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa';
import { personalInfo as staticPersonalInfo } from '@/data/portfolioData';

export default function Footer({ personalInfo: propPersonalInfo }) {
  const personalInfo = propPersonalInfo || staticPersonalInfo;
  return (
    <footer className="bg-[#1F2A44] text-slate-400 border-t border-slate-800 py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top grid section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Column 1: Branding */}
          <div className="md:col-span-5 text-left flex flex-col items-start">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <span className="font-poppins font-extrabold text-xl tracking-tight bg-gradient-to-r from-[#C6A75E] to-[#1F2A44] bg-clip-text text-transparent">
                NITESH KUMAR
              </span>
            </a>
            <p className="font-inter text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Design and development of modern SaaS platforms and backend infrastructures using the MongoDB, Express, React, and Node.js stack.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-4 text-left">
            <h4 className="font-poppins text-xs font-bold uppercase text-white tracking-widest mb-4">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <a href="#home" className="hover:text-white transition-colors duration-150 py-1">Home</a>
              <a href="#about" className="hover:text-white transition-colors duration-150 py-1">About</a>
              <a href="#skills" className="hover:text-white transition-colors duration-150 py-1">Skills</a>
              <a href="#projects" className="hover:text-white transition-colors duration-150 py-1">Projects</a>
              <a href="#experience" className="hover:text-white transition-colors duration-150 py-1">Experience</a>
              <a href="#contact" className="hover:text-white transition-colors duration-150 py-1">Contact</a>
            </div>
          </div>

          {/* Column 3: Social & Resume Links */}
          <div className="md:col-span-3 text-left">
            <h4 className="font-poppins text-xs font-bold uppercase text-white tracking-widest mb-4">
              Connect & Resume
            </h4>
            <div className="flex gap-3 mb-4">
              <a 
                href={personalInfo?.github || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-900 border border-slate-850 hover:border-slate-750 text-slate-400 hover:text-white rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={15} />
              </a>
              <a 
                href={personalInfo?.linkedin || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-900 border border-slate-850 hover:border-slate-750 text-[#0077B5] hover:text-white rounded-lg transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={15} />
              </a>
              <a 
                href={personalInfo?.email ? `mailto:${personalInfo.email}` : '#'}
                className="p-2.5 bg-slate-900 border border-slate-850 hover:border-slate-750 text-[#EA4335] hover:text-white rounded-lg transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={15} />
              </a>
            </div>

            <a
              href={personalInfo?.resumeUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              download="Nitesh_Kumar_Resume.pdf"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#C6A75E] hover:bg[#B0934E] px-4 py-2 rounded-lg transition-colors"
            >
              <FaDownload size={10} />
              Download Resume
            </a>
          </div>

        </div>

        {/* Bottom credits bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs font-manrope">
          <p>© 2026 Nitesh Kumar. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed & Developed with <span className="text-red-500">❤️</span> by Nitesh Kumar
          </p>
        </div>

      </div>
    </footer>
  );
}

