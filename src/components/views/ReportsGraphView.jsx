import React, { useState } from "react";
import { cn } from "../../utils/helpers";
import { KpiCard, MiniTrendChart } from "../shared/SharedComponents";
import { departments, monthLabels, eventCatalog } from "../../data/mockData";
import { Download, Filter, Maximize2, ClipboardList, Users, Map, Activity, BarChart3 } from "lucide-react";

export default function ReportsGraphView({ showToast }) {
  const [yearFilter, setYearFilter] = useState("2024");
  const [eventFilter, setEventFilter] = useState("Todos");
  const [fullscreen, setFullscreen] = useState(false);
  const top8 = [...departments].sort((a, b) => b.c - a.c).slice(0, 8);
  const max = Math.max(...departments.map(d => d.c));

  const content = (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <select value={yearFilter} onChange={e => setYearFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"><option>2024</option><option>2023</option><option>2022</option></select>
        <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"><option>Todas las semanas</option><option>SE 42</option><option>SE 41</option><option>SE 40</option></select>
        <select value={eventFilter} onChange={e => setEventFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"><option value="Todos">Todos los eventos</option>{eventCatalog.map(e => <option key={e}>{e}</option>)}</select>
        <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"><option>Todos los departamentos</option><option>Narino</option></select>
        <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"><option>Todos los grupos de edad</option><option>0 a 4</option><option>5 a 14</option><option>15 a 34</option><option>35 a 49</option><option>50 a 64</option><option>65 y mas</option></select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <KpiCard title="Registros notificados" value="18,942" subtitle="Año 2024" icon={ClipboardList} accent="cyan" />
        <KpiCard title="Registros mujeres" value="10,218" subtitle="54% del total" icon={Users} accent="emerald" />
        <KpiCard title="Registros hombres" value="8,724" subtitle="46% del total" icon={Users} accent="amber" />
        <KpiCard title="Menores de 5 años" value="342" subtitle="1.8% del total" icon={Activity} accent="rose" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Registros por departamento (Top 8)</h3>
          <div className="space-y-3">
            {top8.map(d => (
              <div key={d.n}>
                <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">{d.n}</span><span className="font-medium text-slate-900">{d.c.toLocaleString()}</span></div>
                <div className="h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#0f2942]" style={{ width: `${(d.c / max) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Tendencia por semana epidemiológica</h3>
          <MiniTrendChart values={[180,196,210,224,235,248,255,266,274,281,290,302]} labels={monthLabels} tone="teal" tall />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Registros por grupo de edad</h3>
          <MiniTrendChart values={[342,780,1420,3200,5100,8100]} labels={["0-4","5-14","15-34","35-49","50-64","65+"]} tone="amber" tall />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Distribución por evento</h3>
          <div className="space-y-3 mt-2">
            {eventCatalog.map((ev, i) => {
              const vals = [5200,4100,3800,2480,1820,1542];
              return (
                <div key={ev} className="flex items-center justify-between border-b border-slate-100 pb-2 text-sm">
                  <span className="text-slate-600">{ev}</span>
                  <span className="font-medium text-slate-900">{vals[i].toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => showToast("Exportando PDF...")} className="flex items-center gap-2 rounded-lg bg-[#0f2942] px-4 py-2 text-sm font-medium text-white hover:bg-[#173452]"><Download className="h-4 w-4" /> Exportar PDF</button>
        <button onClick={() => showToast("Exportando Excel...")} className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"><Download className="h-4 w-4" /> Exportar Excel</button>
        <button onClick={() => showToast("Imagen descargada")} className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"><Download className="h-4 w-4" /> Descargar imagen</button>
        <button onClick={() => setFullscreen(true)} className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"><Maximize2 className="h-4 w-4" /> Pantalla completa</button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Reportes gráficos</h2>
        <p className="mt-1 text-sm text-slate-500">Dashboard de visualización tipo Power BI con indicadores, gráficas y filtros institucionales.</p>
      </div>
      {content}
      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-white p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Reportes gráficos — Vista completa</h2>
            <button onClick={() => setFullscreen(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cerrar</button>
          </div>
          {content}
        </div>
      )}
    </div>
  );
}
