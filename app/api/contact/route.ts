import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Kolom nama, email, dan pesan wajib diisi." }, { status: 400 });
    }

    console.log("Form Kontak Diterima:", { name, email, subject, message, date: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil terkirim!",
    });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan internal server." }, { status: 500 });
  }
}
