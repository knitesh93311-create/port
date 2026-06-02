"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { personalInfo as staticPersonalInfo } from '@/data/portfolioData';

export default function Contact({ personalInfo: propPersonalInfo }) {
  const personalInfo = propPersonalInfo || staticPersonalInfo;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validate();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all as touched
    const allTouched = {};
    Object.keys(formData).forEach(k => { allTouched[k] = true; });
    setTouched(allTouched);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Background visual orb decoration */}
      <div className="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-blue-50/70 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-2 block">
            GET IN TOUCH
          </span>
          <h2 className="font-poppins font-extrabold text-3xl sm:text-4xl text-[#0F172A] leading-tight mb-4">
            Connect With Me
          </h2>
          <p className="font-inter text-slate-500 text-sm sm:text-base leading-relaxed">
            Have an open role, project proposal, or just want to say hi? Use the form below or find me on socials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Info Cards */}
            <div className="flex flex-col gap-6 text-left">
              
              {/* Location Card */}
              <div className="bg-white border border-blue-900/30 p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
                <span className="p-3 bg-blue-50 text-[#2563EB] border border-blue-100 rounded-xl">
                  <FaMapMarkerAlt size={18} />
                </span>
                <div>
                  <h4 className="font-poppins font-bold text-[#0F172A] text-sm">Location</h4>
                  <p className="font-inter text-slate-500 text-xs sm:text-sm mt-1">{personalInfo.location}</p>
                </div>
              </div>

              {/* Email Card */}
              <a 
                href={`mailto:${personalInfo.email}`}
                className="bg-white border border-blue-900/30 p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md hover:border-blue-700/50 transition-all text-left"
              >
                <span className="p-3 bg-cyan-50 text-[#06B6D4] border border-cyan-100 rounded-xl">
                  <FaEnvelope size={18} />
                </span>
                <div>
                  <h4 className="font-poppins font-bold text-[#0F172A] text-sm">Email Address</h4>
                  <p className="font-inter text-slate-500 text-xs sm:text-sm mt-1 break-all">{personalInfo.email}</p>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a 
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-blue-900/30 p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md hover:border-blue-700/50 transition-all text-left"
              >
                <span className="p-3 bg-indigo-50 text-[#0077B5] border border-indigo-100 rounded-xl">
                  <FaLinkedin size={18} />
                </span>
                <div>
                  <h4 className="font-poppins font-bold text-[#0F172A] text-sm">LinkedIn Profile</h4>
                  <p className="font-inter text-slate-500 text-xs sm:text-sm mt-1">linkedin.com/in/nitesh-kumar</p>
                </div>
              </a>

              {/* GitHub Card */}
              <a 
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-blue-900/30 p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md hover:border-blue-700/50 transition-all text-left"
              >
                <span className="p-3 bg-gray-50 text-[#181717] border border-gray-100 rounded-xl">
                  <FaGithub size={18} />
                </span>
                <div>
                  <h4 className="font-poppins font-bold text-[#0F172A] text-sm">GitHub Profile</h4>
                  <p className="font-inter text-slate-500 text-xs sm:text-sm mt-1">github.com/nitesh-kumar</p>
                </div>
              </a>

            </div>

            {/* Recruiter Quote visual node */}
            <div className="bg-[#0F172A] text-white p-6 rounded-2xl border border-blue-800/40 text-left shadow-lg hidden lg:block">
              <span className="relative flex h-2 w-2 mb-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <h5 className="font-poppins font-bold text-xs text-white mb-2">Available for interviews</h5>
              <p className="font-inter text-[11px] text-slate-400 leading-relaxed">
                Currently responding to inquiries within 12 hours. I am open to technical rounds, pair programming assessments, and product alignment reviews.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-blue-900/30 rounded-3xl p-6 sm:p-8 shadow-sm relative h-full">
              
              <AnimatePresence mode="wait">
                {submitStatus !== 'success' ? (
                  <motion.form 
                    key="contact-form"
                    onSubmit={handleSubmit} 
                    className="flex flex-col gap-5 h-full text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div className="flex flex-col items-start">
                        <label htmlFor="name" className="font-poppins text-xs font-bold text-[#0F172A] mb-1.5">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={() => handleBlur('name')}
                          className={`w-full font-inter text-sm px-4 py-3 rounded-xl border outline-none bg-slate-50 transition-all ${
                            touched.name && errors.name 
                              ? 'border-red-500 bg-red-50/20 text-red-900 focus:border-red-500' 
                              : 'border-slate-200 focus:border-[#2563EB] focus:bg-white'
                          }`}
                          placeholder="John Doe"
                          disabled={isSubmitting}
                          required
                        />
                        {touched.name && errors.name && (
                          <span className="text-red-500 text-[10px] font-semibold mt-1">{errors.name}</span>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col items-start">
                        <label htmlFor="email" className="font-poppins text-xs font-bold text-[#0F172A] mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur('email')}
                          className={`w-full font-inter text-sm px-4 py-3 rounded-xl border outline-none bg-slate-50 transition-all ${
                            touched.email && errors.email 
                              ? 'border-red-500 bg-red-50/20 text-red-900 focus:border-red-500' 
                              : 'border-slate-200 focus:border-[#2563EB] focus:bg-white'
                          }`}
                          placeholder="johndoe@company.com"
                          disabled={isSubmitting}
                          required
                        />
                        {touched.email && errors.email && (
                          <span className="text-red-500 text-[10px] font-semibold mt-1">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    {/* Subject Input */}
                    <div className="flex flex-col items-start">
                      <label htmlFor="subject" className="font-poppins text-xs font-bold text-[#0F172A] mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={() => handleBlur('subject')}
                        className={`w-full font-inter text-sm px-4 py-3 rounded-xl border outline-none bg-slate-50 transition-all ${
                          touched.subject && errors.subject 
                            ? 'border-red-500 bg-red-50/20 text-red-900 focus:border-red-500' 
                            : 'border-slate-200 focus:border-[#2563EB] focus:bg-white'
                        }`}
                        placeholder="Inquiry regarding Full-Stack Developer position"
                        disabled={isSubmitting}
                        required
                      />
                      {touched.subject && errors.subject && (
                        <span className="text-red-500 text-[10px] font-semibold mt-1">{errors.subject}</span>
                      )}
                    </div>

                    {/* Message Textarea */}
                    <div className="flex flex-col items-start flex-grow">
                      <label htmlFor="message" className="font-poppins text-xs font-bold text-[#0F172A] mb-1.5">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur('message')}
                        rows={5}
                        className={`w-full font-inter text-sm px-4 py-3 rounded-xl border outline-none bg-slate-50 transition-all resize-none flex-grow ${
                          touched.message && errors.message 
                            ? 'border-red-500 bg-red-50/20 text-red-900 focus:border-red-500' 
                            : 'border-slate-200 focus:border-[#2563EB] focus:bg-white'
                        }`}
                        placeholder="Hi Nitesh, we would love to schedule a technical screening call for next Tuesday..."
                        disabled={isSubmitting}
                        required
                      />
                      {touched.message && errors.message && (
                        <span className="text-red-500 text-[10px] font-semibold mt-1">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 font-inter text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-blue-400 py-4 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin text-sm" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane size={11} />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  // Success Animation block
                  <motion.div 
                    key="success-card"
                    className="flex flex-col items-center justify-center py-16 h-full text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="p-4 bg-emerald-50 text-emerald-500 rounded-full border border-emerald-100 mb-6"
                    >
                      <FaCheckCircle size={48} />
                    </motion.span>
                    
                    <h3 className="font-poppins font-extrabold text-2xl text-[#0F172A] mb-3">
                      Message Sent Successfully!
                    </h3>
                    
                    <p className="font-inter text-slate-500 text-sm max-w-sm mb-8 leading-relaxed">
                      Thank you for reaching out. Your message has been received, and Nitesh will contact you back shortly.
                    </p>

                    <button
                      onClick={() => setSubmitStatus(null)}
                      className="inline-flex items-center justify-center font-inter text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-6 py-3 rounded-lg transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
