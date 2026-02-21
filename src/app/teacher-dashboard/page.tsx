"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { BookOpen, FileUp, Brain, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "../components/animations/FadeIn";
import SlideIn from "../components/animations/SlideIn";

export default function TeacherDashboard() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#E2E2E0]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#0E2931]/10 border-t-[#861211] rounded-full mb-4"
        />
        <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }} className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0E2931]/40">
          Loading Command Center...
        </motion.p>
      </section>
    );
  }

  if (!user) redirect(`/sign-in?redirect_url=/teacher-dashboard`);

  const cards = [
    { href: "/teacher-dashboard/add-course", icon: BookOpen, title: "Architect Course", description: "Construct a new module and share intelligence with students.", delay: 0.15 },
    { href: "/teacher-dashboard/upload-notes", icon: FileUp, title: "Sync Notes", description: "Upload high-fidelity PDF or text assets to the neural path.", delay: 0.25 },
    { href: "/quiz", icon: Brain, title: "Generate Quiz", description: "Initialize AI assessments based on modular materials.", delay: 0.35 },
  ];

  return (
    <main className="min-h-screen bg-[#E2E2E0] flex items-center justify-center p-6 selection:bg-[#861211]/20 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-7xl"
      >
        <div className="bg-white rounded-[2.5rem] w-full overflow-hidden flex flex-col md:flex-row min-h-[750px] shadow-2xl">

          {/* Sidebar */}
          <div className="w-full md:w-[40%] relative bg-[#0E2931] text-[#E2E2E0] p-12 md:p-16 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[#12484C]" />
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 z-0 bg-[#2B7574]"
              style={{ clipPath: "ellipse(90% 60% at 10% 40%)", opacity: 0.6 }}
            />
            <div className="absolute inset-0 z-0 bg-[#E2E2E0]" style={{ clipPath: "polygon(100% 30%, 60% 50%, 80% 80%, 100% 90%)", opacity: 0.1 }} />
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-0 right-0 w-[90%] h-[60%] z-0 bg-[#861211]"
              style={{ clipPath: "polygon(100% 20%, 30% 70%, 50% 100%, 100% 100%)", opacity: 0.85 }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#0E2931]/80 via-transparent to-transparent" />

            <div className="relative z-10">
              <SlideIn direction="left">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.3em] mb-12"
                >
                  <motion.div animate={{ rotate: [0, 15, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                    <ShieldCheck size={10} className="text-[#861211]" />
                  </motion.div>
                  AUTHORIZED ARCHITECT HUB
                </motion.div>

                <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                  Welcome, <br />
                  <motion.span
                    className="text-white drop-shadow-[2px_2px_2px_rgba(134,18,17,0.8)] inline-block"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {user.firstName}
                  </motion.span>
                </h1>

                <p className="text-[#E2E2E0]/80 text-lg font-medium italic leading-relaxed max-w-xs mb-12">
                  Access neural path management and deploy curriculum assets to the network.
                </p>

                <motion.div
                  className="relative w-24 h-24 group"
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-white rounded-3xl blur-md opacity-10 group-hover:opacity-30 transition-opacity" />
                  <Image
                    src={user.imageUrl || "/default-avatar.png"}
                    alt="Teacher avatar"
                    width={96}
                    height={96}
                    className="relative w-24 h-24 rounded-3xl border-2 border-white/20 object-cover shadow-2xl"
                    unoptimized
                  />
                </motion.div>
              </SlideIn>
            </div>

            <div className="relative z-10 space-y-2 opacity-40 pt-12">
              <motion.div animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="text-[10px] font-black uppercase tracking-[0.5em]">Status: Fully Operational</motion.div>
              <div className="text-[10px] font-black uppercase tracking-[0.5em]">Network: Karachi Central Node</div>
            </div>
          </div>

          {/* Action Zone */}
          <div className="w-full md:w-[60%] bg-[#E2E2E0] p-10 md:p-14 flex flex-col justify-center">
            <FadeIn>
              <div className="flex items-center gap-4 mb-12">
                <h3 className="text-xs font-black text-[#0E2931] uppercase tracking-[0.3em] whitespace-nowrap">Intelligence Operations</h3>
                <motion.div
                  className="h-px bg-[#0E2931]/10 flex-1"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </div>
            </FadeIn>

            <div className="flex flex-col gap-6">
              {cards.map(({ href, icon: Icon, title, description, delay }) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay, duration: 0.4 }}
                >
                  <Link href={href}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="group bg-white rounded-[2rem] p-8 flex items-center justify-between border-2 border-transparent hover:border-[#861211]/20 hover:shadow-2xl hover:shadow-[#861211]/10 transition-all duration-300 shadow-lg shadow-[#0E2931]/5"
                    >
                      <div className="flex items-center gap-8">
                        <motion.div
                          className="w-16 h-16 bg-[#0E2931] rounded-2xl flex items-center justify-center text-white shadow-xl"
                          whileHover={{ backgroundColor: "#861211", rotate: -6 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon size={24} />
                        </motion.div>
                        <div>
                          <h2 className="text-xl font-black text-[#0E2931] uppercase tracking-tighter mb-1 group-hover:text-[#861211] transition-colors">{title}</h2>
                          <p className="text-[#0E2931]/50 text-[11px] font-bold uppercase tracking-widest leading-relaxed">{description}</p>
                        </div>
                      </div>
                      <motion.div
                        className="w-12 h-12 flex-shrink-0 rounded-full border border-[#0E2931]/10 flex items-center justify-center text-[#0E2931]/20"
                        whileHover={{ scale: 1.15, color: "#861211", borderColor: "rgba(134,18,17,0.3)" }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <motion.p
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0E2931]/30"
              >
                UAARN Labs • Adaptive Intelligence Path v9
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}