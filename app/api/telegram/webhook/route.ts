import { NextResponse } from "next/server";
import { portfolioData } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const hasToken = Boolean(process.env.TELEGRAM_BOT_TOKEN);
  const hasChatId = Boolean(process.env.TELEGRAM_ADMIN_CHAT_ID);

  return NextResponse.json({
    status: "online",
    service: "Solvia Nova Telegram Admin Bot Webhook",
    configured: {
      botToken: hasToken,
      adminChatId: hasChatId,
    },
    commands: ["/start", "/stats", "/leads", "/portfolio", "/invoices", "/help"],
  });
}

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username?: string;
    };
    chat: {
      id: number;
      first_name: string;
      type: string;
    };
    date: number;
    text?: string;
  };
  callback_query?: {
    id: string;
    from: {
      id: number;
      first_name: string;
    };
    message?: {
      chat: {
        id: number;
      };
    };
    data?: string;
  };
}

// Mock leads data (matching dashboard)
const RECENT_LEADS = [
  { name: "Budi Santoso", company: "PT Tirta Bening", service: "Sistem IoT Monitoring Air", date: "12 Okt 2026", status: "Perlu Follow-Up" },
  { name: "Siti Rahma", company: "Dapur Ceria Bakery", service: "POS & Manajemen Resep", date: "11 Okt 2026", status: "Terkirim Penawaran" },
  { name: "Hendra Wijaya", company: "PT Mitra Mandiri", service: "Enterprise ERP Mitra", date: "10 Okt 2026", status: "Deal / Kontrak" },
  { name: "Dewi Lestari", company: "DasterKu Retail", service: "Website Grosir Modern 3D", date: "09 Okt 2026", status: "Selesai" },
];

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

  try {
    const update: TelegramUpdate = await request.json();
    const message = update.message;
    const callbackQuery = update.callback_query;

    const chatId = message?.chat?.id || callbackQuery?.message?.chat?.id;
    if (!chatId) {
      return NextResponse.json({ ok: true });
    }

    // Security check: Whitelist admin chat ID if configured
    if (adminChatId && chatId.toString() !== adminChatId.toString()) {
      await sendReply(botToken, chatId, "⛔ <b>Akses Ditolak:</b> Anda tidak memiliki izin untuk mengelola Solvia Nova via Telegram.");
      return NextResponse.json({ ok: true });
    }

    const command = message?.text?.trim().toLowerCase() || "";
    const callbackData = callbackQuery?.data || "";

    // 1. Handle Commands
    if (command === "/start" || command === "/menu") {
      const text = `
✨ <b>SOLVIA NOVA — TELEGRAM ADMIN PANEL</b>
━━━━━━━━━━━━━━━━━━━━━
Halo <b>${message?.from?.first_name || "Admin"}</b>! 
Selamat datang di pusat pemantauan & kendali digital Solvia Nova via Telegram.

Gunakan tombol menu di bawah atau ketik perintah langsung untuk memantau performa web secara real-time:
`.trim();

      const keyboard = [
        [
          { text: "📊 Statistik & Traffic", callback_data: "cmd_stats" },
          { text: "📬 Pesan / Leads Masuk", callback_data: "cmd_leads" },
        ],
        [
          { text: "💼 Cek Portofolio", callback_data: "cmd_portfolio" },
          { text: "💳 Status Invoice", callback_data: "cmd_invoices" },
        ],
        [
          { text: "🌐 Buka Dashboard Web", url: "http://localhost:3000/sso/dashboard" },
        ],
      ];

      await sendReply(botToken, chatId, text, keyboard);
    } else if (command === "/stats" || callbackData === "cmd_stats") {
      const text = `
📊 <b>RINGKASAN ANALITIK & TRAFFIC SOLVIA NOVA</b>
━━━━━━━━━━━━━━━━━━━━━
👥 <b>Total Pengunjung Bulan Ini:</b> 1,240 <i>(↑ 24% dari bulan lalu)</i>
📬 <b>Total Leads / Pesan:</b> 33 konsultasi masuk
💼 <b>Total Portofolio Aktif:</b> ${portfolioData.length} project
🟢 <b>Server Uptime:</b> 99.98% <i>(Online & Normal)</i>

📈 <b>Sumber Pengunjung Teratas:</b>
1. Direct Visit Website (42%)
2. WhatsApp & Chatbot Novi (32%)
3. Google Search SEO (16%)
4. Social Media (10%)

🔥 <b>Layanan Paling Banyak Diminati:</b>
• ERP & Custom System (38%)
• Sistem IoT & Smart Automation (28%)
• Website & Landing Page 3D (20%)
━━━━━━━━━━━━━━━━━━━━━
<i>Status sistem: Normal & Responsif ⚡</i>
`.trim();

      const keyboard = [
        [{ text: "🔄 Refresh Stats", callback_data: "cmd_stats" }, { text: "📬 Cek Leads", callback_data: "cmd_leads" }],
        [{ text: "🏠 Kembali ke Menu", callback_data: "cmd_menu" }],
      ];

      await sendReply(botToken, chatId, text, keyboard);
    } else if (command === "/leads" || command === "/pesan" || callbackData === "cmd_leads") {
      let leadsText = `
📬 <b>LEADS & KONSULTASI MASUK TERBARU</b>
━━━━━━━━━━━━━━━━━━━━━
`;
      RECENT_LEADS.forEach((l, idx) => {
        leadsText += `
<b>#${idx + 1}. ${l.name}</b> (${l.company})
📌 <b>Kebutuhan:</b> ${l.service}
📅 <i>${l.date}</i> | Status: <b>${l.status}</b>
─────────────────────
`;
      });

      leadsText += `\n<i>Gunakan dashboard web untuk follow-up detail.</i>`;

      const keyboard = [
        [
          { text: "🌐 Kelola di Dashboard", url: "http://localhost:3000/sso/messages" },
        ],
        [
          { text: "📊 Lihat Statistik", callback_data: "cmd_stats" },
          { text: "🏠 Menu Utama", callback_data: "cmd_menu" },
        ],
      ];

      await sendReply(botToken, chatId, leadsText.trim(), keyboard);
    } else if (command === "/portfolio" || callbackData === "cmd_portfolio") {
      let portoText = `
💼 <b>DAFTAR PORTOFOLIO SOLVIA NOVA (${portfolioData.length} Project)</b>
━━━━━━━━━━━━━━━━━━━━━
`;
      portfolioData.slice(0, 5).forEach((p, idx) => {
        portoText += `<b>${idx + 1}. ${p.name}</b>\n📂 Kategori: ${p.category} | Klien: ${p.client}\n🔗 <a href="http://localhost:3000/portfolio/${p.slug}">Lihat Studi Kasus</a>\n\n`;
      });

      portoText += `<i>Menampilkan 5 dari total ${portfolioData.length} portofolio aktif.</i>`;

      const keyboard = [
        [{ text: "🌐 Buka Portofolio Web", url: "http://localhost:3000/portfolio" }],
        [{ text: "🏠 Menu Utama", callback_data: "cmd_menu" }],
      ];

      await sendReply(botToken, chatId, portoText.trim(), keyboard);
    } else if (command === "/invoices" || command === "/tagihan" || callbackData === "cmd_invoices") {
      const text = `
💳 <b>STATUS INVOICE & KEUANGAN SOLVIA NOVA</b>
━━━━━━━━━━━━━━━━━━━━━
💰 <b>Total Invoice Aktif:</b> 8 Tagihan
🟢 <b>Lunas / Selesai:</b> 6 Tagihan (Rp 34.500.000)
🟡 <b>Menunggu Pembayaran:</b> 2 Tagihan (Rp 9.200.000)
🔴 <b>Jatuh Tempo:</b> 0 Tagihan

<b>Invoice Terakhir:</b>
1. <b>INV-2026-008</b> — PT Tirta Bening (Rp 6.500.000) - <i>LUNAS</i>
2. <b>INV-2026-007</b> — Dapur Ceria Bakery (Rp 4.200.000) - <i>MENUNGGU</i>
━━━━━━━━━━━━━━━━━━━━━
<i>Kelola pembuatan & download PDF invoice langsung dari web dashboard.</i>
`.trim();

      const keyboard = [
        [{ text: "🧾 Buka Modul Invoice", url: "http://localhost:3000/sso/invoice" }],
        [{ text: "🏠 Menu Utama", callback_data: "cmd_menu" }],
      ];

      await sendReply(botToken, chatId, text, keyboard);
    } else if (command === "/help" || callbackData === "cmd_help") {
      const text = `
📖 <b>PANDUAN PERINTAH BOT TELEGRAM ADMIN</b>
━━━━━━━━━━━━━━━━━━━━━
Berikut daftar perintah yang dapat Anda gunakan kapan saja:

• <code>/start</code> — Menampilkan menu tombol interaktif
• <code>/stats</code> — Memeriksa ringkasan traffic & data analitik
• <code>/leads</code> — Melihat pesan & form konsultasi terbaru
• <code>/portfolio</code> — Memantau daftar project portofolio
• <code>/invoices</code> — Memeriksa status tagihan & keuangan
• <code>/help</code> — Panduan bantuan perintah ini

🔔 <b>Notifikasi Otomatis:</b>
Bot akan secara otomatis mengirim pesan instan ke Telegram Anda setiap kali ada pengunjung yang mengirim pesan formulir kontak di website!
`.trim();

      const keyboard = [[{ text: "🏠 Kembali ke Menu", callback_data: "cmd_menu" }]];
      await sendReply(botToken, chatId, text, keyboard);
    } else if (callbackData === "cmd_menu") {
      const text = `
✨ <b>MENU UTAMA ADMIN SOLVIA NOVA</b>
━━━━━━━━━━━━━━━━━━━━━
Pilih menu yang ingin Anda pantau di bawah ini:
`.trim();

      const keyboard = [
        [
          { text: "📊 Statistik & Traffic", callback_data: "cmd_stats" },
          { text: "📬 Pesan / Leads Masuk", callback_data: "cmd_leads" },
        ],
        [
          { text: "💼 Cek Portofolio", callback_data: "cmd_portfolio" },
          { text: "💳 Status Invoice", callback_data: "cmd_invoices" },
        ],
        [
          { text: "🌐 Buka Dashboard Web", url: "http://localhost:3000/sso/dashboard" },
        ],
      ];

      await sendReply(botToken, chatId, text, keyboard);
    } else {
      // Unrecognized text
      await sendReply(
        botToken,
        chatId,
        `🤖 Halo! Ketik <code>/start</code> atau <code>/stats</code> untuk mulai memantau sistem Solvia Nova.`
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram Webhook Error:", error);
    return NextResponse.json({ ok: true });
  }
}

async function sendReply(
  botToken?: string,
  chatId?: number | string,
  text?: string,
  inlineKeyboard?: Array<Array<{ text: string; url?: string; callback_data?: string }>>
) {
  if (!botToken || !chatId || !text) return;

  try {
    const payload: Record<string, unknown> = {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    };

    if (inlineKeyboard && inlineKeyboard.length > 0) {
      payload.reply_markup = {
        inline_keyboard: inlineKeyboard,
      };
    }

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Gagal mengirim balasan Telegram:", err);
  }
}
