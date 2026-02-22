"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, ChevronRight, Lock, Eye, Database, Bell, UserCheck, RefreshCw } from "lucide-react";
import TypewriterText from "../components/animations/TypewriterText";
import SlideIn from "../components/animations/SlideIn";
import FadeIn from "../components/animations/FadeIn";

const sections = [
    {
        icon: Eye,
        title: "Information We Collect",
        content: [
            "Account information such as your name, email address, and profile details when you register.",
            "Usage data including pages visited, features used, quiz results, and AI interaction logs to improve your learning experience.",
            "Device and technical data such as browser type, IP address, operating system, and session duration.",
            "Content you voluntarily submit, including questions asked to our AI, uploaded notes, and course feedback.",
        ],
    },
    {
        icon: Database,
        title: "How We Use Your Information",
        content: [
            "To provide, operate, and personalize the UAARN educational platform and its AI-powered features.",
            "To improve our AI models, quiz engine, and summarization tools based on aggregated, anonymized usage patterns.",
            "To communicate with you about account activity, platform updates, new features, and support requests.",
            "To ensure platform security, detect fraud, and maintain the integrity of your learning data.",
        ],
    },
    {
        icon: Lock,
        title: "Data Security",
        content: [
            "All data is encrypted in transit using industry-standard TLS/HTTPS protocols.",
            "Passwords are hashed using bcrypt — we never store plain-text credentials.",
            "Access to user data is strictly limited to authorized personnel on a need-to-know basis.",
            "We conduct regular security audits and promptly address any identified vulnerabilities.",
        ],
    },
    {
        icon: UserCheck,
        title: "Your Rights",
        content: [
            "You may access, update, or delete your personal account information at any time from your dashboard.",
            "You can request a full export of your personal data by contacting our support team.",
            "You may opt out of non-essential communications by updating your notification preferences.",
            "Users in applicable jurisdictions (GDPR, CCPA) may request data erasure or restriction of processing.",
        ],
    },
    {
        icon: Bell,
        title: "Cookies & Tracking",
        content: [
            "We use essential cookies to maintain your session and authentication state.",
            "Analytics cookies (anonymized) help us understand platform usage and improve the user experience.",
            "We do not sell your data to third-party advertisers or use invasive tracking technologies.",
            "You can manage cookie preferences through your browser settings at any time.",
        ],
    },
    {
        icon: RefreshCw,
        title: "Changes to This Policy",
        content: [
            "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements.",
            "Significant changes will be communicated via email or a prominent notice on the platform.",
            "Continued use of UAARN after any changes constitutes your acceptance of the updated policy.",
            "We encourage you to review this page regularly to stay informed about how we protect your data.",
        ],
    },
];

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#E2E2E0] text-[#0E2931] selection:bg-[#861211]/20 font-sans">

            {/* ── Hero ───────────────────────────────────────────────────── */}
            <section className="relative bg-[#0E2931] text-[#E2E2E0] overflow-hidden">

                {/* background blobs */}
                <motion.div
                    className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2B7574]/20 blur-[120px] rounded-full -z-0"
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#861211]/15 blur-[100px] rounded-full -z-0"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
                    {/* badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.35em] text-[#E2E2E0]/70 mb-10"
                    >
                        <motion.div animate={{ rotate: [0, 15, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                            <Shield size={11} className="text-[#2B7574]" />
                        </motion.div>
                        Legal • UAARN Labs
                    </motion.div>

                    <SlideIn direction="up" delay={0.1}>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                            Privacy{" "}
                            <span className="bg-gradient-to-r from-[#2B7574] via-[#861211] to-[#12484C] bg-clip-text text-transparent italic pr-2 inline-block">
                                <TypewriterText text="Policy" loop cursorColor="#861211" />
                            </span>
                        </h1>
                    </SlideIn>

                    <SlideIn direction="up" delay={0.2}>
                        <p className="text-[#E2E2E0]/60 text-lg md:text-xl font-medium italic max-w-2xl mx-auto mt-6">
                            Your data belongs to you. Here&apos;s exactly how UAARN collects, uses, and protects it.
                        </p>
                    </SlideIn>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 text-[10px] uppercase tracking-[0.4em] text-[#E2E2E0]/30 font-black"
                    >
                        Last updated — February 2026
                    </motion.p>
                </div>

                {/* bottom border accent */}
                <div className="h-[3px] bg-gradient-to-r from-[#2B7574] via-[#861211] to-[#12484C]" />
            </section>

            {/* ── Breadcrumb ──────────────────────────────────────────────── */}
            <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#0E2931]/40 font-black">
                <Link href="/" className="hover:text-[#861211] transition-colors">Home</Link>
                <ChevronRight size={10} />
                <span className="text-[#861211]">Privacy Policy</span>
            </div>

            {/* ── Intro card ──────────────────────────────────────────────── */}
            <section className="max-w-5xl mx-auto px-6 mb-16">
                <FadeIn>
                    <motion.div
                        whileHover={{ scale: 1.005 }}
                        className="bg-[#0E2931] rounded-[2rem] p-10 md:p-14 relative overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-[#2B7574]/10 to-[#861211]/5 rounded-[2rem]"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                        <div className="relative z-10 flex items-start gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#861211]/20 border border-[#861211]/30 flex items-center justify-center flex-shrink-0 mt-1">
                                <Shield size={24} className="text-[#861211]" />
                            </div>
                            <div>
                                <h2 className="text-[#E2E2E0] font-black text-xl uppercase tracking-tighter mb-3">Our Commitment to Privacy</h2>
                                <p className="text-[#E2E2E0]/60 leading-relaxed text-sm md:text-base">
                                    At UAARN, privacy is not an afterthought — it is a core principle. This policy explains what personal data we collect when you use our platform, why we collect it, and how we keep it safe. We never sell your data to third parties, and we are committed to full transparency in all our practices.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </FadeIn>
            </section>

            {/* ── Policy sections ─────────────────────────────────────────── */}
            <section className="max-w-5xl mx-auto px-6 pb-24 space-y-6">
                {sections.map(({ icon: Icon, title, content }, idx) => (
                    <FadeIn key={title} delay={idx * 0.05}>
                        <motion.div
                            whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(14,41,49,0.08)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-white rounded-[2rem] p-8 md:p-10 border border-[#0E2931]/5"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-11 h-11 rounded-xl bg-[#861211]/10 border border-[#861211]/15 flex items-center justify-center flex-shrink-0">
                                    <Icon size={20} className="text-[#861211]" />
                                </div>
                                <h3 className="font-black text-lg uppercase tracking-tighter text-[#0E2931]">
                                    {String(idx + 1).padStart(2, "0")}. {title}
                                </h3>
                            </div>

                            <motion.div className="h-[2px] w-12 bg-[#861211]/30 mb-6 rounded-full" />

                            <ul className="space-y-4">
                                {content.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.05 * i }}
                                        className="flex items-start gap-3 text-sm text-[#0E2931]/70 leading-relaxed"
                                    >
                                        <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#861211] flex-shrink-0" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </FadeIn>
                ))}
            </section>

            {/* ── Contact CTA ─────────────────────────────────────────────── */}
            <section className="bg-[#0E2931] py-20 px-6 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#2B7574]/10 via-transparent to-[#861211]/10"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <FadeIn>
                        <h3 className="text-[#E2E2E0] text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
                            Questions About Your Data?
                        </h3>
                        <p className="text-[#E2E2E0]/50 text-base mb-8 font-medium italic">
                            Reach out to our team and we&apos;ll respond within 48 hours.
                        </p>
                        <Link href="/contact">
                            <motion.div
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#861211] text-white font-black text-xs uppercase tracking-widest rounded-full shadow-xl shadow-[#861211]/30 hover:shadow-[#861211]/50 transition-shadow"
                            >
                                <Shield size={14} />
                                Contact Our Privacy Team
                            </motion.div>
                        </Link>
                    </FadeIn>
                </div>
            </section>

        </main>
    );
}
