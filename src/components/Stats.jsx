"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { aboutStats } from '@/data/portfolioData';
import { FaProjectDiagram, FaCode, FaGithub, FaClock } from 'react-icons/fa';

const iconMap = {
  1: FaProjectDiagram,
  2: FaCode,
  3: FaGithub,
  4: FaClock
};

const colorMap = {
  1: "text-[#2563EB] bg-blue-50 border-blue-100",
  2: "text-[#06B6D4] bg-cyan-50 border-cyan-100",
  3: "text-emerald-500 bg-emerald-50 border-emerald-100",
  4: "text-purple-500 bg-purple-50 border-purple-100"
};

function StatCounter({ target, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp = null;
    const duration = 1500; // 1.5 seconds

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-poppins font-black text-4xl sm:text-5xl text-[#0F172A]">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Card Grid Container */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutStats.map((stat, index) => {
            const Icon = iconMap[stat.id] || FaCode;
            const styleColor = colorMap[stat.id] || "text-[#2563EB] bg-blue-50";
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-50 border border-slate-200/50 p-6 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left transition-all duration-200 hover:shadow-md hover:border-slate-300"
              >
                {/* Icon wrapper */}
                <div className={`p-3 rounded-xl border mb-4 flex items-center justify-center ${styleColor}`}>
                  <Icon size={20} />
                </div>
                
                {/* Count value */}
                <StatCounter target={stat.value} />

                {/* Stat label */}
                <p className="font-manrope text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
