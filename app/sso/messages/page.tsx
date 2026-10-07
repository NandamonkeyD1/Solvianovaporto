"use client";

import { useState } from "react";
import { Mail, Trash2, Eye, X, Check, Search, MessageSquare, CheckCheck, ExternalLink, Send } from "lucide-react";

interface MessageItem {
  id: string;
  sender: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  unread: boolean;
}

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "1",
      sender: "PT Maju Bersama (Budi)",
      email: "info@majubersama.com",
      phone: "6281234567890",
      subject: "Pengembangan ERP Custom & POS Unit",
      message: "Halo Solvia Nova, kami bermaksud ingin membangun sistem ERP manufaktur custom untuk 200 karyawan kami dengan integrasi kontrol produksi.",
      date: "Hari Ini, 10:45",
      unread: true,
    },
    {
      id: "2",
      sender: "Budi Santoso",
      email: "budi@fashionstore.id",
      phone: "6285712345678",
      subject: "Tanya Paket E-Commerce & WhatsApp Notification",
      message: "Apakah tersedia paket e-commerce lengkap dengan integrasi WhatsApp notification & payment gateway terotomatisasi?",
      date: "Kemarin, 16:20",
      unread: true,
    },
    {
      id: "3",
      sender: "Rina Wijaya",
      email: "rina@brandlokal.com",
      phone: "6281398765432",
      subject: "Konsultasi Rebranding FMCG",
      message: "Kami ingin melakukan rebranding lengkap untuk lini produk makanan ringan lokal kami.",
      date: "29 Sep 2026",
      unread: false,
    },
    {
      id: "4",
      sender: "Dzikron Zaidan (Hydrone IoT)",
      email: "dzikron@hydrone.io",
      phone: "6283148801578",
      subject: "Konsultasi Prototype Autonomous Underwater Vehicle",
      message: "Tertarik layanan pembuatan sistem IoT monitoring telemetri real-time.",
      date: "24 Sep 2026",
      unread: false,
    },
    {
      id: "5",
      sender: "Filtrazon Team",
      email: "filtrazon@gmail.com",
      phone: "6281226615585",
      subject: "Penawaran Kerjasama Integration IoT",
      message: "Ingin mengajukan kerjasama integrasi sensor kualitas air & dashboard WebGL 3D.",
      date: "09 Aug 2026",
      unread: false,
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "unread" | "read">("all");
  const [selectedMsg, setSelectedMsg] = useState<MessageItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenMessage = (msg: MessageItem) => {
    setSelectedMsg(msg);
    if (msg.unread) {
      setMessages(messages.map((m) => (m.id === msg.id ? { ...m, unread: false } : m)));
    }
  };

  const handleMarkAllRead = () => {
    setMessages(messages.map((m) => ({ ...m, unread: false })));
    showToast("Semua pesan & leads berhasil ditandai sudah dibaca / diproses!");
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
      setMessages(messages.filter((m) => m.id !== id));
      if (selectedMsg?.id === id) setSelectedMsg(null);
      showToast("Pesan berhasil dihapus!");
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.sender.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());

    if (filterMode === "unread") return matchesSearch && m.unread;
    if (filterMode === "read") return matchesSearch && !m.unread;
    return matchesSearch;
  });

  const unreadCount = messages.filter((m) => m.unread).length;

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
          <h1 className="text-2xl font-black text-white">Leads & Pesan Konsultasi</h1>
          <p className="text-slate-400 text-xs mt-1">
            Kelola pesan masuk dari calon klien. Sisa <strong className="text-amber-400 font-bold">{unreadCount} pesan belum dibaca</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500 border border-amber-500/40 text-amber-300 hover:text-white text-xs font-bold transition-all shadow-lg"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Tandai Semua Dibaca</span>
            </button>
          )}

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari pengirim atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 w-56 sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setFilterMode("all")}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
            filterMode === "all" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Semua ({messages.length})
        </button>
        <button
          onClick={() => setFilterMode("unread")}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
            filterMode === "unread" ? "bg-amber-500 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Belum Dibaca ({unreadCount})
        </button>
        <button
          onClick={() => setFilterMode("read")}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
            filterMode === "read" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Sudah Dibaca ({messages.length - unreadCount})
        </button>
      </div>

      {/* Messages Table */}
      <div className="bg-[#0E1526]/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-[#070A12]/80 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-5">PENGIRIM & KONTAK</th>
                <th className="py-4 px-5">TOPIK / KONSULTASI</th>
                <th className="py-4 px-5">WAKTU</th>
                <th className="py-4 px-5 text-right">ACTION / RESPONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredMessages.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          m.unread ? "bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" : "bg-slate-600"
                        }`}
                      />
                      <div>
                        <div className="text-white font-bold">{m.sender}</div>
                        <div className="text-slate-400 text-[11px] font-mono">{m.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="font-bold text-slate-200 line-clamp-1">{m.subject}</div>
                    <div className="text-slate-400 text-[11px] line-clamp-1 mt-0.5">{m.message}</div>
                  </td>

                  <td className="py-4 px-5 text-slate-400 font-mono whitespace-nowrap">{m.date}</td>

                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {/* Direct WhatsApp Response Button */}
                      <a
                        href={`https://wa.me/${m.phone || "6283148801578"}?text=${encodeURIComponent(
                          `Halo ${m.sender}, terima kasih telah menghubungi Solvia Nova mengenai "${m.subject}". Kami siap mendiskusikan kebutuhan sistem Anda.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/30 text-emerald-300 hover:text-white text-[11px] font-bold transition-all"
                        title="Balas Langsung via WhatsApp"
                      >
                        <Send className="w-3 h-3" />
                        <span>Balas WA</span>
                      </a>

                      <button
                        onClick={() => handleOpenMessage(m)}
                        className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors"
                        title="Detail Pesan"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(m.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MESSAGE MODAL */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0E1A] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Detail Leads</span>
                <h2 className="text-base font-bold text-white">{selectedMsg.subject}</h2>
              </div>
              <button
                onClick={() => setSelectedMsg(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Pengirim:</span>
                  <span className="text-white font-bold">{selectedMsg.sender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Email:</span>
                  <span className="text-blue-300 font-mono">{selectedMsg.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Waktu Masuk:</span>
                  <span className="text-slate-300 font-mono">{selectedMsg.date}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-slate-400 font-bold block">Pesan / Detail Konsultasi:</span>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-slate-200 leading-relaxed font-sans text-xs whitespace-pre-line">
                  {selectedMsg.message}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-slate-800">
              <button
                onClick={() => handleDelete(selectedMsg.id)}
                className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold transition-colors"
              >
                Hapus Pesan
              </button>

              <a
                href={`https://wa.me/${selectedMsg.phone || "6283148801578"}?text=${encodeURIComponent(
                  `Halo ${selectedMsg.sender}, kami dari tim Solvia Nova ingin mendiskusikan pesan konsultasi Anda mengenai "${selectedMsg.subject}".`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 inline-flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Balas via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
