"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaEye, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { personalInfo } from '@/data/portfolioData';

export default function Resume() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      
      {/* Background overlay details */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-blue-50/70 blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Decorative design nodes */}
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
          
          {/* Left: Recruiters call out text */}
          <div className="lg:col-span-7 text-left">
            <span className="font-manrope text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#06B6D4] mb-3 block">
              RECRUITER PORTAL
            </span>
            <h2 className="font-poppins font-black text-3xl sm:text-4xl text-white leading-tight mb-4">
              Ready To Bring Value <br />To Your Team
            </h2>
            <p className="font-inter text-slate-400 text-xs sm:text-sm leading-relaxed mb-8 max-w-lg">
              Are you looking for a detail-oriented software engineer who can build secure backends, design optimized database schemas, and create smooth frontend applications? Review my qualifications or download my ATS-compliant resume to proceed.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href={personalInfo.resumeUrl || "/resume.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                download="Nitesh_Kumar_Resume.pdf"
                className="inline-flex items-center gap-2 font-inter text-xs sm:text-sm font-bold text-[#0F172A] bg-white hover:bg-slate-100 active:scale-97 px-5 py-3 rounded-xl transition-all duration-200"
              >
                <FaDownload className="text-xs" />
                Download Resume
              </a>

              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 font-inter text-xs sm:text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 active:scale-97 border border-slate-700 px-5 py-3 rounded-xl transition-all duration-200"
              >
                <FaEye className="text-xs" />
                View Resume
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-inter text-xs sm:text-sm font-bold text-[#06B6D4] bg-[#06B6D4]/10 hover:bg-[#06B6D4]/15 active:scale-97 px-5 py-3 rounded-xl transition-all duration-200"
              >
                <FaEnvelope className="text-xs" />
                Contact Me
              </a>
            </div>
          </div>

          {/* Right: Mock Resume ATS preview graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[280px] bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative flex flex-col gap-3 font-mono text-[9px] text-slate-400 select-none text-left">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-[#06B6D4]">Nitesh_Kumar_CV.pdf</span>
                <FaFileAlt className="text-slate-600" />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-slate-500 font-bold">// EXECUTIVE SUMMARY</p>
                <div className="h-2 w-full bg-slate-800 rounded-full" />
                <div className="h-2 w-[85%] bg-slate-800 rounded-full" />
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                <p className="text-slate-500 font-bold">// CORE SKILLS</p>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-[8px]">MERN</span>
                  <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-[8px]">Docker</span>
                  <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-[8px]">Git</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                <p className="text-slate-500 font-bold">// COMPLETED PROJECTS</p>
                <div className="h-2 w-[90%] bg-slate-800 rounded-full" />
                <div className="h-2 w-[70%] bg-slate-800 rounded-full" />
              </div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* View Resume PDF Modal overlay */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-slate-900"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-4xl h-[85vh] shadow-2xl relative z-10 flex flex-col overflow-hidden border border-slate-200"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3 text-left">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl"><FaFileAlt size={16} /></span>
                  <div>
                    <h3 className="font-poppins font-bold text-[#0F172A] text-sm">Resume Preview</h3>
                    <p className="font-manrope text-[10px] text-slate-400 font-semibold">Nitesh_Kumar_Resume.pdf</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <a
                    href={personalInfo.resumeUrl || "/resume.pdf"}
                    download="Nitesh_Kumar_Resume.pdf"
                    className="inline-flex items-center gap-1.5 font-inter text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3.5 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    <FaDownload size={11} />
                    Download
                  </a>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <IoClose size={20} />
                  </button>
                </div>
              </div>

              {/* Modal body (embedded PDF preview) */}
              <div className="flex-grow bg-slate-100 relative">
                <iframe
                  src={personalInfo.resumeUrl ? `${personalInfo.resumeUrl}#toolbar=0` : "/resume.pdf#toolbar=0"}
                  className="w-full h-full border-0"
                  title="Nitesh Kumar Resume Preview"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
