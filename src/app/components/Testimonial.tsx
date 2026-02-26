"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import SlideIn from "./animations/SlideIn";
import TypewriterText from "./animations/TypewriterText";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize for accurate slide calculations
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonials = [
    { name: "Sarah Chen", img: "/test1.jpg", rating: 5, text: "UAARN transformed how we approach resilience. We prevent potential downtime with the AI's predictive capabilities." },
    { name: "Marcus Thompson", img: "/test2.webp", rating: 4, text: "The predictive capabilities are remarkable. They've prevented major incidents that would have cost us millions." },
    { name: "Emily Rodriguez", img: "/test3.jpg", rating: 5, text: "Implementation was seamless, and the AI started working immediately. Team efficiency increased by 40%." },
    { name: "David Park", img: "/test5.jpg", rating: 4, text: "The personalized recommendations have become essential to our decision-making process. Highly effective." },
    { name: "Ayesha Malik", img: "/test4.jpg", rating: 5, text: "A masterclass in educational AI. The depth of the explanations and the high-fidelity UI is unmatched." },
    { name: "James Wilson", img: "/test6.jpg", rating: 4, text: "UAARN's infrastructure is built for the future. It has scaled our training protocols beyond expectations." },
  ];

  const nextStep = () => {
    const limit = isMobile ? testimonials.length - 1 : testimonials.length - 3;
    setIndex((prev) => (prev >= limit ? 0 : prev + 1));
  };

  const prevStep = () => {
    const limit = isMobile ? testimonials.length - 1 : testimonials.length - 3;
    setIndex((prev) => (prev <= 0 ? limit : prev - 1));
  };

  // Calculate the horizontal shift based on screen size
  const xOffset = isMobile 
    ? `calc(-${index * 100}% - ${index * 32}px)` 
    : `calc(-${index * (100 / 3)}% - ${index * 21.3}px)`;

  return (
    <section className="bg-[#E2E2E0] py-24 px-6 relative overflow-hidden font-sans selection:bg-[#861211]/20">
      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">
        
        <SlideIn direction="up" className="text-center mb-28 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0E2931]/10 text-[#0E2931]/60 text-[9px] font-black uppercase tracking-[0.3em]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#861211]" />
            Global Validation
          </div>
          <h2 className="text-3xl sm:text-3xl font-black text-[#0E2931] tracking-tighter uppercase leading-none">
            Trusted by{" "}
            <span className="text-[#861211] italic inline-block">
              <TypewriterText text="Industry Leaders" loop cursorColor="#861211" />
            </span>
          </h2>
        </SlideIn>

        <div className="relative w-full overflow-visible">
          <div className="overflow-hidden py-16 px-4"> 
            <motion.div 
              className="flex gap-8"
              animate={{ x: xOffset }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              style={{ display: 'flex' }}
            >
              {testimonials.map((item, i) => (
                <div key={i} className="group flex-shrink-0 w-full md:w-[calc(33.333%-21.3px)] h-[300px] [perspective:1000px]">
                  <motion.div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    
                    {/* FRONT SIDE */}
                    <div className="absolute inset-0 w-full h-full bg-[#0E2931] [backface-visibility:hidden] rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center p-10 border border-white/5">
                      <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-[#E2E2E0] overflow-hidden shadow-2xl bg-white">
                        <Image src={item.img} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="text-center w-full flex flex-col items-center gap-3">
                        <h4 className="text-white text-2xl font-black uppercase tracking-tighter">{item.name}</h4>
                        <div className="flex gap-1.5">
                          {[...Array(5)].map((_, starI) => (
                            <Star key={starI} size={12} className={starI < item.rating ? "fill-[#FACC15] text-[#FACC15]" : "fill-white/10 text-white/10"} />
                          ))}
                        </div>
                      </div>
                      <div className="absolute bottom-10 opacity-20 flex flex-col items-center">
                         <div className="w-12 h-[1px] bg-[#2B7574] mb-2" />
                         <span className="text-[8px] text-white font-black uppercase tracking-[0.4em]">Read Review</span>
                      </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="absolute inset-0 w-full h-full bg-[#0E2931] [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center shadow-2xl border border-white/5">
                      <Quote size={28} className="text-[#2B7574]/30 mb-4" />
                      <p className="text-white text-sm leading-relaxed italic font-medium">
                        &quot;{item.text}&quot;
                      </p>
                      <div className="mt-6 pt-4 border-t border-white/10 w-full text-[#2B7574] font-black uppercase tracking-widest text-[9px]">
                        {item.name}
                      </div>
                    </div>

                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mt-4">
            <button onClick={prevStep} className="p-4 rounded-full bg-white border border-[#0E2931]/10 text-[#0E2931] hover:bg-[#0E2931] hover:text-white transition-all shadow-lg">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextStep} className="p-4 rounded-full bg-white border border-[#0E2931]/10 text-[#0E2931] hover:bg-[#0E2931] hover:text-white transition-all shadow-lg">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}