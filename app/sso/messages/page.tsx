"use client";

import { useState } from "react";
import { Mail, Trash2, Eye, X, Check, Search, Reply } from "lucide-react";

interface MessageItem {
  id: string;
  sender: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  unread: boolean;
}

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "1",
      sender: "PT Maju Bersama",
      email: "info@majubersama.com",
      subject: "Pengembangan ERP Custom & POS Unit",
      message: "Halo Solvia Nova, kami bermaksud ingin membangun sistem ERP manufaktur custom untuk 200 karyawan kami dengan integrasi kontrol produksi.",
      date: "Hari Ini, 10:45",
      unread: true,
    },
    {
      id: "2",
      sender: "Budi Santoso",
      email: "budi@fashionstore.id",
      subject: "Tanya Paket E-Commerce & WhatsApp Notification",
      message: "Apakah tersedia paket e-commerce lengkap dengan integrasi WhatsApp notification & payment gateway terotomatisasi?",
      date: "Kemarin, 16:20",
      unread: true,
    },
    {
      id: "3",
      sender: "Rina Wijaya",
      email: "rina@brandlokal.com",
      subject: "Konsultasi Rebranding FMCG",
      message: "Kami ingin melakukan rebranding lengkap untuk lini produk makanan ringan lokal kami.",
      date: "29 Sep 2026",
      unread: false,
    },
    {
      id: "4",
      sender: "xfhsroeksh",
      email: "rtzfoxyf@formtests.info",
      subject: "Konsultasi Pembuatan Website",
      message: "Tertarik layanan pembuatan website company profile dengan fitur katalog interaktif.",
      date: "24 Sep 2026",
      unread: false,
    },
    {
      id: "5",
      sender: "mhsnhfhusn",
      email: "gqrzxdes@immenseignite.info",
      subject: "Penawaran Kerjasama Agency",
      message: "Ingin mengajukan kerjasama agency periklanan digital reklame.",
      date: "09 Aug 2026",
      unread: false,
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedMsg, setSelectedMsg] = useState<MessageItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenMessage = (msg: MessageItem) => {
    setSelectedMsg(msg);
    // Mark as read
    if (msg.unread) {
      setMessages(messages.map((m) => (m.id === msg.id ? { ...m, unread: false } : m)));
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
      setMessages(messages.filter((m) => m.id !== id));
      if (selectedMsg?.id === id) setSelectedMsg(null);
      showToast("Pesan berhasil dihapus!");
    }
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.sender.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Messages</h1>
          <p className="text-slate-400 text-xs mt-1">Daftar pesan masuk dari form kontak & konsultasi</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari pesan atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 w-64"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-[#0E1526]/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-[#070A12]/80 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-5">PENGIRIM</th>
                <th className="py-4 px-5">SUBJECT</th>
                <th className="py-4 px-5">WAKTU</th>
                <th className="py-4 px-5 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredMessages.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-5 font-semibold text-slate-200">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          m.unread ? "bg-amber-400 animate-pulse" : "bg-slate-600"
                        }`}
                      />
                      <div>
                        <div className="text-white font-bold">{m.sender}</div>
                        <div className="text-slate-400 text-[11px] font-mono">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-slate-300 font-medium">
                    <div className="line-clamp-1">{m.subject}</div>
                  </td>
                  <td className="py-4 px-5 text-slate-400 whitespace-nowrap">{m.date}</td>
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenMessage(m)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1 border border-blue-500/30"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Baca</span>
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-300 text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MESSAGE DETAIL MODAL */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0E1A] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white">{selectedMsg.sender}</h2>
                <div className="text-slate-400 text-xs font-mono">{selectedMsg.email}</div>
              </div>
              <button
                onClick={() => setSelectedMsg(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Subject:</span>
                <div className="text-sm font-bold text-blue-400 mt-0.5">{selectedMsg.subject}</div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Isi Pesan:</span>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs leading-relaxed mt-1">
                  {selectedMsg.message}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 text-right">Diterima pada: {selectedMsg.date}</div>
            </div>

            <div className="pt-4 flex justify-between gap-3 border-t border-slate-800">
              <button
                onClick={() => handleDelete(selectedMsg.id)}
                className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-600 text-red-300 hover:text-white text-xs font-bold transition-colors"
              >
                Hapus Pesan
              </button>
              <a
                href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject)}`}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2"
              >
                <Reply className="w-4 h-4" />
                <span>Balas Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
