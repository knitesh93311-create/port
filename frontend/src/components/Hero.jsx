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

// Floating tech badge component
const TechBadge = ({ icon: Icon, label, color, delay, style }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
    transition={{
      opacity: { delay, duration: 0.5 },
      scale: { delay, duration: 0.5 },
      y: { delay: delay + 0.5, duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
    }}
    className="absolute z-30 flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-lg shadow-slate-200/50 rounded-xl px-3 py-2 pointer-events-none"
    style={style}
  >
    <Icon size={14} style={{ color }} />
    <span className="font-manrope text-[11px] font-bold text-slate-700">{label}</span>
  </motion.div>
);

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
      className="relative min-h-screen pt-24 lg:pt-28 pb-0 px-6 overflow-hidden flex items-start"
      style={{
        background: 'linear-gradient(160deg, #FAF8F5 0%, #F5F0E8 40%, #FAF8F5 100%)',
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(198,167,94,0.07) 1px, transparent 0),
          linear-gradient(160deg, #FAF8F5 0%, #F5F0E8 40%, #FAF8F5 100%)
        `,
        backgroundSize: '28px 28px, 100% 100%'
      }}
    >
      {/* Background Luxury Orbs */}
      <div className="absolute top-[15%] right-[8%] w-[500px] h-[500px] rounded-full bg-[#C6A75E]/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[3%] w-[400px] h-[400px] rounded-full bg-[#1F2A44]/6 blur-[120px] pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C6A75E]/4 blur-[160px] pointer-events-none" />

      {/* Subtle diagonal lines for luxury texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #1F2A44 0px, #1F2A44 1px, transparent 1px, transparent 60px)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end z-10 mt-6 lg:mt-10">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left pb-20 lg:pb-28">

          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center gap-2 mb-5 bg-white border border-[#C6A75E]/30 rounded-full px-4 py-1.5 shadow-sm shadow-[#C6A75E]/10"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.18em] text-[#1F2A44]">
              Available for Hire
            </span>
          </motion.div>

          {/* Small Label */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#C6A75E] mb-3"
          >
            {(personalInfo.title || "FULL STACK MERN DEVELOPER").toUpperCase()}
          </motion.span>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-poppins font-extrabold text-4xl sm:text-5xl lg:text-[3.4rem] text-[#1F2A44] leading-[1.1] mb-6"
          >
            {personalInfo.tagline ? (
              personalInfo.tagline.includes("Digital Products") ? (
                <>
                  Building Scalable <br />
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-[#C6A75E] via-[#D4B96A] to-[#B0934E] bg-clip-text text-transparent">
                      Digital Products
                    </span>
                    {/* Underline accent */}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, delay: 0.8 }}
                      className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C6A75E] to-[#B0934E] rounded-full origin-left"
                    />
                  </span> <br />
                  With MERN Stack
                </>
              ) : personalInfo.tagline
            ) : (
              <>
                Building Scalable <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#C6A75E] via-[#D4B96A] to-[#B0934E] bg-clip-text text-transparent">
                    Digital Products
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C6A75E] to-[#B0934E] rounded-full origin-left"
                  />
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
            className="font-inter text-base sm:text-lg text-[#334155] leading-relaxed max-w-xl mb-8"
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-inter text-sm font-bold text-white bg-gradient-to-r from-[#C6A75E] to-[#B0934E] hover:from-[#B0934E] hover:to-[#9A7E3E] active:scale-[0.98] px-7 py-4 rounded-xl shadow-lg shadow-[#C6A75E]/25 hover:shadow-[#C6A75E]/40 transition-all duration-300"
            >
              View My Work
              <FaArrowRight className="text-xs" />
            </a>
            
            <a
              href={personalInfo.resumeUrl || "/resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              download="Nitesh_Kumar_Resume.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-inter text-sm font-bold text-[#1F2A44] bg-white hover:bg-slate-50 border border-[#1F2A44]/15 hover:border-[#1F2A44]/25 active:scale-[0.98] px-7 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <FaDownload className="text-xs" />
              Download Resume
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-inter text-sm font-bold text-[#C6A75E] bg-[#C6A75E]/10 hover:bg-[#C6A75E]/15 border border-[#C6A75E]/20 active:scale-[0.98] px-7 py-4 rounded-xl transition-all duration-300"
            >
              <FaBriefcase className="text-xs" />
              Hire Me
            </a>
          </motion.div>

          {/* Social Links + Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col gap-4 border-t border-[#C6A75E]/15 pt-6 w-full"
          >
            <div className="flex items-center gap-4">
              <span className="font-manrope text-xs font-bold text-slate-400 tracking-wider uppercase mr-2">
                Connect:
              </span>
              <a
                href={personalInfo.github || "https://github.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-[#1F2A44] hover:border-[#1F2A44]/30 hover:shadow-sm transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={personalInfo.linkedin || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border border-slate-200 rounded-xl text-[#0077B5] hover:border-blue-200 hover:shadow-sm transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={personalInfo.email ? `mailto:${personalInfo.email}` : "mailto:niteshkumar.dev.mern@gmail.com"}
                className="p-3 bg-white border border-slate-200 rounded-xl text-[#EA4335] hover:border-red-200 hover:shadow-sm transition-all duration-200"
                aria-label="Email Nitesh"
              >
                <FaEnvelope size={18} />
              </a>

              {/* Mini stats */}
              <div className="ml-auto hidden sm:flex items-center gap-5 text-center">
                {[
                  { val: "2+", label: "Yrs Exp" },
                  { val: "15+", label: "Projects" },
                  { val: "100%", label: "Committed" },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <p className="font-poppins font-extrabold text-base text-[#1F2A44]">{val}</p>
                    <p className="font-manrope text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual Artwork — Bottom Anchored */}
        <div className="lg:col-span-5 relative flex justify-center items-end h-[520px] lg:h-[640px]">
          
          {/* Floating Tech Badges */}
          <TechBadge icon={SiReact} label="React.js" color="#61DAFB" delay={0.7} style={{ top: '8%', left: '-8%' }} />
          <TechBadge icon={SiNodedotjs} label="Node.js" color="#68A063" delay={0.9} style={{ top: '20%', right: '-10%' }} />
          <TechBadge icon={SiMongodb} label="MongoDB" color="#47A248" delay={1.1} style={{ top: '44%', right: '-12%' }} />
          <TechBadge icon={SiTailwindcss} label="Tailwind" color="#38BDF8" delay={1.3} style={{ top: '10%', right: '15%' }} />

          {/* Ambient glow behind image */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full bg-[#C6A75E]/12 blur-[80px] pointer-events-none z-0" />

          <AnimatePresence mode="wait">
            {imageSrc ? (
              <motion.div
                key="hero-photo"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-[400px] flex flex-col items-center justify-end"
                style={{ height: '100%' }}
              >
                {/* The image — bottom anchored, fades at very bottom into pedestal */}
                <img 
                  src={imageSrc} 
                  alt={personalInfo.name || "Nitesh Kumar"}
                  className="relative z-10 w-full object-contain object-bottom max-h-full drop-shadow-2xl select-none"
                  style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0.6) 88%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0.6) 88%, rgba(0,0,0,0) 100%)',
                    filter: 'drop-shadow(0 30px 60px rgba(31,42,68,0.15)) drop-shadow(0 0 40px rgba(198,167,94,0.08))'
                  }}
                />

                {/* Premium Pedestal / Ground Line — sits at very bottom, image dissolves into it */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20"
                  style={{ width: '110%' }}
                >
                  {/* Main glowing ellipse line */}
                  <div
                    style={{
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(198,167,94,0.3) 15%, rgba(198,167,94,0.9) 35%, rgba(212,185,106,1) 50%, rgba(198,167,94,0.9) 65%, rgba(198,167,94,0.3) 85%, transparent 100%)',
                      boxShadow: '0 0 20px 4px rgba(198,167,94,0.35), 0 0 60px 12px rgba(198,167,94,0.12)',
                      borderRadius: '50%',
                    }}
                  />
                  {/* Subtle reflection below the line */}
                  <div
                    style={{
                      width: '80%',
                      height: '1px',
                      marginTop: '4px',
                      marginLeft: '10%',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(198,167,94,0.15) 30%, rgba(198,167,94,0.35) 50%, rgba(198,167,94,0.15) 70%, transparent 100%)',
                      boxShadow: '0 0 10px 2px rgba(198,167,94,0.1)',
                      borderRadius: '50%',
                    }}
                  />
                  {/* Ground shadow / floor ellipse */}
                  <div
                    style={{
                      width: '70%',
                      height: '18px',
                      marginTop: '2px',
                      marginLeft: '15%',
                      background: 'radial-gradient(ellipse at center, rgba(198,167,94,0.1) 0%, transparent 70%)',
                      filter: 'blur(4px)',
                    }}
                  />
                </motion.div>
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
                  <p className="pl-4">mission: <span className="text-[#FBBF24]">&apos;Build Clean &amp; Scalable Products&apos;</span>,</p>
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
