import React from "react";
import { referenceTablesSeed } from "../../data/mockData";
import { Download, Search, Database } from "lucide-react";

export default function ReferenceTablesView({ showToast }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Tablas de referencia</h2>
        <p className="mt-1 text-sm text-slate-500">Catálogos estandarizados de eventos, territorios, unidades notificadoras, variables, grupos de edad, clasificaciones y códigos internos.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input className="bg-transparent outline-none w-full" placeholder="Buscar tabla de referencia..." />
        </div>
        <button onClick={() => showToast("Catálogo completo descargado")} className="flex items-center gap-2 rounded-lg bg-[#0f2942] px-4 py-2 text-sm font-medium text-white hover:bg-[#173452]">
          <Download className="h-4 w-4" /> Descargar catálogo completo
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3">Tabla</th>
              <th className="px-4 py-3">Registros</th>
              <th className="px-4 py-3">Descripción</th>
              <th className="px-4 py-3">Última actualización</th>
              <th className="px-4 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {referenceTablesSeed.map(t => (
              <tr key={t.nombre} className="border-b border-slate-100 hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-slate-400" />
                    <span className="font-medium text-slate-900">{t.nombre}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{t.registros.toLocaleString()}</td>
                <td className="px-4 py-3 text-slate-500 max-w-xs">{t.descripcion}</td>
                <td className="px-4 py-3 text-slate-500">{t.ultima}</td>
                <td className="px-4 py-3">
                  <button onClick={() => showToast(`Descargando: ${t.nombre}`)} className="flex items-center gap-1 rounded border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                    <Download className="h-3 w-3" /> Descargar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
