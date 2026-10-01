import Link from "next/link";
import { ExternalLink, Sparkles, FolderKanban } from "lucide-react";
import { portfolioData } from "@/lib/data";

export default function PortfolioPage() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-[#61adff] text-xs font-bold tracking-wider uppercase">
          <FolderKanban className="w-3.5 h-3.5" />
          Portofolio & Studi Kasus
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
          Studi Kasus & <span className="text-nova-blue">Karya Pilihan</span>
        </h1>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-medium">
          Eksplorasi jajaran proyek teratas yang telah kami kembangkan untuk klien manufaktur, logistik, e-commerce, UMKM, dan enterprise.
        </p>
      </div>

      {/* Grid of Portfolio Project Cards with Photo Thumbnails */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioData.map((project) => (
          <div
            key={project.id}
            className="group bg-[#020611]/90 backdrop-blur-xl border border-blue-400/30 rounded-3xl overflow-hidden hover:border-blue-400/70 transition-all duration-300 shadow-2xl flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              {/* Photo Image Container */}
              <div className="relative h-56 w-full bg-slate-900 overflow-hidden border-b border-blue-400/20">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/30 to-transparent" />
                
                {/* Category Badge Floating Top Left */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#020611]/80 backdrop-blur-md border border-blue-400/40 text-blue-300 text-xs font-extrabold shadow-lg">
                    {project.category}
                  </span>
                </div>

                {/* Client & Title Overlaid Bottom Left */}
                <div className="absolute bottom-4 left-4 right-4 space-y-0.5">
                  <div className="text-blue-300 text-xs font-bold flex items-center gap-1.5">
                    <span>{project.client}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-[#61adff] transition-colors line-clamp-1">
                    {project.name}
                  </h3>
                </div>
              </div>

              {/* Project Info & Tech Stack */}
              <div className="p-6 space-y-4">
                <p className="text-blue-100 text-xs leading-relaxed font-medium line-clamp-3">
                  {project.shortDesc}
                </p>

                <div className="space-y-2 pt-2 border-t border-blue-400/15">
                  <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider block">
                    Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-blue-950/70 border border-blue-400/20 text-white text-xs font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 pt-0">
              <Link
                href={`/portfolio/${project.slug}`}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30"
              >
                <span>Lihat Detail Studi Kasus</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
