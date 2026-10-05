"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Check, Search, Image as ImageIcon, ExternalLink } from "lucide-react";
import { portfolioData, Portfolio } from "@/lib/data";
import ImageUploader from "@/components/ImageUploader";

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<Portfolio[]>(portfolioData);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Form fields state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [client, setClient] = useState("");
  const [techInput, setTechInput] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("Published");
  const [shortDesc, setShortDesc] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setName("");
    setCategory("");
    setClient("Client");
    setTechInput("React, Next.js, Node.js");
    setImage("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80");
    setStatus("Published");
    setShortDesc("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Portfolio) => {
    setEditingItem(item);
    setName(item.name);
    setCategory(item.category);
    setClient(item.client || "Client");
    setTechInput(item.techStack ? item.techStack.join(", ") : "");
    setImage(item.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80");
    setStatus(item.status || "Published");
    setShortDesc(item.shortDesc || "");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category) return;

    const techArray = techInput
      ? techInput.split(",").map((t) => t.trim()).filter(Boolean)
      : ["React", "Next.js"];

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const imageUrl = image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80";

    if (editingItem) {
      // Update existing item
      setItems(
        items.map((i) =>
          i.id === editingItem.id
            ? {
                ...i,
                name,
                slug,
                category,
                client,
                techStack: techArray,
                image: imageUrl,
                status,
                shortDesc,
              }
            : i
        )
      );
      showToast("Portofolio berhasil diperbarui!");
    } else {
      // Create new item
      const newItem: Portfolio = {
        id: Date.now().toString(),
        name,
        slug,
        category,
        client: client || "Client Solvia",
        year: new Date().getFullYear(),
        shortDesc: shortDesc || `Project ${name} dikembangkan dengan teknologi modern.`,
        description: shortDesc || `Project ${name} dikembangkan dengan teknologi modern.`,
        techStack: techArray,
        image: imageUrl,
        status,
      };
      setItems([newItem, ...items]);
      showToast("Portofolio baru berhasil ditambahkan!");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus portofolio ini?")) {
      setItems(items.filter((i) => i.id !== id));
      showToast("Portofolio berhasil dihapus!");
    }
  };

  const filteredItems = items.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase()) ||
      i.slug.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-2xl font-black text-white">Portfolio</h1>
          <p className="text-slate-400 text-xs mt-1">Kelola portofolio, foto visual, dan studi kasus</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari project..."
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
            <span>Tambah Portfolio</span>
          </button>
        </div>
      </div>

      {/* Portfolio Table with Image Thumbnails */}
      <div className="bg-[#0E1526]/80 border border-slate-800 rounded-2xl backdrop-blur-md overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">FOTO & PROJECT</th>
                <th className="py-4 px-6">KATEGORI & KLIEN</th>
                <th className="py-4 px-6">TEKNOLOGI</th>
                <th className="py-4 px-6">STATUS</th>
                <th className="py-4 px-6 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                  {/* PROJECT PHOTO & NAME */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-11 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm line-clamp-1">{item.name}</div>
                        <div className="text-slate-400 text-[11px] font-mono">{item.slug}</div>
                      </div>
                    </div>
                  </td>

                  {/* KATEGORI & KLIEN */}
                  <td className="py-4 px-6">
                    <div className="text-slate-200 font-bold">{item.category}</div>
                    <div className="text-slate-400 text-[11px] font-medium">{item.client || "Client"} ({item.year || 2026})</div>
                  </td>

                  {/* TEKNOLOGI */}
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                      {item.techStack?.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {item.status || "Published"}
                    </span>
                  </td>

                  {/* AKSI */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0E1A] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white">
                {editingItem ? "Edit Portfolio & Foto" : "Tambah Portfolio Baru"}
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
                <label className="block text-xs font-bold text-slate-300 mb-1">Nama Project</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: ERP Manufacturing System"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <ImageUploader
                value={image}
                onChange={setImage}
                label="Foto Visual / Gambar Project"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Kategori</label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Contoh: Web App / Enterprise"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Klien / Industri</label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="PT Maju Industri"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Teknologi (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Next.js, React, Node.js"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Jelaskan gambaran singkat project ini..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

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
                  Simpan Project & Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
