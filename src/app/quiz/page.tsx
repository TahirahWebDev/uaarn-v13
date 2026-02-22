"use client";
import { useState } from "react";
import { Send, Brain, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScaleIn from "../components/animations/ScaleIn";
import SlideIn from "../components/animations/SlideIn";
import FadeIn from "../components/animations/FadeIn";
import TypewriterText from "../components/animations/TypewriterText";

export default function QuizPage() {
    type Quiz = { question: string; options: string[]; answer: string };
    type Message = { role: "user"; content: string } | { role: "ai"; content: Quiz[] | string };

    const [messages, setMessages] = useState<Message[]>([]);
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<Record<string, string>>({});

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

    const handleSend = async () => {
        if (!topic.trim()) return;
        setMessages((prev) => [...prev, { role: "user", content: topic }]);
        setTopic("");
        setLoading(true);
        try {
            const res = await fetch(`${BACKEND_URL}/quiz/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });
            if (!res.ok) throw new Error(`Backend error: ${res.status}`);
            const data = await res.json();
            if (!data || !Array.isArray(data.quiz)) throw new Error("Invalid response");
            setMessages((prev) => [...prev, { role: "ai", content: data.quiz }]);
        } catch (error) {
            setMessages((prev) => [...prev, { role: "ai", content: `Error: ${String(error)}` }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };

    return (
        <div className="bg-[#E2E2E0] min-h-screen selection:bg-[#861211]/20 font-sans">
            {/* Animated bg */}
            <motion.div
                className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#0E2931]/8 to-transparent blur-[100px] rounded-full pointer-events-none -z-10"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-5xl mx-auto px-4 pt-10 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white rounded-[2.5rem] shadow-2xl shadow-[#0E2931]/5 overflow-hidden border border-[#0E2931]/5 flex flex-col h-[85vh]"
                >
                    {/* Toolbar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="border-b border-[#0E2931]/10 px-8 py-5 flex justify-between items-center bg-white"
                    >
                        <h2 className="text-xl font-black text-[#0E2931] uppercase tracking-tighter flex items-center gap-3">
                            <motion.div
                                className="p-2 bg-[#0E2931] rounded-xl text-white shadow-lg"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Brain className="w-5 h-5" />
                            </motion.div>
                            <TypewriterText text="Neural Assessment" loop cursorColor="#0E2931" />
                        </h2>
                        <motion.span
                            className="text-[10px] font-black uppercase tracking-widest text-[#2B7574]"
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            System Active
                        </motion.span>
                    </motion.div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 bg-[#E2E2E0]/10">
                        <AnimatePresence>
                            {messages.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-4"
                                >
                                    <motion.div
                                        className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-[#0E2931]/10 border border-[#0E2931]/5"
                                        animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Sparkles size={40} />
                                    </motion.div>
                                    <motion.p
                                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                                        transition={{ duration: 2.5, repeat: Infinity }}
                                        className="text-[#0E2931]/30 font-black uppercase tracking-[0.3em] text-xs"
                                    >
                                        Initialize topic for evaluation
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[90%] rounded-[1.5rem] leading-relaxed shadow-sm ${msg.role === "user"
                                    ? "bg-[#861211] text-white rounded-tr-sm px-6 py-4 shadow-lg shadow-[#861211]/20"
                                    : "bg-white border border-[#0E2931]/5 text-[#0E2931] rounded-tl-sm p-6 md:p-8"
                                    }`}>
                                    {msg.role === "user" ? (
                                        <span className="font-bold uppercase tracking-widest text-xs">{msg.content}</span>
                                    ) : Array.isArray(msg.content) ? (
                                        <div className="space-y-8">
                                            <FadeIn>
                                                <div className="flex items-center gap-3 pb-4 border-b border-[#0E2931]/5">
                                                    <div className="w-2 h-2 rounded-full bg-[#2B7574]" />
                                                    <p className="text-[11px] font-black uppercase tracking-widest text-[#0E2931]/40">
                                                        Results for: <span className="text-[#0E2931]">{messages[i - 1]?.role === "user" ? String(messages[i - 1].content) : "Node Input"}</span>
                                                    </p>
                                                </div>
                                            </FadeIn>

                                            {msg.content.map((q, idx) => (
                                                <SlideIn key={idx} direction="up" delay={idx * 0.08}>
                                                    <div className="relative group">
                                                        <h3 className="font-black text-lg text-[#0E2931] uppercase tracking-tighter mb-5 flex gap-3">
                                                            <span className="text-[#861211]">{idx + 1}.</span>
                                                            {q.question}
                                                        </h3>
                                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            {q.options.map((opt, i2) => {
                                                                const key = `${i}-${idx}`;
                                                                const isSelected = selected[key] === opt;
                                                                const isAnswer = opt === q.answer;
                                                                const hasAnswered = !!selected[key];
                                                                return (
                                                                    <motion.li
                                                                        key={i2}
                                                                        whileHover={!hasAnswered ? { scale: 1.02, x: 4 } : {}}
                                                                        whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                                                                        onClick={() => !hasAnswered && setSelected(prev => ({ ...prev, [key]: opt }))}
                                                                        className={`px-5 py-4 border-2 rounded-2xl cursor-pointer text-[#0E2931] text-sm font-medium transition-all duration-300 ${hasAnswered
                                                                            ? isAnswer ? "border-[#2B7574] bg-[#2B7574]/10 text-[#2B7574] font-bold"
                                                                                : isSelected ? "border-[#861211] bg-[#861211]/10 text-[#861211]"
                                                                                    : "border-[#E2E2E0] opacity-50"
                                                                            : "border-[#E2E2E0] hover:border-[#2B7574] hover:bg-[#E2E2E0]/20"
                                                                            }`}
                                                                    >
                                                                        {opt}
                                                                    </motion.li>
                                                                );
                                                            })}
                                                        </ul>
                                                        <div className="mt-5 pt-4 border-t border-dashed border-[#0E2931]/10 flex items-center gap-2">
                                                            <CheckCircle className="w-4 h-4 text-[#2B7574]" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#0E2931]/30">Answer:</span>
                                                            <b className="text-sm font-black text-[#0E2931] uppercase tracking-tighter">{q.answer}</b>
                                                        </div>
                                                    </div>
                                                </SlideIn>
                                            ))}
                                        </div>
                                    ) : (
                                        <ScaleIn>
                                            <div className="flex items-center gap-3 text-[#861211] font-black uppercase text-[10px] tracking-widest bg-red-50 p-4 rounded-xl border border-red-100">
                                                <AlertCircle className="w-5 h-5" />
                                                <span>{msg.content}</span>
                                            </div>
                                        </ScaleIn>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        <AnimatePresence>
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white border border-[#0E2931]/5 px-8 py-5 rounded-[1.5rem] rounded-tl-sm shadow-sm flex items-center gap-3">
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                                            <Sparkles size={14} className="text-[#861211]" />
                                        </motion.div>
                                        <span className="text-[#0E2931]/40 text-[10px] font-black uppercase tracking-[0.3em]">Synthesizing Quiz Data...</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Input Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="border-t border-[#0E2931]/5 p-6 bg-white"
                    >
                        <div className="flex items-center gap-4 max-w-4xl mx-auto">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="ENTER TOPIC FOR NEURAL ASSESSMENT..."
                                    className="w-full px-8 py-5 bg-[#E2E2E0]/30 border border-[#0E2931]/5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#861211]/20 focus:bg-white text-[#0E2931] text-[11px] font-black tracking-widest placeholder-[#0E2931]/30 transition-all"
                                    disabled={loading}
                                />
                                <motion.div
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute right-6 top-1/2 -translate-y-1/2"
                                >
                                    <Brain className="text-[#0E2931]/10 w-5 h-5" />
                                </motion.div>
                            </div>
                            <motion.button
                                onClick={handleSend}
                                disabled={loading || !topic.trim()}
                                whileHover={{ scale: 1.1, rotate: -8 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className="p-5 bg-[#861211] hover:bg-[#6a0e0d] text-white rounded-full transition-colors disabled:opacity-30 shadow-xl shadow-[#861211]/20"
                            >
                                <Send size={20} />
                            </motion.button>
                        </div>
                        <p className="text-center mt-4 text-[9px] font-black uppercase tracking-[0.4em] text-[#0E2931]/20">
                            UAARN Labs • Secure Evaluation Protocol Operational
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}