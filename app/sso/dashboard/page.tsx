"use client";

import Link from "next/link";
import {
  FolderKanban,
  FileText,
  MessageSquare,
  Mail,
  Plus,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Users,
  Smartphone,
  Globe,
  Radio,
  Layers,
  Quote,
  Search,
  ExternalLink,
  Zap,
  CheckCircle2
} from "lucide-react";

export default function SSODashboardPage() {
  const trafficSources = [
    { name: "Direct Visit / Website", percentage: 42, count: "520 Pengunjung", color: "bg-blue-500" },
    { name: "WhatsApp & Chat Direct", percentage: 32, count: "396 Pengunjung", color: "bg-emerald-500" },
    { name: "Google Search (SEO)", percentage: 16, count: "198 Pengunjung", color: "bg-purple-500" },
    { name: "Social Media (Instagram)", percentage: 10, count: "126 Pengunjung", color: "bg-pink-500" },
  ];

  const serviceDemand = [
    { name: "ERP & System Integration Custom", percentage: 38, count: "13 Leads (Tinggi)", color: "bg-[#4c91ff]" },
    { name: "Sistem IoT & Smart Automation", percentage: 28, count: "9 Leads (Tinggi)", color: "bg-emerald-400" },
    { name: "E-Commerce & WhatsApp Bot", percentage: 20, count: "7 Leads (Sedang)", color: "bg-purple-400" },
    { name: "Website & Company Profile", percentage: 14, count: "4 Leads (Stabil)", color: "bg-[#ffde59]" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Dashboard Overview & Business Analytics</h1>
          <p className="text-slate-400 text-xs mt-1">Ringkasan performa analitik, tren pengunjung, dan kelola konten Solvia Nova.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live Analytics Active
          </span>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#0E1526]/80 border border-slate-800/80 rounded-2xl p-5 space-y-3 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Total Portfolio</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">13</div>
          <div className="text-emerald-400 text-[11px] font-medium flex items-center gap-1">
            <span>+2 project baru bulan ini</span>
          </div>
        </div>

        <div className="bg-[#0E1526]/80 border border-slate-800/80 rounded-2xl p-5 space-y-3 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Pengunjung Bulan Ini</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">1,240</div>
          <div className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
            <span>↑ 24% dari bulan lalu</span>
          </div>
        </div>

        <div className="bg-[#0E1526]/80 border border-slate-800/80 rounded-2xl p-5 space-y-3 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Total Leads / Pesan</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">33</div>
          <div className="text-slate-400 text-[11px] font-medium">Form Konsultasi & WA</div>
        </div>

        <div className="bg-[#0E1526]/80 border border-slate-800/80 rounded-2xl p-5 space-y-3 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold">Status Follow-Up Leads</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400">100%</div>
          <div className="text-emerald-400/90 text-[11px] font-bold">✓ Semua Leads Direspon</div>
        </div>
      </div>

      {/* ANALYTICS CHARTS SECTION */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Bar Chart (Tren Pengunjung & Leads) */}
        <div className="lg:col-span-8 bg-[#0E1526]/80 border border-slate-800 rounded-3xl p-6 space-y-6 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span>Grafik Tren Pengunjung & Conversion Leads (Mingguan)</span>
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">Pertumbuhan pengunjung unik dan peningkatan leads per minggu</p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold">
              Oktober 2026
            </span>
          </div>

          {/* Visual SVG Line & Bar Chart Graphic */}
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4 h-48 pt-6 px-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-10">
                <div className="border-b border-white w-full" />
                <div className="border-b border-white w-full" />
                <div className="border-b border-white w-full" />
              </div>

              {[
                { week: "Minggu 1", visitors: 340, leads: 5, height: "40%" },
                { week: "Minggu 2", visitors: 520, leads: 8, height: "60%" },
                { week: "Minggu 3", visitors: 890, leads: 12, height: "82%" },
                { week: "Minggu 4", visitors: 1240, leads: 33, height: "100%" },
              ].map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 z-10 group">
                  <div className="text-[10px] font-mono text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    {data.visitors} Visit ({data.leads} Leads)
                  </div>
                  <div className="w-full max-w-[48px] bg-slate-900 border border-slate-700/80 rounded-xl p-1 flex items-end justify-center h-full">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 via-blue-400 to-[#61adff] rounded-lg group-hover:brightness-125 transition-all duration-300"
                      style={{ height: data.height }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                    {data.week}
                  </span>
                </div>
              ))}
            </div>

            {/* Legend Footer */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80 px-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-blue-500" />
                  <span>Pengunjung Unik</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-400" />
                  <span>Konsultasi / Leads</span>
                </span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">Rata-rata Konversi: 2.6%</span>
            </div>
          </div>
        </div>

        {/* Right Column: Traffic Sources Breakdown */}
        <div className="lg:col-span-4 bg-[#0E1526]/80 border border-slate-800 rounded-3xl p-6 space-y-6 backdrop-blur-md shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Sumber Traffic (Acquisition)</span>
            </h3>
            <p className="text-slate-400 text-xs mt-2 mb-4">Saluran utama tempat calon klien menemukan Solvia.Nova</p>

            <div className="space-y-4">
              {trafficSources.map((source, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-200 font-semibold">{source.name}</span>
                    <span className="text-slate-400 font-mono font-bold">{source.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full ${source.color} rounded-full transition-all duration-500`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 text-right">{source.count}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-blue-300 space-y-1">
            <span className="font-bold text-white block">💡 Insight Acquisition:</span>
            <span>42% lalu lintas langsung berasal dari rekomendasi klien & portofolio publik.</span>
          </div>
        </div>
      </div>

      {/* SECOND ANALYTICS ROW: SERVICE DEMAND & DEVICE DEMOGRAPHICS */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Service Demand Chart */}
        <div className="bg-[#0E1526]/80 border border-slate-800 rounded-3xl p-6 space-y-5 backdrop-blur-md shadow-2xl">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Layanan Paling Banyak Diminati Klien</span>
          </h3>

          <div className="space-y-4">
            {serviceDemand.map((service, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-bold">{service.name}</span>
                  <span className="text-blue-300 font-mono font-bold">{service.count}</span>
                </div>
                <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full ${service.color} rounded-full transition-all duration-500`}
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Demographics & CTA Performance */}
        <div className="bg-[#0E1526]/80 border border-slate-800 rounded-3xl p-6 space-y-5 backdrop-blur-md shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-purple-400" />
              <span>Perangkat Pengunjung & Respons CTA</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 text-center">
                <Smartphone className="w-6 h-6 text-purple-400 mx-auto" />
                <div className="text-2xl font-black text-white">68%</div>
                <div className="text-slate-400 text-xs font-medium">Smartphone / Mobile</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 text-center">
                <Globe className="w-6 h-6 text-blue-400 mx-auto" />
                <div className="text-2xl font-black text-white">32%</div>
                <div className="text-slate-400 text-xs font-medium">Desktop & PC</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">Performa Tombol WhatsApp CTA</div>
              <div className="text-slate-400 text-[11px]">Respon rata-rata di bawah 15 menit</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-xs">
              Sangat Efektif
            </span>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS & KELOLA KONTEN */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-[#0E1526]/80 border border-slate-800/80 rounded-2xl p-6 space-y-4 backdrop-blur-md shadow-xl">
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
        <div className="lg:col-span-2 bg-[#0E1526]/80 border border-slate-800/80 rounded-2xl p-6 space-y-4 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Pesan & Leads Terbaru</h3>
            <Link href="/sso/messages" className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1">
              <span>Lihat semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="space-y-0.5">
                <div className="text-white text-xs font-bold">PT Maju Bersama (Budi)</div>
                <div className="text-slate-400 text-[11px] truncate max-w-md">Pengembangan ERP Custom & POS Unit 200 Karyawan...</div>
              </div>
              <span className="text-[11px] text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full font-bold border border-emerald-400/20">Ter-Followup</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="space-y-0.5">
                <div className="text-white text-xs font-bold">Filtrazon IoT Team</div>
                <div className="text-slate-400 text-[11px] truncate max-w-md">Integrasi Sensor Kualitas Air & Web Dashboard...</div>
              </div>
              <span className="text-[11px] text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full font-bold border border-emerald-400/20">Ter-Followup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
