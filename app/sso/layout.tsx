"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  Layers,
  Tag,
  Image as ImageIcon,
  Users,
  FileText,
  Star,
  Mail,
  Search,
  FileSpreadsheet,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles
} from "lucide-react";

export default function SSOLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If on the login page /sso (exact), do not render the sidebar layout
  if (pathname === "/sso" || pathname === "/sso/") {
    return <>{children}</>;
  }

  const navItems = [
    { href: "/sso/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/sso/portfolio", label: "Portfolio", icon: Globe },
    { href: "/sso/services", label: "Services", icon: Layers },
    { href: "/sso/categories", label: "Kategori", icon: Tag },
    { href: "/sso/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/sso/team", label: "Team", icon: Users },
    { href: "/sso/articles", label: "Articles", icon: FileText },
    { href: "/sso/testimonials", label: "Testimonials", icon: Star },
    { href: "/sso/messages", label: "Messages", icon: Mail },
    { href: "/sso/seo", label: "SEO", icon: Search },
    { href: "/sso/invoice", label: "Invoice", icon: FileSpreadsheet },
    { href: "/sso/settings", label: "Settings", icon: Settings },
  ];

  const getPageTitle = () => {
    if (pathname.includes("/seo")) return "SEO Management";
    if (pathname.includes("/settings")) return "Settings — Admin Solvia Nova";
    if (pathname.includes("/invoice")) return "Invoice";
    if (pathname.includes("/messages")) return "Messages";
    if (pathname.includes("/portfolio")) return "Portfolio Management";
    if (pathname.includes("/services")) return "Services Management";
    if (pathname.includes("/categories")) return "Kategori Management";
    if (pathname.includes("/gallery")) return "Gallery Management";
    if (pathname.includes("/team")) return "Team Management";
    if (pathname.includes("/articles")) return "Articles Management";
    if (pathname.includes("/testimonials")) return "Testimonials Management";
    return "Dashboard";
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col md:flex-row antialiased font-sans">
      {/* Sidebar Overlay for Mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar (Matching Screenshots) */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-50 w-64 bg-[#0A0E1A] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header Brand */}
          <div className="p-6 flex items-center justify-between border-b border-slate-800/60">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Solvia <span className="text-blue-400">Nova</span>
              </span>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const IconComp = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-md"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${active ? "text-blue-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Footer Link */}
          <div className="p-4 border-t border-slate-800/60">
            <Link
              href="/sso"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-4 h-4 text-slate-400" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Right Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#0A0E1A]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-white tracking-wide">{getPageTitle()}</h1>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold transition-all"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
              S
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
