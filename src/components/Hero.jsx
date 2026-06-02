"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import { 
  SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss, SiPostman 
} from 'react-icons/si';

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

export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden flex items-center radial-bg"
    >
      {/* Background Orbs */}
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-cyan-400/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 rounded-full px-4 py-1.5 mb-6 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-manrope text-xs font-semibold text-emerald-800 tracking-wide">
              Available For Full-Time Opportunities
            </span>
          </motion.div>

          {/* Small Label */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#06B6D4] mb-3"
          >
            FULL STACK MERN DEVELOPER
          </motion.span>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-poppins font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#0F172A] leading-[1.15] mb-6"
          >
            Building Scalable <br />
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              Digital Products
            </span> <br />
            With MERN Stack
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-inter text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl mb-8"
          >
            I design and develop modern, responsive, and high-performance web applications using MongoDB, Express.js, React.js, and Node.js with a strong focus on user experience, scalability, and clean architecture.
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-inter text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-98 px-7 py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200"
            >
              View My Work
              <FaArrowRight className="text-xs" />
            </a>
            
            <a
              href="/resume.pdf"
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-inter text-sm font-bold text-[#2563EB] bg-[#2563EB]/10 hover:bg-[#2563EB]/15 active:scale-98 px-7 py-4 rounded-xl transition-all duration-200"
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
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-[#0F172A] hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white border border-slate-200 rounded-xl text-[#0077B5] hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="mailto:niteshkumar.dev.mern@gmail.com"
              className="p-3 bg-white border border-slate-200 rounded-xl text-[#EA4335] hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              aria-label="Email Nitesh"
            >
              <FaEnvelope size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right Side: Visual Artwork */}
        <div className="lg:col-span-5 relative flex justify-center items-center h-[450px] lg:h-[550px] mt-10 lg:mt-0">
          
          {/* Main Visual Terminal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
              <p className="pl-4">name: <span className="text-[#38BDF8]">&apos;Nitesh Kumar&apos;</span>,</p>
              <p className="pl-4">role: <span className="text-[#38BDF8]">&apos;Full Stack Engineer&apos;</span>,</p>
              <p className="pl-4">coreStack: [<span className="text-[#34D399]">&apos;MongoDB&apos;, &apos;Express&apos;, &apos;React&apos;, &apos;Node&apos;</span>],</p>
              <p className="pl-4">mission: <span className="text-[#FBBF24]">&apos;Build Clean & Scalable Products&apos;</span>,</p>
              <p className="pl-4">availability: <span className="text-[#34D399]">true</span></p>
              <p>&#125;;</p>
              <br />
              <p className="text-slate-500">// Express Route</p>
              <p>app.get(<span className="text-[#38BDF8]">&apos;/api/value-created&apos;</span>, (req, res) =&gt; &#123;</p>
              <p className="pl-4 text-[#F43F5E]">return <span className="text-white">res.status(200).json(&#123;</span></p>
              <p className="pl-8">impact: <span className="text-[#38BDF8]">&apos;High-Performance SaaS Architectures&apos;</span>,</p>
              <p className="pl-8">recruiterStatus: <span className="text-[#38BDF8]">&apos;Ready to hire&apos;</span></p>
              <p className="pl-4 text-white">&#125;);</p>
              <p>&#125;);</p>
            </div>

            {/* Simulated Git Output Status */}
            <div className="bg-[#0F172A] rounded-xl p-3 border border-slate-800 text-left">
              <span className="text-[#06B6D4] text-xs font-mono">$ git commit -m &quot;Ready for production&quot;</span>
              <p className="text-emerald-400 text-xs font-mono mt-1">✓ Build success. Ready for enterprise launch.</p>
            </div>
          </motion.div>

          {/* Floating Badges */}

          {/* React */}
          <motion.div
            variants={floatAnimation(0)}
            animate="animate"
            className="absolute top-[8%] left-[-2%] md:left-[5%] bg-white hover:bg-slate-50 text-[#334155] border border-slate-200/80 rounded-2xl p-3 shadow-md flex items-center gap-3 z-20 cursor-pointer"
          >
            <span className="p-2 bg-blue-50 text-[#61DAFB] rounded-xl"><SiReact size={20} /></span>
            <div className="flex flex-col items-start pr-1">
              <span className="font-manrope text-[10px] font-bold text-slate-400">FRONTEND</span>
              <span className="font-poppins text-xs font-bold text-slate-800">React.js</span>
            </div>
          </motion.div>

          {/* Node */}
          <motion.div
            variants={floatAnimation(1)}
            animate="animate"
            className="absolute top-[35%] right-[-5%] bg-white hover:bg-slate-50 text-[#334155] border border-slate-200/80 rounded-2xl p-3 shadow-md flex items-center gap-3 z-20 cursor-pointer"
          >
            <span className="p-2 bg-emerald-50 text-[#339933] rounded-xl"><SiNodedotjs size={20} /></span>
            <div className="flex flex-col items-start pr-1">
              <span className="font-manrope text-[10px] font-bold text-slate-400">RUNTIME</span>
              <span className="font-poppins text-xs font-bold text-slate-800">Node.js</span>
            </div>
          </motion.div>

          {/* MongoDB */}
          <motion.div
            variants={floatAnimation(0.5)}
            animate="animate"
            className="absolute bottom-[2%] left-[10%] bg-white hover:bg-slate-50 text-[#334155] border border-slate-200/80 rounded-2xl p-3 shadow-md flex items-center gap-3 z-20 cursor-pointer"
          >
            <span className="p-2 bg-green-50 text-[#47A248] rounded-xl"><SiMongodb size={20} /></span>
            <div className="flex flex-col items-start pr-1">
              <span className="font-manrope text-[10px] font-bold text-slate-400">DATABASE</span>
              <span className="font-poppins text-xs font-bold text-slate-800">MongoDB</span>
            </div>
          </motion.div>

          {/* Express.js */}
          <motion.div
            variants={floatAnimation(1.5)}
            animate="animate"
            className="absolute bottom-[30%] left-[-10%] bg-white hover:bg-slate-50 text-[#334155] border border-slate-200/80 rounded-2xl p-3 shadow-md flex items-center gap-3 z-20 cursor-pointer"
          >
            <span className="p-2 bg-gray-50 text-[#000000] rounded-xl"><SiExpress size={20} /></span>
            <div className="flex flex-col items-start pr-1">
              <span className="font-manrope text-[10px] font-bold text-slate-400">BACKEND</span>
              <span className="font-poppins text-xs font-bold text-slate-800">Express.js</span>
            </div>
          </motion.div>

          {/* REST API */}
          <motion.div
            variants={floatAnimation(0.8)}
            animate="animate"
            className="absolute top-[-3%] right-[8%] bg-white hover:bg-slate-50 text-[#334155] border border-slate-200/80 rounded-2xl p-3 shadow-md flex items-center gap-3 z-20 cursor-pointer"
          >
            <span className="p-2 bg-orange-50 text-orange-500 rounded-xl"><SiPostman size={20} /></span>
            <div className="flex flex-col items-start pr-1">
              <span className="font-manrope text-[10px] font-bold text-slate-400">PROTOCOL</span>
              <span className="font-poppins text-xs font-bold text-slate-800">REST API</span>
            </div>
          </motion.div>

          {/* Tailwind CSS */}
          <motion.div
            variants={floatAnimation(1.2)}
            animate="animate"
            className="absolute bottom-[10%] right-[3%] bg-white hover:bg-slate-50 text-[#334155] border border-slate-200/80 rounded-2xl p-3 shadow-md flex items-center gap-3 z-20 cursor-pointer"
          >
            <span className="p-2 bg-cyan-50 text-[#06B6D4] rounded-xl"><SiTailwindcss size={20} /></span>
            <div className="flex flex-col items-start pr-1">
              <span className="font-manrope text-[10px] font-bold text-slate-400">STYLING</span>
              <span className="font-poppins text-xs font-bold text-slate-800">Tailwind CSS</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
