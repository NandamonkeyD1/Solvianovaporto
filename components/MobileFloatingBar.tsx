"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Layers, MessageSquare, PhoneCall } from "lucide-react";

export default function MobileFloatingBar() {
  const pathname = usePathname();

  // Hide on SSO Admin routes
  if (pathname.startsWith("/sso") || pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/services", label: "Layanan", icon: Layers },
    { href: "/portfolio", label: "Portofolio", icon: Briefcase },
    { href: "/contact", label: "Kontak", icon: MessageSquare },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-[#020611]/90 backdrop-blur-2xl border border-blue-500/30 rounded-2xl p-2.5 shadow-2xl flex items-center justify-between gap-1">
        {navItems.map((item) => {
          const IconComp = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all flex-1 ${
                active
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-blue-950/40"
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span className="text-[10px] font-bold mt-1 tracking-tight">{item.label}</span>
            </Link>
          );
        })}

        {/* WhatsApp Direct Action Button for Mobile */}
        <a
          href="https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20tertarik%20konsultasi%20pembuatan%20sistem%20digital."
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 shrink-0 font-bold"
        >
          <PhoneCall className="w-4 h-4 animate-bounce" />
          <span className="text-[10px] mt-1">WA Chat</span>
        </a>
      </div>
    </div>
  );
}
