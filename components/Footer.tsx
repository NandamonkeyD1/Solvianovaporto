import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin, Github, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-blue-500/20 bg-[#020611]/90 backdrop-blur-xl pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-blue-400/20">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 via-blue-500 to-[#61adff] p-0.5">
                <div className="w-full h-full bg-[#020611] rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#61adff]" />
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Solvia.<span className="text-nova-blue">Nova</span>
              </span>
            </Link>
            <p className="text-blue-100 text-xs leading-relaxed max-w-sm font-medium">
              <strong className="text-white font-bold">Understand Problems First, Build Solutions.</strong><br />
              Ekosistem teknologi digital modern, WebGL 3D, otomasi AI, dan solusi perangkat lunak yang dirancang untuk skala bisnis Anda.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-blue-950/40 border border-blue-400/20 flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-600/30 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-blue-950/40 border border-blue-400/20 flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-600/30 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-blue-950/40 border border-blue-400/20 flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-600/30 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Navigasi</h4>
            <ul className="space-y-2.5 text-xs text-blue-100 font-medium">
              <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Layanan Digital</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portofolio & Studi Kasus</Link></li>
              <li><Link href="/team" className="hover:text-white transition-colors">Tim Solvia</Link></li>
              <li><Link href="/articles" className="hover:text-white transition-colors">Artikel & Berita</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Layanan Utama</h4>
            <ul className="space-y-2.5 text-xs text-blue-100 font-medium">
              <li><Link href="/services" className="hover:text-white transition-colors">Website Development</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">System Development & ERP</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Branding & Creative Design</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Automation & AI Workflow</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Kontak</h4>
            <ul className="space-y-3 text-xs text-blue-100 font-medium">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#61adff]" />
                <span>info@solvianova.id</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#61adff]" />
                <a href="https://wa.me/6283148801578" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  +62 831-4880-1578
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#61adff] shrink-0 mt-0.5" />
                <span>Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-blue-300 font-medium">
          <p>© {new Date().getFullYear()} Solvia Nova — Digital Solution Studio. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link href="/sso" className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-[#61adff] hover:bg-blue-600 hover:text-white transition-all font-bold">
              Admin SSO Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

