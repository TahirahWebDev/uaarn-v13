"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number;       // Bara number = Slow typing (e.g., 100)
    deleteSpeed?: number; // Chota number = Fast deletion (e.g., 20)
    pauseMs?: number;
    loop?: boolean;
    cursor?: boolean;
    delay?: number;
    cursorColor?: string;
}

export default function TypewriterText({
    text,
    className = "",
    speed = 200,
    deleteSpeed = 150,
    pauseMs = 1600,
    loop = true,
    cursor = true,
    delay = 2,
    cursorColor = "currentColor",
}: TypewriterTextProps) {
    const [displayed, setDisplayed] = useState("");
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });

    // Latest props ko track karne ke liye refs (Closure trap fix)
    const speedRef = useRef(speed);
    const deleteSpeedRef = useRef(deleteSpeed);

    useEffect(() => {
        speedRef.current = speed;
        deleteSpeedRef.current = deleteSpeed;
    }, [speed, deleteSpeed]);

    useEffect(() => {
        const shouldStart = loop ? true : isInView;
        if (!shouldStart) return;

        let timer: ReturnType<typeof setTimeout>;
        let i = 0;
        let isDeleting = false;

        function tick() {
            if (!isDeleting) {
                // Typing State
                if (i < text.length) {
                    i++;
                    setDisplayed(text.slice(0, i));
                    timer = setTimeout(tick, speedRef.current);
                } else if (loop) {
                    isDeleting = true;
                    timer = setTimeout(tick, pauseMs);
                }
            } else {
                // Deleting State
                if (i > 0) {
                    i--;
                    setDisplayed(text.slice(0, i));
                    timer = setTimeout(tick, deleteSpeedRef.current);
                } else {
                    isDeleting = false;
                    i = 0; // Reset index
                    timer = setTimeout(tick, 300);
                }
            }
        }

        const startDelay = loop ? 100 : delay * 1000;
        timer = setTimeout(tick, startDelay);

        return () => {
            if (timer) clearTimeout(timer);
        };

        // Dependency list updated
    }, [isInView, text, loop, pauseMs, delay]);

    const isActive = cursor && (loop || displayed.length < text.length);

    return (
        <span ref={ref} className={`${className} inline-flex items-center whitespace-nowrap`}>
            {displayed}
            {isActive && (
                <span
                    className="inline-block w-[2px] h-[0.85em] align-middle ml-[2px] animate-pulse"
                    style={{ backgroundColor: cursorColor }}
                />
            )}
        </span>
    );
}