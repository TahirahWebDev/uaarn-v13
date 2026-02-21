"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Page() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      const role = user.unsafeMetadata.role;
      if (!role) router.push("/select-role");
      else if (role === "Teacher") router.push("/teacher-dashboard");
      else if (role === "Student") router.push("/student-dashboard");
      else router.push("/");
    }
  }, [isSignedIn, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E2E2E0] p-6 relative overflow-hidden selection:bg-[#861211]/20">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#2B7574]/12 to-transparent blur-[100px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#861211]/6 blur-[100px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating brand badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          whileHover={{ scale: 1.04 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#0E2931]/10 text-[#0E2931] text-[10px] font-black uppercase tracking-widest shadow-md"
        >
          <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#2B7574]" />
          </motion.div>
          UAARN Platform • Secure Access
        </motion.div>
      </motion.div>

      {/* Sign-in card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10"
      >
        <SignIn
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/role-selection"
          forceRedirectUrl="/role-selection"
        />
      </motion.div>
    </div>
  );
}
