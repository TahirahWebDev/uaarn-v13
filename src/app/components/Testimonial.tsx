"use client";
import React from "react";
import { Star, Quote } from "lucide-react";
import SlideIn from "./animations/SlideIn";
import ScaleIn from "./animations/ScaleIn";
import StaggerContainer from "./animations/StaggerContainer";
import FadeIn from "./animations/FadeIn";
import { motion } from "framer-motion";
import TypewriterText from "./animations/TypewriterText";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechScale Inc.",
      initials: "SC",
      color: "bg-[#2B7574]",
      rating: 5,
      text: "UAARN transformed how we approach resilience. We prevent potential downtime with the AI's predictive capabilities.",
    },
    {
      name: "Marcus Thompson",
      role: "VP of Operations, GlobalLogix",
      initials: "MT",
      color: "bg-[#0E2931]",
      rating: 4,
      text: "The predictive capabilities are remarkable. They've prevented major incidents that would have cost us millions.",
    },
    {
      name: "Emily Rodriguez",
      role: "Director of IT, Meridian",
      initials: "ER",
      color: "bg-[#861211]",
      rating: 5,
      text: "Implementation was seamless, and the AI started working immediately. Team efficiency increased by 40%.",
    },
    {
      name: "David Park",
      role: "CEO, InnovateCo",
      initials: "DP",
      color: "bg-[#2B7574]",
      rating: 4,
      text: "The personalized recommendations have become essential to our decision-making process. Highly effective.",
    },
    {
      name: "Ayesha Malik",
      role: "Lead Architect, GIAIC",
      initials: "AM",
      color: "bg-[#0E2931]",
      rating: 3,
      text: "A masterclass in educational AI. The depth of the explanations and the high-fidelity UI is unmatched.",
    },
    {
      name: "James Wilson",
      role: "Founder, Nexus Corp",
      initials: "JW",
      color: "bg-[#861211]",
      rating: 4,
      text: "UAARN's infrastructure is built for the future. It has scaled our training protocols beyond expectations.",
    },
  ];

  return (
    <section className="bg-[#E2E2E0] py-20 px-6 relative overflow-hidden font-sans selection:bg-[#861211]/20">

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">

        {/* Header Section */}
        <SlideIn direction="up" className="text-center mb-16 space-y-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0E2931]/10 text-[#0E2931]/60 text-[9px] font-black uppercase tracking-[0.3em] cursor-default"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#861211]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            Global Validation
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0E2931] tracking-tighter uppercase leading-none">
            Trusted by{" "}
            <span className="text-[#861211] italic inline-block">
              <TypewriterText text="Industry Leaders" loop cursorColor="#861211" />
            </span>
          </h2>
        </SlideIn>

        {/* 6-Card Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-20">
          {testimonials.map((item, index) => (
            <ScaleIn key={index} delay={index * 0.05} className="h-full">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="group relative bg-[#0E2931] rounded-[2rem] p-8 shadow-xl border border-white/5 flex flex-col justify-between h-full overflow-hidden cursor-default"
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#2B7574]/0 to-[#861211]/0 group-hover:from-[#2B7574]/10 group-hover:to-[#861211]/10 rounded-[2rem] transition-all duration-500"
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    {/* Stars with stagger animation */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 400 }}
                        >
                          <Star
                            size={12}
                            className={`transition-colors duration-300 ${i < item.rating
                              ? "fill-[#FACC15] text-[#FACC15]"
                              : "fill-[#2B7574]/20 text-[#2B7574]/20"
                              }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    >
                      <Quote size={28} className="text-white/5 group-hover:text-[#861211]/30 transition-all duration-500" />
                    </motion.div>
                  </div>

                  <p className="text-[#E2E2E0]/80 text-[15px] font-medium leading-relaxed italic mb-8">
                    &quot;{item.text}&quot;
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`w-10 h-10 ${item.color} rounded-xl flex-shrink-0 flex items-center justify-center text-white font-black text-[10px] border border-white/10 shadow-md`}
                  >
                    {item.initials}
                  </motion.div>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-widest text-[11px]">{item.name}</h4>
                    <p className="text-[#E2E2E0]/40 text-[9px] font-bold uppercase tracking-widest">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            </ScaleIn>
          ))}
        </StaggerContainer>

        {/* Brand Bar */}
        <FadeIn delay={0.4} className="w-full flex flex-col items-center gap-8 opacity-30 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-700">
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {["TechScale", "GlobalLogix", "Meridian", "InnovateCo", "Nexus Corp"].map((brand, i) => (
              <motion.span
                key={brand}
                className="text-lg font-black text-[#0E2931] uppercase tracking-tighter cursor-default"
                whileHover={{ scale: 1.1, color: "#861211" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}