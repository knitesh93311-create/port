"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonialsData as staticTestimonialsData } from '@/data/portfolioData';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function Testimonials({ testimonialsData: propTestimonialsData }) {
  const testimonialsData = propTestimonialsData || staticTestimonialsData;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const activeTestimonial = testimonialsData[currentIndex];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Background decor details */}
      <div className="absolute top-[20%] left-[-8%] w-[250px] h-[250px] rounded-full bg-cyan-50/50 blur-[70px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-manrope text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6A75E] mb-2 block">
            TESTIMONIALS
          </span>
          <h2 className="font-poppins font-extrabold text-[#C6A75E]xl sm:text-4xl text-[#1F2A44] leading-tight mb-4">
            LinkedIn & Client Reviews
          </h2>
          <p className="font-inter text-slate-500 text-sm sm:text-base leading-relaxed">
            Here is what engineering managers, clients, and team members have said about working together on technical products.
          </p>
        </div>

        {/* Testimonial slider card */}
        <div className="relative">
          
          {/* Card background shadow wrapper */}
          <div className="absolute -inset-4 rounded-3xl bg-slate-100 blur-xl opacity-60 pointer-events-none" />

          <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-8 sm:p-12 relative min-h-[300px] flex flex-col justify-between shadow-sm">
            
            {/* Quote Icon */}
            <span className="absolute top-8 right-8 text-[#C6A75E]/10 pointer-events-none">
              <FaQuoteLeft size={72} />
            </span>

            {/* Testimonial content slider */}
            <div className="text-left z-10 flex-grow">
              
              {/* Star ratings */}
              <div className="flex gap-1 text-amber-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>

              {/* Feedback text */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="font-inter text-[#334155] text-sm sm:text-base md:text-lg leading-relaxed italic mb-8"
                >
                  &ldquo;{activeTestimonial.feedback}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Author Profile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-slate-200/50 pt-6 mt-4 z-10">
              <div className="flex items-center gap-3 text-left">
                {/* Visual Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#C6A75E] to-[#1F2A44] p-0.5 shadow overflow-hidden flex items-center justify-center">
                  {activeTestimonial.image ? (
                    <img 
                      src={activeTestimonial.image} 
                      alt={activeTestimonial.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="w-full h-full bg-white rounded-full flex items-center justify-center text-[#C6A75E] font-poppins font-bold text-xs uppercase">
                      {activeTestimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-[#1F2A44]">{activeTestimonial.name}</h4>
                  <p className="font-manrope text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{activeTestimonial.role}</p>
                </div>
              </div>

              {/* Toggle Controls */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={handlePrev}
                  className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-[#C6A75E] hover:border-slate-300 active:scale-95 transition-all shadow-sm"
                  aria-label="Previous Testimonial"
                >
                  <FaChevronLeft size={12} />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-[#C6A75E] hover:border-slate-300 active:scale-95 transition-all shadow-sm"
                  aria-label="Next Testimonial"
                >
                  <FaChevronRight size={12} />
                </button>
              </div>
            </div>

          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonialsData.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-6 bg-[#C6A75E]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to testimonial slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

