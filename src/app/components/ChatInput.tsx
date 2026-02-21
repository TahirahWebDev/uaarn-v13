"use client";
import { FiSend, FiPaperclip } from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInputProps {
  onSend: (message: string) => Promise<void>;
  onFileUpload: (file: File) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, onFileUpload, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    await onSend(input.trim());
    setInput("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
      e.target.value = "";
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-4xl mx-auto flex gap-4 items-center"
    >
      {/* File Upload */}
      <motion.label
        whileHover={{ scale: 1.1, rotate: -10 }}
        whileTap={{ scale: 0.95 }}
        className={`cursor-pointer p-3 rounded-xl bg-[#E2E2E0]/30 ${disabled ? "opacity-30" : "hover:bg-[#E2E2E0]/60 transition"}`}
      >
        <FiPaperclip className="w-5 h-5 text-[#0E2931]/40" />
        <input
          type="file"
          className="hidden"
          disabled={disabled}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt"
        />
      </motion.label>

      {/* Input Field */}
      <div className="flex-1 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Query the Resilience Network..."
          className="w-full px-6 py-4 bg-[#E2E2E0]/20 border border-[#0E2931]/5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#861211]/20 focus:bg-white text-[#0E2931] font-medium transition-all"
          disabled={disabled}
        />
        {/* Animated focus ring glow */}
        <AnimatePresence>
          {focused && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#861211]/30 pointer-events-none"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Send Button */}
      <motion.button
        type="submit"
        disabled={disabled || !input.trim()}
        whileHover={{ scale: 1.1, rotate: -8 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="p-4 bg-[#861211] text-white rounded-full hover:bg-[#6a0e0d] disabled:opacity-30 transition-colors shadow-xl shadow-[#861211]/20"
      >
        <motion.div
          animate={input.trim() && !disabled ? { x: [0, 3, 0] } : {}}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiSend size={20} />
        </motion.div>
      </motion.button>
    </motion.form>
  );
}