import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { articlesData } from "@/lib/data";

interface Props {
  params: {
    slug: string;
  };
}

export default function ArticleDetailPage({ params }: Props) {
  const article = articlesData.find((a) => a.slug === params.slug) || articlesData[0];

  if (!article) {
    notFound();
  }

  return (
    <div className="pt-32 pb-20 max-w-3xl mx-auto px-6 lg:px-8 space-y-10">
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Semua Artikel
      </Link>

      <div className="space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase">
          {article.category}
        </span>
        <h1 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-b border-white/10 pb-4">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#ffde59]" />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#ffde59]" />
            {article.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#ffde59]" />
            {article.readTime}
          </span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-slate-300 text-base leading-relaxed space-y-6">
        <p className="text-lg text-white font-medium italic border-l-4 border-blue-500 pl-4 py-1">
          {article.summary}
        </p>
        <p>{article.content}</p>
        <p>
          Teknologi berkembang sangat pesat. Dengan mengadopsi prinsip <em>Understand Problems First, Build Solutions</em>, setiap proyek yang dikembangkan dapat memberikan value bisnis berkelanjutan dan tahan terhadap tantangan masa depan.
        </p>
      </div>
    </div>
  );
}
