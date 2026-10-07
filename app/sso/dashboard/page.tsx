"use client";

import Link from "next/link";
import {
  FolderKanban,
  FileText,
  MessageSquare,
  Mail,
  Plus,
  ArrowRight,
  Briefcase,
  Layers,
  Image as ImageIcon,
  Users,
  Quote,
  Search,
  ExternalLink
} from "lucide-react";

export default function SSODashboardPage() {
  return (
    <div className="space-y-8">
      {/* Top Welcome & Metrics */}
      <div>
        <h1 className="text-2xl font-black text-white">Dashboard Overview</h1>
        <p className="text-slate-400 text-xs mt-1">Selamat datang kembali! Ringkasan statistik dan kelola konten Solvia Nova.</p>
      </div>

      {/* 4 Stat Metric Cards matching Screen 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#0E1526]/80 border border-slate-800/80 rounded-2xl p-5 space-y-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Total Portfolio</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">13</div>
          <div className="text-emerald-400 text-[11px] font-medium flex items-center gap-1">
            <span>+2 bulan ini</span>
          </div>
        </div>

        <div className="bg-[#0E1526]/80 border border-slate-800/80 rounded-2xl p-5 space-y-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Total Artikel</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">3</div>
          <div className="text-slate-400 text-[11px] font-medium">Draft & Published</div>
        </div>

        <div className="bg-[#0E1526]/80 border border-slate-800/80 rounded-2xl p-5 space-y-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Total Pesan</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">33</div>
          <div className="text-slate-400 text-[11px] font-medium">Dari Form Kontak</div>
        </div>

        <div className="bg-[#0E1526]/80 border border-slate-800/80 rounded-2xl p-5 space-y-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Pesan Belum Dibaca</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400">0</div>
          <div className="text-emerald-400/80 text-[11px] font-bold flex items-center gap-1">
            <span>✓ 100% Leads Ter-Followup</span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Quick Actions + Pesan Terbaru */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-[#0E1526]/80 border border-slate-800/80 rounded-2xl p-6 space-y-4 backdrop-blur-md">
          <h3 className="text-base font-bold text-white">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/sso/portfolio"
              className="flex items-center gap-2 p-3 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-300 hover:bg-blue-600 hover:text-white transition-all text-xs font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Portfolio</span>
            </Link>
            <Link
              href="/sso/articles"
              className="flex items-center gap-2 p-3 rounded-xl bg-purple-600/15 border border-purple-500/30 text-purple-300 hover:bg-purple-600 hover:text-white transition-all text-xs font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Tulis Artikel</span>
            </Link>
            <Link
              href="/sso/gallery"
              className="flex items-center gap-2 p-3 rounded-xl bg-emerald-600/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all text-xs font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Gallery</span>
            </Link>
            <Link
              href="/sso/team"
              className="flex items-center gap-2 p-3 rounded-xl bg-cyan-600/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-600 hover:text-white transition-all text-xs font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Tim</span>
            </Link>
          </div>
        </div>

        {/* Pesan Terbaru */}
        <div className="lg:col-span-2 bg-[#0E1526]/80 border border-slate-800/80 rounded-2xl p-6 space-y-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Pesan Terbaru</h3>
            <Link href="/sso/messages" className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1">
              <span>Lihat semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="space-y-0.5">
                <div className="text-white text-xs font-bold">xfhsroeksh</div>
                <div className="text-slate-400 text-[11px] truncate max-w-md">Solvia Nova konsultasi pembuatan website ERP & POS Custom...</div>
              </div>
              <span className="text-[11px] text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full font-bold border border-amber-400/20">Belum dibaca</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="space-y-0.5">
                <div className="text-white text-xs font-bold">mhsnhfhusn</div>
                <div className="text-slate-400 text-[11px] truncate max-w-md">Penawaran kerjasama periklanan digital reklame...</div>
              </div>
              <span className="text-[11px] text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full font-bold border border-amber-400/20">Belum dibaca</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Kelola Konten */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">Kelola Konten Website</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "Portfolio", count: "13 Portfolio Published", href: "/sso/portfolio", icon: FolderKanban, color: "text-blue-400", bg: "bg-blue-500/10" },
            { title: "Services", count: "0 Layanan Digital", href: "/sso/services", icon: Layers, color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { title: "Gallery", count: "6 Dokumen & Foto", href: "/sso/gallery", icon: ImageIcon, color: "text-purple-400", bg: "bg-purple-500/10" },
            { title: "Team", count: "2 Core Team Members", href: "/sso/team", icon: Users, color: "text-cyan-400", bg: "bg-cyan-500/10" },
            { title: "Articles", count: "3 Blog Posts", href: "/sso/articles", icon: FileText, color: "text-yellow-400", bg: "bg-yellow-500/10" },
            { title: "Testimonials", count: "0 Ulasan Klien", href: "/sso/testimonials", icon: Quote, color: "text-pink-400", bg: "bg-pink-500/10" },
            { title: "Messages", count: "33 Pesan Kontak", href: "/sso/messages", icon: Mail, color: "text-indigo-400", bg: "bg-indigo-500/10" },
            { title: "SEO Settings", count: "Meta, Sitemap & Robots", href: "/sso/seo", icon: Search, color: "text-rose-400", bg: "bg-rose-500/10" },
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group bg-[#0E1526]/80 hover:bg-[#131C33] border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 space-y-3 backdrop-blur-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{item.count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
