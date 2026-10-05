"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Check, FileText, Printer, Building2, CreditCard } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

interface LineItem {
  id: string;
  description: string;
  qty: number;
  price: number;
  subDetail: string;
}

export default function CreateInvoicePage() {
  const router = useRouter();

  // 1. Informasi Invoice
  const [invoiceNo, setInvoiceNo] = useState(`INV/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/001`);
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState("Draft");

  // 2. Data Penerima
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // 3. Informasi Project
  const [projectName, setProjectName] = useState("");
  const [servicePackage, setServicePackage] = useState("");
  const [projectDuration, setProjectDuration] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // 4. Line Items
  const [items, setItems] = useState<LineItem[]>([
    {
      id: "1",
      description: "Pengembangan Sistem & Aplikasi Custom",
      qty: 1,
      price: 5000000,
      subDetail: "Fitur Dashboard, Real-time Monitoring, & Integrasi Database",
    },
  ]);

  // 5. Financials
  const [discount, setDiscount] = useState<number>(0);

  // 6. Informasi Pembayaran
  const [bankName, setBankName] = useState("BCA");
  const [accountNo, setAccountNo] = useState("1234567890");
  const [accountHolder, setAccountHolder] = useState("Solvia Nova Digital");
  const [transferType, setTransferType] = useState("Transfer Bank");

  // 7. Catatan & Signature
  const [notes, setNotes] = useState("Pembayaran harap dilakukan sesuai termin yang disepakati.");
  const [signatory, setSignatory] = useState("Solvia Nova Official");
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
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !projectName) {
      alert("Mohon isi Nama Klien dan Nama Project terlebih dahulu.");
      return;
    }

    // Persist signature image if updated
    if (signatureImage) {
      localStorage.setItem("solvia_signature_image", signatureImage);
    }
    if (signatory) {
      localStorage.setItem("solvia_signatory_name", signatory);
    }

    setToast("Invoice baru berhasil dibuat dan disimpan!");
    setTimeout(() => {
      setIsPreviewOpen(true);
    }, 1000);
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
          <h1 className="text-2xl font-black text-white">Buat Invoice Baru</h1>
          <p className="text-slate-400 text-xs mt-1">Lengkapi rincian invoice penagihan untuk klien</p>
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
            Buat Invoice
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveInvoice} className="space-y-8">
        {/* 1. Informasi Invoice Header Block */}
        <div className="bg-[#0E1526]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Informasi Invoice
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
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Tanggal Invoice <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                required
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Data Penerima (Kepada Yth.) */}
        <div className="bg-[#0E1526]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-4">
            Data Penerima (Kepada Yth.)
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Nama Perusahaan / Klien <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: PT Nusantara Digital / Dzikron Zaidan Ahmad"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Alamat Lengkap
              </label>
              <textarea
                rows={2}
                placeholder="Masukkan alamat lengkap klien..."
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="client@company.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Telepon
                </label>
                <input
                  type="text"
                  placeholder="0812-3456-7890"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Informasi Project */}
        <div className="bg-[#0E1526]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-4">
            Informasi Project
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Nama Project <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Development Prototype Autonomous Underwater Vehicle"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Paket / Jenis Layanan
              </label>
              <input
                type="text"
                placeholder="Contoh: Fullstack WebApp & IoT Automation"
                value={servicePackage}
                onChange={(e) => setServicePackage(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Durasi Project
              </label>
              <input
                type="text"
                placeholder="Contoh: Juni 2026 – Agustus 2026"
                value={projectDuration}
                onChange={(e) => setProjectDuration(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Metode Pembayaran
              </label>
              <input
                type="text"
                placeholder="Contoh: 50% DP di awal, 50% setelah selesai"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 4. Line Items Builder */}
        <div className="bg-[#0E1526]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Line Items
            </h2>
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Item</span>
            </button>
          </div>

          <div className="space-y-6">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    ITEM #{idx + 1}
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

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-6">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Deskripsi Item
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Uraian pekerjaan / komponen"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Qty
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, "qty", parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 text-center font-bold"
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
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
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
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Sub-detail / Fitur (pisahkan dengan baris baru)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Integrasi Sensor, MQTT Broker, Dashboard Telemetri..."
                    value={item.subDetail}
                    onChange={(e) => updateItem(item.id, "subDetail", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500 resize-none font-mono text-[11px]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Totals & Discounts Block */}
          <div className="pt-6 border-t border-slate-800 flex flex-col items-end space-y-3">
            <div className="w-full sm:w-72 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Subtotal:</span>
                <span className="font-bold font-mono">{formatRupiah(calculateSubtotal())}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 gap-2">
                <span>Diskon (- Rp):</span>
                <input
                  type="number"
                  min={0}
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-36 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-red-400 font-mono font-bold text-right focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between bg-blue-950/80 border border-blue-500/30 p-4 rounded-2xl text-white">
                <span className="font-black text-sm">TOTAL:</span>
                <span className="font-black text-lg text-emerald-400 font-mono">
                  {formatRupiah(calculateTotal())}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Informasi Pembayaran */}
        <div className="bg-[#0E1526]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-4">
            Informasi Pembayaran
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Nama Bank
              </label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="BCA">Bank BCA</option>
                <option value="Mandiri">Bank Mandiri</option>
                <option value="BRI">Bank BRI</option>
                <option value="BNI">Bank BNI</option>
                <option value="BSI">Bank BSI</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Nomor Rekening
              </label>
              <input
                type="text"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Atas Nama
              </label>
              <input
                type="text"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Jenis Transfer
              </label>
              <select
                value={transferType}
                onChange={(e) => setTransferType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="QRIS">QRIS</option>
                <option value="E-Wallet">E-Wallet (OVO/Dana/GoPay)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 6. Catatan & Signature Permanent Selector */}
        <div className="bg-[#0E1526]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-4">
            Tanda Tangan & Catatan (Tersimpan Otomatis)
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Catatan Tambahan
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center justify-between">
                <span>Tanda Tangan Digital & Stempel Invoice</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  (Otomatis terpasang di setiap invoice, bisa diubah di Pengaturan)
                </span>
              </div>

              <ImageUploader
                value={signatureImage}
                onChange={setSignatureImage}
                label="File Tanda Tangan / Stempel Digital"
              />

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Penandatangan Official
                </label>
                <input
                  type="text"
                  value={signatory}
                  onChange={(e) => setSignatory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar Bottom */}
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
            Buat & Simpan Invoice
          </button>
        </div>
      </form>

      {/* PRINTABLE PREVIEW MODAL */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-8 space-y-6 shadow-2xl relative my-8 print:m-0 print:p-0 print:shadow-none">
            {/* Header Action Bar */}
            <div className="flex items-center justify-between border-b pb-4 print:hidden">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                INVOICE RESMI SOLVIA NOVA
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak / Download PDF</span>
                </button>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Tutup
                </button>
              </div>
            </div>

            {/* Printable Invoice View */}
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-black text-blue-900">Solvia Nova</h2>
                  <p className="text-xs text-slate-500">Digital Solution Studio & Software House</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase text-slate-400">INVOICE</span>
                  <div className="text-lg font-black text-slate-900 font-mono">{invoiceNo}</div>
                  <div className="text-xs text-slate-500">{invoiceDate}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-2xl text-xs">
                <div>
                  <span className="font-bold text-slate-400 uppercase block mb-1">Kepada Yth:</span>
                  <div className="font-bold text-slate-900 text-sm">{clientName || "Klien Solvia"}</div>
                  <div className="text-slate-600 mt-1">{clientAddress || "-"}</div>
                  <div className="text-slate-500 font-mono mt-1">{clientEmail} | {clientPhone}</div>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase block mb-1">Informasi Project:</span>
                  <div className="font-bold text-slate-900">{projectName || "Development Project"}</div>
                  <div className="text-slate-600 mt-0.5">{servicePackage}</div>
                  <div className="text-slate-500 mt-1">Durasi: {projectDuration || "-"}</div>
                </div>
              </div>

              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-slate-500 uppercase font-bold">
                    <th className="py-2">Deskripsi</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Harga Satuan</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3">
                        <div className="font-bold text-slate-900">{item.description}</div>
                        {item.subDetail && (
                          <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                            {item.subDetail}
                          </div>
                        )}
                      </td>
                      <td className="py-3 text-center font-bold">{item.qty}</td>
                      <td className="py-3 text-right font-mono">{formatRupiah(item.price)}</td>
                      <td className="py-3 text-right font-bold font-mono text-slate-900">
                        {formatRupiah(item.qty * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-end border-t pt-4">
                <div className="text-xs space-y-1">
                  <span className="font-bold text-slate-700 block">Pembayaran Via:</span>
                  <div className="font-mono text-slate-900">{bankName} - {accountNo} (a.n. {accountHolder})</div>
                  <div className="text-slate-500">{notes}</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-xs text-slate-500">Subtotal: {formatRupiah(calculateSubtotal())}</div>
                  {discount > 0 && <div className="text-xs text-red-500">Diskon: - {formatRupiah(discount)}</div>}
                  <div className="text-lg font-black text-blue-900 font-mono">
                    Total: {formatRupiah(calculateTotal())}
                  </div>
                </div>
              </div>

              {/* Signature Image & Official Stamp Block */}
              <div className="pt-8 border-t flex justify-between items-end text-xs text-slate-500">
                <div>Status: <span className="font-bold text-blue-600">{status}</span></div>
                <div className="text-center font-bold space-y-1">
                  <div>Solvia Nova Official</div>
                  <div className="h-16 flex items-center justify-center my-1">
                    {signatureImage ? (
                      <img
                        src={signatureImage}
                        alt="Tanda Tangan Digital"
                        className="max-h-16 max-w-40 object-contain mx-auto"
                      />
                    ) : (
                      <div className="h-10 border-b border-dashed border-slate-300 w-32 mx-auto"></div>
                    )}
                  </div>
                  <div className="text-slate-900">({signatory})</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
