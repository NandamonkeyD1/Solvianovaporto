import { NextResponse } from "next/server";
import { sendTelegramNotification, formatContactNotification } from "@/lib/telegram";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, phone } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Kolom nama, email, dan pesan wajib diisi." }, { status: 400 });
    }

    console.log("Form Kontak Diterima:", { name, email, subject, message, phone, date: new Date().toISOString() });

    // Send instant push notification to Telegram Admin
    try {
      const { text, keyboard } = formatContactNotification({
        name,
        email,
        subject,
        message,
        phone,
      });
      await sendTelegramNotification(text, keyboard);
    } catch (telegramErr) {
      console.error("Gagal mengirim notifikasi Telegram:", telegramErr);
      // Non-blocking, continue execution
    }

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil terkirim!",
    });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan internal server." }, { status: 500 });
  }
}
