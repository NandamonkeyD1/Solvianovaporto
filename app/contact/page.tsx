"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-24 sm:pt-32 pb-28 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
      <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
          Hubungi Tim Solvia.Nova
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white">
          Mari Wujudkan <span className="text-nova-yellow">Solusi Anda</span>
        </h1>
        <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
          Diskusikan kebutuhan proyek Web App, Custom System, atau solusi IoT Anda bersama kami.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-6 sm:space-y-8 bg-[#08183c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Informasi Kontak</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Tim konsultan teknis kami siap mendengarkan kebutuhan bisnis Anda dan memberikan gambaran arsitektur sistem terbaik.
          </p>

          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-[#ffde59]">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-slate-400 text-xs">Email Kami</div>
                <div className="text-white font-bold text-sm">info@solvianova.id</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-[#ffde59]">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-slate-400 text-xs">Telepon / WhatsApp</div>
                <div className="text-white font-bold text-sm">+62 812-3456-7890</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-[#ffde59]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-slate-400 text-xs">Lokasi Headquarter</div>
                <div className="text-white font-bold text-sm">Jakarta, Indonesia</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#08183c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
          <h2 className="text-2xl font-bold text-white">Kirim Pesan</h2>

          {status === "success" && (
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Pesan Anda telah berhasil terkirim! Tim kami akan segera menghubungi Anda.</span>
            </div>
          )}

          {status === "error" && (
            <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold">
              Gagal mengirim pesan. Silakan coba beberapa saat lagi.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Nama Lengkap</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Alamat Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="nama@perusahaan.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Subjek / Topik Proyek</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Konsultasi WebApp 3D / IoT System"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Pesan & Detail Kebutuhan</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Jelaskan kebutuhan dan ide proyek Anda secara singkat..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            {/* DESKTOP SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="hidden sm:flex w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-blue-600/40 hover:shadow-blue-500/60 hover:-translate-y-0.5 items-center justify-center gap-2 border border-blue-400/30"
            >
              {status === "loading" ? "Mengirim Pesan..." : "Kirim Form Pesan Proyek"}
              <Send className="w-4 h-4" />
            </button>

            {/* MOBILE SUBMIT & WA CTA */}
            <div className="flex sm:hidden flex-col gap-3">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm transition-all shadow-lg shadow-blue-900/40 active:scale-95 flex items-center justify-center gap-2 border border-blue-400/30"
              >
                {status === "loading" ? "Mengirim..." : "⚡ Kirim Form Sekarang"}
                <Send className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20ingin%20konsultasi%20langsung."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs active:scale-95 transition-all text-center flex items-center justify-center gap-2 shadow-md"
              >
                <span>Atau Chat Langsung via WhatsApp</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
