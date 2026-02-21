"use client";

import { motion } from "framer-motion";

interface FloatingElementProps {
    children: React.ReactNode;
    amplitude?: number;
    duration?: number;
    delay?: number;
    className?: string;
}

export default function FloatingElement({
    children,
    amplitude = 10,
    duration = 3,
    delay = 0,
    className = "",
}: FloatingElementProps) {
    return (
        <motion.div
            animate={{
                y: [-amplitude / 2, amplitude / 2, -amplitude / 2],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
