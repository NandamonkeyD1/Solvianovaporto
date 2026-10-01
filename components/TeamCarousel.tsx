"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Crown, Sparkles } from "lucide-react";
import { teamData, TeamMember } from "@/lib/data";

export default function TeamCarousel() {
  // Founder (Solvia Nova) is placed at index 2 (exact center of 5 members)
  const founder = teamData.find((m) => m.position.includes("Founder") || m.name.includes("Solvia")) || teamData[0];
  const others = teamData.filter((m) => m.id !== founder.id);

  const orderedTeam: TeamMember[] = [
    others[0],
    others[1],
    founder,
    others[2],
    others[3],
  ];

  // Default active index is 2 (Solvia Nova - Founder & CEO)
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % orderedTeam.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + orderedTeam.length) % orderedTeam.length);
  };

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeIndex]);

  // Helper to calculate circular distance for 3D depth effect
  const getCardStyle = (index: number) => {
    const total = orderedTeam.length;
    let diff = index - activeIndex;

    // Adjust for circular wrap
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;

    if (diff === 0) {
      // CENTER ACTIVE CARD
      return {
        transform: "translateX(0%) scale(1.04)",
        zIndex: 30,
        opacity: 1,
        filter: "brightness(1.1)",
      };
    } else if (diff === -1) {
      // IMMEDIATE LEFT
      return {
        transform: "translateX(-68%) scale(0.86) rotateY(10deg)",
        zIndex: 20,
        opacity: 0.75,
        filter: "brightness(0.85)",
      };
    } else if (diff === 1) {
      // IMMEDIATE RIGHT
      return {
        transform: "translateX(68%) scale(0.86) rotateY(-10deg)",
        zIndex: 20,
        opacity: 0.75,
        filter: "brightness(0.85)",
      };
    } else if (diff < -1) {
      // FAR LEFT
      return {
        transform: "translateX(-125%) scale(0.72) rotateY(20deg)",
        zIndex: 10,
        opacity: 0.4,
        filter: "brightness(0.6)",
      };
    } else {
      // FAR RIGHT
      return {
        transform: "translateX(125%) scale(0.72) rotateY(-20deg)",
        zIndex: 10,
        opacity: 0.4,
        filter: "brightness(0.6)",
      };
    }
  };

  return (
    <div
      className="relative max-w-6xl mx-auto px-4 py-4 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Centered Stage - No overflow-hidden so glow effects & 3D cards aren't clipped */}
      <div className="relative h-[480px] md:h-[520px] flex items-center justify-center perspective-[1000px] py-6">
        {orderedTeam.map((member, idx) => {
          const isCenter = idx === activeIndex;
          const isFounder = member.id === founder.id;
          const cardStyle = getCardStyle(idx);

          return (
            <div
              key={member.id}
              onClick={() => setActiveIndex(idx)}
              style={cardStyle}
              className={`absolute w-[280px] sm:w-[310px] md:w-[340px] rounded-3xl p-6 transition-all duration-700 ease-out cursor-pointer backdrop-blur-2xl flex flex-col justify-between ${
                isCenter
                  ? "bg-gradient-to-b from-[#08183c] via-[#020611] to-[#0b2866] border-2 border-[#4c91ff] shadow-[0_0_50px_rgba(76,145,255,0.45)]"
                  : "bg-[#020611]/85 border border-blue-500/25"
              }`}
            >
              <div className="space-y-4">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full border text-xs font-extrabold uppercase tracking-wider shadow-md ${
                      isFounder
                        ? "bg-blue-500/20 border-blue-400/50 text-[#61adff]"
                        : "bg-blue-950/50 border-blue-500/20 text-blue-300"
                    }`}
                  >
                    {isFounder ? "Founder & CEO" : "Core Team"}
                  </span>

                  {isCenter && (
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-[#61adff] text-[10px] font-extrabold uppercase">
                      <span className="w-2 h-2 rounded-full bg-[#61adff] animate-ping" />
                      Active
                    </span>
                  )}
                </div>

                {/* Avatar Icon */}
                <div className="relative mx-auto w-20 h-20 my-2">
                  <div
                    className={`w-full h-full rounded-2xl flex items-center justify-center font-black text-3xl shadow-2xl transition-all ${
                      isFounder
                        ? "bg-gradient-to-tr from-blue-600 via-blue-500 to-[#61adff] text-white ring-2 ring-[#4c91ff]/50"
                        : "bg-blue-600/30 border border-blue-400/30 text-[#61adff]"
                    }`}
                  >
                    {member.name.charAt(0)}
                  </div>
                </div>

                {/* Title & Position */}
                <div className="text-center">
                  <h3 className="text-xl font-black text-white">{member.name}</h3>
                  <div className="text-blue-400 text-xs font-extrabold mt-0.5">{member.position}</div>
                </div>

                {/* Description */}
                <p className="text-blue-100 text-xs leading-relaxed text-center font-medium line-clamp-3">
                  {member.bio}
                </p>
              </div>

              {/* Skills Footer */}
              <div className="pt-4 border-t border-blue-500/20 mt-4">
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {member.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg bg-blue-950/70 border border-blue-400/20 text-blue-200 text-[10px] font-bold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls & Pagination */}
      <div className="flex items-center justify-center gap-6 pt-4">
        <button
          onClick={prevSlide}
          className="w-11 h-11 rounded-full bg-[#020611]/90 border border-blue-400/40 text-white flex items-center justify-center hover:bg-blue-600 hover:border-blue-400 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Previous Team Member"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2.5">
          {orderedTeam.map((member, idx) => (
            <button
              key={member.id}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === activeIndex
                  ? "w-9 h-3 bg-[#4c91ff] shadow-[0_0_15px_#4c91ff]"
                  : "w-3 h-3 bg-blue-950 border border-blue-500/40 hover:bg-blue-600"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-11 h-11 rounded-full bg-[#020611]/90 border border-blue-400/40 text-white flex items-center justify-center hover:bg-blue-600 hover:border-blue-400 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Next Team Member"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}

