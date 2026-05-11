import React from "react";
import { cn, toneBar } from "../../utils/helpers";

export function MiniTrendChart({ values, labels, tone = "teal", tall = false }) {
  const max = Math.max(...values, 1);
  return (
    <div className={cn("flex items-end gap-2", tall ? "h-40" : "h-28")}>
      {values.map((value, index) => (
        <div key={`${labels[index]}-${value}`} className="flex-1 flex flex-col justify-end gap-2">
          <div className={cn("rounded-t transition-all", toneBar(tone))} style={{ height: `${(value / max) * 100}%` }} />
          <div className="text-[11px] text-slate-500 text-center truncate">{labels[index]}</div>
        </div>
      ))}
    </div>
  );
}

export function KpiCard({ title, value, subtitle, icon: Icon, accent = "teal" }) {
  const toneMap = {
    teal: "bg-teal-50 text-teal-700 border-teal-100",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    rose: "bg-red-50 text-red-700 border-red-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</div>
          <div className="mt-1 text-xs text-slate-500">{subtitle}</div>
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg border", toneMap[accent])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

export function Toast({ message, visible, type = "success" }) {
  if (!visible) return null;
  const colors = type === "success"
    ? "bg-emerald-800 text-emerald-50"
    : type === "warning" ? "bg-amber-800 text-amber-50"
    : "bg-slate-800 text-slate-50";
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <div className={cn("toast-enter rounded-lg px-5 py-3 text-sm font-medium shadow-lg", colors)}>
        {message}
      </div>
    </div>
  );
}
