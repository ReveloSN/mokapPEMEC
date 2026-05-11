import React, { useState } from "react";
import { cn } from "../../utils/helpers";
import { KpiCard } from "../shared/SharedComponents";
import { microdatosSeed } from "../../data/mockData";
import { Search, Download, ShieldCheck, Filter } from "lucide-react";

export default function MicrodatosView({ showToast }) {
  const [eventFilter, setEventFilter] = useState("Todos");
  const filtered = eventFilter === "Todos" ? microdatosSeed : microdatosSeed.filter(r => r.evento === eventFilter);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Microdatos anonimizados</h2>
        <p className="mt-1 text-sm text-slate-500">Consulta y descarga de registros anonimizados de eventos notificados. Los datos no contienen información personal identificable.</p>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <strong>Protección de datos:</strong> Los microdatos disponibles han sido anonimizados conforme a la normativa vigente de protección de datos personales. No se incluyen nombres, documentos de identidad ni datos de ubicación exacta del caso.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <KpiCard title="Registros disponibles" value={microdatosSeed.length} subtitle="Corte SE 42" icon={Filter} accent="cyan" />
        <KpiCard title="Eventos" value="5" subtitle="Tipos registrados" icon={Filter} accent="emerald" />
        <KpiCard title="Territorios" value="6" subtitle="Municipios cubiertos" icon={Filter} accent="amber" />
        <KpiCard title="Formato" value="CSV / XLSX" subtitle="Descarga disponible" icon={Download} accent="slate" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input className="bg-transparent outline-none w-full" placeholder="Buscar en microdatos..." />
        </div>
        <select value={eventFilter} onChange={e => setEventFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
          <option value="Todos">Todos los eventos</option>
          <option>Falla cardiaca</option>
          <option>Diabetes T2</option>
          <option>Hipertension</option>
          <option>EPOC</option>
          <option>Insuficiencia renal</option>
        </select>
        <button onClick={() => showToast("Archivo CSV generado exitosamente")} className="flex items-center gap-2 rounded-lg bg-[#0f2942] px-4 py-2 text-sm font-medium text-white hover:bg-[#173452]">
          <Download className="h-4 w-4" /> Descargar CSV
        </button>
        <button onClick={() => showToast("Archivo Excel generado exitosamente")} className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Download className="h-4 w-4" /> Descargar Excel
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Evento</th>
                <th className="px-4 py-3">SE</th>
                <th className="px-4 py-3">Departamento</th>
                <th className="px-4 py-3">Municipio</th>
                <th className="px-4 py-3">Grupo edad</th>
                <th className="px-4 py-3">Sexo</th>
                <th className="px-4 py-3">Clasificación</th>
                <th className="px-4 py-3">Aseguramiento</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-medium text-slate-900">{r.id}</td>
                  <td className="px-4 py-3 text-slate-700">{r.evento}</td>
                  <td className="px-4 py-3 text-slate-600">{r.semana}</td>
                  <td className="px-4 py-3 text-slate-600">{r.departamento}</td>
                  <td className="px-4 py-3 text-slate-600">{r.municipio}</td>
                  <td className="px-4 py-3 text-slate-600">{r.grupoEdad}</td>
                  <td className="px-4 py-3 text-slate-600">{r.sexo}</td>
                  <td className="px-4 py-3 text-slate-600">{r.clasificacion}</td>
                  <td className="px-4 py-3 text-slate-600">{r.aseguramiento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
