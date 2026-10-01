import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { articlesData } from "@/lib/data";

export default function ArticlesPage() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
          Artikel & Insight Teknologi
        </div>
        <h1 className="text-4xl lg:text-6xl font-extrabold text-white">
          Wawasan & <span className="text-nova-yellow">Berita Digital</span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Temukan wawasan mendalam mengenai arsitektur sistem, WebGL 3D, IoT skala industri, dan tren teknologi modern.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {articlesData.map((art) => (
          <div
            key={art.id}
            className="bg-[#08183c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6 hover:border-blue-500/40 transition-all shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium">
                  {art.category}
                </span>
                <span>{art.date} • {art.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-white hover:text-[#ffde59] transition-colors">
                <Link href={`/articles/${art.slug}`}>{art.title}</Link>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">{art.summary}</p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <span className="text-xs text-slate-400">Penulis: <strong className="text-white">{art.author}</strong></span>
              <Link
                href={`/articles/${art.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white transition-colors"
              >
                Baca Selengkapnya
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
