"use client";
import Link from "next/link";
import Image from "next/image";
import { Target, Lightbulb, Shield, Sparkles, Zap, Globe } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SlideIn from "../components/animations/SlideIn";
import ScaleIn from "../components/animations/ScaleIn";
import FloatingElement from "../components/animations/FloatingElement";

const pillars = [
  { icon: Target, title: "Precision", desc: "Laser-focused explanations that cut through academic complexity.", color: "#861211" },
  { icon: Lightbulb, title: "Innovation", desc: "Leveraging high-fidelity AI models to personalize neural paths.", color: "#2B7574" },
  { icon: Shield, title: "Resilience", desc: "Building a robust network of knowledge that adapts to every learner.", color: "#0E2931" },
];

const team = [
  { name: "Maryam Arif", role: "Founder & Managing Lead", img: "/maryam.jpeg", desc: "Leads AI development, system automation, and OpenAI Agents SDK integration.", delay: 0 },
  { name: "Mehak Akram", role: "Co-Founder & Backend Lead", img: "/mehak.jpg", desc: "Manages backend architecture, APIs, databases, and system reliability.", delay: 0.12 },
  { name: "Tahirah Roohi", role: "Co-Founder & Frontend Lead", img: "/tahira.jpg", desc: "Designs modern interfaces and improves user experience for the platform.", delay: 0.24 },
];

function AnimatedHeading({ text, highlight }: { text: string; highlight: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const fullText = `${text} ${highlight}`;
  return (
    <motion.h2
      ref={ref}
      className="text-5xl md:text-6xl font-black text-[#0E2931] tracking-tighter uppercase leading-[0.85]"
    >
      {text}{" "}
      <motion.span className="text-[#861211] italic inline-block pr-2">
        {highlight.split("").map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.04, duration: 0.3 }}
            className="inline-block"
          >
            {ch}
          </motion.span>
        ))}
      </motion.span>
    </motion.h2>
  );
}

export default function AboutPage() {
  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true });

  return (
    <div className="bg-[#E2E2E0] text-[#0E2931] px-6 py-10 flex flex-col items-center w-full relative overflow-hidden selection:bg-[#861211]/20 font-sans">

      {/* Animated background blobs */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2B7574]/6 blur-[120px] rounded-full -z-10"
        animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#861211]/6 blur-[120px] rounded-full -z-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <FloatingElement key={i} delay={i * 0.8} amplitude={14} duration={3 + i * 0.5}>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: [6, 8, 5, 10, 7][i],
              height: [6, 8, 5, 10, 7][i],
              background: i % 2 === 0 ? "#2B7574" : "#861211",
              opacity: 0.12,
              left: `${[5, 90, 15, 80, 50][i]}%`,
              top: `${[15, 25, 55, 70, 40][i]}%`,
            }}
          />
        </FloatingElement>
      ))}

      {/* ─── HERO HEADING ─── */}
      <div className="max-w-4xl text-center space-y-10 pt-20 pb-24 w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#0E2931]/10 text-[#0E2931]/50 text-[10px] font-black uppercase tracking-[0.35em] shadow-sm"
        >
          <motion.div animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <Sparkles size={12} className="text-[#861211]" />
          </motion.div>
          Our Story • UAARN Labs
        </motion.div>

        {/* Main heading with letter animation */}
        <SlideIn direction="up" delay={0.1}>
          <h2 className="text-6xl md:text-7xl font-black text-[#0E2931] tracking-tighter uppercase leading-[0.85]">
            About{" "}
            <Link href="/">
              <motion.span
                className="bg-gradient-to-r from-[#2B7574] via-[#861211] to-[#12484C] bg-clip-text text-transparent italic pr-3 inline-block"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                UAARN
              </motion.span>
            </Link>
          </h2>
        </SlideIn>

        {/* Subtitle */}
        <SlideIn direction="up" delay={0.2}>
          <div className="space-y-8 max-w-3xl mx-auto">
            <p className="text-[#0E2931]/80 leading-relaxed text-2xl md:text-3xl font-light italic">
              UAARN is a high-fidelity educational ecosystem designed to make learning{" "}
              <motion.span
                className="text-[#861211] font-black not-italic px-2 inline-block"
                whileHover={{ scale: 1.05 }}
                animate={{ color: ["#861211", "#6a0e0d", "#861211"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                faster, smarter, and more intuitive
              </motion.span>
              .
            </p>
            <motion.div
              className="h-[2px] w-24 bg-[#861211]/30 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
        </SlideIn>
      </div>

      {/* ─── BRAND PILLARS ─── */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-40 relative z-10">
        {pillars.map(({ icon: Icon, title, desc, color }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            style={{ ["--accent" as string]: color }}
            className="group bg-white/60 border border-[#0E2931]/5 p-10 rounded-[2rem] hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl h-full relative overflow-hidden cursor-default"
          >
            {/* Gradient sweep on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"
              style={{ background: `radial-gradient(circle at 20% 20%, ${color}08 0%, transparent 60%)` }}
            />
            <motion.div
              className="text-[#861211] mb-6 relative z-10 w-12 h-12 flex items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${color}12` }}
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <Icon size={24} style={{ color }} />
            </motion.div>
            <h4 className="text-lg font-black text-[#0E2931] uppercase tracking-tighter mb-3 relative z-10">
              <motion.span
                className="inline-block"
                whileHover={{ color }}
                transition={{ duration: 0.2 }}
              >{title}</motion.span>
            </h4>
            <p className="text-[#0E2931]/50 text-sm leading-relaxed italic relative z-10">{desc}</p>

            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-0 h-[3px] rounded-b-[2rem]"
              style={{ backgroundColor: color }}
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </motion.div>
        ))}
      </div>

      {/* ─── MISSION STATEMENT ─── */}
      <SlideIn direction="up" className="w-full max-w-4xl">
        <motion.div
          ref={missionRef}
          className="bg-[#0E2931] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden mb-40 shadow-2xl"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-white/5 rounded-tr-[3rem]" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-white/5 rounded-bl-[3rem]" />

          {/* Animated bg glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#2B7574]/10 to-[#861211]/5 rounded-[3rem]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="relative z-10"
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#2B7574]" />
              </motion.div>
              <p className="text-[#E2E2E0]/40 text-[10px] font-black uppercase tracking-[0.5em]">The Mission</p>
            </div>

            <h3 className="relative z-10 text-[#E2E2E0] text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight italic">
              {`"To democratize education through technology — helping every learner access knowledge and clarity instantly."`
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={missionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.04, duration: 0.3 }}
                  >
                    {word}
                  </motion.span>
                ))}
            </h3>
          </motion.div>
        </motion.div>
      </SlideIn>

      {/* ─── TEAM SECTION ─── */}
      <div className="mt-20 w-full max-w-6xl text-center pb-20">
        <SlideIn direction="up">
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#0E2931]/10 text-[10px] font-black uppercase tracking-[0.3em] text-[#0E2931]/40">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
              <Globe size={10} className="text-[#2B7574]" />
            </motion.div>
            Brain Trust
          </div>
          <h2 className="text-5xl font-black text-[#0E2931] mb-20 uppercase tracking-tighter">
            Meet Our{" "}
            <motion.span
              className="text-[#861211] inline-block"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Core Team
            </motion.span>
          </h2>
        </SlideIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map(({ name, role, img, desc, delay }) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative p-10 rounded-[2.5rem] bg-white border border-[#0E2931]/5 shadow-sm hover:shadow-2xl hover:shadow-[#2B7574]/10 transition-shadow duration-500 flex flex-col items-center h-full"
            >
              {/* Photo */}
              <div className="relative mb-8">
                <motion.div
                  className="absolute inset-0 bg-[#861211] blur-2xl opacity-0 group-hover:opacity-15 transition-opacity rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Image
                    src={img}
                    alt={name}
                    width={130}
                    height={130}
                    className="relative rounded-full object-cover border-4 border-[#E2E2E0] grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </motion.div>
                {/* Ring animation on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#861211]/0 group-hover:border-[#861211]/30"
                  style={{ margin: -6 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Name with letter animation */}
              <h3 className="text-2xl font-black text-[#0E2931] group-hover:text-[#861211] transition-colors duration-300">
                {name}
              </h3>
              <motion.p
                className="text-[#861211] font-bold text-xs tracking-widest uppercase mt-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, delay }}
              >
                {role}
              </motion.p>
              <p className="text-[#0E2931]/50 text-sm mt-6 leading-relaxed font-medium">{desc}</p>

              {/* Zap icon reveal on hover */}
              <motion.div
                className="absolute top-8 right-8 text-[#2B7574]/0 group-hover:text-[#2B7574]/30 transition-all duration-300"
                whileHover={{ rotate: 15 }}
              >
                <Zap size={16} />
              </motion.div>

              {/* Bottom line */}
              <motion.div
                className="absolute bottom-0 left-0 h-[3px] bg-[#861211] rounded-b-[2.5rem]"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}