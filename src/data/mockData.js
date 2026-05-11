export const monthLabels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
export const dashboardWeekLabels = ["SE 37","SE 38","SE 39","SE 40","SE 41","SE 42"];

export const eventCatalog = ["Falla cardiaca","Diabetes T2","Hipertension","EPOC","Insuficiencia renal","Asma"];

export const departments = [
  {n:"La Guajira",c:287},{n:"Cesar",c:412},{n:"Norte de Santander",c:589},{n:"Arauca",c:156},
  {n:"Atlantico",c:1243},{n:"Magdalena",c:378},{n:"Santander",c:712},{n:"Sucre",c:298},
  {n:"Bolivar",c:534},{n:"Boyaca",c:467},{n:"Casanare",c:178},{n:"Cordoba",c:523},
  {n:"Antioquia",c:1892},{n:"Cundinamarca",c:1156},{n:"Vichada",c:67},{n:"Choco",c:198},
  {n:"Caldas",c:423},{n:"Bogota D.C.",c:3456},{n:"Guainia",c:34},{n:"Risaralda",c:312},
  {n:"Meta",c:389},{n:"Vaupes",c:23},{n:"Quindio",c:234},{n:"Huila",c:445},
  {n:"Guaviare",c:45},{n:"Tolima",c:512},{n:"Caqueta",c:201},{n:"Amazonas",c:28},
  {n:"Valle del Cauca",c:1567},{n:"Putumayo",c:134},{n:"Cauca",c:312},{n:"Narino",c:367},
];

export const eventNotificationsSeed = [
  {id:"EV-0001",evento:"Falla cardiaca",semana:"SE 42",territorio:"Pasto, Narino",departamento:"Narino",municipio:"Pasto",casos:48,variacion:"+22%",comportamiento:"Incremento inusual",alerta:"Alta",unidad:"Hospital Universitario Departamental",fechaNotificacion:"2024-11-15",fechaCorte:"2024-11-15",clasificacion:"Caso confirmado",accion:"Ver analisis",calidad:"96%",sexo:"Masculino",grupoEtario:"65 y mas",aseguramiento:"Contributivo",
    hallazgos:["Falla cardiaca presenta aumento del 22% en Pasto frente al promedio de las ultimas 4 semanas.","La unidad notificadora concentra el mayor volumen del departamento en SE 42.","Se recomienda revision de consistencia territorial y contraste con el historico inmediato."],
    variables:[["Casos hospitalizados","17"],["Tasa por 100 mil","31.4"],["UPGD activas","8"],["Completitud","96%"],["Retraso promedio","1.2 dias"]],
    validaciones:[{titulo:"Consistencia territorial",detalle:"Territorio y unidad notificadora coinciden con el catalogo departamental.",estado:"Validada",fecha:"2024-11-15 08:42"},{titulo:"Duplicados",detalle:"No se detectan notificaciones duplicadas en la semana epidemiologica 42.",estado:"Validada",fecha:"2024-11-15 08:50"},{titulo:"Variables criticas",detalle:"Casos, clasificacion y fecha de notificacion completos.",estado:"Validada",fecha:"2024-11-15 09:05"},{titulo:"Revision analitica",detalle:"Incremento sobre umbral esperado marcado para revision territorial prioritaria.",estado:"Escalada",fecha:"2024-11-15 09:20"}]},
  {id:"EV-0002",evento:"Falla cardiaca",semana:"SE 42",territorio:"Tumaco, Narino",departamento:"Narino",municipio:"Tumaco",casos:33,variacion:"+15%",comportamiento:"En observacion",alerta:"Media",unidad:"Hospital San Andres de Tumaco",fechaNotificacion:"2024-11-15",fechaCorte:"2024-11-15",clasificacion:"Caso probable",accion:"Ver analisis",calidad:"92%",sexo:"Femenino",grupoEtario:"50 a 64",aseguramiento:"Subsidiado",
    hallazgos:["Tumaco concentra el mayor crecimiento relativo del evento piloto en la subregion costera.","La oportunidad del cargue se mantiene dentro del rango esperado.","Se prioriza contraste contra promedio departamental para validar comportamiento sostenido."],
    variables:[["Casos hospitalizados","11"],["Tasa por 100 mil","27.8"],["UPGD activas","5"],["Completitud","92%"],["Retraso promedio","1.8 dias"]],
    validaciones:[{titulo:"Territorio",detalle:"Municipio y departamento validados contra maestro institucional.",estado:"Validada",fecha:"2024-11-15 08:20"},{titulo:"Semana epidemiologica",detalle:"La fecha del evento corresponde a SE 42.",estado:"Validada",fecha:"2024-11-15 08:28"},{titulo:"Calidad del dato",detalle:"Dos registros requieren ajuste en variable de clasificacion.",estado:"En revision",fecha:"2024-11-15 09:10"},{titulo:"Revision territorial",detalle:"Territorio incluido en observacion por incremento sostenido.",estado:"Escalada",fecha:"2024-11-15 09:34"}]},
  {id:"EV-0003",evento:"Diabetes T2",semana:"SE 42",territorio:"Ipiales, Narino",departamento:"Narino",municipio:"Ipiales",casos:27,variacion:"+4%",comportamiento:"Estable",alerta:"Baja",unidad:"Hospital Civil de Ipiales",fechaNotificacion:"2024-11-15",fechaCorte:"2024-11-15",clasificacion:"Caso confirmado",accion:"Ver detalle",calidad:"95%",sexo:"Femenino",grupoEtario:"35 a 49",aseguramiento:"Contributivo",
    hallazgos:["La variacion se mantiene dentro del rango esperado para el historico inmediato.","No se observan concentraciones anormales por unidad notificadora.","Los indicadores de completitud superan la meta institucional."],
    variables:[["Casos nuevos","9"],["Casos recurrentes","18"],["Tasa por 100 mil","18.2"],["UPGD activas","6"],["Completitud","95%"]],
    validaciones:[{titulo:"Duplicados",detalle:"No se detectan registros repetidos.",estado:"Validada",fecha:"2024-11-15 08:12"},{titulo:"Territorio",detalle:"La unidad notificadora pertenece al municipio reportado.",estado:"Validada",fecha:"2024-11-15 08:19"},{titulo:"Clasificacion",detalle:"Clasificacion del caso coherente con variables principales.",estado:"Validada",fecha:"2024-11-15 08:44"}]},
  {id:"EV-0004",evento:"Hipertension",semana:"SE 42",territorio:"La Union, Narino",departamento:"Narino",municipio:"La Union",casos:19,variacion:"-3%",comportamiento:"Esperado",alerta:"Baja",unidad:"Hospital San Jose de La Union",fechaNotificacion:"2024-11-15",fechaCorte:"2024-11-15",clasificacion:"Caso confirmado",accion:"Ver detalle",calidad:"97%",sexo:"Masculino",grupoEtario:"50 a 64",aseguramiento:"Subsidiado",
    hallazgos:["El evento se ubica dentro del canal esperado para la semana epidemiologica.","No se identifican alertas por retraso ni por subregistro.","La distribucion por unidad notificadora es homogena."],
    variables:[["Casos nuevos","5"],["Casos recurrentes","14"],["Tasa por 100 mil","13.8"],["UPGD activas","4"],["Completitud","97%"]],
    validaciones:[{titulo:"Semana epidemiologica",detalle:"Coherencia temporal confirmada.",estado:"Validada",fecha:"2024-11-15 08:05"},{titulo:"Calidad del dato",detalle:"Sin campos criticos faltantes.",estado:"Validada",fecha:"2024-11-15 08:18"},{titulo:"Canal endemico",detalle:"Comportamiento dentro del rango esperado.",estado:"Validada",fecha:"2024-11-15 08:56"}]},
  {id:"EV-0005",evento:"Falla cardiaca",semana:"SE 42",territorio:"Tuquerres, Narino",departamento:"Narino",municipio:"Tuquerres",casos:21,variacion:"+18%",comportamiento:"Posible brote",alerta:"Alta",unidad:"Hospital San Juan de Dios de Tuquerres",fechaNotificacion:"2024-11-15",fechaCorte:"2024-11-15",clasificacion:"Caso confirmado",accion:"Ver analisis",calidad:"89%",sexo:"Masculino",grupoEtario:"65 y mas",aseguramiento:"Subsidiado",
    hallazgos:["Se identifican 3 municipios por encima del umbral esperado para el evento piloto.","Tuquerres presenta aumento sostenido en las ultimas tres semanas epidemiologicas.","Se sugiere validacion de soporte y oportunidad de carga."],
    variables:[["Casos hospitalizados","8"],["Tasa por 100 mil","19.4"],["UPGD activas","3"],["Completitud","89%"],["Retraso promedio","2.4 dias"]],
    validaciones:[{titulo:"Oportunidad",detalle:"Tres fichas superan el tiempo objetivo de cargue.",estado:"En revision",fecha:"2024-11-15 09:12"},{titulo:"Calidad del dato",detalle:"Se requiere ajuste en variable de clasificacion.",estado:"En revision",fecha:"2024-11-15 09:16"},{titulo:"Analisis territorial",detalle:"Patron escalado por posible concentracion local.",estado:"Escalada",fecha:"2024-11-15 09:31"}]},
  {id:"EV-0006",evento:"EPOC",semana:"SE 42",territorio:"Pasto, Narino",departamento:"Narino",municipio:"Pasto",casos:17,variacion:"+9%",comportamiento:"En observacion",alerta:"Media",unidad:"Hospital Local Centro",fechaNotificacion:"2024-11-15",fechaCorte:"2024-11-15",clasificacion:"Caso probable",accion:"Ver detalle",calidad:"93%",sexo:"Femenino",grupoEtario:"50 a 64",aseguramiento:"Contributivo",
    hallazgos:["El incremento no supera el umbral, pero amerita seguimiento semanal.","Se observa agrupacion en dos UPGD del casco urbano.","La completitud del dato se mantiene por encima del minimo operativo."],
    variables:[["Casos nuevos","7"],["Casos recurrentes","10"],["Tasa por 100 mil","11.6"],["UPGD activas","6"],["Completitud","93%"]],
    validaciones:[{titulo:"Territorio",detalle:"Ubicacion validada sin inconsistencias.",estado:"Validada",fecha:"2024-11-15 07:55"},{titulo:"Clasificacion",detalle:"Pendiente confirmacion final por soporte clinico.",estado:"En revision",fecha:"2024-11-15 08:49"},{titulo:"Tendencia",detalle:"Incluido en seguimiento por incremento reciente.",estado:"Escalada",fecha:"2024-11-15 09:02"}]},
  {id:"EV-0007",evento:"Insuficiencia renal",semana:"SE 42",territorio:"Samaniego, Narino",departamento:"Narino",municipio:"Samaniego",casos:11,variacion:"+7%",comportamiento:"Retraso de notificacion",alerta:"Media",unidad:"ESE Samaniego",fechaNotificacion:"2024-11-14",fechaCorte:"2024-11-15",clasificacion:"Caso confirmado",accion:"Ver detalle",calidad:"84%",sexo:"Masculino",grupoEtario:"65 y mas",aseguramiento:"Subsidiado",
    hallazgos:["Tres IPS presentan retraso en cargue de fichas durante SE 42.","La oportunidad del reporte afecta la lectura consolidada del territorio.","Se recomienda cierre de validaciones antes de consolidado departamental."],
    variables:[["Casos nuevos","4"],["Casos recurrentes","7"],["Tasa por 100 mil","9.1"],["UPGD activas","2"],["Completitud","84%"]],
    validaciones:[{titulo:"Oportunidad",detalle:"Se identifican retrasos superiores a 48 horas.",estado:"En revision",fecha:"2024-11-15 08:11"},{titulo:"Calidad del dato",detalle:"Faltan dos variables secundarias en la ficha consolidada.",estado:"En revision",fecha:"2024-11-15 08:36"},{titulo:"Escalamiento",detalle:"Se notifica a administrador territorial para ajuste de cargue.",estado:"Escalada",fecha:"2024-11-15 09:14"}]},
  {id:"EV-0008",evento:"Diabetes T2",semana:"SE 42",territorio:"Sandona, Narino",departamento:"Narino",municipio:"Sandona",casos:13,variacion:"-2%",comportamiento:"Estable",alerta:"Baja",unidad:"Hospital Clarita Santos",fechaNotificacion:"2024-11-15",fechaCorte:"2024-11-15",clasificacion:"Caso confirmado",accion:"Ver detalle",calidad:"94%",sexo:"Femenino",grupoEtario:"35 a 49",aseguramiento:"Contributivo",
    hallazgos:["No se observan cambios relevantes frente al promedio historico de cuatro semanas.","La calidad del dato se mantiene estable y sin alertas activas.","Se conserva cobertura regular por unidad notificadora."],
    variables:[["Casos nuevos","3"],["Casos recurrentes","10"],["Tasa por 100 mil","8.7"],["UPGD activas","3"],["Completitud","94%"]],
    validaciones:[{titulo:"Territorio",detalle:"Registro consistente con el directorio institucional.",estado:"Validada",fecha:"2024-11-15 08:02"},{titulo:"Calidad del dato",detalle:"Sin omisiones en variables obligatorias.",estado:"Validada",fecha:"2024-11-15 08:17"},{titulo:"Comportamiento",detalle:"Sin desviaciones frente al historico de referencia.",estado:"Validada",fecha:"2024-11-15 08:47"}]},
];

export const supportFilesSeed = [
  {nombre:"soporte_falla_cardiaca_pasto_se42.pdf",tipo:"Resumen UPGD",unidad:"Hospital Universitario Departamental",tamano:"810 KB",fecha:"2024-11-15"},
  {nombre:"consolidado_tumaco_se42.xlsx",tipo:"Base consolidada",unidad:"Hospital San Andres de Tumaco",tamano:"1.7 MB",fecha:"2024-11-15"},
  {nombre:"acta_validacion_tuquerres.docx",tipo:"Acta de revision",unidad:"Hospital San Juan de Dios",tamano:"420 KB",fecha:"2024-11-15"},
  {nombre:"tablero_calidad_dato_se42.pdf",tipo:"Calidad del dato",unidad:"Nivel departamental",tamano:"980 KB",fecha:"2024-11-14"},
];

export const alertsSeed = [
  {nivel:"Alta",evento:"Falla cardiaca",territorio:"Pasto, Narino",semana:"SE 42",mensaje:"Pasto supera el umbral esperado de notificaciones de falla cardiaca en SE 42.",tipo:"Incremento inusual"},
  {nivel:"Media",evento:"Falla cardiaca",territorio:"Tumaco, Narino",semana:"SE 42",mensaje:"Tumaco presenta concentracion territorial superior al promedio departamental.",tipo:"Concentracion territorial"},
  {nivel:"Alta",evento:"Falla cardiaca",territorio:"Tuquerres, Narino",semana:"SE 42",mensaje:"Tres municipios se ubican por encima del canal esperado para el evento piloto.",tipo:"Posible brote"},
  {nivel:"Media",evento:"Insuficiencia renal",territorio:"Samaniego, Narino",semana:"SE 42",mensaje:"Tres IPS presentan retraso en cargue de fichas y requieren cierre de validacion.",tipo:"Retraso de notificacion"},
  {nivel:"Baja",evento:"Diabetes T2",territorio:"Ipiales, Narino",semana:"SE 42",mensaje:"La calidad del dato mejora, pero dos UPGD siguen en observacion por consistencia.",tipo:"Baja calidad del dato"},
  {nivel:"Media",evento:"EPOC",territorio:"Pasto, Narino",semana:"SE 42",mensaje:"EPOC presenta agrupacion en dos UPGD del casco urbano de Pasto.",tipo:"Concentracion territorial"},
  {nivel:"Baja",evento:"Hipertension",territorio:"La Union, Narino",semana:"SE 42",mensaje:"Posible subregistro en dos unidades notificadoras del municipio.",tipo:"Subregistro"},
];

export const aiFindings = [
  "Falla cardiaca presenta aumento del 22% en Pasto frente al promedio de las ultimas 4 semanas.",
  "Tumaco concentra el mayor crecimiento relativo del evento piloto.",
  "Se identifican 3 municipios por encima del umbral esperado.",
  "La semana epidemiologica 42 requiere revision territorial prioritaria.",
];

export const epidemiologicalPrompts = [
  "Analizar variacion territorial",
  "Detectar comportamiento inusual",
  "Comparar contra promedio historico",
  "Revisar calidad del dato",
  "Identificar municipios priorizados",
];

export const aiPatterns = [
  {titulo:"Concentracion territorial del evento piloto",descripcion:"El crecimiento relativo se concentra en cabeceras municipales con mayor densidad notificadora.",score:"91%",tipo:"Patron detectado"},
  {titulo:"Retraso de cargue en UPGD perifericas",descripcion:"Las notificaciones tardias se agrupan en municipios con menor conectividad operativa.",score:"88%",tipo:"Calidad del dato"},
  {titulo:"Incremento sostenido de falla cardiaca",descripcion:"La serie semanal del piloto muestra una variacion positiva durante cuatro cortes consecutivos.",score:"93%",tipo:"Tendencia"},
];

export const reportsSeed = [
  {nombre:"Boletin epidemiologico ECNT - SE 42",formato:"PDF",tamano:"2.4 MB",fecha:"2024-11-30",tipo:"Automatico"},
  {nombre:"Consolidado departamental de notificaciones",formato:"Excel",tamano:"4.1 MB",fecha:"2024-11-29",tipo:"Corte semanal"},
  {nombre:"Calidad del dato por unidad notificadora",formato:"PDF",tamano:"960 KB",fecha:"2024-11-28",tipo:"Seguimiento"},
  {nombre:"Reporte territorial del piloto de falla cardiaca",formato:"PDF",tamano:"1.8 MB",fecha:"2024-11-27",tipo:"Analitico"},
];

export const auditLog = [
  {fecha:"2024-11-15 14:32",usuario:"Laura Martinez",rol:"Profesional notificador",accion:"Envio de notificacion",objeto:"EV-0001",resultado:"Exito",origen:"UPGD Pasto"},
  {fecha:"2024-11-15 13:15",usuario:"Ana Rojas",rol:"Epidemiologa territorial",accion:"Escalamiento de alerta",objeto:"EV-0005",resultado:"Exito",origen:"Analitica territorial"},
  {fecha:"2024-11-15 12:48",usuario:"Carlos Herrera",rol:"Administrador territorial",accion:"Actualizacion de umbral",objeto:"Falla cardiaca",resultado:"Exito",origen:"Configuracion de eventos"},
  {fecha:"2024-11-15 12:00",usuario:"Sistema",rol:"Automatico",accion:"Generacion de boletin",objeto:"SE 42",resultado:"Exito",origen:"Motor de reportes"},
  {fecha:"2024-11-14 16:20",usuario:"Ana Rojas",rol:"Epidemiologa territorial",accion:"Validacion de consistencia",objeto:"EV-0002",resultado:"En revision",origen:"Modulo de validacion"},
];

export const usersSeed = [
  {nombre:"Laura Martinez",correo:"laura.martinez@pmec.gov.co",rol:"Profesional notificador",estado:"Activo",area:"UPGD Pasto"},
  {nombre:"Ana Rojas",correo:"ana.rojas@pmec.gov.co",rol:"Epidemiologa territorial",estado:"Activo",area:"Vigilancia departamental"},
  {nombre:"Carlos Herrera",correo:"carlos.herrera@pmec.gov.co",rol:"Administrador territorial",estado:"Activo",area:"Gobernanza del sistema"},
  {nombre:"Diana Mora",correo:"diana.mora@pmec.gov.co",rol:"Analista de datos",estado:"Activo",area:"Analitica territorial"},
];

export const eventConfigSeed = [
  {evento:"Falla cardiaca",estado:"Piloto activo",umbral:"Canal historico + 15%",periodicidad:"Semanal",variables:32},
  {evento:"Diabetes T2",estado:"Activo",umbral:"Canal historico + 10%",periodicidad:"Semanal",variables:28},
  {evento:"Hipertension",estado:"Activo",umbral:"Canal historico + 10%",periodicidad:"Semanal",variables:22},
  {evento:"EPOC",estado:"Configuracion",umbral:"Pendiente",periodicidad:"Semanal",variables:24},
  {evento:"Insuficiencia renal",estado:"Pendiente",umbral:"Pendiente",periodicidad:"Semanal",variables:20},
];

export const publicTabs = [
  {id:"indicadores",label:"Indicadores"},
  {id:"mapa",label:"Mapa de calor"},
  {id:"tendencias",label:"Tendencias"},
  {id:"prevencion",label:"Prevencion"},
  {id:"eventos",label:"Eventos vigilados"},
];

export const publicResources = [
  ["Indicadores oficiales","Consulta agregada de notificaciones, tendencias y variacion semanal por territorio."],
  ["GeoVisor conceptual","Exploracion territorial del comportamiento del evento piloto y otros eventos vigilados."],
  ["Boletines y reportes","Salida institucional en PDF y Excel para seguimiento publico."],
  ["Protocolos y fichas","Lineamientos de vigilancia por evento y documentos tecnicos de apoyo."],
];

export const publicEventCards = [
  ["Falla cardiaca","Evento piloto priorizado para vigilancia de comportamiento semanal, concentracion territorial y alertas de incremento."],
  ["Diabetes T2","Seguimiento agregado de notificaciones para analisis de carga poblacional y distribucion territorial."],
  ["Hipertension","Monitoreo territorial de eventos notificados con enfoque de oportunidad y calidad del dato."],
  ["EPOC","Observacion del comportamiento estacional y de la concentracion por unidad notificadora."],
];

export const preventionTips = [
  "Promover control de factores de riesgo cardiovasculares en el territorio.",
  "Fortalecer deteccion temprana y oportunidad de la notificacion.",
  "Reforzar cierre oportuno de fichas en unidades notificadoras con retraso.",
  "Asegurar consistencia entre evento, clasificacion y semana epidemiologica.",
  "Priorizar revision de municipios por encima del umbral esperado.",
];

export const roleProfiles = {
  notificador:{name:"Laura Martinez",role:"Profesional notificador",badge:"Operacion local"},
  epidemiologo:{name:"Ana Rojas",role:"Epidemiologa territorial",badge:"Analisis departamental"},
  admin:{name:"Carlos Herrera",role:"Administrador territorial",badge:"Gobernanza del sistema"},
};

export const publicationsSeed = [
  {titulo:"Boletin epidemiologico ECNT - Semana 42",descripcion:"Resumen semanal del comportamiento de eventos cronicos notificados en el departamento de Narino.",fecha:"15 Nov 2024",tipo:"Boletin",color:"bg-cyan-50 text-cyan-700 border-cyan-100"},
  {titulo:"Informe trimestral de falla cardiaca Q3-2024",descripcion:"Analisis del comportamiento territorial, tendencias y calidad del dato para el evento piloto.",fecha:"30 Sep 2024",tipo:"Informe",color:"bg-teal-50 text-teal-700 border-teal-100"},
  {titulo:"Ficha tecnica - Vigilancia de ECNT",descripcion:"Documento metodologico con definiciones operativas, fuentes y flujos de informacion.",fecha:"01 Ago 2024",tipo:"Ficha tecnica",color:"bg-slate-100 text-slate-700 border-slate-200"},
  {titulo:"Lineamiento de notificacion para unidades UPGD",descripcion:"Guia operativa para el diligenciamiento y cargue de fichas de notificacion.",fecha:"15 Jul 2024",tipo:"Lineamiento",color:"bg-amber-50 text-amber-700 border-amber-100"},
  {titulo:"Publicacion del semillero PEMEC - Vol. 1",descripcion:"Primera entrega academica del semillero de investigacion sobre vigilancia epidemiologica de cronicas.",fecha:"01 Jun 2024",tipo:"Publicacion academica",color:"bg-violet-50 text-violet-700 border-violet-100"},
  {titulo:"Protocolo de vigilancia de diabetes tipo 2",descripcion:"Marco de referencia para la vigilancia poblacional de diabetes en el territorio.",fecha:"15 May 2024",tipo:"Protocolo",color:"bg-emerald-50 text-emerald-700 border-emerald-100"},
];

export const referenceTablesSeed = [
  {nombre:"Catalogo de eventos",registros:6,descripcion:"Listado de eventos cronicos configurados para vigilancia.",ultima:"2024-11-15"},
  {nombre:"Territorios",registros:1122,descripcion:"Departamentos, municipios y corregimientos del directorio institucional.",ultima:"2024-11-01"},
  {nombre:"Unidades notificadoras",registros:248,descripcion:"UPGD, IPS y prestadores habilitados para notificacion.",ultima:"2024-10-28"},
  {nombre:"Variables de notificacion",registros:126,descripcion:"Catalogo transversal de variables por evento.",ultima:"2024-11-10"},
  {nombre:"Grupos de edad",registros:12,descripcion:"Rangos etarios estandarizados para analisis poblacional.",ultima:"2024-09-01"},
  {nombre:"Clasificaciones del caso",registros:5,descripcion:"Tipologias de clasificacion: sospechoso, probable, confirmado, descartado, en revision.",ultima:"2024-09-01"},
  {nombre:"Codigos internos",registros:45,descripcion:"Codificacion interna para eventos, subtipos y variables derivadas.",ultima:"2024-10-15"},
];

export const microdatosSeed = [
  {id:"MD-001",evento:"Falla cardiaca",semana:"SE 42",departamento:"Narino",municipio:"Pasto",grupoEdad:"65 y mas",sexo:"M",clasificacion:"Confirmado",aseguramiento:"Contributivo"},
  {id:"MD-002",evento:"Falla cardiaca",semana:"SE 42",departamento:"Narino",municipio:"Tumaco",grupoEdad:"50 a 64",sexo:"F",clasificacion:"Probable",aseguramiento:"Subsidiado"},
  {id:"MD-003",evento:"Diabetes T2",semana:"SE 42",departamento:"Narino",municipio:"Ipiales",grupoEdad:"35 a 49",sexo:"F",clasificacion:"Confirmado",aseguramiento:"Contributivo"},
  {id:"MD-004",evento:"Hipertension",semana:"SE 42",departamento:"Narino",municipio:"La Union",grupoEdad:"50 a 64",sexo:"M",clasificacion:"Confirmado",aseguramiento:"Subsidiado"},
  {id:"MD-005",evento:"EPOC",semana:"SE 42",departamento:"Narino",municipio:"Pasto",grupoEdad:"50 a 64",sexo:"F",clasificacion:"Probable",aseguramiento:"Contributivo"},
  {id:"MD-006",evento:"Falla cardiaca",semana:"SE 41",departamento:"Narino",municipio:"Tuquerres",grupoEdad:"65 y mas",sexo:"M",clasificacion:"Confirmado",aseguramiento:"Subsidiado"},
  {id:"MD-007",evento:"Insuficiencia renal",semana:"SE 42",departamento:"Narino",municipio:"Samaniego",grupoEdad:"65 y mas",sexo:"M",clasificacion:"Confirmado",aseguramiento:"Subsidiado"},
  {id:"MD-008",evento:"Diabetes T2",semana:"SE 41",departamento:"Narino",municipio:"Sandona",grupoEdad:"35 a 49",sexo:"F",clasificacion:"Confirmado",aseguramiento:"Contributivo"},
];
