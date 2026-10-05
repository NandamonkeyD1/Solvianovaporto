"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Check, Search, UserCheck } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  email: string;
  avatar: string;
  skills: string[];
}

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Solvia Nova",
      position: "Founder & CEO",
      email: "ceo@solvianova.id",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      skills: ["PHP", "System Architecture", "Business Strategy", "Project Management"],
    },
    {
      id: "2",
      name: "Dev Team Lead",
      position: "Lead Fullstack Developer",
      email: "dev@solvianova.id",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      skills: ["Laravel", "React", "Vue.js", "MySQL", "Docker", "Redis"],
    },
    {
      id: "3",
      name: "Design Team Lead",
      position: "UI/UX & Visual Designer",
      email: "design@solvianova.id",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      skills: ["Figma", "Framer", "TailwindCSS", "Motion Design", "Prototyping"],
    },
  ]);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [skillsInput, setSkillsInput] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setName("");
    setPosition("");
    setEmail("");
    setAvatar("");
    setSkillsInput("React, Next.js, Node.js");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: TeamMember) => {
    setEditingItem(item);
    setName(item.name);
    setPosition(item.position);
    setEmail(item.email);
    setAvatar(item.avatar);
    setSkillsInput(item.skills ? item.skills.join(", ") : "");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !position) return;

    const skillsArray = skillsInput
      ? skillsInput.split(",").map((s) => s.trim()).filter(Boolean)
      : ["Software Engineering"];

    const avatarUrl = avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80";

    if (editingItem) {
      setMembers(
        members.map((m) =>
          m.id === editingItem.id
            ? { ...m, name, position, email, avatar: avatarUrl, skills: skillsArray }
            : m
        )
      );
      showToast("Profil anggota tim berhasil diperbarui!");
    } else {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name,
        position,
        email: email || `${name.toLowerCase().replace(/\s+/g, "")}@solvianova.id`,
        avatar: avatarUrl,
        skills: skillsArray,
      };
      setMembers([...members, newMember]);
      showToast("Anggota tim baru berhasil ditambahkan!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus anggota tim ini?")) {
      setMembers(members.filter((m) => m.id !== id));
      showToast("Anggota tim berhasil dihapus!");
    }
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.position.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-2xl font-black text-white">Team Management</h1>
          <p className="text-slate-400 text-xs mt-1">Kelola foto visual profil, jabatan, dan keahlian anggota tim</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari anggota tim..."
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
            <span>Tambah Anggota Tim</span>
          </button>
        </div>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-[#0E1526]/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 backdrop-blur-md shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border-2 border-blue-500/30 shrink-0 shadow-lg">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{member.name}</h3>
                  <div className="text-blue-400 text-xs font-bold mt-0.5">{member.position}</div>
                  <div className="text-slate-400 text-[11px] font-mono mt-1">{member.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEditModal(member)}
                  className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Keahlian & Skills Chips */}
            <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Keahlian & Technical Skills:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {member.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-blue-300 text-[11px] font-semibold"
                  >
                    {skill}
                  </span>
                ))}
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
                {editingItem ? "Edit Anggota Tim & Foto" : "Tambah Anggota Tim Baru"}
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
                <label className="block text-xs font-bold text-slate-300 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Solvia Nova"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Jabatan / Posisi</label>
                <input
                  type="text"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Contoh: Founder & CEO / Lead Fullstack Developer"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Profesional</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@solvianova.id"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Photo Upload & URL component */}
              <ImageUploader
                value={avatar}
                onChange={setAvatar}
                label="Foto Profil Anggota Tim"
              />

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Keahlian / Skills (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="React, Next.js, System Architecture, PHP"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
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
                  Simpan Anggota & Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
