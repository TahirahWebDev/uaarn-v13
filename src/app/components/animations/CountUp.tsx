"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
    end: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    delay?: number;
    className?: string;
}

export default function CountUp({
    end,
    suffix = "",
    prefix = "",
    duration = 2,
    delay = 0,
    className = "",
}: CountUpProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;
        const timeout = setTimeout(() => {
            let startTime: number | null = null;
            const step = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
                const eased = 1 - Math.pow(1 - progress, 4); // ease out quart
                setCount(Math.floor(eased * end));
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    setCount(end);
                }
            };
            requestAnimationFrame(step);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [isInView, end, duration, delay]);

    return (
        <span ref={ref} className={className}>
            {prefix}{count}{suffix}
        </span>
    );
}
