"use client";

import { useState } from "react";
import { Search, Save, CheckCircle2, ExternalLink } from "lucide-react";

export default function SEOManagementPage() {
  const [title, setTitle] = useState("Solvia Nova — Digital Solution & Software House Modern");
  const [metaDesc, setMetaDesc] = useState(
    "Solvia Nova membantu bisnis membangun sistem digital, website, aplikasi, dan branding modern dengan visual premium dan performa profesional."
  );
  const [keywords, setKeywords] = useState(
    "software house, digital solution, website development, system development, branding, UI"
  );
  const [analyticsId, setAnalyticsId] = useState("G-XXXXXXXXXX");
  const [searchConsole, setSearchConsole] = useState("verification code");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>SEO Settings berhasil disimpan!</span>
        </div>
      )}

      {/* Main SEO Form Card */}
      <div className="bg-[#0E1526]/80 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl backdrop-blur-md">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-2">Default SEO Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-2">Default Meta Description</label>
            <textarea
              rows={3}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition-colors leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-2">Keywords</label>
            <textarea
              rows={2}
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-2">Google Analytics ID</label>
            <input
              type="text"
              value={analyticsId}
              onChange={(e) => setAnalyticsId(e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-2">
              Google Search Console Verification
            </label>
            <input
              type="text"
              value={searchConsole}
              onChange={(e) => setSearchConsole(e.target.value)}
              placeholder="verification code"
              className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition-colors font-mono"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan SEO Settings</span>
          </button>
        </form>
      </div>

      {/* Sitemap & Robots Card */}
      <div className="bg-[#0E1526]/80 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl backdrop-blur-md">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sitemap & Robots</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#070A12] border border-slate-800">
            <div>
              <div className="text-white text-xs font-bold">Sitemap XML</div>
              <div className="text-slate-400 text-xs font-mono mt-0.5">https://solvianova.my.id/sitemap.xml</div>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Lihat</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-[#070A12] border border-slate-800">
            <div>
              <div className="text-white text-xs font-bold">Robots.txt</div>
              <div className="text-slate-400 text-xs font-mono mt-0.5">https://solvianova.my.id/robots.txt</div>
            </div>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Lihat</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
