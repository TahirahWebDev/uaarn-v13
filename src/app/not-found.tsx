"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#E2E2E0] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-9xl font-black text-[#0E2931] tracking-tighter">404</h1>
                <p className="text-[#0E2931]/50 text-xl font-medium mt-4 uppercase tracking-widest">Page not found</p>
                <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-[#861211] text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-[#6a0e0d] transition-colors"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
