import React from "react";
import { ClipboardList, ArrowRight } from "lucide-react";

const sections = [
  { titulo: "Metodología", contenido: "La plataforma PMEC utiliza un enfoque de vigilancia centinela y universal para enfermedades crónicas no transmisibles. El diseño metodológico sigue los lineamientos del Instituto Nacional de Salud para la vigilancia de eventos de interés en salud pública." },
  { titulo: "Fuentes de información", contenido: "Los datos provienen de las unidades primarias generadoras de datos (UPGD) y las unidades informadoras del SIVIGILA, complementadas con registros administrativos del sistema de salud." },
  { titulo: "Flujo de notificación", contenido: "El flujo inicia en la UPGD con la identificación del caso, continúa con el diligenciamiento de la ficha de notificación, el cargue al sistema, la validación territorial y el análisis departamental." },
  { titulo: "Validación y depuración", contenido: "Se aplican controles automáticos de consistencia territorial, duplicados, coherencia temporal y completitud de variables obligatorias. Los registros que no superan la validación quedan en estado de revisión." },
  { titulo: "Calidad del dato", contenido: "La calidad se mide con indicadores de completitud (porcentaje de variables diligenciadas), oportunidad (tiempo entre ocurrencia y notificación), y consistencia (coherencia entre variables relacionadas)." },
  { titulo: "Periodicidad de actualización", contenido: "Los datos se actualizan con periodicidad semanal, siguiendo el calendario de semanas epidemiológicas del año. El corte operativo vigente corresponde a la semana epidemiológica 42 de 2024." },
  { titulo: "Responsables", contenido: "El proceso es operado por el equipo de vigilancia epidemiológica departamental, con apoyo del semillero de investigación PEMEC y la supervisión técnica de la secretaría de salud territorial." },
];

export default function StatisticalOpView({ showToast }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Operación estadística</h2>
        <p className="mt-1 text-sm text-slate-500">Descripción metodológica, fuentes de información, flujos de notificación y criterios de calidad del dato.</p>
      </div>
      <div className="space-y-4">
        {sections.map((s, i) => (
          <div key={s.titulo} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500">{i + 1}</div>
              <h3 className="text-sm font-semibold text-slate-900">{s.titulo}</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed pl-11">{s.contenido}</p>
          </div>
        ))}
      </div>
      <button onClick={() => showToast("Documento metodológico descargado")} className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
        <ClipboardList className="h-4 w-4" /> Descargar documento metodológico completo
      </button>
    </div>
  );
}
