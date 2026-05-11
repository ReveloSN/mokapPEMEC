export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function avatar(name) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export function parseVariation(value) {
  return Number.parseInt(String(value).replace("%", ""), 10) || 0;
}

export function alertClasses(level) {
  return {
    Critica: "border-red-200 bg-red-50 text-red-700",
    Alta: "border-orange-200 bg-orange-50 text-orange-700",
    Media: "border-amber-200 bg-amber-50 text-amber-700",
    Baja: "border-emerald-200 bg-emerald-50 text-emerald-700",
  }[level] || "border-slate-200 bg-slate-50 text-slate-700";
}

export function behaviorClasses(behavior) {
  return {
    "Incremento inusual": "border-red-200 bg-red-50 text-red-700",
    "En observacion": "border-amber-200 bg-amber-50 text-amber-700",
    Estable: "border-cyan-200 bg-cyan-50 text-cyan-700",
    Esperado: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "Posible brote": "border-orange-200 bg-orange-50 text-orange-700",
    "Retraso de notificacion": "border-violet-200 bg-violet-50 text-violet-700",
    Subregistro: "border-violet-200 bg-violet-50 text-violet-700",
  }[behavior] || "border-slate-200 bg-slate-50 text-slate-700";
}

export function validationClasses(status) {
  return {
    Validada: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "En revision": "border-amber-200 bg-amber-50 text-amber-700",
    Escalada: "border-red-200 bg-red-50 text-red-700",
  }[status] || "border-slate-200 bg-slate-50 text-slate-700";
}

export function variationClasses(value) {
  if (String(value).startsWith("+")) return "text-red-700";
  if (String(value).startsWith("-")) return "text-emerald-700";
  return "text-slate-700";
}

export function heatClass(value, max) {
  const ratio = value / max;
  if (ratio > 0.7) return "bg-red-600 text-white";
  if (ratio > 0.5) return "bg-orange-500 text-white";
  if (ratio > 0.35) return "bg-amber-300 text-slate-900";
  if (ratio > 0.18) return "bg-emerald-200 text-emerald-950";
  return "bg-emerald-100 text-emerald-900";
}

export function toneBar(tone) {
  return {
    teal: "bg-teal-600",
    slate: "bg-slate-700",
    cyan: "bg-cyan-700",
    amber: "bg-amber-500",
    rose: "bg-red-500",
  }[tone] || "bg-slate-700";
}
