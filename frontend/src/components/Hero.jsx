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
      className="relative min-h-screen pt-32 lg:pt-40 pb-24 lg:pb-32 px-6 overflow-hidden flex items-center bg-[#0B2C1F]"
    >
      {/* Floating Sparkle Stars */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[5%] text-[#FF9100] pointer-events-none hidden md:block"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.2c.4 3 2.8 5.4 5.8 5.8-3 .4-5.4 2.8-5.8 5.8-.4-3-2.8-5.4-5.8-5.8 3-.4 5.4-2.8 5.8-5.8z" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ opacity: [1, 0.3, 1], scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[25%] right-[5%] text-[#FF9100] pointer-events-none hidden md:block"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 2c.3 2.5 2.3 4.5 4.8 4.8-2.5.3-4.5 2.3-4.8 4.8-.3-2.5-2.3-4.5-4.8-4.8 2.5-.3 4.5-2.3 4.8-4.8z" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Main Headline styled like the reference */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-poppins font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-8 tracking-tight"
          >
            Helping <br />
            <span className="text-[#FF9100]">Businesses</span> Build <br />
            Better Products <br />
            With <span className="text-[#FF9100]">MERN</span>.
          </motion.h1>

          {/* Subheadline with vertical highlight line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4 items-stretch mb-8 max-w-xl text-left border-l-[3px] border-[#FF9100] pl-4"
          >
            <p className="font-inter text-slate-300 text-sm md:text-base leading-relaxed">
              I am a passionate Full Stack MERN Developer skilled in MongoDB, Express.js, React, Node.js, and REST APIs, transforming complex business requirements and user ideas into highly scalable, performant web applications.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 mb-12"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 font-inter text-sm font-bold text-[#0B2C1F] bg-white hover:bg-slate-100 hover:scale-[1.02] active:scale-98 px-7 py-3.5 rounded-full shadow-lg transition-all duration-200"
            >
              <span>View Projects</span>
              <FaArrowRight size={12} />
            </a>
            
            <a
              href={`/api/download?url=${encodeURIComponent(personalInfo.resumeUrl || '/resume.pdf')}`}
              className="inline-flex items-center gap-3 font-inter text-sm font-bold text-white hover:text-[#FF9100] group transition-all duration-200"
            >
              <span className="w-10 h-10 rounded-full bg-[#FF9100]/20 group-hover:bg-[#FF9100] flex items-center justify-center text-[#FF9100] group-hover:text-white transition-all duration-200">
                <FaDownload size={13} />
              </span>
              <span>Resume</span>
            </a>
          </motion.div>

          {/* Stats section separated by divider line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-md border-t border-white/10 pt-8 grid grid-cols-2 gap-8 text-left"
          >
            <div>
              <div className="font-poppins font-black text-4xl text-white">20+</div>
              <div className="font-inter text-xs text-slate-400 mt-1 leading-normal font-semibold">
                Live Projects<br />Completed
              </div>
            </div>
            <div>
              <div className="font-poppins font-black text-4xl text-white">50+</div>
              <div className="font-inter text-xs text-slate-400 mt-1 leading-normal font-semibold">
                GitHub<br />Repositories
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual Arched Frame */}
        <div className="lg:col-span-5 relative flex justify-center items-end mt-16 lg:mt-0">
          <AnimatePresence mode="wait">
            {imageSrc ? (
              <motion.div
                key="hero-photo"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[340px] sm:max-w-[370px] aspect-[3.5/5] relative flex items-end justify-center overflow-visible"
              >
                {/* Arch Background Container */}
                <div className="absolute bottom-0 w-full h-[85%] rounded-t-full bg-[#13402C] border border-[#1E543D] shadow-2xl z-0" />
                
                {/* Developer Image sitting on the bottom and popping out the top */}
                <img 
                  src={imageSrc} 
                  alt={personalInfo.name || "Nitesh Kumar"} 
                  className="w-[95%] h-auto max-h-[105%] object-contain transition-transform duration-500 hover:scale-[1.02] filter drop-shadow-2xl z-10 relative translate-y-1"
                  style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'
                  }}
                />
              </motion.div>
            ) : (
              /* Fallback Graphics inside Arch */
              <motion.div
                key="hero-terminal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[340px] sm:max-w-[370px] aspect-[3.5/5] relative flex items-end justify-center overflow-visible"
              >
                {/* Arch Background Container */}
                <div className="absolute bottom-0 w-full h-[85%] rounded-t-full bg-[#13402C] border border-[#1E543D] shadow-2xl z-0" />
                <div className="w-[85%] h-[75%] bg-[#0B2C1F]/80 backdrop-blur-sm rounded-t-full z-10 border border-slate-700/50 p-6 flex flex-col justify-between font-mono text-[10px] text-slate-300 mb-6 overflow-hidden">
                  <div className="flex gap-1 border-b border-slate-800 pb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-grow flex flex-col justify-center text-left py-2">
                    <p className="text-slate-500">// MERN Stack Developer</p>
                    <p className="text-[#FF9100] font-bold">const nitesh = &#123;</p>
                    <p className="pl-2">role: &apos;MERN Stack&apos;,</p>
                    <p className="pl-2 text-emerald-400">status: &apos;available&apos;</p>
                    <p className="text-[#FF9100] font-bold">&#125;;</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Curved SVG Wave Transition at the bottom of the section */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] transform translate-y-[1px] z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] lg:h-[80px] fill-[#f8fafc]">
          <path d="M0,60 C300,100 600,80 900,30 C1050,10 1150,5 1200,0 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}
