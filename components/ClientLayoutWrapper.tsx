"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthOrAdmin =
    pathname.startsWith("/sso") ||
    pathname.startsWith("/admin") ||
    pathname === "/login";

  return (
    <>
      {!isAuthOrAdmin && <Navbar />}
      <main className="flex-grow relative z-10">{children}</main>
      {!isAuthOrAdmin && <Footer />}
    </>
  );
}
