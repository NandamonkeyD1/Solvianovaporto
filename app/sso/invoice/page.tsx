"use client";

import { useState } from "react";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";

import Link from "next/link";

export default function InvoiceAdminPage() {
  const [invoices] = useState([
    {
      id: "1",
      no: "INV/2026/07/005",
      client: "Hydrone IoT (Dzikron Zaidan Ahmad dan Tim)",
      project: "Pengembangan Prototype Autonomous Underwater Vehicle (AUV) Pembersih Mikroplastik dan Monitoring Kualitas Air",
      date: "30/07/2026",
      total: "Rp 24.202.500",
      status: "Draft",
    },
    {
      id: "2",
      no: "INV/2026/07/004",
      client: "Filtrazon IoT",
      project: "Filtrazon IoT",
      date: "22/07/2026",
      total: "Rp 18.633.000",
      status: "Draft",
    },
    {
      id: "3",
      no: "INV/2026/07/003",
      client: "Precentense + Integration IoT",
      project: "Precentense + Integration IoT",
      date: "15/07/2026",
      total: "Rp 2.500.000",
      status: "Draft",
    },
    {
      id: "4",
      no: "INV/2026/07/002",
      client: "PRESENCE-TEEN",
      project: "PRESENCE-TEEN Sistem Presensi Pintar Berbasis QR Code, Reminder Tugas dan AI Ringkasan Materi",
      date: "06/07/2026",
      total: "Rp 2.300.000",
      status: "Draft",
    },
    {
      id: "5",
      no: "INV/2026/07/001",
      client: "Persensi Automation",
      project: "32432434",
      date: "06/07/2026",
      total: "Rp 3.000.000",
      status: "Draft",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Page Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Invoice</h2>
          <p className="text-slate-400 text-xs mt-0.5">Kelola invoice client</p>
        </div>
        <Link
          href="/sso/invoice/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/25"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Invoice Baru</span>
        </Link>
      </div>

      {/* Invoice Table Container */}
      <div className="bg-[#0E1526]/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-[#070A12]/80 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-5">NO. INVOICE</th>
                <th className="py-4 px-5">KLIEN</th>
                <th className="py-4 px-5">PROJECT</th>
                <th className="py-4 px-5">TANGGAL</th>
                <th className="py-4 px-5">TOTAL</th>
                <th className="py-4 px-5">STATUS</th>
                <th className="py-4 px-5 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-5 font-mono text-blue-400 font-bold">{inv.no}</td>
                  <td className="py-4 px-5 font-semibold text-slate-200 max-w-[200px] truncate">{inv.client}</td>
                  <td className="py-4 px-5 text-slate-400 max-w-[280px] truncate">{inv.project}</td>
                  <td className="py-4 px-5 text-slate-400 whitespace-nowrap">{inv.date}</td>
                  <td className="py-4 px-5 font-bold text-white whitespace-nowrap">{inv.total}</td>
                  <td className="py-4 px-5 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-[10px] font-bold">
                      • {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      <button className="p-1.5 rounded-lg hover:text-white hover:bg-slate-700 transition-colors" title="Lihat">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:text-blue-400 hover:bg-slate-700 transition-colors" title="Edit">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:text-red-400 hover:bg-slate-700 transition-colors" title="Hapus">
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
    </div>
  );
}
