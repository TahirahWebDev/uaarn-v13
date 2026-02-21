"use client";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Mail, ArrowUpRight, Zap } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef } from "react";

/* ─── DATA ─────────────────────────────────────────────────────── */
const socialLinks = [
  { href: "https://linkedin.com/company/nexa-agent", icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
  { href: "https://x.com/nexa_agent25", icon: Twitter, label: "Twitter/X", color: "#1DA1F2" },
  { href: "mailto:support@uaarn.com", icon: Mail, label: "Email", color: "#861211" },
];

const footerLinks = {
  Explore: [
    { label: "Courses", href: "/courses" },
    { label: "Ask AI", href: "/ask" },
    { label: "About", href: "/about" },
  ],
  Company: [
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
  ],
};

/* ─── MARQUEE (Option A) ─────────────────────────────────────────
   Infinite horizontal ticker of giant UAARN text in both directions.
   Pure CSS animation — zero jank, hardware accelerated.
──────────────────────────────────────────────────────────────────── */
const TICKER_A = "UAARN • AI LEARNING • KNOWLEDGE • RESILIENCE • NEURAL PATH • ";
const TICKER_B = "COURSES • ASK AI • CAREER MENTOR • QUIZ ENGINE • SUMMARIZE • ";

function Marquee({ text, reverse = false }: { text: string; reverse?: boolean }) {
  const repeated = Array(6).fill(text).join("");
  return (
    <div className="overflow-hidden whitespace-nowrap select-none">
      <motion.div
        className="inline-block"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <span className="text-[7vw] md:text-[6vw] font-black uppercase tracking-tighter leading-none text-white/[0.07]">
          {repeated}
        </span>
      </motion.div>
    </div>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────── */
export default function Footer() {
  /* Option B: 3-D perspective scroll reveal */
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "start 0.2"],
  });

  // rotateX from 35 → 0, opacity 0 → 1, y from 80 → 0
  const rawRotate = useTransform(scrollYProgress, [0, 1], [35, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const rawY = useTransform(scrollYProgress, [0, 1], [80, 0]);

  const rotateX = useSpring(rawRotate, { stiffness: 80, damping: 20 });
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });

  const badgeRef = useRef(null);
  const badgeInView = useInView(badgeRef, { once: true });

  return (
    /*
     * The outer wrapper has a large perspective so that the footer card
     * can rotate in 3-D as the user scrolls it into view (Option B).
     */
    <div ref={wrapperRef} style={{ perspective: "1200px" }} className="bg-[#0E2931] overflow-hidden">

      {/* ── Option A — MARQUEE BILLBOARD ─────────────────────────── */}
      <div className="pt-16 pb-0 pointer-events-none space-y-1">
        <Marquee text={TICKER_A} />
        <Marquee text={TICKER_B} reverse />
      </div>

      {/* ── Option B — 3-D TILT REVEAL CARD ─────────────────────── */}
      <motion.div
        style={{ rotateX, opacity, y, transformOrigin: "top center" }}
        className="bg-[#0E2931] border-t border-[#2B7574]/20 pt-16 pb-12 px-6"
      >
        <div className="max-w-7xl mx-auto relative">

          {/* ── BG watermark UAARN ────────────────────────────── */}
          <div ref={badgeRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none flex items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={badgeInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-black uppercase tracking-tighter text-white/[0.04] leading-none whitespace-nowrap w-full text-center"
              style={{ fontSize: "clamp(4rem, 22vw, 22rem)" }}
            >
              UAARN
            </motion.span>
          </div>

          {/* Top grid ─ brand + nav + connect */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            {/* Brand */}
            <div className="md:col-span-2 space-y-6">
              <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="/" className="inline-block">
                  <div className="relative w-40 h-12">
                    <Image src="/logo2.png" alt="UAARN Logo" fill className="object-contain object-left" />
                  </div>
                </Link>
              </motion.div>

              <p className="text-[#E2E2E0]/60 text-sm md:text-base leading-relaxed max-w-md font-medium italic">
                Empowering the next generation of learners with high-fidelity AI intelligence.
                Bridging the gap between complex information and total clarity.
              </p>

              {/* Social icons */}
              <div className="flex gap-4 pt-2">
                {socialLinks.map(({ href, icon: Icon, label, color }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} aria-label={label}>
                      <motion.div
                        className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E2E2E0]/50 hover:text-white transition-colors cursor-pointer"
                        whileHover={{ scale: 1.2, y: -4, backgroundColor: color, borderColor: color, color: "#ffffff" }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <Icon size={18} />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-8 md:col-span-1">
              {Object.entries(footerLinks).map(([section, links], si) => (
                <div key={section} className="space-y-4">
                  <motion.h4
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + si * 0.08 }}
                    className="text-[#2B7574] font-black text-xs uppercase tracking-[0.25em]"
                  >
                    {section}
                  </motion.h4>
                  <ul className="space-y-3 text-[11px] font-bold uppercase tracking-widest">
                    {links.map((link, li) => (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + si * 0.08 + li * 0.05 }}
                      >
                        <Link href={link.href}>
                          <motion.span
                            className="text-[#E2E2E0]/60 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1 group"
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {link.label}
                            <motion.span
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ArrowUpRight size={10} />
                            </motion.span>
                          </motion.span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Connect */}
            <div className="space-y-6">
              <motion.h4
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-[#2B7574] font-black text-xs uppercase tracking-[0.25em]"
              >
                Connect
              </motion.h4>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E2E2E0]/30 leading-loose"
              >
                Based in Karachi, Sindh. <br />
                Global Reach.
              </motion.p>
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#861211] text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#861211]/20 hover:shadow-[#861211]/40 transition-shadow"
                >
                  <Zap size={12} />
                  Get in Touch
                </motion.div>
              </Link>
            </div>
          </div>

          {/* ── Bottom bar ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#E2E2E0]/20 font-black"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1 rounded-full bg-[#2B7574]"
              />
              © {new Date().getFullYear()} UAARN Labs. All Rights Reserved.
            </div>
            <div className="flex gap-6">
              {[
                { label: "Terms of Service", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map(({ label, href }) => (
                <Link key={href} href={href}>
                  <motion.span
                    whileHover={{ color: "rgba(226,226,224,0.6)" }}
                    className="cursor-pointer"
                  >
                    {label}
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}