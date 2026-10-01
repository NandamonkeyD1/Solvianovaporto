"use client";

import { trustedClientsData } from "@/lib/data";

export default function PartnerCarousel() {
  // Duplicate array to ensure seamless infinite looping without gaps
  const doubledClients = [...trustedClientsData, ...trustedClientsData];

  return (
    <div className="relative overflow-hidden w-full pt-4 pb-2">
      {/* Left/Right Vignette Gradient Overlay for Smooth Edge Fading */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#020611] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#020611] to-transparent z-10 pointer-events-none" />

      {/* Infinite Animated Marquee Track */}
      <div className="animate-marquee flex gap-5">
        {doubledClients.map((client, idx) => (
          <div
            key={`${client.id}-${idx}`}
            className="w-52 shrink-0 bg-blue-950/40 border border-blue-400/20 hover:border-blue-400/70 rounded-2xl p-5 flex flex-col items-center justify-center space-y-2.5 transition-all duration-300 group hover:scale-105 hover:bg-blue-900/40 cursor-pointer shadow-lg"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-[#61adff] font-black text-xs tracking-wider group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-md">
              {client.logoText.slice(0, 3)}
            </div>
            <div className="text-center w-full">
              <div className="text-white font-extrabold text-xs line-clamp-1 group-hover:text-[#61adff] transition-colors">
                {client.name}
              </div>
              <div className="text-blue-300 text-[10px] font-medium mt-0.5 line-clamp-1">
                {client.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
