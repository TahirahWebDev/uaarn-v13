"use client";
import { useState, useRef, useEffect } from "react";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import LoadingDots from "../components/LoadingDots";
import CareerSection from "../components/CareerSection";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Sparkles, Zap, MessageCircle } from "lucide-react";

interface Message {
  text: string;
  isUser: boolean;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

const WELCOME_MESSAGE = `Hello! I'm your <strong>AI Career Mentor</strong>.<br/><br/>
I can help you with:<br/>
🗺️ Choose the right career path<br/>
🗓️ Build a 90-day skill roadmap<br/>
📄 Rewrite your CV &amp; Cover Letter<br/>
🎤 Prepare for tough interviews<br/>
🚀 Strategies for starting freelancing<br/><br/>
Just type your question below or upload your CV to get started!`;

export default function AIMentor() {
  const [messages, setMessages] = useState<Message[]>([{ text: WELCOME_MESSAGE, isUser: false }]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const formatResponse = (text: string) =>
    text
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/(\* |• )/g, "<li>");

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { text, isUser: true }]);
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/careerapi/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error("Failed to get a response.");
      const data = await res.json();
      setMessages((prev) => [...prev, { text: formatResponse(data.reply), isUser: false }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ <strong>Connection Error:</strong> Sorry, I'm having trouble connecting right now.", isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setMessages((prev) => [...prev, { text: `CV Uploaded: ${file.name}. Analyzing...`, isUser: true }]);
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${BACKEND_URL}/careerapi/upload-cv`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("CV Upload failed.");
      const data = await res.json();
      setMessages((prev) => [...prev, { text: formatResponse(data.analysis), isUser: false }]);
    } catch {
      setMessages((prev) => [...prev, { text: "❌ <strong>Analysis Failed:</strong> Could not analyze your CV.", isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#E2E2E0] min-h-screen font-sans selection:bg-[#861211]/20 relative overflow-hidden">

      {/* Animated background blob */}
      <motion.div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#2B7574]/8 to-transparent blur-[120px] rounded-full pointer-events-none -z-10"
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <CareerSection />

      <div className="max-w-5xl mx-auto px-6 pt-10 pb-24">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="p-2.5 bg-[#0E2931] rounded-2xl text-white shadow-lg"
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <BrainCircuit className="w-5 h-5" />
            </motion.div>
            <div>
              <h2 className="text-lg font-black text-[#0E2931] uppercase tracking-tighter">AI Career Mentor</h2>
              <p className="text-[10px] font-bold text-[#2B7574] uppercase tracking-widest">Neural Career Intelligence</p>
            </div>
          </div>

          <motion.div
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0E2931]/10 text-[10px] font-black uppercase tracking-widest text-[#0E2931]/30"
            animate={{ borderColor: ["rgba(14,41,49,0.1)", "rgba(43,117,116,0.4)", "rgba(14,41,49,0.1)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Sparkles size={10} className="text-[#861211]" />
            </motion.div>
            Session Active
          </motion.div>
        </motion.div>

        {/* Chat container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-[#0E2931]/10 overflow-hidden border border-[#0E2931]/5 relative group transition-shadow duration-500 hover:shadow-[#2B7574]/10"
        >
          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#0E2931]/10 group-hover:border-[#861211]/30 transition-all duration-500 rounded-tr-[2.5rem]" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#0E2931]/5 group-hover:border-[#2B7574]/20 transition-all duration-500 rounded-bl-[2.5rem]" />

          {/* Message count badge */}
          <AnimatePresence>
            {messages.length > 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="absolute top-5 right-5 z-10 flex items-center gap-1.5 px-3 py-1 bg-[#E2E2E0]/80 backdrop-blur-md rounded-full border border-[#0E2931]/5 text-[9px] font-black uppercase tracking-widest text-[#0E2931]/40"
              >
                <MessageCircle size={9} />
                {messages.length} messages
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat History */}
          <div className="h-[70vh] max-h-[750px] overflow-y-auto p-8 md:p-12 space-y-2">
            {messages.map((msg, i) => (
              <ChatBubble
                key={i}
                isUser={msg.isUser}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}

            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex justify-start mt-4"
                >
                  <div className="bg-[#0E2931]/5 px-6 py-4 rounded-2xl flex items-center gap-3">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Zap size={12} className="text-[#2B7574]" />
                    </motion.div>
                    <LoadingDots />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} className="pt-4" />
          </div>

          {/* Input Area */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#E2E2E0]/30 backdrop-blur-md border-t border-[#0E2931]/5 p-6"
          >
            <ChatInput onSend={sendMessage} onFileUpload={handleFileUpload} disabled={loading} />
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.p
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-center mt-8 text-[10px] uppercase tracking-[0.3em] font-bold text-[#0E2931]/40"
        >
          Engineered Resilience Module • Secure Session
        </motion.p>
      </div>
    </div>
  );
}