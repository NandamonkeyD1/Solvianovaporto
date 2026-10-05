"use client";

import { useState, useEffect } from "react";
import { Save, CheckCircle2, ShieldCheck, FileCheck } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

export default function SettingsAdminPage() {
  const [siteName, setSiteName] = useState("Solvia Nova");
  const [siteEmail, setSiteEmail] = useState("info@solvianova.id");
  const [sitePhone, setSitePhone] = useState("+62 831-4880-1578");
  const [siteWhatsapp, setSiteWhatsapp] = useState("https://wa.me/6283148801578");
  const [siteAddress, setSiteAddress] = useState("RT 02 / RW 05, Nanggulan Salatiga");
  const [siteInstagram, setSiteInstagram] = useState(
    "https://instagram.com/solvia_nova?igsh=MXcyeG4ycDhyMHY3ZA=="
  );
  const [signatoryName, setSignatoryName] = useState("Solvia Nova Official");
  const [signatoryRole, setSignatoryRole] = useState("Founder & CEO");
  const [signatureImage, setSignatureImage] = useState("");

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load persisted settings from localStorage if available
    const savedSig = localStorage.getItem("solvia_signature_image");
    const savedName = localStorage.getItem("solvia_signatory_name");
    const savedRole = localStorage.getItem("solvia_signatory_role");

    if (savedSig) setSignatureImage(savedSig);
    if (savedName) setSignatoryName(savedName);
    if (savedRole) setSignatoryRole(savedRole);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Persist signature and signatory details permanently
    localStorage.setItem("solvia_signature_image", signatureImage);
    localStorage.setItem("solvia_signatory_name", signatoryName);
    localStorage.setItem("solvia_signatory_role", signatoryRole);

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl pb-20">
      {saved && (
        <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold animate-pulse shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Pengaturan & Tanda Tangan Digital berhasil disimpan!</span>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-black text-white">Pengaturan Sistem & Tanda Tangan</h1>
        <p className="text-slate-400 text-xs mt-1">Kelola identitas perusahaan, email, alamat, dan stempel/tanda tangan invoice</p>
      </div>

      <div className="bg-[#0E1526]/80 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-8 shadow-2xl backdrop-blur-md">
        <form onSubmit={handleSave} className="space-y-8">
          {/* SECTION 1: IDENTITAS PERUSAHAAN */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Identitas & Kontak Perusahaan</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-300 text-xs font-bold mb-1.5">Nama Website (Site Name)</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-bold mb-1.5">Email Resmi (Site Email)</label>
                <input
                  type="email"
                  value={siteEmail}
                  onChange={(e) => setSiteEmail(e.target.value)}
                  className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors font-semibold"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-300 text-xs font-bold mb-1.5">Telepon Resmi (Site Phone)</label>
                <input
                  type="text"
                  value={sitePhone}
                  onChange={(e) => setSitePhone(e.target.value)}
                  className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-bold mb-1.5">Link WhatsApp (wa.me)</label>
                <input
                  type="text"
                  value={siteWhatsapp}
                  onChange={(e) => setSiteWhatsapp(e.target.value)}
                  className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-bold mb-1.5">Alamat Perusahaan (Site Address)</label>
              <textarea
                rows={2}
                value={siteAddress}
                onChange={(e) => setSiteAddress(e.target.value)}
                className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-bold mb-1.5">Instagram Link</label>
              <input
                type="text"
                value={siteInstagram}
                onChange={(e) => setSiteInstagram(e.target.value)}
                className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors font-mono"
              />
            </div>
          </div>

          {/* SECTION 2: TANDA TANGAN DIGITAL PERMANEN */}
          <div className="space-y-6 pt-6 border-t border-slate-800">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#61adff]" />
              <span>Tanda Tangan Digital & Stempel Invoice (Global Signature)</span>
            </h2>

            <p className="text-xs text-slate-400">
              Upload file tanda tangan Anda sekali di sini. File tanda tangan ini akan **otomatis terpasang di setiap invoice** baru yang Anda buat tanpa perlu mengunggah ulang.
            </p>

            <ImageUploader
              value={signatureImage}
              onChange={setSignatureImage}
              label="Upload File Tanda Tangan / Stempel Digital"
            />

            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-slate-300 text-xs font-bold mb-1.5">Nama Penandatangan (Signatory Name)</label>
                <input
                  type="text"
                  value={signatoryName}
                  onChange={(e) => setSignatoryName(e.target.value)}
                  placeholder="Contoh: Solvia Nova Official"
                  className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-bold mb-1.5">Jabatan (Signatory Role)</label>
                <input
                  type="text"
                  value={signatoryRole}
                  onChange={(e) => setSignatoryRole(e.target.value)}
                  placeholder="Contoh: Founder & CEO"
                  className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors font-semibold"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-extrabold text-xs rounded-xl transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Pengaturan & Tanda Tangan Digital</span>
          </button>
        </form>
      </div>
    </div>
  );
}
