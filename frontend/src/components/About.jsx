"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaDownload, FaEnvelope, FaLaptopCode, FaDatabase, FaShieldAlt } from 'react-icons/fa';
import { personalInfo as staticPersonalInfo } from '@/data/portfolioData';

export default function About({ personalInfo: propPersonalInfo }) {
  const personalInfo = propPersonalInfo || staticPersonalInfo;
  const [imageSrc, setImageSrc] = useState(personalInfo.aboutImage || "/about.jpg");

  useEffect(() => {
    const nextImage = personalInfo.aboutImage || "/about.jpg";
    if (nextImage && nextImage !== imageSrc) {
      const img = new window.Image();
      img.onload = () => {
        setImageSrc(nextImage);
      };
      img.src = nextImage;
    }
  }, [personalInfo.aboutImage]);
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      
      {/* Background visual element */}
      <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-[#FF9100]/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Stylized Developer Portrait Graphic */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Frame Decor */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#FF9100]/10 to-[#0B2C1F]/10 blur-xl opacity-80 pointer-events-none" />
            
            {/* Main Interactive Portrait Art */}
            <div className="relative bg-gradient-to-b from-slate-50 to-slate-100 rounded-3xl border border-slate-200/80 shadow-md aspect-[4/5] flex flex-col justify-between overflow-hidden group">
              {imageSrc ? (
                <>
                  <img 
                    src={imageSrc} 
                    alt={personalInfo.name || "Nitesh Kumar"} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark overlay gradient to make overlay text legible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 pointer-events-none" />

                  {/* Elegant overlay elements inside the full frame photo card */}
                  <div className="flex justify-between items-start z-10 p-8 w-full">
                    <div className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                      <FaLaptopCode className="text-[#FF9100]xl text-white" />
                    </div>
                    <span className="font-mono text-xs font-bold text-white bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
                      MERN STACK
                    </span>
                  </div>

                  <div className="z-10 p-8 text-left mt-auto">
                    <h4 className="font-poppins font-bold text-[#FF9100]xl text-white mb-1">{personalInfo.name || "Nitesh Kumar"}</h4>
                    <p className="font-manrope text-sm text-cyan-300 font-semibold mb-2">{personalInfo.location || "Bangalore, IN"} • Full Stack Dev</p>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs text-slate-300 font-medium">Active & Available</span>
                    </div>
                  </div>
                </>
              ) : (
                /* Fallback Graphics Frame when no image is uploaded */
                <div className="flex flex-col justify-between h-full w-full p-8 relative">
                  {/* Abstract overlay */}
                  <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-cyan-100/30 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                  
                  {/* Graphic Top Section */}
                  <div className="flex justify-between items-start z-10">
                    <div className="p-3 bg-white shadow-sm border border-slate-100 rounded-2xl">
                      <FaLaptopCode className="text-[#FF9100]xl text-[#FF9100]" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-200/50 rounded-full px-3 py-1">
                      MERN STACK
                    </span>
                  </div>

                  {/* Graphic Center: Visual depiction of developer workflow */}
                  <div className="my-8 flex flex-col items-center justify-center z-10">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#FF9100] to-[#0B2C1F] p-1 flex items-center justify-center shadow-lg shadow-blue-500/15 mb-4 relative">
                      <span className="w-full h-full bg-[#0B2C1F] rounded-full flex items-center justify-center text-white text-[#FF9100]xl font-poppins font-black">
                        NK
                      </span>
                      {/* Floating micro indicators */}
                      <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center" />
                    </div>
                    <h4 className="font-poppins font-bold text-lg text-slate-800">Nitesh Kumar</h4>
                    <p className="font-manrope text-xs text-slate-400 font-medium">Bangalore, IN • Full Stack Dev</p>
                  </div>

                  {/* Graphic Bottom Panel: Metrics snippet */}
                  <div className="bg-[#0B2C1F] text-white rounded-2xl p-4 border border-slate-800 text-left z-10 shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                      <span className="font-mono text-[10px] text-slate-400">active_stack_status.json</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
                      <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700/30">
                        <p className="text-slate-400">REACT</p>
                        <p className="text-[#E8DCC8] font-bold">95%</p>
                      </div>
                      <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700/30">
                        <p className="text-slate-400">NODE</p>
                        <p className="text-emerald-400 font-bold">92%</p>
                      </div>
                      <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700/30">
                        <p className="text-slate-400">MONGO</p>
                        <p className="text-amber-400 font-bold">90%</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-manrope text-xs font-extrabold uppercase tracking-[0.2em] text-[#FF9100] mb-2 block">
                ABOUT ME
              </span>
              <h2 className="font-poppins font-extrabold text-[#FF9100]xl sm:text-4xl text-[#0B2C1F] leading-tight mb-6">
                Passionate MERN Stack Developer Focused On Building Real-World Solutions
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-inter text-slate-600 text-base leading-relaxed mb-6"
            >
              I am a specialized software engineer dedicated to building robust SaaS products, content-rich marketplaces, and microservices architectures. I write modular, clean, and reusable code that conforms to industry design patterns, ensuring that backend databases execute quickly, endpoints are secure, and interfaces load instantly.
            </motion.p>

            {/* Core Values grid */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              <div className="flex gap-3 items-start">
                <span className="p-2 bg-[#FF9100]/10 rounded-lg text-[#FF9100] mt-0.5"><FaLaptopCode size={16} /></span>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-[#0B2C1F]">Full Stack Systems</h4>
                  <p className="font-inter text-xs text-slate-500 leading-normal">Front-to-back architecture planning.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="p-2 bg-cyan-50 rounded-lg text-[#0B2C1F] mt-0.5"><FaDatabase size={16} /></span>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-[#0B2C1F]">Database Integrity</h4>
                  <p className="font-inter text-xs text-slate-500 leading-normal">Efficient index management & indexing.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="p-2 bg-emerald-50 rounded-lg text-emerald-500 mt-0.5"><FaShieldAlt size={16} /></span>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-[#0B2C1F]">Secure Authorization</h4>
                  <p className="font-inter text-xs text-slate-500 leading-normal">JWT token authorization & encryption.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="p-2 bg-purple-50 rounded-lg text-purple-500 mt-0.5"><FaCheckCircle size={16} /></span>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-[#0B2C1F]">Deployment Pipelines</h4>
                  <p className="font-inter text-xs text-slate-500 leading-normal">Optimized bundles & cloud server deploys.</p>
                </div>
              </div>
            </motion.div>

            {/* Checklist Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border-t border-slate-100 pt-6 mb-8"
            >
              <h4 className="font-poppins font-bold text-sm text-[#0B2C1F] mb-4">Core Commitments:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                {[
                  "Clean Architecture & Design Patterns",
                  "Scalable Backend API Systems",
                  "Responsive & Accessible User Interfaces",
                  "Secure Encrypted Authentication",
                  "Performance Tuning & SEO Optimization"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="text-emerald-500 text-sm flex-shrink-0" />
                    <span className="font-inter text-sm font-semibold text-[#334155]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href={personalInfo.resumeUrl || "/resume.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                download="Nitesh_Kumar_Resume.pdf"
                className="inline-flex items-center gap-2 font-inter text-sm font-bold text-white bg-[#FF9100] hover:bg-[#E08000] active:scale-98 px-6 py-3.5 rounded-xl shadow-md transition-all duration-200"
              >
                <FaDownload className="text-xs" />
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-inter text-sm font-bold text-[#334155] bg-slate-100 hover:bg-slate-200 active:scale-98 px-6 py-3.5 rounded-xl transition-all duration-200"
              >
                <FaEnvelope className="text-xs" />
                Contact Me
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

