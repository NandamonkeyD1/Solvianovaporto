"use client";

import { useState } from "react";
import { Sparkles, Image as ImageIcon, X, Calendar, Tag, Box, Layers } from "lucide-react";
import { galleryData, GalleryItem } from "@/lib/data";
import Model3DViewer from "@/components/Model3DViewer";

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <div className="pt-24 sm:pt-32 pb-28 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#61adff]" />
          Galeri Visual & Dokumentasi Proyek
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
          Dokumentasi Karya & <span className="text-nova-blue">Visual Solvia Nova</span>
        </h1>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-medium">
          Koleksi dokumentasi visual dari antarmuka aplikasi, sistem kustom enterprise, dan pengembangan produk solusi digital kami.
        </p>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryData.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group bg-[#020611]/90 backdrop-blur-xl border border-blue-400/30 rounded-3xl overflow-hidden hover:border-blue-400 transition-all duration-300 shadow-xl flex flex-col justify-between cursor-pointer hover:-translate-y-1"
          >
            {/* Image Box */}
            <div className="relative h-56 bg-slate-900 overflow-hidden border-b border-blue-400/20">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-blue-950/80 border border-blue-400/40 backdrop-blur-md text-blue-300 text-xs font-bold">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content info */}
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-blue-300 text-xs font-medium">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>{item.date}</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#61adff] transition-colors leading-snug">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* 3D INTERACTIVE ASSETS SHOWCASE */}
      <div className="bg-[#020611]/90 backdrop-blur-xl border border-blue-400/30 rounded-3xl p-8 lg:p-12 space-y-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-[#61adff] text-xs font-bold uppercase">
              <Box className="w-3.5 h-3.5 text-[#ffde59]" />
              Koleksi Asset Visual 3D
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-white">
              Model 3D & Selendang Digital Solvia Nova
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm font-medium">
              Eksplorasi asset 3D premium yang memperkuat estetika interaktif dan identitas visual ekosistem Solvia Nova.
            </p>
          </div>
        </div>

        {/* Single High-Performance Automated 3D Showcase */}
        <div className="max-w-4xl mx-auto">
          <Model3DViewer className="!h-[360px] sm:!h-[460px]" />
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#020611] border border-blue-400/40 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-4 p-6 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-blue-950/80 border border-blue-400/40 text-slate-300 hover:text-white hover:bg-blue-900 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-blue-400/20 bg-slate-900">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-contain bg-black"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
                  {selectedItem.category}
                </span>
                <span className="text-slate-400 text-xs font-mono">{selectedItem.date}</span>
              </div>
              <h2 className="text-2xl font-black text-white">{selectedItem.title}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
