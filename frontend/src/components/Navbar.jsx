"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaMenu, FaTimes } from 'react-icons/fa';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { personalInfo as staticPersonalInfo } from '@/data/portfolioData';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ personalInfo: propPersonalInfo }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activePersonalInfo = propPersonalInfo || staticPersonalInfo;

  // Monitor scroll for header background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check which section is in viewport
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <span className="font-poppins font-extrabold tracking-tight bg-gradient-to-r from-[#C6A75E] to-[#1F2A44] bg-clip-text text-transparent group-hover:opacity-80 transition-opacity text-xl">
              NITESH KUMAR
            </span>
            <span className="font-manrope text-xs font-semibold text-[#1F2A44] border border-slate-200 px-2 py-0.5 rounded-full bg-slate-50">
              MERN
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-inter text-sm font-medium transition-colors relative py-1 ${
                    isActive ? 'text-[#C6A75E]' : 'text-[#334155] hover:text-[#C6A75E]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C6A75E] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href={activePersonalInfo?.resumeUrl || "/resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-white bg-[#C6A75E] hover:bg-[#B0934E] active:scale-95 px-5 py-2.5 rounded-lg shadow-sm shadow-[#C6A75E]/10 hover:shadow-[#C6A75E]/20 transition-all duration-200"
            >
              <FaDownload className="text-xs" />
              Download Resume
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-[#1F2A44] hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open Navigation Menu"
          >
            <HiMenuAlt3 size={24} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#1F2A44] z-50 md:hidden"
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 p-6 md:hidden flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-poppins font-extrabold tracking-tight bg-gradient-to-r from-[#C6A75E] to-[#1F2A44] bg-clip-text text-transparent text-xl">
                    NITESH KUMAR
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#334155] hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="Close Navigation Menu"
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                {/* Navigation links */}
                <nav className="flex flex-col gap-5">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`font-inter text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                          isActive
                            ? 'text-[#C6A75E] bg-[#C6A75E]/10'
                            : 'text-[#334155] hover:text-[#C6A75E] hover:bg-slate-50'
                        }`}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer CTA */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <a
                  href={activePersonalInfo?.resumeUrl || '/resume.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Nitesh_Kumar_Resume.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 font-inter text-base font-semibold text-white bg-[#C6A75E] hover:bg-[#B0934E] py-3.5 rounded-lg shadow-sm shadow-[#C6A75E]/10 transition-colors"
                >
                  <FaDownload className="text-sm" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

