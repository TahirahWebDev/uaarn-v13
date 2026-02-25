"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { Menu, X, LayoutDashboard, MessageSquare, BookOpen, Info, Mail } from "lucide-react";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import UpgradeButton from "./upgradeButton";

export default function Navbar({ onOpenPlans }: { onOpenPlans: () => void }) {
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a scroll listener to change opacity when scrolling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 transition-all duration-300">
      <nav 
        className={`
          flex items-center justify-between w-full max-w-7xl px-6 py-3 
          rounded-2xl border transition-all duration-500
          ${scrolled 
            ? "bg-[#E2E2E0]/90 backdrop-blur-xl border-[#0E2931]/10 shadow-lg" 
            : "bg-white/70 backdrop-blur-md border-white/40 shadow-sm"}
        `}
      >
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative w-28 h-10 transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="UAARN Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* DESKTOP NAVIGATION - Centered & Minimal */}
        <div className="hidden lg:flex items-center bg-[#0E2931]/5 px-6 py-2 rounded-full border border-[#0E2931]/5 space-x-8 text-[#0E2931] text-[12px] font-bold uppercase tracking-widest">
          <Link href="/about" className=" text-[#2B7574] hover:text-[#861211] transition-colors">About</Link>
          <Link href="/courses" className=" text-[#2B7574] hover:text-[#861211] transition-colors">Courses</Link>
          <Link href="/ask" className="flex items-center gap-1.5 text-[#2B7574] hover:text-[#861211]">
            <MessageSquare size={14} /> Ask AI
          </Link>
          <Link href="/contact" className=" text-[#2B7574] hover:text-[#861211] transition-colors">Contact</Link>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block scale-90 origin-right">
              <UpgradeButton onClickAction={onOpenPlans} />
          </div>

          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <>
                <Link 
                  href="/role-selection" 
                  className="hidden md:flex items-center gap-2 bg-[#0E2931] text-white px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-[#12484C] transition-all"
                >
                  <LayoutDashboard size={14} /> Dashboard
                </Link>
                <div className="border-2 border-[#861211]/20 rounded-full p-0.5 hover:border-[#861211] transition-all">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-[#861211] hover:bg-[#6a0e0d] text-white px-6 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-[#861211]/10 active:scale-95">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="lg:hidden text-[#0E2931] p-2 hover:bg-[#0E2931]/5 rounded-xl transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE NAVIGATION - Drawer Style */}
        {open && (
          <div className="absolute top-[calc(100%+12px)] left-0 right-0 mx-auto w-full max-w-[95%] bg-[#E2E2E0] border border-[#0E2931]/10 rounded-3xl shadow-2xl p-8 flex flex-col space-y-6 text-[#0E2931] lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <Link href="/about" className="flex items-center gap-4 text-lg font-bold" onClick={() => setOpen(false)}>
              <Info className="text-[#861211]" /> About
            </Link>
            <Link href="/courses" className="flex items-center gap-4 text-lg font-bold" onClick={() => setOpen(false)}>
              <BookOpen className="text-[#861211]" /> Courses
            </Link>
            <Link href="/ask" className="flex items-center gap-4 text-lg font-bold text-[#2B7574]" onClick={() => setOpen(false)}>
              <MessageSquare /> Ask AI
            </Link>
            <Link href="/contact" className="flex items-center gap-4 text-lg font-bold" onClick={() => setOpen(false)}>
              <Mail className="text-[#861211]" /> Contact
            </Link>
            
            <div className="pt-4 flex flex-col gap-4">
              <div className="w-full h-px bg-[#0E2931]/10" />
              <UpgradeButton onClickAction={onOpenPlans} />
              {isSignedIn && (
                 <Link href="/role-selection" className="w-full bg-[#0E2931] text-white py-4 rounded-2xl font-bold text-center uppercase tracking-widest" onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}