"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Check, Printer, MapPin, Phone, Mail, Globe, Sparkles } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

interface LineItem {
  id: string;
  description: string;
  qty: number;
  price: number;
  subDetail: string;
}

// Terbilang helper in Indonesian
function terbilangRupiah(n: number): string {
  if (n < 0) return "Minus " + terbilangRupiah(-n);
  if (n === 0) return "Nol Rupiah";

  const satuan = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];

  function konversi(x: number): string {
    if (x < 12) return satuan[x];
    if (x < 20) return konversi(x - 10) + " Belas";
    if (x < 100) return konversi(Math.floor(x / 10)) + " Puluh " + (x % 10 !== 0 ? konversi(x % 10) : "");
    if (x < 200) return "Seratus " + (x % 100 !== 0 ? konversi(x - 100) : "");
    if (x < 1000) return konversi(Math.floor(x / 100)) + " Ratus " + (x % 100 !== 0 ? konversi(x % 100) : "");
    if (x < 2000) return "Seribu " + (x % 1000 !== 0 ? konversi(x - 1000) : "");
    if (x < 1000000) return konversi(Math.floor(x / 1000)) + " Ribu " + (x % 1000 !== 0 ? konversi(x % 1000) : "");
    if (x < 1000000000) return konversi(Math.floor(x / 1000000)) + " Juta " + (x % 1000000 !== 0 ? konversi(x % 1000000) : "");
    if (x < 1000000000000) return konversi(Math.floor(x / 1000000000)) + " Milyar " + (x % 1000000000 !== 0 ? konversi(x % 1000000000) : "");
    return "";
  }

  const hasil = konversi(Math.floor(n)).replace(/\s+/g, " ").trim();
  return hasil ? `(${hasil} Rupiah)` : "";
}

export default function CreateInvoicePage() {
  const router = useRouter();

  // 1. Informasi Invoice
  const [invoiceNo, setInvoiceNo] = useState(`INV/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/001`);
  const [invoiceDate, setInvoiceDate] = useState(new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }));
  const [status, setStatus] = useState("Draft");

  // 2. Data Penerima
  const [clientName, setClientName] = useState("Filtrazon IoT");
  const [clientAddress, setClientAddress] = useState("Dusun Brambang rt01/02, Kelurahan Blimbing, Kec.Gatak, Kab.Sukoharjo");
  const [clientEmail, setClientEmail] = useState("helixxjust@gmail.com");
  const [clientPhone, setClientPhone] = useState("+62 812-2661-5585");

  // 3. Informasi Project
  const [projectName, setProjectName] = useState("Filtrazon IoT");
  const [servicePackage, setServicePackage] = useState("IoT System Integration, Web Dashboard Development");
  const [projectDuration, setProjectDuration] = useState("1 Juli - 30 Agustus");

  // 4. Line Items
  const [items, setItems] = useState<LineItem[]>([
    {
      id: "1",
      description: "ESP32-S3",
      qty: 1,
      price: 175000,
      subDetail: "",
    },
    {
      id: "2",
      description: "ESP32 Devkit V4",
      qty: 1,
      price: 90000,
      subDetail: "",
    },
    {
      id: "3",
      description: "Modul LoRa SX1278 433 MHz",
      qty: 2,
      price: 110000,
      subDetail: "",
    },
    {
      id: "4",
      description: "IoT Cloud Dashboard & Real-Time Data Visualization Development",
      qty: 1,
      price: 250000,
      subDetail: "- Pembuatan User Interface (UI/UX) dashboard responsif untuk visualisasi parameter air,\n- Konfigurasi widget monitoring metrik sensor (pH, TDS, kekeruhan) secara real-time,\n- Konfigurasi protokol komunikasi pengiriman data (LORA) dari mikrokontroler",
    },
  ]);

  // 5. Financials
  const [discount, setDiscount] = useState<number>(0);

  // 6. Informasi Pembayaran
  const [bankName, setBankName] = useState("Bank Mandiri");
  const [bankBadge, setBankBadge] = useState("BM");
  const [accountNo, setAccountNo] = useState("1360034942356");
  const [accountHolder, setAccountHolder] = useState("Nanda Ari Wahyu Widagdo");
  const [transferType, setTransferType] = useState("Antar Bank");

  // 7. Catatan & Signature
  const [notes, setNotes] = useState(
    "- Invoice ini merupakan dokumen resmi penagihan untuk proyek pengadaan Filtrazon IoT.\n- Pembayaran dianggap sah apabila dana telah masuk dan terverifikasi di rekening Bank Mandiri yang tertera di atas.\n- Seluruh sistem kelistrikan, sensor, dan bodi koper Filtrazon IoT dilindungi garansi pemeliharaan selama 1 (satu) bulan sejak tanggal serah terima.\n- Garansi tidak mencakup kerusakan akibat kesalahan penggunaan (human error), bencana alam, atau modifikasi mandiri tanpa persetujuan pihak kami.\n- Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima kasih."
  );
  const [signatory, setSignatory] = useState("Nanda Ari Wahyu Widagdo");
  const [signatoryTitle, setSignatoryTitle] = useState("Founder");
  const [signatureImage, setSignatureImage] = useState("");

  const [toast, setToast] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Automatically load saved global signature from localStorage
  useEffect(() => {
    const savedSig = localStorage.getItem("solvia_signature_image");
    const savedName = localStorage.getItem("solvia_signatory_name");

    if (savedSig) setSignatureImage(savedSig);
    if (savedName) setSignatory(savedName);
  }, []);

  const addItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "",
      qty: 1,
      price: 0,
      subDetail: "",
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length === 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.qty * item.price, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return Math.max(0, subtotal - discount);
  };

  const formatRupiah = (amount: number) => {
    return "Rp " + new Intl.NumberFormat("id-ID").format(amount);
  };

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !projectName) {
      alert("Mohon isi Nama Klien dan Nama Project terlebih dahulu.");
      return;
    }

    if (signatureImage) {
      localStorage.setItem("solvia_signature_image", signatureImage);
    }
    if (signatory) {
      localStorage.setItem("solvia_signatory_name", signatory);
    }

    setToast("Invoice baru berhasil dibuat dan disimpan!");
    setTimeout(() => {
      setIsPreviewOpen(true);
    }, 800);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Back Link */}
      <div>
        <Link
          href="/sso/invoice"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Invoice</span>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Buat Invoice Baru (Format Resmi)</h1>
          <p className="text-slate-400 text-xs mt-1">Lengkapi rincian invoice penagihan resmi Solvia Nova</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/sso/invoice"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
          >
            Batal
          </Link>
          <button
            onClick={handleSaveInvoice}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
          >
            Buat & Preview Invoice
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveInvoice} className="space-y-8">
        {/* 1. Header & Nomor Invoice */}
        <div className="bg-[#0E1526]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Informasi Nomor & Tanggal Invoice
            </h2>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-yellow-400 font-bold focus:outline-none focus:border-blue-500"
            >
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Lunas">Lunas</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Nomor Invoice
              </label>
              <input
                type="text"
                required
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                placeholder="INV/2026/07/004"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Tanggal Invoice <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                placeholder="22 July 2026"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
              />
            </div>
          </div>
        </div>

        {/* 2. Data Penerima (Kepada Yth.) & Informasi Project */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0E1526]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              KEPADA YTH.
            </h2>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Nama Klien / Perusahaan *</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Filtrazon IoT"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Alamat Lengkap</label>
              <textarea
                rows={2}
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                placeholder="Dusun Brambang rt01/02..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
                <input
                  type="text"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Telepon</label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+62 812..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0E1526]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              INFORMASI PROJECT
            </h2>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Nama Project *</label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Filtrazon IoT"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Paket / Deskripsi Layanan</label>
              <input
                type="text"
                value={servicePackage}
                onChange={(e) => setServicePackage(e.target.value)}
                placeholder="IoT System Integration, Web Dashboard Development"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Durasi Project</label>
              <input
                type="text"
                value={projectDuration}
                onChange={(e) => setProjectDuration(e.target.value)}
                placeholder="1 Juli - 30 Agustus"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-semibold"
              />
            </div>
          </div>
        </div>

        {/* 3. RINCIAN LAYANAN Line Items Builder */}
        <div className="bg-[#0E1526]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              RINCIAN LAYANAN & ITEM
            </h2>
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Item Layanan</span>
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 uppercase font-mono">
                    NO #{idx + 1}
                  </span>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                      title="Hapus Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-6">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Deskripsi Layanan / Komponen
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama komponen / layanan"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1 text-center">
                      Qty
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, "qty", parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white text-center font-bold"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Harga Satuan (Rp)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={item.price}
                      onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Total
                    </label>
                    <div className="bg-slate-950 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-emerald-400 font-extrabold font-mono truncate">
                      {formatRupiah(item.qty * item.price)}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">
                    Sub-detail / Poin Fitur (Gunakan awalan dash "-" per baris)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="- Poin 1...&#10;- Poin 2..."
                    value={item.subDetail}
                    onChange={(e) => updateItem(item.id, "subDetail", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-300 resize-none font-mono text-[11px]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal & Total Output */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <div className="w-full sm:w-72 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Subtotal:</span>
                <span className="font-bold font-mono text-white">{formatRupiah(calculateSubtotal())}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300 gap-2">
                <span>Diskon (- Rp):</span>
                <input
                  type="number"
                  min={0}
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-32 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-red-400 font-mono font-bold text-right"
                />
              </div>
              <div className="flex items-center justify-between bg-blue-950/80 border border-blue-500/30 p-3 rounded-2xl text-white">
                <span className="font-black text-xs">TOTAL:</span>
                <span className="font-black text-base text-emerald-400 font-mono">
                  {formatRupiah(calculateTotal())}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Informasi Pembayaran, Catatan, & Tanda Tangan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0E1526]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              INFORMASI PEMBAYARAN
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Badge Bank</label>
                <input
                  type="text"
                  value={bankBadge}
                  onChange={(e) => setBankBadge(e.target.value)}
                  placeholder="BM"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold text-center"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Nama Bank</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Bank Mandiri"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Nomor Rekening</label>
              <input
                type="text"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                placeholder="1360034942356"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Atas Nama (a.n.)</label>
              <input
                type="text"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                placeholder="Nanda Ari Wahyu Widagdo"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Jenis Transfer</label>
              <input
                type="text"
                value={transferType}
                onChange={(e) => setTransferType(e.target.value)}
                placeholder="Antar Bank"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-semibold"
              />
            </div>
          </div>

          <div className="bg-[#0E1526]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              TANDA TANGAN & CATATAN
            </h2>
            <ImageUploader
              value={signatureImage}
              onChange={setSignatureImage}
              label="Tanda Tangan Digital Official"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Nama Penandatangan</label>
                <input
                  type="text"
                  value={signatory}
                  onChange={(e) => setSignatory(e.target.value)}
                  placeholder="Nanda Ari Wahyu Widagdo"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Jabatan</label>
                <input
                  type="text"
                  value={signatoryTitle}
                  onChange={(e) => setSignatoryTitle(e.target.value)}
                  placeholder="Founder"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Catatan Tambahan (Ketentuan)</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="- Invoice ini merupakan dokumen..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-[11px] text-slate-300 resize-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Link
            href="/sso/invoice"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-extrabold shadow-xl shadow-blue-600/30 transition-all hover:scale-105"
          >
            Buat & Preview Invoice PDF
          </button>
        </div>
      </form>

      {/* EXACT OFFICIAL SOLVIA NOVA INVOICE PRINTABLE / PDF MODAL */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-4xl w-full p-6 sm:p-10 space-y-8 shadow-2xl relative my-8 print:m-0 print:p-0 print:shadow-none print:w-full print:max-w-none">
            {/* Action Bar Header */}
            <div className="flex items-center justify-between border-b pb-4 print:hidden">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                  PREVIEW INVOICE RESMI SOLVIA NOVA
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-lg transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak / Simpan PDF</span>
                </button>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>

            {/* DOCUMENT CONTENT PREVIEW (MATCHING DESIGN 100%) */}
            <div className="space-y-8 font-sans text-slate-800 leading-normal print:space-y-6">
              
              {/* TOP HEADER BOX */}
              <div className="border border-slate-200 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-sm">
                {/* Left Brand Column */}
                <div className="md:col-span-5 space-y-1 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center text-white font-black text-base">
                      S
                    </div>
                    <div className="text-2xl font-black text-blue-900 tracking-tight">
                      SOLVIA.NOVA
                    </div>
                  </div>
                  <div className="text-[10px] font-extrabold text-blue-800 tracking-wider uppercase">
                    DIGITAL SOLUTION PARTNER
                  </div>
                  <p className="text-[11px] text-slate-500 italic pt-1">
                    "Membangun Solusi Digital untuk Masa Depan Bisnismu"
                  </p>
                </div>

                {/* Middle Contact Info Column */}
                <div className="md:col-span-4 space-y-2 text-[11px] border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-900 w-20 shrink-0">ALAMAT</span>
                    <span className="text-slate-600">: Jl.GumukrejoRT 05 RW 05, Nanggulan Salatiga</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 w-20 shrink-0">WHATSAPP</span>
                    <span className="text-slate-600">: 6283148801578</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 w-20 shrink-0">EMAIL</span>
                    <span className="text-slate-600">: solvianova1@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 w-20 shrink-0">WEBSITE</span>
                    <span className="text-slate-600">: solvianova.my.id</span>
                  </div>
                </div>

                {/* Right INVOICE Number Column */}
                <div className="md:col-span-3 text-center md:text-right space-y-1">
                  <h1 className="text-3xl font-black text-blue-900 tracking-tight">
                    INVOICE
                  </h1>
                  <div className="text-xs font-bold font-mono text-slate-700">
                    NO. {invoiceNo}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">
                    {invoiceDate}
                  </div>
                </div>
              </div>

              {/* KEPADA YTH & INFORMASI PROJECT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                {/* Kepada Yth */}
                <div className="space-y-1.5">
                  <span className="font-extrabold text-blue-950 uppercase tracking-wider block text-[11px]">
                    KEPADA YTH.
                  </span>
                  <div className="font-bold text-slate-900 text-sm">{clientName || "Klien Solvia Nova"}</div>
                  <div className="text-slate-600 leading-relaxed max-w-sm">{clientAddress || "-"}</div>
                  {clientEmail && <div className="text-slate-500 font-mono pt-1">Email: {clientEmail}</div>}
                  {clientPhone && <div className="text-slate-500 font-mono">Telepon: {clientPhone}</div>}
                </div>

                {/* Informasi Project */}
                <div className="space-y-2">
                  <span className="font-extrabold text-blue-950 uppercase tracking-wider block text-[11px]">
                    INFORMASI PROJECT
                  </span>
                  <div className="grid grid-cols-12 gap-1 text-slate-700">
                    <span className="col-span-4 font-semibold text-slate-600">Nama Project</span>
                    <span className="col-span-8 font-bold text-slate-900">: {projectName}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 text-slate-700">
                    <span className="col-span-4 font-semibold text-slate-600">Paket</span>
                    <span className="col-span-8 font-medium text-slate-800">: {servicePackage || "-"}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 text-slate-700">
                    <span className="col-span-4 font-semibold text-slate-600">Durasi</span>
                    <span className="col-span-8 font-medium text-slate-800">: {projectDuration || "-"}</span>
                  </div>
                </div>
              </div>

              {/* RINCIAN LAYANAN TABLE */}
              <div className="space-y-2">
                <span className="font-extrabold text-blue-950 uppercase tracking-wider block text-[11px]">
                  RINCIAN LAYANAN
                </span>

                <div className="overflow-hidden border border-slate-200 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#0B1E48] text-white font-bold uppercase text-[11px] tracking-wider">
                        <th className="py-3 px-4 text-center w-12">NO</th>
                        <th className="py-3 px-4">DESKRIPSI</th>
                        <th className="py-3 px-4 text-center w-16">QTY</th>
                        <th className="py-3 px-4 text-right w-36">HARGA SATUAN</th>
                        <th className="py-3 px-4 text-right w-36">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {items.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-slate-50/50">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-600 align-top">
                            {idx + 1}
                          </td>
                          <td className="py-3.5 px-4 align-top">
                            <div className="font-bold text-slate-900 text-xs">{item.description}</div>
                            {item.subDetail && (
                              <div className="text-[11px] text-slate-600 mt-1 space-y-0.5 font-sans whitespace-pre-line leading-relaxed">
                                {item.subDetail}
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center font-bold text-slate-800 align-top">
                            {item.qty}
                          </td>
                          <td className="py-3.5 px-4 text-right font-semibold font-mono text-slate-800 align-top">
                            {formatRupiah(item.price)}
                          </td>
                          <td className="py-3.5 px-4 text-right font-extrabold font-mono text-slate-900 align-top">
                            {formatRupiah(item.qty * item.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TOTAL PEMBAYARAN, SUBTOTAL, & INFORMASI PEMBAYARAN */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Left Side: TOTAL PEMBAYARAN BOX & INFORMASI PEMBAYARAN */}
                <div className="md:col-span-7 space-y-6">
                  {/* Total Pembayaran Box */}
                  <div className="border border-slate-200 bg-slate-50/50 rounded-2xl p-5 space-y-1.5">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                      TOTAL PEMBAYARAN
                    </span>
                    <div className="text-3xl font-black text-blue-950 font-mono">
                      {formatRupiah(calculateTotal())}
                    </div>
                    <div className="text-xs text-slate-600 italic font-medium">
                      {terbilangRupiah(calculateTotal())}
                    </div>
                  </div>

                  {/* Informasi Pembayaran Box */}
                  <div className="border border-slate-200 rounded-2xl p-5 space-y-3">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                      INFORMASI PEMBAYARAN
                    </span>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-900 text-white font-black flex items-center justify-center text-sm shrink-0 shadow-sm">
                        {bankBadge || "BM"}
                      </div>
                      <div className="space-y-0.5 text-xs">
                        <div className="font-bold text-slate-900 text-sm">{bankName}</div>
                        <div className="font-extrabold font-mono text-blue-900 text-base">{accountNo}</div>
                        <div className="text-slate-600">a.n. {accountHolder}</div>
                        <div className="text-[11px] text-slate-500 font-medium pt-1">
                          Jenis Transfer: {transferType}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Subtotal & Signatory */}
                <div className="md:col-span-5 space-y-6 flex flex-col justify-between h-full">
                  {/* Subtotal / Total Summary */}
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center text-xs text-slate-600">
                      <span className="font-medium">Subtotal</span>
                      <span className="font-bold font-mono text-slate-900">{formatRupiah(calculateSubtotal())}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between items-center text-xs text-red-500">
                        <span>Diskon</span>
                        <span className="font-bold font-mono">- {formatRupiah(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm font-black border-t pt-3 text-slate-900">
                      <span>TOTAL</span>
                      <span className="text-blue-900 font-mono text-base">{formatRupiah(calculateTotal())}</span>
                    </div>
                  </div>

                  {/* TANDA TANGAN OFFICIAL */}
                  <div className="text-center space-y-2 pt-6">
                    <span className="text-xs font-semibold text-slate-600 block">
                      Hormat Kami,
                    </span>
                    <div className="h-20 flex items-center justify-center my-1">
                      {signatureImage ? (
                        <img
                          src={signatureImage}
                          alt="Tanda Tangan Official"
                          className="max-h-20 max-w-48 object-contain mx-auto"
                        />
                      ) : (
                        <div className="h-14 border-b border-dashed border-slate-300 w-36 mx-auto" />
                      )}
                    </div>
                    <div>
                      <div className="font-black text-slate-900 text-sm">{signatory}</div>
                      <div className="text-xs text-slate-500 font-medium">{signatoryTitle}</div>
                      <div className="text-[10px] font-bold text-blue-900 mt-1 uppercase tracking-wider flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        <span>Solvia.Nova Digital Solution Partner</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CATATAN & FOOTER LINE */}
              {notes && (
                <div className="border-t pt-4 space-y-2 text-xs text-slate-600">
                  <span className="font-extrabold text-blue-950 uppercase tracking-wider block text-[11px]">
                    CATATAN
                  </span>
                  <div className="whitespace-pre-line leading-relaxed text-[11px] font-normal text-slate-600 pl-1">
                    {notes}
                  </div>
                </div>
              )}

              {/* Bottom Footer Line */}
              <div className="border-t pt-4 text-center text-[10px] text-slate-400 font-medium flex flex-wrap justify-center gap-4">
                <span>Jl.GumukrejoRT 05 RW 05, Nanggulan Salatiga</span>
                <span>•</span>
                <span>solvianova1@gmail.com</span>
                <span>•</span>
                <span>solvianova.my.id</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
