"use client";

import { useState } from "react";
import { Plus, Tag, Edit, Trash2 } from "lucide-react";

export default function CategoriesAdminPage() {
  const [categories] = useState([
    { id: "1", name: "Website Development", slug: "website-development", count: 4 },
    { id: "2", name: "System Development & ERP", slug: "system-development", count: 3 },
    { id: "3", name: "Branding & Creative", slug: "branding-creative", count: 2 },
    { id: "4", name: "Automation & AI", slug: "automation-ai", count: 2 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Kategori</h2>
          <p className="text-slate-400 text-xs mt-0.5">Kelola kategori layanan & portofolio</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/25">
          <Plus className="w-4 h-4" />
          <span>Tambah Kategori</span>
        </button>
      </div>

      <div className="bg-[#0E1526]/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 bg-[#070A12]/80 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
              <th className="py-4 px-5">NAMA KATEGORI</th>
              <th className="py-4 px-5">SLUG</th>
              <th className="py-4 px-5">TOTAL ITEM</th>
              <th className="py-4 px-5 text-right">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-4 px-5 font-bold text-white">{cat.name}</td>
                <td className="py-4 px-5 text-slate-400 font-mono">{cat.slug}</td>
                <td className="py-4 px-5 text-blue-400 font-bold">{cat.count} items</td>
                <td className="py-4 px-5 text-right">
                  <div className="flex items-center justify-end gap-2 text-slate-400">
                    <button className="p-1.5 rounded-lg hover:text-blue-400 hover:bg-slate-700 transition-colors">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:text-red-400 hover:bg-slate-700 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
