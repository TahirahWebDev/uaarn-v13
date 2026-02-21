"use client";
import React from "react";
import { motion } from "framer-motion";

interface ChatBubbleProps {
  children?: React.ReactNode;
  isUser: boolean;
  dangerouslySetInnerHTML?: { __html: string };
}

export default function ChatBubble({ children, isUser, dangerouslySetInnerHTML }: ChatBubbleProps) {
  const bubbleClasses = isUser
    ? "bg-[#861211] text-white rounded-tr-sm self-end shadow-lg shadow-[#861211]/20"
    : "bg-white border border-[#0E2931]/5 text-[#0E2931] rounded-tl-sm self-start shadow-sm";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex w-full mt-6 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`max-w-[85%] md:max-w-[75%] p-5 text-sm rounded-[1.5rem] leading-relaxed font-medium ${bubbleClasses}`}
      >
        {dangerouslySetInnerHTML ? (
          <div className="prose prose-sm prose-invert max-w-none" dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
        ) : (
          children
        )}
      </motion.div>
    </motion.div>
  );
}