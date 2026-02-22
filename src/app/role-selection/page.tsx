"use client";
import { useUser, useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { GraduationCap, Presentation, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import SlideIn from "../components/animations/SlideIn";
import ScaleIn from "../components/animations/ScaleIn";
import FloatingElement from "../components/animations/FloatingElement";
import TypewriterText from "../components/animations/TypewriterText";

export default function SelectRolePage() {
  const { isLoaded: isUserLoaded, user } = useUser();
  const { session, isLoaded: isSessionLoaded } = useSession();
  const router = useRouter();

  const isClerkReady = isUserLoaded && isSessionLoaded && user && session;

  const handleRoleSelect = async (role: string) => {
    if (!isClerkReady) return;
    try {
      await user.update({ unsafeMetadata: { role } });
      await session.reload();
      if (role === "Teacher") router.push("/teacher-dashboard");
      else if (role === "Student") router.push("/student-dashboard");
    } catch (error) {
      console.error("Error during role selection:", error);
      alert("Failed to set role. Please try again.");
    }
  };

  if (!isUserLoaded || !isSessionLoaded) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#E2E2E0]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#0E2931]/10 border-t-[#861211] rounded-full mb-4"
        />
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0E2931]/40"
        >
          Synchronizing Identity...
        </motion.p>
      </section>
    );
  }

  return (
    <section className="min-h-screen mb-0 pt-10 flex flex-col items-center justify-center bg-[#E2E2E0] px-6 pb-10 text-center relative overflow-hidden selection:bg-[#861211]/20">

      {/* Animated background */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#2B7574]/10 to-transparent blur-[120px] rounded-full -z-10"
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {[...Array(4)].map((_, i) => (
        <FloatingElement key={i} delay={i * 0.6} amplitude={12} duration={3 + i}>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: [8, 6, 10, 7][i],
              height: [8, 6, 10, 7][i],
              background: i % 2 === 0 ? "#2B7574" : "#861211",
              opacity: 0.15,
              left: `${[10, 85, 20, 75][i]}%`,
              top: `${[25, 35, 65, 70][i]}%`,
            }}
          />
        </FloatingElement>
      ))}

      {/* Heading */}
      <SlideIn direction="down" className="max-w-2xl mb-16 space-y-4">
        <motion.div
          whileHover={{ scale: 1.04 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0E2931]/10 text-[#0E2931]/60 text-[10px] font-black uppercase tracking-[0.3em]"
        >
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#2B7574]"
          />
          Identity Configuration • UAARN v9
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black text-[#0E2931] tracking-tighter uppercase leading-[0.9]">
          Define Your{" "}
          <span className="text-[#861211] italic inline-block pr-2">
            <TypewriterText text="Role" loop cursorColor="#861211" />
          </span>
        </h1>
        <p className="text-[#0E2931]/60 text-lg font-medium italic">
          Select your operational path to initialize your personalized <br className="hidden md:block" />
          high-fidelity learning dashboard.
        </p>
      </SlideIn>

      {/* Role Cards */}
      <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10 w-full max-w-5xl">
        {[
          {
            role: "Teacher",
            icon: Presentation,
            title: "Teacher Path",
            desc: "Architect intelligence paths, manage student resilience, and curate high-fidelity content for your network.",
            access: "Access Level: Admin",
            accentColor: "#861211",
            delay: 0.1,
          },
          {
            role: "Student",
            icon: GraduationCap,
            title: "Student Path",
            desc: "Access precision modules, track neural progress, and master complex topics with AI-powered study companions.",
            access: "Access Level: Learner",
            accentColor: "#2B7574",
            delay: 0.2,
          },
        ].map(({ role, icon: Icon, title, desc, access, accentColor, delay }) => (
          <ScaleIn key={role} delay={delay} className="flex-1">
            <motion.button
              onClick={() => handleRoleSelect(role)}
              disabled={!isClerkReady}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="w-full h-full group relative bg-white border border-[#0E2931]/10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-shadow duration-500 disabled:opacity-50 text-left overflow-hidden min-h-[380px] p-10 flex flex-col"
            >
              {/* BG matrix pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0E2931_1px,transparent_1px)] [background-size:20px_20px]" />
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"
                style={{ background: `radial-gradient(circle at 30% 30%, ${accentColor}08 0%, transparent 70%)` }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <motion.div
                  className="mb-8 w-12 h-12 bg-[#0E2931] rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{ ["--hover-bg" as string]: accentColor }}
                  whileHover={{ rotate: [0, -10, 10, 0], backgroundColor: accentColor }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon size={24} />
                </motion.div>

                <h3 className="text-2xl font-black text-[#0E2931] uppercase tracking-tighter mb-4 group-hover:transition-colors duration-300" style={{ color: undefined }}>
                  <motion.span style={{ color: "#0E2931" }} whileHover={{ color: accentColor }}>
                    {title}
                  </motion.span>
                </h3>

                <p className="text-[#0E2931]/60 text-sm font-medium leading-relaxed mb-10 border-l-2 border-[#0E2931]/5 pl-4 group-hover:border-opacity-20 transition-all">
                  {desc}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0E2931]/40">{access}</span>
                  <motion.div
                    className="w-10 h-10 rounded-full border border-[#0E2931]/10 flex items-center justify-center text-[#0E2931]/20"
                    whileHover={{ scale: 1.15, backgroundColor: accentColor, color: "#FFFFFF", borderColor: accentColor }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                </div>
              </div>

              {/* Bottom bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 rounded-b-[2rem]"
                style={{ backgroundColor: accentColor }}
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </motion.button>
          </ScaleIn>
        ))}
      </div>

      {/* Floating Zap hint */}
      <FloatingElement delay={1} amplitude={8} duration={2.5}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0E2931]/30"
        >
          <Zap size={12} className="text-[#861211]/50" />
          Select your path to initialize
        </motion.div>
      </FloatingElement>
    </section>
  );
}