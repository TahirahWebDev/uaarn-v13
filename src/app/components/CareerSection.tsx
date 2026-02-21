'use client'
import Link from 'next/link'
import { Rocket, GraduationCap, Briefcase } from 'lucide-react'
import SlideIn from './animations/SlideIn'
import ScaleIn from './animations/ScaleIn'
import StaggerContainer from './animations/StaggerContainer'
import { motion } from 'framer-motion'

const careerFeatures = [
    {
        title: "Personalized Roadmaps",
        desc: "AI identifies skill gaps and builds a step-by-step 90-day learning plan just for you.",
        icon: GraduationCap
    },
    {
        title: "CV & Interview Coaching",
        desc: "Get AI-powered rewriting, mock interviews, and tailored feedback to land your dream role.",
        icon: Briefcase
    },
    {
        title: "Career Discovery Engine",
        desc: "Explore high-demand career paths and find the one that perfectly aligns with your interests.",
        icon: Rocket
    }
];

export default function CareerSection() {
    return (
        <section className="py-20 px-8 bg-[#E2E2E0] border-t border-[#0E2931]/10">
            <div className="max-w-6xl mx-auto text-center">

                <SlideIn direction="up">
                    <h2 className="text-3xl sm:text-4xl font-black text-[#0E2931] tracking-tighter uppercase leading-tight max-w-3xl mx-auto">
                        Your <span className="text-[#861211]">AI-Powered</span> Career Mentor
                    </h2>

                    <p className="mt-4 text-lg text-[#0E2931]/70 max-w-3xl mx-auto font-medium">
                        Unlock personalized career advice, skill roadmaps, CV rewriting, interview prep, and freelancing tips — all tailored by AI.
                    </p>

                    <div className="mt-10">
                        <motion.div
                            whileHover={{ scale: 1.06, y: -3 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="inline-block"
                        >
                            <Link
                                href="/ai-mentor"
                                className="inline-flex items-center gap-2 bg-[#861211] hover:bg-[#6a0e0d] text-white font-bold px-8 py-3 rounded-full transition-colors duration-300 shadow-lg shadow-[#861211]/20 text-sm uppercase tracking-widest"
                            >
                                <motion.span
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Rocket size={16} />
                                </motion.span>
                                Start Your Free Session
                            </Link>
                        </motion.div>
                    </div>
                </SlideIn>

                <StaggerContainer className="mt-16 grid md:grid-cols-3 gap-8">
                    {careerFeatures.map((item, index) => (
                        <ScaleIn key={item.title} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                                className="bg-white p-6 md:p-8 rounded-[2rem] border border-[#0E2931]/5 shadow-sm hover:shadow-xl transition-shadow duration-300 text-left h-full group"
                            >
                                {/* Icon circle with animated ring */}
                                <div className="mb-6 relative inline-block">
                                    <motion.div
                                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#2B7574]/10 group-hover:bg-[#2B7574]/20 transition-colors duration-300"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                    >
                                        <item.icon className="w-6 h-6 text-[#2B7574]" />
                                    </motion.div>
                                    {/* Animated ping ring on hover */}
                                    <motion.div
                                        className="absolute inset-0 rounded-2xl border-2 border-[#2B7574]/40"
                                        initial={{ scale: 1, opacity: 0 }}
                                        whileHover={{ scale: 1.5, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                </div>

                                <h3 className="text-xl font-black text-[#0E2931] uppercase tracking-tighter group-hover:text-[#861211] transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-[#0E2931]/60 text-sm font-medium leading-relaxed">{item.desc}</p>

                                {/* Animated underline */}
                                <motion.div
                                    className="mt-4 h-[2px] bg-gradient-to-r from-[#2B7574] to-[#861211] rounded-full"
                                    initial={{ scaleX: 0, originX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                />
                            </motion.div>
                        </ScaleIn>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    )
}