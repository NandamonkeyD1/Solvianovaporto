import { Layers, Globe, Mail, TrendingUp, LucideIcon } from "lucide-react";
import { servicesData, portfolioData } from "@/lib/data";

interface StatCardProps {
  title: string;
  count: string | number;
  sub: string;
  icon: LucideIcon;
}

const stats: StatCardProps[] = [
  { title: "Total Layanan", count: servicesData.length, sub: "Active Services", icon: Layers },
  { title: "Portofolio", count: portfolioData.length, sub: "Published Projects", icon: Globe },
  { title: "Pesan Masuk", count: 14, sub: "Unread Messages", icon: Mail },
  { title: "Server Health", count: "99.9%", sub: "Next.js App Router", icon: TrendingUp },
];

export default function AdminDashboardPage() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            Dashboard Management
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-mono">
              Solvia.Nova Admin
            </span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Kelola layanan, studi kasus portofolio, dan pesan masuk.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div key={idx} className="bg-[#08183c]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">{item.title}</span>
                <IconComponent className="w-5 h-5 text-[#ffde59]" />
              </div>
              <div className="text-2xl font-bold text-white">{item.count}</div>
              <div className="text-slate-500 text-[11px]">{item.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Services Table */}
        <div className="bg-[#08183c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Daftar Layanan Digital</h3>
          <div className="space-y-3">
            {servicesData.map((svc) => (
              <div key={svc.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <div className="text-white text-xs font-semibold">{svc.name}</div>
                  <div className="text-slate-400 text-[11px]">{svc.category}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                  Aktif
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Table */}
        <div className="bg-[#08183c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Studi Kasus Portofolio</h3>
          <div className="space-y-3">
            {portfolioData.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <div className="text-white text-xs font-semibold">{p.name}</div>
                  <div className="text-slate-400 text-[11px]">{p.client}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-semibold">
                  {p.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
