"use client";

import { motion } from "framer-motion";

interface ScaleInProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export default function ScaleIn({
    children,
    delay = 0,
    duration = 0.4,
    className = "",
}: ScaleInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
