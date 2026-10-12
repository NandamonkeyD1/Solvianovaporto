/**
 * Solvia Nova — Telegram Admin Bot Helper
 * Mengelola notifikasi instan dan interaksi kontrol admin via Telegram.
 */

export interface TelegramButton {
  text: string;
  url?: string;
  callback_data?: string;
}

export async function sendTelegramNotification(
  text: string,
  inlineKeyboard?: TelegramButton[][]
): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("Telegram Bot Token atau Chat ID belum disetel di .env");
    return false;
  }

  try {
    const payload: Record<string, unknown> = {
      chat_id: chatId,
      text: text,
      parse_mode: "HTML",
    };

    if (inlineKeyboard && inlineKeyboard.length > 0) {
      payload.reply_markup = {
        inline_keyboard: inlineKeyboard,
      };
    }

    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data.ok === true;
  } catch (error) {
    console.error("Gagal mengirim notifikasi Telegram:", error);
    return false;
  }
}

/**
 * Format pesan notifikasi pesan masuk / leads baru dari form kontak
 */
export function formatContactNotification(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
}): { text: string; keyboard: TelegramButton[][] } {
  const timestamp = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const text = `
🚀 <b>LEAD / PESAN BARU MASUK!</b>
━━━━━━━━━━━━━━━━━━━━━
👤 <b>Nama:</b> ${escapeHtml(data.name)}
📧 <b>Email:</b> ${escapeHtml(data.email)}
${data.phone ? `📱 <b>No. HP / WA:</b> ${escapeHtml(data.phone)}\n` : ""}${data.subject ? `📌 <b>Subjek:</b> ${escapeHtml(data.subject)}\n` : ""}
💬 <b>Pesan:</b>
<i>"${escapeHtml(data.message)}"</i>

⏰ <i>Diterima pada ${timestamp} WIB</i>
━━━━━━━━━━━━━━━━━━━━━
<i>Solvia Nova Digital Solution Studio</i>
`.trim();

  const keyboard: TelegramButton[][] = [
    [
      {
        text: "📱 Balas via WhatsApp",
        url: data.phone
          ? `https://wa.me/${data.phone.replace(/[^0-9]/g, "")}?text=Halo%20${encodeURIComponent(data.name)},%20terima%20kasih%20telah%20menghubungi%20Solvia%20Nova.`
          : `https://wa.me/6283148801578`,
      },
      {
        text: "📧 Balas via Email",
        url: `mailto:${data.email}?subject=Re:%20${encodeURIComponent(data.subject || "Konsultasi Solvia Nova")}`,
      },
    ],
    [
      {
        text: "🌐 Buka Dashboard SSO",
        url: "http://localhost:3000/sso/messages",
      },
    ],
  ];

  return { text, keyboard };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
