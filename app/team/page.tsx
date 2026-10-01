import Link from "next/link";
import { Users, Mail, ArrowRight, Code, Palette, FileText, BarChart3, Sparkles } from "lucide-react";
import { teamData } from "@/lib/data";

export default function TeamPage() {
  const getRoleIcon = (name: string, position: string) => {
    if (position.includes("Founder") || name.includes("Solvia")) return Sparkles;
    if (name.includes("Dev")) return Code;
    if (name.includes("Design")) return Palette;
    if (name.includes("Content")) return FileText;
    if (name.includes("Analyst")) return BarChart3;
    return Users;
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold tracking-wider uppercase">
          <Users className="w-3.5 h-3.5" />
          Tim Solvia Nova
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
          Orang-Orang di Balik <span className="text-nova-blue">Solvia Nova</span>
        </h1>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-medium">
          Profesional berpengalaman yang berdedikasi penuh merancang, membangun, dan mengoptimalkan solusi digital bisnis Anda.
        </p>
      </div>

      {/* UNIFORM TEAM GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamData.map((member) => {
          const isFounder = member.position.includes("Founder") || member.name.includes("Solvia");
          const IconComp = getRoleIcon(member.name, member.position);

          return (
            <div
              key={member.id}
              className={`bg-[#020611]/90 backdrop-blur-xl border rounded-3xl p-7 space-y-6 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1 ${
                isFounder
                  ? "border-blue-400/60 hover:border-blue-400 shadow-blue-600/20"
                  : "border-blue-400/30 hover:border-blue-400/70"
              }`}
            >
              <div className="space-y-5">
                {/* Header Tag & Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-[#61adff] group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-lg">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      isFounder
                        ? "bg-blue-500/20 border-blue-400/50 text-[#61adff]"
                        : "bg-blue-950/60 border-blue-500/20 text-blue-300"
                    }`}
                  >
                    {isFounder ? "Founder & CEO" : "Core Team"}
                  </span>
                </div>

                {/* Name & Position */}
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-[#61adff] transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-blue-400 text-xs font-extrabold mt-1">{member.position}</div>
                </div>

                {/* Bio */}
                <p className="text-blue-100 text-xs leading-relaxed font-medium">{member.bio}</p>
              </div>

              {/* Skills Footer */}
              <div className="space-y-3 pt-4 border-t border-blue-400/20">
                <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">
                  Keahlian & Core Skills:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-blue-950/70 border border-blue-400/20 text-blue-200 text-xs font-bold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* JOIN TEAM CTA */}
      <div className="bg-gradient-to-r from-blue-950/90 via-[#020611] to-blue-900/90 border border-blue-400/30 rounded-3xl p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-6 backdrop-blur-xl shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-[#61adff] mx-auto">
          <Users className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl lg:text-3xl font-black text-white">Bergabung dengan Tim Solvia Nova</h3>
          <p className="text-blue-100 text-xs lg:text-sm max-w-xl mx-auto font-medium">
            Kami selalu terbuka untuk talenta hebat yang passionate di bidang Next.js, 3D WebGL, UI/UX, dan Software Engineering.
          </p>
        </div>
        <div className="pt-2">
          <a
            href="mailto:career@solvianova.id"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-bold rounded-xl transition-all shadow-xl shadow-blue-600/30 hover:scale-105"
          >
            <Mail className="w-4 h-4" />
            Kirim Portofolio Anda
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}


