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
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-50">
      <div className="bg-[#020611]/95 backdrop-blur-2xl border border-blue-400/40 rounded-2xl p-1.5 shadow-2xl shadow-blue-950/80 flex items-center justify-between gap-1">
        {navItems.map((item) => {
          const IconComp = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-2.5 rounded-xl transition-all active:scale-95 flex-1 ${
                active
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/40 border border-blue-400/30"
                  : "text-slate-400 hover:text-white hover:bg-blue-950/40"
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span className="text-[10px] font-extrabold mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}

        {/* WhatsApp Direct Action Button for Mobile */}
        <a
          href="https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20tertarik%20konsultasi%20pembuatan%20sistem%20digital."
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-900/50 shrink-0 font-extrabold active:scale-95 border border-emerald-400/30"
        >
          <PhoneCall className="w-4 h-4 animate-bounce" />
          <span className="text-[10px] mt-0.5">WA Chat</span>
        </a>
      </div>
    </div>
  );
}
