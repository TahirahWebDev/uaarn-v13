"use client";
import Image from "next/image";
import { Target, Lightbulb, Shield, Sparkles, Zap, Globe, Rocket, Users } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SlideIn from "../components/animations/SlideIn";
import TypewriterText from "../components/animations/TypewriterText";

const team = [
  { name: "Maryam Arif", role: "Founder & Managing Lead", img: "/maryam.jpeg", desc: "Leads AI development, system automation, and OpenAI Agents SDK integration.", delay: 0 },
  { name: "Mehak Akram", role: "Co-Founder & Backend Lead", img: "/mehak.jpg", desc: "Manages backend architecture, APIs, databases, and system reliability.", delay: 0.12 },
  { name: "Tahirah Roohi", role: "Co-Founder & Frontend Lead", img: "/tahira.jpg", desc: "Designs modern interfaces and improves user experience for the platform.", delay: 0.24 },
];

export default function AboutPage() {
  const missionRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} className="bg-[#E2E2E0] text-[#0E2931] flex flex-col items-center w-full relative overflow-hidden selection:bg-[#861211]/20 font-sans">
      
      {/* ─── ANIMATED BACKGROUND ELEMENTS ─── */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2B7574]/5 blur-[120px] rounded-full -z-10"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#861211]/5 blur-[120px] rounded-full -z-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* ─── HERO BADGE ─── */}
      <section className="pt-10 pb-2 px-6 max-w-4xl text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#0E2931]/10 text-[#0E2931]/50 text-[10px] font-black uppercase tracking-[0.35em] shadow-sm mb-0"
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
            <Sparkles size={12} className="text-[#861211]" />
          </motion.div>
          Our Story • UAARN Labs
        </motion.div>
      </section>

      {/* ─── MISSION & BENTO GRID ─── */}
      <section className="pt-2 pb-12 px-6 max-w-6xl w-full">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-[#0E2931]">
            Our{" "}
            <span className="text-[#861211] inline-block">
               <TypewriterText text="Mission" loop cursorColor="#861211" />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#0E2931]/60 max-w-2xl mx-auto font-medium leading-relaxed italic">
            Bridging the gap between raw data and cognitive clarity through agentic precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px] mb-12">
          {/* Card 1: Precision */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="md:col-span-2 bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] flex flex-col justify-between group shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <div className="w-10 h-10 rounded-xl bg-[#861211]/10 flex items-center justify-center text-[#861211]">
              <Target size={20} className="group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 group-hover:text-[#861211] transition-colors">Precision</h3>
              <p className="text-[#0E2931]/60 text-sm font-medium italic max-w-md">Laser-focused explanations designed to cut through academic complexity.</p>
            </div>
          </motion.div>

          {/* Card 2: Innovation */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             whileHover={{ y: -10, rotate: 1 }}
             whileTap={{ scale: 0.95 }}
             className="md:col-span-1 bg-[#2B7574] p-8 rounded-[2.5rem] flex flex-col justify-between text-white group shadow-lg transition-all duration-500"
          >
            <Lightbulb size={24} className="text-white/50 group-hover:text-white group-hover:animate-pulse" />
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-1">Innovation</h3>
              <p className="text-white/70 text-xs font-medium italic">High-fidelity AI modeling.</p>
            </div>
          </motion.div>

          {/* Card 3: Resilience */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.95 }}
            className="md:col-span-1 bg-white p-8 rounded-[2.5rem] border border-[#0E2931]/5 flex flex-col justify-between group transition-all duration-500 shadow-sm"
          >
            <Shield size={24} className="text-[#0E2931]/20 group-hover:text-[#0E2931] group-hover:animate-bounce" />
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-1">Resilience</h3>
              <p className="text-[#0E2931]/50 text-xs font-medium italic">Knowledge that adapts.</p>
            </div>
          </motion.div>

          {/* Card 4: Agentic AI (CLEANED - NO HOVER CHANGES) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileTap={{ scale: 0.95 }}
            className="md:col-span-2 bg-[#0E2931] p-8 rounded-[2.5rem] flex items-center justify-between text-[#E2E2E0] relative overflow-hidden shadow-xl"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">Agentic Intelligence</h3>
              <p className="text-[#E2E2E0]/50 text-sm font-medium max-w-xs italic">The future of autonomous systems.</p>
            </div>
            <Zap size={100} className="absolute right-[-10px] bottom-[-20px] text-white/5 rotate-12" />
          </motion.div>
        </div>
      </section>

      {/* ─── STORY SECTION ─── */}
      <section className="py-20 px-6 w-full bg-[#0E2931]/5 border-y border-[#0E2931]/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0E2931]">The Genesis</h2>
            <div className="space-y-4 text-[#0E2931]/70 leading-relaxed font-medium italic">
              <p>UAARN began as a visionary challenge during the Cloud Applied Agentic AI course at GIAIC. What started as an academic inquiry evolved into a mission to democratize premium education.</p>
              <p>By integrating high-fidelity OpenAI Agents, we created a system that truly understands context, delivering clarity globally.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#0E2931]/10">
              {[{ label: "Impact", val: "Global" }, { label: "Accuracy", val: "99.9%" }, { label: "Standard", val: "Agentic" }].map((stat, i) => (
                <motion.div key={i} whileHover={{ scale: 1.1 }} className="cursor-default">
                  <div className="text-2xl font-black text-[#861211]">{stat.val}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#0E2931]/40">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="relative h-[400px] group"
          >
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-4 border-white z-10"
            >
              <Image 
                src="https://images.unsplash.com/photo-1758685733926-00cba008215b?auto=format&fit=crop&q=80" 
                alt="Education Transformation" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </motion.div>
            <div className="absolute -inset-4 rounded-[3.5rem] -z-0 group-hover:scale-105 transition-transform duration-500" />
          </motion.div>
        </div>
      </section>

      {/* ─── TEAM SECTION ─── */}
      <section className="mt-8 w-full max-w-6xl text-center pb-20 px-6">
        <SlideIn direction="up">
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#0E2931]/10 text-[10px] font-black uppercase tracking-[0.3em] text-[#0E2931]/40 shadow-sm">
            <Globe size={10} className="text-[#2B7574] animate-spin-slow" />
            Brain Trust
          </div>
          <h2 className="text-5xl font-black text-[#0E2931] mb-12 uppercase tracking-tighter leading-none">
            Meet Our <span className="text-[#861211] inline-block italic">
              <TypewriterText text="Core Team" loop cursorColor="#861211" />
            </span>
          </h2>
        </SlideIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map(({ name, role, img, desc, delay }) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay, duration: 0.5 }}
              whileHover={{ 
                y: -15, 
                rotate: name === "Tahirah Roohi" ? -1 : 1,
                scale: 1.03 
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-10 rounded-[2.5rem] bg-white border border-[#0E2931]/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center h-full overflow-hidden"
            >
              <div className="relative mb-8">
                <Image 
                  src={img} 
                  alt={name} 
                  width={130} 
                  height={130} 
                  className="relative rounded-full object-cover border-4 border-[#E2E2E0] shadow-md transition-all duration-500 group-hover:border-[#861211] group-hover:scale-110" 
                />
              </div>

              <h3 className="text-2xl font-black text-[#0E2931] group-hover:text-[#861211] transition-colors uppercase tracking-tighter leading-none mb-2 relative z-10">{name}</h3>
              <p className="text-[#861211] font-bold text-[10px] tracking-[0.2em] uppercase relative z-10">{role}</p>
              <p className="text-[#0E2931]/50 text-sm mt-6 leading-relaxed font-medium italic relative z-10">{desc}</p>

              <motion.div 
                className="absolute bottom-0 left-0 h-[4px] bg-[#861211]" 
                initial={{ width: "0%" }} 
                whileHover={{ width: "100%" }} 
                transition={{ duration: 0.6 }} 
              />
            </motion.div>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}