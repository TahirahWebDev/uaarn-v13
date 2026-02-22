"use client";
import Link from "next/link";
import FeatureCard from "./components/FeatureCard";
import { Sparkles, ShieldCheck, Code, ArrowRight, Zap } from "lucide-react";
import ContactPage from "./contact/page";
import AboutPage from "./about/page";
import DarkCommunitySection from "./components/DarkCommunitySection";
import CareerSection from "./components/CareerSection";
import TestimonialsSection from "./components/Testimonial";
import FadeIn from "./components/animations/FadeIn";
import SlideIn from "./components/animations/SlideIn";
import ScaleIn from "./components/animations/ScaleIn";
import StaggerContainer from "./components/animations/StaggerContainer";
import FloatingElement from "./components/animations/FloatingElement";
import TypewriterText from "./components/animations/TypewriterText";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // ── Typewriter: line1 once on load, line2 loops forever ──────
  const LINE1 = "Master Any Topic with";
  const LINE2 = "Precision Intelligence";
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const TSPEED = 8;   // ms/char typing
    const DSPEED = 8;   // ms/char deleting
    const PAUSE = 1600; // ms pause after full text

    // Line 2 loop (type → pause → delete → repeat)
    let j = 0;
    function typeL2() {
      j++; setLine2(LINE2.slice(0, j));
      if (j < LINE2.length) timer = setTimeout(typeL2, TSPEED);
      else timer = setTimeout(delL2, PAUSE);
    }
    function delL2() {
      j--; setLine2(LINE2.slice(0, j));
      if (j > 0) timer = setTimeout(delL2, DSPEED);
      else timer = setTimeout(typeL2, 300);
    }

    // Line 1 types once, then kicks off line 2 loop
    let i = 0;
    function typeL1() {
      i++; setLine1(LINE1.slice(0, i));
      if (i < LINE1.length) timer = setTimeout(typeL1, TSPEED);
      else timer = setTimeout(typeL2, 250);
    }

    timer = setTimeout(typeL1, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#E2E2E0] text-[#0E2931] selection:bg-[#861211]/20 min-h-screen overflow-x-hidden">

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-10 pb-32 px-8 min-h-[90vh] flex items-center overflow-x-hidden">

        {/* Animated background blobs */}
        <motion.div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-[#2B7574]/15 to-transparent blur-[130px] rounded-full -z-10"
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 right-[-10%] w-[400px] h-[400px] bg-[#861211]/8 blur-[100px] rounded-full -z-10"
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-10 left-[-5%] w-[300px] h-[300px] bg-[#2B7574]/10 blur-[80px] rounded-full -z-10"
          animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Floating decorative particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full -z-10"
            style={{
              width: [8, 12, 6, 10, 7, 9][i],
              height: [8, 12, 6, 10, 7, 9][i],
              background: i % 2 === 0 ? "#2B7574" : "#861211",
              opacity: 0.15,
              left: `${[15, 75, 30, 85, 10, 60][i]}%`,
              top: `${[20, 15, 70, 60, 50, 80][i]}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-8, 8, -8],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-5xl mx-auto flex flex-col items-center text-center w-full">

          {/* Badge with spinning icon */}
          <FadeIn delay={0.2} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0E2931]/10 bg-white shadow-sm text-[#0E2931] text-xs font-bold uppercase tracking-widest mb-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={14} className="text-[#2B7574]" />
            </motion.div>
            <span>AI-Powered Evolution in Learning</span>
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#2B7574]"
            />
          </FadeIn>

          {/* Main headline — letter-by-letter typewriter */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#0E2931] leading-[0.9] text-center">
              {/* Line 1 — cursor when line2 is empty */}
              <span className="block min-h-[1.1em]">
                {line1}
                {line2.length === 0 && line1.length > 0 && (
                  <span className="inline-block w-[3px] h-[0.85em] bg-[#0E2931] align-middle ml-[2px] animate-pulse" />
                )}
              </span>
              {/* Line 2 — gradient; cursor while it has any text */}
              <span className="bg-gradient-to-r from-[#2B7574] via-[#861211] to-[#12484C] bg-clip-text text-transparent italic pr-4 pb-3 inline-block min-h-[1.1em]">
                {line2}
                {line2.length > 0 && (
                  <span className="inline-block w-[3px] h-[0.85em] bg-[#861211] align-middle ml-[2px] animate-pulse" />
                )}
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <FadeIn delay={0.9}>
            <p className="mt-0 text-lg md:text-xl text-[#0E2931]/70 max-w-2xl leading-relaxed font-medium">
              UAARN is your premium AI-powered study companion. Bridge the gap
              between complexity and clarity with high-fidelity explanations.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={1.1} className="mt-12 flex flex-wrap justify-center gap-6">
            <motion.div
              whileHover={{ scale: 1.07, y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link
                href="/ask"
                className="group px-10 py-4 bg-[#861211] hover:bg-[#6a0e0d] text-white font-bold rounded-full transition-colors duration-300 shadow-xl shadow-[#861211]/30 flex items-center"
              >
                <span className="flex items-center gap-2 text-sm uppercase tracking-widest">
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Zap size={16} className="text-yellow-300" />
                  </motion.span>
                  Start Learning
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.07, y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link
                href="/about"
                className="px-10 py-4 border-2 border-[#0E2931] hover:bg-[#0E2931] hover:text-white text-[#0E2931] font-bold rounded-full transition-all duration-300 text-sm uppercase tracking-widest flex items-center gap-2"
              >
                The UAARN Method
              </Link>
            </motion.div>
          </FadeIn>


        </motion.div>
      </section>

      <div className="flex flex-col">
        {/* About Section */}
        <section className="py-24 bg-transparent border-y border-[#0E2931]/5">
          <FadeIn>
            <AboutPage />
          </FadeIn>
        </section>

        {/* Features Section */}
        <section className="py-24 px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center mb-20">
              <SlideIn direction="up" className="max-w-2xl">
                <h3 className="text-4xl md:text-5xl font-black text-[#0E2931] mb-4 uppercase tracking-tighter">
                  Engineered for{" "}
                  <span className="text-[#861211] inline-block">
                    <TypewriterText text="Excellence" loop cursorColor="#861211" />
                  </span>
                </h3>
                <p className="text-[#0E2931]/60 text-lg font-medium italic">
                  Industry-leading features for high-performance learners.
                </p>
              </SlideIn>
              <motion.div
                className="mt-8 h-[2px] bg-[#0E2931]/10"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              />
            </div>

            <StaggerContainer className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <ScaleIn>
                <FeatureCard
                  title="Smart AI"
                  desc="Context-aware algorithms that adapt to your specific learning style and pace."
                  icon={Sparkles}
                />
              </ScaleIn>
              <ScaleIn delay={0.1}>
                <FeatureCard
                  title="Secure Platform"
                  desc="Enterprise-grade security ensuring your intellectual property remains private."
                  icon={ShieldCheck}
                />
              </ScaleIn>
              <ScaleIn delay={0.2}>
                <FeatureCard
                  title="Developer Friendly"
                  desc="Built with modern technologies for easy customization and speed."
                  icon={Code}
                />
              </ScaleIn>
            </StaggerContainer>
          </div>
        </section>

        {/* Sub-sections */}
        <div className="bg-transparent">
          <SlideIn direction="left">
            <CareerSection />
          </SlideIn>
        </div>
        <div className="bg-transparent">
          <FadeIn>
            <TestimonialsSection />
          </FadeIn>
        </div>
        <div className="bg-transparent">
          <SlideIn direction="right">
            <ContactPage />
          </SlideIn>
        </div>
        <div className="bg-transparent">
          <FadeIn>
            <DarkCommunitySection />
          </FadeIn>
        </div>
      </div>
    </div >
  );
}