import React, { useMemo, useState } from "react";
import {
  Search,
  Bell,
  User,
  FileText,
  LayoutDashboard,
  Users,
  FolderOpen,
  TriangleAlert,
  ChartColumn,
  FileOutput,
  ClipboardList,
  SlidersHorizontal,
  Brain,
  Activity,
  Map,
  ShieldCheck,
  Settings,
  BookOpen,
  Upload,
  Plus,
  ArrowRight,
  Sparkles,
  Download,
  Eye,
  Filter,
  CalendarDays,
  HeartPulse,
  Stethoscope,
  Gauge,
  Flame,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const diseases = [
  "Diabetes T2",
  "Hipertensión",
  "EPOC",
  "Insuf. Renal",
  "Enf. Cardiovasc.",
  "Asma Crónica",
  "Hipotiroidismo",
  "Enf. Cerebrovasc.",
  "Falla cardiaca",
];

const departments = [
  { n: "La Guajira", c: 287 }, { n: "Cesar", c: 412 }, { n: "N. de Santander", c: 589 },
  { n: "Arauca", c: 156 }, { n: "Atlántico", c: 1243 }, { n: "Magdalena", c: 378 },
  { n: "Santander", c: 712 }, { n: "Sucre", c: 298 }, { n: "Bolívar", c: 534 },
  { n: "Boyacá", c: 467 }, { n: "Casanare", c: 178 }, { n: "Córdoba", c: 523 },
  { n: "Antioquia", c: 1892 }, { n: "Cundinamarca", c: 1156 }, { n: "Vichada", c: 67 },
  { n: "Chocó", c: 198 }, { n: "Caldas", c: 423 }, { n: "Bogotá D.C.", c: 3456 },
  { n: "Guainía", c: 34 }, { n: "Risaralda", c: 312 }, { n: "Meta", c: 389 },
  { n: "Vaupés", c: 23 }, { n: "Quindío", c: 234 }, { n: "Huila", c: 445 },
  { n: "Guaviare", c: 45 }, { n: "Tolima", c: 512 }, { n: "Caquetá", c: 201 },
  { n: "Amazonas", c: 28 }, { n: "Valle del Cauca", c: 1567 }, { n: "Putumayo", c: 134 },
  { n: "Cauca", c: 312 }, { n: "Nariño", c: 367 },
];

const patientsSeed = [
  { id: "P-0001", nm: "María Elena González Pérez", doc: "CC 1098765432", ag: 62, sx: "F", dx: "Diabetes T2", dp: "Nariño", mpio: "Pasto", rk: "alto", st: "activo", pe: "semanal", eps: "Sura", imc: 29.4, peso: 72, talla: 156, antecedentes: "Hipertensión arterial familiar", medicacion: "Metformina 850mg, Enalapril 10mg" },
  { id: "P-0002", nm: "Carlos Andrés Ramírez Silva", doc: "CC 1067823411", ag: 55, sx: "M", dx: "Hipertensión", dp: "Nariño", mpio: "Tumaco", rk: "medio", st: "activo", pe: "semanal", eps: "Nueva EPS", imc: 27.1, peso: 80, talla: 172, antecedentes: "Padre con IAM", medicacion: "Losartán 50mg" },
  { id: "P-0003", nm: "Ana Lucía Mendoza Coral", doc: "CC 1085443210", ag: 48, sx: "F", dx: "EPOC", dp: "Nariño", mpio: "Ipiales", rk: "alto", st: "activo", pe: "inmediata", eps: "Sanitas", imc: 24.8, peso: 58, talla: 153, antecedentes: "Tabaquismo 20 años", medicacion: "Salbutamol inhalado, Formoterol" },
  { id: "P-0004", nm: "Jorge Ernesto Castillo Narváez", doc: "CC 1090123456", ag: 71, sx: "M", dx: "Insuf. Renal", dp: "Nariño", mpio: "Pasto", rk: "critico", st: "activo", pe: "inmediata", eps: "Compensar", imc: 22.1, peso: 65, talla: 171, antecedentes: "Diabetes T2 de larga data", medicacion: "Eritropoyetina, Furosemida" },
  { id: "P-0005", nm: "Patricia Holguín Torres", doc: "CC 1054321098", ag: 59, sx: "F", dx: "Diabetes T2", dp: "Nariño", mpio: "La Unión", rk: "medio", st: "seguimiento", pe: "semanal", eps: "Sura", imc: 31.2, peso: 78, talla: 158, antecedentes: "Obesidad, sedentarismo", medicacion: "Glibenclamida 5mg" },
  { id: "P-0006", nm: "Roberto Díaz Villota", doc: "CC 1078901234", ag: 67, sx: "M", dx: "Enf. Cardiovasc.", dp: "Nariño", mpio: "Pasto", rk: "alto", st: "activo", pe: "inmediata", eps: "Nueva EPS", imc: 28.7, peso: 82, talla: 169, antecedentes: "IAM previo 2021", medicacion: "Atorvastatina 40mg, AAS 100mg" },
  { id: "P-0007", nm: "Lucía Fernández Rosero", doc: "CC 1093456789", ag: 43, sx: "F", dx: "Asma Crónica", dp: "Nariño", mpio: "Túquerres", rk: "bajo", st: "control", pe: "quincenal", eps: "Sanitas", imc: 23.4, peso: 55, talla: 153, antecedentes: "Alergia al polvo", medicacion: "Budesonida, Montelukast" },
  { id: "P-0008", nm: "Miguel Ángel Orozco Benavides", doc: "CC 1045678901", ag: 74, sx: "M", dx: "Falla cardiaca", dp: "Nariño", mpio: "Pasto", rk: "critico", st: "activo", pe: "inmediata", eps: "Compensar", imc: 26.8, peso: 71, talla: 163, antecedentes: "Nefropatía diabética, retinopatía, cardiopatía previa", medicacion: "Diurético, IECA, betabloqueador" },
  { id: "P-0009", nm: "Sandra Milena Rojas Guerrero", doc: "CC 1066789012", ag: 51, sx: "F", dx: "Hipotiroidismo", dp: "Nariño", mpio: "Samaniego", rk: "bajo", st: "control", pe: "mensual", eps: "Sura", imc: 25.9, peso: 64, talla: 157, antecedentes: "Tiroiditis de Hashimoto", medicacion: "Levotiroxina 100mcg" },
  { id: "P-0010", nm: "Andrés Felipe Morales Erazo", doc: "CC 1082345678", ag: 38, sx: "M", dx: "Hipertensión", dp: "Nariño", mpio: "Pasto", rk: "medio", st: "activo", pe: "semanal", eps: "Nueva EPS", imc: 29.8, peso: 87, talla: 171, antecedentes: "Estrés laboral crónico", medicacion: "Amlodipino 5mg" },
];

const historyItems = [
  { dt: "2024-11-15", t: "Consulta control", d: "Glucosa: 178 mg/dL. HbA1c: 8.2%. Se ajusta Metformina 1000mg.", tone: "emerald" },
  { dt: "2024-10-20", t: "Hospitalización", d: "Crisis hiperglucémica. Glucosa ingreso 420 mg/dL. UCI 2 días.", tone: "rose" },
  { dt: "2024-10-22", t: "Resultados laboratorio", d: "HbA1c 9.1%, Creatinina 1.8 mg/dL, Microalbuminuria positiva.", tone: "violet" },
  { dt: "2024-09-15", t: "Ficha SIVIGILA registrada", d: "Caso confirmado y seguimiento semanal.", tone: "slate" },
  { dt: "2024-08-30", t: "Alerta de riesgo", d: "Tendencia clínica creciente. Seguimiento intensivo activado.", tone: "amber" },
];

const auditLog = [
  { ts: "2024-11-15 14:32", user: "Dra. González", role: "Médico", action: "Ficha SIVIGILA creada", obj: "P-0001", result: "Éxito", ip: "192.168.1.45" },
  { ts: "2024-11-15 13:15", user: "Dr. Herrera", role: "Administrador", action: "Umbrales modificados", obj: "Global", result: "Éxito", ip: "192.168.1.10" },
  { ts: "2024-11-15 12:48", user: "C. Vega", role: "Estudiante", action: "Historial consultado", obj: "P-0003", result: "Éxito", ip: "192.168.1.78" },
  { ts: "2024-11-15 12:00", user: "Sistema", role: "Auto", action: "Reporte trimestral generado", obj: "—", result: "Éxito", ip: "SISTEMA" },
  { ts: "2024-11-14 16:20", user: "Dra. López", role: "Médico", action: "Documento cargado", obj: "P-0006", result: "Éxito", ip: "192.168.1.52" },
];

const usersSeed = [
  { nm: "Dra. María González", email: "m.gonzalez@hosp.co", role: "Médico", st: "activo", last: "Hoy" },
  { nm: "Dr. Roberto Herrera", email: "r.herrera@hosp.co", role: "Administrador", st: "activo", last: "Hoy" },
  { nm: "Dr. Carlos López", email: "c.lopez@hosp.co", role: "Médico", st: "activo", last: "Ayer" },
  { nm: "Carlos Vega", email: "c.vega@ucc.edu.co", role: "Estudiante", st: "activo", last: "Hoy" },
  { nm: "Dra. Ana Martínez", email: "a.martinez@hosp.co", role: "Médico", st: "inactivo", last: "15 Nov" },
];

const thresholdsSeed = [
  { id: "gluc", nm: "Glucosa ayunas", unit: "mg/dL", val: 180, min: 70, max: 500, cat: "Metabolismo" },
  { id: "hba1c", nm: "HbA1c", unit: "%", val: 7, min: 4, max: 15, cat: "Metabolismo" },
  { id: "tas", nm: "TA Sistólica", unit: "mmHg", val: 140, min: 80, max: 240, cat: "Cardiovascular" },
  { id: "tad", nm: "TA Diastólica", unit: "mmHg", val: 90, min: 50, max: 130, cat: "Cardiovascular" },
  { id: "creat", nm: "Creatinina", unit: "mg/dL", val: 1.5, min: 0.3, max: 10, cat: "Renal" },
  { id: "sat", nm: "SpO2", unit: "%", val: 90, min: 70, max: 100, cat: "Respiratorio" },
];

const modulesSeed = [
  { id: "fc", nm: "Falla Cardíaca", st: "activo", vars: 32, fichas: 1240 },
  { id: "dm", nm: "Diabetes Mellitus T2", st: "activo", vars: 28, fichas: 3800 },
  { id: "hta", nm: "Hipertensión Arterial", st: "activo", vars: 18, fichas: 2900 },
  { id: "epoc", nm: "EPOC", st: "configurando", vars: 22, fichas: 890 },
  { id: "irc", nm: "Insuf. Renal Crónica", st: "pendiente", vars: 0, fichas: 0 },
];

const reportsSeed = [
  { nm: "Consolidado semanal — Semana 48", fmt: "PDF", sz: "2.4 MB", dt: "2024-11-30", tp: "Automático" },
  { nm: "Boletín epidemiológico ECNT Nariño", fmt: "PDF", sz: "1.8 MB", dt: "2024-11-29", tp: "Programado" },
  { nm: "Reporte SIVIGILA departamental", fmt: "Excel", sz: "4.1 MB", dt: "2024-11-28", tp: "Automático" },
  { nm: "Indicadores de calidad notificación", fmt: "PDF", sz: "890 KB", dt: "2024-11-27", tp: "Manual" },
];

const docsSeed = [
  { nm: "Lab_2024-11-15.pdf", tp: "Laboratorio", pac: "María González", sz: "890 KB", dt: "2024-11-15" },
  { nm: "Ecografía_Renal.pdf", tp: "Imagenología", pac: "Jorge Castillo", sz: "2.4 MB", dt: "2024-11-10" },
  { nm: "Historia_Clinica.pdf", tp: "Historia clínica", pac: "María González", sz: "1.1 MB", dt: "2024-10-20" },
  { nm: "Espirometria_EPOC.pdf", tp: "Función resp.", pac: "Ana Mendoza", sz: "560 KB", dt: "2024-10-15" },
];

const iaPatterns = [
  { t: "Correlación Diabetes T2 → IRC", d: "El 68% de pacientes con HbA1c > 8% durante >3 años desarrollan nefropatía diabética estadio ≥3.", sc: "92%", tipo: "Correlación" },
  { t: "Estacionalidad exacerbaciones EPOC", d: "Incremento del 35% en exacerbaciones severas durante meses de lluvia.", sc: "87%", tipo: "Estacionalidad" },
  { t: "Brecha de control metabólico", d: "Solo el 32% de pacientes diabéticos alcanzan meta HbA1c < 7%.", sc: "89%", tipo: "Brecha clínica" },
];

const publicTabs = [
  { id: "indicadores", label: "Indicadores" },
  { id: "mapa", label: "Mapa de calor" },
  { id: "estadisticas", label: "Estadísticas" },
  { id: "tendencias", label: "Tendencias" },
  { id: "prevencion", label: "Prevención" },
  { id: "enfermedades", label: "Enfermedades crónicas" },
];

const publicResources = [
  ["Indicadores oficiales", "Resumen agregado de casos, tasas y tendencias por territorio."],
  ["GeoVisor y mapas", "Exploración territorial de concentración de eventos y comportamiento geográfico."],
  ["Reportes y gráficos", "Consulta de boletines, visualizaciones y salidas descargables."],
  ["Fichas y protocolos", "Acceso a fichas técnicas y lineamientos de vigilancia por evento."],
  ["Microdatos anonimizados", "Consulta de datos abiertos con fines de análisis e investigación."],
  ["Publicaciones y boletines", "Material epidemiológico para seguimiento de eventos de interés en salud pública."],
];

const chronicCards = [
  ["Diabetes tipo 2", "Enfermedad metabólica crónica caracterizada por niveles altos de glucosa en sangre y riesgo de complicaciones cardiovasculares, renales y neurológicas."],
  ["Hipertensión arterial", "Aumento persistente de la presión arterial que incrementa el riesgo de infarto, accidente cerebrovascular y enfermedad renal."],
  ["EPOC", "Enfermedad pulmonar obstructiva crónica que dificulta la respiración y suele asociarse a tabaquismo y exposición a contaminantes."],
  ["Insuficiencia renal crónica", "Pérdida progresiva de la función de los riñones, con impacto en el equilibrio hídrico, electrolítico y cardiovascular."],
  ["Falla cardiaca", "Síndrome en el que el corazón no logra bombear suficiente sangre para cubrir las necesidades del cuerpo, produciendo síntomas como falta de aire, fatiga y edema."],
  ["Asma crónica", "Trastorno inflamatorio de las vías respiratorias con episodios de tos, sibilancias y dificultad para respirar."],
];

const heartFailurePrevention = [
  "Controlar la presión arterial, la diabetes y otros factores de riesgo cardiovascular.",
  "No fumar y reducir la exposición al humo del tabaco.",
  "Mantener una alimentación saludable con menos sal y ultraprocesados.",
  "Realizar actividad física regular según recomendación médica.",
  "Consultar a tiempo ante falta de aire, fatiga, hinchazón de piernas o aumento rápido de peso.",
  "Adherirse al tratamiento y al seguimiento médico cuando existe enfermedad cardíaca previa.",
];

const heartFailureSymptoms = [
  "Falta de aire",
  "Fatiga o debilidad",
  "Hinchazón en piernas o tobillos",
  "Aumento rápido de peso",
  "Tos persistente o sibilancias",
  "Palpitaciones o ritmo irregular",
];

const clinicianPrompts = [
  "Resumir historial clínico",
  "Explicar factores de riesgo",
  "Detectar cambios relevantes",
  "Sugerir seguimiento",
  "Priorizar paciente",
  "Preparar resumen para ficha",
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function avatar(name) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function riskClasses(risk) {
  return {
    critico: "bg-rose-100 text-rose-700 border-rose-200",
    alto: "bg-orange-100 text-orange-700 border-orange-200",
    medio: "bg-amber-100 text-amber-700 border-amber-200",
    bajo: "bg-emerald-100 text-emerald-700 border-emerald-200",
  }[risk] || "bg-slate-100 text-slate-700 border-slate-200";
}

function statusClasses(status) {
  return {
    activo: "bg-cyan-100 text-cyan-700 border-cyan-200",
    seguimiento: "bg-amber-100 text-amber-700 border-amber-200",
    control: "bg-blue-100 text-blue-700 border-blue-200",
    inactivo: "bg-slate-100 text-slate-700 border-slate-200",
  }[status] || "bg-slate-100 text-slate-700 border-slate-200";
}

function toneClasses(tone) {
  return {
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
    rose: "bg-rose-50 text-rose-800 border-rose-200",
    violet: "bg-violet-50 text-violet-800 border-violet-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    slate: "bg-slate-50 text-slate-800 border-slate-200",
  }[tone] || "bg-slate-50 text-slate-800 border-slate-200";
}

function heatClass(value, max) {
  const r = value / max;
  if (r > 0.7) return "bg-rose-600 text-white";
  if (r > 0.5) return "bg-orange-500 text-white";
  if (r > 0.35) return "bg-amber-300 text-slate-900";
  if (r > 0.18) return "bg-emerald-200 text-emerald-950";
  return "bg-emerald-100 text-emerald-900";
}

function MiniBarChart({ values, tone = "slate" }) {
  const max = Math.max(...values);
  const color = {
    teal: "bg-emerald-500",
    violet: "bg-violet-500",
    rose: "bg-rose-500",
    navy: "bg-slate-900",
    amber: "bg-amber-500",
    slate: "bg-slate-500",
  }[tone];
  return (
    <div className="flex items-end gap-2 h-36">
      {values.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end gap-2">
          <div className={cn("rounded-t-xl", color)} style={{ height: `${(v / max) * 100}%` }} />
          <div className="text-[11px] text-slate-500 text-center">{months[i]}</div>
        </div>
      ))}
    </div>
  );
}

function DonutLegend({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
            <span className="text-slate-600">{item.label}</span>
          </div>
          <span className="font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function TopBar({ title, subtitle, role, onPublic, onApp, currentMode }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/92 backdrop-blur-xl px-5 lg:px-8 py-4 flex items-center gap-4 shadow-sm">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 border border-cyan-100 px-3 py-1 text-[11px] font-medium text-cyan-800 mb-2">
          Plataforma institucional · monitoreo clínico y epidemiológico
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h1>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden md:flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 min-w-[320px] text-slate-500 text-sm">
          <Search className="w-4 h-4" /> Buscar pacientes, fichas o diagnósticos...
        </div>
        <button onClick={currentMode === "app" ? onPublic : onApp} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50">
          {currentMode === "app" ? "Vista pública" : "Vista institucional"}
        </button>
        <button className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center"><Bell className="w-5 h-5" /></button>
        <div className="hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-950 to-cyan-900 text-white flex items-center justify-center text-sm font-semibold">{avatar(role)}</div>
          <div>
            <div className="text-sm font-medium text-slate-900">{role}</div>
            <div className="text-xs text-slate-500">Acceso autenticado</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ role, view, setView }) {
  const navByRole = {
    medico: [
      ["Principal", [
        ["dashboard", "Inicio", LayoutDashboard],
        ["pacientes", "Pacientes", Users],
        ["patient-detail", "Detalle paciente", Stethoscope],
        ["ficha", "Ficha clínica", ClipboardList],
        ["documentos", "Documentos", FolderOpen],
        ["alertas", "Alertas", TriangleAlert],
      ]],
      ["Análisis", [
        ["analitica", "Analítica", ChartColumn],
        ["reportes", "Reportes", FileOutput],
        ["ia-clinica", "Copiloto IA", Sparkles],
      ]],
    ],
    admin: [
      ["Gestión", [
        ["dashboard", "Inicio", LayoutDashboard],
        ["pacientes", "Pacientes", Users],
        ["analitica", "Analítica", ChartColumn],
        ["reportes", "Reportes", FileOutput],
        ["usuarios", "Usuarios", User],
        ["auditoria", "Auditoría", ShieldCheck],
        ["umbrales", "Umbrales", SlidersHorizontal],
        ["modulos", "Módulos", Settings],
        ["ia-patrones", "Patrones IA", Brain],
        ["ia-prediccion", "Predicción IA", Activity],
      ]],
    ],
    estudiante: [
      ["Aprendizaje", [
        ["dashboard", "Inicio", LayoutDashboard],
        ["pacientes", "Pacientes", Users],
        ["historial", "Historial", ClipboardList],
        ["ficha", "Asistencia ficha", FileText],
        ["recursos", "Recursos", BookOpen],
      ]],
    ],
  };

  return (
    <aside className="hidden lg:flex w-72 shrink-0 flex-col bg-gradient-to-b from-slate-950 via-slate-950 to-cyan-950 text-white p-6 border-r border-white/5">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-2xl bg-cyan-300 text-slate-950 flex items-center justify-center font-bold text-lg shadow-lg shadow-cyan-500/20">P</div>
        <div>
          <div className="font-semibold text-lg tracking-tight">PMEC</div>
          <div className="text-slate-400 text-sm">Plataforma clínica institucional</div>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 mb-8">
        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-2">Estado del sistema</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/5 px-3 py-3">
            <div className="text-xs text-slate-400">Usuarios</div>
            <div className="text-lg font-semibold mt-1">156</div>
          </div>
          <div className="rounded-2xl bg-white/5 px-3 py-3">
            <div className="text-xs text-slate-400">Alertas</div>
            <div className="text-lg font-semibold mt-1">18</div>
          </div>
        </div>
      </div>

      <div className="space-y-8 flex-1">
        {(navByRole[role] || []).map(([section, items]) => (
          <div key={section}>
            <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-3">{section}</div>
            <div className="space-y-1.5">
              {items.map(([id, label, Icon]) => (
                <button
                  key={id}
                  onClick={() => setView(id)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition text-left border",
                    view === id ? "bg-cyan-400/10 border-cyan-300/20 text-white shadow-inner" : "border-transparent text-slate-300 hover:bg-white/5 hover:border-white/5"
                  )}
                >
                  <Icon className={cn("w-4 h-4", view === id ? "text-cyan-300" : "text-slate-400")} />
                  <span className="flex-1">{label}</span>
                  {view === id && <ChevronRight className="w-4 h-4 text-cyan-300" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm font-medium capitalize">{role === "medico" ? "Dra. María González" : role === "admin" ? "Dr. Roberto Herrera" : "Carlos Vega"}</div>
        <div className="text-slate-400 text-xs mt-1">{role === "medico" ? "Médico tratante" : role === "admin" ? "Administrador del sistema" : "Estudiante del semillero"}</div>
      </div>
    </aside>
  );
}

function KpiCard({ title, value, sub, icon: Icon, accent = "emerald" }) {
  const tones = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    violet: "bg-violet-50 text-violet-700 border-violet-100",
    sky: "bg-cyan-50 text-cyan-700 border-cyan-100",
    slate: "bg-slate-50 text-slate-700 border-slate-100",
  };
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-slate-500">{title}</div>
          <div className="text-3xl font-semibold tracking-tight text-slate-950 mt-2">{value}</div>
          <div className="text-sm text-slate-500 mt-2">{sub}</div>
        </div>
        <div className={cn("w-12 h-12 rounded-2xl border flex items-center justify-center", tones[accent])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

function PatientTable({ patients, onSelect }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b border-slate-200">
            <th className="py-4 pr-4 font-medium">Paciente</th>
            <th className="py-4 pr-4 font-medium">Diagnóstico</th>
            <th className="py-4 pr-4 font-medium">Periodicidad</th>
            <th className="py-4 pr-4 font-medium">Municipio</th>
            <th className="py-4 pr-4 font-medium">Riesgo</th>
            <th className="py-4 pr-4 font-medium">Estado</th>
            <th className="py-4 font-medium">Acción</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="py-4 pr-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-950 to-cyan-900 text-white flex items-center justify-center text-xs font-semibold">{avatar(p.nm)}</div>
                  <div>
                    <div className="font-medium text-slate-900">{p.nm}</div>
                    <div className="text-xs text-slate-500">{p.id} · {p.eps}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 pr-4 text-slate-700">{p.dx}</td>
              <td className="py-4 pr-4 text-slate-700 capitalize">{p.pe}</td>
              <td className="py-4 pr-4 text-slate-700">{p.mpio}, {p.dp}</td>
              <td className="py-4 pr-4"><span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize", riskClasses(p.rk))}>{p.rk}</span></td>
              <td className="py-4 pr-4"><span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize", statusClasses(p.st))}>{p.st}</span></td>
              <td className="py-4"><button onClick={() => onSelect(p.id)} className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-medium hover:bg-slate-50">Ver</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AppDashboard({ patients, setView, setSelectedPatient }) {
  const topPatient = patients.find((p) => p.rk === "critico") || patients[0];
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-6">
        <div className="rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-8 text-white shadow-xl shadow-slate-900/10 border border-cyan-900/40">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-cyan-100 mb-5">
                <Sparkles className="w-3.5 h-3.5" /> Copiloto Clínico IA activo
              </div>
              <h2 className="text-3xl xl:text-4xl font-semibold tracking-tight leading-tight">Panel clínico institucional con foco en paciente, seguimiento y vigilancia.</h2>
              <p className="text-slate-300 mt-4 max-w-2xl leading-7">La experiencia clínica integra IA, historial, alertas, ficha, documentos y analítica sin perder claridad operativa para médicos, administradores y semillero.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => setView("patient-detail")} className="rounded-2xl bg-cyan-300 text-slate-950 px-5 py-3 text-sm font-semibold hover:bg-cyan-200 transition">Abrir paciente prioritario</button>
                <button onClick={() => setView("ficha")} className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium hover:bg-white/10 transition">Nueva ficha clínica</button>
              </div>
            </div>
            <div className="w-full md:w-80 rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Paciente priorizado por IA</div>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-sm font-semibold">{avatar(topPatient.nm)}</div>
                <div>
                  <div className="font-semibold">{topPatient.nm}</div>
                  <div className="text-sm text-slate-300">{topPatient.dx}</div>
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-black/10 p-4 text-sm text-slate-100 leading-6">Descompensación reciente, patrón de riesgo alto y necesidad de control prioritario durante las próximas 24 horas.</div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <span className="rounded-full bg-rose-400/20 px-3 py-1 text-xs text-rose-100">Riesgo crítico</span>
                <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs text-amber-100">Atención inmediata</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">Acciones rápidas</h3>
            <p className="text-sm text-slate-500 mt-1">Acceso directo a funciones clínicas e institucionales</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {[
              ["Registrar paciente", Plus, "pacientes"],
              ["Nueva ficha", ClipboardList, "ficha"],
              ["Subir documento", Upload, "documentos"],
              ["Ver alertas", TriangleAlert, "alertas"],
              ["Analítica", ChartColumn, "analitica"],
              ["Reportes", FileOutput, "reportes"],
            ].map(([label, Icon, target]) => (
              <button key={label} onClick={() => setView(target)} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left hover:bg-slate-100 transition">
                <Icon className="w-5 h-5 text-slate-700 mb-3" />
                <div className="text-sm font-medium text-slate-900">{label}</div>
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-[24px] border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-5">
            <div className="flex items-center gap-2 text-cyan-800 text-sm font-medium"><Brain className="w-4 h-4" /> Inteligencia clínica</div>
            <p className="mt-3 text-sm text-slate-600 leading-6">Resume el caso, detecta cambios y ayuda a diligenciar fichas sin sacar al médico de su flujo de trabajo.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard title="Pacientes activos" value="14,237" sub="+8.3% vs trimestre anterior" icon={Users} accent="sky" />
        <KpiCard title="Alertas clínicas" value="18" sub="5 críticas hoy" icon={TriangleAlert} accent="rose" />
        <KpiCard title="Fichas pendientes" value="34" sub="Prioridad alta" icon={ClipboardList} accent="amber" />
        <KpiCard title="Calidad de notificación" value="94%" sub="Meta institucional: 95%" icon={CheckCircle2} accent="emerald" />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">Pacientes recientes</h3>
              <p className="text-sm text-slate-500">Visión operativa del seguimiento diario</p>
            </div>
            <button onClick={() => setView("pacientes")} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">Ver todos</button>
          </div>
          <PatientTable patients={patients.slice(0, 6)} onSelect={(id) => { setSelectedPatient(id); setView("patient-detail"); }} />
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold tracking-tight">Tendencia de notificación</h3>
            <p className="text-sm text-slate-500 mt-1">Resumen mensual 2024</p>
            <div className="mt-6"><MiniBarChart values={[1120, 1240, 1180, 1350, 1420, 1510, 1480, 1560, 1620, 1580, 1640, 1710]} tone="navy" /></div>
          </div>
          <div className="rounded-[32px] border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-cyan-800 text-sm font-semibold"><Sparkles className="w-4 h-4" /> Copiloto clínico</div>
            <div className="mt-4 space-y-3">
              {clinicianPrompts.slice(0, 4).map((q) => (
                <button key={q} className="w-full rounded-2xl border border-cyan-100 bg-white/80 px-4 py-3 text-left text-sm text-slate-700 hover:bg-white">{q}</button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PatientsView({ patients, filter, setFilter, search, setSearch, onSelect, onCreate }) {
  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchFilter = filter === "todos" || p.rk === filter;
      const q = search.toLowerCase();
      const matchSearch = !q || p.nm.toLowerCase().includes(q) || p.dx.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [patients, filter, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 min-w-[260px] flex-1 text-sm text-slate-500">
          <Search className="w-4 h-4" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent outline-none w-full" placeholder="Buscar por nombre, diagnóstico o ID..." />
        </div>
        <div className="flex flex-wrap gap-2">
          {["todos", "critico", "alto", "medio", "bajo"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn("rounded-2xl px-4 py-2 text-sm font-medium border", filter === f ? "bg-slate-950 text-white border-slate-950" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")}>
              {f === "todos" ? "Todos" : f}
            </button>
          ))}
        </div>
        <button onClick={onCreate} className="rounded-2xl bg-cyan-700 text-white px-5 py-3 text-sm font-semibold hover:bg-cyan-800 flex items-center gap-2"><Plus className="w-4 h-4" /> Registrar paciente</button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">Gestión de pacientes</h3>
              <p className="text-sm text-slate-500">Mostrando {filtered.length} de {patients.length} registros</p>
            </div>
          </div>
          <PatientTable patients={filtered} onSelect={onSelect} />
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-cyan-800 text-sm font-semibold"><Sparkles className="w-4 h-4" /> IA clínica para médicos</div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">Pacientes priorizados hoy</h3>
            <div className="space-y-3 mt-5">
              {filtered.slice(0, 4).map((p) => (
                <button key={p.id} onClick={() => onSelect(p.id)} className="w-full rounded-[22px] border border-cyan-100 bg-white/80 p-4 text-left hover:bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium text-slate-900">{p.nm}</div>
                      <div className="text-sm text-slate-500">{p.dx}</div>
                    </div>
                    <span className={cn("rounded-full border px-3 py-1 text-xs font-medium capitalize", riskClasses(p.rk))}>{p.rk}</span>
                  </div>
                  <div className="text-sm text-slate-600 mt-3">Resumen IA: revisar evolución, adherencia y alertas recientes del caso.</div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold tracking-tight">Resumen operativo</h3>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4"><div className="text-sm text-slate-500">Críticos</div><div className="text-2xl font-semibold mt-2">{patients.filter((p) => p.rk === "critico").length}</div></div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4"><div className="text-sm text-slate-500">Seguimiento semanal</div><div className="text-2xl font-semibold mt-2">{patients.filter((p) => p.pe === "semanal").length}</div></div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4"><div className="text-sm text-slate-500">Con documentos</div><div className="text-2xl font-semibold mt-2">{docsSeed.length}</div></div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4"><div className="text-sm text-slate-500">Alertas activas</div><div className="text-2xl font-semibold mt-2">18</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PatientDetailView({ patient, setView }) {
  if (!patient) return null;
  return (
    <div className="space-y-6">
      <button onClick={() => setView("pacientes")} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50">← Volver a pacientes</button>
      <div className="grid grid-cols-1 xl:grid-cols-[0.85fr_1.1fr_0.75fr] gap-6">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-slate-950 to-cyan-900 text-white flex items-center justify-center text-xl font-semibold">{avatar(patient.nm)}</div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{patient.nm}</h3>
              <p className="text-sm text-slate-500 mt-1">{patient.id} · {patient.ag} años</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className={cn("rounded-full border px-3 py-1 text-xs font-medium capitalize", riskClasses(patient.rk))}>{patient.rk}</span>
                <span className={cn("rounded-full border px-3 py-1 text-xs font-medium capitalize", statusClasses(patient.st))}>{patient.st}</span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium capitalize">{patient.pe}</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[
                ["Diagnóstico", patient.dx],
                ["EPS", patient.eps],
                ["Municipio", `${patient.mpio}, ${patient.dp}`],
                ["Documento", patient.doc],
                ["IMC", `${patient.imc} kg/m²`],
                ["Medicación", patient.medicacion],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{k}</div>
                  <div className="text-sm text-slate-900 mt-2 leading-6">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold tracking-tight">Indicadores clínicos</h3>
            <div className="space-y-4 mt-5">
              {[
                ["Glucosa", "178 mg/dL", 78, "bg-amber-500"],
                ["HbA1c", "8.2%", 82, "bg-rose-500"],
                ["TA", "135/88", 62, "bg-orange-500"],
                ["SpO2", "94%", 94, "bg-emerald-500"],
              ].map(([label, value, pct, tone]) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">{label}</span>
                    <span className="font-medium text-slate-950">{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className={cn("h-full rounded-full", tone)} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">Historial clínico y epidemiológico</h3>
              <p className="text-sm text-slate-500">Línea de tiempo del paciente</p>
            </div>
            <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 flex items-center gap-2"><Filter className="w-4 h-4" /> Filtrar</button>
          </div>
          <div className="space-y-4">
            {historyItems.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-slate-950 mt-1" />
                  {idx !== historyItems.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-2" />}
                </div>
                <div className={cn("flex-1 rounded-[24px] border p-4", toneClasses(item.tone))}>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div className="font-medium">{item.t}</div>
                    <div className="text-xs opacity-80">{item.dt}</div>
                  </div>
                  <p className="text-sm leading-6 opacity-90">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-cyan-800 text-sm font-semibold"><Sparkles className="w-4 h-4" /> Copiloto Clínico IA</div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">Resumen del caso</h3>
            <div className="space-y-3 mt-5">
              {[
                "Control clínico subóptimo y riesgo de descompensación por comorbilidades asociadas.",
                "Factores de riesgo combinados: sobrecarga clínica, antecedente cardiovascular y progresión reciente.",
                "Existe patrón compatible con necesidad de intensificar seguimiento médico.",
                "Se sugiere control temprano, revisión terapéutica y vigilancia de laboratorio.",
              ].map((line) => (
                <div key={line} className="rounded-2xl border border-cyan-100 bg-white/80 px-4 py-3 text-sm text-slate-700 leading-6">{line}</div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5">
              {clinicianPrompts.slice(0, 4).map((q) => (
                <button key={q} className="rounded-2xl bg-slate-950 text-white px-4 py-3 text-sm font-medium hover:bg-slate-800">{q}</button>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold tracking-tight">Acciones</h3>
            <div className="space-y-3 mt-5">
              <button onClick={() => setView("ficha")} className="w-full rounded-2xl bg-cyan-700 text-white px-4 py-3 text-sm font-semibold hover:bg-cyan-800 flex items-center justify-between">Nueva ficha clínica <ArrowRight className="w-4 h-4" /></button>
              <button onClick={() => setView("documentos")} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50 flex items-center justify-between">Cargar documento <ArrowRight className="w-4 h-4" /></button>
              <button onClick={() => setView("reportes")} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50 flex items-center justify-between">Exportar reporte <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FichaView() {
  const steps = ["Paciente", "Notificación", "Clasificación", "Factores", "Laboratorio", "Acciones", "Seguimiento"];
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">Ficha clínica estandarizada</h3>
            <p className="text-sm text-slate-500">Versión moderna con validación y mejor jerarquía visual</p>
          </div>
          <div className="rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">Completitud estimada 76%</div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-3 min-w-fit">
              <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-semibold border", i < 3 ? "bg-cyan-700 text-white border-cyan-700" : i === 3 ? "bg-cyan-50 text-cyan-800 border-cyan-200" : "bg-slate-50 text-slate-500 border-slate-200")}>{i + 1}</div>
              <div className="text-sm font-medium text-slate-700">{step}</div>
              {i !== steps.length - 1 && <div className="w-10 h-px bg-slate-200" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["Tipo de identificación", "Seleccione tipo"],
            ["Número de documento", "Ej: 1098765432"],
            ["Nombre completo", "Nombres y apellidos"],
            ["Fecha de nacimiento", "DD/MM/AAAA"],
            ["Evento o diagnóstico", "Seleccione evento"],
            ["Profesional que registra", "Nombre del profesional"],
            ["Institución notificadora", "Seleccione institución"],
            ["Fecha de notificación", "DD/MM/AAAA"],
            ["Clasificación del caso", "Seleccione"],
            ["Periodicidad", "Semanal / inmediata"],
            ["Municipio", "Ej: Pasto"],
            ["Observaciones clínicas", "Resumen del caso"],
          ].map(([label, placeholder]) => (
            <div key={label} className={label === "Observaciones clínicas" ? "md:col-span-2" : ""}>
              <div className="text-sm font-medium text-slate-700 mb-2">{label}</div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400 min-h-[48px] flex items-center">{placeholder}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
          <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50">Anterior</button>
          <div className="flex gap-3">
            <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50">Guardar borrador</button>
            <button className="rounded-2xl bg-cyan-700 text-white px-5 py-3 text-sm font-semibold hover:bg-cyan-800">Notificar ficha</button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[32px] border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-cyan-800 text-sm font-semibold"><Sparkles className="w-4 h-4" /> Asistencia inteligente</div>
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">Apoyo al diligenciamiento</h3>
          <div className="space-y-3 mt-5">
            {[
              "Faltan datos completos de clasificación del caso.",
              "Se detecta coherencia parcial entre diagnóstico y periodicidad seleccionada.",
              "La IA sugiere marcar factor de riesgo por antecedente hipertensivo.",
              "Puede generarse un resumen breve de notificación con un clic.",
            ].map((line) => (
              <div key={line} className="rounded-2xl border border-cyan-100 bg-white/80 px-4 py-3 text-sm text-slate-700 leading-6">{line}</div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            {["Completar campos", "Resumir caso", "Validar consistencia", "Sugerir riesgos"].map((action) => (
              <button key={action} className="rounded-2xl bg-slate-950 text-white px-4 py-3 text-sm font-medium hover:bg-slate-800">{action}</button>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold tracking-tight">Checklist de validación</h3>
          <div className="space-y-3 mt-5">
            {[
              ["Identificación completa", true],
              ["Evento seleccionado", true],
              ["Datos de notificación", true],
              ["Factores de riesgo", false],
              ["Resultados de laboratorio", false],
              ["Seguimiento definido", true],
            ].map(([label, ok]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-sm text-slate-700">{label}</div>
                <span className={cn("rounded-full px-3 py-1 text-xs font-medium", ok ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>{ok ? "Completo" : "Pendiente"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentsView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 min-w-[260px] flex-1 text-slate-500 text-sm"><Search className="w-4 h-4" /> Buscar documento o paciente...</div>
        <button className="rounded-2xl bg-cyan-700 text-white px-5 py-3 text-sm font-semibold hover:bg-cyan-800 flex items-center gap-2"><Upload className="w-4 h-4" /> Cargar documento</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {docsSeed.map((d) => (
          <div key={d.nm} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mb-4"><FileText className="w-5 h-5" /></div>
            <div className="font-medium text-slate-900 leading-6">{d.nm}</div>
            <div className="text-sm text-slate-500 mt-2">{d.tp} · {d.sz}</div>
            <div className="text-sm text-slate-500 mt-1">{d.pac} · {d.dt}</div>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2"><Download className="w-4 h-4" /> Descargar</button>
              <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2"><Eye className="w-4 h-4" /> Ver</button>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-[32px] border-2 border-dashed border-cyan-200 bg-cyan-50 p-10 text-center">
        <Upload className="w-10 h-10 text-cyan-700 mx-auto" />
        <div className="mt-4 text-lg font-semibold text-slate-900">Arrastra aquí archivos PDF, JPG, PNG o DICOM</div>
        <div className="text-sm text-slate-500 mt-2">Carga moderna con zona drag & drop, vista previa y metadatos clínicos.</div>
      </div>
    </div>
  );
}

function AlertsView() {
  const alerts = [
    ["Miguel A. Orozco", "Falla cardiaca descompensada — supera umbral crítico", "critico"],
    ["Jorge E. Castillo", "Creatinina: 3.2 mg/dL — deterioro renal", "critico"],
    ["Ana L. Mendoza", "FEV1: 42% — exacerbación EPOC", "alto"],
    ["Roberto Díaz V.", "TA 180/110 mmHg — crisis hipertensiva", "alto"],
    ["María González P.", "HbA1c 8.2% — meta no alcanzada", "medio"],
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {["Todas", "Críticas", "Altas", "Medias"].map((f, i) => (
          <button key={f} className={cn("rounded-2xl px-4 py-2 text-sm font-medium border", i === 0 ? "bg-slate-950 text-white border-slate-950" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50")}>{f}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {alerts.map(([name, msg, level]) => (
          <div key={name} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className={cn("rounded-full border px-3 py-1 text-xs font-medium capitalize", riskClasses(level))}>{level}</span>
                <span className="text-sm text-slate-500">Paciente: {name}</span>
              </div>
              <div className="mt-4 text-base font-medium text-slate-900">{msg}</div>
            </div>
            <div className="flex gap-3">
              <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50">Atender</button>
              <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50">Abrir caso</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsView() {
  const max = Math.max(...departments.map((d) => d.c));
  const top = [...departments].sort((a, b) => b.c - a.c).slice(0, 8);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 min-w-[220px] text-sm text-slate-500"><Map className="w-4 h-4" /> Todo el país</div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 min-w-[220px] text-sm text-slate-500"><HeartPulse className="w-4 h-4" /> Todas las enfermedades</div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 min-w-[220px] text-sm text-slate-500"><CalendarDays className="w-4 h-4" /> Últimos 12 meses</div>
        <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50 flex items-center gap-2"><Download className="w-4 h-4" /> PDF</button>
        <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50 flex items-center gap-2"><Download className="w-4 h-4" /> Excel</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <KpiCard title="Total casos" value="18,942" sub="Cohorte agregada" icon={ClipboardList} accent="sky" />
        <KpiCard title="Tasa x 100k" value="367.2" sub="Ajustada" icon={Gauge} accent="amber" />
        <KpiCard title="Municipios" value="842" sub="Con registros" icon={Map} accent="emerald" />
        <KpiCard title="Letalidad" value="3.2‰" sub="Promedio cohorte" icon={Flame} accent="rose" />
        <KpiCard title="Calidad" value="94%" sub="Notificación válida" icon={CheckCircle2} accent="violet" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">Mapa de calor territorial</h3>
              <p className="text-sm text-slate-500">Concentración de casos por territorio</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {departments.map((d) => (
              <div key={d.n} className={cn("rounded-2xl p-4 min-h-[82px] flex flex-col justify-between", heatClass(d.c, max))}>
                <div className="text-sm font-medium leading-5">{d.n}</div>
                <div className="text-xs opacity-90 mt-2">{d.c.toLocaleString()} casos</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold tracking-tight">Tendencia temporal</h3>
            <p className="text-sm text-slate-500 mt-1">Comportamiento mensual 2024</p>
            <div className="mt-6"><MiniBarChart values={[1120, 1240, 1180, 1350, 1420, 1510, 1480, 1560, 1620, 1580, 1640, 1710]} tone="teal" /></div>
          </div>
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold tracking-tight">Top territorios</h3>
            <div className="space-y-3 mt-5">
              {top.map((d) => (
                <div key={d.n}>
                  <div className="flex justify-between text-sm mb-2"><span className="text-slate-600">{d.n}</span><span className="font-medium">{d.c.toLocaleString()}</span></div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-slate-900" style={{ width: `${(d.c / max) * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold tracking-tight">Grupos etarios</h3>
          <div className="mt-5"><MiniBarChart values={[45, 210, 580, 1240, 2100, 3200, 3800, 2900, 1867, 1460, 1200, 980]} tone="amber" /></div>
        </div>
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold tracking-tight">Por diagnóstico</h3>
          <div className="mt-5 space-y-3">
            {diseases.slice(0, 6).map((d, i) => (
              <div key={d} className="flex items-center justify-between text-sm border-b border-slate-100 pb-3">
                <span className="text-slate-600">{d}</span>
                <span className="font-medium">{[5200, 4100, 1800, 1400, 2100, 1600][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[32px] border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-cyan-800 text-sm font-semibold"><Brain className="w-4 h-4" /> Insight IA</div>
          <h3 className="text-xl font-semibold tracking-tight mt-4">Lectura epidemiológica</h3>
          <div className="space-y-3 mt-5">
            {[
              "Se observa concentración alta en Bogotá D.C., Antioquia y Valle del Cauca.",
              "La carga de casos aumenta en cohortes mayores de 50 años.",
              "La IA sugiere reforzar análisis por patrones de multimorbilidad y acceso territorial.",
            ].map((line) => (
              <div key={line} className="rounded-2xl border border-cyan-100 bg-white/80 px-4 py-3 text-sm text-slate-700 leading-6">{line}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportsView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 min-w-[260px] flex-1 text-sm text-slate-500"><Search className="w-4 h-4" /> Buscar reporte...</div>
        <button className="rounded-2xl bg-cyan-700 text-white px-5 py-3 text-sm font-semibold hover:bg-cyan-800">Generar reporte</button>
        <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50">Informe trimestral</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Total reportes" value="312" sub="Históricos" icon={FileOutput} accent="sky" />
        <KpiCard title="Automáticos activos" value="8" sub="Programados" icon={Activity} accent="emerald" />
        <KpiCard title="Descargados hoy" value="24" sub="Consumo actual" icon={Download} accent="violet" />
      </div>
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-4 pr-4 font-medium">Nombre</th>
              <th className="py-4 pr-4 font-medium">Formato</th>
              <th className="py-4 pr-4 font-medium">Tamaño</th>
              <th className="py-4 pr-4 font-medium">Fecha</th>
              <th className="py-4 pr-4 font-medium">Tipo</th>
              <th className="py-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reportsSeed.map((r) => (
              <tr key={r.nm} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 pr-4 font-medium text-slate-900">{r.nm}</td>
                <td className="py-4 pr-4 text-slate-700">{r.fmt}</td>
                <td className="py-4 pr-4 text-slate-700">{r.sz}</td>
                <td className="py-4 pr-4 text-slate-700">{r.dt}</td>
                <td className="py-4 pr-4 text-slate-700">{r.tp}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-medium hover:bg-slate-50">Descargar</button>
                    <button className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-medium hover:bg-slate-50">Ver</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AuditView() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">Todas las acciones relevantes quedan registradas con usuario, rol, fecha, resultado e IP de origen.</div>
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-4 pr-4 font-medium">Timestamp</th>
              <th className="py-4 pr-4 font-medium">Usuario</th>
              <th className="py-4 pr-4 font-medium">Rol</th>
              <th className="py-4 pr-4 font-medium">Acción</th>
              <th className="py-4 pr-4 font-medium">Objeto</th>
              <th className="py-4 pr-4 font-medium">Resultado</th>
              <th className="py-4 font-medium">IP</th>
            </tr>
          </thead>
          <tbody>
            {auditLog.map((a) => (
              <tr key={`${a.ts}-${a.user}`} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 pr-4 text-slate-700">{a.ts}</td>
                <td className="py-4 pr-4 font-medium text-slate-900">{a.user}</td>
                <td className="py-4 pr-4 text-slate-700">{a.role}</td>
                <td className="py-4 pr-4 text-slate-700">{a.action}</td>
                <td className="py-4 pr-4 text-slate-700">{a.obj}</td>
                <td className="py-4 pr-4"><span className="rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-medium">{a.result}</span></td>
                <td className="py-4 text-slate-700">{a.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ThresholdsView({ thresholds, setThresholds }) {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">Los umbrales definidos aquí activan alertas automáticas para médicos y gestores. Todos los cambios quedan auditados.</div>
      <div className="space-y-4">
        {thresholds.map((u) => (
          <div key={u.id} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-6 justify-between">
              <div className="min-w-[220px]">
                <div className="text-lg font-semibold tracking-tight text-slate-950">{u.nm}</div>
                <div className="text-sm text-slate-500">{u.cat} · Unidad {u.unit}</div>
              </div>
              <div className="flex-1 min-w-[260px]">
                <div className="flex justify-between text-sm mb-2 text-slate-500"><span>{u.min}</span><span className="font-medium text-slate-950">{u.val} {u.unit}</span><span>{u.max}</span></div>
                <input type="range" min={u.min} max={u.max} value={u.val} onChange={(e) => setThresholds((prev) => prev.map((x) => x.id === u.id ? { ...x, val: Number(e.target.value) } : x))} className="w-full accent-cyan-700" />
              </div>
              <button className="rounded-2xl bg-cyan-700 text-white px-5 py-3 text-sm font-semibold hover:bg-cyan-800">Guardar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsersView() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">Gestión de usuarios</h3>
          <p className="text-sm text-slate-500">Roles, acceso y actividad reciente</p>
        </div>
        <button className="rounded-2xl bg-cyan-700 text-white px-5 py-3 text-sm font-semibold hover:bg-cyan-800">Nuevo usuario</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="py-4 pr-4 font-medium">Usuario</th>
            <th className="py-4 pr-4 font-medium">Email</th>
            <th className="py-4 pr-4 font-medium">Rol</th>
            <th className="py-4 pr-4 font-medium">Estado</th>
            <th className="py-4 pr-4 font-medium">Último acceso</th>
            <th className="py-4 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usersSeed.map((u) => (
            <tr key={u.email} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="py-4 pr-4 font-medium text-slate-900">{u.nm}</td>
              <td className="py-4 pr-4 text-slate-700">{u.email}</td>
              <td className="py-4 pr-4 text-slate-700">{u.role}</td>
              <td className="py-4 pr-4"><span className={cn("rounded-full border px-3 py-1 text-xs font-medium", u.st === "activo" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-700 border-slate-200")}>{u.st}</span></td>
              <td className="py-4 pr-4 text-slate-700">{u.last}</td>
              <td className="py-4"><div className="flex gap-2"><button className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-medium">Editar</button><button className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-medium">Permisos</button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ModulesView() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">La arquitectura se mantiene modular para permitir la inclusión de nuevas enfermedades, formularios, validaciones y reportes sin reestructurar el sistema.</div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {modulesSeed.map((m) => (
          <div key={m.id} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-lg font-semibold tracking-tight text-slate-950">{m.nm}</div>
                <div className="text-sm text-slate-500 mt-1">Estado: {m.st}</div>
              </div>
              <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", m.st === "activo" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : m.st === "configurando" ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-slate-100 text-slate-700 border-slate-200")}>{m.st}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4"><div className="text-sm text-slate-500">Variables</div><div className="text-2xl font-semibold mt-2">{m.vars}</div></div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4"><div className="text-sm text-slate-500">Fichas</div><div className="text-2xl font-semibold mt-2">{m.fichas}</div></div>
            </div>
            <button className="w-full mt-5 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50">Configurar módulo</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function IAPatternsView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Patrones detectados" value="7" sub="Análisis activo" icon={Brain} accent="violet" />
        <KpiCard title="Correlaciones" value="5" sub="Relevancia alta" icon={Activity} accent="emerald" />
        <KpiCard title="Alertas IA" value="3" sub="Epidemiológicas" icon={TriangleAlert} accent="rose" />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold tracking-tight">Mapa de correlaciones</h3>
          <div className="space-y-4 mt-6">
            {[
              ["DM → IRC", 92],
              ["Tabaco → EPOC", 74],
              ["HTA → Cardiovascular", 71],
              ["Obesidad → DM", 68],
              ["Sedentarismo → HTA", 59],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-2"><span className="text-slate-600">{label}</span><span className="font-medium">{value}%</span></div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-violet-500" style={{ width: `${value}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {iaPatterns.map((pat) => (
            <div key={pat.t} className="rounded-[28px] border border-violet-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-violet-100 text-violet-700 px-3 py-1 text-xs font-medium">{pat.tipo}</span>
                  <div className="font-semibold text-slate-950">{pat.t}</div>
                </div>
                <div className="text-lg font-semibold text-violet-700">{pat.sc}</div>
              </div>
              <p className="mt-4 text-sm text-slate-600 leading-6">{pat.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IAPredictionView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Consultas proyectadas" value="234" sub="Próximos 30 días" icon={Stethoscope} accent="sky" />
        <KpiCard title="Incremento esperado" value="12.4%" sub="Variación prevista" icon={Activity} accent="amber" />
        <KpiCard title="Hospitalización proyectada" value="18" sub="Pacientes estimados" icon={HeartPulse} accent="rose" />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold tracking-tight">Proyección de demanda</h3>
          <p className="text-sm text-slate-500 mt-1">Horizonte de 8 semanas</p>
          <div className="mt-6"><MiniBarChart values={[180, 195, 210, 205, 220, 228, 238, 252, 260, 268, 280, 294]} tone="rose" /></div>
        </div>
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold tracking-tight">Recomendaciones</h3>
          <div className="space-y-3 mt-5">
            {[
              "Aumentar 1 cupo/semana en Endocrinología.",
              "Reforzar disponibilidad de camas para hospitalización crónica.",
              "Incrementar stock de insulina NPH e insumos asociados.",
              "Monitorear cohortes con multimorbilidad renal y cardiovascular.",
            ].map((line) => (
              <div key={line} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 leading-6">{line}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryStudentView({ patients }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-6">
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold tracking-tight">Pacientes disponibles</h3>
        <div className="space-y-3 mt-5">
          {patients.slice(0, 6).map((p) => (
            <button key={p.id} className="w-full rounded-[24px] border border-slate-200 bg-slate-50 p-4 text-left hover:bg-slate-100">
              <div className="font-medium text-slate-900">{p.nm}</div>
              <div className="text-sm text-slate-500 mt-1">{p.dx}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold tracking-tight">Línea de tiempo supervisada</h3>
        <div className="space-y-4 mt-6">
          {historyItems.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-slate-950 mt-1" />
                {idx !== historyItems.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-2" />}
              </div>
              <div className={cn("flex-1 rounded-[24px] border p-4", toneClasses(item.tone))}>
                <div className="flex justify-between gap-3 mb-2"><div className="font-medium">{item.t}</div><div className="text-xs opacity-80">{item.dt}</div></div>
                <div className="text-sm leading-6 opacity-90">{item.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResourcesView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {[
        ["Guía SIVIGILA: Enfermedades crónicas", "Protocolo oficial adaptado a ECNT."],
        ["Manejo integral de HTA", "Algoritmos y lineamientos clínicos."],
        ["Clasificación GOLD — EPOC", "Criterios de estadificación y manejo."],
        ["IRC: estadios y TFG", "Referencia KDIGO y vigilancia."],
        ["Toma de muestras", "Procedimientos estandarizados."],
        ["Epidemiología aplicada a ECNT", "Indicadores, tasas y análisis poblacional."],
      ].map(([title, desc]) => (
        <div key={title} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center mb-4"><BookOpen className="w-5 h-5" /></div>
          <div className="font-semibold text-slate-950">{title}</div>
          <div className="text-sm text-slate-500 mt-3 leading-6">{desc}</div>
        </div>
      ))}
    </div>
  );
}

function PublicView({ tab, setTab }) {
  const max = Math.max(...departments.map((d) => d.c));
  const top = [...departments].sort((a, b) => b.c - a.c).slice(0, 10);
  const compareSeries = [
    ["Diabetes T2", [420, 460, 440, 510, 530, 560, 550, 580, 600, 590, 610, 620]],
    ["Hipertensión", [340, 380, 360, 410, 430, 460, 450, 470, 490, 480, 500, 512]],
    ["Falla cardiaca", [180, 210, 205, 220, 235, 248, 255, 266, 274, 281, 290, 302]],
    ["EPOC", [150, 162, 158, 176, 184, 190, 202, 210, 216, 222, 228, 235]],
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-950 text-white px-6 py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-300 text-slate-950 flex items-center justify-center font-bold text-lg">P</div>
            <div>
              <div className="font-semibold tracking-tight text-lg">Observatorio PMEC</div>
              <div className="text-xs text-slate-400">Monitoreo público de enfermedades crónicas · datos agregados</div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-xs text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Actualización: Nov 2024</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Fuente institucional</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Datos anonimizados</span>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-6 py-14 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-cyan-100 mb-5">Observatorio de salud pública</div>
            <h1 className="text-4xl font-semibold tracking-tight max-w-3xl">Vigilancia pública de enfermedades crónicas con enfoque territorial, preventivo y epidemiológico.</h1>
            <p className="text-slate-300 max-w-3xl mt-5 leading-8">Consulta indicadores agregados, tendencias, mapas, geovisor conceptual, comparativos, información sobre enfermedades crónicas y contenidos de prevención, sin comprometer datos personales de pacientes.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[28px] bg-white/10 border border-white/10 p-5 backdrop-blur-sm"><div className="text-xs uppercase tracking-[0.18em] text-slate-300">Casos agregados</div><div className="text-3xl font-semibold mt-3">18,942</div><div className="text-sm text-slate-300 mt-2">Eventos crónicos vigilados</div></div>
            <div className="rounded-[28px] bg-white/10 border border-white/10 p-5 backdrop-blur-sm"><div className="text-xs uppercase tracking-[0.18em] text-slate-300">Cobertura</div><div className="text-3xl font-semibold mt-3">32</div><div className="text-sm text-slate-300 mt-2">Departamentos con registros</div></div>
            <div className="rounded-[28px] bg-white/10 border border-white/10 p-5 backdrop-blur-sm"><div className="text-xs uppercase tracking-[0.18em] text-slate-300">Piloto</div><div className="text-2xl font-semibold mt-3">Falla cardiaca</div><div className="text-sm text-slate-300 mt-2">Evento inicial priorizado</div></div>
            <div className="rounded-[28px] bg-white/10 border border-white/10 p-5 backdrop-blur-sm"><div className="text-xs uppercase tracking-[0.18em] text-slate-300">Calidad</div><div className="text-3xl font-semibold mt-3">94%</div><div className="text-sm text-slate-300 mt-2">Notificación válida</div></div>
          </div>
        </div>
      </section>

      <div className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex gap-2 overflow-x-auto py-3">
          {publicTabs.map((item) => (
            <button key={item.id} onClick={() => setTab(item.id)} className={cn("rounded-2xl px-4 py-2 text-sm font-medium whitespace-nowrap border", tab === item.id ? "bg-slate-950 text-white border-slate-950" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")}>{item.label}</button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {tab === "indicadores" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
              <KpiCard title="Total casos" value="18,942" sub="Agregados" icon={ClipboardList} accent="sky" />
              <KpiCard title="Departamentos" value="32" sub="Con registros" icon={Map} accent="emerald" />
              <KpiCard title="Tasa x 100k" value="367.2" sub="Poblacional" icon={Gauge} accent="amber" />
              <KpiCard title="Calidad" value="94%" sub="Notificación válida" icon={CheckCircle2} accent="violet" />
              <KpiCard title="Actualización" value="Nov 2024" sub="Corte de datos" icon={CalendarDays} accent="slate" />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold tracking-tight">Distribución por diagnóstico</h3>
                <div className="mt-5"><DonutLegend items={[{ label: "Diabetes T2", value: "5,200", color: "#0f172a" }, { label: "Hipertensión", value: "4,100", color: "#0891b2" }, { label: "Falla cardiaca", value: "2,480", color: "#8b5cf6" }, { label: "EPOC", value: "1,800", color: "#f59e0b" }, { label: "Otras", value: "5,362", color: "#64748b" }]} /></div>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold tracking-tight">Panel resumen público</h3>
                <div className="grid grid-cols-2 gap-4 mt-5">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-sm text-slate-500">Sexo femenino</div><div className="text-2xl font-semibold mt-2">57.5%</div></div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-sm text-slate-500">Sexo masculino</div><div className="text-2xl font-semibold mt-2">42.5%</div></div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-sm text-slate-500">Mayor carga</div><div className="text-lg font-semibold mt-2">50 a 69 años</div></div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-sm text-slate-500">Enfermedad piloto</div><div className="text-lg font-semibold mt-2">Falla cardiaca</div></div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "mapa" && (
          <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">Mapa de calor nacional</h3>
                  <p className="text-sm text-slate-500">Concentración de casos agregados por departamento</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {departments.map((d) => (
                  <div key={d.n} className={cn("rounded-2xl p-4 min-h-[82px] flex flex-col justify-between", heatClass(d.c, max))}>
                    <div className="text-sm font-medium leading-5">{d.n}</div>
                    <div className="text-xs opacity-90 mt-2">{d.c.toLocaleString()} casos</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">GeoVisor conceptual</h3>
                    <p className="text-sm text-slate-500">Exploración territorial del evento</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-medium">Interactivo</span>
                </div>
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3 text-sm text-slate-500">Filtro: Falla cardiaca</div>
                    <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3 text-sm text-slate-500">Nivel: Municipio</div>
                    <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3 text-sm text-slate-500">Periodo: 2024</div>
                    <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3 text-sm text-slate-500">Sexo: Todos</div>
                  </div>
                  <div className="rounded-[24px] bg-gradient-to-br from-emerald-100 via-cyan-50 to-slate-100 border border-slate-200 min-h-[260px] p-4 relative overflow-hidden">
                    <div className="absolute top-6 left-8 rounded-full bg-rose-500 text-white px-3 py-1 text-xs font-medium shadow">Pasto</div>
                    <div className="absolute top-20 left-20 rounded-full bg-orange-500 text-white px-3 py-1 text-xs font-medium shadow">Tumaco</div>
                    <div className="absolute top-16 right-16 rounded-full bg-amber-400 text-slate-900 px-3 py-1 text-xs font-medium shadow">Ipiales</div>
                    <div className="absolute bottom-16 left-24 rounded-full bg-emerald-500 text-white px-3 py-1 text-xs font-medium shadow">Túquerres</div>
                    <div className="absolute bottom-12 right-24 rounded-full bg-emerald-300 text-slate-900 px-3 py-1 text-xs font-medium shadow">La Unión</div>
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">Mapa / geovisor de referencia visual</div>
                  </div>
                </div>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold tracking-tight">Detalle por municipio</h3>
                <div className="space-y-3 mt-5">
                  {[["Pasto", "Muy alto", "Zona urbana", 1240], ["Tumaco", "Alto", "Costa pacífica", 860], ["Ipiales", "Medio", "Zona fronteriza", 540], ["Túquerres", "Medio", "Altiplano", 380], ["La Unión", "Bajo", "Centro occidente", 210], ["Samaniego", "Bajo", "Cordillera", 160]].map(([name, level, zone, value]) => (
                    <div key={name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-4">
                      <div>
                        <div className="font-medium text-slate-900">{name}</div>
                        <div className="text-sm text-slate-500">{zone}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">{value} casos</div>
                        <div className={cn("mt-1 rounded-full px-3 py-1 text-xs font-medium inline-block", level === "Muy alto" ? "bg-rose-100 text-rose-700" : level === "Alto" ? "bg-orange-100 text-orange-700" : level === "Medio" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700")}>{level}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "estadisticas" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold tracking-tight">Grupos etarios</h3><div className="mt-5"><MiniBarChart values={[45, 210, 580, 1240, 2100, 3200, 3800, 2900, 1867, 1460, 1200, 980]} tone="amber" /></div></div>
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold tracking-tight">Factores de riesgo</h3><div className="space-y-3 mt-5">{[["Obesidad", 42], ["HTA", 38], ["Tabaquismo", 28], ["Sedentarismo", 35], ["Dislipidemia", 31]].map(([l, v]) => <div key={l}><div className="flex justify-between text-sm mb-2"><span>{l}</span><span>{v}%</span></div><div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-cyan-700" style={{ width: `${v}%` }} /></div></div>)}</div></div>
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold tracking-tight">Top territorios</h3><div className="space-y-3 mt-5">{top.map((d) => <div key={d.n} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex justify-between"><span>{d.n}</span><span className="font-medium">{d.c}</span></div>)}</div></div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold tracking-tight">Comparativo entre enfermedades</h3>
                <div className="space-y-5 mt-6">
                  {compareSeries.map(([label, values], idx) => {
                    const maxLocal = Math.max(...values);
                    const tones = ["bg-slate-900", "bg-cyan-700", "bg-violet-500", "bg-amber-500"];
                    return (
                      <div key={label}>
                        <div className="flex items-center justify-between mb-2 text-sm"><span className="font-medium text-slate-800">{label}</span><span className="text-slate-500">Último corte: {values[values.length - 1]}</span></div>
                        <div className="flex items-end gap-1.5 h-24">
                          {values.map((v, i) => (
                            <div key={i} className="flex-1 rounded-t-md" style={{ height: `${(v / maxLocal) * 100}%` }}><div className={cn("w-full rounded-t-md", tones[idx])} style={{ height: "100%" }} /></div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold tracking-tight">Tablero temático</h3>
                <div className="space-y-3 mt-5">
                  {["Distribución por régimen de afiliación", "Análisis por grupos etarios", "Comparativo entre sexo y territorio", "Frecuencia de factores de riesgo", "Serie histórica por enfermedad", "Tasa ajustada por región", "Tendencia del piloto de falla cardiaca", "Comportamiento territorial por municipio"].map((item) => <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">{item}</div>)}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "tendencias" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold tracking-tight">Tendencia mensual</h3><div className="mt-5"><MiniBarChart values={[1120, 1240, 1180, 1350, 1420, 1510, 1480, 1560, 1620, 1580, 1640, 1710]} tone="navy" /></div></div>
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold tracking-tight">Comparación interanual</h3><div className="space-y-4 mt-5">{[["2022", 1120], ["2023", 1380], ["2024", 1710]].map(([y, v]) => <div key={y}><div className="flex justify-between text-sm mb-2"><span>{y}</span><span>{v}</span></div><div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-slate-900" style={{ width: `${(v / 1710) * 100}%` }} /></div></div>)}</div></div>
          </div>
        )}

        {tab === "prevencion" && (
          <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-1.5 text-xs font-medium text-emerald-700 mb-4">Prevención y cuidado</div>
              <h3 className="text-2xl font-semibold tracking-tight">Falla cardiaca — módulo piloto</h3>
              <p className="text-slate-500 mt-3 leading-7">La falla cardiaca es la enfermedad piloto del proyecto. En la vista pública se incluye una explicación clara, medidas de prevención, síntomas de alarma y orientación para consulta temprana.</p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5"><div className="text-sm font-semibold text-slate-900 mb-3">¿Qué es?</div><div className="text-sm text-slate-600 leading-6">La falla cardiaca ocurre cuando el corazón no puede bombear sangre de forma suficiente. Puede relacionarse con hipertensión, infarto, cardiopatías valvulares, diabetes y otras condiciones cardiovasculares.</div></div>
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5"><div className="text-sm font-semibold text-slate-900 mb-3">Síntomas de alarma</div><div className="flex flex-wrap gap-2">{heartFailureSymptoms.map((s) => <span key={s} className="rounded-full bg-rose-100 text-rose-700 px-3 py-1 text-xs font-medium">{s}</span>)}</div></div>
              </div>
              <div className="mt-6 rounded-[28px] border border-emerald-200 bg-emerald-50 p-5">
                <div className="text-sm font-semibold text-emerald-800 mb-3">Medidas de prevención</div>
                <div className="space-y-3">{heartFailurePrevention.map((item) => <div key={item} className="rounded-2xl bg-white/80 border border-emerald-100 px-4 py-3 text-sm text-slate-700">{item}</div>)}</div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold tracking-tight">Secciones útiles para ciudadanía</h3>
                <div className="space-y-3 mt-5">{publicResources.map(([title, desc]) => <div key={title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4"><div className="font-medium text-slate-900">{title}</div><div className="text-sm text-slate-500 mt-2 leading-6">{desc}</div></div>)}</div>
              </div>
              <div className="rounded-[32px] border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-6 shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-800 mb-4">Información pública útil</div>
                <h3 className="text-xl font-semibold tracking-tight">Qué agrega valor en esta vista</h3>
                <div className="space-y-3 mt-5">
                  {["Definición breve y clara de cada enfermedad crónica vigilada.", "Síntomas de alarma y señales para consultar oportunamente.", "Medidas de prevención y autocuidado.", "Enlaces a reportes, boletines y protocolos públicos.", "Preguntas frecuentes para pacientes y cuidadores."].map((line) => <div key={line} className="rounded-2xl border border-cyan-100 bg-white/80 px-4 py-3 text-sm text-slate-700 leading-6">{line}</div>)}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "enfermedades" && (
          <div className="space-y-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-semibold tracking-tight">Información general sobre enfermedades crónicas</h3>
              <p className="text-slate-500 mt-3 leading-7">Además de mapas y estadísticas, la vista pública orienta a la ciudadanía con descripciones breves sobre las enfermedades vigiladas, sus riesgos y señales de alarma.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {chronicCards.map(([title, desc]) => (
                <div key={title} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center mb-4"><HeartPulse className="w-5 h-5" /></div>
                  <div className="text-lg font-semibold tracking-tight text-slate-950">{title}</div>
                  <div className="text-sm text-slate-500 mt-3 leading-6">{desc}</div>
                  <button className="mt-5 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">Ver más</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CreatePatientModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    tipoDoc: "CC",
    numDoc: "",
    nombres: "",
    apellidos: "",
    fechaNac: "",
    sexo: "F",
    depto: "Nariño",
    mpio: "Pasto",
    tel: "",
    eps: "Sura",
    dx: "Falla cardiaca",
    peri: "semanal",
    antecedentes: "",
    peso: "",
    talla: "",
    imc: "",
    riesgo: "medio",
    meds: "",
  });

  if (!open) return null;

  const update = (key, value) => {
    const next = { ...form, [key]: value };
    if (key === "peso" || key === "talla") {
      const p = Number(key === "peso" ? value : next.peso);
      const t = Number(key === "talla" ? value : next.talla);
      if (p && t) next.imc = (p / ((t / 100) ** 2)).toFixed(1);
    }
    setForm(next);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-5xl rounded-[32px] bg-white border border-slate-200 shadow-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">Registrar nuevo paciente</h3>
            <p className="text-sm text-slate-500">Incluye datos básicos e información clínica adicional</p>
          </div>
          <button onClick={onClose} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">Cerrar</button>
        </div>
        <div className="p-6 grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6 max-h-[80vh] overflow-y-auto">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[["Tipo identificación", "tipoDoc"], ["Número identificación", "numDoc"], ["Nombres", "nombres"], ["Apellidos", "apellidos"], ["Fecha nacimiento", "fechaNac"], ["Sexo", "sexo"], ["Departamento", "depto"], ["Municipio", "mpio"], ["Teléfono", "tel"], ["EPS", "eps"], ["Diagnóstico", "dx"], ["Periodicidad", "peri"]].map(([label, key]) => (
                <div key={key}>
                  <div className="text-sm font-medium text-slate-700 mb-2">{label}</div>
                  <input value={form[key]} onChange={(e) => update(key, e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-400" />
                </div>
              ))}
              <div className="md:col-span-2">
                <div className="text-sm font-medium text-slate-700 mb-2">Antecedentes clínicos</div>
                <textarea value={form.antecedentes} onChange={(e) => update("antecedentes", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm min-h-[96px] outline-none focus:border-cyan-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {[["Peso (kg)", "peso"], ["Talla (cm)", "talla"], ["IMC", "imc"], ["Nivel de riesgo", "riesgo"]].map(([label, key]) => (
              <div key={key}>
                <div className="text-sm font-medium text-slate-700 mb-2">{label}</div>
                <input value={form[key]} onChange={(e) => update(key, e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-400" />
              </div>
            ))}
            <div>
              <div className="text-sm font-medium text-slate-700 mb-2">Medicación actual</div>
              <textarea value={form.meds} onChange={(e) => update("meds", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm min-h-[120px] outline-none focus:border-cyan-400" />
            </div>
            <div className="rounded-[28px] border border-cyan-200 bg-cyan-50 p-5">
              <div className="flex items-center gap-2 text-cyan-800 text-sm font-semibold"><Sparkles className="w-4 h-4" /> Asistencia IA</div>
              <div className="text-sm text-slate-700 leading-6 mt-3">La interfaz valida campos, calcula IMC automáticamente y prepara al médico para continuar el flujo con ficha, documentos e historial.</div>
            </div>
          </div>
        </div>
        <div className="px-6 py-5 border-t border-slate-200 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50">Cancelar</button>
          <button onClick={() => onSave(form)} className="rounded-2xl bg-cyan-700 text-white px-5 py-3 text-sm font-semibold hover:bg-cyan-800">Guardar paciente</button>
        </div>
      </div>
    </div>
  );
}

export default function PMECRedesignFull() {
  const [historyStack, setHistoryStack] = useState(["dashboard"]);
  const [mode, setMode] = useState("app");
  const [role, setRole] = useState("medico");
  const [view, setViewState] = useState("dashboard");
  const [publicTab, setPublicTab] = useState("indicadores");
  const [patients, setPatients] = useState(patientsSeed);
  const [selectedPatient, setSelectedPatient] = useState("P-0008");
  const [patientFilter, setPatientFilter] = useState("todos");
  const [patientSearch, setPatientSearch] = useState("");
  const [thresholds, setThresholds] = useState(thresholdsSeed);
  const [createOpen, setCreateOpen] = useState(false);

  const setView = (next) => {
    setViewState(next);
    setHistoryStack((prev) => [...prev, next]);
  };

  const goBack = () => {
    setHistoryStack((prev) => {
      if (prev.length <= 1) return prev;
      const nextStack = prev.slice(0, -1);
      setViewState(nextStack[nextStack.length - 1]);
      return nextStack;
    });
  };

  const patient = patients.find((p) => p.id === selectedPatient) || patients[0];

  const titleMap = {
    dashboard: "Dashboard clínico",
    pacientes: "Pacientes",
    "patient-detail": "Detalle del paciente",
    ficha: "Ficha clínica",
    documentos: "Documentos médicos",
    alertas: "Alertas clínicas",
    analitica: "Analítica epidemiológica",
    reportes: "Reportes",
    usuarios: "Gestión de usuarios",
    auditoria: "Registro de auditoría",
    umbrales: "Umbrales de riesgo",
    modulos: "Módulos y escalabilidad",
    "ia-patrones": "Patrones clínicos con IA",
    "ia-prediccion": "Predicción de demanda",
    "ia-clinica": "Copiloto Clínico IA",
    historial: "Historial supervisado",
    recursos: "Recursos educativos",
  };

  const subtitleMap = {
    dashboard: "Sistema completo rediseñado con enfoque clínico, analítico y administrativo.",
    pacientes: "Registro, búsqueda, seguimiento e integración con IA clínica.",
    "patient-detail": "Resumen clínico, línea de tiempo, documentos y apoyo inteligente.",
    ficha: "Diligenciamiento moderno de ficha estandarizada tipo SIVIGILA.",
    documentos: "Carga, organización y consulta de documentos médicos.",
    alertas: "Gestión de alertas clínicas y seguimiento de casos prioritarios.",
    analitica: "Gráficas, heatmaps, filtros poblacionales y hallazgos epidemiológicos.",
    reportes: "Exportación en PDF y Excel, además de reportes históricos.",
    usuarios: "Administración de acceso por roles y actividad del sistema.",
    auditoria: "Trazabilidad completa de acciones relevantes.",
    umbrales: "Configuración de reglas clínicas para alertas automáticas.",
    modulos: "Arquitectura modular para nuevas enfermedades crónicas.",
    "ia-patrones": "Detección de tendencias, correlaciones y brechas clínicas.",
    "ia-prediccion": "Proyección de demanda y planificación de recursos.",
    "ia-clinica": "Asistencia al médico dentro del flujo del paciente y de la ficha.",
    historial: "Modo lectura supervisado para el semillero.",
    recursos: "Material de apoyo clínico y epidemiológico.",
  };

  const renderRoleSwitcher = () => (
    <div className="flex flex-wrap gap-2 mb-6">
      {[["medico", "Médico"], ["admin", "Administrador"], ["estudiante", "Estudiante"]].map(([id, label]) => (
        <button key={id} onClick={() => { setRole(id); setViewState("dashboard"); setHistoryStack(["dashboard"]); }} className={cn("rounded-2xl px-4 py-2 text-sm font-medium border", role === id ? "bg-slate-950 text-white border-slate-950" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")}>{label}</button>
      ))}
    </div>
  );

  const savePatient = (form) => {
    const newPatient = {
      id: `P-${String(patients.length + 1).padStart(4, "0")}`,
      nm: `${form.nombres} ${form.apellidos}`.trim(),
      doc: `${form.tipoDoc} ${form.numDoc}`,
      ag: form.fechaNac ? new Date().getFullYear() - new Date(form.fechaNac).getFullYear() : 40,
      sx: form.sexo,
      dx: form.dx,
      dp: form.depto,
      mpio: form.mpio,
      rk: form.riesgo || "medio",
      st: "activo",
      pe: form.peri,
      eps: form.eps,
      imc: Number(form.imc || 0),
      peso: Number(form.peso || 0),
      talla: Number(form.talla || 0),
      antecedentes: form.antecedentes,
      medicacion: form.meds,
    };
    setPatients((prev) => [newPatient, ...prev]);
    setSelectedPatient(newPatient.id);
    setCreateOpen(false);
    setView("patient-detail");
  };

  const appView = () => {
    switch (view) {
      case "dashboard":
        return <><div>{renderRoleSwitcher()}</div><AppDashboard patients={patients} setView={setView} setSelectedPatient={setSelectedPatient} /></>;
      case "pacientes":
        return <PatientsView patients={patients} filter={patientFilter} setFilter={setPatientFilter} search={patientSearch} setSearch={setPatientSearch} onSelect={(id) => { setSelectedPatient(id); setView("patient-detail"); }} onCreate={() => setCreateOpen(true)} />;
      case "patient-detail":
      case "ia-clinica":
        return <PatientDetailView patient={patient} setView={setView} />;
      case "ficha":
        return <FichaView />;
      case "documentos":
        return <DocumentsView />;
      case "alertas":
        return <AlertsView />;
      case "analitica":
        return <AnalyticsView />;
      case "reportes":
        return <ReportsView />;
      case "usuarios":
        return <UsersView />;
      case "auditoria":
        return <AuditView />;
      case "umbrales":
        return <ThresholdsView thresholds={thresholds} setThresholds={setThresholds} />;
      case "modulos":
        return <ModulesView />;
      case "ia-patrones":
        return <IAPatternsView />;
      case "ia-prediccion":
        return <IAPredictionView />;
      case "historial":
        return <HistoryStudentView patients={patients} />;
      case "recursos":
        return <ResourcesView />;
      default:
        return <AppDashboard patients={patients} setView={setView} setSelectedPatient={setSelectedPatient} />;
    }
  };

  if (mode === "public") {
    return (
      <div className="min-h-screen bg-slate-50">
        <PublicView tab={publicTab} setTab={setPublicTab} />
        <button onClick={() => setMode("app")} className="fixed bottom-6 right-6 rounded-full bg-slate-950 text-white px-5 py-3 shadow-lg">Volver</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar role={role} view={view} setView={setView} />
        <main className="flex-1 min-w-0">
          <TopBar title={titleMap[view]} subtitle={subtitleMap[view]} role={role === "medico" ? "Dra. María González" : role === "admin" ? "Dr. Roberto Herrera" : "Carlos Vega"} onPublic={() => setMode("public")} onApp={() => setMode("app")} currentMode="app" />
          <div className="px-5 lg:px-8 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="text-slate-900 font-medium">PMEC · Plataforma institucional</span>
                <ChevronRight className="w-4 h-4" />
                <span className="capitalize">{titleMap[view]}</span>
              </div>
              <button onClick={goBack} disabled={historyStack.length <= 1} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">Volver atrás</button>
            </div>
          </div>
          <div className="p-5 lg:p-8">{appView()}</div>
        </main>
      </div>
      <CreatePatientModal open={createOpen} onClose={() => setCreateOpen(false)} onSave={savePatient} />
    </div>
  );
}
