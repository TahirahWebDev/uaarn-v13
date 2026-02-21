"use client";

import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { client } from "@/sanity/lib/client";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, Zap } from "lucide-react";
import SlideIn from "../components/animations/SlideIn";
import FadeIn from "../components/animations/FadeIn";
import FloatingElement from "../components/animations/FloatingElement";

interface Course {
  _id: string;
  title: string;
  platform: string;
  image: string;
  link: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const platforms = ["All", ...Array.from(new Set(courses.map((c) => c.platform))).sort()];
  const filtered = filter === "All" ? courses : courses.filter((c) => c.platform === filter);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "course"]{
            _id, title, platform,
            "image": image.asset->url, link
          } | order(_createdAt desc)
        `);
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#E2E2E0] py-20 px-8 selection:bg-[#861211]/20 relative overflow-hidden">

      {/* Animated background blobs */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2B7574]/6 blur-[120px] rounded-full pointer-events-none -z-10"
        animate={{ scale: [1, 1.12, 1], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#861211]/5 blur-[120px] rounded-full pointer-events-none -z-10"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating particles */}
      {[...Array(4)].map((_, i) => (
        <FloatingElement key={i} delay={i * 0.7} amplitude={10} duration={2.5 + i * 0.5}>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: [6, 9, 5, 8][i],
              height: [6, 9, 5, 8][i],
              background: i % 2 === 0 ? "#2B7574" : "#861211",
              opacity: 0.12,
              left: `${[8, 92, 20, 78][i]}%`,
              top: `${[20, 30, 70, 60][i]}%`,
            }}
          />
        </FloatingElement>
      ))}

      {/* Heading Section */}
      <div className="max-w-6xl mx-auto text-center mb-16 flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#0E2931]/10 text-[10px] font-black uppercase tracking-[0.3em] text-[#0E2931]/40 shadow-sm"
        >
          <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <BookOpen size={12} className="text-[#861211]" />
          </motion.div>
          Knowledge Base • UAARN v9
        </motion.div>

        <SlideIn direction="up" className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-black text-[#0E2931] uppercase tracking-tighter mb-4">
            Explore{" "}
            <motion.span
              className="text-[#861211] inline-block"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Top Courses
            </motion.span>
          </h2>
          <p className="text-[#0E2931]/60 mt-4 text-lg font-medium italic">
            Learn from world-class platforms like Coursera — and let AI summarize
            your lessons in seconds.
          </p>
        </SlideIn>

        {/* Animated divider */}
        <motion.div
          className="mt-8 h-[2px] bg-gradient-to-r from-transparent via-[#861211]/30 to-transparent rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      {/* Filter bar — shown once courses load */}
      <AnimatePresence>
        {!loading && courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-12 max-w-6xl mx-auto"
          >
            {platforms.map((p, i) => (
              <motion.button
                key={p}
                onClick={() => setFilter(p)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${filter === p
                    ? "bg-[#0E2931] text-white border-[#0E2931] shadow-xl"
                    : "bg-white text-[#0E2931]/50 border-[#0E2931]/10 hover:bg-[#E2E2E0]/60 hover:text-[#0E2931]"
                  }`}
              >
                {p}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-4 border-[#0E2931]/10 border-t-[#861211] rounded-full"
            />
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[#0E2931]/50 font-black uppercase tracking-[0.3em] text-xs"
            >
              Synchronizing Courses...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!loading && courses.length === 0 && (
        <FadeIn>
          <div className="flex flex-col items-center gap-4 py-20">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 bg-[#0E2931]/5 rounded-3xl flex items-center justify-center text-[#0E2931]/20"
            >
              <Sparkles size={32} />
            </motion.div>
            <p className="text-center text-[#0E2931]/50 font-medium">No courses added yet. Please check back soon.</p>
          </div>
        </FadeIn>
      )}

      {/* Course Grid */}
      <AnimatePresence mode="wait">
        {!loading && filtered.length > 0 && (
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          >
            {filtered.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <CourseCard
                  title={course.title}
                  platform={course.platform}
                  image={course.image}
                  link={course.link}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom branding */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 flex justify-center items-center gap-3"
      >
        <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <Zap size={12} className="text-[#861211]/30" />
        </motion.div>
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0E2931]/20">
          UAARN Educational Resilience Network
        </div>
      </motion.div>
    </div>
  );
}