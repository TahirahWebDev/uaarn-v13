"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Instagram, Facebook, ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

/* ─── X (formerly Twitter) icon ────────────────────────────────── */
function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
    </svg>
  );
}

/* ─── DATA ─────────────────────────────────────────────────────── */
const socialLinks = [
  { href: "https://www.linkedin.com/company/nexa-agent/", CustomIcon: null, icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
  { href: "https://x.com/nexa_agent25", CustomIcon: XIcon, icon: null, label: "X", color: "#000000" },
  { href: "https://www.instagram.com/nexeagent?igsh=Z2J0M3o3M3NtNmdr", CustomIcon: null, icon: Instagram, label: "Instagram", color: "#E1306C" },
  { href: "https://www.facebook.com/share/1DrNcNCVJL/", CustomIcon: null, icon: Facebook, label: "Facebook", color: "#1877F2" },
  { href: "mailto:nexeagent@gmail.com", CustomIcon: null, icon: Mail, label: "Email", color: "#861211" },
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

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const giantTextOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const giantTextScale = useTransform(scrollYProgress, [0.8, 1], [0.98, 1]);

  return (
    <footer
      ref={containerRef}
      className="bg-[#0E2931] text-white pt-20 pb-8 px-6 md:px-12 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          <div className="relative w-48 h-12">
            <Image
              src="/logo2.png"
              alt="UAARN Logo"
              fill
              className="object-contain object-left"
            />
          </div>
        </div>

        {/* Navigation Grid - 3 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4">
              <h4 className="text-[#2B7574] font-black text-xs uppercase tracking-[0.25em] mb-2">{title}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#E2E2E0]/60 hover:text-white transition-all text-[11px] font-bold uppercase tracking-widest inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <motion.span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight size={10} />
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Connect - Positioned on the Right */}
          <div className="flex flex-col gap-6 lg:items-end">
            <h4 className="text-[#2B7574] font-black text-xs uppercase tracking-[0.25em]">Connect</h4>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {socialLinks.map(({ href, icon, CustomIcon, label, color }) => {
                const Icon = icon as React.ElementType | null;
                return (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-white/50 border border-white/10 transition-all"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: color,
                      borderColor: color,
                      color: "#fff"
                    }}
                  >
                    {CustomIcon ? <CustomIcon size={18} /> : Icon ? <Icon size={18} /> : null}
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Giant Branding Area - Tight Spacing & White Text */}
        <motion.div
          style={{ opacity: giantTextOpacity, scale: giantTextScale }}
          className="relative py-4 select-none pointer-events-none"
        >
          <h1 className="text-[22vw] font-black leading-[0.7] tracking-tighter text-white text-center">
            UAARN
          </h1>
        </motion.div>

        {/* Legal Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#E2E2E0]/20 font-black flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#2B7574]" />
            © {new Date().getFullYear()} UAARN Labs. All Rights Reserved.
          </div>

          <div className="flex gap-8 text-[10px] font-black text-[#E2E2E0]/20 uppercase tracking-[0.3em]">
            <Link href="/terms" className="hover:text-white/60 transition-all">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white/60 transition-all">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}