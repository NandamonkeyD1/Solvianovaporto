import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Cpu,
  Radio,
  Layers,
  GraduationCap,
  Users,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Target,
  Award,
  Zap,
  Building2,
  Briefcase
} from "lucide-react";
import {
  servicesData,
  portfolioData,
  testimonialsData,
  trustIndicatorsData,
  coreValuesData,
  visionPhilosophyData,
  trustedClientsData
} from "@/lib/data";
import TeamCarousel from "@/components/TeamCarousel";
import PartnerCarousel from "@/components/PartnerCarousel";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-28 sm:pb-20">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-transparent">
        {/* Glow ambient background lights */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#4c91ff]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#2775ff]/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center z-10">
          {/* Left Column */}
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full border border-blue-400/40 bg-blue-950/40 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest shadow-lg">
              <span className="dot-glow" />
              Digital Solution & Software House Modern
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight sm:leading-[1.05] tracking-tight drop-shadow-lg">
              Transformasi Digital Modern Untuk Bisnis yang Ingin <span className="text-nova-blue">Naik Level.</span>
            </h1>

            <p className="text-blue-100 text-xs sm:text-base leading-relaxed max-w-xl font-medium drop-shadow-md">
              <strong className="text-white font-extrabold">{visionPhilosophyData.filosofi}</strong>
              <br />
              Solvia Nova membantu bisnis membangun sistem digital, website, aplikasi, dan branding modern dengan visual premium dan performa profesional.
            </p>

            {/* UNIFIED HERO ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <Link
                href="/contact"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 border border-blue-400/30 flex items-center justify-center gap-2.5 active:scale-95 transition-all text-center"
              >
                <span>Konsultasi Gratis</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-bold text-sm backdrop-blur-md flex items-center justify-center gap-2 active:scale-95 transition-all text-center"
              >
                <span>Lihat Portofolio</span>
                <Briefcase className="w-4 h-4 text-blue-400" />
              </Link>
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="chip-3d text-white font-bold text-[10px] sm:text-xs py-1.5 px-3">Website Development</div>
              <div className="chip-3d text-white font-bold text-[10px] sm:text-xs py-1.5 px-3">System Development</div>
              <div className="chip-3d text-white font-bold text-[10px] sm:text-xs py-1.5 px-3">Branding & Creative</div>
              <div className="chip-3d text-white font-bold text-[10px] sm:text-xs py-1.5 px-3">Automation & AI</div>
            </div>

            {/* Stats row (Clean 2x2 grid on mobile, flex row on desktop) */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-8 pt-5 border-t border-blue-400/20">
              {trustIndicatorsData.map((item) => (
                <div key={item.title} className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">{item.stat}</div>
                  <div className="text-blue-200 text-[11px] sm:text-xs font-bold leading-snug">{item.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Dashboard Mockup */}
          <div className="relative hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-3xl scale-110" />
              <div className="relative bg-[#020611]/90 backdrop-blur-xl border border-blue-400/40 rounded-2xl p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-blue-200 text-xs font-mono font-bold">solvianova.3d.dashboard</div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    ["Total Projects", "50+", "↑ 12%", "text-blue-400"],
                    ["Active Clients", "28", "↑ 8%", "text-emerald-400"],
                    ["Performance", "99.9%", "↑ 24%", "text-violet-400"],
                  ].map(([t, v, c, colorClass]) => (
                    <div key={t} className="bg-blue-950/40 rounded-xl p-3 border border-blue-400/20">
                      <div className="text-blue-200 text-xs font-semibold mb-1.5">{t}</div>
                      <div className="text-white font-extrabold text-xl">{v}</div>
                      <div className={`text-xs mt-1 font-bold ${colorClass}`}>{c}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-950/40 rounded-xl p-4 border border-blue-400/20">
                  <div className="text-blue-200 text-xs font-bold mb-3">Project Delivery Rate & System Efficiency</div>
                  <div className="flex items-end gap-2 h-16">
                    {[60, 80, 55, 90, 75, 95, 70, 88, 65, 92, 78, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-blue-500/50 rounded-sm hover:bg-blue-400 transition-colors"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    ["E-Commerce Platform", "Next.js WebApp", "Selesai"],
                    ["ERP Manufacturing System", "Enterprise ERP", "Selesai"],
                    ["HR Management System", "Dashboard POS", "Aktif"],
                  ].map(([name, cat, status]) => (
                    <div key={name} className="flex items-center justify-between py-2 border-b border-blue-400/10">
                      <div>
                        <div className="text-white text-xs font-bold">{name}</div>
                        <div className="text-blue-200 text-xs">{cat}</div>
                      </div>
                      <span className={`text-xs font-extrabold ${status === "Selesai" ? "text-emerald-400" : "text-blue-400"}`}>
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST INDICATORS BLOCK */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustIndicatorsData.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#020611]/90 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-6 hover:border-blue-400/70 transition-all shadow-xl space-y-3"
            >
              <div className="text-3xl font-black text-[#61adff]">{t.stat}</div>
              <h3 className="text-white font-extrabold text-lg">{t.title}</h3>
              <p className="text-blue-100 text-xs leading-relaxed font-medium">{t.description}</p>
            </div>
          ))}
        </div>

        {/* DIPERCAYA OLEH (CLIENT & PARTNER LOGOS) */}
        <div className="bg-[#020611]/90 border border-blue-400/30 rounded-3xl p-8 lg:p-10 backdrop-blur-xl shadow-2xl space-y-6 text-center">
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-blue-400 text-xs font-extrabold uppercase tracking-widest block">
              DIPERCAYA OLEH MITRA & KLIEN
            </span>
            <h3 className="text-2xl font-black text-white">
              Dipercaya Oleh Perusahaan & Industri <span className="text-nova-blue">Terkemuka</span>
            </h3>
          </div>

          {/* Continuous Auto-Sliding Marquee Carousel */}
          <PartnerCarousel />
        </div>
      </section>

      {/* ABOUT SECTION & CORE VALUES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="bg-gradient-to-br from-[#020611]/90 via-[#040d23]/90 to-[#020611]/90 backdrop-blur-xl border border-blue-400/30 rounded-3xl p-8 lg:p-12 space-y-12 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wider uppercase">
                <Award className="w-3.5 h-3.5" />
                Tentang Solvia Nova
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                Bukan Sekadar Jasa Bikin Website. Partner Transformasi Digital <span className="text-nova-blue">Bisnis Anda.</span>
              </h2>
              <div className="space-y-4 text-blue-100 text-sm leading-relaxed font-medium">
                <p>
                  Solvia Nova adalah digital solution studio yang berfokus pada efisiensi, estetika visual, dan skalabilitas sistem. Kami percaya bahwa teknologi terbaik bukan hanya yang terlihat canggih, tetapi yang benar-benar membantu bisnis Anda tumbuh lebih cepat.
                </p>
                <p>
                  Setiap project yang kami kerjakan didasari oleh analisis mendalam terhadap kebutuhan bisnis, alur kerja operasional, dan pengalaman pengguna.
                </p>
              </div>
            </div>

            {/* Visi, Filosofi, Komitmen Cards */}
            <div className="space-y-4">
              <div className="bg-blue-950/40 border border-blue-400/20 rounded-2xl p-5 space-y-2">
                <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">Visi Kami</div>
                <p className="text-white text-xs font-semibold leading-relaxed">{visionPhilosophyData.visi}</p>
              </div>
              <div className="bg-blue-950/40 border border-blue-400/20 rounded-2xl p-5 space-y-2">
                <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">Filosofi Utama</div>
                <p className="text-white text-xs font-semibold leading-relaxed">{visionPhilosophyData.filosofi}</p>
              </div>
              <div className="bg-blue-950/40 border border-blue-400/20 rounded-2xl p-5 space-y-2">
                <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">Komitmen Layanan</div>
                <p className="text-white text-xs font-semibold leading-relaxed">{visionPhilosophyData.komitmen}</p>
              </div>
            </div>
          </div>

          {/* Core Values Grid */}
          <div className="pt-8 border-t border-blue-400/20 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-2xl font-black text-white">Prinsip & Nilai Utama Kami</h3>
              <p className="text-blue-100 text-xs font-medium">Fondasi yang mendasari setiap sistem dan produk digital yang kami hasilkan.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValuesData.map((val) => (
                <div key={val.id} className="bg-blue-950/40 border border-blue-400/20 rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-[#61adff]">
                    {val.icon === "Sparkles" && <Sparkles className="w-5 h-5" />}
                    {val.icon === "Users" && <Users className="w-5 h-5" />}
                    {val.icon === "ShieldCheck" && <ShieldCheck className="w-5 h-5" />}
                    {val.icon === "Target" && <Target className="w-5 h-5" />}
                  </div>
                  <h4 className="text-white font-extrabold text-base">{val.title}</h4>
                  <p className="text-blue-100 text-xs leading-relaxed font-medium">{val.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-black text-white">
            Solusi Digital yang Kami <span className="text-nova-blue">Hadirkan</span>
          </h2>
          <p className="text-blue-100 text-sm lg:text-base font-medium">
            Dari website hingga sistem enterprise, kami membangun solusi yang relevan, scalable, dan berdampak nyata.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((svc) => (
            <div
              key={svc.id}
              className="group relative bg-[#020611]/90 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-6 hover:border-blue-400/70 hover:bg-[#08183c]/95 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-[#61adff] group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {svc.icon === "Globe" && <Globe className="w-6 h-6" />}
                  {svc.icon === "Cpu" && <Cpu className="w-6 h-6" />}
                  {svc.icon === "Radio" && <Radio className="w-6 h-6" />}
                  {svc.icon === "Layers" && <Layers className="w-6 h-6" />}
                  {svc.icon === "GraduationCap" && <GraduationCap className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">{svc.category}</span>
                  <h3 className="text-xl font-extrabold text-white mt-1 group-hover:text-[#61adff] transition-colors">
                    {svc.name}
                  </h3>
                </div>
                <p className="text-blue-100 text-xs leading-relaxed font-medium">{svc.shortDesc}</p>
                <ul className="space-y-2 pt-2 border-t border-blue-400/10">
                  {svc.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-white font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-white transition-colors"
                >
                  Lihat Semua Layanan
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-[#61adff] text-xs font-bold tracking-wider uppercase">
              Portfolio
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-white">
              Karya yang Berbicara <span className="text-nova-blue">Sendiri</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-950/50 hover:bg-blue-900/60 border border-blue-400/30 text-white text-xs font-bold rounded-xl transition-all"
          >
            Lihat semua project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {portfolioData.map((project) => (
            <div
              key={project.id}
              className="bg-[#020611]/90 backdrop-blur-xl border border-blue-400/30 rounded-3xl overflow-hidden group hover:border-blue-400/70 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden border-b border-blue-400/20">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#020611]/80 backdrop-blur-md border border-blue-400/30 text-blue-300 text-xs font-bold">
                    {project.category}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-blue-300 text-[11px] font-semibold">{project.client}</div>
                    <h3 className="text-base font-extrabold text-white group-hover:text-[#61adff] transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-blue-100 text-xs leading-relaxed font-medium line-clamp-2">{project.shortDesc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-400/20 text-white text-[10px] font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="block text-center w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-lg"
                >
                  Detail Studi Kasus
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM SECTION (AUTO SLIDE CAROUSEL WITH FOUNDER IN CENTER) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wider uppercase">
              <Users className="w-3.5 h-3.5" />
              Tim Kami
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">
              Orang-Orang di Balik <span className="text-nova-blue">Solvia Nova</span>
            </h2>
            <p className="text-blue-100 text-xs lg:text-sm font-medium">
              Tim profesional yang berdedikasi membangun solusi digital terbaik untuk bisnis Anda.
            </p>
          </div>
          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-950/50 hover:bg-blue-900/60 border border-blue-400/30 text-white text-xs font-bold rounded-xl transition-all"
          >
            Kenali tim lengkap kami
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Auto-Slide Carousel Component */}
        <TeamCarousel />
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#020611] to-[#040d23] border border-blue-400/30 rounded-3xl p-8 lg:p-12 backdrop-blur-xl space-y-8 shadow-2xl">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-[#61adff] text-xs font-bold uppercase">
              <MessageSquare className="w-3.5 h-3.5" />
              Testimoni
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-white">Apa Kata Klien Kami</h2>
            <p className="text-blue-100 text-xs lg:text-sm font-medium">Kepercayaan klien adalah ukuran keberhasilan kami yang sesungguhnya.</p>
          </div>
          {/* Infinite Auto-Sliding Testimonial Marquee */}
          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-blue-950/90 via-[#020611] to-blue-900/90 border border-blue-400/30 rounded-3xl p-10 lg:p-16 space-y-6 backdrop-blur-xl shadow-2xl">
          <span className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
            Mulai Sekarang
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-white max-w-3xl mx-auto leading-tight">
            Bangun Sistem Digital yang Membuat Bisnis Anda Lebih <span className="text-nova-blue">Profesional.</span>
          </h2>
          <p className="text-blue-100 text-sm lg:text-base max-w-xl mx-auto font-medium">
            Konsultasikan kebutuhan digital bisnis Anda bersama tim Solvia Nova. Gratis, tanpa komitmen.
          </p>
          {/* UNIFIED CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-4 max-w-md sm:max-w-none mx-auto">
            <Link
              href="/contact"
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 border border-blue-400/30 flex items-center justify-center gap-2.5 active:scale-95 transition-all w-full sm:w-auto"
            >
              <span>Mulai Proyek Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/6283148801578"
              target="_blank"
              rel="noreferrer"
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 hover:-translate-y-0.5 border border-emerald-400/30 flex items-center justify-center gap-2.5 active:scale-95 transition-all w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Konsultasi WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

