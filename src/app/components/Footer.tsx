"use client";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { href: "https://linkedin.com/company/nexa-agent", icon: Linkedin, hoverColor: "#0A66C2" },
  { href: "https://x.com/nexa_agent25", icon: Twitter, hoverColor: "#1DA1F2" },
  { href: "mailto:support@uaarn.com", icon: Mail, hoverColor: "#861211" },
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
  return (
    <footer className="bg-[#0E2931] border-t border-[#2B7574]/20 pt-16 pb-12 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="/" className="inline-block">
                <div className="relative w-40 h-12">
                  <Image src="/logo2.png" alt="UAARN Logo" fill className="object-contain object-left" />
                </div>
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[#E2E2E0]/70 text-sm md:text-base leading-relaxed max-w-md font-medium italic"
            >
              Empowering the next generation of learners with high-fidelity AI intelligence.
              Bridging the gap between complex information and total clarity.
            </motion.p>

            {/* Social Icons */}
            <div className="flex gap-5 pt-2">
              {socialLinks.map(({ href, icon: Icon, hoverColor }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link href={href} target={href.startsWith("http") ? "_blank" : undefined}>
                    <motion.div
                      whileHover={{ scale: 1.25, y: -4, color: hoverColor }}
                      whileTap={{ scale: 0.9 }}
                      className="text-[#E2E2E0]/50 hover:text-white transition-colors"
                    >
                      <Icon size={22} />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 md:col-span-1">
            {Object.entries(footerLinks).map(([section, links], si) => (
              <div key={section} className="space-y-4">
                <motion.h4
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + si * 0.1 }}
                  className="text-[#2B7574] font-black text-xs uppercase tracking-[0.2em]"
                >
                  {section}
                </motion.h4>
                <ul className="space-y-3 text-[11px] md:text-xs font-bold uppercase tracking-widest">
                  {links.map((link, li) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + si * 0.1 + li * 0.05 }}
                    >
                      <Link href={link.href}>
                        <motion.span
                          className="text-[#E2E2E0]/80 hover:text-white transition-colors cursor-pointer inline-block"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Connect Column */}
          <div className="space-y-6">
            <motion.h4
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-[#2B7574] font-black text-xs uppercase tracking-[0.2em]"
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
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#E2E2E0]/20 font-black"
        >
          <div>© {new Date().getFullYear()} UAARN Labs. All Rights Reserved.</div>
          <div className="flex gap-6">
            <Link href="/terms">
              <motion.span whileHover={{ color: "rgba(226,226,224,0.6)" }} className="cursor-pointer">
                Terms of Service
              </motion.span>
            </Link>
            <span className="opacity-10">|</span>
            <Link href="/privacy">
              <motion.span whileHover={{ color: "rgba(226,226,224,0.6)" }} className="cursor-pointer">
                Privacy Policy
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}