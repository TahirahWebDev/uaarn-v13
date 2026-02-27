"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Youtube, FileUp, FileText, Volume2, Square, Sparkles, Brain, RotateCcw, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "../components/animations/FadeIn";
import SlideIn from "../components/animations/SlideIn";
import TypewriterText from "../components/animations/TypewriterText";

type SummarizePayload = { source: "youtube"; link: string } | { source: "text"; text: string };

export default function SummarizePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#E2E2E0] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-[#0E2931]/10 border-t-[#861211] rounded-full" />
      </div>
    }>
      <SummarizeContent />
    </Suspense>
  );
}

function SummarizeContent() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledLink = (searchParams?.get("link") ?? "") as string;

  const [source, setSource] = useState<"youtube" | "text" | "upload">("youtube");
  const [link, setLink] = useState(prefilledLink);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push("/sign-in");
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (prefilledLink) { setSource("youtube"); setLink(prefilledLink); }
  }, [prefilledLink]);

  if (!isLoaded) return (
    <div className="min-h-screen bg-[#E2E2E0] flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-[#0E2931]/10 border-t-[#861211] rounded-full" />
    </div>
  );
  if (!isSignedIn) return <RedirectToSignIn />;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setFileName(f.name);
  }

  async function handleSummarize() {
    setError(null); setSummary(null);
    try {
      setLoading(true);
      let response;
      if (source === "youtube" || source === "text") {
        const payload: SummarizePayload = source === "youtube" ? { source: "youtube", link } : { source: "text", text };
        response = await fetch(`${BACKEND_URL}/summarize/api/agent/summarize`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      }
      if (source === "upload" && file) {
        const formData = new FormData();
        formData.append("file", file);
        response = await fetch(`${BACKEND_URL}/summarize/api/agent/upload`, { method: "POST", body: formData });
      }
      if (!response) throw new Error("No response from server");
      if (!response.ok) { const errData = await response.json(); throw new Error(errData.detail || "Summarization failed"); }
      const data = await response.json();
      setSummary(data.output);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally { setLoading(false); }
  }

  async function handleDownload(format: "txt" | "pdf") {
    if (!summary) return;
    const response = await fetch(`${BACKEND_URL}/summarize/api/agent/download/${format}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: summary }) });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `summary.${format}`; a.click();
  }

  async function handleTTS() {
    if (!summary) return;
    const response = await fetch(`${BACKEND_URL}/summarize/api/agent/tts`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: summary }) });
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setIsPlaying(true);
    audio.play();
    audio.onended = () => { setIsPlaying(false); audioRef.current = null; };
  }

  function handleStopTTS() {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; audioRef.current = null; setIsPlaying(false); }
  }

  const sourceOptions = [
    { key: "youtube", icon: Youtube, label: "YouTube Link" },
    { key: "upload", icon: FileUp, label: "Upload File" },
    { key: "text", icon: FileText, label: "Paste Text" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#E2E2E0] mt-16 py-12 px-6 selection:bg-[#861211]/20 relative overflow-hidden">
      {/* Animated bg blob */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#2B7574]/10 to-transparent blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-[#0E2931]/5 border border-[#0E2931]/5 p-8 md:p-12"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <SlideIn direction="down">
            <h1 className="text-3xl md:text-3xl font-black text-[#0E2931] mb-6 uppercase tracking-tighter leading-none">
              Summarize <span className="text-[#861211]"><TypewriterText text="Intelligence" loop cursorColor="#861211" /></span>
            </h1>
          </SlideIn>
          <FadeIn delay={0.2}>
            <p className="text-[#0E2931]/60 text-lg font-medium italic max-w-2xl mx-auto">
              Upload transcripts, paste notes, or share a YouTube link. Bridge the gap between complexity and total clarity.
            </p>
          </FadeIn>
        </div>

        {/* Source Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {sourceOptions.map(({ key, icon: Icon, label }, i) => (
            <motion.button
              key={key}
              onClick={() => setSource(key)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-3 rounded-full border transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${source === key
                ? "bg-[#0E2931] text-white border-[#0E2931] shadow-xl scale-105"
                : "bg-white text-[#0E2931]/40 border-[#0E2931]/5 hover:bg-[#E2E2E0]/50 hover:text-[#0E2931]"
                }`}
            >
              <motion.div animate={source === key ? { rotate: [0, 10, -10, 0] } : {}} transition={{ duration: 0.4 }}>
                <Icon className="w-4 h-4" />
              </motion.div>
              {label}
            </motion.button>
          ))}
        </div>

        {/* Inputs */}
        <div className="mb-10 flex justify-center">
          <AnimatePresence mode="wait">
            {source === "upload" ? (
              <motion.label key="upload" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="block w-full max-w-3xl">
                <input type="file" accept=".txt,.pdf,.docx" onChange={handleFileChange} className="hidden" id="file-input" />
                <motion.div
                  onClick={() => document.getElementById("file-input")?.click()}
                  whileHover={{ scale: 1.01, borderColor: "rgba(43,117,116,0.3)" }}
                  className="cursor-pointer bg-[#E2E2E0]/30 hover:bg-[#E2E2E0]/50 border-2 border-dashed border-[#0E2931]/10 px-8 py-12 rounded-[2rem] text-[#0E2931]/60 font-black uppercase tracking-widest text-[10px] transition-all text-center"
                >
                  {fileName ? `✅ Dispatching: ${fileName}` : "📂 Dispatch Document (PDF, DOCX, TXT)"}
                </motion.div>
              </motion.label>
            ) : source === "text" ? (
              <motion.textarea key="text" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                rows={8} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your lecture transcript or notes here..."
                className="w-full max-w-3xl mx-auto block p-6 bg-[#E2E2E0]/20 border border-[#0E2931]/5 rounded-[2rem] focus:ring-2 focus:ring-[#861211]/10 focus:outline-none text-[#0E2931] placeholder:text-[#0E2931]/30 font-medium leading-relaxed resize-none"
              />
            ) : (
              <motion.input key="youtube" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Paste your YouTube video link here..."
                className="w-full max-w-3xl mx-auto block p-5 px-8 bg-[#E2E2E0]/20 border border-[#0E2931]/5 rounded-full focus:ring-2 focus:ring-[#861211]/10 focus:outline-none text-[#0E2931] placeholder:text-[#0E2931]/30 font-medium"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-[#861211] text-[10px] font-black uppercase tracking-widest mb-6 bg-[#861211]/5 border border-[#861211]/10 px-4 py-3 rounded-xl flex items-center gap-2"
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <motion.button
            onClick={handleSummarize}
            disabled={loading}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="bg-[#861211] hover:bg-[#6a0e0d] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] transition-colors shadow-xl shadow-[#861211]/20 disabled:opacity-50 flex items-center gap-2"
          >
            <motion.div animate={loading ? { rotate: 360 } : {}} transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}>
              <Sparkles className="w-4 h-4" />
            </motion.div>
            {loading ? "Synthesizing..." : "Process Summary"}
          </motion.button>

          <AnimatePresence>
            {summary && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                <motion.button
                  onClick={isPlaying ? handleStopTTS : handleTTS}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-full text-white shadow-lg transition-all ${isPlaying ? "bg-[#861211] animate-pulse" : "bg-[#0E2931] hover:bg-[#12484C]"}`}
                >
                  {isPlaying ? <Square size={20} /> : <Volume2 size={20} />}
                </motion.button>
                <div className="h-8 w-px bg-[#0E2931]/10 mx-2" />
                {(["txt", "pdf"] as const).map(fmt => (
                  <motion.button
                    key={fmt}
                    onClick={() => handleDownload(fmt)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-5 py-3 rounded-full border border-[#0E2931]/10 text-[#0E2931]/40 hover:text-[#0E2931] hover:bg-[#0E2931]/5 transition-all text-[10px] font-black uppercase tracking-widest"
                  >
                    <Download size={12} />
                    {fmt.toUpperCase()}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => { setLink(""); setText(""); setSummary(null); setError(null); setFile(null); setFileName(null); handleStopTTS(); }}
            whileHover={{ scale: 1.1, rotate: -180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="p-4 rounded-full border border-[#0E2931]/5 text-[#0E2931]/20 hover:text-[#861211] transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Summary Result */}
        <AnimatePresence>
          {summary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-12 bg-[#E2E2E0]/30 rounded-[2.5rem] border border-[#0E2931]/5 p-10 shadow-inner"
            >
              <h3 className="font-black text-xl mb-6 text-[#0E2931] uppercase tracking-tighter flex items-center gap-3">
                <motion.div
                  className="p-2 bg-white rounded-xl shadow-sm"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Brain className="w-6 h-6 text-[#861211]" />
                </motion.div>
                AI Synthesized Insight
              </h3>
              <div className="text-[#0E2931]/80 text-lg leading-relaxed whitespace-pre-line font-medium italic border-l-4 border-[#861211]/20 pl-8">
                {summary}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.4em] text-[#0E2931]/20">
        UAARN Intelligence Module • Secure Encryption Operational
      </div>
    </div>
  );
}