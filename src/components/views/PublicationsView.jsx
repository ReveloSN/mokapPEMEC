import React from "react";
import { publicationsSeed } from "../../data/mockData";
import { FileText, ArrowRight, Calendar } from "lucide-react";
import { cn } from "../../utils/helpers";

export default function PublicationsView({ showToast }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Publicaciones</h2>
        <p className="mt-1 text-sm text-slate-500">Boletines epidemiológicos, informes trimestrales, fichas técnicas, lineamientos y publicaciones del semillero.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {publicationsSeed.map((pub) => (
          <div key={pub.titulo} className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col">
            <div className={cn("h-2", pub.color.includes("cyan") ? "bg-cyan-600" : pub.color.includes("teal") ? "bg-teal-600" : pub.color.includes("amber") ? "bg-amber-500" : pub.color.includes("violet") ? "bg-violet-600" : pub.color.includes("emerald") ? "bg-emerald-600" : "bg-slate-400")} />
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className={cn("rounded border px-2 py-0.5 text-[11px] font-medium", pub.color)}>{pub.tipo}</span>
                <span className="flex items-center gap-1 text-xs text-slate-400"><Calendar className="h-3 w-3" />{pub.fecha}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">{pub.titulo}</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed flex-1">{pub.descripcion}</p>
              <button onClick={() => showToast(`Abriendo: ${pub.titulo}`)} className="mt-4 flex items-center gap-2 text-sm font-medium text-[#0f2942] hover:underline">
                Ver publicación <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
