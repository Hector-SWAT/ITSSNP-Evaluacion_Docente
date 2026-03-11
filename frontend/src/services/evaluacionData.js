/* ================================================================
   evaluacionData.js  →  src/services/evaluacionData.js
   Datos mock del SICOT. Al conectar el backend, reemplaza SOLO
   las funciones marcadas con  ← BACKEND  por llamadas a tu API.
   ================================================================ */

/* ── Categorías ─────────────────────────────────────────────── */
export const CATEGORIAS = [
  { id: 1, nombre: "Detección y diagnóstico oportuno de necesidades" },
  { id: 2, nombre: "Monitoreo del rendimiento académico" },
  { id: 3, nombre: "Seguimiento y retroalimentación continua" },
  { id: 4, nombre: "Comunicación y relación con los tutorados" },
  { id: 5, nombre: "Compromiso y responsabilidad" },
  { id: 6, nombre: "Capacidad para motivar y acompañar en el desarrollo personal y profesional" },
  { id: 7, nombre: "Impacto en la reducción de reprobación y deserción" },
  { id: 8, nombre: "Aplicación de estrategias de rescate académico" },
  { id: 9, nombre: "Satisfacción general del tutor o la tutora" },
]

/* ── Rúbrica ─────────────────────────────────────────────────── */
export const RUBRICA = {
  1:{5:"Detectó completamente mis necesidades y ofreció un apoyo excelente.",4:"Detectó bien mis necesidades y ofreció un apoyo adecuado.",3:"Detectó mis necesidades de forma general y ofreció apoyo limitado.",2:"Detectó algunas de mis necesidades, pero no ofreció apoyo adecuado.",1:"No detectó mis necesidades ni ofreció apoyo."},
  2:{5:"Realizó un seguimiento constante y me brindó apoyo eficaz en todo momento.",4:"Realizó un buen seguimiento y me apoyó en las materias problemáticas.",3:"Realizó seguimiento regular pero no siempre me apoyó en mis problemáticas.",2:"Hizo un seguimiento ocasional pero no constante.",1:"Nunca realizó seguimiento de mi desempeño."},
  3:{5:"Siempre hizo un seguimiento constante y su retroalimentación fue muy valiosa.",4:"Hizo un buen seguimiento y me dio retroalimentación útil.",3:"Hizo un seguimiento irregular con retroalimentación limitada.",2:"Hizo un seguimiento mínimo y su retroalimentación fue escasa.",1:"Nunca hizo seguimiento ni dio retroalimentación."},
  4:{5:"La comunicación fue excelente y siempre me sentí en confianza.",4:"La comunicación fue buena y generó confianza en muchas ocasiones.",3:"La comunicación fue irregular, aunque a veces me sentí en confianza.",2:"La comunicación fue escasa y no generó confianza.",1:"No hubo comunicación ni confianza."},
  5:{5:"Siempre asistió y demostró un alto nivel de compromiso con mi desarrollo.",4:"Asistió a las sesiones y demostró un buen nivel de compromiso.",3:"Asistió a la mayoría de las sesiones, pero su compromiso fue irregular.",2:"Asistió a pocas sesiones y su compromiso fue mínimo.",1:"No asistió ni mostró compromiso."},
  6:{5:"Me motivó siempre y me dio una excelente orientación para mi desarrollo.",4:"Me motivó constantemente y me ofreció una buena orientación.",3:"Me motivó algunas veces y la orientación fue general.",2:"Me motivó de manera limitada y no me brindó mucha orientación.",1:"No me motivó ni me ofreció orientación."},
  7:{5:"Su impacto fue muy positivo, ayudándome a evitar la reprobación y el abandono.",4:"Su impacto fue positivo y me ayudó a mejorar mi rendimiento.",3:"Su impacto fue moderado, pero no evitó todas las dificultades.",2:"Tuvo un impacto muy limitado en mi desempeño.",1:"No tuvo ningún impacto positivo."},
  8:{5:"Aplicó estrategias excelentes y me ayudó a superar todas mis dificultades.",4:"Aplicó buenas estrategias y me ayudó a superar algunas dificultades.",3:"Aplicó algunas estrategias, pero no siempre resultaron efectivas.",2:"Aplicó estrategias mínimas o ineficaces.",1:"No aplicó ninguna estrategia de rescate."},
  9:{5:"Muy alta",4:"Alta",3:"Regular",2:"Baja",1:"Muy baja"},
}

export const ESCALA_LABELS = { 5:"Excelente",4:"Muy bueno",3:"Bueno",2:"Regular",1:"Deficiente" }

/* ── 17 preguntas oficiales ─────────────────────────────────── */
export const BANCO_PREGUNTAS = [
  {id:1,idCategoria:1,texto:"¿El tutor(a) identifica de manera oportuna las necesidades académicas, personales o socioemocionales del tutorado?"},
  {id:2,idCategoria:1,texto:"¿El tutor(a) realiza un diagnóstico adecuado que permite conocer la situación académica y personal del tutorado?"},
  {id:3,idCategoria:2,texto:"¿El tutor(a) da seguimiento periódico al desempeño académico del tutorado (calificaciones, asistencia, avance en materias)?"},
  {id:4,idCategoria:2,texto:"¿El tutor(a) interviene cuando detecta riesgo de reprobación o bajo rendimiento académico?"},
  {id:5,idCategoria:3,texto:"¿El tutor(a) mantiene un seguimiento constante de los acuerdos y compromisos establecidos con el tutorado?"},
  {id:6,idCategoria:3,texto:"¿El tutor(a) brinda retroalimentación clara, constructiva y orientada a la mejora?"},
  {id:7,idCategoria:4,texto:"¿El tutor(a) mantiene una comunicación respetuosa, empática y accesible con los tutorados?"},
  {id:8,idCategoria:4,texto:"¿El tutor(a) genera un ambiente de confianza que facilita el diálogo abierto?"},
  {id:9,idCategoria:5,texto:"¿El tutor(a) cumple en tiempo y forma con las actividades y reportes establecidos en el programa de tutorías?"},
  {id:10,idCategoria:5,texto:"¿El tutor(a) demuestra disposición y responsabilidad en la atención de los tutorados?"},
  {id:11,idCategoria:6,texto:"¿El tutor(a) motiva al tutorado para alcanzar sus metas académicas y personales?"},
  {id:12,idCategoria:6,texto:"¿El tutor(a) orienta al tutorado en su proyecto de vida y desarrollo profesional?"},
  {id:13,idCategoria:7,texto:"¿La intervención del tutor(a) contribuye a prevenir la reprobación del tutorado?"},
  {id:14,idCategoria:7,texto:"¿La intervención del tutor(a) favorece la permanencia del tutorado en la institución?"},
  {id:15,idCategoria:8,texto:"¿El tutor(a) canaliza oportunamente al tutorado a asesorías académicas, orientación educativa, servicios médicos u otros apoyos cuando es necesario?"},
  {id:16,idCategoria:8,texto:"¿El tutor(a) implementa estrategias específicas para apoyar la recuperación académica del tutorado?"},
  {id:17,idCategoria:9,texto:"En términos generales, ¿qué tan satisfecho(a) se encuentra con el acompañamiento brindado por su tutor(a)?"},
]

/* ── Shuffle con semilla por alumno ─────────────────────────── */
function seededShuffle(array, seed) {
  const arr = [...array]
  let s = (seed ^ 0xdeadbeef) >>> 0
  for (let i = arr.length - 1; i > 0; i--) {
    s = Math.imul(s ^ (s >>> 17), 0x45d9f3b)
    s = Math.imul(s ^ (s >>> 11), 0x9e3779b9)
    s = (s ^ (s >>> 6)) >>> 0
    const j = s % (i + 1);[arr[i],arr[j]] = [arr[j],arr[i]]
  }
  return arr
}

export function getPreguntasOrdenadas(numControl) {
  const sin17  = BANCO_PREGUNTAS.filter(p => p.id !== 17)
  const ultima = BANCO_PREGUNTAS.find(p => p.id === 17)
  return [...seededShuffle(sin17, Number(numControl)), ultima]
}

/* ── Periodos escolares ─────────────────────────────────────── */
export const PERIODOS = [
  { id: 1, nombre: "Enero–Junio 2025",     activo: false },
  { id: 2, nombre: "Agosto–Diciembre 2025", activo: false },
  { id: 3, nombre: "Enero–Junio 2026",     activo: true  },
]

/* ── Docentes / tutores ─────────────────────────────────────── */
export const DOCENTES = [
  { id: 1, nombre: "Dr. Carlos Méndez Ríos",      grado:"Dr.",   departamento:"ISC" },
  { id: 2, nombre: "M.C. Laura Pérez Sánchez",     grado:"M.C.", departamento:"ISC" },
  { id: 3, nombre: "Ing. Roberto Torres Vega",    grado:"Ing.", departamento:"ISC" },
  { id: 10, nombre: "Dr. Alejandro Vargas Cruz",  grado:"Dr.",  departamento:"IIA" },
  { id: 11, nombre: "M.C. Patricia Ruiz León",    grado:"M.C.",departamento:"IIA" },
]

/* ── Alumnos mock ───────────────────────────────────────────── */
const MOCK_ALUMNOS_ISC = [
  {numControl:12345678,nombre:"Juan Carlos Pérez López",    carrera:"ISC",semestre:4},
  {numControl:12345679,nombre:"María Fernanda García Ruiz", carrera:"ISC",semestre:4},
  {numControl:12345680,nombre:"Luis Alberto Sánchez Torres",carrera:"ISC",semestre:4},
  {numControl:12345681,nombre:"Ana Sofía Martínez Díaz",    carrera:"ISC",semestre:4},
  {numControl:12345682,nombre:"Carlos Eduardo López Vega",  carrera:"ISC",semestre:4},
  {numControl:12345683,nombre:"Paola Hernández Cruz",       carrera:"ISC",semestre:4},
  {numControl:12345684,nombre:"Diego Morales Reyes",        carrera:"ISC",semestre:4},
  {numControl:12345685,nombre:"Valeria Castillo Mendoza",   carrera:"ISC",semestre:4},
]

const MOCK_ALUMNOS_IIA = [
  {numControl:22345678,nombre:"Roberto Flores Jiménez",    carrera:"IIA",semestre:2},
  {numControl:22345679,nombre:"Daniela Romero Salinas",    carrera:"IIA",semestre:2},
  {numControl:22345680,nombre:"Sebastián Vargas Ortega",   carrera:"IIA",semestre:2},
  {numControl:22345681,nombre:"Camila Torres Acosta",      carrera:"IIA",semestre:2},
  {numControl:22345682,nombre:"Andrés Gutiérrez Mora",     carrera:"IIA",semestre:2},
  {numControl:22345683,nombre:"Lucía Ramírez Peña",        carrera:"IIA",semestre:2},
]

/* ── Resultados mock de evaluaciones ───────────────────────────
   Para el dashboard, precalculamos los promedios por categoría
   de cada docente en cada periodo.
   ← BACKEND: GET /api/dashboard/docente/:id?periodo=:pid
   ─────────────────────────────────────────────────────────── */
const MOCK_RESULTADOS = {
  // docenteId_periodoId → { promedios por categoría, alumnos completados, alumnos faltantes }
  "1_3": {
    completaron: [12345678, 12345679, 12345680, 12345681, 12345682],
    faltantes:   [12345683, 12345684, 12345685],
    promediosCat: { 1:4.6, 2:4.2, 3:4.4, 4:4.8, 5:4.5, 6:4.3, 7:4.1, 8:4.0, 9:4.4 },
  },
  "2_3": {
    completaron: [12345678, 12345679, 12345680, 12345681, 12345682, 12345683],
    faltantes:   [12345684, 12345685],
    promediosCat: { 1:3.8, 2:3.5, 3:4.0, 4:3.9, 5:3.7, 6:3.6, 7:3.4, 8:3.8, 9:4.0 },
  },
  "3_3": {
    completaron: [12345678, 12345679],
    faltantes:   [12345680, 12345681, 12345682, 12345683, 12345684, 12345685],
    promediosCat: { 1:2.5, 2:3.0, 3:2.8, 4:2.6, 5:3.1, 6:2.4, 7:2.9, 8:2.7, 9:3.0 },
  },
  "10_3": {
    completaron: [22345678, 22345679, 22345680, 22345681],
    faltantes:   [22345682, 22345683],
    promediosCat: { 1:4.0, 2:3.8, 3:4.2, 4:4.5, 5:4.1, 6:3.9, 7:3.7, 8:3.6, 9:4.2 },
  },
  "11_3": {
    completaron: [22345678, 22345679, 22345680],
    faltantes:   [22345681, 22345682, 22345683],
    promediosCat: { 1:3.2, 2:3.0, 3:3.5, 4:3.4, 5:3.6, 6:3.1, 7:3.0, 8:3.3, 9:3.5 },
  },
}

/**
 * Calcula el promedio general a partir de los promedios por categoría.
 */
function calcPromedioGeneral(cat) {
  const vals = Object.values(cat)
  return +(vals.reduce((a,b) => a+b, 0) / vals.length).toFixed(2)
}

/**
 * ← BACKEND: Devuelve los resultados del dashboard para un docente en un periodo.
 */
export function getResultadosDocente(idDocente, idPeriodo) {
  const key   = `${idDocente}_${idPeriodo}`
  const data  = MOCK_RESULTADOS[key]
  if (!data) return null

  const docente = DOCENTES.find(d => d.id === idDocente)
  const periodo = PERIODOS.find(p => p.id === idPeriodo)

  // Resolver nombre de alumnos
  const todoAlumnos = [...MOCK_ALUMNOS_ISC, ...MOCK_ALUMNOS_IIA]
  const completaron = data.completaron.map(nc =>
    todoAlumnos.find(a => a.numControl === nc) ?? { numControl:nc, nombre:`Alumno ${nc}`, carrera:"-" }
  )
  const faltantes = data.faltantes.map(nc =>
    todoAlumnos.find(a => a.numControl === nc) ?? { numControl:nc, nombre:`Alumno ${nc}`, carrera:"-" }
  )

  const promedioGeneral = calcPromedioGeneral(data.promediosCat)
  const clasificacion   = promedioGeneral >= 4.5 ? "EXCELENTE"
                        : promedioGeneral >= 3.5 ? "MUY BUENO"
                        : promedioGeneral >= 2.5 ? "BUENO"
                        : promedioGeneral >= 1.5 ? "REGULAR"
                        : "DEFICIENTE"

  return {
    docente,
    periodo,
    totalAlumnos:  completaron.length + faltantes.length,
    completaron,
    faltantes,
    promediosCat:  data.promediosCat,
    promedioGeneral,
    clasificacion,
  }
}

/* ── Perfil de alumno (para PanelAlumno) ─────────────────────── */
const MOCK_ALUMNOS_PERFIL = {
  /* ── Alumno real de prueba ── */
  25100019: {
    carrera: "Ingeniería Informática", siglas: "INF", semestre: 2,
    tutores: [
      {
        id:      103,
        nombre:  "M.D.E. LEGUIZAMO HERNANDEZ MIRIAM",
        materia: "Tutoría Grupal — INF 2°A",
        grupo:   "IN2A",
      },
    ],
  },
  /* ── Alumno mock ISC ── */
  12345678: {
    carrera:"Ingeniería en Sistemas Computacionales", siglas:"ISC", semestre:4,
    tutores:[
      {id:1,nombre:"Dr. Carlos Méndez Ríos",  materia:"Tutoría grupal — ISC 4°A",grupo:"ISC-4A"},
      {id:2,nombre:"M.C. Laura Pérez Sánchez", materia:"Tutoría individual — ISC 4°B",grupo:"ISC-4B"},
      {id:3,nombre:"Ing. Roberto Torres Vega", materia:"Tutoría de rescate — ISC 4°",grupo:"ISC-4"},
    ],
  },
}

const PERFIL_GENERICO = {
  carrera:"Ingeniería Industrial y de Administración", siglas:"IIA", semestre:2,
  tutores:[
    {id:10,nombre:"Dr. Alejandro Vargas Cruz",materia:"Tutoría grupal — IIA 2°A",grupo:"IIA-2A"},
    {id:11,nombre:"M.C. Patricia Ruiz León",  materia:"Tutoría individual — IIA 2°B",grupo:"IIA-2B"},
  ],
}

export function getPerfilAlumno(numControl) {
  return MOCK_ALUMNOS_PERFIL[Number(numControl)] ?? PERFIL_GENERICO
}

/* ── Persistencia de evaluaciones completadas ──────────────────
   sessionStorage → temporal por sesión (sin BD).
   ← BACKEND: el servidor validará esto en producción.          */
const SK = "sicot_eval_completadas"
function leer()  { try { return JSON.parse(sessionStorage.getItem(SK) ?? "[]") } catch { return [] } }

export function marcarEvaluacionCompletada(numControl, idTutor) {
  const lista = leer(), clave = `${numControl}_${idTutor}`
  if (!lista.includes(clave)) sessionStorage.setItem(SK, JSON.stringify([...lista, clave]))
}
export function yaEvaluado(numControl, idTutor) {
  return leer().includes(`${numControl}_${idTutor}`)
}
