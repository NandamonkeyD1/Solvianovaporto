"use client";

import { testimonialsData } from "@/lib/data";

export default function TestimonialCarousel() {
  // Double testimonials array for seamless infinite looping
  const doubledTestimonials = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  return (
    <div className="relative overflow-hidden w-full pt-4 pb-2">
      {/* Edge Vignette Fading */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#020611] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#020611] to-transparent z-10 pointer-events-none" />

      {/* Infinite Marquee Track */}
      <div className="animate-marquee flex gap-6">
        {doubledTestimonials.map((t, idx) => (
          <div
            key={`${t.id}-${idx}`}
            className="w-80 sm:w-96 shrink-0 bg-blue-950/40 border border-blue-400/25 hover:border-blue-400/70 rounded-2xl p-6 space-y-4 transition-all duration-300 group hover:scale-[1.02] hover:bg-blue-900/40 shadow-xl cursor-pointer"
          >
            {/* Rating Stars */}
            <div className="flex text-[#61adff] gap-1 text-sm">
              {"★".repeat(t.rating)}
            </div>

            {/* Testimonial Quote */}
            <p className="text-white text-xs sm:text-sm leading-relaxed italic font-medium">
              "{t.testimonial}"
            </p>

            {/* Client Info */}
            <div className="pt-3 border-t border-blue-400/15 flex items-center justify-between">
              <div>
                <div className="text-white font-extrabold text-xs group-hover:text-[#61adff] transition-colors">
                  {t.clientName}
                </div>
                <div className="text-blue-200 text-[11px] font-semibold mt-0.5">
                  {t.company}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-[#61adff] font-bold text-xs">
                {t.clientName.charAt(0)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
