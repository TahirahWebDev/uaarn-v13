"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface TypewriterTextProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
    cursor?: boolean;
}

export default function TypewriterText({
    text,
    className = "",
    delay = 0,
    speed = 40,
    cursor = true,
}: TypewriterTextProps) {
    const [displayed, setDisplayed] = useState("");
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;
        const timeout = setTimeout(() => setStarted(true), delay * 1000);
        return () => clearTimeout(timeout);
    }, [isInView, delay]);

    useEffect(() => {
        if (!started) return;
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [started, text, speed]);

    return (
        <span ref={ref} className={className}>
            {displayed}
            {cursor && displayed.length < text.length && (
                <span className="inline-block w-[2px] h-[1em] bg-current align-middle ml-[1px] animate-pulse" />
            )}
        </span>
    );
}
