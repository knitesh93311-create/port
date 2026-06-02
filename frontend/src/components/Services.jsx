"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { servicesData as staticServicesData } from '@/data/portfolioData';

export default function Services({ servicesData: propServicesData }) {
  const servicesData = propServicesData || staticServicesData;
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-manrope text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6A75E] mb-2 block">
            WHAT I OFFER
          </span>
          <h2 className="font-poppins font-extrabold text-[#C6A75E]xl sm:text-4xl text-[#1F2A44] leading-tight mb-4">
            Professional Engineering Services
          </h2>
          <p className="font-inter text-slate-500 text-sm sm:text-base leading-relaxed">
            I deliver clean code products and performance improvements designed to provide maximum business value.
          </p>
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const ServiceIcon = service.icon;
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-slate-50 border border-slate-200/50 rounded-2xl p-8 text-left transition-all duration-300 hover:bg-white hover:border-slate-300 hover:shadow-lg flex flex-col items-start group"
              >
                {/* Visual Icon Box */}
                <div className="p-4 bg-white text-[#C6A75E] border border-slate-200/40 rounded-xl mb-6 shadow-sm group-hover:bg-[#C6A75E] group-hover:text-white transition-all duration-300">
                  <ServiceIcon size={22} />
                </div>

                {/* Title */}
                <h3 className="font-poppins font-bold text-lg text-[#1F2A44] mb-3 group-hover:text-[#C6A75E] transition-colors duration-200">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-inter text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

