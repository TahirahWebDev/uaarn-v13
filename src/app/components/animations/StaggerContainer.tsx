"use client";

import { motion } from "framer-motion";

interface StaggerContainerProps {
    children: React.ReactNode;
    delay?: number;
    staggerDelay?: number;
    className?: string;
}

export default function StaggerContainer({
    children,
    delay = 0,
    staggerDelay = 0.1,
    className = "",
}: StaggerContainerProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: staggerDelay,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}
