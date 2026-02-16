import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "UAARN - AI-Powered Education",
  description: "Your intelligent study companion",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-[#E2E2E0] text-[#0E2931] flex flex-col relative">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}