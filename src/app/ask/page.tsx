"use client";

import { useState } from "react";
import { AlertCircle, Bot, Sparkles, Zap } from "lucide-react";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import { motion, AnimatePresence } from "framer-motion";
import TypewriterText from "../components/animations/TypewriterText";

type Message = { role: "user" | "ai"; content: string };

export default function AskPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";
    const USER_ID = "demo-user";
    const USER_NAME = "";

    const formatResponse = (text: string) =>
        text.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    const handleSend = async (text: string) => {
        const userMsg: Message = { role: "user", content: text };
        setMessages((prev) => [...prev, userMsg]);
        setLoading(true);
        try {
            const res = await fetch(`${BACKEND_URL}/ask/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-user-id": USER_ID, "x-user-name": USER_NAME },
                body: JSON.stringify({ message: text }),
            });
            if (!res.ok) {
                const err = await res.json();
                setMessages((prev) => [...prev, { role: "ai", content: `Error: ${err.detail}` }]);
            } else {
                const data = await res.json();
                setMessages((prev) => [...prev, { role: "ai", content: formatResponse(data.reply) }]);
            }
        } catch {
            setMessages((prev) => [...prev, { role: "ai", content: "Network error. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#E2E2E0] min-h-screen mt-20 selection:bg-[#861211]/20">
            {/* Animated background blob */}
            <motion.div
                className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#2B7574]/10 to-transparent blur-[100px] rounded-full pointer-events-none -z-10"
                animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-5xl mx-auto px-4 pt-10 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#0E2931]/5 flex flex-col h-[85vh]"
                >
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="border-b border-[#0E2931]/10 px-8 py-5 flex justify-between items-center bg-white"
                    >
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="p-2 bg-[#0E2931] rounded-xl text-white shadow-lg"
                                animate={{ rotate: [0, -5, 5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Bot className="w-6 h-6" />
                            </motion.div>
                            <div>
                                <h2 className="text-xl font-black text-[#0E2931] uppercase tracking-tighter">
                                    <TypewriterText text="Ask UAARN" loop cursorColor="#0E2931" />
                                </h2>
                                <p className="text-[10px] font-bold text-[#2B7574] uppercase tracking-widest">Neural Intelligence Path</p>
                            </div>
                        </div>

                        <motion.div
                            className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0E2931]/10 text-[#0E2931]/40 text-[10px] font-black uppercase tracking-widest"
                            animate={{ borderColor: ["rgba(14,41,49,0.1)", "rgba(43,117,116,0.4)", "rgba(14,41,49,0.1)"] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                <Sparkles size={12} className="text-[#861211]" />
                            </motion.div>
                            Operational
                        </motion.div>
                    </motion.div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-2 bg-[#E2E2E0]/10">
                        <AnimatePresence>
                            {messages.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-4"
                                >
                                    <motion.div
                                        className="w-16 h-16 bg-[#0E2931]/5 rounded-full flex items-center justify-center text-[#0E2931]/20"
                                        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Sparkles size={32} />
                                    </motion.div>
                                    <motion.p
                                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                                        transition={{ duration: 2.5, repeat: Infinity }}
                                        className="text-[#0E2931]/30 font-bold uppercase tracking-[0.2em] text-xs"
                                    >
                                        Initialize your learning journey
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {messages.map((msg, i) => (
                            <ChatBubble key={i} isUser={msg.role === "user"} dangerouslySetInnerHTML={!msg.content.includes("Error:") ? { __html: msg.content } : undefined}>
                                {msg.content.includes("Error:") && (
                                    <div className="flex items-center gap-2 text-[#861211] font-bold uppercase text-[10px] tracking-widest">
                                        <AlertCircle className="w-4 h-4" />
                                        {msg.content}
                                    </div>
                                )}
                            </ChatBubble>
                        ))}

                        <AnimatePresence>
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    className="flex justify-start mt-4"
                                >
                                    <div className="bg-white border border-[#0E2931]/5 px-6 py-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3">
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                                            <Zap size={14} className="text-[#2B7574]" />
                                        </motion.div>
                                        <span className="text-[#0E2931]/40 text-xs font-black uppercase tracking-widest">Synthesizing Insight...</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Input */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="border-t border-[#0E2931]/5 bg-white p-6"
                    >
                        <ChatInput onSend={handleSend} onFileUpload={async () => { }} disabled={loading} />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
