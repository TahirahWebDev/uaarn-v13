"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import UpgradeButton from "./upgradeButton";
import { motion } from "framer-motion";

// Update the function signature to remove onOpenPlans
import PlansModal from "./PlansModal";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const handleOpenPlans = () => setIsModalOpen(true);

  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-[#E2E2E0]/80 backdrop-blur-md"
      >
        {/* Animated Bottom Border */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[1px] bg-[#0E2931]/10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
          style={{ originX: 0 }}
        />
        {/* LOGO SECTION */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-36 h-12 overflow-hidden rounded-xl p-1.5 transition-all">
              <Image
                src="/logo.png"
                alt="UAARN Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </motion.div>

        {/* DESKTOP NAVIGATION */}
        <motion.div
          variants={itemVariants}
          className="hidden lg:flex items-center space-x-2 text-[#0E2931] text-[13px] font-black uppercase tracking-[0.1em]"
        >
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Courses", path: "/courses" },
            { name: "Ask AI", path: "/ask" },
            { name: "Contact", path: "/contact" },
          ].map((link) => {
            const isHovered = hoveredPath === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className="relative px-3 py-2"
                onMouseEnter={() => setHoveredPath(link.path)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                <span className={`relative z-10 transition-colors duration-300 ${isHovered ? "text-[#861211]" : "text-[#0E2931]"}`}>
                  {link.name}
                </span>

                {/* The Pro Center-Out Underline */}
                <motion.div
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#861211]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ originX: 0.5 }}
                />
              </Link>
            );
          })}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-6">
            <Link href="/role-selection" className="bg-[#0E2931] text-white px-5 py-2.5 rounded-full hover:bg-[#12484C] transition-all shadow-md">Dashboard</Link>
          </motion.div>
        </motion.div>

        {/* ACTION BUTTONS */}
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <motion.div className="hidden sm:block scale-95" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {/* Pass onOpenPlans to UpgradeButton */}
            <UpgradeButton onClickAction={handleOpenPlans} />
          </motion.div>

          <div className="flex items-center">
            {isSignedIn ? (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <div className="border-2 border-[#861211]/20 rounded-full p-0.5 hover:border-[#861211] transition-all">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </motion.div>
            ) : (
              <SignInButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#6a0e0d" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#861211] text-white px-7 py-3 rounded-full font-black text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-[#861211]/20"
                >
                  Sign In
                </motion.button>
              </SignInButton>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden text-[#0E2931] p-1 hover:bg-[#0E2931]/5 rounded-lg transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </motion.div>

        {/* MOBILE NAVIGATION */}
        {open && (
          <div className="absolute top-full left-0 w-full bg-[#E2E2E0] border-t border-[#0E2931]/10 shadow-2xl flex flex-col items-center py-12 space-y-8 text-[#0E2931] lg:hidden animate-in fade-in slide-in-from-top-5 duration-300">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Courses", path: "/courses" },
              { name: "Ask AI", path: "/ask" },
              { name: "Contact", path: "/contact" },
              { name: "Dashboard", path: "/role-selection" }
            ].map((link) => {
              const isHovered = hoveredPath === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className="relative text-lg font-black uppercase tracking-[0.2em] px-2 py-1"
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  <span className={`relative z-10 transition-colors duration-300 ${isHovered ? "text-[#861211]" : "text-[#0E2931]"}`}>
                    {link.name}
                  </span>
                  {/* Mobile Center-Out Underline */}
                  <motion.div
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#861211]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ originX: 0.5 }}
                  />
                </Link>
              );
            })}

            <div className="pt-6 flex flex-col items-center gap-6 w-full px-10">
              <div className="w-full h-px bg-[#0E2931]/10" />
              {/* Pass onOpenPlans to UpgradeButton in Mobile View */}
              <UpgradeButton onClickAction={handleOpenPlans} />
              {!isSignedIn && (
                <SignInButton mode="modal">
                  <button className="w-full bg-[#0E2931] text-white py-5 rounded-full font-black text-sm uppercase tracking-[0.2em]">
                    Initialize Session
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        )}
      </motion.nav>
      {isModalOpen && (
        <PlansModal onCloseAction={() => setIsModalOpen(false)} />
      )}
    </>
  );
}