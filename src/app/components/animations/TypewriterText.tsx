"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface TypewriterTextProps {
    /** The text to type */
    text: string;
    className?: string;
    /** ms per character while typing (default 10) */
    speed?: number;
    /** ms per character while deleting (default 8) */
    deleteSpeed?: number;
    /** ms to pause when fully typed (default 1600) */
    pauseMs?: number;
    /**
     * loop=true  → type → pause → delete → repeat (default)
     * loop=false → type once then stop
     */
    loop?: boolean;
    /** Show blinking cursor (default true) */
    cursor?: boolean;
    /** Delay in seconds before starting (only used in non-loop / scroll-triggered mode) */
    delay?: number;
    /** Colour of the cursor bar (default "currentColor") */
    cursorColor?: string;
}

export default function TypewriterText({
    text,
    className = "",
    speed = 10,
    deleteSpeed = 8,
    pauseMs = 1600,
    loop = true,
    cursor = true,
    delay = 0,
    cursorColor = "currentColor",
}: TypewriterTextProps) {
    const [displayed, setDisplayed] = useState("");
    const [typing, setTyping] = useState(true);   // true = typing, false = deleting
    const ref = useRef<HTMLSpanElement>(null);
    // For loop mode, start immediately on mount (no InView needed for hero usage).
    // For one-shot mode, trigger on scroll into view.
    const isInView = useInView(ref, { once: true, margin: "-40px" });

    useEffect(() => {
        // In loop mode: start after a tiny mount delay, ignore InView.
        // In one-shot mode: wait until element is in view + optional delay.
        const shouldStart = loop ? true : isInView;
        if (!shouldStart) return;

        let timer: ReturnType<typeof setTimeout>;
        let i = loop ? 0 : 0;

        function typeChar() {
            i = Math.min(i + 1, text.length);
            setDisplayed(text.slice(0, i));
            if (i < text.length) {
                timer = setTimeout(typeChar, speed);
            } else {
                // fully typed
                if (loop) {
                    timer = setTimeout(deleteChar, pauseMs);
                }
                setTyping(false);
            }
        }

        function deleteChar() {
            setTyping(false);
            i = Math.max(i - 1, 0);
            setDisplayed(text.slice(0, i));
            if (i > 0) {
                timer = setTimeout(deleteChar, deleteSpeed);
            } else {
                // fully deleted — restart
                setTyping(true);
                timer = setTimeout(typeChar, 300);
            }
        }

        const startDelay = loop ? 100 : delay * 1000;
        timer = setTimeout(typeChar, startDelay);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView]);

    const isActive = displayed.length > 0 && (loop ? true : displayed.length < text.length);

    return (
        <span ref={ref} className={className}>
            {displayed}
            {cursor && isActive && (
                <span
                    className="inline-block w-[2px] h-[0.85em] align-middle ml-[1px] animate-pulse"
                    style={{ backgroundColor: cursorColor }}
                />
            )}
        </span>
    );
}
