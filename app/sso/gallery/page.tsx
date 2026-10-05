"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Check, Search, Image as ImageIcon } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
}

export default function GalleryAdminPage() {
  const [photos, setPhotos] = useState<GalleryItem[]>([
    {
      id: "1",
      title: "Solusi Reklame Profesional",
      category: "Branding & Advertising",
      date: "10 Sep 2026",
      image: "https://images.unsplash.com/photo-1542744094-3a31216955a4?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "2",
      title: "NovaDex – Direktori UMKM Salatiga",
      category: "Web Application",
      date: "02 Sep 2026",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "3",
      title: "Dapur Ceria – Sistem Manajemen Bakery",
      category: "Point of Sale",
      date: "25 Aug 2026",
      image: "https://images.unsplash.com/photo-1556742049-0a675659e9cf?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "4",
      title: "DasterKu – Website Grosir Daster Wanita",
      category: "E-Commerce",
      date: "18 Aug 2026",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "5",
      title: "WorkTrack – Sistem Manajemen Karyawan dan Payroll",
      category: "HR Management",
      date: "10 Aug 2026",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "6",
      title: "MitraMan – Sistem Manajemen Mitra & Honorarium",
      category: "Enterprise System",
      date: "01 Aug 2026",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    },
  ]);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setTitle("");
    setCategory("");
    setImage("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setImage(item.image);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category) return;

    const imgUrl = image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80";

    if (editingItem) {
      setPhotos(
        photos.map((p) =>
          p.id === editingItem.id ? { ...p, title, category, image: imgUrl } : p
        )
      );
      showToast("Foto galeri berhasil diperbarui!");
    } else {
      const newPhoto: GalleryItem = {
        id: Date.now().toString(),
        title,
        category,
        date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
        image: imgUrl,
      };
      setPhotos([newPhoto, ...photos]);
      showToast("Foto galeri baru berhasil diupload!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus foto galeri ini?")) {
      setPhotos(photos.filter((p) => p.id !== id));
      showToast("Foto galeri berhasil dihapus!");
    }
  };

  const filteredPhotos = photos.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-2xl font-black text-white">Gallery</h1>
          <p className="text-slate-400 text-xs mt-1">Kelola galeri kegiatan & dokumentasi</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari foto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 w-48 sm:w-64"
            />
          </div>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/25 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Foto</span>
          </button>
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((item) => (
          <div
            key={item.id}
            className="group bg-[#0E1526]/80 border border-slate-800 rounded-2xl p-4 space-y-3 backdrop-blur-md hover:border-slate-700 transition-all shadow-xl"
          >
            <div className="relative h-44 bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 flex gap-1 bg-slate-950/70 backdrop-blur-md p-1 rounded-lg border border-slate-700">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="p-1.5 hover:bg-blue-600 text-slate-300 hover:text-white rounded transition-colors"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 hover:bg-red-600 text-red-400 hover:text-white rounded transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white line-clamp-1">{item.title}</h3>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>{item.category}</span>
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0E1A] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white">
                {editingItem ? "Edit Foto Galeri" : "Upload Foto Galeri Baru"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Judul / Caption Foto</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Workshop Sistem Architecture"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Kategori Dokumen</label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Contoh: Web Application / Event"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <ImageUploader
                value={image}
                onChange={setImage}
                label="Foto Dokumen / Galeri"
              />

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
                >
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
