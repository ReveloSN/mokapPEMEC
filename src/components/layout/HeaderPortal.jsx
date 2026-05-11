import React from "react";
import { Search, Bell, Globe } from "lucide-react";

export default function HeaderPortal({ profile, onPublic, mode }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      {/* Top institutional bar */}
      <div className="bg-[#0f2942] text-white">
        <div className="mx-auto max-w-[1440px] px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="font-semibold text-white tracking-wide">PMEC</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Plataforma de vigilancia epidemiológica de enfermedades crónicas</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={onPublic} className="flex items-center gap-1.5 text-slate-300 hover:text-white transition">
              <Globe className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{mode === "app" ? "Vista pública" : "Vista institucional"}</span>
            </button>
            {mode === "app" && profile && (
              <div className="flex items-center gap-2 text-slate-300">
                <div className="h-6 w-6 rounded bg-teal-600 flex items-center justify-center text-[10px] font-bold text-white">
                  {profile.name.split(" ").map(w => w[0]).join("")}
                </div>
                <span className="hidden md:inline">{profile.name}</span>
                <span className="hidden lg:inline text-slate-400">· {profile.role}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main header with search */}
      <div className="mx-auto max-w-[1440px] px-6 py-3 flex items-center gap-6">
        <div className="flex items-center gap-3 shrink-0">
          <div className="h-9 w-9 rounded-lg bg-[#0f2942] flex items-center justify-center text-white font-bold text-sm">P</div>
          <div className="hidden sm:block">
            <div className="text-base font-bold text-slate-900 tracking-tight leading-none">PMEC</div>
            <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">Observatorio institucional</div>
          </div>
        </div>

        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400">
            <Search className="h-4 w-4 shrink-0" />
            <input type="text" className="bg-transparent outline-none w-full text-slate-700 placeholder:text-slate-400" placeholder="Buscar evento, territorio, semana epidemiológica..." />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
