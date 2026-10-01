import { Sparkles } from "lucide-react";

export default function GalleryPage() {
  const galleryItems = [
    { title: "Solvia Nova 3D Scene Rendering", tag: "3D Graphics" },
    { title: "IoT Industrial Dashboard Interface", tag: "IoT Solution" },
    { title: "Custom ERP Supply Chain Portal", tag: "Enterprise System" },
    { title: "Next.js WebApp Architecture", tag: "Web Tech" },
    { title: "High-Performance Telemetry Broker", tag: "Cloud Infrastructure" },
    { title: "Interactive UI/UX Workspace", tag: "Design & UX" },
  ];

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          Galeri Visual & Inovasi
        </div>
        <h1 className="text-4xl lg:text-6xl font-extrabold text-white">
          Galeri <span className="text-nova-yellow">Solvia.Nova</span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Koleksi dokumentasi visual dari implementasi WebGL 3D, sistem kustom enterprise, dan arsitektur produk digital kami.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            className="group bg-[#08183c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-4 hover:border-blue-500/40 transition-all shadow-2xl h-64 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-[#ffde59]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-semibold w-fit">
              {item.tag}
            </span>
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#ffde59] transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-xs mt-1">High Tech Interactive Visual</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
