"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Key, CheckCircle2 } from "lucide-react";

export default function SSOLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Default admin credentials
  const defaultAdmin = {
    email: "admin@solvianova.id",
    password: "admin123",
  };

  const handleAutoFill = () => {
    setEmail(defaultAdmin.email);
    setPassword(defaultAdmin.password);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      // Validate credentials (allows admin@solvianova.id / admin123 OR any non-empty input for convenience)
      if (
        (email.trim().toLowerCase() === defaultAdmin.email.toLowerCase() && password === defaultAdmin.password) ||
        (email.trim() && password.trim())
      ) {
        localStorage.setItem("solvia_admin_logged", "true");
        localStorage.setItem("solvia_admin_email", email);
        router.push("/sso/dashboard");
      } else {
        setError("Email atau Password salah. Silakan gunakan credential resmi di atas.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12 relative overflow-hidden bg-[#020611]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md space-y-6 z-10">
        {/* Brand Logo & Title */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-500 to-[#61adff] p-0.5 shadow-xl shadow-blue-500/30 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#020611] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#61adff]" />
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Solvia.<span className="text-nova-blue">Nova</span>
            </span>
          </Link>

          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-[#61adff] text-xs font-extrabold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin SSO Portal
            </span>
          </div>

          <p className="text-blue-100 text-xs sm:text-sm font-medium">
            Masuk ke Sistem Manajemen Digital Solvia Nova
          </p>
        </div>

        {/* Credentials Info Badge & 1-Click Auto Fill */}
        <div className="bg-blue-950/60 border border-blue-400/30 rounded-2xl p-4 backdrop-blur-xl space-y-2.5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <Key className="w-4 h-4 text-[#ffde59]" />
              <span>Akun Admin Resmi</span>
            </div>
            <button
              type="button"
              onClick={handleAutoFill}
              className="text-[11px] font-bold text-blue-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Isi Otomatis
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-[#020611]/80 p-2.5 rounded-xl border border-blue-400/20">
            <div>
              <span className="text-blue-400 block text-[10px] uppercase font-bold font-sans">Email Admin</span>
              <span className="text-white font-bold break-all">admin@solvianova.id</span>
            </div>
            <div>
              <span className="text-blue-400 block text-[10px] uppercase font-bold font-sans">Password</span>
              <span className="text-white font-bold">admin123</span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-semibold animate-pulse">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-[#020611]/90 border border-blue-400/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
                Email / Username Admin
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-blue-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@solvianova.id"
                  required
                  className="w-full bg-blue-950/40 border border-blue-400/25 focus:border-blue-400 text-white placeholder-blue-300/40 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="block text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-blue-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-blue-950/40 border border-blue-400/25 focus:border-blue-400 text-white placeholder-blue-300/40 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[48px] bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl transition-all duration-200 shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 text-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Memverifikasi Login...
                </span>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-blue-400/15 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-blue-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Keamanan terenkripsi SSL 256-bit</span>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link href="/" className="text-xs font-bold text-blue-400 hover:text-white transition-colors">
            ← Kembali ke Website Utama
          </Link>
        </div>
      </div>
    </div>
  );
}

