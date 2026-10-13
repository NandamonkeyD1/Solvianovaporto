"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFloatingBar from "@/components/MobileFloatingBar";
import ChatbotNovi from "@/components/ChatbotNovi";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthOrAdmin =
    pathname.startsWith("/sso") ||
    pathname.startsWith("/admin") ||
    pathname === "/login";

  return (
    <div className="relative w-full max-w-full overflow-x-hidden min-h-screen flex flex-col">
      {!isAuthOrAdmin && <Navbar />}
      <main className="flex-grow relative z-10 w-full max-w-full overflow-x-hidden">{children}</main>
      {!isAuthOrAdmin && <Footer />}
      {!isAuthOrAdmin && <MobileFloatingBar />}
      {!isAuthOrAdmin && <ChatbotNovi />}
    </div>
  );
}
