"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlideIn from "../components/animations/SlideIn";
import FadeIn from "../components/animations/FadeIn";
import { Mail, Globe, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "support@uaarn.com", emoji: "📧" },
  { icon: Globe, label: "www.uaarn.com", emoji: "🌐" },
  { icon: MapPin, label: "Karachi, Pakistan", emoji: "📍" },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    setError(null);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: "fc3dea13-38da-4a57-a917-372d7f3089d6", ...formData }),
      });
      const result = await response.json();
      if (result.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#E2E2E0] flex items-center justify-center px-4 py-16 selection:bg-[#861211]/20 relative overflow-hidden">
      {/* Animated bg blobs */}
      <motion.div
        className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#2B7574]/10 blur-[80px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#861211]/8 blur-[80px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl shadow-[#0E2931]/20 overflow-hidden border border-[#0E2931]/5"
      >
        <div className="grid md:grid-cols-2">

          {/* Sidebar */}
          <div className="relative bg-[#0E2931] text-[#E2E2E0] p-10 md:p-16 flex flex-col justify-center overflow-hidden min-h-[600px]">
            {/* BG layers */}
            <div className="absolute inset-0 z-0 bg-[#12484C]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }} />
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 z-0 bg-[#2B7574]"
              style={{ clipPath: "ellipse(90% 60% at 10% 40%)", opacity: 0.6 }}
            />
            <div className="absolute inset-0 z-0 bg-[#E2E2E0]" style={{ clipPath: "polygon(100% 30%, 60% 50%, 80% 80%, 100% 90%)", opacity: 0.15 }} />
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-0 right-0 w-[80%] h-[70%] z-0 bg-[#861211]"
              style={{ clipPath: "polygon(100% 20%, 40% 60%, 50% 100%, 100% 100%)", opacity: 0.9 }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#0E2931]/80 via-transparent to-transparent" />

            <div className="relative z-10">
              <SlideIn direction="left">
                <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter leading-[0.9]">
                  Get in <br />
                  <span className="text-[#861211] drop-shadow-[3px_3px_3px_rgba(255,255,255,0.5)]">Touch</span>
                </h2>
                <p className="text-[#E2E2E0]/80 mb-12 text-lg leading-relaxed max-w-md font-medium">
                  Have questions about our AI resilience network? Our team is ready to provide the clarity you need.
                </p>
              </SlideIn>

              <div className="space-y-6">
                {contactInfo.map(({ label, emoji }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                    className="flex items-center gap-5 group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#E2E2E0]/10 border border-[#E2E2E0]/20 group-hover:border-[#861211] transition-all duration-300 backdrop-blur-sm"
                    >
                      <span className="text-xl">{emoji}</span>
                    </motion.div>
                    <motion.span
                      whileHover={{ x: 4 }}
                      className="text-sm font-bold tracking-[0.2em] uppercase opacity-80 group-hover:opacity-100 transition-opacity"
                    >
                      {label}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-10 md:p-16 bg-white flex flex-col justify-center">
            <FadeIn>
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-xs font-black text-[#0E2931] uppercase tracking-[0.3em] whitespace-nowrap">Send Message</h3>
                <motion.div
                  className="h-px bg-[#0E2931]/10 flex-1"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: "name", placeholder: "YOUR NAME", type: "text" },
                  { name: "email", placeholder: "YOUR EMAIL", type: "email" },
                ].map((field, i) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                  >
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="w-full p-5 bg-[#F4F4F3] border border-transparent rounded-2xl focus:bg-white focus:border-[#861211]/30 outline-none transition-all text-xs font-bold tracking-widest text-[#0E2931] placeholder-[#0E2931]/40"
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>
                ))}

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                  <textarea
                    name="message"
                    placeholder="YOUR MESSAGE"
                    rows={4}
                    className="w-full p-5 bg-[#F4F4F3] border border-transparent rounded-2xl focus:bg-white focus:border-[#861211]/30 outline-none transition-all text-xs font-bold tracking-widest text-[#0E2931] placeholder-[#0E2931]/40 resize-none"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="group relative w-full bg-[#861211] overflow-hidden text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all hover:shadow-2xl hover:shadow-[#861211]/40 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                          <Send size={14} />
                        </motion.div>
                        Transmitting...
                      </motion.span>
                    ) : (
                      <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Send size={14} />
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
              </form>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="mt-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 text-[10px] font-black uppercase tracking-widest flex items-center gap-3"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Transmission Successful
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-700 text-[10px] font-black uppercase tracking-widest flex items-center gap-3"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </FadeIn>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 text-[9px] font-bold uppercase tracking-[0.5em] text-[#0E2931]/40">
        UAARN External Communications • Secure Channel
      </div>
    </div>
  );
}