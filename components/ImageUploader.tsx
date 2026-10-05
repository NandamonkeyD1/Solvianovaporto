"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Upload, Link as LinkIcon, Image as ImageIcon, X } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = "Foto Visual / Gambar" }: ImageUploaderProps) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Mohon pilih file gambar yang valid (JPG, PNG, WEBP, GIF, dll).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-300">{label}</label>
        
        {/* Toggle Mode: File Upload vs Input URL */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700/80 p-0.5 rounded-lg text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
              mode === "upload"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
              mode === "url"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Input URL</span>
          </button>
        </div>
      </div>

      {/* Mode Input: File Browser */}
      {mode === "upload" && (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload-input"
          />
          <label
            htmlFor="file-upload-input"
            className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl bg-slate-900/60 cursor-pointer transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                Klik untuk memilih file dari komputer
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Mendukung PNG, JPG, WEBP, GIF (Max file size ~5MB)
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Mode Input: URL Link */}
      {mode === "url" && (
        <div className="relative">
          <div className="absolute left-3 top-3 text-slate-400 pointer-events-none">
            <LinkIcon className="w-4 h-4" />
          </div>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>
      )}

      {/* Live Image Preview */}
      {value && (
        <div className="relative mt-3 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 group">
          <div className="h-36 w-full flex items-center justify-center bg-slate-900/50">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md p-1 rounded-lg border border-slate-700 flex items-center gap-1">
            <span className="text-[10px] text-emerald-400 font-bold px-1.5">Selected</span>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="p-1 text-slate-400 hover:text-red-400 transition-colors"
              title="Hapus Gambar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
