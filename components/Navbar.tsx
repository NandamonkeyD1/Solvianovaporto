"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/services", label: "Layanan" },
    { href: "/portfolio", label: "Portofolio" },
    { href: "/team", label: "Tim" },
    { href: "/articles", label: "Artikel" },
    { href: "/gallery", label: "Galeri" },
    { href: "/about", label: "Tentang Kami" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#020611]/90 backdrop-blur-xl border-b border-blue-500/20 py-2.5 sm:py-3.5 shadow-2xl"
          : "bg-transparent py-3.5 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-500 to-[#61adff] p-0.5 shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-[#020611] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#4c91ff]" />
            </div>
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">
            Solvia.<span className="text-nova-blue">Nova</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-950/20 border border-blue-500/20 backdrop-blur-md">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/40"
                    : "text-slate-300 hover:text-white hover:bg-blue-600/20"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button for Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105 border border-blue-400/30"
          >
            <span>Konsultasi Proyek</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2.5 rounded-xl bg-blue-950/50 border border-blue-500/30 text-white hover:bg-blue-900/40 transition-colors shadow-md active:scale-95"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-6 h-6 text-blue-400" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#020611]/95 backdrop-blur-2xl border-b border-blue-500/20 px-6 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all active:scale-98 ${
                  pathname === link.href
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40"
                    : "text-slate-300 hover:bg-blue-900/30 hover:text-white border border-transparent"
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}
          </div>

          {/* Mobile Specific Action Buttons */}
          <div className="pt-3 border-t border-blue-500/20 space-y-2.5">
            <a
              href="https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20tertarik%20konsultasi%20proyek."
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 shadow-lg shadow-emerald-900/40 border border-emerald-400/30 active:scale-95 transition-all text-center"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Chat WhatsApp (Respon Cepat)</span>
            </a>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md border border-blue-400/30 active:scale-95 transition-all text-center"
            >
              <span>Form Konsultasi Proyek</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
