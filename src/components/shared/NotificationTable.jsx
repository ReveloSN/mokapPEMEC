import React from "react";
import { cn, alertClasses, behaviorClasses, variationClasses } from "../../utils/helpers";

export default function NotificationTable({ notifications, onSelect, onAnalytics }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            <th className="py-3 pr-4">Evento</th>
            <th className="py-3 pr-4">SE</th>
            <th className="py-3 pr-4">Territorio</th>
            <th className="py-3 pr-4">Casos</th>
            <th className="py-3 pr-4">Variación</th>
            <th className="py-3 pr-4">Comportamiento</th>
            <th className="py-3 pr-4">Alerta</th>
            <th className="py-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((item) => {
            const openAnalysis = item.accion.toLowerCase().includes("analisis");
            return (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/60">
                <td className="py-3 pr-4">
                  <div className="font-medium text-slate-900">{item.evento}</div>
                  <div className="text-xs text-slate-400">{item.id}</div>
                </td>
                <td className="py-3 pr-4 text-slate-600">{item.semana}</td>
                <td className="py-3 pr-4 text-slate-600">{item.territorio}</td>
                <td className="py-3 pr-4 font-medium text-slate-900">{item.casos}</td>
                <td className={cn("py-3 pr-4 font-medium", variationClasses(item.variacion))}>{item.variacion}</td>
                <td className="py-3 pr-4">
                  <span className={cn("inline-flex rounded border px-2 py-0.5 text-xs font-medium", behaviorClasses(item.comportamiento))}>
                    {item.comportamiento}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <span className={cn("inline-flex rounded border px-2 py-0.5 text-xs font-medium", alertClasses(item.alerta))}>
                    {item.alerta}
                  </span>
                </td>
                <td className="py-3">
                  <button
                    onClick={() => (openAnalysis ? onAnalytics(item.id) : onSelect(item.id))}
                    className="rounded border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {item.accion}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
