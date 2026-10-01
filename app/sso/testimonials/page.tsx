"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { testimonialsData } from "@/lib/data";

export default function TestimonialsAdminPage() {
  const [list] = useState(testimonialsData);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Testimonials</h2>
          <p className="text-slate-400 text-xs mt-0.5">Kelola ulasan & testimoni dari klien</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/25">
          <Plus className="w-4 h-4" />
          <span>Tambah Testimoni</span>
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {list.map((t) => (
          <div key={t.id} className="bg-[#0E1526]/80 border border-slate-800 rounded-2xl p-6 space-y-4 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex text-amber-400 gap-1 text-xs">
                {"★".repeat(t.rating)}
              </div>
              <div className="flex gap-1.5">
                <button className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-300 hover:text-white transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed italic">"{t.testimonial}"</p>
            <div className="pt-2 border-t border-slate-800">
              <div className="text-white font-bold text-xs">{t.clientName}</div>
              <div className="text-slate-400 text-[11px]">{t.company}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
