import Link from "next/link";
import { Globe, Cpu, Radio, Layers, GraduationCap, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { servicesData } from "@/lib/data";

export default function ServicesPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-28 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
      {/* Header Centered */}
      <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-[10px] sm:text-xs font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          Layanan & Solusi Digital Solvia Nova
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
          Solusi Digital <span className="text-nova-blue">Terpadu & Modern</span>
        </h1>
        <p className="text-blue-100 text-xs sm:text-base leading-relaxed font-medium">
          Pengembangan software custom, sistem enterprise ERP, jaringan sensor IoT industri, hingga program mentoring teknis IT privat.
        </p>
      </div>

      {/* Services Grid (6 Balanced Cards in 3 Columns) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {servicesData.map((svc) => (
          <div
            key={svc.id}
            className="group bg-[#020611]/90 backdrop-blur-xl border border-blue-400/30 rounded-3xl p-6 sm:p-8 space-y-5 sm:space-y-6 hover:border-blue-400/70 hover:bg-[#08183c]/90 transition-all duration-300 shadow-2xl flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-[#61adff] group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-lg">
                {svc.icon === "Globe" && <Globe className="w-7 h-7" />}
                {svc.icon === "Cpu" && <Cpu className="w-7 h-7" />}
                {svc.icon === "Radio" && <Radio className="w-7 h-7" />}
                {svc.icon === "Layers" && <Layers className="w-7 h-7" />}
                {svc.icon === "GraduationCap" && <GraduationCap className="w-7 h-7" />}
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">{svc.category}</span>
                <h2 className="text-2xl font-black text-white mt-1 group-hover:text-[#61adff] transition-colors">{svc.name}</h2>
              </div>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed font-medium">{svc.shortDesc}</p>

              <div className="space-y-3 pt-4 border-t border-blue-400/15">
                <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">Fitur Utama:</h4>
                <div className="space-y-2">
                  {svc.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-white font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6">
              {/* DESKTOP BUTTON */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] border border-blue-400/30"
              >
                <span>Konsultasikan Solusi Ini</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              {/* MOBILE BUTTON */}
              <Link
                href="https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20tertarik%20dengan%20layanan%20ini."
                target="_blank"
                rel="noreferrer"
                className="flex sm:hidden items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black rounded-2xl shadow-md border border-emerald-400/30 active:scale-95 transition-all text-center"
              >
                <span>💬 Tanya Layanan via WA</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Consultation Banner (Centered & Rich) */}
      <div className="bg-gradient-to-r from-blue-950/90 via-[#020611] to-blue-900/90 border border-blue-400/30 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 backdrop-blur-xl shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-[#61adff] mx-auto">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-4xl font-black text-white">Butuh Solusi Custom yang Spesifik?</h3>
          <p className="text-blue-100 text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Tim konsultan teknis Solvia Nova siap menganalisis alur bisnis Anda dan merancang sistem digital yang scalable, aman, dan efisien.
          </p>
        </div>

        {/* DESKTOP BUTTONS */}
        <div className="hidden sm:flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-xl shadow-blue-600/30 hover:scale-105 border border-blue-400/30"
          >
            <span>Konsultasi Gratis Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/6283148801578"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl transition-all shadow-xl shadow-emerald-600/30 hover:scale-105 border border-emerald-400/30"
          >
            <span>Chat via WhatsApp</span>
          </a>
        </div>

        {/* MOBILE BUTTONS */}
        <div className="flex sm:hidden flex-col gap-3 pt-2 w-full">
          <a
            href="https://wa.me/6283148801578"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black text-xs rounded-2xl shadow-xl border border-emerald-400/30 active:scale-95 transition-all text-center"
          >
            <span>💬 Konsultasi WA Instant</span>
          </a>
          <Link
            href="/contact"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md border border-blue-400/30 active:scale-95 transition-all text-center"
          >
            <span>Form Konsultasi Proyek</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
