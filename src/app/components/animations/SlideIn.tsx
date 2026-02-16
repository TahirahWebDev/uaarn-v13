"use client";

import { motion } from "framer-motion";

interface SlideInProps {
    children: React.ReactNode;
    direction?: "left" | "right" | "up" | "down";
    delay?: number;
    duration?: number;
    className?: string;
}

export default function SlideIn({
    children,
    direction = "up",
    delay = 0,
    duration = 0.5,
    className = "",
}: SlideInProps) {
    const variants = {
        hidden: {
            opacity: 0,
            x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration, delay, ease: "easeOut" }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}
