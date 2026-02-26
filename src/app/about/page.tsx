"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Target, Lightbulb, Shield, Sparkles, Zap, Globe } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence, PanInfo } from "framer-motion";
import SlideIn from "../components/animations/SlideIn";
import TypewriterText from "../components/animations/TypewriterText";

const missionCards = [
  {
    title: "Precision",
    desc: "Laser-focused explanations designed to cut through academic complexity by delivering high-fidelity cognitive clarity tailored to every learner's specific pace.",
    icon: Target,
    color: "bg-white/40 md:bg-white/70",
    textColor: "text-[#0E2931]",
    iconBg: "bg-gradient-to-br from-[#861211] to-[#6a0e0d] md:bg-[#861211]/10",
    iconColor: "text-white md:text-[#861211]",
    shadow: "shadow-[0_20px_40px_rgba(0,0,0,0.05)] md:shadow-sm"
  },
  {
    title: "Innovation",
    desc: "Pioneering high-fidelity AI modeling and full-stack autonomous systems that transform static data into interactive, real-world educational simulations.",
    icon: Lightbulb,
    color: "bg-[#2B7574]",
    textColor: "text-white",
    iconBg: "bg-white/10",
    iconColor: "text-white/80",
    shadow: "shadow-2xl md:shadow-lg"
  },
  {
    title: "Resilience",
    desc: "Developing knowledge systems that adapt to evolving technical landscapes, ensuring your learning remains future-proof against the rapid shifts in AI technology.",
    icon: Shield,
    color: "bg-white md:bg-white",
    textColor: "text-[#0E2931]",
    iconBg: "bg-[#2B7574]/5",
    iconColor: "text-[#2B7574]",
    shadow: "shadow-xl md:shadow-sm"
  },
  {
    title: "Intelligence",
    desc: "Harnessing the power of Cloud Applied Agentic AI to build autonomous educational assistants that predict student needs and streamline complex problem-solving.",
    icon: Zap,
    color: "bg-[#0E2931]",
    textColor: "text-[#E2E2E0]",
    iconBg: "bg-[#861211]/10",
    iconColor: "text-white/80",
    shadow: "shadow-[0_30px_60px_rgba(0,0,0,0.3)] md:shadow-xl"
  }
];

const team = [
  { name: "Maryam Arif", role: "Founder & Managing Lead", img: "/maryam.jpeg", desc: "Leads AI development, system automation, and OpenAI Agents SDK integration.", delay: 0 },
  { name: "Mehak Akram", role: "Co-Founder & Backend Lead", img: "/mehak.jpg", desc: "Manages backend architecture, APIs, databases, and system reliability.", delay: 0.12 },
  { name: "Tahirah Roohi", role: "Co-Founder & Frontend Lead", img: "/tahira.jpg", desc: "Designs modern interfaces and improves user experience for the platform.", delay: 0.24 },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Responsive check for slider logic
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

      <section className="pt-2 pb-12 px-6 max-w-6xl w-full relative">
        {/* Neural Path SVG - Mobile Only */}
        <div className="md:hidden absolute left-8 top-60 bottom-40 w-0.5 bg-gradient-to-b from-[#861211]/10 via-[#2B7574]/20 to-[#0E2931]/10 -z-10">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#861211] absolute top-0 -left-[2.5px] shadow-[0_0_8px_#861211]"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="text-center mb-16 md:mb-10">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-4 text-[#0E2931]">
            Our{" "}
            <span className="text-[#861211] inline-block">
              <TypewriterText text="Mission" loop cursorColor="#861211" />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#0E2931]/60 max-w-2xl mx-auto font-medium leading-relaxed italic px-4">
            Bridging the gap between raw data and cognitive clarity through agentic precision.
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-4 mb-12">
          {/* MOBILE CAROUSEL */}
          <div className="md:hidden relative w-full h-[400px] flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                // FIXED: Smoother physical spring transition for mobile swipe
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 22,
                  mass: 0.8
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(event, info: PanInfo) => {
                  const swipeThreshold = 50;
                  if (info.offset.x < -swipeThreshold) setActiveIndex((prev) => (prev + 1) % missionCards.length);
                  if (info.offset.x > swipeThreshold) setActiveIndex((prev) => (prev - 1 + missionCards.length) % missionCards.length);
                }}
                className={`
                      w-full h-[320px] p-10 rounded-[3.5rem] flex flex-col justify-between 
                      relative border border-white/40 backdrop-blur-2xl mt-4 touch-pan-y
                      ${missionCards[activeIndex].color} ${missionCards[activeIndex].textColor} ${missionCards[activeIndex].shadow}
                   `}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center -mt-16 ml-4 shadow-xl border-4 border-[#E2E2E0] bg-[#861211] z-20">
                  {React.createElement(missionCards[activeIndex].icon, { size: 32, className: "text-white" })}
                </div>

                <div className="pt-8">
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-3">
                    {missionCards[activeIndex].title}
                  </h3>
                  <p className="text-lg font-medium italic leading-snug opacity-80">
                    {missionCards[activeIndex].desc}
                  </p>
                </div>

                {/* Swipe Indicator Decor */}
                <div className="absolute bottom-6 right-8 flex gap-2">
                  {missionCards.map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 bg-[#861211]" : "bg-black/20"}`} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 text-[#0E2931]/40 text-[10px] font-black uppercase tracking-[0.4em]"
            >
              Swipe to see more →
            </motion.div>
          </div>

          {/* DESKTOP GRID */}
          <div className="hidden md:contents">
            {/* Precision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="md:col-span-2 bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] flex flex-col justify-between group shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#861211] to-[#6a0e0d] flex items-center justify-center text-white shadow-lg">
                <Target size={24} className="group-hover:rotate-12 transition-transform" />
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 group-hover:text-[#861211] transition-colors">{missionCards[0].title}</h3>
                <p className="text-[#0E2931]/60 text-sm font-medium italic max-w-md">{missionCards[0].desc}</p>
              </div>
            </motion.div>

            {/* Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10, rotate: 1 }}
              className="md:col-span-1 bg-[#2B7574] p-8 rounded-[2.5rem] flex flex-col justify-between text-white group shadow-lg transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Lightbulb size={22} className="text-white group-hover:animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter mb-1">{missionCards[1].title}</h3>
                <p className="text-white/70 text-xs font-medium italic leading-relaxed">{missionCards[1].desc}</p>
              </div>
            </motion.div>

            {/* Resilience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10 }}
              className="md:col-span-1 bg-white p-8 rounded-[2.5rem] border border-[#0E2931]/5 flex flex-col justify-between group transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              <div className="w-10 h-10 rounded-lg bg-[#2B7574]/5 flex items-center justify-center text-[#2B7574]">
                <Shield size={22} className="group-hover:animate-bounce" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter mb-1">{missionCards[2].title}</h3>
                <p className="text-[#0E2931]/50 text-xs font-medium italic leading-relaxed">{missionCards[2].desc}</p>
              </div>
            </motion.div>

            {/* Intelligence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="md:col-span-2 bg-[#0E2931] p-8 rounded-[2.5rem] flex items-center justify-between text-[#E2E2E0] relative overflow-hidden shadow-xl group"
            >
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-[#861211]/20 flex items-center justify-center text-white mb-4">
                  <Zap size={22} className="group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">{missionCards[3].title}</h3>
                <p className="text-[#E2E2E0]/50 text-sm font-medium max-w-xs italic leading-relaxed">{missionCards[3].desc}</p>
              </div>
              <Zap size={140} className="absolute right-[-20px] bottom-[-30px] text-white/5 rotate-12 pointer-events-none" />
            </motion.div>
          </div>
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
          <h2 className="text-3xl sm:text-4xl font-black text-[#0E2931] mb-12 uppercase tracking-tighter leading-none">
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
              className="group relative p-10 rounded-[2.5rem] bg-gradient-to-b from-white to-[#E2E2E0]/30 md:bg-white border border-[#0E2931]/10 md:border-[#0E2931]/5 shadow-xl md:shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center h-full overflow-hidden"
            >
              <div className="md:hidden absolute top-0 right-0 w-24 h-24 bg-[#861211]/5 blur-3xl rounded-full" />
              <div className="relative mb-8">
                <Image
                  src={img}
                  alt={name}
                  width={130}
                  height={130}
                  className="relative rounded-full object-cover border-4 border-[#E2E2E0] shadow-[0_0_20px_rgba(134,18,17,0.15)] md:shadow-md transition-all duration-500 group-hover:border-[#861211] group-hover:scale-110"
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