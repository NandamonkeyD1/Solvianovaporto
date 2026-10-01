"use client";

import { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";

export default function SettingsAdminPage() {
  const [siteName, setSiteName] = useState("Solvia Nova");
  const [siteEmail, setSiteEmail] = useState("info@solvianova.id");
  const [sitePhone, setSitePhone] = useState("+62 831-4880-1578");
  const [siteWhatsapp, setSiteWhatsapp] = useState("https://wa.me/6283148801578");
  const [siteAddress, setSiteAddress] = useState("RT 02 / RW 05, Nanggulan Salatiga");
  const [siteInstagram, setSiteInstagram] = useState(
    "https://instagram.com/solvia_nova?igsh=MXcyeG4ycDhyMHY3ZA=="
  );
  const [signatoryName, setSignatoryName] = useState("Solvia Nova");
  const [signatoryRole, setSignatoryRole] = useState("Founder & CEO");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Settings berhasil disimpan!</span>
        </div>
      )}

      <div className="bg-[#0E1526]/80 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl backdrop-blur-md">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-2">Nama Website (Site Name)</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-2">Email Resmi (Site Email)</label>
              <input
                type="email"
                value={siteEmail}
                onChange={(e) => setSiteEmail(e.target.value)}
                className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-2">Telepon Resmi (Site Phone)</label>
              <input
                type="text"
                value={sitePhone}
                onChange={(e) => setSitePhone(e.target.value)}
                className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-2">Link WhatsApp (wa.me)</label>
              <input
                type="text"
                value={siteWhatsapp}
                onChange={(e) => setSiteWhatsapp(e.target.value)}
                className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition-colors font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-2">Alamat Perusahaan (Site Address)</label>
            <textarea
              rows={2}
              value={siteAddress}
              onChange={(e) => setSiteAddress(e.target.value)}
              className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-semibold mb-2">Instagram Link</label>
            <input
              type="text"
              value={siteInstagram}
              onChange={(e) => setSiteInstagram(e.target.value)}
              className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition-colors font-mono"
            />
          </div>

          <div className="pt-4 border-t border-slate-800/80 grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-2">Nama Penandatangan (Signatory Name)</label>
              <input
                type="text"
                value={signatoryName}
                onChange={(e) => setSignatoryName(e.target.value)}
                className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-2">Jabatan (Signatory Role)</label>
              <input
                type="text"
                value={signatoryRole}
                onChange={(e) => setSignatoryRole(e.target.value)}
                className="w-full bg-[#070A12] border border-slate-800 focus:border-blue-500 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Semua Settings</span>
          </button>
        </form>
      </div>
    </div>
  );
}
