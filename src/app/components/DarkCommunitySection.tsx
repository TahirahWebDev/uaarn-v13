import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SlideIn from './animations/SlideIn';
import ScaleIn from './animations/ScaleIn';
import StaggerContainer from './animations/StaggerContainer';
import CountUp from './animations/CountUp';
import { motion } from 'framer-motion';
import { Github, Linkedin, Users } from 'lucide-react';
import TypewriterText from './animations/TypewriterText';

const DarkCommunitySection: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#E2E2E0] py-18 px-4 sm:px-6 lg:px-8 selection:bg-[#861211]/20">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <SlideIn direction="up" className="mb-20 text-center relative">
          <motion.div
            whileHover={{ scale: 1.06 }}
            className="inline-block px-4 py-1 mb-6 border border-[#0E2931]/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-[#0E2931]/60 cursor-default"
          >
            <motion.span
              className="inline-block"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ●
            </motion.span>{" "}
            Collective Intelligence
          </motion.div>
          <h1 className="text-3xl sm:text-3xl font-black text-[#0E2931] mb-6 uppercase tracking-tighter leading-none">
            Join the{" "}
            <span className="text-[#861211] italic inline-block">
              <TypewriterText text="Community" loop cursorColor="#861211" />
            </span>
          </h1>
          <motion.div
            className="w-24 h-1 bg-[#861211] mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#0E2931]/70 font-medium leading-relaxed">
            <Link href="/">
              <motion.span
                className="font-black hover:text-[#861211] transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                UAARN{" "}
              </motion.span>
            </Link>
            is the definitive ecosystem for resilient AI development and strategic collaboration.
          </p>
        </SlideIn>

        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1: Developers */}
          <ScaleIn delay={0}>
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative group overflow-hidden bg-[#0E2931] rounded-[2.5rem] p-10 text-[#E2E2E0] shadow-2xl h-full"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2B7574]/20 blur-3xl rounded-full" />
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#861211]/10 blur-3xl rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <motion.div
                  className="mb-4 w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Github className="w-5 h-5 text-[#E2E2E0]" />
                </motion.div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E2E2E0]/50 mb-4">
                  Global Standing
                </p>
                <p className="font-bold text-lg leading-tight mb-6">
                  Among 1% of <br />Top Developers
                </p>
                <p className="text-5xl font-black text-[#861211] mb-2 tracking-tighter">
                  <CountUp end={500} suffix="+" duration={2} delay={0.3} />
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-8">Stars on GitHub</p>

                <div className="flex -space-x-3 mt-auto">
                  {['maryam.jpeg', 'tahira.jpg', 'mehak.jpg'].map((img, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -6, zIndex: 20, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="relative w-12 h-12 rounded-full border-4 border-[#0E2931] overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={`/${img}`}
                        alt="Contributor"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </ScaleIn>

          {/* Card 2: Users */}
          <ScaleIn delay={0.1}>
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative group overflow-hidden bg-[#861211] rounded-[2.5rem] p-10 text-white shadow-2xl h-full"
            >
              <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <motion.div
                  className="mb-4 w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Users className="w-5 h-5 text-white" />
                </motion.div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-4">
                  Network Growth
                </p>
                <p className="font-bold text-lg leading-tight mb-6">
                  Active Protocol <br />Participants
                </p>
                <p className="text-5xl font-black text-[#E2E2E0] mb-2 tracking-tighter">
                  <CountUp end={50} suffix="+" duration={2} delay={0.4} />
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-8">Registered Users</p>

                <Link href="/contact" className="w-full mt-auto">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#E2E2E0] text-[#861211] py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-colors text-center"
                  >
                    Register Yourself
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </ScaleIn>

          {/* Card 3: LinkedIn */}
          <ScaleIn delay={0.2}>
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative group overflow-hidden bg-[#12484C] rounded-[2.5rem] p-10 text-[#E2E2E0] shadow-2xl h-full"
            >
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#2B7574]/20" style={{ clipPath: 'ellipse(100% 50% at 50% 100%)' }} />

              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <motion.div
                  className="mb-4 w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center"
                  whileHover={{ y: -3 }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Linkedin className="w-5 h-5 text-[#E2E2E0]" />
                </motion.div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E2E2E0]/50 mb-4">
                  Social Presence
                </p>
                <p className="font-bold text-lg leading-tight mb-6">
                  Professional <br />Network Reach
                </p>
                <p className="text-5xl font-black text-[#E2E2E0] mb-2 tracking-tighter">
                  <CountUp end={1} suffix="K+" duration={1.5} delay={0.5} />
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-8">LinkedIn Followers</p>

                <a
                  href="https://www.linkedin.com/company/nexa-agent/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-auto"
                >
                  <motion.div
                    whileHover={{ scale: 1.04, borderColor: "rgba(226,226,224,1)" }}
                    whileTap={{ scale: 0.97 }}
                    className="border-2 border-[#E2E2E0]/20 hover:border-[#E2E2E0] py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all text-center"
                  >
                    LinkedIn
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </ScaleIn>

        </StaggerContainer>
      </div>
    </div>
  );
};

export default DarkCommunitySection;