"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  PhoneCall,
  RefreshCw,
  Zap,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  actionUrl?: string;
  actionLabel?: string;
}

const QUICK_QUESTIONS = [
  "💡 Apa saja layanan Solvia Nova?",
  "💰 Berapa estimasi biaya pembuatan web?",
  "⏱️ Berapa lama waktu pengerjaan proyek?",
  "🌟 Apa keunggulan teknologi 3D Solvia?",
  "📱 Mau konsultasi langsung via WhatsApp",
];

const BOT_RESPONSES: Record<string, { answer: string; actionUrl?: string; actionLabel?: string }> = {
  layanan: {
    answer:
      "Solvia Nova menghadirkan solusi teknologi kustom end-to-end:\n\n• 🌐 **Website & Landing Page 3D**: Desain eksklusif dengan Three.js & Next.js yang modern dan cepat.\n• 🏢 **Sistem Enterprise & ERP**: Manajemen inventaris, keuangan, dan alur kerja perusahaan.\n• 🛒 **POS & Web App**: Sistem kasir cabang, manajemen resep, dan loyalty reward.\n• 📡 **IoT & Otomasi Industri**: Dashboard monitoring sensor real-time via MQTT.\n\nSemua sistem kami rancang khusus (*100% custom*, tanpa template generik)!",
    actionUrl: "/services",
    actionLabel: "Lihat Seluruh Layanan",
  },
  biaya: {
    answer:
      "Investasi disesuaikan dengan kebutuhan dan skala bisnis Anda:\n\n• 🚀 **Landing Page & Portofolio 3D**: Mulai Rp 1.5jt – Rp 3.5jt\n• 💼 **Company Profile & Portal Bisnis**: Mulai Rp 3.5jt – Rp 8jt\n• ⚙️ **Sistem Kustom / ERP / Web App**: Sesuai modul dan arsitektur data bisnis Anda.\n\n✨ **Kabar baik**: Konsultasi kebutuhan awal dan estimasi kebutuhan 100% GRATIS!",
    actionUrl: "https://wa.me/6283148801578?text=Halo%20Novi,%20saya%20ingin%20konsultasi%20estimasi%20biaya%20proyek.",
    actionLabel: "Konsultasi Estimasi via WhatsApp",
  },
  lama: {
    answer:
      "Durasi pengerjaan kami sangat terukur dan transparan:\n\n• ⚡ **Landing Page / Promo Web**: 3 – 7 hari kerja\n• 🏢 **Website Perusahaan Lengkap**: 1 – 3 minggu\n• 🛠️ **Sistem Enterprise / ERP Kustom**: 3 – 8 minggu (dengan milestone bertahap)\n\nKami selalu menyertakan garansi pengerjaan dan uji coba komprehensif sebelum serah terima!",
    actionUrl: "/portfolio",
    actionLabel: "Lihat Rekam Jejak Portofolio",
  },
  "3d": {
    answer:
      "Visual 3D Solvia Nova dibangun menggunakan **Three.js & WebGL hardware-accelerated**:\n\n• 🎨 **Pengalaman Imersif**: Memberikan citra brand modern, premium, dan berkelas dunia.\n• ⚡ **Ultra Ringan & Responsif**: Dioptimalkan agar tidak membebani baterai smartphone dan tetap 60 FPS.\n• 🌐 **Dua Asset Andalan**: Solvia Azure Emblem dan Radiant Ribbon (Selendang 3D Dinamis) yang merepresentasikan inovasi digital tanpa batas!",
    actionUrl: "/gallery",
    actionLabel: "Buka Galeri 3D Solvia Nova",
  },
  whatsapp: {
    answer:
      "Tentu saja! Anda bisa langsung terhubung dengan tim konsultan teknis Solvia Nova melalui WhatsApp resmi kami. Tim kami siap merespons dengan cepat untuk mendiskusikan kebutuhan bisnis Anda.",
    actionUrl: "https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20ingin%20konsultasi%20pembuatan%20website%20dan%20sistem%20digital.",
    actionLabel: "Buka WhatsApp Sekarang (+62 831-4880-1578)",
  },
};

export default function ChatbotNovi() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Halo! Saya **Novi**, AI Virtual Assistant Solvia Nova. ✨ Ada yang bisa saya bantu terkait solusi website, sistem kustom, atau teknologi 3D bisnis Anda hari ini?",
      timestamp: "Baru saja",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [targetBotReply, setTargetBotReply] = useState<Message | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [animSpeed, setAnimSpeed] = useState<"normal" | "fast" | "instant">("normal");
  const [hasPromptBadge, setHasPromptBadge] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingText, isTyping]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setHasPromptBadge(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Animated typewriter effect for Novi's responses
  useEffect(() => {
    if (!targetBotReply) return;

    if (animSpeed === "instant") {
      setMessages((prev) => [...prev, targetBotReply]);
      setTargetBotReply(null);
      setTypingText("");
      setIsTyping(false);
      return;
    }

    const fullText = targetBotReply.text;
    const intervalMs = animSpeed === "fast" ? 12 : 24;

    if (typingIndex < fullText.length) {
      const timer = setTimeout(() => {
        setTypingText((prev) => prev + fullText[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, intervalMs);
      return () => clearTimeout(timer);
    } else {
      // Completed typing
      setMessages((prev) => [...prev, targetBotReply]);
      setTargetBotReply(null);
      setTypingText("");
      setTypingIndex(0);
      setIsTyping(false);
    }
  }, [targetBotReply, typingIndex, animSpeed]);

  const handleSendMessage = (textToSend?: string) => {
    const raw = textToSend || inputText;
    const trimmed = raw.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Determine appropriate bot response
    const query = trimmed.toLowerCase();
    let replyData: { answer: string; actionUrl?: string; actionLabel?: string } = {
      answer:
        "Terima kasih telah bertanya! Pertanyaan Anda sangat menarik. Tim arsitek solusi Solvia Nova siap memberikan penawaran dan rancangan teknis yang paling sesuai untuk Anda. Anda juga dapat langsung mengobrol melalui WhatsApp kami untuk konsultasi 1-on-1 gratis!",
      actionUrl: "https://wa.me/6283148801578?text=Halo%20Solvia%20Nova,%20saya%20ingin%20tanya%20tentang:%20" + encodeURIComponent(trimmed),
      actionLabel: "Tanyakan Langsung ke Tim via WhatsApp",
    };

    if (query.includes("layanan") || query.includes("jasa") || query.includes("buat apa") || query.includes("solusi")) {
      replyData = BOT_RESPONSES.layanan;
    } else if (query.includes("biaya") || query.includes("harga") || query.includes("paket") || query.includes("tarif") || query.includes("berapa")) {
      replyData = BOT_RESPONSES.biaya;
    } else if (query.includes("lama") || query.includes("waktu") || query.includes("durasi") || query.includes("hari") || query.includes("deadline")) {
      replyData = BOT_RESPONSES.lama;
    } else if (query.includes("3d") || query.includes("selendang") || query.includes("pita") || query.includes("visual") || query.includes("teknologi")) {
      replyData = BOT_RESPONSES["3d"];
    } else if (query.includes("wa") || query.includes("whatsapp") || query.includes("hubungi") || query.includes("kontak") || query.includes("telp")) {
      replyData = BOT_RESPONSES.whatsapp;
    }

    // Delay before start typing to feel organic
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: replyData.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionUrl: replyData.actionUrl,
        actionLabel: replyData.actionLabel,
      };

      setTypingText("");
      setTypingIndex(0);
      setTargetBotReply(botMsg);
    }, 500);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "initial",
        sender: "bot",
        text: "Percakapan telah diatur ulang. ✨ Halo! Saya **Novi**, siap menjawab pertanyaan seputar pengembangan website, sistem enterprise, atau teknologi visual 3D Solvia Nova.",
        timestamp: "Baru saja",
      },
    ]);
    setTypingText("");
    setIsTyping(false);
    setTargetBotReply(null);
  };

  return (
    <>
      {/* FLOATING ACTION TRIGGER BUTTON */}
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-end gap-2">
        {/* Subtle Greeting Bubble (On initial page load) */}
        {hasPromptBadge && !isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#020611]/95 border border-blue-400/40 text-white text-xs font-semibold shadow-2xl backdrop-blur-xl cursor-pointer hover:border-[#ffde59] transition-all duration-300 animate-bounce"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Chat dengan <strong>Novi</strong> (Solvia AI)</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#ffde59]" />
          </div>
        )}

        {/* Main Floating Bot Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Buka Chat dengan Novi"
          className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-2xl shadow-blue-600/50 border border-blue-300/40 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {/* Animated Glow Halo */}
          <div className="absolute inset-0 rounded-2xl bg-blue-500/30 blur-md group-hover:blur-lg transition-all" />

          {/* Online green indicator dot */}
          <span className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#020611] shadow-[0_0_8px_#34d399]" />

          {isOpen ? (
            <X className="w-6 h-6 relative z-10 text-white transition-transform group-hover:rotate-90 duration-300" />
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white group-hover:text-[#ffde59] transition-colors" />
            </div>
          )}
        </button>
      </div>

      {/* CHATBOT MODAL WINDOW */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-20 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[400px] h-[540px] max-h-[82vh] z-50 flex flex-col rounded-3xl bg-[#020611]/95 backdrop-blur-2xl border border-blue-400/40 shadow-2xl shadow-blue-950/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-950/90 via-[#04102c]/95 to-blue-900/90 border-b border-blue-400/30 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 border border-blue-300/40 flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#020611]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black text-white">Chat dengan Novi</h3>
                  <span className="px-1.5 py-0.5 rounded-md bg-[#ffde59]/20 text-[#ffde59] text-[9px] font-extrabold uppercase">
                    AI Bot
                  </span>
                </div>
                <p className="text-[11px] text-blue-200 font-medium">Asisten Virtual Solvia Nova • 24/7</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                title="Pengaturan Animasi Teks"
                className={`p-2 rounded-xl transition-colors ${
                  showSettings ? "bg-blue-600 text-white" : "text-blue-300 hover:text-white hover:bg-blue-950/60"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetChat}
                title="Reset Percakapan"
                className="p-2 rounded-xl text-blue-300 hover:text-white hover:bg-blue-950/60 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Tutup Chat"
                className="p-2 rounded-xl text-blue-300 hover:text-white hover:bg-blue-950/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Setting Drawer (When toggled) */}
          {showSettings && (
            <div className="bg-blue-950/90 border-b border-blue-400/30 p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-blue-200 font-bold">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#ffde59]" />
                  Kecepatan Animasi Teks Muncul
                </span>
                <span className="text-[10px] text-blue-300 capitalize">{animSpeed}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(["normal", "fast", "instant"] as const).map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setAnimSpeed(spd)}
                    className={`py-1 px-2 rounded-lg text-[10px] font-extrabold transition-all capitalize ${
                      animSpeed === spd
                        ? "bg-blue-600 text-white border border-blue-300/40 shadow-sm"
                        : "bg-blue-900/40 text-blue-300 hover:bg-blue-900/80"
                    }`}
                  >
                    {spd === "normal" ? "Normal" : spd === "fast" ? "Cepat" : "Langsung"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-blue-600/30">
            {messages.map((m) => {
              const isBot = m.sender === "bot";
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${isBot ? "justify-start" : "justify-end"} animate-in fade-in slide-in-from-bottom-2 duration-200`}
                >
                  {isBot && (
                    <div className="w-7 h-7 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 mt-0.5 text-[#ffde59]">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-1.5`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isBot
                          ? "bg-gradient-to-br from-[#051438]/95 to-[#020b22]/95 border border-blue-400/30 text-blue-50 shadow-md whitespace-pre-line"
                          : "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-medium shadow-md rounded-br-none"
                      }`}
                    >
                      {/* Formatted Text Render */}
                      <span className="inline">
                        {m.text.split("\n").map((line, lIdx) => (
                          <span key={lIdx} className="block mb-1 last:mb-0">
                            {line.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, pIdx) => {
                              if (part.startsWith("**") && part.endsWith("**")) {
                                return (
                                  <strong key={pIdx} className="font-extrabold text-white">
                                    {part.slice(2, -2)}
                                  </strong>
                                );
                              }
                              if (part.startsWith("*") && part.endsWith("*")) {
                                return (
                                  <em key={pIdx} className="italic text-[#ffde59]">
                                    {part.slice(1, -1)}
                                  </em>
                                );
                              }
                              return part;
                            })}
                          </span>
                        ))}
                      </span>
                    </div>

                    {/* Optional Interactive CTA Button inside Bot Bubble */}
                    {isBot && m.actionUrl && (
                      <a
                        href={m.actionUrl}
                        target={m.actionUrl.startsWith("http") ? "_blank" : undefined}
                        rel={m.actionUrl.startsWith("http") ? "noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[11px] font-bold shadow-md shadow-emerald-900/40 border border-emerald-400/30 transition-all hover:scale-102"
                      >
                        {m.actionUrl.includes("wa.me") ? (
                          <PhoneCall className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-[#ffde59]" />
                        )}
                        <span>{m.actionLabel || "Selengkapnya"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <div className={`text-[10px] text-slate-400 font-mono ${isBot ? "text-left" : "text-right"}`}>
                      {m.timestamp}
                    </div>
                  </div>

                  {!isBot && (
                    <div className="w-7 h-7 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Live Animated Typewriter Stream Bubble */}
            {isTyping && (
              <div className="flex items-start gap-2.5 justify-start animate-in fade-in duration-150">
                <div className="w-7 h-7 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 mt-0.5 text-[#ffde59]">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>

                <div className="max-w-[85%] p-3.5 rounded-2xl bg-gradient-to-br from-[#051438]/95 to-[#020b22]/95 border border-blue-400/30 text-blue-50 text-xs shadow-md space-y-1">
                  {typingText ? (
                    <span className="whitespace-pre-line leading-relaxed">
                      {typingText}
                      <span className="inline-block w-1.5 h-3.5 bg-[#ffde59] ml-1 animate-pulse align-middle" />
                    </span>
                  ) : (
                    <div className="flex items-center gap-1.5 py-0.5 text-blue-300 font-semibold text-[11px]">
                      <span>Novi sedang mengetik</span>
                      <span className="flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffde59] animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffde59] animate-bounce" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Chips */}
          <div className="px-3 py-2 bg-[#01081a]/95 border-t border-blue-400/20 overflow-x-auto scrollbar-none flex items-center gap-1.5">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                disabled={isTyping}
                className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-400/30 text-blue-200 hover:text-white text-[11px] font-semibold transition-all shrink-0 active:scale-95 disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-gradient-to-t from-[#020611] to-[#040e29] border-t border-blue-400/30 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tulis pesan ke Novi..."
              disabled={isTyping}
              className="flex-1 bg-blue-950/50 border border-blue-400/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-blue-300/50 focus:outline-none focus:border-[#ffde59] focus:ring-1 focus:ring-[#ffde59]/50 transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 text-white flex items-center justify-center shadow-lg transition-all active:scale-95 shrink-0 border border-blue-400/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
