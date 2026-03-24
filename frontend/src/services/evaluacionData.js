/* ================================================================
   evaluacionData.js  →  src/services/evaluacionData.js
   VERSIÓN DEFINITIVA - SOLO UNA DEFINICIÓN DE API_URL
   ================================================================ */

// ============================================================
//  DETECCIÓN AUTOMÁTICA DE URL DE API - UNA SOLA VEZ
// ============================================================

const API_URL = (() => {
  // En desarrollo local (Vite)
  if (import.meta.env.DEV) {
    return 'http://localhost:3001'
  }
  
  // En producción (Vercel)
  // Las peticiones a /api van al mismo dominio
  return window.location.origin
})()

console.log("📡 API Base URL:", API_URL)

// ============================================================
//  FUNCIONES DE AUTENTICACIÓN Y TOKEN
// ============================================================

function getToken() {
  return localStorage.getItem('token') || localStorage.getItem('sicot_token')
}

function getHeaders() {
  const token = getToken()
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  }
}

// ============================================================
//  CATEGORÍAS Y RÚBRICA (FALLBACK estáticos)
// ============================================================

export const CATEGORIAS_FALLBACK = [
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

export const RUBRICA_FALLBACK = {
  1: {
    5: "Detectó completamente mis necesidades y ofreció un apoyo excelente.",
    4: "Detectó bien mis necesidades y ofreció un apoyo adecuado.",
    3: "Detectó mis necesidades de forma general y ofreció apoyo limitado.",
    2: "Detectó algunas de mis necesidades, pero no ofreció apoyo adecuado.",
    1: "No detectó mis necesidades ni ofreció apoyo."
  },
  2: {
    5: "Realizó un seguimiento constante y me brindó apoyo eficaz en todo momento.",
    4: "Realizó un buen seguimiento y me apoyó en las materias problemáticas.",
    3: "Realizó seguimiento regular pero no siempre me apoyó en mis problemáticas.",
    2: "Hizo un seguimiento ocasional pero no constante.",
    1: "Nunca realizó seguimiento de mi desempeño."
  },
  3: {
    5: "Siempre hizo un seguimiento constante y su retroalimentación fue muy valiosa.",
    4: "Hizo un buen seguimiento y me dio retroalimentación útil.",
    3: "Hizo un seguimiento irregular con retroalimentación limitada.",
    2: "Hizo un seguimiento mínimo y su retroalimentación fue escasa.",
    1: "Nunca hizo seguimiento ni dio retroalimentación."
  },
  4: {
    5: "La comunicación fue excelente y siempre me sentí en confianza.",
    4: "La comunicación fue buena y generó confianza en muchas ocasiones.",
    3: "La comunicación fue irregular, aunque a veces me sentí en confianza.",
    2: "La comunicación fue escasa y no generó confianza.",
    1: "No hubo comunicación ni confianza."
  },
  5: {
    5: "Siempre asistió y demostró un alto nivel de compromiso con mi desarrollo.",
    4: "Asistió a las sesiones y demostró un buen nivel de compromiso.",
    3: "Asistió a la mayoría de las sesiones, pero su compromiso fue irregular.",
    2: "Asistió a pocas sesiones y su compromiso fue mínimo.",
    1: "No asistió ni mostró compromiso."
  },
  6: {
    5: "Me motivó siempre y me dio una excelente orientación para mi desarrollo.",
    4: "Me motivó constantemente y me ofreció una buena orientación.",
    3: "Me motivó algunas veces y la orientación fue general.",
    2: "Me motivó de manera limitada y no me brindó mucha orientación.",
    1: "No me motivó ni me ofreció orientación."
  },
  7: {
    5: "Su impacto fue muy positivo, ayudándome a evitar la reprobación y el abandono.",
    4: "Su impacto fue positivo y me ayudó a mejorar mi rendimiento.",
    3: "Su impacto fue moderado, pero no evitó todas las dificultades.",
    2: "Tuvo un impacto muy limitado en mi desempeño.",
    1: "No tuvo ningún impacto positivo."
  },
  8: {
    5: "Aplicó estrategias excelentes y me ayudó a superar todas mis dificultades.",
    4: "Aplicó buenas estrategias y me ayudó a superar algunas dificultades.",
    3: "Aplicó algunas estrategias, pero no siempre resultaron efectivas.",
    2: "Aplicó estrategias mínimas o ineficaces.",
    1: "No aplicó ninguna estrategia de rescate."
  },
  9: {
    5: "Muy alta satisfacción con el acompañamiento de mi tutor(a).",
    4: "Alta satisfacción con el acompañamiento de mi tutor(a).",
    3: "Satisfacción regular con el acompañamiento de mi tutor(a).",
    2: "Baja satisfacción con el acompañamiento de mi tutor(a).",
    1: "Muy baja satisfacción con el acompañamiento de mi tutor(a)."
  },
}

export const ESCALA_LABELS_FALLBACK = { 
  5: "Excelente", 
  4: "Muy bueno", 
  3: "Bueno", 
  2: "Regular", 
  1: "Deficiente" 
}

// Exportar como CATEGORIAS, RUBRICA, ESCALA_LABELS para compatibilidad
export const CATEGORIAS = CATEGORIAS_FALLBACK
export const RUBRICA = RUBRICA_FALLBACK
export const ESCALA_LABELS = ESCALA_LABELS_FALLBACK

// Variables para cache
let categoriasCache = null
let rubricaCache = null
let escalaCache = null

// ============================================================
//  FUNCIONES PARA OBTENER DATOS DESDE BD CON CACHE
// ============================================================

export async function getCategoriasAPI(forceRefresh = false) {
  if (!forceRefresh && categoriasCache) return categoriasCache
  
  try {
    const response = await fetch(`${API_URL}/api/encuesta/categorias`, { headers: getHeaders() })
    if (!response.ok) throw new Error('Error al obtener categorías')
    const data = await response.json()
    categoriasCache = data.categorias || []
    return categoriasCache
  } catch (error) {
    console.error('❌ Error en getCategoriasAPI:', error)
    return CATEGORIAS_FALLBACK
  }
}

export async function getRubricaAPI(forceRefresh = false) {
  if (!forceRefresh && rubricaCache) return rubricaCache
  
  try {
    const response = await fetch(`${API_URL}/api/encuesta/rubrica`, { headers: getHeaders() })
    if (!response.ok) throw new Error('Error al obtener rúbrica')
    const data = await response.json()
    const rubricaObj = {}
    ;(data.rubrica || []).forEach(item => {
      if (!rubricaObj[item.idCategoria]) rubricaObj[item.idCategoria] = {}
      rubricaObj[item.idCategoria][item.Valor] = item.Descripcion
    })
    rubricaCache = rubricaObj
    return rubricaCache
  } catch (error) {
    console.error('❌ Error en getRubricaAPI:', error)
    return RUBRICA_FALLBACK
  }
}

export async function getEscalaAPI(forceRefresh = false) {
  if (!forceRefresh && escalaCache) return escalaCache
  
  try {
    const response = await fetch(`${API_URL}/api/encuesta/escala`, { headers: getHeaders() })
    if (!response.ok) throw new Error('Error al obtener escala')
    const data = await response.json()
    escalaCache = data.escala || ESCALA_LABELS_FALLBACK
    return escalaCache
  } catch (error) {
    console.error('❌ Error en getEscalaAPI:', error)
    return ESCALA_LABELS_FALLBACK
  }
}

// ============================================================
//  FUNCIONES REALES CONECTADAS A LA BASE DE DATOS
// ============================================================

export async function getPerfilAlumnoAPI() {
  try {
    const response = await fetch(`${API_URL}/api/alumno/perfil`, { headers: getHeaders() })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Error al obtener perfil')
    }
    return await response.json()
  } catch (error) {
    console.error('❌ Error en getPerfilAlumnoAPI:', error)
    throw error
  }
}

export async function getEvaluacionesAlumnoAPI() {
  try {
    const response = await fetch(`${API_URL}/api/alumno/evaluaciones`, { headers: getHeaders() })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Error al obtener evaluaciones')
    }
    return await response.json()
  } catch (error) {
    console.error('❌ Error en getEvaluacionesAlumnoAPI:', error)
    throw error
  }
}

export async function getPreguntasAPI() {
  try {
    const response = await fetch(`${API_URL}/api/encuesta/preguntas`, { headers: getHeaders() })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Error al obtener preguntas')
    }
    return await response.json()
  } catch (error) {
    console.error('❌ Error en getPreguntasAPI:', error)
    throw error
  }
}

export async function iniciarEvaluacionAPI(idTutor, idGrupo) {
  try {
    console.log("🚀 Iniciando evaluación con tutor:", idTutor, "grupo:", idGrupo)
    const response = await fetch(`${API_URL}/api/evaluacion/iniciar`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ idTutor, idGrupo })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Error al iniciar evaluación')
    return data
  } catch (error) {
    console.error('❌ Error en iniciarEvaluacionAPI:', error)
    throw error
  }
}

export async function guardarRespuestasAPI(idEvaluacion, respuestas) {
  try {
    console.log("💾 Guardando respuestas:", { idEvaluacion, respuestas: respuestas?.length })
    const response = await fetch(`${API_URL}/api/evaluacion/responder`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ idEvaluacion, respuestas })
    })
    const data = await response.json()
    console.log("📡 Respuesta del servidor:", data)
    if (!response.ok) throw new Error(data.error || 'Error al guardar respuestas')
    return data
  } catch (error) {
    console.error('❌ Error en guardarRespuestasAPI:', error)
    throw error
  }
}

export async function guardarComentarioAPI(idEvaluacion, idDocente, comentario) {
  try {
    const texto = String(comentario).trim()
    console.log("💬 Guardando comentario:", { idEvaluacion, idDocente, texto })
    if (!texto) throw new Error('El comentario no puede estar vacío')
    if (texto.length < 10) throw new Error('El comentario debe tener al menos 10 caracteres.')
    if (texto.length > 1000) throw new Error('El comentario no puede superar los 1000 caracteres.')
    
    const response = await fetch(`${API_URL}/api/evaluacion/comentario`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ idEvaluacion, idDocente, comentario: texto })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Error al guardar el comentario')
    console.log("✅ Comentario guardado correctamente:", data)
    return data
  } catch (error) {
    console.error('❌ Error en guardarComentarioAPI:', error)
    throw error
  }
}

// ============================================================
//  FUNCIONES PARA ADMIN / DASHBOARD
// ============================================================

export async function getDocentesAPI() {
  try {
    const token = getToken()
    if (!token) throw new Error('No hay token de autenticación')
    const response = await fetch(`${API_URL}/api/dashboard/docentes`, { headers: getHeaders() })
    if (response.status === 401) throw new Error('Sesión expirada')
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || 'Error al obtener docentes')
    }
    const data = await response.json()
    return data.docentes || []
  } catch (error) {
    console.error('❌ Error en getDocentesAPI:', error)
    throw error
  }
}

export async function getPeriodosAPI() {
  try {
    const token = getToken()
    if (!token) throw new Error('No hay token de autenticación')
    const response = await fetch(`${API_URL}/api/dashboard/periodos`, { headers: getHeaders() })
    if (response.status === 401) throw new Error('Sesión expirada')
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || 'Error al obtener periodos')
    }
    const data = await response.json()
    return data.periodos || []
  } catch (error) {
    console.error('❌ Error en getPeriodosAPI:', error)
    throw error
  }
}

export async function getGruposAPI(idDocente, idPeriodo) {
  try {
    const token = getToken()
    if (!token) throw new Error('No hay token de autenticación')
    const response = await fetch(`${API_URL}/api/dashboard/docentes/${idDocente}/periodos/${idPeriodo}/grupos`, { headers: getHeaders() })
    if (response.status === 401) throw new Error('Sesión expirada')
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || 'Error al obtener grupos')
    }
    const data = await response.json()
    return data.grupos || []
  } catch (error) {
    console.error('❌ Error en getGruposAPI:', error)
    throw error
  }
}

export async function getResultadosDocenteAPI(idDocente, idPeriodo, idGrupo = null) {
  try {
    const token = getToken()
    if (!token) throw new Error('No hay token de autenticación')
    let url = `${API_URL}/api/dashboard/resultados?idDocente=${idDocente}&idPeriodo=${idPeriodo}`
    if (idGrupo) url += `&idGrupo=${idGrupo}`
    const response = await fetch(url, { headers: getHeaders() })
    if (response.status === 401) throw new Error('Sesión expirada')
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || 'Error al obtener resultados')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('❌ Error en getResultadosDocenteAPI:', error)
    throw error
  }
}

export async function getDepartamentosAPI(idPeriodo) {
  try {
    const token = getToken()
    if (!token) throw new Error('No hay token de autenticación')
    const response = await fetch(`${API_URL}/api/dashboard/departamentos?idPeriodo=${idPeriodo}`, { headers: getHeaders() })
    if (response.status === 401) throw new Error('Sesión expirada')
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || 'Error al obtener departamentos')
    }
    const data = await response.json()
    return data.departamentos || []
  } catch (error) {
    console.error('❌ Error en getDepartamentosAPI:', error)
    throw error
  }
}

export async function getComentariosDocenteAPI(idDocente, idPeriodo) {
  try {
    const token = getToken()
    if (!token) throw new Error('No hay token de autenticación')
    const response = await fetch(`${API_URL}/api/dashboard/docentes/${idDocente}/comentarios?idPeriodo=${idPeriodo}`, { headers: getHeaders() })
    if (response.status === 401) throw new Error('Sesión expirada')
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || 'Error al obtener comentarios')
    }
    return await response.json()
  } catch (error) {
    console.error('❌ Error en getComentariosDocenteAPI:', error)
    throw error
  }
}

export async function getAlumnosPorDocenteAPI(idDocente, idPeriodo) {
  try {
    const token = getToken()
    if (!token) throw new Error('No hay token de autenticación')
    const response = await fetch(`${API_URL}/api/dashboard/docente/${idDocente}/alumnos?idPeriodo=${idPeriodo}`, { headers: getHeaders() })
    if (response.status === 401) throw new Error('Sesión expirada')
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || 'Error al obtener alumnos')
    }
    return await response.json()
  } catch (error) {
    console.error('❌ Error en getAlumnosPorDocenteAPI:', error)
    throw error
  }
}

export async function yaEvaluadoAPI(idTutor) {
  try {
    const evaluaciones = await getEvaluacionesAlumnoAPI()
    return evaluaciones.evaluaciones?.some(e => e.idTutor === idTutor && e.completada) || false
  } catch (error) {
    console.error('❌ Error en yaEvaluadoAPI:', error)
    return false
  }
}

export async function getPeriodoActivoAPI() {
  try {
    const response = await fetch(`${API_URL}/api/dashboard/periodo-activo`, { headers: getHeaders() })
    if (!response.ok) throw new Error('Error al obtener periodo activo')
    const data = await response.json()
    return data.existe ? data.periodo : null
  } catch (error) {
    console.error('❌ Error en getPeriodoActivoAPI:', error)
    return null
  }
}

export async function setPeriodoActivoAPI(idPeriodo) {
  try {
    const token = getToken()
    if (!token) throw new Error('No hay token de autenticación')
    const response = await fetch(`${API_URL}/api/dashboard/periodo-activo`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ idPeriodo })
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Error al cambiar periodo activo')
    }
    return await response.json()
  } catch (error) {
    console.error('❌ Error en setPeriodoActivoAPI:', error)
    throw error
  }
}

// ============================================================
//  EXPORTS PARA COMPATIBILIDAD
// ============================================================

export const getPerfilAlumno = getPerfilAlumnoAPI
export const getCargaAcademica = getCargaAcademicaAPI
export const getEvaluacionesAlumno = getEvaluacionesAlumnoAPI
export const getPreguntas = getPreguntasAPI
export const iniciarEvaluacion = iniciarEvaluacionAPI
export const guardarRespuestas = guardarRespuestasAPI
export const guardarComentario = guardarComentarioAPI
export const getDocentes = getDocentesAPI
export const getPeriodos = getPeriodosAPI
export const getGrupos = getGruposAPI
export const getResultadosDocente = getResultadosDocenteAPI
export const getDepartamentos = getDepartamentosAPI
export const getComentariosDocente = getComentariosDocenteAPI
export const getAlumnosPorDocente = getAlumnosPorDocenteAPI
export const getPeriodoActivo = getPeriodoActivoAPI
export const setPeriodoActivo = setPeriodoActivoAPI
export const getCategorias = getCategoriasAPI
export const getRubrica = getRubricaAPI
export const getEscala = getEscalaAPI
export const yaEvaluado = yaEvaluadoAPI
