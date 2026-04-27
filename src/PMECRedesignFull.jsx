import React, { startTransition, useDeferredValue, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle as TriangleAlert,
  ArrowRight,
  BarChart3 as ChartColumn,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Download,
  Eye,
  FileOutput,
  FileText,
  Filter,
  Gauge,
  HeartPulse,
  LayoutDashboard,
  Map,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  User,
  Users,
  Brain,
} from "lucide-react";

const monthLabels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const dashboardWeekLabels = ["SE 37", "SE 38", "SE 39", "SE 40", "SE 41", "SE 42"];

const eventCatalog = [
  "Falla cardiaca",
  "Diabetes T2",
  "Hipertension",
  "EPOC",
  "Insuficiencia renal",
  "Asma",
];

const departments = [
  { n: "La Guajira", c: 287 },
  { n: "Cesar", c: 412 },
  { n: "Norte de Santander", c: 589 },
  { n: "Arauca", c: 156 },
  { n: "Atlantico", c: 1243 },
  { n: "Magdalena", c: 378 },
  { n: "Santander", c: 712 },
  { n: "Sucre", c: 298 },
  { n: "Bolivar", c: 534 },
  { n: "Boyaca", c: 467 },
  { n: "Casanare", c: 178 },
  { n: "Cordoba", c: 523 },
  { n: "Antioquia", c: 1892 },
  { n: "Cundinamarca", c: 1156 },
  { n: "Vichada", c: 67 },
  { n: "Choco", c: 198 },
  { n: "Caldas", c: 423 },
  { n: "Bogota D.C.", c: 3456 },
  { n: "Guainia", c: 34 },
  { n: "Risaralda", c: 312 },
  { n: "Meta", c: 389 },
  { n: "Vaupes", c: 23 },
  { n: "Quindio", c: 234 },
  { n: "Huila", c: 445 },
  { n: "Guaviare", c: 45 },
  { n: "Tolima", c: 512 },
  { n: "Caqueta", c: 201 },
  { n: "Amazonas", c: 28 },
  { n: "Valle del Cauca", c: 1567 },
  { n: "Putumayo", c: 134 },
  { n: "Cauca", c: 312 },
  { n: "Narino", c: 367 },
];

const eventNotificationsSeed = [
  {
    id: "EV-0001",
    evento: "Falla cardiaca",
    semana: "SE 42",
    territorio: "Pasto, Narino",
    departamento: "Narino",
    municipio: "Pasto",
    casos: 48,
    variacion: "+22%",
    comportamiento: "Incremento inusual",
    alerta: "Alta",
    unidad: "Hospital Universitario Departamental",
    fechaNotificacion: "2024-11-15",
    fechaCorte: "2024-11-15",
    clasificacion: "Caso confirmado",
    accion: "Ver analisis",
    calidad: "96%",
    sexo: "Masculino",
    grupoEtario: "65 y mas",
    aseguramiento: "Contributivo",
    hallazgos: [
      "Falla cardiaca presenta aumento del 22% en Pasto frente al promedio de las ultimas 4 semanas.",
      "La unidad notificadora concentra el mayor volumen del departamento en SE 42.",
      "Se recomienda revision de consistencia territorial y contraste con el historico inmediato.",
    ],
    variables: [
      ["Casos hospitalizados", "17"],
      ["Tasa por 100 mil", "31.4"],
      ["UPGD activas", "8"],
      ["Completitud", "96%"],
      ["Retraso promedio", "1.2 dias"],
    ],
    validaciones: [
      { titulo: "Consistencia territorial", detalle: "Territorio y unidad notificadora coinciden con el catalogo departamental.", estado: "Validada", fecha: "2024-11-15 08:42" },
      { titulo: "Duplicados", detalle: "No se detectan notificaciones duplicadas en la semana epidemiologica 42.", estado: "Validada", fecha: "2024-11-15 08:50" },
      { titulo: "Variables criticas", detalle: "Casos, clasificacion y fecha de notificacion completos.", estado: "Validada", fecha: "2024-11-15 09:05" },
      { titulo: "Revision analitica", detalle: "Incremento sobre umbral esperado marcado para revision territorial prioritaria.", estado: "Escalada", fecha: "2024-11-15 09:20" },
    ],
  },
  {
    id: "EV-0002",
    evento: "Falla cardiaca",
    semana: "SE 42",
    territorio: "Tumaco, Narino",
    departamento: "Narino",
    municipio: "Tumaco",
    casos: 33,
    variacion: "+15%",
    comportamiento: "En observacion",
    alerta: "Media",
    unidad: "Hospital San Andres de Tumaco",
    fechaNotificacion: "2024-11-15",
    fechaCorte: "2024-11-15",
    clasificacion: "Caso probable",
    accion: "Ver analisis",
    calidad: "92%",
    sexo: "Femenino",
    grupoEtario: "50 a 64",
    aseguramiento: "Subsidiado",
    hallazgos: [
      "Tumaco concentra el mayor crecimiento relativo del evento piloto en la subregion costera.",
      "La oportunidad del cargue se mantiene dentro del rango esperado.",
      "Se prioriza contraste contra promedio departamental para validar comportamiento sostenido.",
    ],
    variables: [
      ["Casos hospitalizados", "11"],
      ["Tasa por 100 mil", "27.8"],
      ["UPGD activas", "5"],
      ["Completitud", "92%"],
      ["Retraso promedio", "1.8 dias"],
    ],
    validaciones: [
      { titulo: "Territorio", detalle: "Municipio y departamento validados contra maestro institucional.", estado: "Validada", fecha: "2024-11-15 08:20" },
      { titulo: "Semana epidemiologica", detalle: "La fecha del evento corresponde a SE 42.", estado: "Validada", fecha: "2024-11-15 08:28" },
      { titulo: "Calidad del dato", detalle: "Dos registros requieren ajuste en variable de clasificacion.", estado: "En revision", fecha: "2024-11-15 09:10" },
      { titulo: "Revision territorial", detalle: "Territorio incluido en observacion por incremento sostenido.", estado: "Escalada", fecha: "2024-11-15 09:34" },
    ],
  },
  {
    id: "EV-0003",
    evento: "Diabetes T2",
    semana: "SE 42",
    territorio: "Ipiales, Narino",
    departamento: "Narino",
    municipio: "Ipiales",
    casos: 27,
    variacion: "+4%",
    comportamiento: "Estable",
    alerta: "Baja",
    unidad: "Hospital Civil de Ipiales",
    fechaNotificacion: "2024-11-15",
    fechaCorte: "2024-11-15",
    clasificacion: "Caso confirmado",
    accion: "Ver detalle",
    calidad: "95%",
    sexo: "Femenino",
    grupoEtario: "35 a 49",
    aseguramiento: "Contributivo",
    hallazgos: [
      "La variacion se mantiene dentro del rango esperado para el historico inmediato.",
      "No se observan concentraciones anormales por unidad notificadora.",
      "Los indicadores de completitud superan la meta institucional.",
    ],
    variables: [
      ["Casos nuevos", "9"],
      ["Casos recurrentes", "18"],
      ["Tasa por 100 mil", "18.2"],
      ["UPGD activas", "6"],
      ["Completitud", "95%"],
    ],
    validaciones: [
      { titulo: "Duplicados", detalle: "No se detectan registros repetidos.", estado: "Validada", fecha: "2024-11-15 08:12" },
      { titulo: "Territorio", detalle: "La unidad notificadora pertenece al municipio reportado.", estado: "Validada", fecha: "2024-11-15 08:19" },
      { titulo: "Clasificacion", detalle: "Clasificacion del caso coherente con variables principales.", estado: "Validada", fecha: "2024-11-15 08:44" },
    ],
  },
  {
    id: "EV-0004",
    evento: "Hipertension",
    semana: "SE 42",
    territorio: "La Union, Narino",
    departamento: "Narino",
    municipio: "La Union",
    casos: 19,
    variacion: "-3%",
    comportamiento: "Esperado",
    alerta: "Baja",
    unidad: "Hospital San Jose de La Union",
    fechaNotificacion: "2024-11-15",
    fechaCorte: "2024-11-15",
    clasificacion: "Caso confirmado",
    accion: "Ver detalle",
    calidad: "97%",
    sexo: "Masculino",
    grupoEtario: "50 a 64",
    aseguramiento: "Subsidiado",
    hallazgos: [
      "El evento se ubica dentro del canal esperado para la semana epidemiologica.",
      "No se identifican alertas por retraso ni por subregistro.",
      "La distribucion por unidad notificadora es homogena.",
    ],
    variables: [
      ["Casos nuevos", "5"],
      ["Casos recurrentes", "14"],
      ["Tasa por 100 mil", "13.8"],
      ["UPGD activas", "4"],
      ["Completitud", "97%"],
    ],
    validaciones: [
      { titulo: "Semana epidemiologica", detalle: "Coherencia temporal confirmada.", estado: "Validada", fecha: "2024-11-15 08:05" },
      { titulo: "Calidad del dato", detalle: "Sin campos criticos faltantes.", estado: "Validada", fecha: "2024-11-15 08:18" },
      { titulo: "Canal endemico", detalle: "Comportamiento dentro del rango esperado.", estado: "Validada", fecha: "2024-11-15 08:56" },
    ],
  },
  {
    id: "EV-0005",
    evento: "Falla cardiaca",
    semana: "SE 42",
    territorio: "Tuquerres, Narino",
    departamento: "Narino",
    municipio: "Tuquerres",
    casos: 21,
    variacion: "+18%",
    comportamiento: "Posible brote",
    alerta: "Alta",
    unidad: "Hospital San Juan de Dios de Tuquerres",
    fechaNotificacion: "2024-11-15",
    fechaCorte: "2024-11-15",
    clasificacion: "Caso confirmado",
    accion: "Ver analisis",
    calidad: "89%",
    sexo: "Masculino",
    grupoEtario: "65 y mas",
    aseguramiento: "Subsidiado",
    hallazgos: [
      "Se identifican 3 municipios por encima del umbral esperado para el evento piloto.",
      "Tuquerres presenta aumento sostenido en las ultimas tres semanas epidemiologicas.",
      "Se sugiere validacion de soporte y oportunidad de carga.",
    ],
    variables: [
      ["Casos hospitalizados", "8"],
      ["Tasa por 100 mil", "19.4"],
      ["UPGD activas", "3"],
      ["Completitud", "89%"],
      ["Retraso promedio", "2.4 dias"],
    ],
    validaciones: [
      { titulo: "Oportunidad", detalle: "Tres fichas superan el tiempo objetivo de cargue.", estado: "En revision", fecha: "2024-11-15 09:12" },
      { titulo: "Calidad del dato", detalle: "Se requiere ajuste en variable de clasificacion.", estado: "En revision", fecha: "2024-11-15 09:16" },
      { titulo: "Analisis territorial", detalle: "Patron escalado por posible concentracion local.", estado: "Escalada", fecha: "2024-11-15 09:31" },
    ],
  },
  {
    id: "EV-0006",
    evento: "EPOC",
    semana: "SE 42",
    territorio: "Pasto, Narino",
    departamento: "Narino",
    municipio: "Pasto",
    casos: 17,
    variacion: "+9%",
    comportamiento: "En observacion",
    alerta: "Media",
    unidad: "Hospital Local Centro",
    fechaNotificacion: "2024-11-15",
    fechaCorte: "2024-11-15",
    clasificacion: "Caso probable",
    accion: "Ver detalle",
    calidad: "93%",
    sexo: "Femenino",
    grupoEtario: "50 a 64",
    aseguramiento: "Contributivo",
    hallazgos: [
      "El incremento no supera el umbral, pero amerita seguimiento semanal.",
      "Se observa agrupacion en dos UPGD del casco urbano.",
      "La completitud del dato se mantiene por encima del minimo operativo.",
    ],
    variables: [
      ["Casos nuevos", "7"],
      ["Casos recurrentes", "10"],
      ["Tasa por 100 mil", "11.6"],
      ["UPGD activas", "6"],
      ["Completitud", "93%"],
    ],
    validaciones: [
      { titulo: "Territorio", detalle: "Ubicacion validada sin inconsistencias.", estado: "Validada", fecha: "2024-11-15 07:55" },
      { titulo: "Clasificacion", detalle: "Pendiente confirmacion final por soporte clinico.", estado: "En revision", fecha: "2024-11-15 08:49" },
      { titulo: "Tendencia", detalle: "Incluido en seguimiento por incremento reciente.", estado: "Escalada", fecha: "2024-11-15 09:02" },
    ],
  },
  {
    id: "EV-0007",
    evento: "Insuficiencia renal",
    semana: "SE 42",
    territorio: "Samaniego, Narino",
    departamento: "Narino",
    municipio: "Samaniego",
    casos: 11,
    variacion: "+7%",
    comportamiento: "Retraso de notificacion",
    alerta: "Media",
    unidad: "ESE Samaniego",
    fechaNotificacion: "2024-11-14",
    fechaCorte: "2024-11-15",
    clasificacion: "Caso confirmado",
    accion: "Ver detalle",
    calidad: "84%",
    sexo: "Masculino",
    grupoEtario: "65 y mas",
    aseguramiento: "Subsidiado",
    hallazgos: [
      "Tres IPS presentan retraso en cargue de fichas durante SE 42.",
      "La oportunidad del reporte afecta la lectura consolidada del territorio.",
      "Se recomienda cierre de validaciones antes de consolidado departamental.",
    ],
    variables: [
      ["Casos nuevos", "4"],
      ["Casos recurrentes", "7"],
      ["Tasa por 100 mil", "9.1"],
      ["UPGD activas", "2"],
      ["Completitud", "84%"],
    ],
    validaciones: [
      { titulo: "Oportunidad", detalle: "Se identifican retrasos superiores a 48 horas.", estado: "En revision", fecha: "2024-11-15 08:11" },
      { titulo: "Calidad del dato", detalle: "Faltan dos variables secundarias en la ficha consolidada.", estado: "En revision", fecha: "2024-11-15 08:36" },
      { titulo: "Escalamiento", detalle: "Se notifica a administrador territorial para ajuste de cargue.", estado: "Escalada", fecha: "2024-11-15 09:14" },
    ],
  },
  {
    id: "EV-0008",
    evento: "Diabetes T2",
    semana: "SE 42",
    territorio: "Sandona, Narino",
    departamento: "Narino",
    municipio: "Sandona",
    casos: 13,
    variacion: "-2%",
    comportamiento: "Estable",
    alerta: "Baja",
    unidad: "Hospital Clarita Santos",
    fechaNotificacion: "2024-11-15",
    fechaCorte: "2024-11-15",
    clasificacion: "Caso confirmado",
    accion: "Ver detalle",
    calidad: "94%",
    sexo: "Femenino",
    grupoEtario: "35 a 49",
    aseguramiento: "Contributivo",
    hallazgos: [
      "No se observan cambios relevantes frente al promedio historico de cuatro semanas.",
      "La calidad del dato se mantiene estable y sin alertas activas.",
      "Se conserva cobertura regular por unidad notificadora.",
    ],
    variables: [
      ["Casos nuevos", "3"],
      ["Casos recurrentes", "10"],
      ["Tasa por 100 mil", "8.7"],
      ["UPGD activas", "3"],
      ["Completitud", "94%"],
    ],
    validaciones: [
      { titulo: "Territorio", detalle: "Registro consistente con el directorio institucional.", estado: "Validada", fecha: "2024-11-15 08:02" },
      { titulo: "Calidad del dato", detalle: "Sin omisiones en variables obligatorias.", estado: "Validada", fecha: "2024-11-15 08:17" },
      { titulo: "Comportamiento", detalle: "Sin desviaciones frente al historico de referencia.", estado: "Validada", fecha: "2024-11-15 08:47" },
    ],
  },
];

const supportFilesSeed = [
  { nombre: "soporte_falla_cardiaca_pasto_se42.pdf", tipo: "Resumen UPGD", unidad: "Hospital Universitario Departamental", tamano: "810 KB", fecha: "2024-11-15" },
  { nombre: "consolidado_tumaco_se42.xlsx", tipo: "Base consolidada", unidad: "Hospital San Andres de Tumaco", tamano: "1.7 MB", fecha: "2024-11-15" },
  { nombre: "acta_validacion_tuquerres.docx", tipo: "Acta de revision", unidad: "Hospital San Juan de Dios", tamano: "420 KB", fecha: "2024-11-15" },
  { nombre: "tablero_calidad_dato_se42.pdf", tipo: "Calidad del dato", unidad: "Nivel departamental", tamano: "980 KB", fecha: "2024-11-14" },
];

const alertsSeed = [
  { nivel: "Alta", evento: "Falla cardiaca", territorio: "Pasto, Narino", semana: "SE 42", mensaje: "Pasto supera el umbral esperado de notificaciones de falla cardiaca en SE 42." },
  { nivel: "Media", evento: "Falla cardiaca", territorio: "Tumaco, Narino", semana: "SE 42", mensaje: "Tumaco presenta concentracion territorial superior al promedio departamental." },
  { nivel: "Alta", evento: "Falla cardiaca", territorio: "Tuquerres, Narino", semana: "SE 42", mensaje: "Tres municipios se ubican por encima del canal esperado para el evento piloto." },
  { nivel: "Media", evento: "Insuficiencia renal", territorio: "Samaniego, Narino", semana: "SE 42", mensaje: "Tres IPS presentan retraso en cargue de fichas y requieren cierre de validacion." },
  { nivel: "Baja", evento: "Diabetes T2", territorio: "Ipiales, Narino", semana: "SE 42", mensaje: "La calidad del dato mejora, pero dos UPGD siguen en observacion por consistencia." },
];

const aiFindings = [
  "Falla cardiaca presenta aumento del 22% en Pasto frente al promedio de las ultimas 4 semanas.",
  "Tumaco concentra el mayor crecimiento relativo del evento piloto.",
  "Se identifican 3 municipios por encima del umbral esperado.",
  "La semana epidemiologica 42 requiere revision territorial prioritaria.",
];

const epidemiologicalPrompts = [
  "Analizar variacion territorial",
  "Detectar comportamiento inusual",
  "Comparar contra promedio historico",
  "Revisar calidad del dato",
  "Identificar municipios priorizados",
];

const aiPatterns = [
  { titulo: "Concentracion territorial del evento piloto", descripcion: "El crecimiento relativo se concentra en cabeceras municipales con mayor densidad notificadora.", score: "91%", tipo: "Patron detectado" },
  { titulo: "Retraso de cargue en UPGD perifricas", descripcion: "Las notificaciones tardias se agrupan en municipios con menor conectividad operativa.", score: "88%", tipo: "Calidad del dato" },
  { titulo: "Incremento sostenido de falla cardiaca", descripcion: "La serie semanal del piloto muestra una variacion positiva durante cuatro cortes consecutivos.", score: "93%", tipo: "Tendencia" },
];

const reportsSeed = [
  { nombre: "Boletin epidemiologico ECNT - SE 42", formato: "PDF", tamano: "2.4 MB", fecha: "2024-11-30", tipo: "Automatico" },
  { nombre: "Consolidado departamental de notificaciones", formato: "Excel", tamano: "4.1 MB", fecha: "2024-11-29", tipo: "Corte semanal" },
  { nombre: "Calidad del dato por unidad notificadora", formato: "PDF", tamano: "960 KB", fecha: "2024-11-28", tipo: "Seguimiento" },
  { nombre: "Reporte territorial del piloto de falla cardiaca", formato: "PDF", tamano: "1.8 MB", fecha: "2024-11-27", tipo: "Analitico" },
];

const auditLog = [
  { fecha: "2024-11-15 14:32", usuario: "Laura Martinez", rol: "Profesional notificador", accion: "Envio de notificacion", objeto: "EV-0001", resultado: "Exito", origen: "UPGD Pasto" },
  { fecha: "2024-11-15 13:15", usuario: "Ana Rojas", rol: "Epidemiologa territorial", accion: "Escalamiento de alerta", objeto: "EV-0005", resultado: "Exito", origen: "Analitica territorial" },
  { fecha: "2024-11-15 12:48", usuario: "Carlos Herrera", rol: "Administrador territorial", accion: "Actualizacion de umbral", objeto: "Falla cardiaca", resultado: "Exito", origen: "Configuracion de eventos" },
  { fecha: "2024-11-15 12:00", usuario: "Sistema", rol: "Automatico", accion: "Generacion de boletin", objeto: "SE 42", resultado: "Exito", origen: "Motor de reportes" },
  { fecha: "2024-11-14 16:20", usuario: "Ana Rojas", rol: "Epidemiologa territorial", accion: "Validacion de consistencia", objeto: "EV-0002", resultado: "En revision", origen: "Modulo de validacion" },
];

const usersSeed = [
  { nombre: "Laura Martinez", correo: "laura.martinez@pmec.gov.co", rol: "Profesional notificador", estado: "Activo", area: "UPGD Pasto" },
  { nombre: "Ana Rojas", correo: "ana.rojas@pmec.gov.co", rol: "Epidemiologa territorial", estado: "Activo", area: "Vigilancia departamental" },
  { nombre: "Carlos Herrera", correo: "carlos.herrera@pmec.gov.co", rol: "Administrador territorial", estado: "Activo", area: "Gobernanza del sistema" },
  { nombre: "Diana Mora", correo: "diana.mora@pmec.gov.co", rol: "Analista de datos", estado: "Activo", area: "Analitica territorial" },
];

const eventConfigSeed = [
  { evento: "Falla cardiaca", estado: "Piloto activo", umbral: "Canal historico + 15%", periodicidad: "Semanal", variables: 32 },
  { evento: "Diabetes T2", estado: "Activo", umbral: "Canal historico + 10%", periodicidad: "Semanal", variables: 28 },
  { evento: "Hipertension", estado: "Activo", umbral: "Canal historico + 10%", periodicidad: "Semanal", variables: 22 },
  { evento: "EPOC", estado: "Configuracion", umbral: "Pendiente", periodicidad: "Semanal", variables: 24 },
  { evento: "Insuficiencia renal", estado: "Pendiente", umbral: "Pendiente", periodicidad: "Semanal", variables: 20 },
];

const publicTabs = [
  { id: "indicadores", label: "Indicadores" },
  { id: "mapa", label: "Mapa de calor" },
  { id: "tendencias", label: "Tendencias" },
  { id: "prevencion", label: "Prevencion" },
  { id: "eventos", label: "Eventos vigilados" },
];

const publicResources = [
  ["Indicadores oficiales", "Consulta agregada de notificaciones, tendencias y variacion semanal por territorio."],
  ["GeoVisor conceptual", "Exploracion territorial del comportamiento del evento piloto y otros eventos vigilados."],
  ["Boletines y reportes", "Salida institucional en PDF y Excel para seguimiento publico."],
  ["Protocolos y fichas", "Lineamientos de vigilancia por evento y documentos tecnicos de apoyo."],
];

const publicEventCards = [
  ["Falla cardiaca", "Evento piloto priorizado para vigilancia de comportamiento semanal, concentracion territorial y alertas de incremento."],
  ["Diabetes T2", "Seguimiento agregado de notificaciones para analisis de carga poblacional y distribucion territorial."],
  ["Hipertension", "Monitoreo territorial de eventos notificados con enfoque de oportunidad y calidad del dato."],
  ["EPOC", "Observacion del comportamiento estacional y de la concentracion por unidad notificadora."],
];

const preventionTips = [
  "Promover control de factores de riesgo cardiovasculares en el territorio.",
  "Fortalecer deteccion temprana y oportunidad de la notificacion.",
  "Reforzar cierre oportuno de fichas en unidades notificadoras con retraso.",
  "Asegurar consistencia entre evento, clasificacion y semana epidemiologica.",
  "Priorizar revision de municipios por encima del umbral esperado.",
];

const roleProfiles = {
  notificador: {
    name: "Laura Martinez",
    role: "Profesional notificador",
    badge: "Operacion local",
  },
  epidemiologo: {
    name: "Ana Rojas",
    role: "Epidemiologa territorial",
    badge: "Analisis departamental",
  },
  admin: {
    name: "Carlos Herrera",
    role: "Administrador territorial",
    badge: "Gobernanza del sistema",
  },
};

const menuItems = [
  ["dashboard", "Inicio", LayoutDashboard],
  ["notificaciones", "Notificaciones", Users],
  ["ficha", "Ficha de notificacion", ClipboardList],
  ["validacion", "Validacion de datos", CheckCircle2],
  ["alertas", "Alertas epidemiologicas", TriangleAlert],
  ["analitica", "Analitica territorial", ChartColumn],
  ["geovisor", "Geovisor", Map],
  ["reportes", "Reportes", FileOutput],
  ["auditoria", "Auditoria", ShieldCheck],
  ["usuarios", "Usuarios y roles", User],
  ["configuracion", "Configuracion de eventos", Settings],
  ["analisis-ia", "Analisis IA", Brain],
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function avatar(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function parseVariation(value) {
  return Number.parseInt(String(value).replace("%", ""), 10) || 0;
}

function alertClasses(level) {
  return {
    Critica: "border-rose-200 bg-rose-50 text-rose-700",
    Alta: "border-orange-200 bg-orange-50 text-orange-700",
    Media: "border-amber-200 bg-amber-50 text-amber-700",
    Baja: "border-emerald-200 bg-emerald-50 text-emerald-700",
  }[level] || "border-slate-200 bg-slate-50 text-slate-700";
}

function behaviorClasses(behavior) {
  return {
    "Incremento inusual": "border-rose-200 bg-rose-50 text-rose-700",
    "En observacion": "border-amber-200 bg-amber-50 text-amber-700",
    Estable: "border-cyan-200 bg-cyan-50 text-cyan-700",
    Esperado: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "Posible brote": "border-orange-200 bg-orange-50 text-orange-700",
    "Retraso de notificacion": "border-violet-200 bg-violet-50 text-violet-700",
    Subregistro: "border-violet-200 bg-violet-50 text-violet-700",
  }[behavior] || "border-slate-200 bg-slate-50 text-slate-700";
}

function validationClasses(status) {
  return {
    Validada: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "En revision": "border-amber-200 bg-amber-50 text-amber-700",
    Escalada: "border-rose-200 bg-rose-50 text-rose-700",
  }[status] || "border-slate-200 bg-slate-50 text-slate-700";
}

function variationClasses(value) {
  if (String(value).startsWith("+")) return "text-rose-700";
  if (String(value).startsWith("-")) return "text-emerald-700";
  return "text-slate-700";
}

function heatClass(value, max) {
  const ratio = value / max;
  if (ratio > 0.7) return "bg-rose-600 text-white";
  if (ratio > 0.5) return "bg-orange-500 text-white";
  if (ratio > 0.35) return "bg-amber-300 text-slate-900";
  if (ratio > 0.18) return "bg-emerald-200 text-emerald-950";
  return "bg-emerald-100 text-emerald-900";
}

function toneBar(tone) {
  return {
    teal: "bg-teal-500",
    slate: "bg-slate-700",
    cyan: "bg-cyan-600",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
  }[tone] || "bg-slate-700";
}

function MiniTrendChart({ values, labels, tone = "teal", tall = false }) {
  const max = Math.max(...values, 1);

  return (
    <div className={cn("flex items-end gap-2", tall ? "h-40" : "h-28")}>
      {values.map((value, index) => (
        <div key={`${labels[index]}-${value}`} className="flex-1 flex flex-col justify-end gap-2">
          <div className={cn("rounded-t-xl transition-all", toneBar(tone))} style={{ height: `${(value / max) * 100}%` }} />
          <div className="text-[11px] text-slate-500 text-center">{labels[index]}</div>
        </div>
      ))}
    </div>
  );
}

function KpiCard({ title, value, subtitle, icon: Icon, accent = "teal" }) {
  const toneMap = {
    teal: "bg-teal-50 text-teal-700 border-teal-100",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-slate-500">{title}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{value}</div>
          <div className="mt-2 text-sm text-slate-500">{subtitle}</div>
        </div>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl border", toneMap[accent])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function TopBar({ title, subtitle, profile, currentMode, onPublic, onApp }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[11px] font-medium text-cyan-800">
            Plataforma institucional · vigilancia epidemiologica de enfermedades cronicas
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h1>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden min-w-[360px] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500 md:flex">
            <Search className="h-4 w-4" />
            <span>Buscar evento, territorio, semana epidemiologica o unidad notificadora...</span>
          </div>

          <button
            onClick={currentMode === "app" ? onPublic : onApp}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {currentMode === "app" ? "Vista publica" : "Vista institucional"}
          </button>

          <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <Bell className="h-5 w-5" />
          </button>

          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#10263f] text-sm font-semibold text-white">
              {avatar(profile.name)}
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900">{profile.name}</div>
              <div className="text-xs text-slate-500">{profile.role}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ view, setView, profile }) {
  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-[#173452] bg-[#10263f] px-6 py-6 text-white lg:flex">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-300 text-lg font-bold text-slate-950">
          P
        </div>
        <div>
          <div className="text-lg font-semibold tracking-tight">PMEC</div>
          <div className="text-sm text-slate-300">Observatorio institucional</div>
        </div>
      </div>

      <div className="mb-8 rounded-[24px] border border-white/10 bg-white/5 p-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-300">Corte operativo</div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/5 px-3 py-3">
            <div className="text-xs text-slate-300">SE activa</div>
            <div className="mt-1 text-lg font-semibold">42</div>
          </div>
          <div className="rounded-2xl bg-white/5 px-3 py-3">
            <div className="text-xs text-slate-300">Calidad</div>
            <div className="mt-1 text-lg font-semibold">94%</div>
          </div>
          <div className="rounded-2xl bg-white/5 px-3 py-3">
            <div className="text-xs text-slate-300">Alertas</div>
            <div className="mt-1 text-lg font-semibold">6</div>
          </div>
          <div className="rounded-2xl bg-white/5 px-3 py-3">
            <div className="text-xs text-slate-300">Territorios</div>
            <div className="mt-1 text-lg font-semibold">8</div>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-1.5">
        {menuItems.map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition",
              view === id
                ? "border-teal-300/30 bg-teal-300/10 text-white"
                : "border-transparent text-slate-300 hover:border-white/5 hover:bg-white/5",
            )}
          >
            <Icon className={cn("h-4 w-4", view === id ? "text-teal-300" : "text-slate-400")} />
            <span className="flex-1">{label}</span>
            {view === id ? <ChevronRight className="h-4 w-4 text-teal-300" /> : null}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-4">
        <div className="text-sm font-medium">{profile.name}</div>
        <div className="mt-1 text-xs text-slate-300">{profile.role}</div>
        <div className="mt-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">
          {profile.badge}
        </div>
      </div>
    </aside>
  );
}

function CompactNav({ view, setView }) {
  return (
    <div className="border-b border-slate-200 bg-white px-5 py-3 lg:hidden">
      <div className="flex gap-2 overflow-x-auto">
        {menuItems.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={cn(
              "whitespace-nowrap rounded-2xl border px-4 py-2 text-sm font-medium",
              view === id ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function RoleSwitcher({ role, setRole }) {
  const items = [
    ["notificador", "Profesional notificador"],
    ["epidemiologo", "Epidemiologa territorial"],
    ["admin", "Administrador territorial"],
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(([id, label]) => (
        <button
          key={id}
          onClick={() => setRole(id)}
          className={cn(
            "rounded-2xl border px-4 py-2 text-sm font-medium",
            role === id ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function NotificationTable({ notifications, onSelect, onAnalytics }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="py-4 pr-4 font-medium">Evento</th>
            <th className="py-4 pr-4 font-medium">Semana epidemiologica</th>
            <th className="py-4 pr-4 font-medium">Territorio</th>
            <th className="py-4 pr-4 font-medium">Casos notificados</th>
            <th className="py-4 pr-4 font-medium">Variacion</th>
            <th className="py-4 pr-4 font-medium">Comportamiento</th>
            <th className="py-4 pr-4 font-medium">Nivel de alerta</th>
            <th className="py-4 font-medium">Accion</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((item) => {
            const openAnalysis = item.accion.toLowerCase().includes("analisis");

            return (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/80">
                <td className="py-4 pr-4">
                  <div className="font-medium text-slate-900">{item.evento}</div>
                  <div className="text-xs text-slate-500">{item.id}</div>
                </td>
                <td className="py-4 pr-4 text-slate-700">{item.semana}</td>
                <td className="py-4 pr-4 text-slate-700">{item.territorio}</td>
                <td className="py-4 pr-4 text-slate-900">{item.casos}</td>
                <td className={cn("py-4 pr-4 font-medium", variationClasses(item.variacion))}>{item.variacion}</td>
                <td className="py-4 pr-4">
                  <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", behaviorClasses(item.comportamiento))}>
                    {item.comportamiento}
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", alertClasses(item.alerta))}>
                    {item.alerta}
                  </span>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => (openAnalysis ? onAnalytics(item.id) : onSelect(item.id))}
                    className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
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

function AppDashboard({ notifications, onSelect, onOpenForm, onOpenAnalytics, onOpenGeovisor, role, setRole }) {
  const totalNotifications = notifications.reduce((sum, item) => sum + item.casos, 0);
  const prioritized = notifications.filter((item) => ["Alta", "Critica"].includes(item.alerta)).length;
  const territories = new Set(notifications.map((item) => item.territorio));
  const alertTerritories = new Set(notifications.filter((item) => item.alerta === "Alta").map((item) => item.territorio));
  const averageQuality = `${Math.round(notifications.reduce((sum, item) => sum + Number.parseInt(item.calidad, 10), 0) / notifications.length)}%`;
  const variationAverage = `+${Math.round(notifications.reduce((sum, item) => sum + parseVariation(item.variacion), 0) / notifications.length)}%`;
  const recentRows = notifications.slice(0, 4);
  const prioritizedRows = [...notifications].sort((a, b) => parseVariation(b.variacion) - parseVariation(a.variacion)).slice(0, 4);

  return (
    <div className="space-y-8">
      <RoleSwitcher role={role} setRole={setRole} />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.28fr_0.72fr]">
        <div className="rounded-[28px] border border-[#173452] bg-[#10263f] p-8 text-white shadow-[0_20px_40px_rgba(15,39,65,0.18)]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-200">
            Evento piloto · Falla cardiaca
          </div>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight xl:text-[2.05rem]">
            Panorama institucional para la vigilancia de eventos cronicos notificados.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            Visualizacion general del comportamiento de eventos notificados, alertas, tendencias y analisis territorial.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-4">
            {[
              ["Semana de corte", "SE 42"],
              ["Unidades notificadoras", "26 activas"],
              ["Cobertura territorial", `${territories.size} territorios`],
              ["Alertas abiertas", `${alertTerritories.size} territorios`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">{label}</div>
                <div className="mt-2 text-lg font-semibold">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={onOpenForm} className="rounded-2xl bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-200">
              Abrir ficha de notificacion
            </button>
            <button
              onClick={onOpenGeovisor}
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              Ver geovisor conceptual
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Brain className="h-4 w-4 text-teal-700" />
            Hallazgos epidemiologicos IA
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Lectura automatica del corte semanal con foco en variacion territorial y comportamiento inusual.
          </p>
          <div className="mt-5 space-y-3">
            {aiFindings.map((finding) => (
              <div key={finding} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700">
                {finding}
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {epidemiologicalPrompts.slice(0, 4).map((prompt) => (
              <button
                key={prompt}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        <KpiCard title="Total notificaciones" value={totalNotifications.toLocaleString()} subtitle="Corte agregado SE 42" icon={ClipboardList} accent="cyan" />
        <KpiCard title="Eventos priorizados" value={prioritized} subtitle="Con alerta alta" icon={TriangleAlert} accent="rose" />
        <KpiCard title="Municipios en alerta" value={alertTerritories.size} subtitle="Revision territorial" icon={Map} accent="amber" />
        <KpiCard title="Variacion semanal" value={variationAverage} subtitle="Vs promedio reciente" icon={Activity} accent="teal" />
        <KpiCard title="Calidad del dato" value={averageQuality} subtitle="Completitud promedio" icon={CheckCircle2} accent="emerald" />
        <KpiCard title="Cobertura territorial" value={territories.size} subtitle="Territorios con reporte" icon={Gauge} accent="slate" />
      </section>

      <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-slate-950">Eventos con variacion reciente</h3>
              <p className="text-sm text-slate-500">Comportamiento semanal de eventos notificados y territorios priorizados.</p>
            </div>
            <button
              onClick={() => onOpenAnalytics(recentRows[0].id)}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Ver analitica
            </button>
          </div>
          <NotificationTable notifications={recentRows} onSelect={onSelect} onAnalytics={onOpenAnalytics} />
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">Variacion semanal del evento piloto</h3>
            <p className="mt-1 text-sm text-slate-500">Serie reciente de falla cardiaca notificada en Narino.</p>
            <div className="mt-6">
              <MiniTrendChart values={[29, 31, 34, 39, 41, 48]} labels={dashboardWeekLabels} tone="teal" tall />
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">Territorios priorizados</h3>
            <div className="mt-5 space-y-4">
              {prioritizedRows.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className="w-full rounded-[22px] border border-slate-200 bg-slate-50 p-4 text-left hover:bg-slate-100"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-medium text-slate-900">{item.territorio}</div>
                      <div className="mt-1 text-sm text-slate-500">
                        {item.evento} · {item.semana}
                      </div>
                    </div>
                    <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", alertClasses(item.alerta))}>{item.alerta}</span>
                  </div>
                  <div className="mt-3 text-sm text-slate-600">
                    {item.casos} casos notificados · {item.variacion} frente al promedio reciente.
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function NotificationsView({ notifications, onSelect, onCreate, onAnalytics }) {
  const [search, setSearch] = useState("");
  const [quickFilter, setQuickFilter] = useState("Todos los eventos");
  const [weekFilter, setWeekFilter] = useState("Todas");
  const [departmentFilter, setDepartmentFilter] = useState("Todos");
  const [municipalityFilter, setMunicipalityFilter] = useState("Todos");
  const [eventFilter, setEventFilter] = useState("Todos");
  const [alertFilter, setAlertFilter] = useState("Todos");
  const deferredSearch = useDeferredValue(search);

  const options = useMemo(
    () => ({
      weeks: ["Todas", ...new Set(notifications.map((item) => item.semana))],
      departments: ["Todos", ...new Set(notifications.map((item) => item.departamento))],
      municipalities: ["Todos", ...new Set(notifications.map((item) => item.municipio))],
      events: ["Todos", ...new Set(notifications.map((item) => item.evento))],
      alerts: ["Todos", ...new Set(notifications.map((item) => item.alerta))],
    }),
    [notifications],
  );

  const filtered = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    return notifications.filter((item) => {
      const matchesQuick =
        quickFilter === "Todos los eventos" ||
        item.evento === quickFilter ||
        (quickFilter === "En aumento" && parseVariation(item.variacion) > 0) ||
        (quickFilter === "En observacion" && item.comportamiento === "En observacion") ||
        (quickFilter === "Estable" && item.comportamiento === "Estable");

      const matchesWeek = weekFilter === "Todas" || item.semana === weekFilter;
      const matchesDepartment = departmentFilter === "Todos" || item.departamento === departmentFilter;
      const matchesMunicipality = municipalityFilter === "Todos" || item.municipio === municipalityFilter;
      const matchesEvent = eventFilter === "Todos" || item.evento === eventFilter;
      const matchesAlert = alertFilter === "Todos" || item.alerta === alertFilter;
      const matchesSearch =
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.evento.toLowerCase().includes(query) ||
        item.territorio.toLowerCase().includes(query) ||
        item.unidad.toLowerCase().includes(query) ||
        item.semana.toLowerCase().includes(query);

      return matchesQuick && matchesWeek && matchesDepartment && matchesMunicipality && matchesEvent && matchesAlert && matchesSearch;
    });
  }, [alertFilter, deferredSearch, departmentFilter, eventFilter, municipalityFilter, notifications, quickFilter, weekFilter]);

  const prioritizedRows = [...filtered].sort((a, b) => parseVariation(b.variacion) - parseVariation(a.variacion)).slice(0, 4);
  const highAlertCount = filtered.filter((item) => item.alerta === "Alta").length;
  const observationCount = filtered.filter((item) => item.comportamiento === "En observacion").length;
  const territoryCount = new Set(filtered.map((item) => item.territorio)).size;
  const unitCount = new Set(filtered.map((item) => item.unidad)).size;

  const quickOptions = ["Todos los eventos", "Falla cardiaca", "Diabetes T2", "Hipertension", "EPOC", "En aumento", "En observacion", "Estable"];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex min-w-[280px] flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
          <Search className="h-4 w-4" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Buscar evento, territorio, semana o unidad notificadora..."
          />
        </div>
        <button onClick={onCreate} className="flex items-center gap-2 rounded-2xl bg-[#10263f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#173452]">
          <Plus className="h-4 w-4" />
          Nueva notificacion
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {quickOptions.map((option) => (
          <button
            key={option}
            onClick={() => setQuickFilter(option)}
            className={cn(
              "rounded-2xl border px-4 py-2 text-sm font-medium",
              quickFilter === option ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
            )}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        <select value={weekFilter} onChange={(event) => setWeekFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none">
          {options.weeks.map((item) => (
            <option key={item}>{item === "Todas" ? "Semana epidemiologica" : item}</option>
          ))}
        </select>
        <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none">
          {options.departments.map((item) => (
            <option key={item}>{item === "Todos" ? "Departamento" : item}</option>
          ))}
        </select>
        <select value={municipalityFilter} onChange={(event) => setMunicipalityFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none">
          {options.municipalities.map((item) => (
            <option key={item}>{item === "Todos" ? "Municipio" : item}</option>
          ))}
        </select>
        <select value={eventFilter} onChange={(event) => setEventFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none">
          {options.events.map((item) => (
            <option key={item}>{item === "Todos" ? "Evento" : item}</option>
          ))}
        </select>
        <select value={alertFilter} onChange={(event) => setAlertFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none">
          {options.alerts.map((item) => (
            <option key={item}>{item === "Todos" ? "Nivel de alerta" : item}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1.06fr_0.94fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-slate-950">Situacion epidemiologica</h3>
              <p className="text-sm text-slate-500">
                Consulta del comportamiento general de eventos notificados, variaciones territoriales, tendencias y alertas epidemiologicas.
              </p>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
              {filtered.length} registros visibles
            </div>
          </div>

          <NotificationTable notifications={filtered} onSelect={onSelect} onAnalytics={onAnalytics} />
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Activity className="h-4 w-4 text-teal-700" />
              Eventos o territorios priorizados
            </div>
            <div className="mt-5 space-y-3">
              {prioritizedRows.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className="w-full rounded-[22px] border border-slate-200 bg-slate-50 p-4 text-left hover:bg-slate-100"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium text-slate-900">{item.evento}</div>
                      <div className="mt-1 text-sm text-slate-500">
                        {item.territorio} · {item.semana}
                      </div>
                    </div>
                    <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", alertClasses(item.alerta))}>{item.alerta}</span>
                  </div>
                  <div className="mt-3 text-sm text-slate-600">
                    {item.comportamiento} · {item.variacion} frente al promedio historico.
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">Resumen operativo</h3>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Alerta alta</div>
                <div className="mt-2 text-2xl font-semibold text-slate-950">{highAlertCount}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">En observacion</div>
                <div className="mt-2 text-2xl font-semibold text-slate-950">{observationCount}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Territorios</div>
                <div className="mt-2 text-2xl font-semibold text-slate-950">{territoryCount}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Unidades</div>
                <div className="mt-2 text-2xl font-semibold text-slate-950">{unitCount}</div>
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-900">Hallazgos automaticos</div>
              <div className="mt-3 space-y-2">
                {aiFindings.slice(0, 3).map((finding) => (
                  <div key={finding} className="text-sm leading-6 text-slate-600">
                    {finding}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationDetailView({ notification, openView, onBack }) {
  if (!notification) return null;

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
        Volver a notificaciones
      </button>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.08fr_0.82fr]">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="rounded-2xl bg-[#10263f] p-5 text-white">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Detalle de notificacion</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">{notification.evento}</div>
              <div className="mt-1 text-sm text-slate-300">{notification.id}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", behaviorClasses(notification.comportamiento))}>
                  {notification.comportamiento}
                </span>
                <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", alertClasses(notification.alerta))}>
                  {notification.alerta}
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                ["Codigo de notificacion", notification.id],
                ["Semana epidemiologica", notification.semana],
                ["Territorio", notification.territorio],
                ["Unidad notificadora", notification.unidad],
                ["Fecha de notificacion", notification.fechaNotificacion],
                ["Clasificacion del caso", notification.clasificacion],
                ["Casos notificados", String(notification.casos)],
                ["Variacion frente al historico", notification.variacion],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-900">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">Datos sociodemograficos minimos</h3>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ["Sexo", notification.sexo],
                ["Grupo etario", notification.grupoEtario],
                ["Aseguramiento", notification.aseguramiento],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</div>
                  <div className="mt-2 text-sm font-medium text-slate-900">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-slate-950">Trazabilidad de validaciones</h3>
              <p className="text-sm text-slate-500">Secuencia de controles aplicados a la notificacion.</p>
            </div>
            <button className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
          </div>

          <div className="space-y-4">
            {notification.validaciones.map((item, index) => (
              <div key={`${item.titulo}-${item.fecha}`} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="mt-1 h-4 w-4 rounded-full bg-slate-900" />
                  {index !== notification.validaciones.length - 1 ? <div className="mt-2 h-full w-px bg-slate-200" /> : null}
                </div>
                <div className="flex-1 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="font-medium text-slate-900">{item.titulo}</div>
                    <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", validationClasses(item.estado))}>{item.estado}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.detalle}</p>
                  <div className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">{item.fecha}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">Variables principales</h3>
            <div className="mt-5 space-y-3">
              {notification.variables.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</div>
                  <div className="mt-2 text-sm font-medium text-slate-900">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Brain className="h-4 w-4 text-teal-700" />
              Hallazgos automaticos
            </div>
            <div className="mt-4 space-y-3">
              {notification.hallazgos.map((line) => (
                <div key={line} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">Acciones</h3>
            <div className="mt-5 space-y-3">
              <button
                onClick={() => openView("ficha")}
                className="flex w-full items-center justify-between rounded-2xl bg-[#10263f] px-4 py-3 text-sm font-semibold text-white hover:bg-[#173452]"
              >
                Abrir ficha de notificacion
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => openView("soportes")}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Ver soportes de notificacion
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => openView("analitica")}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Abrir analitica territorial
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationFormView() {
  const steps = [
    "Identificacion de la notificacion",
    "Evento de interes",
    "Datos sociodemograficos minimos",
    "Territorio",
    "Unidad notificadora",
    "Factores asociados",
    "Clasificacion del caso",
    "Validacion",
  ];

  const sections = [
    ["Codigo de notificacion", "EV-00XX"],
    ["Semana epidemiologica", "SE 42"],
    ["Evento", "Falla cardiaca"],
    ["Fecha de notificacion", "15/11/2024"],
    ["Departamento", "Narino"],
    ["Municipio", "Pasto"],
    ["Unidad notificadora", "Hospital Universitario Departamental"],
    ["Clasificacion del caso", "Caso confirmado"],
    ["Sexo", "Masculino / Femenino"],
    ["Grupo etario", "50 a 64 / 65 y mas"],
    ["Factores asociados", "HTA, diabetes, antecedente cardiovascular"],
    ["Observaciones", "Resumen tecnico de la notificacion"],
  ];

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.86fr]">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">Ficha de notificacion epidemiologica</h3>
            <p className="text-sm text-slate-500">Estructura estandarizada para eventos cronicos notificados.</p>
          </div>
          <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Completitud estimada 76%
          </div>
        </div>

        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div key={step} className="flex min-w-fit items-center gap-3">
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-2xl border text-sm font-semibold",
                  index < 4 ? "border-cyan-700 bg-cyan-700 text-white" : "border-slate-200 bg-slate-50 text-slate-500",
                )}
              >
                {index + 1}
              </div>
              <div className="text-sm font-medium text-slate-700">{step}</div>
              {index !== steps.length - 1 ? <div className="h-px w-8 bg-slate-200" /> : null}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {sections.map(([label, placeholder]) => (
            <div key={label} className={label === "Observaciones" ? "md:col-span-2" : ""}>
              <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
              <div className="flex min-h-[48px] items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400">
                {placeholder}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between border-t border-slate-200 pt-6">
          <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">Anterior</button>
          <div className="flex gap-3">
            <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Guardar borrador
            </button>
            <button className="rounded-2xl bg-[#10263f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#173452]">Enviar notificacion</button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Brain className="h-4 w-4 text-teal-700" />
            Asistente de analisis epidemiologico
          </div>
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">Apoyo al diligenciamiento</h3>
          <div className="mt-5 space-y-3">
            {[
              "Faltan datos de clasificacion del caso para cerrar la ficha.",
              "La semana epidemiologica y la fecha de notificacion son consistentes.",
              "La unidad notificadora cumple con el directorio institucional.",
              "Se recomienda revisar oportunidad de cargue y variables asociadas.",
            ].map((line) => (
              <div key={line} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">Checklist de validacion</h3>
          <div className="mt-5 space-y-3">
            {[
              ["Identificacion completa", true],
              ["Evento de interes", true],
              ["Territorio y unidad", true],
              ["Factores asociados", false],
              ["Clasificacion del caso", false],
              ["Validacion final", false],
            ].map(([label, ok]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-sm text-slate-700">{label}</div>
                <span className={cn("rounded-full px-3 py-1 text-xs font-medium", ok ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                  {ok ? "Completo" : "Pendiente"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DataValidationView({ notifications }) {
  const validations = [
    ["Completitud general", "94%", "Meta institucional de 95%"],
    ["Oportunidad de cargue", "91%", "Tres UPGD con retraso mayor a 48 horas"],
    ["Consistencia territorial", "97%", "Coincidencia entre unidad y territorio"],
    ["Duplicados", "0.8%", "Revision semanal automatizada"],
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {validations.map(([label, value, sub], index) => (
          <KpiCard
            key={label}
            title={label}
            value={value}
            subtitle={sub}
            icon={[CheckCircle2, CalendarDays, Map, ShieldCheck][index]}
            accent={["emerald", "amber", "cyan", "slate"][index]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">Validaciones activas</h3>
          <div className="mt-5 space-y-3">
            {[
              ["Coherencia entre semana epidemiologica y fecha de notificacion", "Activa"],
              ["Cruce de territorio con directorio de unidades notificadoras", "Activa"],
              ["Control de duplicados por codigo y territorio", "Activa"],
              ["Revision de retrasos de cargue por UPGD", "Activa"],
              ["Seguimiento de variables obligatorias", "Activa"],
            ].map(([rule, status]) => (
              <div key={rule} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-sm text-slate-700">{rule}</div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">{status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">Registros en revision</h3>
          <div className="mt-5 space-y-3">
            {notifications
              .filter((item) => item.validaciones.some((validation) => validation.estado !== "Validada"))
              .slice(0, 5)
              .map((item) => (
                <div key={item.id} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium text-slate-900">{item.id}</div>
                      <div className="mt-1 text-sm text-slate-500">
                        {item.evento} · {item.territorio}
                      </div>
                    </div>
                    <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", alertClasses(item.alerta))}>{item.alerta}</span>
                  </div>
                  <div className="mt-3 text-sm text-slate-600">{item.validaciones.find((validation) => validation.estado !== "Validada")?.detalle}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportFilesView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex min-w-[280px] flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
          <Search className="h-4 w-4" />
          <span>Buscar soporte, unidad notificadora o codigo...</span>
        </div>
        <button className="flex items-center gap-2 rounded-2xl bg-[#10263f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#173452]">
          <Upload className="h-4 w-4" />
          Cargar soporte
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {supportFilesSeed.map((file) => (
          <div key={file.nombre} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
              <FileText className="h-5 w-5" />
            </div>
            <div className="font-medium leading-6 text-slate-900">{file.nombre}</div>
            <div className="mt-2 text-sm text-slate-500">
              {file.tipo} · {file.tamano}
            </div>
            <div className="mt-1 text-sm text-slate-500">
              {file.unidad} · {file.fecha}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                <Download className="h-4 w-4" />
                Descargar
              </button>
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                <Eye className="h-4 w-4" />
                Ver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertsView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {["Todas", "Altas", "Medias", "Bajas"].map((item, index) => (
          <button
            key={item}
            className={cn(
              "rounded-2xl border px-4 py-2 text-sm font-medium",
              index === 0 ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {alertsSeed.map((alert) => (
          <div key={`${alert.evento}-${alert.territorio}`} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", alertClasses(alert.nivel))}>{alert.nivel}</span>
                  <span className="text-sm text-slate-500">
                    {alert.evento} · {alert.territorio} · {alert.semana}
                  </span>
                </div>
                <div className="mt-4 text-base font-medium text-slate-900">{alert.mensaje}</div>
              </div>
              <div className="flex gap-3">
                <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">Ver analisis</button>
                <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">Abrir detalle</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsView() {
  const max = Math.max(...departments.map((department) => department.c));
  const top = [...departments].sort((a, b) => b.c - a.c).slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        {[
          [Map, "Cobertura nacional"],
          [HeartPulse, "Evento piloto: Falla cardiaca"],
          [CalendarDays, "Ultimas 12 semanas"],
        ].map(([Icon, label]) => (
          <div key={label} className="flex min-w-[220px] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
            <Icon className="h-4 w-4" />
            {label}
          </div>
        ))}
        <button className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Download className="h-4 w-4" />
          PDF
        </button>
        <button className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Download className="h-4 w-4" />
          Excel
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <KpiCard title="Total casos" value="18,942" subtitle="Consolidado agregado" icon={ClipboardList} accent="cyan" />
        <KpiCard title="Tasa por 100 mil" value="367.2" subtitle="Referencia poblacional" icon={Gauge} accent="amber" />
        <KpiCard title="Municipios" value="842" subtitle="Con reporte historico" icon={Map} accent="emerald" />
        <KpiCard title="Variacion piloto" value="+12.4%" subtitle="Falla cardiaca" icon={Activity} accent="rose" />
        <KpiCard title="Calidad" value="94%" subtitle="Dato valido" icon={CheckCircle2} accent="slate" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">Mapa de calor territorial</h3>
          <p className="mt-1 text-sm text-slate-500">Concentracion agregada por departamento.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {departments.map((department) => (
              <div key={department.n} className={cn("flex min-h-[82px] flex-col justify-between rounded-2xl p-4", heatClass(department.c, max))}>
                <div className="text-sm font-medium leading-5">{department.n}</div>
                <div className="mt-2 text-xs opacity-90">{department.c.toLocaleString()} casos</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">Tendencia del evento piloto</h3>
            <p className="mt-1 text-sm text-slate-500">Serie mensual de referencia.</p>
            <div className="mt-6">
              <MiniTrendChart values={[180, 196, 210, 224, 235, 248, 255, 266, 274, 281, 290, 302]} labels={monthLabels} tone="teal" tall />
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">Top territorios</h3>
            <div className="mt-5 space-y-3">
              {top.map((department) => (
                <div key={department.n}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-600">{department.n}</span>
                    <span className="font-medium text-slate-950">{department.c.toLocaleString()}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-[#10263f]" style={{ width: `${(department.c / max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">Distribucion por evento</h3>
          <div className="mt-5 space-y-3">
            {eventCatalog.map((event, index) => (
              <div key={event} className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm">
                <span className="text-slate-600">{event}</span>
                <span className="font-medium text-slate-950">{[2480, 5200, 4100, 1800, 1420, 960][index]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">Grupos etarios</h3>
          <div className="mt-6">
            <MiniTrendChart values={[45, 120, 210, 580, 1240, 2100, 3200, 2800, 1850, 1240, 980, 640]} labels={monthLabels} tone="amber" tall />
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Brain className="h-4 w-4 text-teal-700" />
            Analisis epidemiologico
          </div>
          <div className="mt-5 space-y-3">
            {aiFindings.slice(0, 3).map((line) => (
              <div key={line} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GeovisorView() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.06fr_0.94fr]">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">Geovisor conceptual</h3>
            <p className="text-sm text-slate-500">Exploracion territorial del evento piloto con filtros institucionales.</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">Interactivo</span>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-4">
          {["Falla cardiaca", "Municipio", "SE 42", "Todos los sexos"].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              {item}
            </div>
          ))}
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[24px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.15),_transparent_30%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] p-4">
          <div className="absolute left-10 top-8 rounded-full bg-rose-500 px-3 py-1 text-xs font-medium text-white shadow">Pasto</div>
          <div className="absolute left-24 top-24 rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white shadow">Tumaco</div>
          <div className="absolute right-20 top-16 rounded-full bg-amber-400 px-3 py-1 text-xs font-medium text-slate-900 shadow">Ipiales</div>
          <div className="absolute bottom-20 left-24 rounded-full bg-orange-400 px-3 py-1 text-xs font-medium text-slate-900 shadow">Tuquerres</div>
          <div className="absolute bottom-16 right-28 rounded-full bg-emerald-400 px-3 py-1 text-xs font-medium text-slate-900 shadow">La Union</div>
          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-500">Mapa de referencia conceptual para exploracion territorial</div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">Detalle por municipio</h3>
          <div className="mt-5 space-y-3">
            {[
              ["Pasto", "Muy alto", "Zona urbana", 1240],
              ["Tumaco", "Alto", "Costa pacifica", 860],
              ["Ipiales", "Medio", "Zona fronteriza", 540],
              ["Tuquerres", "Medio", "Altiplano", 380],
              ["La Union", "Bajo", "Centro occidente", 210],
              ["Samaniego", "Bajo", "Cordillera", 160],
            ].map(([name, level, zone, value]) => (
              <div key={name} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <div className="font-medium text-slate-900">{name}</div>
                  <div className="text-sm text-slate-500">{zone}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-900">{value}</div>
                  <div className="text-xs text-slate-500">{level}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">Capas disponibles</h3>
          <div className="mt-5 space-y-3">
            {["Concentracion de notificaciones", "Canal esperado vs observado", "Cobertura por UPGD", "Retraso de cargue", "Calidad del dato"].map((layer) => (
              <div key={layer} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-sm text-slate-700">{layer}</div>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">Visible</span>
              </div>
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
        <div className="flex min-w-[280px] flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
          <Search className="h-4 w-4" />
          <span>Buscar reporte, boletin o consolidado...</span>
        </div>
        <button className="rounded-2xl bg-[#10263f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#173452]">Generar reporte</button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <KpiCard title="Total reportes" value="312" subtitle="Historicos" icon={FileOutput} accent="cyan" />
        <KpiCard title="Automaticos activos" value="8" subtitle="Programados" icon={Activity} accent="emerald" />
        <KpiCard title="Descargas hoy" value="24" subtitle="Consumo institucional" icon={Download} accent="slate" />
      </div>

      <div className="overflow-x-auto rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-4 pr-4 font-medium">Nombre</th>
              <th className="py-4 pr-4 font-medium">Formato</th>
              <th className="py-4 pr-4 font-medium">Tamano</th>
              <th className="py-4 pr-4 font-medium">Fecha</th>
              <th className="py-4 pr-4 font-medium">Tipo</th>
              <th className="py-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reportsSeed.map((report) => (
              <tr key={report.nombre} className="border-b border-slate-100 hover:bg-slate-50/80">
                <td className="py-4 pr-4 font-medium text-slate-900">{report.nombre}</td>
                <td className="py-4 pr-4 text-slate-700">{report.formato}</td>
                <td className="py-4 pr-4 text-slate-700">{report.tamano}</td>
                <td className="py-4 pr-4 text-slate-700">{report.fecha}</td>
                <td className="py-4 pr-4 text-slate-700">{report.tipo}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Descargar</button>
                    <button className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Ver</button>
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
    <div className="overflow-x-auto rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <h3 className="mb-6 text-xl font-semibold tracking-tight text-slate-950">Trazabilidad de auditoria</h3>
      <table className="w-full min-w-[780px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="py-4 pr-4 font-medium">Fecha</th>
            <th className="py-4 pr-4 font-medium">Usuario</th>
            <th className="py-4 pr-4 font-medium">Rol</th>
            <th className="py-4 pr-4 font-medium">Accion</th>
            <th className="py-4 pr-4 font-medium">Objeto</th>
            <th className="py-4 pr-4 font-medium">Resultado</th>
            <th className="py-4 font-medium">Origen</th>
          </tr>
        </thead>
        <tbody>
          {auditLog.map((log) => (
            <tr key={`${log.fecha}-${log.usuario}`} className="border-b border-slate-100 hover:bg-slate-50/80">
              <td className="py-4 pr-4 text-slate-700">{log.fecha}</td>
              <td className="py-4 pr-4 font-medium text-slate-900">{log.usuario}</td>
              <td className="py-4 pr-4 text-slate-700">{log.rol}</td>
              <td className="py-4 pr-4 text-slate-700">{log.accion}</td>
              <td className="py-4 pr-4 text-slate-700">{log.objeto}</td>
              <td className="py-4 pr-4 text-slate-700">{log.resultado}</td>
              <td className="py-4 text-slate-700">{log.origen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsersView() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {usersSeed.map((user) => (
        <div key={user.correo} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#10263f] text-sm font-semibold text-white">
            {avatar(user.nombre)}
          </div>
          <div className="font-medium text-slate-900">{user.nombre}</div>
          <div className="mt-1 text-sm text-slate-500">{user.correo}</div>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <div>Rol: {user.rol}</div>
            <div>Area: {user.area}</div>
            <div>Estado: {user.estado}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ConfigurationView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <KpiCard title="Eventos activos" value="3" subtitle="Vigilancia en curso" icon={Settings} accent="cyan" />
        <KpiCard title="Eventos en configuracion" value="1" subtitle="Pendientes de cierre" icon={SlidersHorizontal} accent="amber" />
        <KpiCard title="Variables estandarizadas" value="126" subtitle="Catalogo transversal" icon={ClipboardList} accent="slate" />
      </div>

      <div className="overflow-x-auto rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-4 pr-4 font-medium">Evento</th>
              <th className="py-4 pr-4 font-medium">Estado</th>
              <th className="py-4 pr-4 font-medium">Umbral</th>
              <th className="py-4 pr-4 font-medium">Periodicidad</th>
              <th className="py-4 font-medium">Variables</th>
            </tr>
          </thead>
          <tbody>
            {eventConfigSeed.map((item) => (
              <tr key={item.evento} className="border-b border-slate-100 hover:bg-slate-50/80">
                <td className="py-4 pr-4 font-medium text-slate-900">{item.evento}</td>
                <td className="py-4 pr-4 text-slate-700">{item.estado}</td>
                <td className="py-4 pr-4 text-slate-700">{item.umbral}</td>
                <td className="py-4 pr-4 text-slate-700">{item.periodicidad}</td>
                <td className="py-4 text-slate-700">{item.variables}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AIView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <KpiCard title="Patrones detectados" value="7" subtitle="Analisis activo" icon={Brain} accent="cyan" />
        <KpiCard title="Predicciones" value="5" subtitle="Corte semanal" icon={Activity} accent="amber" />
        <KpiCard title="Alertas IA" value="3" subtitle="Revision prioritaria" icon={TriangleAlert} accent="rose" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Brain className="h-4 w-4 text-teal-700" />
            Analisis epidemiologico
          </div>
          <div className="mt-5 space-y-3">
            {epidemiologicalPrompts.map((prompt) => (
              <button
                key={prompt}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {aiPatterns.map((pattern) => (
            <div key={pattern.titulo} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">{pattern.tipo}</span>
                  <div className="font-semibold text-slate-950">{pattern.titulo}</div>
                </div>
                <div className="text-lg font-semibold text-teal-700">{pattern.score}</div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{pattern.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PublicView({ tab, setTab }) {
  const max = Math.max(...departments.map((department) => department.c));
  const top = [...departments].sort((a, b) => b.c - a.c).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="border-b border-slate-200 bg-[#10263f] px-6 py-4 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-300 text-lg font-bold text-slate-950">P</div>
            <div>
              <div className="text-lg font-semibold tracking-tight">Observatorio PMEC</div>
              <div className="text-xs text-slate-300">Datos agregados de vigilancia epidemiologica de enfermedades cronicas</div>
            </div>
          </div>
          <div className="hidden items-center gap-3 text-xs text-slate-300 lg:flex">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Actualizacion: Nov 2024</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Fuente institucional</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Datos anonimizados</span>
          </div>
        </div>
      </div>

      <section className="border-b border-slate-200 bg-white px-6 py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 xl:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-cyan-100 bg-cyan-50 px-4 py-1.5 text-xs font-medium text-cyan-800">
              Observatorio de salud publica
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950">
              Vigilancia publica de enfermedades cronicas con enfoque territorial, preventivo y epidemiologico.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
              Consulta indicadores agregados, tendencias, mapas, geovisor conceptual y boletines institucionales sin exponer informacion personal.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ["Notificaciones agregadas", "18,942"],
              ["Cobertura territorial", "32 departamentos"],
              ["Evento piloto", "Falla cardiaca"],
              ["Calidad del dato", "94%"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</div>
                <div className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3">
          {publicTabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={cn(
                "whitespace-nowrap rounded-2xl border px-4 py-2 text-sm font-medium",
                tab === item.id ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        {tab === "indicadores" ? (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
              <KpiCard title="Total notificaciones" value="18,942" subtitle="Agregado historico" icon={ClipboardList} accent="cyan" />
              <KpiCard title="Departamentos" value="32" subtitle="Con registros" icon={Map} accent="emerald" />
              <KpiCard title="Tasa por 100 mil" value="367.2" subtitle="Poblacional" icon={Gauge} accent="amber" />
              <KpiCard title="Calidad del dato" value="94%" subtitle="Notificacion valida" icon={CheckCircle2} accent="slate" />
              <KpiCard title="Corte" value="Nov 2024" subtitle="Actualizacion" icon={CalendarDays} accent="teal" />
            </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.04fr_0.96fr]">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <h3 className="text-xl font-semibold tracking-tight text-slate-950">Resumen publico</h3>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">Mayor concentracion</div>
                    <div className="mt-2 text-lg font-semibold text-slate-950">Bogota D.C.</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">Evento piloto</div>
                    <div className="mt-2 text-lg font-semibold text-slate-950">Falla cardiaca</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">Variacion semanal</div>
                    <div className="mt-2 text-lg font-semibold text-slate-950">+11.8%</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">Cobertura</div>
                    <div className="mt-2 text-lg font-semibold text-slate-950">842 municipios</div>
                  </div>
                </div>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <h3 className="text-xl font-semibold tracking-tight text-slate-950">Recursos para consulta publica</h3>
                <div className="mt-5 space-y-3">
                  {publicResources.map(([title, description]) => (
                    <div key={title} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                      <div className="font-medium text-slate-900">{title}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">{description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}

        {tab === "mapa" ? (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <h3 className="text-xl font-semibold tracking-tight text-slate-950">Mapa de calor nacional</h3>
              <p className="mt-1 text-sm text-slate-500">Concentracion agregada por departamento.</p>
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {departments.map((department) => (
                  <div key={department.n} className={cn("flex min-h-[82px] flex-col justify-between rounded-2xl p-4", heatClass(department.c, max))}>
                    <div className="text-sm font-medium leading-5">{department.n}</div>
                    <div className="mt-2 text-xs opacity-90">{department.c.toLocaleString()} casos</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <h3 className="text-xl font-semibold tracking-tight text-slate-950">GeoVisor conceptual</h3>
                <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <div className="relative min-h-[260px] overflow-hidden rounded-[20px] border border-slate-200 bg-[linear-gradient(180deg,#ecfeff_0%,#f8fafc_100%)]">
                    <div className="absolute left-6 top-6 rounded-full bg-rose-500 px-3 py-1 text-xs font-medium text-white">Pasto</div>
                    <div className="absolute left-20 top-20 rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white">Tumaco</div>
                    <div className="absolute right-12 top-14 rounded-full bg-amber-400 px-3 py-1 text-xs font-medium text-slate-900">Ipiales</div>
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-500">Visualizacion territorial de referencia</div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <h3 className="text-xl font-semibold tracking-tight text-slate-950">Territorios destacados</h3>
                <div className="mt-5 space-y-3">
                  {top.map((department) => (
                    <div key={department.n} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-medium text-slate-900">{department.n}</div>
                        <div className="text-sm text-slate-600">{department.c.toLocaleString()} casos</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {tab === "tendencias" ? (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <h3 className="text-xl font-semibold tracking-tight text-slate-950">Tendencia mensual</h3>
              <div className="mt-6">
                <MiniTrendChart values={[1120, 1240, 1180, 1350, 1420, 1510, 1480, 1560, 1620, 1580, 1640, 1710]} labels={monthLabels} tone="slate" tall />
              </div>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <h3 className="text-xl font-semibold tracking-tight text-slate-950">Comparacion interanual</h3>
              <div className="mt-5 space-y-4">
                {[
                  ["2022", 1120],
                  ["2023", 1380],
                  ["2024", 1710],
                ].map(([year, value]) => (
                  <div key={year}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-600">{year}</span>
                      <span className="font-medium text-slate-950">{value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-[#10263f]" style={{ width: `${(value / 1710) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {tab === "prevencion" ? (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.94fr_1.06fr]">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-medium text-emerald-700">
                Prevencion y orientacion publica
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">Falla cardiaca como evento piloto</h3>
              <p className="mt-3 leading-7 text-slate-600">
                La vista publica orienta a la ciudadania sobre factores de riesgo, alerta temprana y consulta oportuna sin mostrar informacion individual.
              </p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <h3 className="text-xl font-semibold tracking-tight text-slate-950">Recomendaciones clave</h3>
              <div className="mt-5 space-y-3">
                {preventionTips.map((tip) => (
                  <div key={tip} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {tab === "eventos" ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {publicEventCards.map(([title, description]) => (
              <div key={title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#10263f] text-white">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div className="text-lg font-semibold tracking-tight text-slate-950">{title}</div>
                <div className="mt-3 text-sm leading-6 text-slate-600">{description}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CreateNotificationModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    evento: "Falla cardiaca",
    semana: "SE 42",
    departamento: "Narino",
    municipio: "Pasto",
    unidad: "Hospital Universitario Departamental",
    casos: "12",
    variacion: "+6%",
    comportamiento: "En observacion",
    alerta: "Media",
    clasificacion: "Caso probable",
    fechaNotificacion: "2024-11-15",
    sexo: "Femenino",
    grupoEtario: "50 a 64",
    aseguramiento: "Contributivo",
    calidad: "94%",
    observaciones: "",
  });

  if (!open) return null;

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">Nueva notificacion</h3>
            <p className="text-sm text-slate-500">Registro base para evento notificado y variables minimas de vigilancia.</p>
          </div>
          <button onClick={onClose} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cerrar
          </button>
        </div>

        <div className="grid max-h-[72vh] grid-cols-1 gap-6 overflow-y-auto p-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              ["Evento", "evento"],
              ["Semana epidemiologica", "semana"],
              ["Departamento", "departamento"],
              ["Municipio", "municipio"],
              ["Unidad notificadora", "unidad"],
              ["Casos notificados", "casos"],
              ["Variacion", "variacion"],
              ["Comportamiento", "comportamiento"],
              ["Nivel de alerta", "alerta"],
              ["Clasificacion del caso", "clasificacion"],
              ["Fecha de notificacion", "fechaNotificacion"],
              ["Calidad del dato", "calidad"],
            ].map(([label, key]) => (
              <div key={key} className={key === "unidad" ? "md:col-span-2" : ""}>
                <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
                <input
                  value={form[key]}
                  onChange={(event) => update(key, event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                />
              </div>
            ))}

            <div>
              <div className="mb-2 text-sm font-medium text-slate-700">Sexo</div>
              <input
                value={form.sexo}
                onChange={(event) => update("sexo", event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium text-slate-700">Grupo etario</div>
              <input
                value={form.grupoEtario}
                onChange={(event) => update("grupoEtario", event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />
            </div>
            <div className="md:col-span-2">
              <div className="mb-2 text-sm font-medium text-slate-700">Observaciones</div>
              <textarea
                value={form.observaciones}
                onChange={(event) => update("observaciones", event.target.value)}
                className="min-h-[110px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">Resumen preliminar</div>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div>Evento: {form.evento}</div>
                <div>Territorio: {form.municipio}, {form.departamento}</div>
                <div>Semana epidemiologica: {form.semana}</div>
                <div>Unidad notificadora: {form.unidad}</div>
                <div>Comportamiento: {form.comportamiento}</div>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Brain className="h-4 w-4 text-teal-700" />
                Apoyo institucional
              </div>
              <div className="space-y-3">
                {[
                  "Validar consistencia territorial",
                  "Comparar contra promedio historico",
                  "Revisar calidad del dato",
                ].map((line) => (
                  <div key={line} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">
          <button onClick={onClose} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancelar
          </button>
          <button onClick={() => onSave(form)} className="rounded-2xl bg-[#10263f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#173452]">
            Guardar notificacion
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PMECRedesignFull() {
  const [historyStack, setHistoryStack] = useState(["dashboard"]);
  const [mode, setMode] = useState("app");
  const [role, setRole] = useState("epidemiologo");
  const [view, setViewState] = useState("dashboard");
  const [publicTab, setPublicTab] = useState("indicadores");
  const [notifications, setNotifications] = useState(eventNotificationsSeed);
  const [selectedNotificationId, setSelectedNotificationId] = useState("EV-0001");
  const [createOpen, setCreateOpen] = useState(false);

  const profile = roleProfiles[role];
  const selectedNotification = notifications.find((item) => item.id === selectedNotificationId) || notifications[0];

  const navigate = (nextView) => {
    startTransition(() => {
      setViewState(nextView);
      setHistoryStack((current) => (current[current.length - 1] === nextView ? current : [...current, nextView]));
    });
  };

  const openNotificationDetail = (id) => {
    setSelectedNotificationId(id);
    navigate("detalle-notificacion");
  };

  const openAnalytics = (id) => {
    setSelectedNotificationId(id);
    navigate("analitica");
  };

  const goBack = () => {
    setHistoryStack((current) => {
      if (current.length <= 1) return current;
      const nextStack = current.slice(0, -1);
      setViewState(nextStack[nextStack.length - 1]);
      return nextStack;
    });
  };

  const titleMap = {
    dashboard: "Dashboard de vigilancia epidemiologica",
    notificaciones: "Notificaciones",
    "detalle-notificacion": "Detalle de notificacion",
    ficha: "Ficha de notificacion",
    validacion: "Validacion de datos",
    soportes: "Soportes de notificacion",
    alertas: "Alertas epidemiologicas",
    analitica: "Analitica territorial",
    geovisor: "Geovisor",
    reportes: "Reportes",
    auditoria: "Auditoria",
    usuarios: "Usuarios y roles",
    configuracion: "Configuracion de eventos",
    "analisis-ia": "Analisis epidemiologico IA",
  };

  const subtitleMap = {
    dashboard: "Visualizacion general del comportamiento de eventos notificados, alertas, tendencias y analisis territorial.",
    notificaciones: "Consulta del comportamiento general de eventos notificados, variaciones territoriales, tendencias y alertas epidemiologicas.",
    "detalle-notificacion": "Consulta tecnica de la notificacion, variables principales y trazabilidad de validaciones.",
    ficha: "Registro estandarizado de notificacion epidemiologica para eventos cronicos priorizados.",
    validacion: "Control de consistencia, completitud, oportunidad y seguimiento de calidad del dato.",
    soportes: "Repositorio institucional de soportes asociados a la notificacion.",
    alertas: "Seguimiento poblacional de incrementos inusuales, concentracion territorial y retrasos de cargue.",
    analitica: "Analisis agregado por territorio, tendencia semanal, mapas de calor y hallazgos automatizados.",
    geovisor: "Exploracion conceptual del comportamiento territorial del evento piloto y sus alertas.",
    reportes: "Generacion y consulta de boletines, consolidados y salidas en PDF o Excel.",
    auditoria: "Trazabilidad de acciones sobre notificaciones, configuraciones y procesos analiticos.",
    usuarios: "Administracion de perfiles institucionales, roles y responsabilidades operativas.",
    configuracion: "Gestion de eventos, variables, umbrales y reglas base de vigilancia.",
    "analisis-ia": "Lectura automatica de patrones, prediccion de comportamiento y priorizacion territorial.",
  };

  const saveNotification = (form) => {
    const nextId = `EV-${String(notifications.length + 1).padStart(4, "0")}`;
    const comportamiento = form.comportamiento || "En observacion";
    const territorio = `${form.municipio}, ${form.departamento}`;

    const nextNotification = {
      id: nextId,
      evento: form.evento,
      semana: form.semana,
      territorio,
      departamento: form.departamento,
      municipio: form.municipio,
      casos: Number(form.casos || 0),
      variacion: form.variacion || "+0%",
      comportamiento,
      alerta: form.alerta || "Media",
      unidad: form.unidad,
      fechaNotificacion: form.fechaNotificacion,
      fechaCorte: form.fechaNotificacion,
      clasificacion: form.clasificacion || "Caso probable",
      accion: comportamiento === "Incremento inusual" || comportamiento === "Posible brote" ? "Ver analisis" : "Ver detalle",
      calidad: form.calidad || "94%",
      sexo: form.sexo || "No aplica",
      grupoEtario: form.grupoEtario || "No aplica",
      aseguramiento: form.aseguramiento || "No informado",
      hallazgos: [
        `La notificacion ${nextId} queda disponible para analisis territorial del evento ${form.evento}.`,
        `El territorio ${territorio} sera contrastado contra el promedio historico del corte ${form.semana}.`,
        "Se recomienda cerrar validacion final antes del consolidado departamental.",
      ],
      variables: [
        ["Casos notificados", String(form.casos || 0)],
        ["Calidad del dato", form.calidad || "94%"],
        ["Unidad notificadora", form.unidad],
        ["Clasificacion", form.clasificacion || "Caso probable"],
      ],
      validaciones: [
        { titulo: "Registro inicial", detalle: "Notificacion creada desde el modulo institucional.", estado: "Validada", fecha: `${form.fechaNotificacion} 09:00` },
        { titulo: "Consistencia territorial", detalle: `Territorio asociado a ${territorio}.`, estado: "Validada", fecha: `${form.fechaNotificacion} 09:05` },
        { titulo: "Revision de calidad", detalle: "Pendiente cierre de control analitico final.", estado: "En revision", fecha: `${form.fechaNotificacion} 09:12` },
      ],
    };

    setNotifications((current) => [nextNotification, ...current]);
    setSelectedNotificationId(nextId);
    setCreateOpen(false);
    navigate("detalle-notificacion");
  };

  const appView = () => {
    switch (view) {
      case "dashboard":
        return (
          <AppDashboard
            notifications={notifications}
            onSelect={openNotificationDetail}
            onOpenForm={() => navigate("ficha")}
            onOpenAnalytics={openAnalytics}
            onOpenGeovisor={() => navigate("geovisor")}
            role={role}
            setRole={setRole}
          />
        );
      case "notificaciones":
        return <NotificationsView notifications={notifications} onSelect={openNotificationDetail} onCreate={() => setCreateOpen(true)} onAnalytics={openAnalytics} />;
      case "detalle-notificacion":
        return <NotificationDetailView notification={selectedNotification} openView={navigate} onBack={() => navigate("notificaciones")} />;
      case "ficha":
        return <NotificationFormView />;
      case "validacion":
        return <DataValidationView notifications={notifications} />;
      case "soportes":
        return <SupportFilesView />;
      case "alertas":
        return <AlertsView />;
      case "analitica":
        return <AnalyticsView />;
      case "geovisor":
        return <GeovisorView />;
      case "reportes":
        return <ReportsView />;
      case "auditoria":
        return <AuditView />;
      case "usuarios":
        return <UsersView />;
      case "configuracion":
        return <ConfigurationView />;
      case "analisis-ia":
        return <AIView />;
      default:
        return (
          <AppDashboard
            notifications={notifications}
            onSelect={openNotificationDetail}
            onOpenForm={() => navigate("ficha")}
            onOpenAnalytics={openAnalytics}
            onOpenGeovisor={() => navigate("geovisor")}
            role={role}
            setRole={setRole}
          />
        );
    }
  };

  if (mode === "public") {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <PublicView tab={publicTab} setTab={setPublicTab} />
        <button onClick={() => setMode("app")} className="fixed bottom-6 right-6 rounded-full bg-slate-950 px-5 py-3 text-white shadow-lg">
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar view={view} setView={navigate} profile={profile} />
        <main className="min-w-0 flex-1">
          <TopBar
            title={titleMap[view]}
            subtitle={subtitleMap[view]}
            profile={profile}
            currentMode="app"
            onPublic={() => setMode("public")}
            onApp={() => setMode("app")}
          />
          <CompactNav view={view} setView={navigate} />

          <div className="px-5 pt-5 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="font-medium text-slate-900">PMEC · Observatorio institucional</span>
                <ChevronRight className="h-4 w-4" />
                <span>{titleMap[view]}</span>
              </div>
              <button
                onClick={goBack}
                disabled={historyStack.length <= 1}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Volver atras
              </button>
            </div>
          </div>

          <div className="p-5 lg:p-8">{appView()}</div>
        </main>
      </div>

      <CreateNotificationModal open={createOpen} onClose={() => setCreateOpen(false)} onSave={saveNotification} />
    </div>
  );
}
