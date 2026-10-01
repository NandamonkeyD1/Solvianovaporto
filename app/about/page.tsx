import { Sparkles, ShieldCheck, Zap, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-8 space-y-20">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
          Tentang Solvia.Nova
        </div>
        <h1 className="text-4xl lg:text-6xl font-extrabold text-white">
          Digital Solution Studio <span className="text-nova-yellow">Terpercaya</span>
        </h1>
        <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
          <strong className="text-white">Understand Problems First, Build Solutions.</strong><br />
          Kami adalah tim engineer dan desainer digital yang berfokus pada pembangunan solusi perangkat lunak bernilai tinggi untuk memecahkan tantangan bisnis nyata.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: ShieldCheck,
            title: "Analisis Berbasis Problem",
            desc: "Kami tidak sekadar menulis kode. Kami mendalami alur bisnis Anda untuk merancang arsitektur sistem yang tepat sasaran."
          },
          {
            icon: Zap,
            title: "Performa & Skalabilitas",
            desc: "Dibangun dengan Next.js App Router & Three.js 3D WebGL untuk memberikan kecepatan akses kilat dan tampilan visual memukau."
          },
          {
            icon: Users,
            title: "Dukungan Berkelanjutan",
            desc: "Kami mendampingi implementasi dari tahap ideasi, pengembangan, hingga pemeliharaan server & cloud secara penuh."
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-[#08183c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-4 hover:border-blue-500/40 transition-all shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-[#ffde59]">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
