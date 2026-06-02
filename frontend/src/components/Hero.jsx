"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import { 
  SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss, SiPostman 
} from 'react-icons/si';
import { personalInfo as staticPersonalInfo } from '@/data/portfolioData';

const floatAnimation = (delay) => ({
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: delay
    }
  }
});

export default function Hero({ personalInfo: propPersonalInfo }) {
  const personalInfo = propPersonalInfo || staticPersonalInfo;
  const [imageSrc, setImageSrc] = useState(personalInfo.heroImage || "/hero.jpg");

  useEffect(() => {
    const nextImage = personalInfo.heroImage || "/hero.jpg";
    if (nextImage && nextImage !== imageSrc) {
      const img = new window.Image();
      img.onload = () => {
        setImageSrc(nextImage);
      };
      img.src = nextImage;
    }
  }, [personalInfo.heroImage]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-24 lg:pt-28 pb-16 px-6 overflow-hidden flex items-start radial-bg"
    >
      {/* Background Orbs */}
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#C6A75E]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-cyan-400/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10 mt-6 lg:mt-10">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          {/* Small Label */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#1F2A44] mb-3"
          >
            {(personalInfo.title || "FULL STACK MERN DEVELOPER").toUpperCase()}
          </motion.span>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-poppins font-extrabold text-4xl sm:text-[#C6A75E]xl lg:text-[#C6A75E]xl text-[#1F2A44] leading-[1.15] mb-6"
          >
            {personalInfo.tagline ? (
              personalInfo.tagline.includes("Digital Products") ? (
                <>
                  Building Scalable <br />
                  <span className="bg-gradient-to-r from-[#C6A75E] to-[#1F2A44] bg-clip-text text-transparent">
                    Digital Products
                  </span> <br />
                  With MERN Stack
                </>
              ) : personalInfo.tagline
            ) : (
              <>
                Building Scalable <br />
                <span className="bg-gradient-to-r from-[#C6A75E] to-[#1F2A44] bg-clip-text text-transparent">
                  Digital Products
                </span> <br />
                With MERN Stack
              </>
            )}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-inter text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl mb-8"
          >
            {personalInfo.bio || "I design and develop modern, responsive, and high-performance web applications using MongoDB, Express.js, React.js, and Node.js with a strong focus on user experience, scalability, and clean architecture."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 w-full sm:w-auto mb-10"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-inter text-sm font-bold text-white bg-[#C6A75E] hover:bg-[#B0934E] active:scale-98 px-7 py-4 rounded-xl shadow-lg shadow-[#C6A75E]/20 transition-all duration-200"
            >
              View My Work
              <FaArrowRight className="text-xs" />
            </a>
            
            <a
              href={personalInfo.resumeUrl || "/resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              download="Nitesh_Kumar_Resume.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-inter text-sm font-bold text-[#334155] bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 active:scale-98 px-7 py-4 rounded-xl shadow-sm transition-all duration-200"
            >
              <FaDownload className="text-xs" />
              Download Resume
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-inter text-sm font-bold text-[#C6A75E] bg-[#C6A75E]/10 hover:bg-[#C6A75E]/15 active:scale-98 px-7 py-4 rounded-xl transition-all duration-200"
            >
              <FaBriefcase className="text-xs" />
              Hire Me
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4 border-t border-slate-100 pt-6 w-full"
          >
            <span className="font-manrope text-xs font-bold text-slate-400 tracking-wider uppercase mr-2">
              Connect:
            </span>
            <a
              href={personalInfo.github || "https://github.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-[#1F2A44] hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={personalInfo.linkedin || "https://linkedin.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white border border-slate-200 rounded-xl text-[#0077B5] hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={personalInfo.email ? `mailto:${personalInfo.email}` : "mailto:niteshkumar.dev.mern@gmail.com"}
              className="p-3 bg-white border border-slate-200 rounded-xl text-[#EA4335] hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              aria-label="Email Nitesh"
            >
              <FaEnvelope size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right Side: Visual Artwork */}
        <div className="lg:col-span-5 relative flex justify-center items-end h-[450px] lg:h-[550px] mt-10 lg:mt-0">
          
          <AnimatePresence mode="wait">
            {imageSrc ? (
              <motion.div
                key="hero-photo"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[440px] aspect-[4/5] relative group flex flex-col items-center justify-end overflow-visible"
              >
                <img 
                  src={imageSrc} 
                  alt={personalInfo.name || "Nitesh Kumar"} 
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.01] filter drop-shadow-2xl z-10 relative -translate-y-6"
                  style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 97%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 97%)'
                  }}
                />
              </motion.div>
            ) : (
              /* Main Visual Terminal Card — shown while image is loading */
              <motion.div
                key="hero-terminal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[420px] aspect-[4/5] glass-card-dark rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between"
              >
                {/* Terminal Top Window Dots */}
                <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#EF4444]" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#10B981]" />
                  <span className="ml-4 font-mono text-xs text-slate-500">nitesh-developer.js</span>
                </div>

                {/* Simulated Code Snip */}
                <div className="font-mono text-xs text-slate-300 leading-relaxed flex-grow text-left">
                  <p className="text-slate-500">// Initialize MERN Project</p>
                  <p><span className="text-[#F43F5E]">const</span> developer = &#123;</p>
                  <p className="pl-4">name: <span className="text-[#E8DCC8]">&apos;Nitesh Kumar&apos;</span>,</p>
                  <p className="pl-4">role: <span className="text-[#E8DCC8]">&apos;Full Stack Engineer&apos;</span>,</p>
                  <p className="pl-4">coreStack: [<span className="text-[#34D399]">&apos;MongoDB&apos;, &apos;Express&apos;, &apos;React&apos;, &apos;Node&apos;</span>],</p>
                  <p className="pl-4">mission: <span className="text-[#FBBF24]">&apos;Build Clean & Scalable Products&apos;</span>,</p>
                  <p className="pl-4">availability: <span className="text-[#34D399]">true</span></p>
                  <p>&#125;;</p>
                  <br />
                  <p className="text-slate-500">// Express Route</p>
                  <p>app.get(<span className="text-[#E8DCC8]">&apos;/api/value-created&apos;</span>, (req, res) =&gt; &#123;</p>
                  <p className="pl-4 text-[#F43F5E]">return <span className="text-white">res.status(200).json(&#123;</span></p>
                  <p className="pl-8">impact: <span className="text-[#E8DCC8]">&apos;High-Performance SaaS Architectures&apos;</span>,</p>
                  <p className="pl-8">recruiterStatus: <span className="text-[#E8DCC8]">&apos;Ready to hire&apos;</span></p>
                  <p className="pl-4 text-white">&#125;);</p>
                  <p>&#125;);</p>
                </div>

                {/* Simulated Git Output Status */}
                <div className="bg-[#1F2A44] rounded-xl p-3 border border-slate-800 text-left">
                  <span className="text-[#1F2A44] text-xs font-mono">$ git commit -m &quot;Ready for production&quot;</span>
                  <p className="text-emerald-400 text-xs font-mono mt-1">✓ Build success. Ready for enterprise launch.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}

